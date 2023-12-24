/* eslint-disable */

import React from 'react'
//Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { DrawerActions } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
// import { useDynamicFonts} from 'react-native-dynamic-fonts'

import Home from './screens/Home'
import Details from './screens/Details'
import { fonts } from 'react-native-elements/dist/config'

fonts.android.regular = {
  fontFamily: "Nunito-Regular",
  fontWeight: "100"
}

export type RootStackPramList = {
  Home: undefined;
  Details: { user: string };
}

const Stack = createNativeStackNavigator<RootStackPramList>()

const App = (navigation: any) => {

  const handleOptionsPress = () => {
    // Handle the press for the options icon
    // For example, navigate to another screen
  };

  const handleFavoritePress = () => {
    // Handle the press for the favorite icon
    // For example, navigate to another screen
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'GithubApp',
            headerTitleStyle: {
              fontFamily: 'Nunito-Bold',
            },
            headerRight: () => (
              <>
                <TouchableOpacity
                  style={{ flexDirection: 'row', marginRight: 20 }}
                  onPress={handleOptionsPress}
                >
                  <Icon
                    name="favorite"
                    size={24}
                    color="black"
                    style={{ marginLeft: 10 }}
                    onPress={handleFavoritePress}
                  />

                </TouchableOpacity>
                <TouchableOpacity
                  style={{ flexDirection: 'row', marginRight: 5 }}
                  onPress={handleOptionsPress}
                >
                  <Icon name="more-vert" size={24} color="black" />
                </TouchableOpacity>

              </>
            ),
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={({ route }) => ({
            title: `User Details: ${route.params.user}`,
            headerTitleStyle: {
              fontFamily: 'Nunito-Bold',
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App