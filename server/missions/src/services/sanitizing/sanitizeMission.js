module.exports = {
    sanitizeMissionResponse: (mission) => {
        return {
            id: mission.id,
            tripDistance: mission.Trip_distance,
            passengerCount: mission.Passenger_count,
            computeRoutes: mission.computeRoutes,
        };
    }
};
