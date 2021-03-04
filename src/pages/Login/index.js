import React from 'react';
import {  StyleSheet, 
          Text, 
          View,
          TextInput, 
          KeyboardAvoidingView, 
          TouchableOpacity, Image,
          Alert} from 'react-native';
import styles from './styles'
import AsyncStorage from '@react-native-community/async-storage';   
import {createStackNavigator} from '@react-navigation/stack';       
import Spinner from 'react-native-loading-spinner-overlay';       


export default class Login extends React.Component {

constructor(props){
  super(props);
  this.state = {
    usuario:'',
    login: '',
    senha: '',
    value: '', 
    visible: false
  }
}

/*
componentDidMount(){
 AsyncStorage.clear()
}


_loadInitialState = async() => {
    this.setState({value: await AsyncStorage.getItem('perfil_id')}) 
 // var value = await AsyncStorage.getItem('usuario_id')
  if(value !== ''){
    if(this.state.usuario[0].perfil_id==1){
      this.props.navigation.navigate('Index')
     }else{
      this.props.navigation.navigate('IndexBasico')
     }
  }else{
    this.props.navigation.navigate('Login')
  }
}
*/

render(){
  return(

<View style={styles.container}>
<Image style={{ width: 80, height: 80}}
source={require('./../../assets/icons8-clock-128.png')}
/>
<Text style={styles.header}>LOGIN </Text>
<TextInput
style={styles.textInput} placeholder='Usuário'
onChangeText={(login) => this.setState({login})}
underlineColorAndroid='transparent'
/>


<TextInput
style={styles.textInput} placeholder='Senha'
onChangeText={(senha) => this.setState({senha})}
secureTextEntry={true}
underlineColorAndroid='transparent'
/>
<TouchableOpacity
style={styles.btn}
onPress={this.login}
>
<Text 
style={{ fontSize: 16, color:'#fff',
fontWeight: "bold",
              

}}>Entrar</Text>
</TouchableOpacity>

<Text  style={{marginTop:15, fontSize: 12, color:'#fff'
            }}      >Política de privacidade</Text>


<Text 
style={{color: 'white', fontSize:14, fontWeight: "400",  marginTop: 20}}
//onPress={() => Linking.openURL('http://google.com')}>
onPress={() => this.props.navigation.navigate('CadastroAdm')}>Você é um gestor de projetos?</Text>

<Spinner  visible={this.state.visible} textContent={'Carregando...'}  />
</View>
  )
}

login = () => {

  //
  //alert(this.state.login)
this.setState({visible: true})
//const proxyurl = 'https://cors-anywhere.herokuapp.com/';
const url = 'http://projetofaculdade.herokuapp.com/autenticacao';
//const url = 'http://177.55.116.98:3000/autenticacao';
  fetch(url, {
      method: 'POST',
        headers: {
           'Accept': 'application/json', 
           'Content-Type': 'application/json',
           'Access-Control-Allow-Origin': 'http://projetofaculdade.herokuapp.com/autenticacao',
            'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        login: this.state.login,
        senha: this.state.senha
      })

  })
  .then((response) => response.json())
  .then((res) => {
    //alert(res.message)
    if(res.sucess!==false){
      
      this.setState({usuario: res.row})

      this.setState({visible: false})
      Alert.alert('Usuário '+this.state.usuario[0].nome+' logado com sucesso!')
     // AsyncStorage.setItem('nome',this.state.usuario[0].nome, '')
      this.setPermissoes(JSON.stringify(this.state.usuario[0].perfil_id),JSON.stringify(this.state.usuario[0].empresa_id),
      JSON.stringify(this.state.usuario[0].area_id),JSON.stringify(this.state.usuario[0].nome),JSON.stringify(this.state.usuario[0].usuario_id),
      JSON.stringify(this.state.usuario[0].cargo_desc),JSON.stringify(this.state.usuario[0].emp_desc)) 
     
     if(this.state.usuario[0].perfil_id==1){
      this.props.navigation.navigate('Index')
     }else{
      this.props.navigation.navigate('IndexBasico')
     }
    }else{

      this.setState({visible: false})
      Alert.alert(res.message)
    }

  })
  



}





async setPermissoes(perfil_id, empresa_id, area_id, nome, usuario_id, cargo_desc,emp_desc) {
  try {
    

  
      await AsyncStorage.setItem('perfil_id',perfil_id);
      await AsyncStorage.setItem('empresa_id',empresa_id);
      await AsyncStorage.setItem('area_id',area_id);
      await AsyncStorage.setItem('usuario',nome);
      await AsyncStorage.setItem('usuario_id',usuario_id);
      await AsyncStorage.setItem('cargo_desc',cargo_desc);
      await AsyncStorage.setItem('empresa',emp_desc);

      //console.log(‘Token salvo com sucesso!’);
  } catch (error) {
      console.log('Erro ao salvar o perfil');
 }
}





}



