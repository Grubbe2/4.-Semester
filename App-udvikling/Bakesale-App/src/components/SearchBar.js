
import React, { useState, useEffect }from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, StyleSheet} from 'react-native';
import debounce from 'lodash.debounce';

SearchBar.propTypes = {
    searchDeals: PropTypes.func.isRequired,
  };

export default function SearchBar({ searchDeals }) {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchDeals  = debounce(searchDeals, 300);
    
    useEffect(() => {
        debouncedSearchDeals(searchTerm);
    }, [searchTerm]);

    const handleChange = (searchTerm) => {
        setSearchTerm(searchTerm);
    }

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.input} 
                placeholder="Search All Deals"
                onChangeText={handleChange}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 12,
        borderColor: '#bbb',
        borderWidth: 1,
    },
    input: {
        height: 40,
        marginHorizontal: 10,
    },
});