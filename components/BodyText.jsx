import React from 'react';
import { StyleSheet, Text } from 'react-native';

export const BodyText = ({ children, style }) => {
  return <Text style={{ ...styles.text, ...style }}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'open-sans-bold',
  },
});
