import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    container: {
      flex: 1,
     // alignItems: 'center',
     // justifyContent: 'center',
      //maxHeight:500
      backgroundColor: '#00BFFF',
     paddingRight :40,
     paddingLeft: 40
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
      marginBottom: 20,
      backgroundColor: '#fff',
      borderRadius: 5
    
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
  marginTop:10,
  marginBottom: 20, 
  maxHeight: 200,
  borderRadius: 10
},
flatList: {
  
  borderRadius: 10,
  marginTop: 25,
  maxHeight: 500
}


    })
    