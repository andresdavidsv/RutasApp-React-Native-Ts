import React from 'react';
import {StyleSheet, View} from 'react-native';
import Map from '../components/Map';

const markers = [
  {
    latlng: {latitude: 37.78825, longitude: -122.4324},
    title: 'Example',
    description: 'Description',
  },
  {
    latlng: {latitude: 37.78825, longitude: -122.4324},
    title: 'Example',
    description: 'Description',
  },
  {
    latlng: {latitude: 37.78825, longitude: -122.4324},
    title: 'Example',
    description: 'Description',
  },
];

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <Map markers={markers} />
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
