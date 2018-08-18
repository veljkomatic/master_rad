const logger = require('winston');

module.exports = {
	validateMission: (mission) => {
        const { Pickup_latitude, Pickup_longitude, Dropoff_latitude, Dropoff_longitude } = mission;
        if ((Pickup_latitude === Dropoff_latitude) && (Pickup_longitude === Dropoff_longitude)) {
            logger.info('Invalid mission, mission: ', mission);
            return false;
        }
        return true;
    }
}