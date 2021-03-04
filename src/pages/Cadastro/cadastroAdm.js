import React from 'react';
import {  StyleSheet, 
          Text, 
          View,
          TextInput, 
          KeyboardAvoidingView, 
          TouchableOpacity,ScrollView, 
          Alert} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import styles from './styles'
import AsyncStorage from '@react-native-community/async-storage';   
import {createStackNavigator} from '@react-navigation/stack';       


export default class CadastroAdm extends React.Component {

constructor(props){
  super(props);
  this.state = {
    nome:'',
    login: '',
    senha: '',
    perfil: 1,
    area: 0,
    cargo: 0,
    empresa: ''
}
}

/*
componentDidMount(){
  this._loadInitialState()
}


_loadInitialState = async() => {
  var value = await AsyncStorage.getItem('usuario')
  if(value !== null){
    this.props.navigation.navigate('Home')
  }
}
*/
render(){
  return(

<KeyboardAwareScrollView style={styles.container} >
<View >

<TextInput
style={styles.textInput} placeholder='Qual o nome da empresa?'
onChangeText={(empresa) => this.setState({empresa})}
underlineColorAndroid='transparent'
/>


<TextInput
style={styles.textInput} placeholder='Digite o seu nome...'
onChangeText={(nome) => this.setState({nome})}
underlineColorAndroid='transparent'
/>


<TextInput
style={styles.textInput} placeholder='Digite o login...'
onChangeText={(login) => this.setState({login})}
underlineColorAndroid='transparent'
/>



<TextInput
style={styles.textInput} placeholder='Digite a sua senha aqui...'
onChangeText={(senha) => this.setState({senha})}
secureTextEntry={true}
underlineColorAndroid='transparent'
/>

<TouchableOpacity
style={styles.btn}
onPress={this.cadastrar}
>
<Text style={styles.textButton}>Cadastrar</Text>
</TouchableOpacity>
</View>
</KeyboardAwareScrollView>
  )
}

cadastrar = () => {
  //alert(this.state.login)

//const proxyurl = 'https://cors-anywhere.herokuapp.com/';
const url = 'http://projetofaculdade.herokuapp.com/empresa';
  fetch(url, {
      method: 'POST',
        headers: {
           'Accept': 'application/json', 
           'Content-Type': 'application/json',
           'Access-Control-Allow-Origin': 'http://projetofaculdade.herokuapp.com/empresa',
            'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        //nome:  this.state.nome,  
        //login: this.state.login,
       // senha: this.state.senha,
       // perfil:this.state.perfil,
        empresa: this.state.empresa
    })

  })
  .then((response) => response.json())
  .then((res) => {
    //alert(res.message)
    
    if(res.sucess===true){
      //        AsyncStorage.setItem('usuario', res.usuario)
      //this.props.navigation.navigate('Login')
      this.cadastrarAdm(res.id)

    }else{
      Alert.alert(res.message)
    }

  })
  



}





cadastrarAdm = (empresa) => {
  //alert(this.state.login)

//const proxyurl = 'https://cors-anywhere.herokuapp.com/';
const url = 'http://projetofaculdade.herokuapp.com/cadastro';
  fetch(url, {
      method: 'POST',
        headers: {
           'Accept': 'application/json', 
           'Content-Type': 'application/json',
           'Access-Control-Allow-Origin': 'http://projetofaculdade.herokuapp.com/cadastro',
            'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        nome:  this.state.nome,  
        login: this.state.login,
        senha: this.state.senha,
        perfil:this.state.perfil,
        area: this.state.area,
        cargo: this.state.cargo,
        empresa: empresa
    })

  })
  .then((response) => response.json())
  .then((res) => {
    //alert(res.message)
    
    if(res.sucess===true){
       Alert.alert(res.message)
//        AsyncStorage.setItem('usuario', res.usuario)
      this.props.navigation.navigate('Login')
      
    }else{
     Alert.alert(res.message)
    }

  })
  



}


}



