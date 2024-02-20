import React, {useState, useMemo, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import  PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle';
import { set } from 'lodash';


Game.propTypes = {
  randomNumberCount: PropTypes.number.isRequired,
  initialSeconds: PropTypes.number.isRequired,
  onPlayAgain: PropTypes.func.isRequired,
  initialScore: PropTypes.number.isRequired,
  setParentScore: PropTypes.func.isRequired,
};


export default function Game({randomNumberCount, initialSeconds, onPlayAgain, initialScore, setParentScore}){
  
  const [selectedId, setSelectedNumbers] = useState([]);
  const [intervalId, setIntervalId] = useState(null);
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
  const [gameStatus, setGameStatus] = useState('PLAYING');
  const [shuffledNumbers, setShuffledNumbers] = useState([]);
  const [score, setScore] = useState(initialScore);
  const selectedIdRef = useRef(selectedId);
  
  
  

  const randomNumbers = useMemo(
    () =>
      Array.from({ length: randomNumberCount }).map(() =>
        1 + Math.floor(10 * Math.random()),
        
      ),
    [randomNumberCount]
  );

  const target = useMemo(
    () => 
       randomNumbers.slice(0, randomNumberCount - 2).reduce((acc, curr) => acc + curr, 0),
    [randomNumbers, randomNumberCount]
  );
  

  useEffect(() => {
    // Shuffle the numbers whenever the game status changes
    if (remainingSeconds === initialSeconds){
      setShuffledNumbers(shuffle(randomNumbers));
    }
  }, [remainingSeconds,randomNumbers]);
 
  
  useEffect(() => {
    const newIntervalId = setInterval(() => {
      setRemainingSeconds((prevRemainingSeconds) => {
        if (prevRemainingSeconds === 1) {
          clearInterval(newIntervalId); // Use newIntervalId here
        }
        return prevRemainingSeconds - 1;
      });
    }, 1000);
    
    setIntervalId(newIntervalId);
    // Cleanup the interval when the component unmounts
    return () => clearInterval(newIntervalId);
  }, []); // Empty dependency array ensures this effect runs once on mount

  const isNumberSelected = (numberIndex) => {
    return selectedId.indexOf(numberIndex) >= 0;
  };

  const selectNumber = (numberIndex) => {
    setSelectedNumbers((prevSelectedNumbers) => [
      ...prevSelectedNumbers,
      numberIndex,
    ]);
  };

  useEffect(() => {
    if (selectedIdRef.current !== selectedId || remainingSeconds === 0 || gameStatus !== 'PLAYING') {
      const newGameStatus = calcGameStatus();
      setGameStatus(newGameStatus);
      selectedIdRef.current = selectedId;
      if (newGameStatus !== 'PLAYING') {
        clearInterval(intervalId);
      }
    };
  }, [selectedId, remainingSeconds, calcGameStatus]);

  const calcGameStatus = () => {
    const sumSelected = selectedId.reduce((acc, curr) => {
      return acc + shuffledNumbers[curr];
    }, 0);
    if (remainingSeconds === 0) {
      if(score > 0){
      setScore(score - 1);
      }
      return 'LOST';
    }
    else if (sumSelected < target) {
      return 'PLAYING';
    }
    else if (sumSelected === target){
      setScore(score + 1);
      return 'WON';
    }
    else if (sumSelected > target){
      if(score > 0){
        setScore(score - 1);
        }
      return 'LOST';
    }
  };
  

  
  return (
    <View style={styles.container}>
      <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>{target}</Text> 
        <Text style={styles[`STATUSTEXT_${gameStatus}`]}>{gameStatus}</Text>
        <Text style={styles.timer}>{remainingSeconds}</Text>
        <View style={styles.randomContainer}>
            {shuffledNumbers.map((randomNumber, index) => 
                <RandomNumber 
                    key={index} 
                    id={index}
                    number={randomNumber}
                    isDisabled={isNumberSelected(index) || gameStatus !== 'PLAYING'} 
                    onPress={selectNumber}   
                    />
            )}
        </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.score}>{score}</Text>
          </View>
          {gameStatus !== 'PLAYING' && (
            <View style={styles.buttonContainer}>
              <Button title="Play Again" onPress={ () => {
                onPlayAgain();
                setParentScore(score);
              }} />
            </View>
          )}
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd', 
  },
  scoreContainer: {
    backgroundColor: '#ddd', 
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: '#ddd', 
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  target: {
    fontSize: 50,
    backgroundColor: '#17c2ec',
    margin: 50,
    textAlign: 'center',
  },
  randomContainer:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginVertical: 100,
  },
  timer: {
    fontSize: 50,
    textAlign: 'center',
    marginBottom: -120,
  },
  score: {
    fontSize: 50,
    textAlign: 'center',
  },
  
  STATUS_PLAYING:{
    backgroundColor: '#17c2ec',
  },
  STATUS_WON:{
    backgroundColor: 'green',
  },
  STATUS_LOST:{
    backgroundColor: 'red',
  },
  STATUSTEXT_PLAYING:{
    color: '#ddd',
    fontSize: 50,
    textAlign: 'center',
    marginTop: -50,
  },
  STATUSTEXT_WON:{
    color: 'black',
    fontSize: 50,
    textAlign: 'center',
    marginTop: -50,
  },
  STATUSTEXT_LOST:{
    color: 'black',
    fontSize: 50,
    textAlign: 'center',
    marginTop: -50,
  },
}); 











    

    // const randomNumbers = Array.from({length: randomNumberCount})
    //     .map(() => 1 + Math.floor(10*Math.random()));

    // const target = randomNumbers.slice(0, randomNumberCount - 2)
    // .reduce((acc, curr) => acc + curr, 0);
    
    // const isNumberSelected = (numberIndex) => {
    //     return selectedNumbers.indexOf(numberIndex) >= 0;
    // }

    // const selectNumber = (numberIndex) => {
    //     setSelectedNumbers((prevSelectedNumbers) => [
    //         ...prevSelectedNumbers,
    //         numberIndex,
    //     ]);
    // }