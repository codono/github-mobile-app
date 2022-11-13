/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import RootStack from './navigation/RootStack';
import {RootProvider} from './provider/RootProvider';

const App = () => {
  return (
    <RootProvider>
      <RootStack />
    </RootProvider>
  );
};

export default App;
