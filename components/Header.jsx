import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import colors from '../constants/colors';

import Colors from '../constants/colors';
import TitleText from './TitleText';

export const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <TitleText style={styles.headerTitle}>{title}</TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
    borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
  },
  headerTitle: {
    color: Platform.OS === 'ios' ? colors.primary : 'white',
  },
});
