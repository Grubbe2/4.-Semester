
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Game from './src/components/Game'
import { random } from 'lodash';



export default function App() {
  
  const [gameId, setGameId] = useState(0);
  const [score, setScore] = useState(0);

  const resetGame = () => {
    setGameId((prevGameId) => prevGameId + 1);
  };

  const randomNumber = () => {
    if(score < 5){
      return 3 + Math.floor(score * Math.random());
    }else if(score >= 5){
      return 5 + Math.floor(3 * Math.random());
    }
  };
  

  return (
    <>
      <Game 
        key={gameId} 
        randomNumberCount={randomNumber()} 
        initialSeconds={10} 
        onPlayAgain={resetGame}
        initialScore={score}
        setParentScore={setScore}
        />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  restart: {
    fontSize: 50,
    backgroundColor: '#17c2ec',
    margin: 50,
    textAlign: 'center',
  },
});
