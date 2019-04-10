// @flow

import React from 'react';
import {
 TouchableOpacity, Text, StyleSheet, Dimensions 
} from 'react-native';

const { width } = Dimensions.get('window');

type Props = {
  text: string,
  onPress: () => void
};

const CustomButton = (props: Props) => {
  const { text, onPress } = props;
  return (
    <TouchableOpacity
      style={
        text === 'EDIT'
          ? styles.editTouchableOpacity
          : styles.deleteTouchableOpacity
      }
      onPress={onPress}>
      <Text style={styles.textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center'
  },

  deleteTouchableOpacity: {
    position: 'absolute',
    bottom: 0,
    width,
    padding: 10,
    left: 0,
    zIndex: 999,
    alignItems: 'center',
    backgroundColor: '#F80505'
  },
  editTouchableOpacity: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'flex-end',
    width: width * 0.3,
    right: 0,
    padding: 10,
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#33B2FF'
  }
});

export default CustomButton;
