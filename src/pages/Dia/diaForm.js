import React from 'react';
import {  StyleSheet, 
          Text, 
          View,
          TextInput, 
          KeyboardAvoidingView, 
          TouchableOpacity, 
          Alert} from 'react-native';
import styles from './styles'
import AsyncStorage from '@react-native-community/async-storage';   
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';       


export default class DiaForm extends React.Component {

  



constructor(props){

  super(props);
  
  this.state = { 
    dia_id: 0, 
    empresa_id: 0,
    botao: "Cadastrar",
    descricao:''
  } 

}

componentDidMount = async () =>{

  this.setState({empresa_id:await AsyncStorage.getItem('empresa_id')})

  if(this.props.route.params){
    this.setState({botao: "Atualizar",
                  dia_id: this.props.route.params.item.dia_id,
                  descricao: this.props.route.params.item.descricao  
                })
  }
  }

/*
_loadInitialState = async() => {
  var value = await AsyncStorage.getItem('usuario')
  if(value !== null){
    this.props.navigation.navigate('Home')
  }
}
*/
render(){

  return(

<View style={styles.container}>

<Text style={{fontWeight:"bold", marginTop: 2, fontSize: 16, color: '#fff'}}>Adicionar dia de trabalho:</Text>


<TextInput
style={styles.textInput} placeholder='Ex: Segunda...'
onChangeText={(descricao) => this.setState({descricao})}
underlineColorAndroid='transparent'
value={this.state.descricao}
/>


<TouchableOpacity
style={styles.btn}
onPress={this.cadastrar}
>
   
<Text style={{color:"#fff", fontWeight:"900"}}>{this.state.botao}</Text>

</TouchableOpacity>
</View>
  )
}

cadastrar = () => {
const url = 'http://projetofaculdade.herokuapp.com/diaCad';
  fetch(url, {
      method: 'POST',
        headers: {
           'Accept': 'application/json', 
           'Content-Type': 'application/json',
           'Access-Control-Allow-Origin': 'http://projetofaculdade.herokuapp.com/diaCad',
            'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        descricao: this.state.descricao,
        empresa_id: this.state.empresa_id,
        dia_id: this.state.dia_id 
      })

  })
  .then((response) => response.json())
  .then((res) => {
    //Alert.alert(res.message)
    
    if(res.sucess===true){
        Alert.alert(res.message)
       // AsyncStorage.setItem('usuario', res.usuario)
       let change = 'sim';
      this.props.navigation.navigate('Dia', change)
    }else{
      Alert.alert(res.message)
    }

  })
  
}

}



