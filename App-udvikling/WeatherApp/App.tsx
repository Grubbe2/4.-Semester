/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import useFetchWeather from './src/APICALL';
import { weatherConditions } from './src/Utils/weatherConditions';

//Hovedkomponenten
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const {weatherData, City, mainData, error, loading } = useFetchWeather();
  console.log(loading)

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const backgroundStyle = {
    backgroundColor: weatherConditions[weatherData.main].color,
  };
  console.log(weatherConditions[weatherData.main].icon)
  return (
    <SafeAreaView style={{ flex: 1,
      backgroundColor: backgroundStyle.backgroundColor,
    }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: backgroundStyle.backgroundColor,
          }}>
          <Text style={styles.sectionTitle}>
            {City}
          </Text>
          <Icon
            style={styles.icon}
            name={
              weatherData.main === undefined
                ? 'circle-off-outline'
                : weatherConditions[weatherData.main].icon
            }
            size={80}
            color={'white'}
          />
          <Text style={styles.weatherData}>
            {weatherData.main}
          </Text>
          <Text style={styles.temperature}>
            {mainData.temp} °C
          </Text>
          <View 
            style={{
              backgroundColor: backgroundStyle.backgroundColor,
            }}>
            <Text style={styles.sectionDescription}>
              min: {mainData.temp_min} °C / max: {mainData.temp_max} °C
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
  
}


const styles = StyleSheet.create({
  sectionTitle: {
    flex: 1,
    fontSize: 50,
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'center',
    marginTop: 20,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
    textAlign: 'center',
  },
  weatherData: {
    marginTop: 100,
    fontSize: 30,
    fontWeight: '700',
    color: Colors.blue,
    textAlign: 'center',
  },
  temperature: {
    marginTop: 10,
    fontSize: 50,
    fontWeight: 'bold',
    color: Colors.red,
    textAlign: 'center',
  },
  icon: {
    marginTop: 40,
    textAlign: 'center',
  },
});

export default App;
