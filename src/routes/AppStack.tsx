import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTab from '../Tabs/BottomTab';

import { SvgXml } from 'react-native-svg';
import svg from '../screens/svg'
const Stack = createStackNavigator();
export const AppStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
             
            headerTitleAlign:'center'

        }}>
        
           
           <Stack.Screen name="AppStack" component={BottomTab} />
            
            
            
        </Stack.Navigator>
    );
}