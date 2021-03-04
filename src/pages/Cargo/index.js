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

export default class Cargo extends Component {

constructor(props){
  super(props);
  this.state = { cargo:[],
                 empresa_id: 0,
                 area_id:0,
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
this.setState({ area_id: await AsyncStorage.getItem('area_id') });


//Alert.alert(this.state.empresa_id)
this.listar()
}

confirma_excluir(cargo){
 Alert.alert('Excluir Cargo', 'Deseja excluir o cargo "'+cargo.item.descricao+'"?', [
    {
        text: 'Sim',
        onPress: () => this.excluir(cargo)        
    },
    {
        text: 'Não'
    }
])

}

getActions(cargo){
    return (
        <>
            <Button 
                onPress={() => this.props.navigation.navigate('CargoForm', cargo)}
                type="clear"
                icon={ <Icon name="edit" size={25} color="orange" /> }
            />
                <Button 
                onPress={() => this.confirma_excluir(cargo)}
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
      subtitle={item.descricao_area}
      subtitle={item.descricao_area}
   
      />
    )


render(){
  return(

<ShimmerPlaceholder
autorun={true}
style={{backgroundColor:'#00BFFF', flex: 4}}
visible={this.state.visible}
>    

<View  >

<FlatList style={styles.flatList} 
      keyExtractor={this.keyExtractor}
      data={this.state.cargo}
      renderItem={this.renderItem}
    />


<Button 

style={{width:40}}

onPress={() => this.props.navigation.navigate('CargoForm')}
        type="clear"
        icon={<Icon name="add" size={35} color="blue" backgroundColor="white" borderRadius={50} />}

/>
       
</View>
</ShimmerPlaceholder>
  )
}





excluir = (cargo) => {

  const url = 'http://projetofaculdade.herokuapp.com/cargoCad';
  fetch(url, {
      method: 'POST',
        headers: {
           'Accept': 'application/json', 
           'Content-Type': 'application/json',
           'Access-Control-Allow-Origin': 'http://projetofaculdade.herokuapp.com/cargoCad',
            'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        cargo_id: cargo.item.cargo_id,
        area_id: this.state.area_id, 
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
        area_id: this.state.area_id,
        empresa_id: this.state.empresa_id,
        ativo: 'SIM',
      })
  })
  .then((res) => res.json())
  .then((res) => {
   this.setState({
      cargo:res.row,
      visible: true  
    })
  })
}
}



