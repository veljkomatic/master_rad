import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class Map extends PureComponent  {

    componentDidMount() {
        const NewYork = new window.google.maps.LatLng(40.730610, -73.935242);
        const mapOptions = {
          zoom: 12,
          center: NewYork
        }
        this.map = new window.google.maps.Map(this.refs.map, mapOptions);
    }

     render() {
        return(
            <div>
                <div style={mapStyle} ref="map"></div>
            </div>
        );
    }
};

const mapStyle = {
    height: '1000px',
    width: '100%'
}


const mapStateToProps = () => ({
});

export default connect(mapStateToProps, { })(Map);
