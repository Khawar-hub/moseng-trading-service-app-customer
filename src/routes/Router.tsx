import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View,ActivityIndicator} from 'react-native'
import {AppStack} from './AppStack'
import {AuthStack }from './AuthStack'
import { useAuth } from '../contexts/Auth';


// import {Loading} from '../components/Loading';

export const Router = () => {
  
  const {authData, loading} = useAuth();
  if (loading) {
    return(
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
    <ActivityIndicator size={30} color={'#731D3A'}/>
    </View>
    )
  }
  else
  return (
    <NavigationContainer>
      {authData ? <AppStack /> : <AuthStack />}
      

    </NavigationContainer>
  );
};