import React from 'react';
import {  StyleSheet, 
          Text, 
          View,
          TextInput, 
          KeyboardAvoidingView, 
          TouchableOpacity, 
          Alert, FlatList, ScrollView} from 'react-native';
//import {RNPickerSelect} from 'react-native-picker-select'
import   DropDownPicker   from 'react-native-dropdown-picker'  
//import {Picker} from '@react-native-community/picker'   
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styles'
import AsyncStorage from '@react-native-community/async-storage';   
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';       
import ShimmerPlaceholder from 'react-native-shimmer-placeholder'
import { Avatar, Button, Icon, ListItem } from 'react-native-elements';


export default class Cadastro extends React.Component {

constructor(props){
  super(props);
  this.state = {
    botao: "Cadastrar",

    cargoDesc: '',
    usuario_id: 0,
    empresa:0,
    cargo_id: 0,
    cargo: [],
    areaDesc: '',
    area_id: 0,
    area: [],
    nome:'',
    login: '',
    senha: '',
    visible1: false,
    visible2: false
  }
  this.arrayholder = [];

}


searchFilterFunction = (area_id) => {     
     let data = []
     data = this.arrayholder.filter(item => item.area_id == area_id)//.map(descricao => ({descricao}));
     this.setState({cargo: data})
};

componentDidMount = async () =>{
  this.setState({ empresa: await AsyncStorage.getItem('empresa_id') });
  this.listarArea()
  this.listarCargo()

  if(this.props.route.params){
    this.setState({botao: "Atualizar",
                  usuario_id: this.props.route.params.item.usuario_id,
                  area_id: this.props.route.params.item.area_id,
                  cargo_id: this.props.route.params.item.cargo_id,
                  login: this.props.route.params.item.login,
                  senha: this.props.route.params.item.senha,
                  nome: this.props.route.params.item.nome,    
                })
  }
  }


  getActions(item){
        return (
            <>
                <Button 
                    onPress={() => this.setar(item)}
                    type="clear"
                    icon={ <Icon name="check" size={25} color="green" /> }
                />
            
            </>
        )
    }


    
setar = async(Item) =>{

  if(await Item.item.cargo_id){  
  //Alert.alert(JSON.stringify(projeto.item.area_id))
this.setState({cargoDesc: Item.item.descricao})
this.setState({cargo_id: Item.item.cargo_id})
Alert.alert("Cargo escolhido: "+JSON.stringify(Item.item.descricao))
}else{

  this.setState({areaDesc: Item.item.descricao})
  this.setState({area_id: await Item.item.area_id})
  
  Alert.alert("Área escolhida: "+JSON.stringify(Item.item.descricao))
 // this.setState({visible2: false})
  this.searchFilterFunction(this.state.area_id)


}
}

    keyExtractor = (item, index) => index.toString()

    renderItem = ({item}) => {
  
      return(
      <ListItem bottomDivider 
      rightElement={this.getActions({item})}     
      title={item.descricao}  
      />
      )
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

<KeyboardAwareScrollView style={styles.container}>

<View >
<Text style={{fontWeight:"bold", fontSize: 16, color: '#fff'}}>Selecione a área:</Text>

<ShimmerPlaceholder
style={{flex: 1}}
autorun={true}
visible={this.state.visible1}>

<FlatList style={styles.flat} 
      contentContainerStyle={{ borderRadius:5, overflow: 'hidden'}}
      keyExtractor={this.keyExtractor}
      data={this.state.area}
      renderItem={this.renderItem}
    />
</ShimmerPlaceholder>

<ShimmerPlaceholder
style={{}}
autorun={true}
visible={this.state.visible2}>
<Text style={{fontWeight:"bold", fontSize: 16, color: '#fff'}}>Selecione o cargo:</Text>

<FlatList style={styles.flat} 
      contentContainerStyle={{ borderRadius:5, overflow: 'hidden'}}
      keyExtractor={this.keyExtractor}
      data={this.state.cargo}
      renderItem={this.renderItem}
    />

</ShimmerPlaceholder>

<TextInput
style={styles.textInput} placeholder='Digite o nome do usuário...'
onChangeText={(nome) => this.setState({nome})}
value={this.state.nome}
underlineColorAndroid='transparent'
/>


<TextInput
style={styles.textInput} placeholder='Digite o login...'
onChangeText={(login) => this.setState({login})}
value={this.state.login}
underlineColorAndroid='transparent'
/>



<TextInput
style={styles.textInput} placeholder='Digite a senha aqui...'
onChangeText={(senha) => this.setState({senha})}
value={this.state.senha}
secureTextEntry={true}
underlineColorAndroid='transparent'
/>

<TouchableOpacity
style={styles.btn}
onPress={this.cadastrar}
>
<Text style={{color:'#fff'}}>{this.state.botao}</Text>
</TouchableOpacity>
</View>
</KeyboardAwareScrollView>
  )
}




listarArea = () => {
  //const proxyurl = 'https://cors-anywhere.herokuapp.com/';
  console.disableYellowBox = true;//Escondendo warningss
  
  const url = 'http://projetofaculdade.herokuapp.com/area';
    fetch(url, {
        method: 'POST',
          headers: {
             'Accept': 'application/json', 
             'Content-Type': 'application/json',
             'Access-Control-Allow-Origin': 'http://projetofaculdade.herokuapp.com/area',
              'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
          empresa_id: this.state.empresa,
          ativo: 'SIM',
        })
  
    })
    .then((res) => res.json())
    .then((res) => {
      this.setState({
        area:res.row,
        visible1: true  
      })
      //Alert.alert(JSON.stringify(this.state.area))

    })
  }

  listarCargo = () => {
    //const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    console.disableYellowBox = true;//Escondendo warningss
    
    const url = 'http://projetofaculdade.herokuapp.com/cargo';
      fetch(url, {
          method: 'POST',
            headers: {
               'Accept': 'application/json', 
               'Content-Type': 'application/json',
               'Access-Control-Allow-Origin': 'http://projetofaculdade.herokuapp.com/cargo',
                'Access-Control-Allow-Credentials': true,
          },
          body: JSON.stringify({
            empresa_id: this.state.empresa,
            ativo: 'SIM',
          })
    
      })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          cargo:res.row,
          visible2: true  
        })
        //Alert.alert(JSON.stringify(this.state.area))
        this.arrayholder = res.row;      

      })
    }



cadastrar = () => {
  //alert(this.state.login)

//const proxyurl = 'https://cors-anywhere.herokuapp.com/';
const url = 'http://projetofaculdade.herokuapp.com/usuarioCad';
  fetch(url, {
      method: 'POST',
        headers: {
           'Accept': 'application/json', 
           'Content-Type': 'application/json',
           'Access-Control-Allow-Origin': 'http://projetofaculdade.herokuapp.com/usuarioCad',
            'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        nome: this.state.nome,  
        login: this.state.login,
        senha: this.state.senha,
        empresa: this.state.empresa,
        area: this.state.area_id,
        cargo: this.state.cargo_id,
        usuario_id: this.state.usuario_id
      })

  })
  .then((response) => response.json())
  .then((res) => {
    //alert(res.message)
    
    if(res.sucess===true){
       Alert.alert(res.message)
       // AsyncStorage.setItem('usuario', res.usuario)
      let change='sim' 
      this.props.navigation.navigate('Usuario', change)
    }else{
      Alert.alert(res.message)
    }

  })
  



}

}



