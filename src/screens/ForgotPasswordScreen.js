import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, AsyncStorage } from 'react-native'


import { SvgXml } from 'react-native-svg';
import { styles } from './styles';
import svg from './svg';
import APIManager from '../../managers/APIManger';
import Async from '@react-native-async-storage/async-storage'
import Fonts from './utils/Fonts'
const ForgotPasswordScreen = ({ navigation }) => {
    const [data, setData] = React.useState({
      
        Code:'',
        Email:"",
        
        
        
      });
    
      const [validation, setValidation] = React.useState({
      
        isValidEmail: true,
        
       
      })
      const validateData = () => {
        if (data.Email === '') {
          setValidation({
              ...validation,
              isValidEmail: false
          })
          return;
      }
        else {
       onSubmit()
        }
      }
      const[route,setroute]=React.useState({code:'',Email:""})
      const[loader,setloader]=React.useState(false)
      const onSubmit=async()=>{
           setloader(true)
          const number=Math.floor(1000 + Math.random() * 9000)
          console.log(data)
          const formdata=new FormData()
          formdata.append('Code',number)
          formdata.append('Email',data.Email)
           await Async.setItem('Code',JSON.stringify(number))
           await Async.setItem('Email',data.Email)
          const res=await new APIManager().sendCode(formdata)

          if(res.success===true)
          {
              alert('Code has been send to your email')
              navigation.navigate('VerificationScreen')
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
                        <Text style={styles.heading}>Forgot Password?</Text>
                       
                        <Text style={[styles.preheadingText,{marginTop:20}]}>Retrive your Password</Text>
                    </View>
                    <View style={styles.inputView}>
                        <TextInput style={styles.Input}
                            placeholder="Email"
                            onChangeText={(val) => {
                                setData({ ...data, Email: val })
                                setValidation({ ...validation, isValidEmail: true })
                            }}
                        />
                         {!validation.isValidEmail ? <Text style={Fonts.errorText}>Email cannot be empty</Text> : null}

                        
                    </View>



                </View>

                <View>
                    <TouchableOpacity onPress={validateData} style={[styles.button, { marginBottom: 10 }]}>
                        {loader?<ActivityIndicator color={"#fff"} size={20}/>:<Text style={[styles.btnText]}>Submit</Text>}
                    </TouchableOpacity>
                
                </View>

            </View>





        </View>
    );
}

export default ForgotPasswordScreen;