import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {Text,View} from 'react-native'
import { SvgXml } from 'react-native-svg';
import svg from '../svg';
import { styles } from '../styles';
import NotificationScreen from '../NotificationScreen'
import ActiveOrderScreen from '../ActiveOrderScreen';
import CompletedOrderScreen from '../CompletedOrderScreen';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
const Stack = createStackNavigator();

// const Tab = createBottomTabNavigator();

export const NotificationStack = (props) => {
  
  return (
    <Stack.Navigator
      initialRouteName={"NotificationScreen"}
      screenOptions={{
        headerShown: false,
        // headerTitle: true,
        headerTitleAlign: "center"

      }}
    >
       <Stack.Screen  options={{
           headerShown:true,
             tabBarLabel: 'Notifications',
             headerTitleAlign:'left',
             headerLeft:()=>(
                <SvgXml style={{marginLeft:15,marginRight:-8}} xml={svg.bell}/>
             ),
             title:"Notification",
             headerTitleStyle:{fontFamily:'Quicksand-Bold'},
       }} name="NotificationScreen" component={NotificationScreen} />
       <Stack.Screen  options={{
           headerShown:false,
           
             headerTitleAlign:'left',
            
             title:`Orders # is active Now`,
             headerTitleStyle:{fontFamily:'Quicksand-Bold'},
       }} name="ActiveOrderScreen" component={ActiveOrderScreen} />
        <Stack.Screen  options={{
           headerShown:false,
           
             headerTitleAlign:'left',
             headerLeft:()=>(
                <SvgXml style={{marginLeft:15,marginRight:-8}} xml={svg.square}/>
             ),
             title:`Orders #  is active Now`,
             headerTitleStyle:{fontFamily:'Quicksand-Bold'},
       }} name="CompletedOrderScreen" component={CompletedOrderScreen} />
      
      
     
    </Stack.Navigator>)
}