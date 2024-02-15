import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import  PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';


export default function Game({randomNumberCount}){
    
    const [selectedNumbers, setSelectedNumbers] = useState([]);

    const randomNumbers = Array.from({length: randomNumberCount})
        .map(() => 1 + Math.floor(10*Math.random()));

    const target = randomNumbers.slice(0, randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);
    
    const isNumberSelected = (numberIndex) => {
        return selectedNumbers.indexOf(numberIndex) >= 0;
    }

    const selectNumber = (numberIndex) => {
        setSelectedNumbers((prevSelectedNumbers) => [
            ...prevSelectedNumbers,
            numberIndex,
        ]);
    }
  return (
    <View style={styles.container}>
      <Text style={styles.target}>{target}</Text> 
        <View style={styles.randomContainer}>
            {randomNumbers.map((randomNumber, index) => 
                <RandomNumber 
                    key={index} 
                    id={index}
                    number={randomNumber}
                    isDisabled={isNumberSelected(index)} 
                    onPress={selectNumber}   
                    />
            )}
      </View>
    </View>
  );
}

Game.propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd', 
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
    
  },
 
  
}); 
