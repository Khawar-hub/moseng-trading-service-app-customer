import { StyleSheet } from "react-native";
import Appcolors from "./Appcolors";

export const Fonts=StyleSheet.create({
    btnFont:{
     
            color:'#fff',
            fontSize:17,
            fontWeight:'600'
        
    },
    FeildFonts:{
        color: "#707070",
        fontSize: 12,
    },
    headerFonts:{

        color:'#fff',
        fontSize:22

    },
    errorText:{
        fontFamily:'Raleway-Regular',
        fontSize:12,
        color:'red'
    },
    boxFonts:{
        color:'#000',
        

    },label:{
        alignSelf:'flex-start',
        fontSize:12
    },
    blueHeading:{
        fontSize:20,
        color:'#0377FF',
        fontWeight:'bold'

    },
    activeText:{
        fontSize:12,
        color:'#000'
    },
    columnTitleFont:{
        fontSize:14,
        color:Appcolors.sky
    },
    textWithSVG:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
        
        
    },
    fontbluesmall:{

        color:Appcolors.sky,
        fontSize:12
    }
})