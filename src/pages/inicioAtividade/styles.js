import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    container: {
      flex: 1,
      //alignItems: 'center',
     // justifyContent: 'center',
      //maxHeight:500
      backgroundColor: '#00BFFF',
   
    },
    header: {
      fontSize: 24,
      marginBottom: 60,
      color: '#fff',
      fontWeight: 'bold',
      
    },
    textInput: {
      alignSelf: 'stretch',
      padding: 16,
      marginBottom: 10,
      backgroundColor: '#fff',
      borderRadius: 5,
     // marginTop: 5
    
    },
    btn: {
      alignSelf: 'stretch',
      backgroundColor: '#FD5956',
      padding: 20,
      alignItems: 'center',
      borderRadius: 5,
      marginTop: 4,
      

      
    },
    btnRedondo: {
      alignSelf: 'stretch',
      backgroundColor: 'red',
      width: 45,
      padding: 20,
      alignItems: 'center',
      borderRadius: 50,
      marginTop: 4,
      

      
    },
flat:{
  borderColor: '#ff45da',
  marginTop:5,
  marginBottom: 20, 
  maxHeight: 120,
  borderRadius: 10
},
flatList: {
  borderColor: '#ff45da',
  marginTop:3,
  marginBottom: 3, 
  maxHeight: 500,
  borderRadius: 10
},

cardPrimario:{
flex: 1,
height: 180,  
margin: 10,
padding: 20,
},
cardSecundario:{
  flex: 1,
  height: 150,  
  margin: 10,
  padding: 2,
  }
  


    })
    