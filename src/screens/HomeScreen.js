import React from 'react';
import {View,Text,TouchableOpacity,TextInput,PermissionsAndroid,ActivityIndicator} from 'react-native'
import { SvgXml } from 'react-native-svg';
import { styles } from './styles';
import svg from './svg';
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geolocation from 'react-native-get-location';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import Geocoder from 'react-native-geocoding';
import { SocketAddress } from 'net';
const HomeScreen=({navigation})=> {
     
    const focus=useIsFocused()
    const [isLoading, setIsLoading] = React.useState(true)
    const [latlng, setlatlng] = React.useState({
      Fromlat: '',
      Fromlng: '',
      Tolat: '',
      Tolng: '',
      address:"",
  })

  const getcurrentLocation = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return Geolocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 20000,
            })
                .then(location => {
                    return location
                })
                .catch(ex => {
                    const { code, message } = ex;
                    console.warn(code, message);
                    if (code === 'CANCELLED') {
                        alert('Location cancelled by user or by another request');
                    }
                    if (code === 'UNAVAILABLE') {
                        alert('Location service is disabled or unavailable enable it in setting and try reloading the app');
                    }
                    if (code === 'TIMEOUT') {
                        alert('Location request timed out');
                    }
                    if (code === 'UNAUTHORIZED') {
                        alert('Location permission denied ');
                    }
      
                });
                
        
        }
        else {
            alert("Location permission denied")
        }
    }
    catch (err) {
        console.warn(err)
    }
     
       
      
  }
  const[user,setuser]=React.useState('')
  const [address,setAddress]=React.useState('')
  React.useEffect(() => {
        async function func(){
      console.log(JSON.parse(await AsyncStorageLib.getItem('User')).myResult.fullname)
      setuser(JSON.parse(await AsyncStorageLib.getItem('User')).myResult.fullname)
      console.log(user)
      
      const current_loc = await getcurrentLocation()
      Geocoder.init('AIzaSyAW5O831v7xI0OVGJufVHJiIcJgeMybNdA')
      Geocoder.from(current_loc.latitude, current_loc.longitude).then(json =>
         {
    
                              console.log(json);
                               var addressComponent = json.results[2].formatted_address;
                             setAddress(addressComponent)
                            
      
         }).catch(error => console.warn(error));         
      console.log(current_loc)
      setlatlng({
          ...latlng,
          Fromlat: current_loc.latitude,
          Fromlng: current_loc.longitude,
      })
      setIsLoading(false)
      await AsyncStorageLib.setItem('address',address)
    }
    func()
  }, []);

  

 
    return (
        <View style={styles.container}>
            <View style={{paddingHorizontal:20,height:50,width:'100%',alignItems:'flex-start',justifyContent:"center"}}>
                <Text style={{fontFamily:"Quicksand-Bold",fontSize:20,color:"#000"}}>Welcome ,{user}</Text>
            </View>
           <View style={styles.locationFeildView}>
               <SvgXml style={{marginTop:3}} xml={svg.location}/>
               <Text style={styles.locationInput}>{address}</Text>
               {/* <GooglePlacesAutocomplete
                            fetchDetails={true}
                            suppressDefaultStyles={true}
                                placeholder='your current location'
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
                                    },

                                    textInput:{
                                        paddingBottom:5,
                                        fontFamily:"Quicksand-Bold",  
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
                                  onPress={(data,details=null) => {
                                   console.log(data)
                                    
                                }}
                                query={{
                                    key: 'AIzaSyAW5O831v7xI0OVGJufVHJiIcJgeMybNdA',
                                    language: 'en',
                                }}
                                /> */}

           </View>
          
           {!isLoading ?
           <MapView
           
                style={{flex:1}}
                initialRegion={{
                latitude: parseFloat(latlng.Fromlat),
                longitude: parseFloat(latlng.Fromlng),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
                showsMyLocationButton={true}
                showsCompass={true}
                showsUserLocation={true}
                
            >
              {/* <Marker coordinate={{latitude:currentLatitude,longitude:currentLongitude}}/> */}
            </MapView>:
             <ActivityIndicator size={20} color="#000" style={{ marginTop: 50 }} />
            }

          
            
        </View>
        
    );
}

export default HomeScreen;