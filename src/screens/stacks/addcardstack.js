import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {Text,View} from 'react-native'
import { SvgXml } from 'react-native-svg';
import svg from '../svg';
import { styles } from '../styles';
import NotificationScreen from '../NotificationScreen'

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();
import ManagePaymentScreen from '../AddCardScreen';
export const addcardstack = (props) => {
    //  const  order_id  = props.route.params.orderid
  return (
    <Stack.Navigator
     
      screenOptions={{
        headerShown: false,
        // headerTitle: true,
        headerTitleAlign: "center",
        headerLeft:null
        

      }}
    >
     
      
      
     
    </Stack.Navigator>)
}