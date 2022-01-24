import { StyleSheet } from "react-native";
import Appcolors from "./Appcolors";

export const ButtonConfig=StyleSheet.create({
    
    button:{
        height:50,
        width:"100%",
        borderRadius:0,
        backgroundColor:Appcolors.orange,
        alignItems:'center',
        justifyContent:'center'
    },
    active:{
        height:24,
        width:60,
        backgroundColor:Appcolors.orange,
        borderRadius:7,
        alignItems:'center',
        justifyContent:'center'

    }
})