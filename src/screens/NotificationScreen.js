import React,{useContext} from 'react';
import {View,Text,TouchableOpacity,FlatList, ActivityIndicator} from 'react-native'
import { styles } from './styles';
import NotificationItem from '../components/NotificationItem';
import { useIsFocused } from '@react-navigation/native';
import APIManager from '../../managers/APIManger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from './context/context';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
const NotificationScreen=({navigation})=> {
   
    const focus=useIsFocused()
    const {item1,item2,item3} = useContext(AppContext)
    const[cart,setCart]=item1;
    const[orderdata,setorderdata]=item2;
    const[uri,seturi]=item3;
    const[approve,setapprove]=React.useState([])
   React.useEffect(()=>{
   
       async function func(){
         console.log(cart)
          const res=await new APIManager().orderinfo(cart)
          if(res.message==="*** Array of Drivers who have confirmed the order ****")
          {
              setapprove(res.distance)
          }
        

               
       }
       func()
   },[focus])
   
    const navigate = async(item) => {
      
        
          const res=await new APIManager().updateOrder(JSON.stringify({
            finalDriver:item
          }),cart)
          if(res.message==="*** Customer Updated SuccessFully ***")
          {
            navigation.navigate('ActiveOrderScreen')
           
           
        }
          else{
              alert('Cant approve order at a time Try again later')
          }

   
    //    console.log(orderid)
    }
    const EmptyComponent=()=>{
        return(
            <View style={{flex:1,alignItems:'center'}}>
                <Text>No Pickup Requests found</Text>
            </View>
        )
    }
    const[request,setRequest]=React.useState([{OrderID:'1234',title:'You have got a pickup Request',username:'username here',address:'East 46th Street, New York Pizza, Italian'},
    {OrderID:'1221',title:'You have got a pickup Request',username:'username here',address:'East 46th Street, New York Pizza, Italian'},
    {OrderID:'1287',title:'You have got a pickup Request',username:'username here',address:'East 46th Street, New York Pizza, Italian'},
    {OrderID:'1324',title:'You have got a pickup Request',username:'username here',address:'East 46th Street, New York Pizza, Italian'},
    {OrderID:'5435',title:'You have got a pickup Request',username:'username here',address:'East 46th Street, New York Pizza, Italian'},
    {OrderID:'3454',title:'You have got a pickup Request',username:'username here',address:'East 46th Street, New York Pizza, Italian'},
    {OrderID:'8678',title:'You have got a pickup Request',username:'username here',address:'East 46th Street, New York Pizza, Italian'},
    {OrderID:'5453',title:'You have got a pickup Request',username:'username here',address:'East 46th Street, New York Pizza, Italian'}
])
    return (
        <View style={styles.notificationContainer}>
          
           <FlatList
                data={approve}
                renderItem={({ item }) =>
                    <NotificationItem
                        item={item}
                        onPress={navigate}

                    />
                }
                showsVerticalScrollIndicator={false}
                style={{ marginTop: 10 }}
                ListEmptyComponent={EmptyComponent}
              
            />
            
            
        </View>
        
    );
}

export default NotificationScreen;