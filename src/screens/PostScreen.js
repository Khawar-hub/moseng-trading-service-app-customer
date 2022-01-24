import React,{useContext} from 'react';
import { View, Text, TouchableOpacity, TextInput,StyleSheet,ScrollView ,ActivityIndicator} from 'react-native'
import { SvgXml } from 'react-native-svg';
import MapView, { Marker } from "react-native-maps";
import { styles } from './styles';
import svg from './svg';
import BottomSheet from 'reanimated-bottom-sheet';
import svgs from './utils/svgs';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import Modal from "react-native-modal";
import APIManager from '../../managers/APIManger';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from './context/context';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
const PostScreen = ({navigation}) => {
   
    const focus=useIsFocused()
    const[user,setuser]=React.useState([])
    const[trucks,settrucks]=React.useState([])
    React.useEffect(()=>{
        async function func(){
          setuser(JSON.parse(await AsyncStorage.getItem('User')))
          const res=await new APIManager().getAllTrucks()
          if(res.message==="*** Got Result ****")
          {
            let brand_array = res.allTrucks.map(brand => ({
                label: brand.name +" "+brand.size+ " T",
                value: brand._id
            }))
            settrucks(brand_array)
          }
          else{
              alert('No Trucks Found')
          }
         
        }
        func()
    },[focus])
    const googleApi=async()=>{
       

    }
    const[latlng,setlatlng]=React.useState({
        pickuplat: 22.9375,
        pickuplng:30.5595,
        dropofflat: 22.9375,
        dropofflng:30.5595
    })
    
    const rf=React.useRef()
    const rf1=React.useRef()
    const rf2=React.useRef()
    const [data,setData]=React.useState({
        date:new Date(),
        des1:'',
        truck:'',
        des2:'',
        avgSpeed:'',
        extra:''
    })
    const [validation, setValidation] = React.useState({
        isValidTitle: true,
        isValidPrice: true,
       
      
        isValidPicklat: true,
        isValidPicklng: true,
        isValidDroplat: true,
        isValidDroplng: true,
        isValidTruck:true,
        isValidExtra:true
       
       
    })
    const validateData = () => {
       
     
      
    
         if (data.truck === '') {
            setValidation({
                ...validation,
                isValidTruck: false
            })
            return;
        }
        else if (data.extra==='') {
            setValidation({
                ...validation,
                isValidExtra: false
            })
            return;
        }
       
        else if (latlng.pickuplat === 22.9375) {
            setValidation({
                ...validation,
                isValidPicklat: false
            })
            return;
        }
        else if (latlng.dropofflng === 30.5595) {
            setValidation({
                ...validation,
                isValidDroplng: false
            })
            return;
        }
      
       
        else {
          showModal()
          
        }
        
        
    }
    const[loader,setloader]=React.useState(false)
    const[total,settotal]=React.useState(0)
    const onSubmit=async()=>{
        
       
        setloader(true)
 
      
         
          
          try{
        const res=await new APIManager().addorder(JSON.stringify({
                   
                    date:data.date,
                    services:"61d42ee27add3f23d35e98ea",
                    postedBy:JSON.parse(await AsyncStorageLib.getItem('User')).myResult._id,
                    pickUpLoc:data.des1,
                    dropLoc:data.des2,
                    truckId:data.truck,
        }))
        if(res.message==="*** Order SuccessFully Posted ***")
        {
            settotal(Math.floor(100.0 + Math.random() * 900.0))
            // const ress=await new APIManager().googleapi(data.des1,data.des2)
            //  let speed=ress.rows[0].elements.map(i=>{return i.duration.text}).toString()
            const resp=await new APIManager().updateOrder(JSON.stringify({
                   
                pickUpLoc:data.des1,
                dropLoc:data.des2,
                    appoxSpeed:Math.floor(10 + Math.random() * 90),
                    // cardNumber: "4242 4242 4242 4242",
                    // expMM : 11,
                    // expYY : 2025,
                    // cvv: 123,
                    // email :'khawarqureshi87@gmail.com',
                    // name : card.name

                    
            }),res.addedOrder._id)

            showModal2()
           
             
             setloader(false)
        }
        else{
           alert('Cant place order')
             setloader(false)
        }
    }
        catch(e){
    console.log(e)
        }
    }
   
    const renderContent=()=>{
        return(
            <View style={styles.BottomSheet}>
                <TouchableOpacity onPress={()=>sheetRef.current.snapTo(2)}>
                <SvgXml xml={svgs.cross} style={{alignSelf:'flex-end',marginBottom:20}}/>
                </TouchableOpacity>
                    <GooglePlacesAutocomplete
                            fetchDetails={true}
                            suppressDefaultStyles={true}
                                placeholder='Enter Pickup location'
                                listViewDisplayed='auto'
                                styles={{
                                    textInputContainer: {
                                      backgroundColor: '#fff',
                                      justifyContent:'center',
                                      height:30,
                                      color: '#05375a',
                                      fontFamily:"Quicksand-Bold",
                                      marginLeft:10,
                                      width:300,
                                      borderWidth:1,
                                      borderColor:'gray',
                                      borderRadius:20
                                    },

                                    textInput:{
                                        paddingBottom:5,
                                        fontFamily:"Quicksand-Bold",
                                        paddingLeft:10  
                                    },
                                    listView:{
                                        width:'96%',
                                        zIndex:10,
                                        fontSize:20,
                                        marginTop:30,
                                        position:'absolute',
                                        backgroundColor:'#fff',
                                        paddingHorizontal:10,
                                    },
                                    separator: {
                                        height: 0.5,
                                        backgroundColor: '#c8c7cc',
                                      },
                                      loader: {
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end',
                                        height: 20,
                                      },
                                   row:{
                                       paddingVertical:7
                                   }
                                   
                                   
                                  }}
                                  onPress={(dataa,details) => {
                                   console.log(dataa)
                                   setlatlng({...latlng,pickuplat:details.geometry.location.lat,pickuplng:details.geometry.location.lng})
                                   map1.current.animateToRegion({
                                    latitude:details.geometry.location.lat,
                                    longitude:details.geometry.location.lng,
                                    latitudeDelta: 0.00922,
                                    longitudeDelta: 0.00421,
                                    },1)
                                   setData({...data,des1:dataa.description})
                                 
                                   setValidation({ ...validation, isValidPicklat: true })
                                  
                                  
                                }}
                                query={{
                                    key: 'AIzaSyAW5O831v7xI0OVGJufVHJiIcJgeMybNdA',
                                    language: 'en',
                                }}
                                /> 

            </View>
        )
    }
    const renderContent2=()=>{
        return(
            <View style={styles.BottomSheet}>
                <TouchableOpacity onPress={()=>sheetRef2.current.snapTo(2)}>
                <SvgXml xml={svgs.cross} style={{alignSelf:'flex-end',marginBottom:20}}/>
                </TouchableOpacity>
                    <GooglePlacesAutocomplete
                            fetchDetails={true}
                            suppressDefaultStyles={true}
                                placeholder='Enter Dropoff location'
                                listViewDisplayed='auto'
                                styles={{
                                    textInputContainer: {
                                      backgroundColor: '#fff',
                                      justifyContent:'center',
                                      height:30,
                                      color: '#05375a',
                                      fontFamily:"Quicksand-Bold",
                                      marginLeft:10,
                                      width:300,
                                      borderWidth:1,
                                      borderColor:'gray',
                                      borderRadius:20
                                    },

                                    textInput:{
                                        paddingBottom:5,
                                        fontFamily:"Quicksand-Bold",
                                        paddingLeft:10  
                                    },
                                    listView:{
                                        width:'96%',
                                        zIndex:10,
                                        fontSize:20,
                                        marginTop:0,
                                        position:'absolute',
                                        backgroundColor:'#fff',
                                        paddingHorizontal:10,
                                    },
                                    separator: {
                                        height: 0.5,
                                        backgroundColor: '#c8c7cc',
                                      },
                                      loader: {
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end',
                                        height: 20,
                                      },
                                   row:{
                                       paddingVertical:7
                                   }
                                   
                                   
                                  }}
                                  onPress={(dataa,details) => {
                                   console.log(details)
                                 
                                   setData({...data,des2:dataa.description})
                                    setValidation({ ...validation, isValidDroplng: true })
                                   
                                   sheetRef2.current.snapTo(2)
                                   map2.current.animateToRegion({
                                    latitude:dropofflat,
                                    longitude: dropofflng,
                                    latitudeDelta: 0.00922,
                                    longitudeDelta:0.00421,
                                    },1)
                                    
                                    
                                }}
                                query={{
                                    key: 'AIzaSyAW5O831v7xI0OVGJufVHJiIcJgeMybNdA',
                                    language: 'en',
                                }}
                                /> 

            </View>
        )
    }
    const sheetRef=React.useRef()
    const sheetRef2=React.useRef()
    const map1=React.useRef()
    const map2=React.useRef()
    const [open, setOpen] = React.useState(false)
const dobPress=()=>{
  setOpen(true)
  
}
const PickerIcon = () => {
    return (
        <View
            style={{
                backgroundColor: 'transparent',
                borderTopWidth: 8,
                borderTopColor: 'gray',
                borderRightWidth: 10,
                borderRightColor: 'transparent',
                borderLeftWidth: 10,
                borderLeftColor: 'transparent',
                width: 1,
                height: 1,
            }}
        />
    );
}
const onConfirm=()=>{
    alert("Order Placed")
    setModalVisible(false)
    setModalVisible2(false)
    navigation.navigate('OrderHistory')
}
const validateCard=()=>{
     
    if (card.name === '') {
       alert("Missing Card Details")
        return;
    }

    else if (card.cardno=== '') {
       
        alert("Missing Card Details")
        
        return;
        
    }
    else if (card.expiry=== '') {
       
        alert("Missing Card Details")
        
        return;
        
    }
    else if (card.cvv=== '') {
       
        alert("Missing Card Details")
        
        return;
        
    }
    else{
        onSubmit()
      
    }
}
const calculatesubs=(val)=>{
        
        setData({...data,truck:val})
        setValidation({...validation,isValidTruck:true})
   


}
const calculatesubss=(val)=>{
        
    setData({...data,extra:val})
    setValidation({...validation,isValidExtra:true})



}
const showModal = () => {
    setModalVisible(true)
  }
  
  const [isModalVisible, setModalVisible] = React.useState(false);
  const showModal2 = () => {
    setModalVisible2(true)
  }
  
  const [isModalVisible2, setModalVisible2] = React.useState(false);
  const [card,setCard]=React.useState({
    name:'',
    cardno:'',
    expiry:'',
    cvv:''
})
    
    return (
        <>
            <ScrollView listViewDisplayed={false}  keyboardShouldPersistTaps='always' showsVerticalScrollIndicator={false}>
            <Modal
        onBackdropPress={() =>null}
        backdropOpacity={0.5}
        animationIn={'bounceIn'}
        animationOut={'bounceOut'}
        
        isVisible={isModalVisible}>
        <View style={styles.modalView}>
        <CreditCardInput
            
            labelStyle={{color:"#000",fontFamily:"Quicksand-Bold",marginTop:1}}
             onChange={(tex)=>setCard({...card,name:tex.values.name,cardno:tex.values.number,expiry:tex.values.expiry,cvv:tex.values.cvc})}
            requiresName={true}
            allowScroll={true}
            inputStyle={{fontFamily:"Quicksand-Bold",width:'100%'}}
            cardScale={0}
            />
              <TouchableOpacity disabled={false} onPress={validateCard} style={[styles.button,{marginTop:10}]}>
              {loader?<ActivityIndicator size={20} color={'#fff'}/>:<Text style={styles.btnText}>Add Card</Text>}
                </TouchableOpacity>


        </View>
      </Modal>  
      <Modal
        onBackdropPress={() => null}
        backdropOpacity={0.5}
        animationIn={'bounceIn'}
        animationOut={'bounceOut'}
        
        isVisible={isModalVisible2}>
        <View style={styles.modalView}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontSize:19,fontFamily:'Quicksand-Bold'}}>Overall Price:</Text>
            <Text style={{fontSize:19,fontFamily:'Quicksand-Bold'}}>{total} $</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <TouchableOpacity onPress={()=>{setModalVisible(false),setModalVisible2(false)}} style={[styles.button,{borderWidth:2,borderColor:'#731D3A',backgroundColor:'#fff',marginTop:10,width:'44%'}]}>
                <Text style={[styles.btnText,{color:"#731D3A"}]}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onConfirm}  style={[styles.button,{marginTop:10,width:'44%'}]}>
                <Text style={styles.btnText}>Confirm</Text>
                </TouchableOpacity>
            </View>

        


        </View>
      </Modal> 
          <BottomSheet
                ref={sheetRef}
                initialSnap={2}
                snapPoints={[420, 200, 0]}
                borderRadius={20}
                renderContent={renderContent}
                

            />
            <BottomSheet
                ref={sheetRef2}
                initialSnap={2}
                snapPoints={[420, 500, 0]}
                borderRadius={20}
                renderContent={renderContent2}
                

            />
           
        <View style={[styles.postcontainer]}>
        
            <View style={styles.postcontainerChild}>
                <View style={styles.postTopView}>
               

                    {/* <Text style={styles.title}>Title :</Text>
                    <TextInput returnKeyType={'next'}  onSubmitEditing={() => rf.current.focus()}
                            blurOnSubmit={false} style={styles.postformInput}
                            onChangeText={(text) => {
                                setData({ ...data, title: text })
                                setValidation({ ...validation, isValidTitle: true })
                            }} />
                             {!validation.isValidTitle ? <Text style={styles.errorText}>Title cannot be empty</Text> : null} */}

                   
                        {/* <View style={{ width: '42%' }}>
                            <Text style={[styles.title]}>Price :</Text>
                            <TextInput ref={rf} returnKeyType={'next'}  onSubmitEditing={() => rf1.current.focus()}
                            keyboardType={'numeric'}
                            blurOnSubmit={false} style={styles.postformInput}
                            onChangeText={(text) => {
                                setData({ ...data, price: text })
                                setValidation({ ...validation, isValidPrice: true })
                            }} />
                             {!validation.isValidPrice ? <Text style={styles.errorText}>Price cannot be empty</Text> : null}
                        </View>
                        */}
                            {/* <Text style={styles.title}>Date & Time :</Text>
                            <TouchableOpacity onPress={dobPress}>
                            <TextInput ref={rf1} returnKeyType={'next'}  onSubmitEditing={() => rf2.current.focus()}
                            editable={false}
                            blurOnSubmit={false} style={styles.postformInput}
                            placeholder={moment(data.date).format("DD-MM-YYYY")+" & "+moment(data.date).hours()+":"+moment(data.data).minutes()}
                            onChangeText={(text) => {
                                setData({ ...data, date: text })
                                setValidation({ ...validation, isValidDate: true })
                            }} />
                            </TouchableOpacity>
                             <DatePicker
                                modal
                                mode={"datetime"}
                                open={open}
                                date={data.date}
                                
                                onConfirm={(date) => {
                                setOpen(false)
                                setData({ ...data, date: date })
                                setValidation({ ...validation, isValidDate: true })
                                console.log(data.date)
                                }}
                                onCancel={() => {
                                setOpen(false)
                                }}
                            />
                             {!validation.isValidDate ? <Text style={styles.errorText}>Date cannot be empty</Text> : null}
                        </View> */}
                    <Text style={styles.title}>Date & Time :</Text>
                    <TextInput returnKeyType={'next'}  onSubmitEditing={() => rf.current.focus()}
                            blurOnSubmit={false} style={styles.postformInput}
                            editable={false}
                            placeholder={moment(data.date).format("DD-MM-YYYY")+" & "+moment(data.date).hours()+":"+moment(data.date).minutes()}
                             />
                          
                    
                           <Text style={[styles.title, {marginTop: 8,}]}>My Vehicles :</Text>
                    <RNPickerSelect
                        useNativeAndroidPickerStyle={false}
                        placeholder={{
                            label: 'Select Truck',
                            value: "",
                            color: '#000',
                        }}
                        
                        onValueChange={(val) =>calculatesubs(val)}
                        items={trucks}
                        style={{
                            ...pickerSelectStyles,
                            iconContainer: {
                                top: 28,
                                right: 16,
                            }
                        }}
                        Icon={PickerIcon}


                    />
                     {!validation.isValidTruck ? <Text style={styles.errorText}>Select Truck</Text> : null}
                     <Text style={[styles.title, {marginTop: 8,}]}>Extra Services :</Text>
                    <RNPickerSelect
                        useNativeAndroidPickerStyle={false}
                        placeholder={{
                            label: 'Select Extra Services',
                            value: "",
                            color: '#000',
                        }}
                        
                        onValueChange={(val) =>calculatesubss(val)}
                        items={[{label:"Service 1 500$",value:"1"},{label:"Service 2 300$",value:"1"}]}
                        style={{
                            ...pickerSelectStyles,
                            iconContainer: {
                                top: 28,
                                right: 16,
                            }
                        }}
                        Icon={PickerIcon}


                    />
                     {!validation.isValidExtra ? <Text style={styles.errorText}>Select Extra Service</Text> : null}
                   
                   

                    {/* <Text style={[styles.title, {marginTop: 8,}]}>Description :</Text>
                    <TextInput 
                    multiline = {true}
                    numberOfLines = {4}
                    ref={rf2} style={[styles.postformInput,{height:70,textAlignVertical:'top'}]} 
                    onChangeText={(text) => {
                        setData({ ...data, des: text })
                        setValidation({ ...validation, isValidDes: true })
                    }}/>
                     {!validation.isValidDes ? <Text style={styles.errorText}>Description cannot be empty</Text> : null} */}

                    <Text style={[styles.title, { marginTop: 8 }]}>Pickup Location</Text>

                    <GooglePlacesAutocomplete
                            fetchDetails={true}
                            suppressDefaultStyles={true}
                                placeholder='Enter Pickup location'
                                listViewDisplayed='auto'
                                styles={{
                                    textInputContainer: {
                                      backgroundColor: '#fff',
                                      justifyContent:'center',
                                      height:35,
                                      color: '#05375a',
                                      fontFamily:"Quicksand-Bold",
                                      marginTop:5,
                                      marginBottom:5,
                                      width:'100%',
                                      borderWidth:1,
                                      borderColor:'gray',
                                      borderRadius:20
                                    },

                                    textInput:{
                                        paddingBottom:7,
                                        fontFamily:"Quicksand-Bold",
                                        paddingLeft:10  
                                    },
                                    listView:{
                                        width:'96%',
                                        zIndex:10,
                                        fontSize:20,
                                        marginTop:40,
                                        position:'absolute',
                                        backgroundColor:'#fff',
                                        paddingHorizontal:10,
                                    },
                                    separator: {
                                        height: 0.5,
                                        backgroundColor: '#c8c7cc',
                                      },
                                      loader: {
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end',
                                        height: 20,
                                      },
                                   row:{
                                       paddingVertical:7
                                   }
                                   
                                   
                                  }}
                                  onPress={(dataa,details) => {
                                   console.log(dataa)
                                   setlatlng({...latlng,pickuplat:details.geometry.location.lat,pickuplng:details.geometry.location.lng})
                                   map1.current.animateToRegion({
                                    latitude:details.geometry.location.lat,
                                    longitude: details.geometry.location.lng,
                                    latitudeDelta: 0.00922,
                                    longitudeDelta: 0.00421,
                                    },1)
                                   setData({...data,des1:dataa.description})
                                 
                                   setValidation({ ...validation, isValidPicklat: true })
                                   
                                  
                                    
                                }}
                                query={{
                                    key: 'AIzaSyAW5O831v7xI0OVGJufVHJiIcJgeMybNdA',
                                    language: 'en',
                                }}
                                /> 

                            <MapView
                            ref={map1}
                      style={{height:140,width:'100%'}}
                        initialRegion={{
                        latitude: latlng.pickuplat,
                        longitude: latlng.pickuplng,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                        }}
                       
                    >
                        <Marker  coordinate={{latitude:latlng.pickuplat,longitude:latlng.pickuplng}}/>
                    </MapView>
                    {!validation.isValidPicklat ? <Text style={styles.errorText}>Enter Pickup location</Text> : null}
                   

                    <Text style={[styles.title, { marginTop: 20 }]}>Drop off Location</Text>

                    <GooglePlacesAutocomplete
                            fetchDetails={true}
                            suppressDefaultStyles={true}
                                placeholder='Enter Dropoff location'
                                listViewDisplayed='auto'
                                styles={{
                                    textInputContainer: {
                                        backgroundColor: '#fff',
                                        justifyContent:'center',
                                        height:35,
                                        color: '#05375a',
                                        fontFamily:"Quicksand-Bold",
                                        marginTop:5,
                                        marginBottom:5,
                                        width:'100%',
                                        borderWidth:1,
                                        borderColor:'gray',
                                        borderRadius:20
                                    },

                                    textInput:{
                                        paddingBottom:7,
                                        fontFamily:"Quicksand-Bold",
                                        paddingLeft:10  
                                    },
                                    listView:{
                                        width:'96%',
                                        zIndex:10,
                                        fontSize:20,
                                        
                                        
                                        backgroundColor:'#fff',
                                        paddingHorizontal:10,
                                    },
                                    separator: {
                                        height: 0.5,
                                        backgroundColor: '#c8c7cc',
                                      },
                                      loader: {
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end',
                                        height: 20,
                                      },
                                   row:{
                                       paddingVertical:7
                                   }
                                   
                                   
                                  }}
                                  onPress={(dataa,details) => {
                                   console.log(details)
                                   setlatlng({...latlng,dropofflat:details.geometry.location.lat,dropofflng:details.geometry.location.lng})
                                   setData({...data,des2:dataa.description})
                                   map2.current.animateToRegion({
                                    latitude:details.geometry.location.lat,
                                    longitude: details.geometry.location.lng,
                                    latitudeDelta: 0.00922,
                                    longitudeDelta: 0.00421,
                                    },1)
                                    setValidation({ ...validation, isValidDroplng: true })
                                   
                                  
                                    
                                    
                                }}
                                query={{
                                    key: 'AIzaSyAW5O831v7xI0OVGJufVHJiIcJgeMybNdA',
                                    language: 'en',
                                }}
                                /> 

                             <MapView
                            ref={map2}
                        style={{height:140,width:'100%'}}
                        initialRegion={{
                        latitude:latlng.dropofflat,
                        longitude: latlng.dropofflng,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                        }}
                       
                    >
                          <Marker coordinate={{latitude:latlng.dropofflat,longitude:latlng.dropofflng}}/>
                    </MapView> 
                    {!validation.isValidDroplng ?<Text style={styles.errorText}>Enter Dropoff Location</Text> : null}
                   

                
                </View>
               


            </View>
            <TouchableOpacity  onPress={validateData} style={[styles.button,{marginBottom:10,marginTop:10}]}>
               <Text style={styles.btnText}>Continue</Text>
 

           </TouchableOpacity>



        </View>
        </ScrollView>
    </>

    );
}

export default PostScreen;
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        marginVertical: 3,
        padding: 12,
        width: '100%',
        borderColor: '#00000029',
        backgroundColor: "#F7F8FB",
        fontSize: 14,
        color: '#42424C',
        borderRadius: 9
    },
    inputAndroid: {
        marginVertical: 2,
        paddingLeft: 5,
        paddingBottom:-40,
        fontSize: 14,
        color: '#707070',
        backgroundColor: '#fff',
        height: 50,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: "#707070"

    }
})