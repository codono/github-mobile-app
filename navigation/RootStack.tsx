import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useContext} from 'react';
import {Home} from '../pages/Home';
import {Context} from '../provider/RootProvider';

const Stack = createNativeStackNavigator();

function RootStack(): React.ReactElement {
  const {organizationName, repositoryName} = useContext(Context);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="home"
        screenOptions={{title: `${organizationName} / ${repositoryName}`}}>
        <Stack.Screen name="home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStack;
