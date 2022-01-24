import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from '../screens/styles';
const OrderHistoryItem = (props) => {
    const press=(item,length,pick,drop)=>{
        props.onPress(item,length,pick,drop)
    }

    return (
        <TouchableOpacity onPress={()=>press(props.item._id,props.item.orderConfByDrivers.length,props.item.pickUpLoc,props.item.dropLoc)} style={[styles.listItem,{paddingHorizontal:20,marginTop:15}]}>
            <View style={styles.topRowView}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
               <Text style={[styles.title,{width:'80%'}]}>{props.item.date.substring(0,10)}</Text>
              
               </View>
               
               <View style={{position:'absolute',right:-20,top:-20,height:20,width:20,borderRadius:20,backgroundColor:'#731D3A',marginLeft:5,marginTop:3,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{color:'#fff'}}>{props.item.orderConfByDrivers.length}</Text>

               </View>

            </View>
          
            <Text style={styles.time}>{props.item.date.substring(11,16)} PM</Text>
            <Text style={[styles.address,{marginTop:10}]}>{props.item.totalDist} KM</Text>
           


        </TouchableOpacity>
    );
}

export default OrderHistoryItem;