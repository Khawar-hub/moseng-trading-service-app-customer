import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { View, Text, TouchableOpacity,Image, TextInput,ActivityIndicator,BackHandler } from 'react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { SvgXml } from 'react-native-svg';
import APIManager from '../../managers/APIManger';
import { styles } from './styles';
import svg from './svg';

const UploadDocScreen = ({ navigation ,route}) => {
    const{data}=route.params
    const[loader,setloader]=React.useState(false)
    const [photo, setphoto] = React.useState({
        photo: '',
      
        
    });
    const [validation, setValidation] = React.useState({
        isValidPhoto: true,
       
       
    })
    const validateData = () => {
        
        if (productImage.uri === '') {
            setValidation({
                ...validation,
                isValidPhoto: false
            })
            return;
        }
        else{
            setloader(true)
            navigation.navigate('Payment',{data:data,image:productImage})
            setloader(false)
        }
    }

    // const onSubmit=async()=>{
    //     setloader(true)
    //     console.log(productImage)
    //     const number=data.phone;
    //     const formdata=new FormData()
    //     formdata.append("FullName",data.name)
    //     formdata.append("Password",data.password)
    //     formdata.append("PhoneNumber",number)
    //     formdata.append("Role","Customer")
    //     formdata.append("Email",data.email)
    //     formdata.append("image",{ uri: productImage.uri, name: productImage.name, type: productImage.type })
    //     console.log(formdata)
    //     const res=await new APIManager().userSignUp(formdata)
    //     if(res.success===true)
    //     {
    //         navigation.navigate('addcard')
    //         await AsyncStorage.setItem('userid',res.Record._id)
           
    //         setloader(false)
    //     }
    //     else if(res.message==="Error! User with this Email already exist"){
    //         alert('Error! User with this Email already exist')
    //         setloader(false)
    //     }
    //     else{
    //         alert('Cant Sign up now')
    //     }

        
    // }
    const [productImage, setProductImage] = React.useState({
        uri: '',
        name: '',
        type: ''
    });
    const [isProductImageSelected, setIsProductImageSelected] = React.useState(false)
    const openCamera=()=>{
        let options = {
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
    launchCamera(options, (response) => {
      
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
                setValidation({ ...validation, isValidPhoto: true })
            }
        }
        else {
            setIsProductImageSelected(false)
        }
      });
    }
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
                    setValidation({ ...validation, isValidPhoto: true })
                }
            }
            else {
                setIsProductImageSelected(false)
            }
        })

    }
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>

                <View>
                    <View style={styles.headingView}>
                        <Text style={styles.heading}>Upload Document </Text>
                      
                        <Text style={[styles.preheadingText,{marginTop:20}]}>We need to verify your Identity</Text>
                    </View>
                    <View style={styles.boxView}>
                        <TouchableOpacity onPress={()=>openCamera()} style={styles.box}>
                           <SvgXml xml={svg.camera}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => openImagePicker()} style={styles.box}>
                            <SvgXml xml={svg.upload}/>
                        </TouchableOpacity>
                        
                        
                    </View>
                    <View style={styles.uploadView}>
                    {
                                !isProductImageSelected ?
                                    <View  style={[styles.imageView, { alignSelf: 'center', marginBottom: 10, marginTop: 10 }]} >
                                        <View style={[styles.addIcon,]}>
                                            <SvgXml xml={svg.preview} />
                                        </View>
                                    </View>
                                    :
                                    <View  style={[styles.imageView, { alignSelf: 'center', marginBottom: 10, marginTop: 10 }]}>
                                        <Image
                                            source={{ uri: productImage.uri }}

                                            style={{
                                                minWidth: "100%", minHeight: 250, borderRadius: 20,marginTop:2
                                            }}
                                            resizeMode='cover'


                                        />
                                    </View>
                            }
                            
                    </View>
                    {!validation.isValidPhoto ? <Text style={styles.errorText}>Upload Doc please</Text> : null}



                </View>

                <View>
                    <TouchableOpacity onPress={validateData} style={[styles.button, { marginBottom: 10 }]}>
                       {loader?<ActivityIndicator color={'#fff'} size={20}/>:<Text style={[styles.btnText]}>Upload</Text>}
                    </TouchableOpacity>
                 
                </View>

            </View>





        </View>
    );
}

export default UploadDocScreen;