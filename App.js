import 'react-native-gesture-handler';
import React from 'react';
import {Router} from './src/routes/Router';
import { AuthProvider } from './src/contexts/Auth';
import { Provider } from './src/screens/context/context';
const App = () => {
  return (
    <Provider>
    <AuthProvider>
      <Router /> 
      </AuthProvider>
      </Provider>
  );
}
export default App;


