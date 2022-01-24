import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer:{
      flex:1,
      justifyContent:'space-between',
       marginTop:40,
       paddingVertical:20,
       paddingHorizontal:20,
  },
  innerContainerSignUp:{
    flex:1,
    
     marginTop:40,
     paddingVertical:20,
     paddingHorizontal:20
},
  logo:{marginTop:100,alignSelf:'center'},
  heading:{fontSize:24,
color:"#000",
fontFamily:'Quicksand-Bold'
},
btnText:{ fontSize:16,
  fontFamily:'Quicksand-Bold',
  color:"#fff"},
  text:{
     fontSize:16,
     fontFamily:'Quicksand-Bold',
     color:"#9D9D9D"
     
  },
textSignUp:{flexDirection:'row',alignItems:'center',width:'100%',justifyContent:'center'},
  textGray:{
    fontSize:16,
    fontFamily:'Quicksand-Bold',
    fontWeight:'bold'
 },
 errorText: {
  color: 'red',
  fontFamily:'Quicksand-Bold',
},
  headingView:{alignItems:'center',justifyContent:'center'},
  preheadingText:{marginTop:10,fontFamily:'Quicksand-Bold',color:'#9D9D9D',fontSize:15},
      
  button:{
      height:55,
      width:'100%',
      borderRadius:7,
      backgroundColor:'#731D3A',
      justifyContent:'center',
      alignItems:'center',
  },
  addIcon: {
    height: 30, width: 30, backgroundColor: '#fff', borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageView: {
    height: 100,
    width: 100,
    backgroundColor: '#F7F8FB',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'


  },
  textSize:{
    fontSize:16,
    color:'#9D9D9D',fontFamily:'Quicksand-Bold'
  },
  baseColor:{
    color:'#731D3A',
    fontFamily:'Quicksand-Bold',
    fontSize:14,
    
  },
  inputView:{
    marginTop:20,
  },
  Input:{height:40,
    borderBottomWidth:1
   ,borderColor:'silver',
   fontFamily:'Quicksand-Bold',
   fontSize:16,
   marginTop:20,
   color:"#9D9D9D",
   paddingBottom:5
  },
  newUser:{
    alignSelf:'center',
  fontSize:15,
  fontFamily:'Quicksand-Bold',
  color:"#9D9D9D",
  
},
  forgotPassword:{
    alignSelf:"flex-end",
    marginTop:20,
    fontFamily:'Quicksand-Bold',
    fontSize:16,
    color:'#731D3A'
  },
  switchView:{
    marginTop:20
  },
  input:{
    width:'13%',
    height:65,
    borderRadius:10,
    backgroundColor: '#FFF',
    marginTop: 20,
   marginHorizontal:10,
   borderWidth:1,
   borderColor:'#CCCCCC',
   fontSize:18,
   paddingLeft:17,
   color:"#000",
   fontFamily:'Quicksand-Bold'
},
BottomSheet:{
        
  height:700,
  width:'100%',
  backgroundColor:'#fff',
  paddingHorizontal:20,
  paddingVertical:15
},
  checkbox:{
     flexDirection:'row',
     alignItems:'center'
  },
  checkboxView:{
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-around',
    marginTop:8,
  },
  checkboxtext:{
    fontSize:15,
    fontFamily:'Quicksand-Bold',
    marginLeft:5,
    color:'#9D9D9D'
  },
  boxView:{
     flexDirection:'row',
     width:'100%',
     justifyContent:'space-between',
     paddingHorizontal:80,
     marginTop:40
  },
  box:{
    width:85,
    height:50,
    borderRadius:10,
    borderWidth:1,
    borderColor:"#731D3A",
    justifyContent:'center',
    alignItems:'center',

  },
  uploadView:{
    marginTop:30,
    
    
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    height:250,
    borderWidth:1,
    borderColor:"gray",
    borderRadius:20

  },
  locationFeildView:{
    width:'100%',
    height:50,
   paddingHorizontal:10,
    flexDirection:'row',
   
   
  },
  locationInput:{
    width:'90%',
    height:'auto',
    backgroundColor:'#fff',
    color:"#9D9D9D",
    marginLeft:8,
    marginTop:4,
    padding:0,
    paddingBottom:5,
    fontFamily:"Quicksand-Bold",
    fontSize:14
  },
  notificationContainer:{
    flex:1,
    paddingHorizontal:15,
   
  },
  title:{fontSize:20,fontFamily:'Quicksand-Bold',color:'#000'},
  titleBottomSheet:{fontSize:12,fontFamily:'Quicksand-Bold',color:'#9D9D9D'},
  username:{marginLeft:7,fontSize:12,fontFamily:'Quicksand-Bold',marginTop:8,color:'#9D9D9D'},
  listItem:{
    width:'100%',
    height:'auto',
    borderRadius:7,
    backgroundColor:"#fff",
    marginVertical:7,
    paddingHorizontal:15,
    paddingVertical:8
   
  },
  address:{fontSize:12,fontFamily:'Quicksand-Bold',width:'48%',color:'#9D9D9D'}
,lastRowView:{
  flexDirection:'row',
  justifyContent:'space-between',
  marginTop:15,
  marginLeft:7,
  alignItems:'flex-end'
},
approveButton:{
  width:65,
  height:22,
  borderRadius:8,
  backgroundColor:'#731D3A',
  alignItems:'center',
  justifyContent:'center',
  paddingBottom:2
},
approveText:{fontFamily:'Quicksand-Bold',fontSize:13,color:'#fff'},
topRowView:{
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center'
},
price:{
  fontSize:12,fontFamily:'Quicksand-Bold',color:'#9D9D9D'
},
time:{fontSize:12,fontFamily:'Quicksand-Bold',marginTop:8,color:'#9D9D9D'

},
postcontainer:{
  flex:1,
  paddingHorizontal:15,
  paddingVertical:10
},
postcontainerChild:{
  flex:1,
  justifyContent:'space-between',
  
},
postTopView:{
    height:'auto',
    borderRadius:5,
    backgroundColor:'#fff',
    paddingTop:20,
    paddingHorizontal:20,
    paddingVertical:30
},
postBottomView:{
   height:50,
   marginTop:10,
   backgroundColor:'#731D3A',
   borderRadius:5,
   alignItems:'center',
   justifyContent:'center'
},
postformInput:{
  width:'100%',
  borderBottomWidth:1,
  borderBottomColor:'#9D9D9D',
 height:30,
  paddingBottom:1,
  color:'gray'
  
},
rowInput:{
  flexDirection:'row',
  justifyContent:'space-between',
  marginTop:10,
  paddingVertical:4,

},
mapView:{
  marginTop:10,
  width:'100%',

  
  
},
modalView:{ 
  borderRadius:10,
  height:'auto',
  width:'100%',
  backgroundColor:'#fff',
  alignSelf:'center',
  paddingHorizontal:14,
  paddingVertical:20
},
modalRow:{
  height:43,
  flexDirection:'row',
  alignItems:'center',



},divider:{width:'100%',height:1,backgroundColor:'silver'},
modalText:{fontFamily:'DMSans-Regular',fontSize:16,color:'#000',marginLeft:20},
headerRightText:{
  marginRight:20,
  fontFamily:'Quicksand-Bold',
  fontSize:15,
  color:'#731D3A'
},
imageView:{
  alignItems:'center',
  justifyContent:'center',
  borderBottomWidth:4,
  borderBottomColor:'#F2F2F3',
  paddingVertical:30
},
profileName:{
  marginTop:20,
  fontSize:18,
  fontFamily:'Quicksand-Bold',
  color:'#000'
},
profileAddress:{
  marginTop:6,
  fontFamily:'Quicksand-Bold',
  color:'#9D9D9D'

},
amountView:{
  alignItems:'center',
  justifyContent:'center',
  paddingVertical:20,
  borderBottomWidth:4,
  borderBottomColor:'#F2F2F3',

},
myspentText:{
  marginTop:5,
  fontFamily:'Quicksand-Bold',
  color:'#000',
  fontSize:13

},
amount:{marginTop:4,
  fontFamily:'Quicksand-Bold',
  color:'#9D9D9D'
},
feildView:{
  flexDirection:'row',
  paddingHorizontal:20,
  paddingVertical:20,
  borderBottomWidth:1,
  borderBottomColor:'#F2F2F3'
  
},
labelRow:{
  paddingHorizontal:20,
  width:'100%',
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center'
},
labelText:{
  fontSize:16,
  fontFamily:'Quicksand-Bold',
  color:'#000'

},
paymentView:{
  justifyContent:'space-between',
  width:'100%',
  height:'100%',
  
}
})