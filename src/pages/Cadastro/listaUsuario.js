import React, { Component} from 'react';
import {  StyleSheet, 
          Text, 
          View,
          TextInput, 
          KeyboardAvoidingView, 
          TouchableOpacity, 
          Alert,
          FlatList
          } from 'react-native';
import styles from './styles'
import AsyncStorage from '@react-native-community/async-storage';   
import {createStackNavigator, Header, HeaderTitle} from '@react-navigation/stack';       
import { Avatar, Button, Icon, ListItem } from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native'
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';


export default class ListaUsuario extends Component {

constructor(props){
  super(props);
  this.state = { usuario:[],
                 area:0,    
                 area_desc: 0,
                 empresa_id: 0,
                 cargo_desc: '',
                 cargo: 0,
                 atualiza: 1,
                 prev: 1,
                 visible: false,
                 texto: ''

                 }
                 this.arrayholder = [];

                }

                
componentDidUpdate(){


  if (this.props.route.params) {
    this.listar()  
  }
  //this.state.prev=undefined
  this.props.route.params=null
 
}

componentDidMount = async () =>{
this.setState({ empresa_id: await AsyncStorage.getItem('empresa_id') });
//this.setState({ tipo_id: await AsyncStorage.getItem('perfil_id') });
//this.setState({ cargo: await AsyncStorage.getItem('area_id') });
this.listar()
}

confirma_excluir(usuario){
 Alert.alert('Excluir Usuário', 'Deseja excluir o usuário "'+usuario.item.nome+'"?', [
    {
        text: 'Sim',
        onPress: () => this.excluir(usuario)        
    },
    {
        text: 'Não'
    }
])

}


searchFilterFunction = (text) => {   
  this.setState({texto: text}) 
  const newData = this.arrayholder.filter(item => {      
    const itemData = `${item.nome.toUpperCase()}   
    ${item.nome.toUpperCase()}`;
    
     const textData = text.toUpperCase();
      
     return itemData.indexOf(textData) > -1;    
  });
  
  this.setState({ usuario: newData });  
};



getActions(usuario){
    return (
        <>
            <Button 
                onPress={() => this.props.navigation.navigate('Cadastro', usuario)}
                type="clear"
                icon={ <Icon name="edit" size={25} color="orange" /> }
            />
                <Button 
                onPress={() => this.confirma_excluir(usuario)}
                type="clear"
                icon={ <Icon name="delete" size={25} color="red" /> }
            />
        
        </>

    )
}

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
      <ListItem bottomDivider 
      rightElement={this.getActions({item})}
      title={"Nome: "+item.nome}
        
      subtitle={"Login: "+item.login}    
  
      />
    )


render(){
  return(

<ShimmerPlaceholder
autorun={true}
style={{backgroundColor:'#00BFFF', flex: 4}}
visible={this.state.visible}
>    


<View style={{backgroundColor:'#00BFFF'}} >


<TextInput
style={styles.textInput} placeholder='Buscar usuário...'
onChangeText={texto => this.searchFilterFunction(texto)}
underlineColorAndroid='transparent'

value={this.state.texto}
/>

<FlatList style={styles.flatList} 
      keyExtractor={this.keyExtractor}
      
      data={this.state.usuario}
      renderItem={this.renderItem}
    />


<Button 

style={{borderRadius:50}}

onPress={() => this.props.navigation.navigate('Cadastro')}
        type="clear"
        icon={<Icon name="add" size={35} color="blue" backgroundColor="white" borderRadius={50} />}
/>
       
</View>
</ShimmerPlaceholder>
  )
}





excluir = (usuario) => {

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
        usuario_id: usuario.item.usuario_id,
        empresa_id: this.state.empresa_id,
        //tipo_id: this.state.tipo_id, 
        ativo: 'NÃO'
      })

  })
  .then((res) => res.json())

  .then((res) => {

    if(res.sucess===true){
      Alert.alert(res.message)
      this.listar()
    }
  })
  this.listar()
}

listar = () => {
this.setState({visible: false})
  //const proxyurl = 'https://cors-anywhere.herokuapp.com/';
console.disableYellowBox = true;//Escondendo warningss

const url = 'http://projetofaculdade.herokuapp.com/usuario';
  fetch(url, {
      method: 'POST',
        headers: {
           'Accept': 'application/json', 
           'Content-Type': 'application/json',
           'Access-Control-Allow-Origin': 'http://projetofaculdade.herokuapp.com/usuario',
            'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        //area_id: this.state.area_id,
        //tipo_id: this.state.tipo_id,
        empresa_id: this.state.empresa_id,
        ativo: 'SIM',
      })

  })
  .then((res) => res.json())
  .then((res) => {
    //alert(JSON.stringify(res))
//    alert(JSON.stringify(res))

    this.setState({
      usuario:res.row,
      visible: true  
    })
    this.arrayholder = res.row;      

  })
}
}



