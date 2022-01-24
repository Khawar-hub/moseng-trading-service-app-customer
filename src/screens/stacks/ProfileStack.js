import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {Text,View} from 'react-native'
import ManagePaymentScreen from '../ManagePaymentScreen';
import ProfileScreen from '../ProfileSceen';
import { SvgXml } from 'react-native-svg';
import svg from '../svg';
import { styles } from '../styles';
import EditProfileScreen from '../EditProfileScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
const Stack = createStackNavigator();

// const Tab = createBottomTabNavigator();

export const ProfileStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName={"ProfileScreen"}
      screenOptions={{
        headerShown: false,
        // headerTitle: true,
        headerTitleAlign: "center"

      }}
    >
       <Stack.Screen  options={{
             headerTitleStyle:{color:'#fff'},
             headerShown:true,
             headerStyle:{elevation:0},
             headerRight:()=>(
              <TouchableOpacity onPress={()=>navigation.navigate('EditProfile')}><Text style={styles.headerRightText}>Edit</Text></TouchableOpacity> 
             ),
             headerLeft:()=>(
               <SvgXml style={{marginLeft:20}} xml={svg.backarrow}/>
             ),
       }} name="ProfileScreen" component={ProfileScreen} />
       <Stack.Screen
       options={{
           headerShown:true,
           
           headerTitleAlign:'left',
           headerLeft:()=>(
              <SvgXml style={{marginLeft:15,marginRight:-8}} xml={svg.managepayment}/>
           ),
           title:"Manage Payment",
           headerTitleStyle:{fontFamily:'Quicksand-Bold'},
       }}
       
       name="ManagePayment" component={ManagePaymentScreen} />
       <Stack.Screen
       options={{
           headerShown:true,
           headerTitleAlign:'left',
           headerLeft:()=>(
              <SvgXml style={{marginLeft:15,marginRight:-8}} xml={svg.headeruser}/>
           ),
           title:"Edit Profile",
           headerTitleStyle:{fontFamily:'Quicksand-Bold',marginLeft:6},
       }}
       
       name="EditProfile" component={EditProfileScreen} />
      
     
    </Stack.Navigator>)
}