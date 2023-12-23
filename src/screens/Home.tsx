/* eslint-disable */

import * as React from 'react';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackPramList } from '../App';
import ProductItem from '../components/ProductItem';
import Separator from '../components/Separator';
import SearchBarComponent from '../components/SearchBar';
import { User } from '../data/user';
import { searchUsers } from '../api/api';
import Snackbar from 'react-native-snackbar'; // Import Snackbar from the library

type HomeProps = NativeStackScreenProps<RootStackPramList, 'Home'>;

const Home: React.FC<HomeProps> = ({ navigation }: HomeProps) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);

  const handleSearch = async () => {
    try {
      if (!searchText.trim()) {
        // If searchText is empty or contains only whitespace
        Snackbar.show({
          text: 'Please enter a name to search',
          duration: Snackbar.LENGTH_SHORT,
        });
        return;
      }

      const results = await searchUsers(searchText);

      if (results == Error) {
        // If searchText is empty or contains only whitespace
        Snackbar.show({
          text: 'Github user not found',
          duration: Snackbar.LENGTH_SHORT,
        });
        return;
      }
      
      // console.log('Search Results:', results);
      setSearchResults(results);
    } catch (error) {
      console.log('Error during GitHub search:', error);
    }
  };

  const onBlurSearch = () => {
    handleSearch();
  };

  return (
    <View style={styles.container}>
      <SearchBarComponent
        searchText={searchText}
        onSearchTextChange={(text: string) => setSearchText(text)}
        onBlur={() => onBlurSearch()} // Trigger search on blur
      />
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={Separator}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              navigation.navigate('Details', {
                user: item.login,
              });
            }}>
            <ProductItem user={item} />
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
  },
});

export default Home;
