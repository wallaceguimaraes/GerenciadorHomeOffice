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


export default class Projeto extends Component {

constructor(props){
  super(props);
  this.state = { projeto:[],
                 area_id: 0,
                 empresa_id: 0,
                 tipo_id:0,
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
this.setState({ tipo_id: await AsyncStorage.getItem('tipo_id') });
this.setState({ area_id: await AsyncStorage.getItem('area_id') });
this.listar()
}

confirma_excluir(projeto){
 Alert.alert('Excluir Projeto', 'Deseja excluir o projeto "'+projeto.item.descricao+'"?', [
    {
        text: 'Sim',
        onPress: () => this.excluir(projeto)        
    },
    {
        text: 'Não'
    }
])

}


searchFilterFunction = (text) => {   
  this.setState({texto: text}) 
  const newData = this.arrayholder.filter(item => {      
    const itemData = `${item.descricao.toUpperCase()}   
    ${item.descricao.toUpperCase()}`;
    
     const textData = text.toUpperCase();
      
     return itemData.indexOf(textData) > -1;    
  });
  
  this.setState({ projeto: newData });  
};



getActions(projeto){
    return (
        <>
            <Button 
                onPress={() => this.props.navigation.navigate('ProjetoForm', projeto)}
                type="clear"
                icon={ <Icon name="edit" size={25} color="orange" /> }
            />
                <Button 
                onPress={() => this.confirma_excluir(projeto)}
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
      //subtitle={item.areaDesc}  
      subtitle={"Área: "+item.descricao_area+"\nTipo: "+item.descricao_tipo}    
  
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
style={styles.textInput} placeholder='Buscar projeto...'
onChangeText={texto => this.searchFilterFunction(texto)}
underlineColorAndroid='transparent'

value={this.state.texto}
/>

<FlatList style={styles.flatList} 
      keyExtractor={this.keyExtractor}
      
      data={this.state.projeto}
      renderItem={this.renderItem}
    />


<Button 

style={{borderRadius:50}}

onPress={() => this.props.navigation.navigate('ProjetoForm')}
        type="clear"
        icon={<Icon name="add" size={35} color="blue" backgroundColor="white" borderRadius={50} />}
/>
       
</View>
</ShimmerPlaceholder>
  )
}





excluir = (projeto) => {

  const url = 'http://projetofaculdade.herokuapp.com/projetoCad';
  fetch(url, {
      method: 'POST',
        headers: {
           'Accept': 'application/json', 
           'Content-Type': 'application/json',
           'Access-Control-Allow-Origin': 'http://projetofaculdade.herokuapp.com/projetoCad',
            'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        projeto_id: projeto.item.projeto_id,
        empresa_id: this.state.empresa_id,
        tipo_id: this.state.tipo_id, 
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

const url = 'http://projetofaculdade.herokuapp.com/projeto';
  fetch(url, {
      method: 'POST',
        headers: {
           'Accept': 'application/json', 
           'Content-Type': 'application/json',
           'Access-Control-Allow-Origin': 'http://projetofaculdade.herokuapp.com/projeto',
            'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        area_id: this.state.area_id,
        tipo_id: this.state.tipo_id,
        empresa_id: this.state.empresa_id,
        ativo: 'SIM',
      })

  })
  .then((res) => res.json())
  .then((res) => {
    //alert(JSON.stringify(res))
//    alert(JSON.stringify(res))

    this.setState({
      projeto:res.row,
      visible: true  
    })
    this.arrayholder = res.row;      

  })
}
}



