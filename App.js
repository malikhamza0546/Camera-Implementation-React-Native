import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import CameraImplmentation from './CameraImplmentation';
import StickerImplmentation from './StickerImplmentation';
import React, {Fragment, Component} from 'react';

const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CameraImplmentation">
        <Stack.Screen
          name="CameraImplmentation"
          component={CameraImplmentation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StickerImplmentation"
          component={StickerImplmentation}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
