import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {SvgXml} from 'react-native-svg';
const Tab = createBottomTabNavigator();
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen'
import PostScreen from '../screens/PostScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import svg from '../screens/svg';
import { ProfileStack } from '../screens/stacks/ProfileStack';
import { NotificationStack } from '../screens/stacks/NotificationStack';
const BottomTab=()=> {
  return (
    <Tab.Navigator
          
        screenOptions={{
            headerShown:true,
            headerTitleAlign:'center',
          tabBarHideOnKeyboard:true,
          tabBarActiveTintColor:"#731D3A",
          tabBarInactiveTintColor:'#9D9D9D',
          tabBarStyle:{paddingBottom:5}
          
        
        }}  
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen}
        options={{
          headerShown:false,
          headerTitleAlign:'left',
          tabBarLabel: 'Home',
          
          headerTitleStyle:{fontFamily:'Quicksand-Bold'},
          headerStyle:{elevation:0},
          tabBarIcon: ({color}) => (
            <SvgXml  xml={`<svg xmlns="http://www.w3.org/2000/svg" width="22.78" height="25.9" viewBox="0 0 22.78 25.9">
            <g id="home-minimal" transform="translate(1.25 1.25)">
              <path id="Shape" d="M10.14,0,0,10.92V23.4H7.8V17.16h4.68V23.4h7.8V10.92Z" fill="none" stroke="${color}" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2.5"/>
            </g>
          </svg>
          `} ></SvgXml>
          ),
        }}
      />
       <Tab.Screen name="Notifications" component={NotificationStack}
        options={{
         headerShown:false,
         
          tabBarIcon: ({color}) => (
            <SvgXml  xml={`<svg xmlns="http://www.w3.org/2000/svg" width="21.782" height="25.743" viewBox="0 0 21.782 25.743">
            <path id="Icon_ionic-md-notifications" data-name="Icon ionic-md-notifications" d="M16.516,29.118a2.576,2.576,0,0,0,2.563-2.574H13.954A2.576,2.576,0,0,0,16.516,29.118ZM24.845,21.4V14.316a8.343,8.343,0,0,0-6.407-8.109v-.9a1.922,1.922,0,1,0-3.844,0v.9a8.343,8.343,0,0,0-6.407,8.109V21.4L5.625,23.969v1.287H27.407V23.969Z" transform="translate(-5.625 -3.375)" fill="${color}"/>
          </svg>
          `} ></SvgXml>
          ),
        }}
      />
       <Tab.Screen name="Post" component={PostScreen}
        options={{
     
          tabBarLabel: 'Post',
          headerTitleAlign:'left',
          headerLeft:()=>(
             <SvgXml style={{marginLeft:15,marginRight:-8}} xml={svg.postorder}/>
          ),
          title:"Post Order",
          headerTitleStyle:{fontFamily:'Quicksand-Bold'},
          tabBarIcon: ({color}) => (
            <SvgXml  xml={`<svg xmlns="http://www.w3.org/2000/svg" width="24.938" height="24.938" viewBox="0 0 24.938 24.938">
            <path id="Icon_awesome-plus-circle" data-name="Icon awesome-plus-circle" d="M13.031.563A12.469,12.469,0,1,0,25.5,13.031,12.467,12.467,0,0,0,13.031.563Zm7.24,13.877a.605.605,0,0,1-.6.6H15.042v4.626a.605.605,0,0,1-.6.6H11.623a.605.605,0,0,1-.6-.6V15.042H6.395a.605.605,0,0,1-.6-.6V11.623a.605.605,0,0,1,.6-.6H11.02V6.395a.605.605,0,0,1,.6-.6h2.816a.605.605,0,0,1,.6.6V11.02h4.626a.605.605,0,0,1,.6.6Z" transform="translate(-0.563 -0.563)" fill="${color}"/>
          </svg>
          
          `} ></SvgXml>
          ),
        }}
      />
      <Tab.Screen name="OrderHistory" component={OrderHistoryScreen}
        options={{
          tabBarLabel: 'OrderHistory',
          headerTitleAlign:'left',
          headerLeft:()=>(
             <SvgXml style={{marginLeft:15,marginRight:-8}} xml={svg.orderhistory}/>
          ),
          title:"Order History",
          headerTitleStyle:{fontFamily:'Quicksand-Bold'},
          tabBarIcon: ({color}) => (
            <SvgXml  xml={`<svg xmlns="http://www.w3.org/2000/svg" width="18.192" height="25" viewBox="0 0 18.192 25">
            <g id="bookmark-2" transform="translate(0.5 0.5)">
              <path id="Shape" d="M0,22.5,7.846,18l7.846,4.5V3a2.828,2.828,0,0,0-2.615-3H2.615A2.828,2.828,0,0,0,0,3Z" transform="translate(0.75 0.75)" fill="none" stroke="${color}" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2.5"/>
            </g>
          </svg>
          
            `} ></SvgXml>
          ),
        }}
      />
       <Tab.Screen name="Profile" component={ProfileStack}
        options={{
        tabBarLabel: 'Profile',
        headerShown:false,
         
          tabBarIcon: ({color}) => (
            <SvgXml  xml={`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="25" viewBox="0 0 22 25">
            <g id="single-01" transform="translate(0.5 0.5)">
              <path id="Shape" d="M19.5,3.728a1.5,1.5,0,0,0-.639-1.23A15.55,15.55,0,0,0,9.75.014,15.55,15.55,0,0,0,.639,2.5,1.5,1.5,0,0,0,0,3.728V7.514H19.5Z" transform="translate(0.75 15.736)" fill="none" stroke="${color}" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2.5"/>
              <circle id="Oval" cx="5.25" cy="5.25" r="5.25" transform="translate(5.25 0.75)" fill="none" stroke="${color}" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2.5"/>
            </g>
          </svg>
          
            `} ></SvgXml>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default BottomTab;