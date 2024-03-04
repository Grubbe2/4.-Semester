import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';
import {priceDisplay} from '../util';

DealDetail.propTypes = {
  initialDealData: PropTypes.object.isRequired,
};

export default function DealDetail({initialDealData}) {
  const [deal, setDeal] = useState(initialDealData);
  
  useEffect(() => {
    const fetchData = () => {
      setDeal(prevState => {
        return {...prevState, ...initialDealData}
      });
    };
    fetchData();
   console.log('deal', deal);
  }, [initialDealData]);

    return (
        <View style={styles.deal}>
            <Image source={{uri: deal.media[0]}}
            style={styles.image}
            />
            <View style={styles.info}>
                <Text style={styles.title}>{deal.title}</Text>
                <View style={styles.footer}>
                    <Text style={styles.cause}>{deal.cause.name}</Text>
                    <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
                </View>
            </View>
            <Text>...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    deal:{
        marginHorizontal: 12,
        marginTop: 50,
    },
    image: {
        width: '100%',
        height: 150,
    },
    info: {
        padding: 10,
        backgroundColor: '#fff',
        borderColor: '#bbb',
        borderWidth: 1,
        borderTopWidth: 0,
      },
      title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      footer: {
        flexDirection: 'row',
      },
      cause: {
        flex: 2,
      },
      price: {
        flex: 1,
        textAlign: 'right',
      },
});