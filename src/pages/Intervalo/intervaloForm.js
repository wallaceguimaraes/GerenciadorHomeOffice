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


export default class IntervaloForm extends React.Component {

  



constructor(props){

  super(props);
  
  this.state = { 
    intervalo_id: 0, 
    empresa_id: 0,
    botao: "Cadastrar",
    descricao:''
  } 



}

componentDidMount = async () =>{

  this.setState({empresa_id:await AsyncStorage.getItem('empresa_id')})

  if(this.props.route.params){
    this.setState({botao: "Atualizar",
                  intervalo_id: this.props.route.params.item.intervalo_id,
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
                <TextInput
                style={styles.textInput} placeholder='Digite o intervalo/pausa aqui...'
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
const url = 'http://projetofaculdade.herokuapp.com/intervaloCad';
  fetch(url, {
      method: 'POST',
        headers: {
           'Accept': 'application/json', 
           'Content-Type': 'application/json',
           'Access-Control-Allow-Origin': 'http://projetofaculdade.herokuapp.com/intervaloCad',
            'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        descricao: this.state.descricao,
        empresa_id: this.state.empresa_id,
        intervalo_id: this.state.intervalo_id 
      })
  })
  .then((response) => response.json())
  .then((res) => {
    if(res.sucess===true){
        Alert.alert(res.message)
       let change = 'sim';
      this.props.navigation.navigate('Intervalo', change)
    }else{
      Alert.alert(res.message)
    }

  })
  
}

}



