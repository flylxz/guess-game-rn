import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import colors from '../constants/colors';

import Colors from '../constants/colors';
import TitleText from './TitleText';

export const Header = ({ title }) => {
  return (
    <View
      style={{
        ...styles.headerBase,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid,
        }),
      }}
    >
      {/* <TitleText style={styles.headerTitle}>{title}</TitleText> */}
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBase: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIOS: {
    backgroundColor: 'white',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  headerAndroid: {
    backgroundColor: Colors.primary,
  },
  headerTitle: {
    color: Platform.OS === 'ios' ? colors.primary : 'white',
  },
});
