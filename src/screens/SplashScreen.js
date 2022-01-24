import React from 'react';
import {View,Text,TouchableOpacity,ActivityIndicator} from 'react-native'

import { SvgXml } from 'react-native-svg';
import { styles } from './styles';
import svg from './svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SplashScreen=({navigation})=>  {
    const [loader,setloader]=React.useState(true)
    React.useEffect(()=>{
        getCheck()
       async function getCheck(){
            setloader(false)
            if(JSON.parse(await AsyncStorage.getItem('check'))===true)
            {
                navigation.navigate('AppStack')
                setloader(true)
            }
            setloader(true)
        }
       
        
    },[])
    return (
        <View style={styles.container}>
            {loader?
            <View style={styles.innerContainer}>
                <SvgXml style={styles.logo} xml={svg.logo}/>
                <TouchableOpacity onPress={()=>navigation.navigate('LoginScreen')} style={styles.button}>
                   <Text style={[styles.btnText]}>Continue</Text>
                </TouchableOpacity>
            </View>:
            <ActivityIndicator style={{marginTop:300}} size={25} color={'#731D3A'}/>}


        
            
        </View>
    );
}

export default SplashScreen;