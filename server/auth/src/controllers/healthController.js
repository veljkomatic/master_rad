const healthService = require('../services/healthService');

module.exports = ({ router }) => {
    router.get('/health', healthService.healthGet);
};