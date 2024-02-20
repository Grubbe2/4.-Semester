import React from 'react';
import  PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

RandomNumber.propTypes = {
    id: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,

};

export default function RandomNumber({number, isDisabled, onPress, id}) {

    handlePress = () => {
        if(isDisabled) return;
        onPress(id);
    }
    return(
        <TouchableOpacity onPress={handlePress}
            activeOpacity={isDisabled ? 1 : 0.2}>
            <Text style={[styles.random, isDisabled && styles.disabled]}>
                {number}
            </Text>
        </TouchableOpacity>
    );
    
}




const styles = StyleSheet.create({
    random:{
        width: 100,
        marginHorizontal: 25,
        marginVertical: 25,
        fontSize: 35,
        backgroundColor: '#17c2ec',
        textAlign: 'center',
    },
    disabled:{
        opacity: 0.3,
        
    }
})