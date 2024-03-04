import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import fetchInitialDeals from './src/ajax';
import DealList from './src/components/DealList';
import DealDetail from './src/components/DealDetail';

export default function App() {
  const [deals, setDeals] = useState([]);
  const [currentDealId, setCurrentDealId] = useState(null);

   useEffect(() => {
    const fetchData = () => {
      const dealsData = fetchInitialDeals();
      setDeals(dealsData);
    };
    fetchData();
    }, []);

    const currentDeal = () => {
      return deals.find(
        (deal) => deal.key === currentDealId);
    }

    if(currentDealId){
      return <DealDetail initialDealData={currentDeal()}/>
    }
    if(deals.length > 0){
      return <DealList deals={deals} onItemPress={setCurrentDealId}/>
    }
  return (
    <View style={styles.container}>
          <Text style={styles.header}>Bakesale</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 40,
  }
});
