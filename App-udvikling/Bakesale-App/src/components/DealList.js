import { StyleSheet, View, FlatList} from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import DealItem from './DealItem';


DealList.propTypes = {
    deals: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired,
};

export default function DealList({deals, onItemPress}) {
    return (
        <View style={styles.list}>
            <FlatList style={styles.flatList}
                data={deals}
                renderItem={({item}) => <DealItem deal={item} onItemPress={onItemPress}/>}
            />    
        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#eee',
        width: '100%',
    },
})