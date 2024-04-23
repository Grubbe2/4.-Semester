import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, PanResponder, Animated, Dimensions, Button, Linking} from 'react-native';
import PropTypes from 'prop-types';
import {priceDisplay} from '../util';
import ajax from '../ajax';

DealDetail.propTypes = {
  initialDealData: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default function DealDetail({initialDealData, onBack}) {
  const [deal, setDeal] = useState(initialDealData);
  const [imageIndex, setImageIndex] = useState(0);
  const width = Dimensions.get('window').width;

  imageXPos = new Animated.Value(0);
  imagePanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      imageXPos.setValue(gestureState.dx);
    },
    onPanResponderRelease: (event, gestureState) => {
      if(Math.abs(gestureState.dx) > width * 0.4) {
        const direction = Math.sign(gestureState.dx);
        // -1 for left, 1 for right
        Animated.timing(imageXPos, 
          {toValue: direction * width,
          useNativeDriver: false,
          duration: 250,
        }).start(() => handleSwipe(-1 * direction));
      }else {
        Animated.spring(imageXPos, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  handleSwipe = (indexDirection) => {
    if(!deal.media[imageIndex + indexDirection]) {
      Animated.spring(imageXPos, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
      return;
    }
    setImageIndex(prevState => prevState + indexDirection);
    console.log('imageIndex', imageIndex);
    };
  
  
  useEffect(() => {
    imageXPos.setValue(0);
    Animated.spring(imageXPos, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  }, [imageIndex]);

  useEffect(() => {
    const fulldeal = ajax.fetchDealDetail(initialDealData.key);
    // console.log('fulldeal', fulldeal);
    // console.log('initialDealData', initialDealData);
    const fetchData = () => {
      setDeal(prevState => {
        return {...prevState, ...fulldeal}
      });
    };
    fetchData();
  }, [initialDealData]);

  openDealUrl = () => {
    Linking.openURL(deal.url); 
  };

  handlePress = () => {
    onBack();
  }

    return (
        <View style={styles.deal}>
          <TouchableOpacity onPress={handlePress} style={styles.backButton}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <View style={styles.detail}>
            <Animated.Image 
              {...imagePanResponder.panHandlers}
              source={{uri: deal.media[imageIndex]}}
              style={[{left: imageXPos},styles.image]}
              />
            <View style={styles.info}>
                <Text style={styles.title}>{deal.title}</Text>
                
            </View>
            <View style={styles.footer}>
                <Text style={styles.cause}>{deal.cause.name}</Text>
                <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
                
              {deal.user && (
                <View style={styles.user}>
                  <Image source={{ uri: deal.user.avatar }} style={styles.avatar} />
                  <Text>{deal.user.name}</Text>
                </View>
              )}
            </View>
            <View style={styles.description}>
              <Text style={styles.descriptionText}>{deal.description}</Text>
            </View>
            <Button title="Buy this deal!" onPress={openDealUrl} />
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
    deal:{
        marginHorizontal: 12,      
    },
    image: {
        width: '100%',
        height: 150,
    },
    info: {
        padding: 10,
        backgroundColor: 'yellow',
        
      },
      detail:{
        borderColor: '#bbb',
        
      },
      title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
      },
      cause: {
        fontSize: 20,
      },
      price: {
        fontSize: 20,
        fontWeight: 'bold', 
      },
      avatar: {
        width: 60,
        height: 60,
      },
      description: {
        borderColor: '#bbb',
        borderWidth: 1,
        borderTopWidth: 1,
      },
      descriptionText: {
        fontSize: 18,
        padding: 10,
        textAlign: 'center',
      },
      user: {
        alignItems: 'flex-end',
        margin: 20,
      },
      backButton: {
        marginBottom: 10,
      },
      buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
      },
});