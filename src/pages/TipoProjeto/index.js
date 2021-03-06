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



export default class TipoProjeto extends Component {





constructor(props){
  super(props);
  this.state = { tipoProjeto:[],
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

confirma_excluir(tipoProjeto){
 Alert.alert('Excluir Tipo de projeto', 'Deseja excluir o tipo de projeto "'+tipoProjeto.item.descricao+'"?', [
    {
        text: 'Sim',
        onPress: () => this.excluir(tipoProjeto)
    },
    {
        text: 'Não'
    }
])
}

getActions(tipoProjeto){
    return (
        <>
            <Button 
                onPress={() => this.props.navigation.navigate('TipoForm',  tipoProjeto)}
                type="clear"
                icon={ <Icon name="edit" size={25} color="orange" /> }
            />
                <Button 
                onPress={() => this.confirma_excluir(tipoProjeto)}
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
      data={this.state.tipoProjeto}
      renderItem={this.renderItem}
    />


<Button 

style={{width:40}}

onPress={() => this.props.navigation.navigate('TipoForm')}
        type="clear"
        icon={<Icon name="add" size={35} color="blue" backgroundColor="white" borderRadius={50} />}

/>
       
</View>
</ShimmerPlaceholder>
  )
}
excluir = (tipo) => {

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
        tipo_id: tipo.item.tipo_projeto_id,
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

const url = 'http://projetofaculdade.herokuapp.com/tipoProjeto';
  fetch(url, {
      method: 'POST',
        headers: {
           'Accept': 'application/json', 
           'Content-Type': 'application/json',
           'Access-Control-Allow-Origin': 'http://projetofaculdade.herokuapp.com/tipoProjeto',
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
      tipoProjeto:res.row,
      visible: true  
    })
  })
}
}



