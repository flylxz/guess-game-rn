import React, { useState, useEffect } from 'react';
import {
  Button,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { BodyText } from '../components/BodyText';
import { MainButton } from '../components/MainButton';
import { TitleText } from '../components/TitleText';
import colors from '../constants/colors';

export const GameOverScreen = ({ roundsNumber, userNumber, onRestart }) => {
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get('window').width
  );
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get('window').height
  );

  useEffect(() => {
    const updateLayout = () => {
      const { width, height } = Dimensions.get('window');
      setAvailableDeviceWidth(width);
      setAvailableDeviceHeight(height);
    };
    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>The game is over!</TitleText>
        <View
          style={{
            ...styles.imageContainer,
            width: availableDeviceWidth * 0.7,
            height: availableDeviceWidth * 0.7,
            borderRadius: (availableDeviceWidth * 0.7) / 2,
            marginVertical: availableDeviceHeight / 30,
          }}
        >
          <Image
            source={require('../assets/success.png')}
            //   source={{
            //     uri: 'https://image.shutterstock.com/image-photo/evening-view-ama-dablam-on-260nw-258841592.jpg',
            //   }}
            style={styles.image}
            resizeMode="cover"
            fadeDuration={1000}
          />
        </View>
        <View
          style={{
            ...styles.resultContainer,
            marginVertical: availableDeviceHeight / 60,
          }}
        >
          <BodyText
            style={{
              ...styles.resultText,
              fontSize: availableDeviceHeight < 400 ? 16 : 20,
            }}
          >
            Your phone needed{' '}
            <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess
            the number <Text style={styles.highlight}>{userNumber}</Text>
          </BodyText>
        </View>

        <MainButton onPress={onRestart}>New Game</MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  imageContainer: {
    // width: Dimensions.get('window').width * 0.7,
    // height: Dimensions.get('window').width * 0.7,
    borderRadius: (Dimensions.get('window').width * 0.7) / 2,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 30,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: Dimensions.get('window').height / 60,
  },
  resultText: {
    textAlign: 'center',
    fontSize: Dimensions.get('window').height < 400 ? 16 : 20,
  },
  highlight: {
    color: colors.primary,
  },
});
