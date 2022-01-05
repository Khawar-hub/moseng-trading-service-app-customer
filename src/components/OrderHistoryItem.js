import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from '../screens/styles';
const OrderHistoryItem = (props) => {
    const press=(item,length,arr)=>{
        props.onPress(item,length,arr)
    }

    return (
        <TouchableOpacity onPress={()=>press(props.item,props.item.PickUpRequests.length,props.item.PickUpRequests)} style={[styles.listItem,{paddingHorizontal:20,marginTop:15}]}>
            <View style={styles.topRowView}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
               <Text style={styles.title}>{props.item.Title}</Text>
              
               </View>
               <Text style={styles.price}>Price : {props.item.Price}</Text>
               <View style={{position:'absolute',right:-20,top:-20,height:20,width:20,borderRadius:20,backgroundColor:'#731D3A',marginLeft:5,marginTop:3,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{color:'#fff'}}>{props.item.PickUpRequests.length}</Text>

               </View>

            </View>
          
            <Text style={styles.time}>{props.item.createdAt.substring(11,16)} PM</Text>
            <Text style={[styles.address,{marginTop:10}]}>{props.item.address}</Text>
           


        </TouchableOpacity>
    );
}

export default OrderHistoryItem;