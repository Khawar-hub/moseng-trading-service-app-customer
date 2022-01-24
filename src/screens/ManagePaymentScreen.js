import { NavigationContainer } from '@react-navigation/native';
import React,{useContext} from 'react';
import {View,Text,TextInput,ActivityIndicator,BackHandler} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';
import { styles } from './styles';
import svg from './svg';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIManager from '../../managers/APIManger';
import { addcardstack } from './stacks/addcardstack';
import { useAuth } from '../contexts/Auth';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import { AppContext } from './context/context';
const ManagePaymentScreen=({navigation,route})=> {
    
  
    const auth=useAuth()
    
    const[userid,setiduser]=React.useState([])
    React.useEffect(()=>{
        async function func(){
            setiduser(await AsyncStorage.getItem('User'))
           
        }
        func()
       
    },[])
    // const onSubmit=async()=>{
    //     setloader(true)
     
    //     const number=data.phone;
    //     const formdata=new FormData()
    //     formdata.append("FullName",data.name)
    //     formdata.append("Password",data.password)
    //     formdata.append("PhoneNumber",number)
    //     formdata.append("Role","Customer")
    //     formdata.append("Email",data.email)
    //     formdata.append("image",{ uri: image.uri, name: image.name, type: image.type })
    //     console.log(formdata)
    //     const res=await new APIManager().userSignUp(formdata)
    //     if(res.success===true)
    //     {
            
            
    //          User.push(res.Record)
    //         addCard(res.Record._id)
            
               
            
    //     }
    //     else if(res.message==="Error! User with this Email already exist"){
    //         alert('Error! User with this Email already exist')
    //         setloader(false)
    //     }
    //     else{
    //         alert('Cant Sign up now')
    //     }

        
    // }
    const [card,setCard]=React.useState({
        name:'',
        cardno:'',
        expiry:'',
        cvv:''
    })
    const [validation, setValidation] = React.useState({
        isValidName: true,
        isValidCardno: true,
        isValidExpiry: true,
        isValidCvv: true,
      
       
    })
    const validateData = () => {
       
        if (card.name === '') {
             alert('Enter Card Name')
            return;
        }
       
       
        else if (card.cardno === '') {
           
            alert('Enter Card Number')
            return;
            
        }
        
        else if (card.expiry === '') {
            alert('Enter Card Expiry')
            return;
        }
          else if (card.cvv === '') {
            alert('Enter Cvv')
            return;
        }
       
        else {
               onSubmit()
        }
        
        
    }
    const [loader,setloader]=React.useState(false)
    const addCard= async(id)=>{
         setloader(true)
        const formdata=new FormData()
        formdata.append('Name',card.name)
        formdata.append('CardNo',card.cardno.replace(/ /g, ''))
        formdata.append('ExpiryDate',card.expiry)
        formdata.append('Cvv',card.cvv)
        formdata.append('CardId',userid.map(item=>{return item.Card}).toString())

            const res=await new APIManager().updateCard(formdata)
            if(res.success===true)
            {
                 alert("Card Updated")
                 navigation.goBack()
               

                setloader(false)
            }
            else{
                alert("Error Adding Card Try Again Later")
                setloader(false)
            }

    }
    
    // const[check,setCheck]=React.useState(false)
    // const sheetRef = React.useRef(null);
    // const rf=React.useRef()
    // const rf1=React.useRef()
    // const rf2=React.useRef()
    // const main=React.useRef()
    // const renderContent = () => (
    //     <View
    //       style={{
    //         backgroundColor: 'white',
    //         paddingTop: 25,
    //         paddingHorizontal:15,
    //         height: "100%",
            
    //       }}
    //     >
    //         <Text style={styles.titleBottomSheet}>Name :</Text>
    //                 <TextInput returnKeyType={'next'}  onSubmitEditing={() => rf.current.focus()}
    //                         blurOnSubmit={false} style={styles.postformInput}
    //                         onChangeText={(text) => {
    //                             setCard({ ...card, name: text })
    //                             setValidation({ ...validation, isValidName: true })
    //                         }} />
    //                             {!validation.isValidName ? <Text style={styles.errorText}>Name cannot be empty</Text> : null}

    //                <Text style={[styles.titleBottomSheet, { marginTop: 8 }]}>Card No :</Text>
    //                 <TextInput ref={rf2} style={styles.postformInput}
    //                   onChangeText={(text) => {
    //                     setCard({ ...card, cardno: text })
    //                     setValidation({ ...validation, isValidCardno: true })
    //                 }} 
    //                 keyboardType={'numeric'}
    //                 maxLength={16}
                
                    
    //                 />
    //                   {!validation.isValidCardno ? <Text style={styles.errorText}>Card No cannot be empty</Text> : null}
    //                 <View style={styles.rowInput}>
    //                     <View style={{ width: '49%' }}>
    //                         <Text style={[styles.titleBottomSheet]}>Exp Date :</Text>
    //                         <TextInput ref={rf} returnKeyType={'next'}  onSubmitEditing={() => rf1.current.focus()}
    //                         blurOnSubmit={false} style={styles.postformInput} 
    //                         onChangeText={(text) => {
    //                             setCard({ ...card, expiry: text })
    //                             setValidation({ ...validation, isValidExpiry: true })
    //                         }}
    //                         placeholder='MM/YY' 
    //                         maxLength={5}
    //                         keyboardType={'numeric'}
    //                         />
    //                            {!validation.isValidExpiry ? <Text style={styles.errorText}>Expiry cannot be empty</Text> : null}
    //                     </View>
    //                     <View style={{ width: '49%' }}>
    //                         <Text style={styles.titleBottomSheet}>Cvv :</Text>
    //                         <TextInput ref={rf1} returnKeyType={'next'}  onSubmitEditing={() => rf2.current.focus()}
    //                         blurOnSubmit={false} style={styles.postformInput}
    //                         onChangeText={(text) => {
    //                             setCard({ ...card, cvv: text })
    //                             setValidation({ ...validation, isValidCvv: true })
    //                         }} 
    //                         maxLength={3}
    //                         keyboardType={'numeric'}
    //                         />
    //                          {!validation.isValidCvv ? <Text style={styles.errorText}>Cvv cannot be empty</Text> : null}
    //                     </View>

    //                 </View>

                   

    //                 <TouchableOpacity onPress={validateData}  style={[styles.button,{marginTop:6,height:50}]}>
    //                 {loader?<ActivityIndicator size={20} color={'#fff'}/>:<Text style={styles.btnText}>Add new Card</Text>}
    //             </TouchableOpacity>
    //     </View>
    //   );
    return (
        <>
        <View  style={[styles.postcontainer]}>
           
            <View style={styles.paymentView}>
            <CreditCardInput
            labelStyle={{color:"#000",fontFamily:"Quicksand-Bold",marginTop:10}}
             onChange={(tex)=>setCard({...card,name:tex.values.name,cardno:tex.values.number,expiry:tex.values.expiry,cvv:tex.values.cvc})}
            requiresName={true}
            allowScroll={true}
            inputStyle={{fontFamily:"Quicksand-Bold",width:'100%'}}
            cardScale={1.1}
            />

                <TouchableOpacity onPress={validateData} style={styles.button}>
                {loader?<ActivityIndicator size={20} color={'#fff'}/>:<Text style={styles.btnText}>Update Card</Text>}
                </TouchableOpacity>

            </View>
            
        </View>
        
        {/* <BottomSheet
        ref={sheetRef}
        initialSnap={2}
        snapPoints={[270, 200, 0]}
        borderRadius={30}
        renderContent={renderContent}
        onOpenStart={()=>setCheck(true)}
        onCloseEnd={()=>setCheck(false)}
    /> */}
    </>
    );
}

export default ManagePaymentScreen;