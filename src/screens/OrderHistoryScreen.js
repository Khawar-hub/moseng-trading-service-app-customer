import React,{useContext} from 'react';
import {View,Text,TouchableOpacity,FlatList, ActivityIndicator} from 'react-native'
import { styles } from './styles';
import OrderHistoryItem from '../components/OrderHistoryItem';
import APIManager from '../../managers/APIManger';
import { formatStackTrace } from 'expo-cli/build/utils/formatStackTrace';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { AppContext } from './context/context';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
const OrderHistoryScreen=({navigation})=> {
    const {item1,item2} = useContext(AppContext)
    const[cart,setCart]=item1;
    const[orderdata,setorderdata]=item2;
    
    
    const focus=useIsFocused()
    const[user,setuser]=React.useState([])
    const[orders,setorder]=React.useState([])
    const[loader,setloader]=React.useState(false)
   React.useEffect(()=>{
   
       async function func(){
           setloader(true)
          
        setuser(JSON.parse(await AsyncStorage.getItem('User')))
           const formdata=new FormData()
               formdata.append("UserId",JSON.parse(await AsyncStorage.getItem('User')).map((ietm)=>{return ietm._id}).toString())
               const res=await new APIManager().getallorder(formdata)
               if(res.success===true)
               {
                   setorder(res.Data)
                   console.log(res)

                   setloader(false)
               }
               else{
                   
                   setloader(false)
               }

       }
       func()
   },[focus])
    const navigate = async(item,length,arr) => {
        if(length===0){
            alert('No Requests exists for this Order')
        }
        else{
            setorderdata({price:item.Price,id:item._id,pickuplat:item.PickUpLat,pickuplng:item.PickUpLong,dropofflat:item.DropOfLat,dropofflng:item.DropOfLong})
       setCart(item.PickUpRequests)
       navigation.navigate('Notifications',{screen:'NotificationScreen'})
     
      
       
      
        }
    }
    const[orderhistory,setRequest]=React.useState([
    {OrderID:'Orders # 1234',Time:'10:00 PM',address:'East 46th Street, New York Pizza, Italian',price:'200 $'},
    {OrderID:'Orders # 1234',Time:'10:00 PM',address:'East 46th Street, New York Pizza, Italian',price:'200 $'},
    {OrderID:'Orders # 1234',Time:'10:00 PM',address:'East 46th Street, New York Pizza, Italian',price:'200 $'},
    {OrderID:'Orders # 1234',Time:'10:00 PM',address:'East 46th Street, New York Pizza, Italian',price:'200 $'},
    {OrderID:'Orders # 1234',Time:'10:00 PM',address:'East 46th Street, New York Pizza, Italian',price:'200 $'},
    {OrderID:'Orders # 1234',Time:'10:00 PM',address:'East 46th Street, New York Pizza, Italian',price:'200 $'},
    {OrderID:'Orders # 1234',Time:'10:00 PM',address:'East 46th Street, New York Pizza, Italian',price:'200 $'}
])
    return (
        <View style={styles.notificationContainer}>
           {loader?<ActivityIndicator style={{marginTop:250}} size={20} color={'#000'}/>:
           <FlatList
                data={orders.reverse()}
                renderItem={({ item }) =>
                    <OrderHistoryItem
                        item={item}
                        onPress={navigate}

                    />
                }
                showsVerticalScrollIndicator={false}
                style={{ marginTop: 15 }}
              
            />
}
            
        </View>
        
    );
}

export default OrderHistoryScreen;