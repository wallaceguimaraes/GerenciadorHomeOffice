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


export default class EtapaForm extends React.Component {

  



constructor(props){

  super(props);
  
  this.state = { 
    etapa_id: 0, 
    empresa_id: 0,
    botao: "Atualizar",
    descricao:''
  } 

}

componentDidMount = async () =>{

  //this.setState({empresa_id:await AsyncStorage.getItem('empresa_id')})

  if(this.props.route.params){
    this.setState({
                  etapa_id: this.props.route.params.etapa_id,
                  descricao: this.props.route.params.descricao  
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

<Text style={{fontWeight:"bold", marginTop: 10, fontSize: 18, color: '#fff'}}>Atualizar etapa:</Text>


<TextInput
style={styles.textInput} 
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
const url = 'http://projetofaculdade.herokuapp.com/etapaCad';
  fetch(url, {
      method: 'POST',
        headers: {
           'Accept': 'application/json', 
           'Content-Type': 'application/json',
           'Access-Control-Allow-Origin': 'http://projetofaculdade.herokuapp.com/etapaCad',
            'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        descricao: this.state.descricao,
        empresa_id: this.state.empresa_id,
        etapa_id: this.state.etapa_id 
      })

  })
  .then((response) => response.json())
  .then((res) => {
    //Alert.alert(res.message)
    
    if(res.sucess===true){
        Alert.alert(res.message)
       // AsyncStorage.setItem('usuario', res.usuario)
       let change = 'sim';
      this.props.navigation.navigate('Etapa',{change:change})
    }else{
      Alert.alert(res.message)
    }

  })
  
}

}



