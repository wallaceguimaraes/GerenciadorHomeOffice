import React from 'react';
import {  StyleSheet, 
          Text, 
          View,
          TextInput, 
          KeyboardAvoidingView, 
          TouchableOpacity, 
          Alert,
          Button} from 'react-native';
import styles from './styles'
import AsyncStorage from '@react-native-community/async-storage';   
import {createStackNavigator} from '@react-navigation/stack';       


export default class Home extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      perfil_id:0,
      empresa_id: 0,
      showing: 'none',
      botao:<Text></Text> 
    }
  }
  
componentDidMount = async() => {
  this.setState({ perfil_id: await AsyncStorage.getItem('perfil_id') });
 // Alert.alert(this.state.perfil_id);

  if(this.state.perfil_id==1){
    this.setState({showing: 'block' })
  }



}


/*
componentWillMount = async () =>  {
  
}
*/






  
render(){ 

  
  return(

<View style={styles.container}>
<TouchableOpacity style={styles.btn}
onPress={()=> this.props.navigation.navigate('HomeCadastro')}>
<Text>Cadastros</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.btn} >
  <Text>Projetos</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.btn}>
  <Text>Intervalos/Pausa</Text>
</TouchableOpacity>

</View>
  )
}

}


