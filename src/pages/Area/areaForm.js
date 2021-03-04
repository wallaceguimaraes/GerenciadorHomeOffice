import React from 'react';
import {  StyleSheet, 
          Text, 
          View,
          TextInput, 
          KeyboardAvoidingView, 
          TouchableOpacity, 
          TouchableWithoutFeedback,
          Alert} from 'react-native';
import styles from './styles'
import AsyncStorage from '@react-native-community/async-storage';   
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';       


export default class AreaForm extends React.Component {

constructor(props){

  super(props);
  
  this.state = { 
    area_id: 0, 
    empresa_id: 0,
    botao: "Cadastrar",
    descricao:''
  } 



}

componentDidMount = async () =>{

  this.setState({ empresa_id: await AsyncStorage.getItem('empresa_id') });



  if(this.props.route.params){
    this.setState({botao: "Atualizar",
                  area_id: this.props.route.params.item.area_id,
                  descricao: this.props.route.params.item.descricao,  
                  empresa_id:this.props.route.params.item.empresa_id  
                })
  }
  }



render(){
  return(

<KeyboardAvoidingView  behavior={Platform.OS == "ios" ? "padding" : "height"} 
style={styles.container}>

<View >
<TextInput
style={styles.textInput} placeholder='Digite a área que você deseja cadastrar...'
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


</KeyboardAvoidingView>
  )
}

cadastrar = () => {

const url = 'http://projetofaculdade.herokuapp.com/areaCad';
  fetch(url, {
      method: 'POST',
        headers: {
           'Accept': 'application/json', 
           'Content-Type': 'application/json',
           'Access-Control-Allow-Origin': 'http://projetofaculdade.herokuapp.com/areaCad',
            'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        descricao: this.state.descricao,
        area_id: this.state.area_id,
        empresa_id:  this.state.empresa_id
      })
  })
  .then((response) => response.json())
  .then((res) => {

    if(res.sucess===true){
        Alert.alert(res.message)
       let change = 'sim';
       this.props.navigation.navigate('Area', change)
    }else{
      Alert.alert(res.message)
    }
  })  
}

}
