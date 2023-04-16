import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const LoadingScreens = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={50} color="black" />
    </View>
  );
};

export default LoadingScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
