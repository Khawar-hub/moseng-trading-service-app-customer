import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput,ScrollView,Image,ActivityIndicator } from 'react-native'
import {
    RoundedCheckbox,
    PureRoundedCheckbox,
  } from "react-native-rounded-checkbox";

import { SvgXml } from 'react-native-svg';
import { styles } from './styles';
import PhoneInput from "react-native-phone-number-input";
import APIManager from '../../managers/APIManger';
const SignUpScreen = ({navigation}) => {
   
    const[check,setCheck]=React.useState(false)
    const[check2,setCheck2]=React.useState(true)

    const onpress=()=>{
        if(check)
        {
       
        }
        else if(check2&&!check)
        {
                setCheck(true)
                setCheck2(false)
        }
        
       
       
           
    }
    const onpress2=()=>{
        if(check2)
        {
           
        }
        else if(!check2&&check)
        {
            
                setCheck2(true)
                setCheck(false)
                console.log(check,check2)
        }


    }
     const ref2 = React.useRef()
     const ref3 = React.useRef()
     const ref4 = React.useRef()
     const ref5 = React.useRef()
     const [data, setData] = React.useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmpassword:'',
        code:code
        
    });
    const [validation, setValidation] = React.useState({
        isValidName: true,
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
       
    })
    const [secureTextEntry, setSecureTextEntry] = React.useState({
        pwd: true,
        confrm_pwd: true
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
    const validateData = () => {
        console.log(data)
        console.log(validation.isValidPassword)
        if (data.name === '') {
            setValidation({
                ...validation,
                isValidName: false
            })
            return;
        }
        else if (!handleValidEmail(data.email) || data.email === '') {
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
            
        }
        else if (data.confirmpassword === '' || data.confirmpassword !== data.password) {
            setValidation({
                ...validation,
                isValidConfirmPassword: false
            })
            return;
        }
        else if (data.phone === '') {
            setValidation({
                ...validation,
                isValidPhone: false
            })
            return;
        }
       
        else {
           onSubmit()
        }
        
        
    }
    const [loader,setloader]=React.useState(false)
    const onSubmit=async()=>{
          setloader(true)
       
          const res=await new APIManager().userSignUp(JSON.stringify({
            fullname:data.name,
            phoneNo:data.phone,
            password:data.password,
            email:data.email,
            
          
          }))
              if(res.message==="*** Customer SuccessFully Added ***")
              {
                  navigation.navigate('LoginScreen')
                  setloader(false)
              }
              else{
                  alert(res.message)
                  setloader(false)
              }

    }
   
   
    const [code, setCode] = React.useState("1");
    const [number, setNumber] = React.useState("");
    return (
    
        <View style={styles.container}>
           
            <View style={styles.innerContainerSignUp}>

                <View>
                    <View style={styles.headingView}>
                    <Text style={styles.heading}>Welcome to </Text>
                       <Text style={styles.heading}> Moseng Trading Service</Text>
                        <Text style={styles.preheadingText}>Create a new Account</Text>
                    </View>
                    <View style={styles.inputView}>
                    <TextInput style={styles.Input}
                            placeholder="Username"
                            placeholderTextColor={'silver'}
                            onChangeText={(text) => {
                                setData({ ...data, name: text })
                                setValidation({ ...validation, isValidName: true })
                            }}
                            returnKeyType={'next'}
                            onSubmitEditing={() => ref2.current.focus()}
                            blurOnSubmit={false}
                            returnKeyLabel={"Next"}
                            
                        
                        />
                         {!validation.isValidName ? <Text style={styles.errorText}>Name cannot be empty</Text> : null}
                        <TextInput style={styles.Input}
                        placeholderTextColor={'silver'}
                            placeholder="Email"
                            returnKeyType={'next'}
                            onChangeText={(val) => {
                                setData({ ...data, email: val.toLowerCase() })
                                setValidation({ ...validation, isValidEmail: true })
                            }}
                            onSubmitEditing={() => ref3.current.focus()}
                            blurOnSubmit={false}
                            autoCapitalize="none"
                            returnKeyLabel={"Next"}
                            ref={ref2}
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
                            onSubmitEditing={() => ref4.current.focus()}
                            blurOnSubmit={false}
                            ref={ref3}
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
                                {!validation.isValidPassword ? <Text style={styles.errorText}>Password must be greater than 8 characters</Text> : null}
                                </View>
                                <View>
                        <TextInput style={styles.Input}
                        placeholderTextColor={'silver'}
                            placeholder="Confirm Password"
                           
                            secureTextEntry={secureTextEntry.confrm_pwd}
                            onChangeText={(val) => {
                                setData({ ...data, confirmpassword: val })
                                setValidation({ ...validation, isValidConfirmPassword: true })
                            }}
                         
                            blurOnSubmit={false}
                            ref={ref4}
                        />
                         {secureTextEntry.confrm_pwd ?
                                    <TouchableOpacity style={{ position: 'absolute', right: 10, top: 30 }} onPress={() => {
                                        setSecureTextEntry({
                                            ...secureTextEntry,
                                            confrm_pwd: false
                                        })
                                    }}>
                                        <Image source={require('../../assets/images/eye.png')} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={{ position: 'absolute', right: 10, top: 30 }} onPress={() => {
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

                                <PhoneInput
                                    ref={ref5}
                                    onChangeText={(val)=> {setData({ ...data, phone: val }),
                                    setValidation({ ...validation, isValidPhone: true })}}
                                    onChangeCountry={(obj) => setCode(obj.callingCode[0])}
                                    textContainerStyle={{
                                        
                                    backgroundColor: '#fff',
                                    paddingBottom:-10,
                                    paddingTop:2
                                    

                                    
                                    }}
                                    // defaultCode="+1"
                                    defaultCode={"SS"}
                                    textInputStyle={{ height:40,
                                    fontFamily:'Quicksand-Bold',
                                    fontSize:16,
                                   
                                    
                                    }}
                                    containerStyle={{
                                        paddingTop:5,
                                    marginTop: 30,
                                    width: "100%",
                                    height: '10%',
                                    borderBottomWidth:1,
                                    borderBottomColor:'#9D9D9D',
                                    
                                    
                                    
                                    }}
                                   />
                                     {!validation.isValidPhone ? <Text style={styles.errorText}>Enter contact number</Text> : null}

                               
                        <View style={styles.switchView}>
                            <Text style={[styles.textSize]}>I am a:</Text>
                            <View style={styles.checkboxView}>
                                 <View style={styles.checkbox}>
                                    <RoundedCheckbox 
                                     onPress={onpress}
                                     active={false}
                                    textStyle={{color:'#731D3A'}}
                                    checkedColor={'#731D3A'}
                                    uncheckedColor={'silver'}
                                    checkedTextColor={'#731D3A'}
                                    isChecked={check}
                                    text={'.'}
                                    innerStyle={{width:15,height:15}}
                                    outerStyle={{width:23,height:23,borderWidth:2,borderColor:'#731D3A'}}
                                     />
                                    <Text style={styles.checkboxtext}>Driver</Text>
                                 </View>
                                 <View style={styles.checkbox}>
                                    <RoundedCheckbox 
                                    active={true}
                                    onPress={onpress2}
                                    textStyle={{color:'#731D3A'}}
                                    checkedColor={'#731D3A'}
                                    uncheckedColor={'silver'}
                                    checkedTextColor={'#731D3A'}
                                    
                                    text={'.'}
                                    innerStyle={{width:15,height:15}}
                                    outerStyle={{width:22,height:22,borderWidth:2,borderColor:'#731D3A'}}
                                    isChecked={check2}
                                    />
                                    <Text style={styles.checkboxtext}>Customer</Text>
                                 </View>
                         
                            </View>
                        </View>

                    </View>



                </View>

                <View>
                    <TouchableOpacity disabled={loader} onPress={validateData} style={[styles.button, { marginBottom: 10,marginTop:20 }]}>
                     {loader?<ActivityIndicator color={'#fff'} size={20}/>:<Text style={[styles.btnText]}>Sign Up</Text>}
                    </TouchableOpacity>
                    <View style={styles.textSignUp}>
                       <Text style={styles.newUser}>Have an account?</Text><TouchableOpacity onPress={()=>navigation.navigate('LoginScreen')}><Text  style={[styles.baseColor,{marginLeft:6}]}>Login</Text></TouchableOpacity>
                    </View>
                </View>

            </View>




        </View>
    
        
      
     
    );
}

export default SignUpScreen;