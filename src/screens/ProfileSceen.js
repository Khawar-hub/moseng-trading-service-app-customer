import React from 'react';
import {View,Text,TouchableOpacity} from 'react-native'
import { SvgXml } from 'react-native-svg';
import { styles } from './styles';
import svg from './svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../contexts/Auth';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { AppContext } from './context/context';
const ProfileScreen=({navigation})=> {
   
    const[user,setuser]=React.useState('')
    const[address,setaddress]=React.useState('')
   React.useEffect(()=>{
       async function func(){
    setuser(JSON.parse(await AsyncStorageLib.getItem('User')).myResult.fullname)
    setaddress(JSON.parse(await AsyncStorageLib.getItem('User')).myResult.paymentTotal)
    console.log(JSON.parse(await AsyncStorageLib.getItem('User')))
    console.log(await AsyncStorageLib.getItem('address'))
       }
       func()
   },[])
    const auth=useAuth()
    const logOut=async()=>{
       auth.signOut()
    }
    return (
        <View style={styles.container}>
            <View style={styles.imageView}>
                <SvgXml xml={svg.pic}/>
                <Text style={styles.profileName}>{user}</Text>
                <Text style={[styles.profileAddress,{width:'70%'}]}>17th St NW & E Street NW, Washington, DC 20634, United States</Text>

            </View>
            <View style={styles.amountView}>
                <SvgXml xml={svg.trophy}/>
                <Text style={styles.myspentText}>Account Balance</Text>
                <Text style={styles.amount}>{address} $</Text>

            </View>
            <View style={styles.feildView}>
                <View>
                    <SvgXml style={{marginTop:6}} xml={svg.payment}/>

                </View>
                <TouchableOpacity  style={styles.labelRow}>
                    <Text style={styles.labelText}>Manage Payment Options</Text>
                    <SvgXml xml={svg.arrowright}/>

                </TouchableOpacity>

            </View>
            <View style={styles.feildView}>
                <View>
                    <SvgXml style={{marginTop:6}} xml={svg.power}/>

                </View>
                <TouchableOpacity onPress={()=>logOut()} style={styles.labelRow}>
                    <Text style={styles.labelText}>Sign Out</Text>
                    <SvgXml xml={svg.arrowright}/>
                    

                </TouchableOpacity>

            </View>
           
            
            
            
        </View>
        
    );
}

export default ProfileScreen;