const fs = require('fs');
const csv = require('fast-csv');
const path = require('path');
const uniqid = require('uniqid');
const logger = require('winston');
const redis = require("redis");
const { promisify } = require('util');

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const externalServices = require('./externalServices');
const mapper = require('./mappers/mapGoogleRoute');
const validation = require('./validation/validator');
const sanitize = require('./sanitizing/sanitizeMission');

const date = new Date('01/01/2017 12:00:00 AM');

module.exports = {
    parseAndSortCsvFile: () => {
        logger.info(`Missions Services - Parse And Sort CSV File`);
        return new Promise((resolve, reject) => {
            const greenTaxiTripData = [];
            const stream = fs.createReadStream(path.join(__dirname, 'data/2017_Green_Taxi_Trip_Data.csv'));
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
    findFinishedMissions: () => {
        logger.info('Missions Services - Find Finished Mission And Remove It From Active Missions');
        const data = await getAsync('activeMissions');
        const activeMissions = JSON.parse(data);
        const finishedMission = [];
        newData = activeMissions.filter((el) => {
            const dropoffDate = new Date(el.Lpep_dropoff_datetime);
            if(dropoffDate.getTime() < date.getTime()) {
                finishedMission.push(sanitize.sanitizeMissionResponse(el))
            }
            return dropoffDate.getTime() >= date.getTime();
        });
        client.set('activeMissions', JSON.stringify(newData), redis.print);
        return finishedMission
    },
    findStartingMissons: () => {
        logger.info('Missions Services - Find Starting Mission And Remove It From Data');
        const data = await getAsync('greenTaxiTripData');
        const greenTaxiTripData = JSON.parse(data);
        date.setSeconds(date.getSeconds() + 1);
        const newStartingMission = [];
        const activeMissions = [];
        const newData = greenTaxiTripData.filter(async (el) => {
            const pickupDate = new Date(el.lpep_pickup_datetime);
            if((pickupDate.getTime() === date.getTime()) && validation.validateMission(el)) {
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
                newStartingMission.push(sanitize.sanitizeMissionResponse(startingMission));
                activeMissions.push(startingMission);
            }
            return pickupDate.getTime() >= date.getTime()
        });
        client.set('activeMissions', JSON.stringify(activeMissions), redis.print);
        client.set('greenTaxiTripData', JSON.stringify(newData), redis.print);
        return newStartingMission;
    }
}