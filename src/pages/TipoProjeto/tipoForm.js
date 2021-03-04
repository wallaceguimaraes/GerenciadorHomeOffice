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


export default class TipoForm extends React.Component {

  



constructor(props){

  super(props);
  
  this.state = { 
    tipo_id: 0, 
    empresa_id: 0,
    botao: "Cadastrar",
    descricao:''
  } 



}

componentDidMount = async () =>{

  this.setState({empresa_id:await AsyncStorage.getItem('empresa_id')})

  if(this.props.route.params){
    this.setState({botao: "Atualizar",
                  tipo_id: this.props.route.params.item.tipo_projeto_id,
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
 // const { navigation } = this.props;
 // const descricao = navigation.getParam('descricao', '');

 
 


  return(

<View style={styles.container}>
<TextInput
style={styles.textInput} placeholder='Digite o tipo do projeto aqui...'
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
  //Alert.alert(this.state.login)

//const proxyurl = 'https://cors-anywhere.herokuapp.com/';


const url = 'http://projetofaculdade.herokuapp.com/tipoCadProjeto';
  fetch(url, {
      method: 'POST',
        headers: {
           'Accept': 'application/json', 
           'Content-Type': 'application/json',
           'Access-Control-Allow-Origin': 'http://projetofaculdade.herokuapp.com/tipoCadProjeto',
            'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        descricao: this.state.descricao,
        empresa_id: this.state.empresa_id,
        tipo_id: this.state.tipo_id 
      })

  })
  .then((response) => response.json())
  .then((res) => {
    //Alert.alert(res.message)
    
    if(res.sucess===true){
        Alert.alert(res.message)
       // AsyncStorage.setItem('usuario', res.usuario)
       let change = 'sim';
      this.props.navigation.navigate('TipoProjeto', change)
    }else{
      Alert.alert(res.message)
    }

  })
  
}

}



