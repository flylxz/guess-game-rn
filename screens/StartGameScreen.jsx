import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  Button,
  TouchableWithoutFeedback,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { BodyText } from '../components/BodyText';

import { Card } from '../components/Card';
import { MainButton } from '../components/MainButton';
import { MyInput } from '../components/MyInput';
import { NumberContainer } from '../components/NumberContainer';
import { TitleText } from '../components/TitleText';
import Colors from '../constants/colors';

export const StartGameScreen = ({ onStartGame }) => {
  const [value, setValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get('window').width / 4
  );

  useEffect(() => {
    const updateLayout = () =>
      setButtonWidth(Dimensions.get('window').width / 4);

    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  const inputHandler = (text) => setValue(text.replace(/[^0-9]/g, ''));

  const resetInputHandler = () => {
    setValue('');
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    if (!value || value <= 0 || value > 99) {
      Alert.alert(
        'Invalid number!',
        'Number has to be a number between 1 and 99.',
        [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
      );
      return;
    }
    setValue('');
    setSelectedNumber(+value);
    setConfirmed(true);
    Keyboard.dismiss();
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.screen}>
            <TitleText style={styles.title}>Start a New Game!</TitleText>
            <Card style={styles.inputContainer}>
              <BodyText>Select a Number</BodyText>
              <MyInput
                style={styles.input}
                blurOnSubmit
                keyboardType="number-pad"
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={2}
                onChangeText={inputHandler}
                value={value}
              />
              <View style={styles.btnContainer}>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="Reset"
                    onPress={resetInputHandler}
                    color={Colors.accent}
                  />
                </View>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="Confirm"
                    onPress={confirmInputHandler}
                    color={Colors.primary}
                  />
                </View>
              </View>
            </Card>
            {confirmed && (
              <Card style={styles.summaryContainer}>
                <Text>You selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => onStartGame(selectedNumber)}>
                  Start Game
                </MainButton>
              </Card>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  title: { fontSize: 20, marginVertical: 10, fontFamily: 'open-sans-bold' },
  inputContainer: {
    minWidth: 300,
    width: '80%',
    maxWidth: '95%',
    alignItems: 'center',
  },
  input: {
    width: 50,
    textAlign: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  // btn: {
  //   //  width: 100,
  //   width: Dimensions.get('window').width / 4,
  // },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
