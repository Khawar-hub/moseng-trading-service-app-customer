import React from 'react';
import { View, Text, TouchableOpacity,Image, TextInput, ActivityIndicator, AsyncStorage } from 'react-native'


import { SvgXml } from 'react-native-svg';
import { styles } from './styles';
import svg from './svg';
import APIManager from '../../managers/APIManger';
import Async from '@react-native-async-storage/async-storage'
const ForgotPasswordScreen = ({ navigation,route }) => {
    const{email}=route.params
    const[code,setcode]=React.useState(null)
      React.useEffect(()=>{
    async function func(){
                   setcode(await Async.getItem('Email'))
                  
    }
    func()

    },[])
    const [data, setData] = React.useState({
      
        password: '',
        confirmpassword:'',
        
        
        
      });
    
      const [validation, setValidation] = React.useState({
        isValidPassword: true,
        isValidConfirmPassword: true,
        
       
      })
      const [secureTextEntry, setSecureTextEntry] = React.useState({
        pwd: true,
        confrm_pwd: true
    });
      const validateData = () => {
        if (data.password === '') {
           
            setValidation({
                ...validation,
                isValidPassword: false
            })
            
            return;
            
        }
        else if (data.confirmpassword === '' || data.confirmpassword !== data.password) {
            setValidation({
                ...validation,
                isValidConfirmPassword: false
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
        
           
          const res=await new APIManager().password(JSON.stringify({
              password:data.password
          }),email)

          if(res.message==="*** Customer Updated SuccessFully ***")
          {
             
              navigation.navigate('LoginScreen')
              alert('Password Updated Enter new Password')
              setloader(false)
          }
          else{
              alert('Verification failed')
              setloader(false)
          }
      }
     
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>

                <View>
                    <View style={styles.headingView}>
                        <Text style={styles.heading}>Update Password</Text>
                       
                        <Text style={[styles.preheadingText,{marginTop:20}]}>Update your Password</Text>
                    </View>
                    <TextInput style={styles.Input}
                        placeholderTextColor={'silver'}
                            placeholder="Password"
                            secureTextEntry={secureTextEntry.pwd}
                            returnKeyType={'next'}
                            onChangeText={(val) => {
                                setData({ ...data, password: val })
                                setValidation({ ...validation, isValidPassword: true })
                            }}
                            onSubmitEditing={() => ref4.current.focus()}
                            blurOnSubmit={false}
                         
                        />
                         {secureTextEntry.pwd ?
                                    <TouchableOpacity style={{ position: 'absolute', right: 10, top: 100 }} onPress={() => {
                                        setSecureTextEntry({
                                            ...secureTextEntry,
                                            pwd: false
                                        })
                                    }}>
                                        <Image source={require('../../assets/images/eye.png')} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={{ position: 'absolute', right: 10, top: 100 }} onPress={() => {
                                        setSecureTextEntry({
                                            ...secureTextEntry,
                                            pwd: true
                                        })
                                    }}>
                                        <Image source={require('../../assets/images/eyeclosed.png')} />
                                    </TouchableOpacity>
                                }
                                {!validation.isValidPassword ? <Text style={styles.errorText}>Password must be greater than 8 characters</Text> : null}

                        <TextInput style={styles.Input}
                        placeholderTextColor={'silver'}
                            placeholder="Confirm Password"
                            returnKeyType={'next'}
                            secureTextEntry={secureTextEntry.confrm_pwd}
                            onChangeText={(val) => {
                                setData({ ...data, confirmpassword: val })
                                setValidation({ ...validation, isValidConfirmPassword: true })
                            }}
                            onSubmitEditing={() => ref5.current.focus()}
                            blurOnSubmit={false}
                           
                        />
                         {secureTextEntry.confrm_pwd ?
                                    <TouchableOpacity style={{ position: 'absolute', right: 10, top: 160 }} onPress={() => {
                                        setSecureTextEntry({
                                            ...secureTextEntry,
                                            confrm_pwd: false
                                        })
                                    }}>
                                        <Image source={require('../../assets/images/eye.png')} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={{ position: 'absolute', right: 10, top: 160 }} onPress={() => {
                                        setSecureTextEntry({
                                            ...secureTextEntry,
                                            confrm_pwd: true
                                        })
                                    }}>
                                        <Image source={require('../../assets/images/eyeclosed.png')} />
                                    </TouchableOpacity>
                                }
                                {!validation.isValidConfirmPassword ? <Text style={styles.errorText}>Passwords do not Match</Text> : null}

                        
                    </View>



                </View>

                <View style={{paddingHorizontal:20}}>
                    <TouchableOpacity onPress={validateData} style={[styles.button, { marginBottom: 10 }]}>
                        {loader?<ActivityIndicator color={"#fff"} size={20}/>:<Text style={[styles.btnText]}>Submit</Text>}
                    </TouchableOpacity>
                
                </View>

            </View>





    
    );
}

export default ForgotPasswordScreen;