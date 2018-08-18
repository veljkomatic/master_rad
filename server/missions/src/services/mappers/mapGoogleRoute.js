const decodeGoogleMapPolyline = require('decode-google-map-polyline');
const logger = require('winston');

module.exports = {
    mapGoogleRoute: (googleDirection) => {
        logger.info('Google Route Mapper (Adapter) - Decode Google Polyline To Get Path For Direction Render (CLIENT)');
        const routes = googleDirection.routes;
        const newRoutes = routes.map((route) => {
            const bounds = route.bounds;
            const newBounds = (bounds && {
                south: bounds.southwest && bounds.southwest.lat,
                west: bounds.southwest && bounds.southwest.lng,
                north: bounds.northeast && bounds.northeast.lat,
                east: bounds.northeast && bounds.northeast.lng
            }) || {};
            const overview_polyline = route.overview_polyline && route.overview_polyline.points;
            const overview_path = decodeGoogleMapPolyline(overview_polyline);
            const legs = route.legs.map((leg) => {
                const steps = leg.steps.map((step) => {
                    const polyline = step.polyline && step.polyline.points;
                    const path = decodeGoogleMapPolyline(polyline);
                    const lat_lngs = path;
                    return Object.assign(
                        {},
                        step,
                        {
                            path,
                            lat_lngs
                        }
                    );
                });
                return Object.assign(
                    {},
                    leg,
                    {
                        steps
                    }
                );
            });
            return Object.assign(
                {},
                route,
                {
                    bounds: newBounds,
                    overview_path,
                    legs
                }
            );
        });
        return Object.assign(
            {},
            googleDirection,
            {
                routes: newRoutes,
                request: {
                    travelMode: "DRIVING"
                }
            }
        )
    }
}