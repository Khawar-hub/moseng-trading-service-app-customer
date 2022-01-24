import React from 'react';
import { View, Text, TouchableOpacity, TextInput,ScrollView,Image, ActivityIndicator } from 'react-native'

import { SvgXml } from 'react-native-svg';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import PhoneInput from "react-native-phone-number-input";
import { styles } from './styles';
import svg from './svg';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIManager from '../../managers/APIManger';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
const EditProfileScreen = ({navigation}) => {
    const focus=useIsFocused()
    const[user,setuser]=React.useState('')
    const[user2,setuser2]=React.useState('')
    const[user3,setuser3]=React.useState('')
    React.useEffect(()=>{
        async function func(){
        
          setData({...data,name:JSON.parse(await AsyncStorage.getItem('User')).myResult.fullname,email:JSON.parse(await AsyncStorage.getItem('User')).myResult.email,phone:JSON.parse(await AsyncStorage.getItem('User')).myResult.phoneNo})
        }
        func()
    },[focus])
    const [loader,setloader]=React.useState(false)
    const onSubmit=async()=>{
        setloader(true)
       
        const res=await new APIManager().updateuser(JSON.stringify({
            

             fullname:data.name,
            phoneNo:data.phone,
           
        }),JSON.parse(await AsyncStorageLib.getItem('User')).myResult._id)
        if(res.message==="*** Customer Updated SuccessFully ***")
        {
            alert('Profile Updated Changes will appear after next login')
            navigation.goBack()
            setloader(false)
        }
        else{
           alert('Error While updating Customer')
            setloader(false)
        }


    }
    const [code, setCode] = React.useState("1");
    const [number, setNumber] = React.useState("");
     const check1=React.useRef();
     const check2 = React.useRef()
     const ref2 = React.useRef()
     const ref3 = React.useRef()
     const ref4 = React.useRef()
     const ref5 = React.useRef()
     const [data, setData] = React.useState({
        name: '',
        email: '',
        phone:'',
       
        
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
       
            onSubmit()
        
        
        
    }
    const [productImage, setProductImage] = React.useState({
        uri: '',
        name: '',
        type: ''
    });
    const [isProductImageSelected, setIsProductImageSelected] = React.useState(false)
    const openImagePicker = () => {
        const options = {
            mediaType: 'photo',
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
            selectionLimit: 1
        };

        launchImageLibrary(options, (response) => {
            if (response) {

                if (response.didCancel) {
                    alert('You did not choose any Images');
                    return;
                } else if (response.errorCode == 'camera_unavailable') {
                    alert('Camera not available on device');
                    return;
                } else if (response.errorCode == 'permission') {
                    alert('Permission not satisfied');
                    return;
                } else if (response.errorCode == 'others') {
                    alert(response.errorMessage);
                    return;
                } else {
                    console.log('Image picker result:', response.assets[0])
                    setProductImage({
                        uri: response.assets[0].uri,
                        name: response.assets[0].fileName,
                        type: response.assets[0].type
                    })
                    setIsProductImageSelected(true)
                }
            }
            else {
                setIsProductImageSelected(false)
            }
        })

    }
    
    return (
        <>
        <ScrollView>
        <View style={[styles.postcontainer]}>
            <View style={styles.postcontainerChild}>
                <View style={[styles.postTopView]}>
                <TextInput style={[styles.Input,{fontSize:14}]}
                            placeholder="Full name"
                            placeholderTextColor={'silver'}
                            onChangeText={(text) => {
                                setData({ ...data, name: text })
                                setValidation({ ...validation, isValidName: true })
                            }}
                            returnKeyType={'next'}
                            onSubmitEditing={() => ref2.current.focus()}
                            blurOnSubmit={false}
                            returnKeyLabel={"Next"}
                            defaultValue={data.name}
                            
                        
                        />
                         {!validation.isValidName ? <Text style={styles.errorText}>Name cannot be empty</Text> : null}
                        <TextInput style={[styles.Input,{fontSize:14}]}
                            placeholder="Email"
                            placeholderTextColor={'silver'}
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
                            defaultValue={data.email}
                            editable={false}
                           
                        />
                   {!validation.isValidEmail ? <Text style={styles.errorText}>Invalid Email!!!</Text> : null}

                        {/* <TextInput style={[styles.Input,{fontSize:14}]}
                            placeholder="Password" placeholderTextColor={'silver'}
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
                                    <TouchableOpacity style={{ position: 'absolute', right: 20, top: 150 }} onPress={() => {
                                        setSecureTextEntry({
                                            ...secureTextEntry,
                                            pwd: false
                                        })
                                    }}>
                                        <Image source={require('../../assets/images/eye.png')} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={{ position: 'absolute', right: 20, top: 150 }} onPress={() => {
                                        setSecureTextEntry({
                                            ...secureTextEntry,
                                            pwd: true
                                        })
                                    }}>
                                        <Image source={require('../../assets/images/eyeclosed.png')} />
                                    </TouchableOpacity>
                                }
                                {!validation.isValidPassword ? <Text style={styles.errorText}>Password must be greater than 8 characters</Text> : null}

                        <TextInput style={[styles.Input,{fontSize:14}]}
                            placeholder="Confirm Password"
                            placeholderTextColor={'silver'}
                            returnKeyType={'next'}
                            secureTextEntry={secureTextEntry.confrm_pwd}
                            onChangeText={(val) => {
                                setData({ ...data, confirmpassword: val })
                                setValidation({ ...validation, isValidConfirmPassword: true })
                            }}
                            onSubmitEditing={() => ref5.current.focus()}
                            blurOnSubmit={false}
                            ref={ref4}
                        />
                         {secureTextEntry.confrm_pwd ?
                                    <TouchableOpacity style={{ position: 'absolute', right: 20, top: 210 }} onPress={() => {
                                        setSecureTextEntry({
                                            ...secureTextEntry,
                                            confrm_pwd: false
                                        })
                                    }}>
                                        <Image source={require('../../assets/images/eye.png')} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={{ position: 'absolute', right: 20, top: 210 }} onPress={() => {
                                        setSecureTextEntry({
                                            ...secureTextEntry,
                                            confrm_pwd: true
                                        })
                                    }}>
                                        <Image source={require('../../assets/images/eyeclosed.png')} />
                                    </TouchableOpacity>
                                }
                                {!validation.isValidConfirmPassword ? <Text style={styles.errorText}>Passwords do not Match</Text> : null} */}

                       

                                <PhoneInput
                                  
                                 
                                    ref={ref5}
                                    onChangeText={(val)=> {setData({ ...data, phone: val }),
                                    setValidation({ ...validation, isValidPhone: true })}}
                                    onChangeCountry={(obj) => setCode(obj.callingCode[0])}
                                    
                                    placeholder={data.phone}
                                    textContainerStyle={{
                                  
                                    backgroundColor: '#fff',
                                   
                                   height:60
                                    
                                    }}
                                    // defaultCode="+1"
                                    defaultCode={"SS"}
                                    textInputStyle={{ height:40,
                                    fontFamily:'Quicksand-Bold',
                                    fontSize:16,
                                    borderBottomWidth:1,
                                        borderBottomColor:'#9D9D9D',
                                       
                                    
                                    
                                    
                                    }}
                                    containerStyle={{
                                        borderBottomWidth:1,
                                        borderBottomColor:'#9D9D9D',
                                    marginTop: 20,
                                    width: "100%",
                                height: 52,
                                   
                                    }}
                                  
                                   />
                                    {!validation.isValidPhone ? <Text style={styles.errorText}>Enter contact number</Text> : null}
                                    {/* <View style={[styles.uploadView,{marginBottom:20}]}>
                                    {
                                !isProductImageSelected ?
                                    <TouchableOpacity onPress={() => openImagePicker()}  style={[styles.imageView, { alignSelf: 'center', marginBottom: 10, marginTop: 10 }]} >
                                        <View style={[styles.addIcon,]}>
                                            <SvgXml xml={svg.preview} />
                                        </View>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={() => openImagePicker()} style={[styles.imageView, { alignSelf: 'center', marginBottom: 10, marginTop: 10 }]}>
                                        <Image
                                            source={{ uri: productImage.uri }}

                                            style={{
                                                minWidth: "100%", minHeight: 250, borderRadius: 20,marginTop:2
                                            }}
                                            resizeMode='cover'


                                        />
                                    </TouchableOpacity>
                            }
                            </View> */}
                  

                
                </View>
               


            </View>
            <TouchableOpacity onPress={validateData} style={[styles.button,{marginTop:10}]}>
               {loader?<ActivityIndicator size={20} color={'#fff'}/>:<Text style={styles.btnText}>Update</Text>}
 

           </TouchableOpacity>



        </View>
        </ScrollView>
        
    </>

    );
}

export default EditProfileScreen;