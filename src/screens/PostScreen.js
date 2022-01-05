import React,{useContext} from 'react';
import { View, Text, TouchableOpacity, TextInput,ScrollView ,ActivityIndicator} from 'react-native'
import { SvgXml } from 'react-native-svg';
import MapView, { Marker } from "react-native-maps";
import { styles } from './styles';
import svg from './svg';
import BottomSheet from 'reanimated-bottom-sheet';
import svgs from './utils/svgs';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import APIManager from '../../managers/APIManger';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from './context/context';
const PostScreen = ({navigation}) => {
   
    const focus=useIsFocused()
    const[user,setuser]=React.useState([])
    React.useEffect(()=>{
        async function func(){
          setuser(JSON.parse(await AsyncStorage.getItem('User')))
          map1.current.animateToRegion({
            latitude:pickuplat,
            longitude: pickuplng,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421,
            },2)
            map2.current.animateToRegion({
                latitude:dropofflat,
                longitude: dropofflng,
                latitudeDelta: 0.00922,
                longitudeDelta:0.00421,
                },2)
        }
        func()
    },[focus])
    const[pickuplat,setpickuplat]=React.useState(22.9375)
    const[pickuplng,setpickuplng]=React.useState(30.5595)
    const[dropofflat,setdropofflat]=React.useState(22.9375)
    const[dropofflng,setdropofflng]=React.useState(30.5595)
    const rf=React.useRef()
    const rf1=React.useRef()
    const rf2=React.useRef()
    const [data,setData]=React.useState({
        title:'',
        price:'',
        date:new Date(),
        des:'',
        pickuplat:'',
        pickuplng:'',
        dropofflat:'',
        dropofflng:""
    })
    const [validation, setValidation] = React.useState({
        isValidTitle: true,
        isValidPrice: true,
        isValidDate: true,
        isValidDes: true,
        isValidPicklat: true,
        isValidPicklng: true,
        isValidDroplat: true,
        isValidDroplng: true,
       
    })
    const validateData = () => {
       
        if (data.title === '') {
            setValidation({
                ...validation,
                isValidTitle: false
            })
            return;
        }
    
        else if (data.price=== '') {
           
            setValidation({
                ...validation,
                isValidPrice: false
            })
            
            return;
            
        }
      
        else if (data.date === '') {
            setValidation({
                ...validation,
                isValidDate: false
            })
            return;
        }
        else if (data.des === '') {
            setValidation({
                ...validation,
                isValidDes: false
            })
            return;
        }
        else if (pickuplat === '') {
            setValidation({
                ...validation,
                isValidPicklat: false
            })
            return;
        }
        else if (dropofflng === '') {
            setValidation({
                ...validation,
                isValidDroplng: false
            })
            return;
        }
       
        else {
           onSubmit()
        }
        
        
    }
    const[loader,setloader]=React.useState(false)
    const onSubmit=async()=>{
        setloader(true)
 
        const formdata=new FormData()
        formdata.append('Title',data.title)
        formdata.append('Price',data.price)
        formdata.append('Date',data.date.toString())
        formdata.append('Description',data.des)
     
        formdata.append('User',user.map((ietm)=>{return ietm._id}).toString())
        formdata.append('PickUpLat',pickuplat)
        formdata.append('PickUpLong',pickuplng)
        formdata.append('DropOfLat',dropofflat)
        formdata.append('DropOfLong',dropofflng)
          console.log(formdata)
          
          try{
        const res=await new APIManager().addorder(formdata)
        if(res.success===true)
        {
             navigation.navigate('OrderHistory')
             setloader(false)
        }
        else{
            alert('Cant place order Try Again Later')
            setloader(false)
        }}
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
                                   console.log(details)
                                   setpickuplat(details.geometry.location.lat)
                                   setpickuplng(details.geometry.location.lng)
                                 
                                   setValidation({ ...validation, isValidPicklat: true })
                                   sheetRef.current.snapTo(2)
                                   map1.current.animateToRegion({
                                    latitude:pickuplat,
                                    longitude: pickuplng,
                                    latitudeDelta: 0.00922,
                                    longitudeDelta: 0.00421,
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
                                   console.log(details)
                                   setdropofflat(details.geometry.location.lat)
                                   setdropofflng(details.geometry.location.lng)
                                  
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
    
    return (
        <>
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
            <ScrollView showsVerticalScrollIndicator={false}>
           
        <View style={[styles.postcontainer]}>
        
            <View style={styles.postcontainerChild}>
                <View style={styles.postTopView}>
               

                    <Text style={styles.title}>Title :</Text>
                    <TextInput returnKeyType={'next'}  onSubmitEditing={() => rf.current.focus()}
                            blurOnSubmit={false} style={styles.postformInput}
                            onChangeText={(text) => {
                                setData({ ...data, title: text })
                                setValidation({ ...validation, isValidTitle: true })
                            }} />
                             {!validation.isValidTitle ? <Text style={styles.errorText}>Title cannot be empty</Text> : null}

                    <View style={styles.rowInput}>
                        <View style={{ width: '42%' }}>
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
                        <View style={{ width: '42%' }}>
                            <Text style={styles.title}>Date&Time :</Text>
                            <TouchableOpacity onPress={dobPress}>
                            <TextInput ref={rf1} returnKeyType={'next'}  onSubmitEditing={() => rf2.current.focus()}
                            editable={false}
                            blurOnSubmit={false} style={styles.postformInput}
                            placeholder={moment(data.date).format("DD-MM-YYYY")+"&"+moment(data.date).hours()+":"+moment(data.data).minutes()}
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
                        </View>

                    </View>

                    <Text style={[styles.title, {marginTop: 8,}]}>Description :</Text>
                    <TextInput 
                    multiline = {true}
                    numberOfLines = {4}
                    ref={rf2} style={[styles.postformInput,{height:70,textAlignVertical:'top'}]} 
                    onChangeText={(text) => {
                        setData({ ...data, des: text })
                        setValidation({ ...validation, isValidDes: true })
                    }}/>
                     {!validation.isValidDes ? <Text style={styles.errorText}>Description cannot be empty</Text> : null}

                    <Text style={[styles.title, { marginTop: 8 }]}>Pickup Location</Text>

                    <TouchableOpacity onPress={()=>sheetRef.current.snapTo(0)} style={styles.mapView}>
                            <MapView
                            ref={map1}
                        style={{flex:1}}
                        initialRegion={{
                        latitude: pickuplat,
                        longitude: pickuplng,
                        latitudeDelta: 0.2347832,
                        longitudeDelta: 0.234234,
                        }}
                       
                    >
                        <Marker  coordinate={{latitude:pickuplat,longitude:pickuplng}}/>
                    </MapView>
                    {!validation.isValidPicklat ? <Text style={styles.errorText}>Enter Pickup location</Text> : null}
                    </TouchableOpacity>

                    <Text style={[styles.title, { marginTop: 20 }]}>Drop off Location</Text>

                    <TouchableOpacity onPress={()=>sheetRef2.current.snapTo(0)} style={[styles.mapView,{marginBottom:20}]}>
                            <MapView
                            ref={map2}
                        style={{flex:1}}
                        initialRegion={{
                        latitude:dropofflat,
                        longitude: dropofflng,
                        latitudeDelta: 0,
                        longitudeDelta: 0,
                        }}
                       
                    >
                          <Marker coordinate={{latitude:dropofflat,longitude:dropofflng}}/>
                    </MapView>
                    {!validation.isValidDroplng ?<Text style={styles.errorText}>Enter Dropoff Location</Text> : null}
                    </TouchableOpacity>

                
                </View>
               


            </View>
            <TouchableOpacity onPress={validateData} style={[styles.button,{marginBottom:10,marginTop:10}]}>
               {loader?<ActivityIndicator size={20} color={'#fff'}/>:<Text style={styles.btnText}>Post</Text>}
 

           </TouchableOpacity>



        </View>
        </ScrollView>
    </>

    );
}

export default PostScreen;