import React, {useRef, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import {useLocation} from '../hooks/useLocation';
import {Location} from '../interfaces/appInterfaces';
import LoadingScreens from '../screens/LoadingScreens';
import Fab from './Fab';

interface Props {
  markers?: Marker[];
}

const Map = ({markers = []}: Props) => {
  const {
    hasLocation,
    initialPosition,
    getCurrentLocation,
    folloUserLocation,
    userLocation,
    stopFollowUserLocation,
    routeLines,
  } = useLocation();
  const [showPolyline, setShowPolyline] = useState(true);
  const mapViewRef = useRef<MapView>();
  const following = useRef<boolean>(true);

  useEffect(() => {
    folloUserLocation();
    return () => {
      stopFollowUserLocation();
    };
  }, []);

  useEffect(() => {
    if (!following.current) {
      return;
    }
    const {latitude, longitude} = userLocation;
    centerMap({latitude, longitude});
  }, [userLocation]);

  const centerMap = ({latitude, longitude}: Location) => {
    mapViewRef.current?.animateCamera({
      center: {
        latitude,
        longitude,
      },
    });
  };

  const centerPosition = async () => {
    const {latitude, longitude} = await getCurrentLocation();
    centerMap({latitude, longitude});
    following.current = true;
  };

  if (!hasLocation) {
    return <LoadingScreens />;
  }
  return (
    <>
      <MapView
        ref={el => (mapViewRef.current = el!)}
        // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        showsUserLocation
        style={styles.map}
        initialRegion={{
          latitude: initialPosition.latitude,
          longitude: initialPosition.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        onTouchStart={() => (following.current = false)}>
        {showPolyline && (
          <Polyline
            coordinates={routeLines}
            strokeColor="black"
            strokeWidth={3}
          />
        )}
        {markers.length !== 0 &&
          markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
            />
          ))}
      </MapView>
      <Fab
        iconName="compass-outline"
        onPress={() => centerPosition()}
        style={styles.buttonCenter}
      />
      <Fab
        iconName="brush-outline"
        onPress={() => setShowPolyline(!showPolyline)}
        style={styles.buttonShowPolyline}
      />
    </>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  buttonCenter: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  buttonShowPolyline: {
    position: 'absolute',
    bottom: 80,
    right: 20,
  },
});
