import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native'


import { SvgXml } from 'react-native-svg';
import { styles } from './styles';
import svg from './svg';
const VerificationScreen = ({ navigation,route }) => {
    const[code,setcode]=React.useState(null)
    React.useEffect(()=>{
    async function func(){
                   setcode(JSON.parse(await AsyncStorage.getItem('Code')))
                  
    }
    func()

    },[])
    const ref1=React.useRef()
    const ref2=React.useRef()
    const ref3=React.useRef()
    const ref4=React.useRef()
    const[number,setnumber]=React.useState({num1:'',num2:'',num3:'',num4:""})
    const emptyCheck=(val)=>{
        if(val==='')
        {
            ref2.current.focus()
        }
      }
      const emptyCheck2=(val)=>{
          if(val==='')
          {
              ref1.current.focus()
          }else{
              ref3.current.focus()
          }
        }
        const emptyCheck3=(val)=>{
          if(val==='')
          {
              ref4.current.focus()
          }else{
              ref2.current.focus()
          }
        }
        const emptyCheck4=(val)=>{
          if(val==='')
          {
            
          }else{
              ref1.current.focus()
          }
        }
        const [validation, setValidation] = React.useState({
      
            isValidEmail: true,
            
           
          })
        const validateData=()=>{
            if (number.num1 === '') {
                setValidation({
                    ...validation,
                    isValidEmail: false
                })
                return;
            }
           else if (number.num2 === '') {
                setValidation({
                    ...validation,
                    isValidEmail: false
                })
                return;
            }
           else if (number.num3 === '') {
                setValidation({
                    ...validation,
                    isValidEmail: false
                })
                return;
            }
           else if (number.num4 === '') {
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
        const onSubmit=()=>{
            const digit=number.num1+number.num2+number.num3+number.num4
    
            console.log(digit)
            if(code==digit)
            {
                navigation.navigate('Update')
            }
            else{
                alert('Incorrect Code')
            }
        }
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>

                <View>
                    <View style={styles.headingView}>
                        <Text style={styles.heading}>Verify</Text>
                       
                        <Text style={[styles.preheadingText,{marginTop:20}]}>Enter your OTP code here</Text>
                    </View>
                
                    <View style={{flexDirection:'row',justifyContent: 'center'}}>
                            <TextInput 
                            style={styles.input}
                            keyboardType={'numeric'}
                            maxLength={1}
                          
                            ref={ref4}
                            onChangeText={(val) => {
                                setnumber({ ...number, num1: val })
                                setValidation({ ...validation, isValidEmail: true })
                                emptyCheck4(val)
                            }}
                            
                            />
                            <TextInput 
                            style={styles.input}
                            keyboardType={'numeric'}
                            maxLength={1}
                          
                            ref={ref1}
                            onChangeText={(val) => {
                                setnumber({ ...number, num2: val })
                                setValidation({ ...validation, isValidEmail: true })
                                emptyCheck3(val)
                            }}
                            
                            />
                            <TextInput 
                            style={styles.input}
                            keyboardType={'numeric'}
                            maxLength={1}
                          
                            ref={ref2}
                            onChangeText={(val) => {
                                setnumber({ ...number, num3: val })
                                setValidation({ ...validation, isValidEmail: true })
                                emptyCheck2(val)
                            }}
                            
                            />
                            <TextInput 
                            style={styles.input}
                            keyboardType={'numeric'}
                            maxLength={1}
                            ref={ref3}
                           
                            onChangeText={(val) => {
                                setnumber({ ...number, num4: val })
                                setValidation({ ...validation, isValidEmail: true })
                                emptyCheck(val)
                            }}

                            
                            />
                               {!validation.isValidEmail ? <Text style={{position:'absolute',fontFamily:'Quicksand-Bold',fontSize:10,color:'red'}}>Enter 4 Digit Code</Text> : null}

                </View>

                        
                    



                </View>

                <View>
                    <TouchableOpacity onPress={validateData} style={[styles.button, { marginBottom: 10 }]}>
                        <Text style={[styles.btnText]}>Verify</Text>
                    </TouchableOpacity>
                
                </View>

            </View>





        </View>
    );
}

export default VerificationScreen;