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
      marginTop: 5,
      alignSelf: 'stretch',
      padding: 16,
      marginBottom: 10,
      backgroundColor: '#fff',
      borderRadius: 5
    
    },
    textButton:{
      color: '#fff',
      fontWeight: '900'
    },
    btn: {
      alignSelf: 'stretch',
      backgroundColor: '#FD5956',
      padding: 20,
      alignItems: 'center',
      borderRadius: 5,
      marginTop: 10,
      

      
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
  maxHeight: 100,
  borderRadius: 10
},
flatList: {
  
  borderColor: '#ff45da',
  marginTop:10,
  marginBottom: 20, 
  maxHeight: 450,
  borderRadius: 10
}


    })
    