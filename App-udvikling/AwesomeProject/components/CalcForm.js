import React, {useState} from "react";
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity } from "react-native";



export default function CalcForm({  }){
    const [numberButtons, setNumberButtons] = useState([ "C", "%", "/", "x", 7,8,9, "-", 4,5,6, "+",  1,2,3, "=", 0,])

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.txtInput}>Placeholder Text</Text>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.buttonRow}>
                    {numberButtons.map((number) => (
                    <TouchableOpacity key={number} style={styles.button}>
                        <Text >{number}</Text>
                    </TouchableOpacity>
                    ))}
                </View>
            </View>
        </>   
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        backgroundColor: 'orange',
        paddingBottom: 40,
    },
    txtInput: {  
        fontSize: 30,
        textAlign: 'right',
        
    },
    buttonContainer: { 
       flex: 1, 
       backgroundColor: 'orange',
    }, 
    buttonRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    button: {
        width: '22.56%', // Adjust the width as needed
        aspectRatio: 1, // Ensure the button maintains a square aspect ratio
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue', // Set your desired background color
        borderRadius: 8,
        
    },
});