import React from 'react';
import { View, Text, TouchableOpacity, TextInput,Image,PermissionsAndroid, ActivityIndicator } from 'react-native'
import { SvgXml } from 'react-native-svg';
import { styles } from './styles';
import svg from './svg';
import {useAuth} from '../contexts/Auth'
import APIManager from '../../managers/APIManger';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from './context/context';
import Geolocation from 'react-native-get-location';
import Geocoder from 'react-native-geocoding';
const LoginScreen = ({ navigation }) => 
{
    const [location,setlocation]=React.useState('')
    React.useEffect(()=>{
          async function func(){
          const loc=await  getcurrentLocation()
          Geocoder.init('AIzaSyAW5O831v7xI0OVGJufVHJiIcJgeMybNdA')
          Geocoder.from(loc.latitude, loc.longitude).then(json =>
             {
        
                                  console.log(json);
                                   var addressComponent = json.results[2].formatted_address;
                                 setlocation(addressComponent)
          
             }).catch(error => console.warn(error));  
             console.log(location)
          }
          func()
    },[])

    const geocode=async(loc)=>{
       
    }
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
    const auth=useAuth()
    const ref1 = React.useRef()
    const ref2 = React.useRef()
    const[loading,setloading]=React.useState(false)
    const [validation, setValidation] = React.useState({
       
        isValidEmail: true,
        isValidPassword: true,
       
    })
    const [data, setData] = React.useState({
        
        email: '',
        password: '',
       
    });
    const [secureTextEntry, setSecureTextEntry] = React.useState({
        pwd: true,
       
    });
    const handleValidEmail = (val) => {
        let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w\w+)+$/;
        if (reg.test(val)) {
            return true;
        }
        else {
            return false;
        }
    }
    const validateData = async() => {
        
        if (!handleValidEmail(data.email) || data.email === '') {
            setValidation({
                ...validation,
                isValidEmail: false
            })
            return;
        }
        else if (data.password === '') {
            setValidation({
                ...validation,
                isValidPassword: false
            })
            return;
        }else{
      
             onSubmit()
              
             
           
        }
       
            
               
            
           
            
        
    }
    const[loader,setloader]=React.useState(false)
    const onSubmit=async()=>{
         setloading(true)
       
      
        try{
        const res=await new APIManager().userLogin(JSON.stringify({
            email:data.email,
            password:data.password,
        }))
            setloading(false)
        if(res.message==="*** Customer Signed In SuccessFully ****")
        {
            const resp=await new APIManager().updateuser(JSON.stringify({
                curntLoc:location
            }),res.myResult._id) 
           await AsyncStorage.setItem('User',JSON.stringify(res))
             auth.signIn()
       
        }
        else{
            alert(res.message)
            setloading(false)
        }
    }
        catch(e){
            console.log(e)

        }
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>

                <View>
                    <View style={styles.headingView}>
                        <Text style={[styles.heading]}>Welcome to </Text>
                       <Text style={styles.heading}> Moseng Trading Service</Text>
                        <Text style={styles.preheadingText}>Sign in to Continue</Text>
                    </View>
                    <View style={styles.inputView}>
                        <TextInput style={styles.Input}
                        placeholderTextColor={'silver'}
                            placeholder="Email"
                            returnKeyType={'next'}
                            onChangeText={(val) => {
                                setData({ ...data, email: val.toLowerCase() })
                                setValidation({ ...validation, isValidEmail: true })
                            }}
                            onSubmitEditing={() => ref2.current.focus()}
                            blurOnSubmit={false}
                            autoCapitalize="none"
                            ref={ref1}
                            returnKeyLabel={"Next"}
                        />
                        {!validation.isValidEmail ? <Text style={styles.errorText}>Invalid Email!!!</Text> : null}
                        <View>
                        <TextInput style={styles.Input}
                        placeholderTextColor={'silver'}
                            placeholder="Password"
                            secureTextEntry={secureTextEntry.pwd}
                                    returnKeyType={'next'}
                                    onChangeText={(val) => {
                                        setData({ ...data, password: val })
                                        setValidation({ ...validation, isValidPassword: true })
                                    }}
                                    blurOnSubmit={false}
                        />
                         {secureTextEntry.pwd ?
                                    <TouchableOpacity style={{ position: 'absolute', right: 10, top: 30 }} onPress={() => {
                                        setSecureTextEntry({
                                            ...secureTextEntry,
                                            pwd: false
                                        })
                                    }}>
                                        <Image source={require('../../assets/images/eye.png')} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={{ position: 'absolute', right: 10, top: 30 }} onPress={() => {
                                        setSecureTextEntry({
                                            ...secureTextEntry,
                                            pwd: true
                                        })
                                    }}>
                                        <Image source={require('../../assets/images/eyeclosed.png')} />
                                    </TouchableOpacity>
                                }
                                </View>
                                {!validation.isValidPassword ? <Text style={styles.errorText}>Password cant be empty</Text> : null}
                         <TouchableOpacity onPress={()=>navigation.navigate('ForgotPasswordScreen')}>       
                           <Text  style={styles.forgotPassword}>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>



                </View>

                <View>
                    <TouchableOpacity onPress={validateData} style={[styles.button, { marginBottom: 10 }]}>
                        {!loading?<Text style={[styles.btnText]}>Login</Text>:<ActivityIndicator size={20} color={'#fff'}/>}
                    </TouchableOpacity>
                    <View style={styles.textSignUp}>
                       <Text style={styles.newUser}>New User?</Text><TouchableOpacity onPress={()=>navigation.navigate('SignUpScreen')}><Text  style={[styles.baseColor,{marginLeft:6}]}>Sign Up</Text></TouchableOpacity>
                    </View>
                    
                </View>
                

            </View>





        </View>
    );
}

export default LoginScreen;