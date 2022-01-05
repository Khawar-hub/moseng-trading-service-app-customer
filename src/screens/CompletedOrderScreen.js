import React,{useContext} from 'react';
import { View, Text, TouchableOpacity, TextInput,ScrollView,ActivityIndicator } from 'react-native'
import { SvgXml } from 'react-native-svg';
import MapView, { Marker } from "react-native-maps";
import { styles } from './styles';
import svg from './svg';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { AppContext } from './context/context';
import APIManager from '../../managers/APIManger';
const CompletedOrderScreen = ({navigation,route}) => {
    const {item1,item2} = useContext(AppContext)
    
    const[orderdata,setorderdata]=item2;
    const rf=React.useRef()
    const rf1=React.useRef()
    const rf2=React.useRef()
    const [loader,setloader]=React.useState(false)
    const[rating,setrating]=React.useState({rating:''})
    const navigate = async() => {
        setloader(true)
        const formdata=new FormData()
        formdata.append('OrderId',orderdata.id)
        formdata.append('Review','Good')
        formdata.append('Ratting',rating.rating)
       console.log(formdata)
          const res=await new APIManager().rating(formdata)
          if(res.success===true)
          {
            navigation.navigate('HomeScreen')
            navigation.reset({
                index: 0,
                routes: [{name: 'Notification'}],
              });
              setloader(false)
        }
          else{
              alert(res.message)
              navigation.navigate('HomeScreen')
              setloader(false)
          }

   
    
    }
    
    return (
        <>
         <View style={{flexDirection:'row',height:55,width:'100%',backgroundColor:"#fff",alignItems:'center',justifyContent:"flex-start"}}>
        <SvgXml style={{marginLeft:15,marginRight:-8}} xml={svg.square}/>
          <Text style={{fontFamily:'Quicksand-Bold',fontSize:20,marginLeft:20,color:"#000"}}>Order # {orderdata.id.substring(0,6)} is Completed</Text>
        </View>
        <View style={[styles.postcontainer]}>
            <View style={[styles.postcontainerChild,{alignItems:'center',justifyContent:'center'}]}>

                <SvgXml xml={svg.pic}/>
                <Text style={[styles.heading,{marginTop:8,marginBottom:8}]}>Post Review</Text>
                <AirbnbRating
                showRating={false} 
                size={23}
                starContainerStyle={{width:'48%',flexDirection:'row',justifyContent:'space-between'}}
                onFinishRating={(rating)=>setrating({...rating,rating:rating})}
                
               />
                <Text style={[styles.heading,{marginTop:8,marginBottom:8}]}>You Spent :</Text>
                <Text style={[styles.preheadingText,{fontSize:27,marginTop:-5}]}>{orderdata.price} $</Text>
               
                 



            </View>
            <TouchableOpacity onPress={navigate} style={[styles.button,{marginBottom:10,marginTop:10}]}>
               {loader?<ActivityIndicator size={20} color={'#fff'}/>:<Text style={styles.btnText}>Back to Home</Text>}
 

           </TouchableOpacity>



        </View>
        
    </>

    );
}

export default CompletedOrderScreen;