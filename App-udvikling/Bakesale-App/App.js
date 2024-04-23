import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated, Easing, Dimensions } from 'react-native';
import ajax from './src/ajax';
import DealList from './src/components/DealList';
import DealDetail from './src/components/DealDetail';
import SearchBar from './src/components/SearchBar';

export default function App() {
  titleXPos = new Animated.Value(0);
  const [deals, setDeals] = useState([]);
  const [currentDealId, setCurrentDealId] = useState(null);
  const [dealsFromSearch, setDealsFromSearch] = useState([]);


  animateTitle = (direction = 1) => {
    const width = Dimensions.get('window').width - 150;
    Animated.timing(titleXPos,
      {
        toValue: direction * (width / 2),
        duration: 1000,
        Easing: Easing.ease,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) {
          animateTitle(-1 * direction);
        }
      });
  };

  useEffect(() => {
    const fetchData = () => {
      animateTitle();
      const dealsData = ajax.fetchInitialDeals();
      setDeals(dealsData);
    };
    fetchData();
  }, []);


  searchDeals = async (searchTerm) => {
    let dealsSearch = [];
    if (searchTerm) {
      dealsSearch = await ajax.fetchDealSearchResults(searchTerm);
      setDealsFromSearch(dealsSearch);
    }
    setDealsFromSearch(dealsSearch);
  };

  const currentDeal = () => {
    return deals.find(
      (deal) => deal.key === currentDealId);
  }

  function unsetCurrentDeal() {
    setCurrentDealId(null);
  }


  if (currentDealId) {
    return (
      <View style={styles.main}>
        <DealDetail
          initialDealData={currentDeal()}
          onBack={unsetCurrentDeal}
        />
      </View>
    );
  }
  const dealsToDisplay =
    dealsFromSearch.length > 0
      ? dealsFromSearch
      : deals;
  if (dealsToDisplay.length > 0) {
    return (
      <View style={styles.main}>
        <SearchBar searchDeals={searchDeals} />
        <DealList deals={dealsToDisplay} onItemPress={setCurrentDealId} />
      </View>
    );
  }
  return (
    <Animated.View style={[{ left: titleXPos }, styles.container]}>
      <Text style={styles.header}>Bakesale</Text>
      <StatusBar style="auto" />
    </Animated.View>
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
  },
  main: {
    marginTop: 30,
  }
});
