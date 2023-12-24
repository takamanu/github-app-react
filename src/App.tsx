/* eslint-disable */

import React from 'react'

//Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import { useDynamicFonts} from 'react-native-dynamic-fonts'

import Home from './screens/Home'
import Details from './screens/Details'
import { fonts } from 'react-native-elements/dist/config'

fonts.android.regular = {
  fontFamily : "Nunito-Regular",
  fontWeight : "100"
}

export type RootStackPramList = {
   Home: undefined;
   Details: {user: string};
}

const Stack = createNativeStackNavigator<RootStackPramList>()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "GithubApp",
          headerTitleStyle: {
            fontFamily: 'Nunito-Bold'
          }
        }}
        />
        <Stack.Screen
        name="Details"
        component={Details}
        options={{
          title: "User Details",
          headerTitleStyle: {
            fontFamily: 'Nunito-Bold'
          }
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App