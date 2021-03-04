import React, { Component} from 'react';
import {  StyleSheet, 
          Text, 
          View,
          TextInput, 
          KeyboardAvoidingView, 
          TouchableOpacity, 
          Alert,
          FlatList,
          } from 'react-native';
import styles from './styles'
import AsyncStorage from '@react-native-community/async-storage';   
import {createStackNavigator, Header, HeaderTitle} from '@react-navigation/stack';       
import { Avatar, Button, Icon, ListItem } from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native'
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';



export default class Intervalo extends Component {





constructor(props){
  super(props);
  this.state = {  intervalo:[],
                  empresa_id: 0,
                  atualiza: 1,
                  prev: 1,
                  visible: false
                 }

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
//this.setState({prevProps: this.props})
this.listar()
}

confirma_excluir(intervalo){
 Alert.alert('Excluir Intervalo/Pausa', 'Deseja excluir o intervalo/pausa "'+intervalo.item.descricao+'"?', [
    {
        text: 'Sim',
        onPress: () => this.excluir(intervalo)
    },
    {
        text: 'Não'
    }
])
}

getActions(intervalo){
    return (
        <>
            <Button 
                onPress={() => this.props.navigation.navigate('TipoForm',  intervalo)}
                type="clear"
                icon={ <Icon name="edit" size={25} color="orange" /> }
            />
                <Button 
                onPress={() => this.confirma_excluir(intervalo)}
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
        
      title={item.descricao}
       
      />
    )


render(){

//alert(JSON.stringify(this.props.route.params))

  return(


<ShimmerPlaceholder
autorun={true}
style={{backgroundColor:'#00BFFF', flex: 4}}

visible={this.state.visible}
>    

<View >


<FlatList style={{marginTop:25, maxHeight:500 , backgroundColor: 'blue'}} 
      keyExtractor={this.keyExtractor}
      data={this.state.intervalo}
      renderItem={this.renderItem}
    />


<Button 

style={{width:40}}

onPress={() => this.props.navigation.navigate('IntervaloForm')}
        type="clear"
        icon={<Icon name="add" size={35} color="blue" backgroundColor="white" borderRadius={50} />}

/>
       
</View>
</ShimmerPlaceholder>
  )
}
excluir = (intervalo) => {

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
        intervalo_id: intervalo.item.intervalo_id,
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

const url = 'http://projetofaculdade.herokuapp.com/intervalo';
  fetch(url, {
      method: 'POST',
        headers: {
           'Accept': 'application/json', 
           'Content-Type': 'application/json',
           'Access-Control-Allow-Origin': 'http://projetofaculdade.herokuapp.com/intervalo',
            'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        ativo: 'SIM',
        empresa_id: this.state.empresa_id
      })

  })
  .then((res) => res.json())
  .then((res) => {
    //Alert.alert(JSON.stringify({res}))
    this.setState({
      intervalo:res.row,
      visible: true  
    })
  })
}
}



