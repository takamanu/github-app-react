/* eslint-disable */

// SearchBarComponent.js

import React, { FC } from 'react';
import { SearchBar } from 'react-native-elements';

type SearchBarComponentProps = {
  searchText: string;
  onSearchTextChange: (text: string) => void;
  onBlur: () => void;
}

const SearchBarComponent: FC<SearchBarComponentProps> = ({ searchText, onSearchTextChange, onBlur }) => {
  return (
    <SearchBar
      platform="android"
      style={{
        fontFamily: 'Nunito-Regular'
      }}
      onChangeText={onSearchTextChange}
      placeholder="Search name..."
      placeholderTextColor="#888"
      value={searchText}
      onBlur={onBlur}
    />
  );
};

export default SearchBarComponent;
