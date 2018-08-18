const fs = require('fs');
const csv = require('fast-csv');
const path = require('path');
const uniqid = require('uniqid');
const logger = require('winston');

const externalServices = require('./externalServices');
const mapper = require('./mappers/mapGoogleRoute');
const validation = require('./validation/validator');
const sanitize = require('./sanitizing/sanitizeMission');

const date = new Date('01/01/2016 06:00:00 AM');

let activeMissions = [];

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
    findFinishedMissions: (ctx) => {
        logger.info('Missions Services - Find Finished Mission And Remove It From Active Missions');
        activeMissions = activeMissions.filter((el) => {
            const dropoffDate = new Date(el.Lpep_dropoff_datetime);
            if(dropoffDate.getTime() < date.getTime()) {
                ctx.socket.emit('finishedMission', sanitize.sanitizeMissionResponse(el));
            }
            return dropoffDate.getTime() >= date.getTime();
        });
    },
    findStartingMissons: (ctx) => {
        logger.info('Missions Services - Find Starting Mission And Remove It From Data');
        date.setSeconds(date.getSeconds() + 1);
        ctx.data = ctx.data.filter(async (el) => {
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
                ctx.socket.emit('newStartingMission', sanitize.sanitizeMissionResponse(startingMission));
                activeMissions.push(startingMission);
            }
            return pickupDate.getTime() >= date.getTime()
        });
    }
}