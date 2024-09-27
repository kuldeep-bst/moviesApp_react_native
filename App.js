// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from './screens/ListScreen';
import MovieDetailScreen from './screens/MovieDetailScreen';


const Stack = createStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Movies">
        <Stack.Screen name="Movies" component={ListScreen} />
        <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
