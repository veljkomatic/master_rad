const fs = require('fs');
const csv = require('fast-csv');
const path = require('path');
const uniqid = require('uniqid');
const logger = require('winston');
const redis = require("redis");
const util = require('util');
require('util.promisify').shim();

const client = redis.createClient();
const getAsync = util.promisify(client.get).bind(client);
const externalServices = require('./externalServices');
const mapper = require('./mappers/mapGoogleRoute');
const validation = require('./validation/validator');
const sanitize = require('./sanitizing/sanitizeMission');

const date = new Date('01/01/2016 12:00:00 AM');

const getStartMissions = (greenTaxiTripData) => {
    const startMissionsData = [];
    for(let el of greenTaxiTripData) {
        const pickupDate = new Date(el.lpep_pickup_datetime);
        if(pickupDate.getTime() > date.getTime()) {
            break;
        }
        if((pickupDate.getTime() === date.getTime()) && validation.validateMission(el)) {
            startMissionsData.push(el);
        }
    }
    return startMissionsData;
}

const getFinishedMissions = (activeMissions) => {
    const finishedMissionsData = [];
    for(let el of activeMissions) {
        const dropoffDate = new Date(el.Lpep_dropoff_datetime);
        if(dropoffDate.getTime() > date.getTime()) {
            break;
        }
        if(dropoffDate.getTime() < date.getTime()) {
            finishedMissionsData.push(el);
        }
    }
    return finishedMissionsData;
}

module.exports = {
    parseAndSortCsvFile: () => {
        logger.info(`Missions Services - Parse And Sort CSV File`);
        return new Promise((resolve, reject) => {
            const greenTaxiTripData = [];
            const stream = fs.createReadStream(path.join(__dirname, 'data/2016_Green_Taxi_Trip_Data.csv'));
            const csvStream = csv
            .parse({ headers: true })
            .on('data', function(data){
                greenTaxiTripData.push(data);
            })
            .on('end', function(){
                greenTaxiTripData.sort((missionA, missionB) => {
                    const pickupDateMissionA = new Date(missionA.lpep_pickup_datetime);
                    const pickupDateMissionB = new Date(missionB.lpep_pickup_datetime);
                    return pickupDateMissionA - pickupDateMissionB;
                });
                resolve(greenTaxiTripData);
            });
            stream.pipe(csvStream);
        });
    },
    findFinishedMissions: async ({ channel }) => {
        logger.info('Missions Services - Find Finished Mission And Remove It From Active Missions');
        const data = await getAsync('activeMissions');
        const activeMissions = JSON.parse(data);
        const finishedMissions = getFinishedMissions(activeMissions);
        if(finishedMissions.length > 0) {
            logger.info(`Found ${finishedMissions.length} finished missions`)
            const newData = activeMissions.slice(finishedMissions.length);
            finishedMissions.forEach(async (el) => {
                logger.info('Sending to queue finishedMission');
                await channel.sendToQueue('finishedMission', Buffer.from(JSON.stringify(sanitize.sanitizeMissionResponse(el)), 'utf8'));
            });
            client.set('activeMissions', JSON.stringify(newData), redis.print);
        }
    },
    findStartingMissons: async ({ channel }) => {
        logger.info('Missions Services - Find Starting Mission And Remove It From Data');
        const data = await getAsync('greenTaxiTripData');
        const greenTaxiTripData = JSON.parse(data);
        date.setSeconds(date.getSeconds() + 1);
        const newStartingMissions = getStartMissions(greenTaxiTripData);
        if(newStartingMissions.length > 0) {
            logger.info(`Found ${newStartingMissions.length} new starting missions`)
            const newData = greenTaxiTripData.slice(newStartingMissions.length);
            newStartingMissions.forEach(async (el) => {
                const response = await externalServices.GoogleGetRoute(el.Pickup_latitude, el.Pickup_longitude, el.Dropoff_latitude, el.Dropoff_longitude);
                const googleRoute = mapper.mapGoogleRoute(response);
                const startingMission = Object.assign(
                    {}, 
                    el, 
                    {
                        id: uniqid(),
                        computeRoutes: googleRoute
                    }
                );
                logger.info('Sending to queue startingMission');
                await channel.sendToQueue('startingMission', Buffer.from(JSON.stringify(sanitize.sanitizeMissionResponse(startingMission)), 'utf8'));
            });
            client.set('activeMissions', JSON.stringify(newStartingMissions), redis.print);
            client.set('greenTaxiTripData', JSON.stringify(newData), redis.print);
        }
    }
}