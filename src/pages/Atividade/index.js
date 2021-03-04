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


export default class Atividade extends Component {

constructor(props){
  super(props);
  this.state = { atividade:[],
                 projeto_id: 0,
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
  this.props.route.params=null
}

componentDidMount = async () =>{
this.setState({ empresa_id: await AsyncStorage.getItem('empresa_id') });
this.setState({ tipo_id: await AsyncStorage.getItem('projeto_id') });
this.setState({ area_id: await AsyncStorage.getItem('area_id') });
this.listar()
}

confirma_excluir(atividade){
 Alert.alert('Excluir Atividade', 'Deseja excluir a atividade "'+atividade.item.descricao+'"?', [
    {
        text: 'Sim',
        onPress: () => this.excluir(atividade)        
    },
    {
        text: 'Não'
    }
])

}

getActions(atividade){
    return (
        <>
            <Button 
                onPress={() => this.props.navigation.navigate('AtividadeForm', atividade)}
                type="clear"
                icon={ <Icon name="edit" size={25} color="orange" /> }
            />
                <Button 
                onPress={() => this.confirma_excluir(atividade)}
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
      subtitle={"Projeto: "+item.descricao_pro+"\nÁrea: "+item.descricao_area}    
  
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

<FlatList style={styles.flatList} 
      keyExtractor={this.keyExtractor}
      
      data={this.state.atividade}
      renderItem={this.renderItem}
    />


<Button 

style={{width:40}}

onPress={() => this.props.navigation.navigate('AtividadeForm')}
        type="clear"
        icon={<Icon name="add" size={35} color="blue" backgroundColor="white" borderRadius={50} />}
/>
       
</View>
</ShimmerPlaceholder>
  )
}





excluir = (projeto) => {

  const url = 'http://projetofaculdade.herokuapp.com/atividadeCad';
  fetch(url, {
      method: 'POST',
        headers: {
           'Accept': 'application/json', 
           'Content-Type': 'application/json',
           'Access-Control-Allow-Origin': 'http://projetofaculdade.herokuapp.com/atividadeCad',
            'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        atividade_id: projeto.item.atividade_id,
        empresa_id: this.state.empresa_id,
        projeto_id: this.state.projeto_id, 
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

const url = 'http://projetofaculdade.herokuapp.com/atividade';
  fetch(url, {
      method: 'POST',
        headers: {
           'Accept': 'application/json', 
           'Content-Type': 'application/json',
           'Access-Control-Allow-Origin': 'http://projetofaculdade.herokuapp.com/atividade',
            'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        area_id: this.state.area_id,
        projeto_id: this.state.tipo_id,
        empresa_id: this.state.empresa_id,
        ativo: 'SIM',
      })

  })
  .then((res) => res.json())
  .then((res) => {
    //alert(JSON.stringify(res))
//    alert(JSON.stringify(res))

    this.setState({
      atividade:res.row,
      visible: true  
    })
  })
}
}



