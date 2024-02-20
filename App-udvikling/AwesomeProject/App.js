import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Button, TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';
import CalcForm from './components/CalcForm';




function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 20 }}>Welcome to this Calculator</Text>
        <Button
          title="Go to Calculator"
          onPress={() => navigation.navigate('Info')}
          style={{ marginBottom: 20 }}
        />
      <StatusBar style="auto" />
    </View>
  );
}


function Calculator() {
  return (
    <>
    <CalcForm/>
    </>
  );
}

function HeaderLogo() {
  return (
    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>
      <Image
        style={{ width: 30, height: 30 }}
        source={require('../AwesomeProject/assets/favicon.png')}
      />
      <Text style={{color: 'white', padding: 5, fontSize: 22}}>Home</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
          title: 'Back',
          headerStyle: {
            backgroundColor: 'darkblue',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },  
          }}>
        <Stack.Screen name="Home" component={HomeScreen} 
        options={{ headerTitle: () => <HeaderLogo /> }} />
        
        <Stack.Screen name="Info" component={Calculator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Button:{
    paddingHorizontal: 50,
    paddingVertical: 30,
    borderRadius: 20,
    backgroundColor: 'purple',
    alignSelf: 'flex-start',
    marginHorizontal: '2.5%',
    marginBottom: 6,
    minWidth: '28%',
    textAlign: 'center',

  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
