import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
// import * as Font from 'expo-font';

import AppLoading from 'expo-app-loading';

import { Header } from './components/Header';
import { GameOverScreen } from './screens/GameOverScreen';
import { GameScreen } from './screens/GameScreen';
import { StartGameScreen } from './screens/StartGameScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState(0);
  const [guessRound, setGuessRound] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [loaded, error] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  const configureNewGameHandler = () => {
    setGuessRound(0);
    setUserNumber(null);
  };

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRound(0);
  };

  const gameOverHandler = (numOfRound) => {
    setGuessRound(numOfRound);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && guessRound <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRound > 0) {
    content = (
      <GameOverScreen
        roundsNumber={guessRound}
        userNumber={userNumber}
        onRestart={configureNewGameHandler}
      />
    );
  }

  if (!loaded) {
    return null;
  }

  if (error) console.log('font error: ', error);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Guess a number" />
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
