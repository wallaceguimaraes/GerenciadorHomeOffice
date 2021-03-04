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



export default class Area extends Component {

constructor(props){
  super(props);
  this.state = { area:[],
                 empresa_id:0,
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
this.listar()
}

confirma_excluir(area){
 Alert.alert('Excluir Área', 'Deseja excluir a área "'+area.item.descricao+'"?', [
    {
        text: 'Sim',
        onPress: () => this.excluir(area)        
    },
    {
        text: 'Não'
    }
])

}

getActions(area){
    return (
        <>
            <Button 
                onPress={() => this.props.navigation.navigate('AreaForm', area)}
                type="clear"
                icon={ <Icon name="edit" size={25} color="orange" /> }
            />
                <Button 
                onPress={() => this.confirma_excluir(area)}
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

  return(

<ShimmerPlaceholder
autorun={true}
style={{backgroundColor:'#00BFFF', flex: 4}}
visible={this.state.visible}
>
<View  >


<FlatList style={{marginTop:25, maxHeight: 500}} 
      keyExtractor={this.keyExtractor}
      data={this.state.area}
      renderItem={this.renderItem}
    />

<Button 

style={{width:40}}

onPress={() => this.props.navigation.navigate('AreaForm')}
        type="clear"
        icon={<Icon name="add" size={35} color="blue" backgroundColor="white" borderRadius={50} />}
/>
</View>
 </ShimmerPlaceholder>
  )
}





excluir = (area) => {

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
        area_id: area.item.area_id,
        empresa_id: this.state.empresa_id, 
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
this.setState({ visible: false })  

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
        empresa_id: this.state.empresa_id,
        ativo: 'SIM',
      })

  })
  .then((res) => res.json())
  .then((res) => {
    //alert(JSON.stringify(res))
   if(res.failed==true){
     Alert.alert(res.message)
   }else{this.setState({
      area:res.row,
      visible: true  
    })
  }
  })
}
}



