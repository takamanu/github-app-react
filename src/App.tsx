/* eslint-disable */

import React from 'react'

//Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from './screens/Home'
import Details from './screens/Details'

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
          title: "GithubApp"
        }}
        />
        <Stack.Screen
        name="Details"
        component={Details}
        options={{
          title: "User Details"
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App