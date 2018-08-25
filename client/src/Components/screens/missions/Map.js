import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { subscribeToMissions } from '../../../Redux/actionCreators';

class Map extends PureComponent  {

    componentDidMount() {
        const NewYork = new window.google.maps.LatLng(40.730610, -73.935242);
        const mapOptions = {
          zoom: 10,
          center: NewYork
        }
        this.map = new window.google.maps.Map(this.refs.map, mapOptions);
        this.props.subscribeToMissions();
    }

    componentWillReceiveProps(newProps) {
        if(newProps.activeMissions.length !== this.props.activeMissions.length) {
            newProps.activeMissions.forEach((element) => {
                const directionsRenderer = new window.google.maps.DirectionsRenderer();
                directionsRenderer.setMap(this.map);
                directionsRenderer.setOptions({ preserveViewport: true });
                directionsRenderer.setDirections(element.computeRoutes);
            });
        }
    }

     render() {
        return(
            <div>
                <div style={styles.infoStyle}>
                    <p>Number of passenger transported: {this.props.passengerTransported}</p>
                    <p>Distance covered by the fleet: {this.props.distanceCovered}</p>
                    <p>Average trip length: {this.props.avgTripLength}</p> 
                </div>
                <div style={styles.mapStyle} ref="map"></div>
            </div>
        );
    }
};

const styles = {
    mapStyle: {
        height: '1000px',
        width: '100%',
        filter: 'none !important'
    },
    infoStyle: {
        color: 'white',
        marginBottom: '20px'
    }
}


const mapStateToProps = ({ missions }) => ({
    activeMissions: missions.missionsData,
    passengerTransported: missions.passengerTransported,
	distanceCovered: missions.distanceCovered,
	avgTripLength: missions.avgTripLength
});

export default connect(mapStateToProps, { subscribeToMissions })(Map);
