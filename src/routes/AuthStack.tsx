import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen'
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import UploadDocScreen from '../screens/UploadDocScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import VerificationScreen from '../screens/VerificationScreen';
import BottomTab from '../Tabs/BottomTab';

import { SvgXml } from 'react-native-svg';
import svg from '../screens/svg'
import UpdatePassword from '../screens/UpdatePassword'
import {addcardstack} from '../screens/stacks/addcardstack'
import ManagePaymentScreen from '../screens/AddCardScreen';
const Stack = createStackNavigator();
export const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
             
            headerTitleAlign:'center'
        

        }}>
           <Stack.Screen name="SplashScreen" component={SplashScreen} />
           <Stack.Screen name="LoginScreen" component={LoginScreen} />
           <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
           <Stack.Screen name="UploadDocScreen" component={UploadDocScreen} />
           <Stack.Screen name="Update" component={UpdatePassword} />
           <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
           <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
           <Stack.Screen name="Payment" options={{headerLeft:()=>null}} component={ManagePaymentScreen} />
          

           
        
            
            
            
        </Stack.Navigator>
    );
}