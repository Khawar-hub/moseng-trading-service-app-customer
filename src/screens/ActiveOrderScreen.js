import React,{useContext} from 'react';
import { View, Text, TouchableOpacity, TextInput,ScrollView ,ActivityIndicator} from 'react-native'
import { SvgXml } from 'react-native-svg';
import MapView, { Marker } from "react-native-maps";
import Direction from 'react-native-maps-directions';
import { styles } from './styles';
import svg from './svg';
import APIManager from '../../managers/APIManger';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { AppContext } from './context/context';
const ActiveOrderScreen = ({navigation,route}) => {
    const {item1,item2} = useContext(AppContext)
    
    const[orderdata,setorderdata]=item2;
    
    React.useEffect(()=>{
                 console.log(orderdata.id)
    },[])  
    const rf=React.useRef()
    const rf1=React.useRef()
    const rf2=React.useRef()
    const [loader,setloader]=React.useState(false)
    const navigate = async() => {
        setloader(true)
        const formdata=new FormData()
        formdata.append('OrderId',orderdata.id)
        formdata.append('Status','Completed')
          const res=await new APIManager().updatestatus(formdata)
          if(res.success===true)
          {
            navigation.navigate('CompletedOrderScreen')
              setloader(false)
        }
          else{
              alert('Cant Finalize Order Now Try Again Later')
              setloader(false)
          }

   
    
    }
    return (
        <>
        <View style={{flexDirection:'row',height:55,width:'100%',backgroundColor:"#fff",alignItems:'center',justifyContent:"flex-start"}}>
        <SvgXml style={{marginLeft:15,marginRight:-8}} xml={svg.square}/>
          <Text style={{fontFamily:'Quicksand-Bold',fontSize:20,marginLeft:20,color:'#000'}}>Order # {orderdata.id.substring(0,6)} is active Now</Text>
        </View>
        <View style={[styles.postcontainer]}>

            <View style={styles.postcontainerChild}>
               
            <MapView
                style={{flex:1}}
                initialRegion={{
                latitude: parseFloat(orderdata.pickuplat),
                longitude: parseFloat(orderdata.pickuplng),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
            >
                 <Marker
                            image={require('../../assets/images/car.jpg')}
                            
                            coordinate={{
                                latitude: parseFloat(orderdata.pickuplat),
                                longitude: parseFloat(orderdata.pickuplng)
                            }}
                        />
                        <Marker
                            
                            coordinate={{
                                latitude: parseFloat(orderdata.dropofflat),
                                longitude: parseFloat(orderdata.dropofflng)
                            }}
                        />
                          <Direction
                            origin={{
                                latitude: parseFloat(orderdata.pickuplat),
                                longitude: parseFloat(orderdata.pickuplng)
                            }}
                            destination={{
                                latitude: parseFloat(orderdata.dropofflat),
                                longitude: parseFloat(orderdata.dropofflng)
                            }}
                            apikey={'AIzaSyAW5O831v7xI0OVGJufVHJiIcJgeMybNdA'}
                            strokeColor='#0377FF'
                            strokeWidth={4}
                        />
            </MapView>



            </View>
            <TouchableOpacity onPress={navigate} style={[styles.button,{marginBottom:10,marginTop:10}]}>
               {loader?<ActivityIndicator size={20} color={'#fff'}/>:<Text style={styles.btnText}>Finalize Order</Text>}
 

           </TouchableOpacity>



        </View>
        
    </>

    );
}

export default ActiveOrderScreen;