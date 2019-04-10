import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapScreen from './components/screens/map';

console.disableYellowBox = true;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Nearby = () => (
  <View style={styles.container}>
    <MapScreen />
  </View>
);

export default Nearby;
