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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styles'
import AsyncStorage from '@react-native-community/async-storage';   
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';       
import ShimmerPlaceholder from 'react-native-shimmer-placeholder'
import { Avatar, Button, Icon, ListItem, SearchBar } from 'react-native-elements';


export default class AtividadeForm extends React.Component {

constructor(props){

  super(props);
   
  this.state = { 
    atividade_id: 0,
    areaDesc: '',
    area_id: 0,
    projetoDesc: '', 
    projeto_id: 0,
    botao: "Cadastrar",
    empresa_id: 0,    
    descricao:'',
    atividade: [],
    projeto: [],
    area: [],
    area_selecionada: '',
    projeto_selecionado: '',
    pesquisa: '',
    atualiza: false,
    visible1: false,
    visible2: false,
    texto: ''
  } 
  this.arrayholder = [];


}


atualiza(){
  //this.listarProjeto()
  this.setState({atualiza: true}) 
  this.setState({visible2: false})
}
naoAtualiza(){
  this.setState({atualiza: 1})
}

/*
componentDidUpdate(){

  if(this.state.atualiza===true){  
  this.listarProjeto()
  }
  this.state.atualiza=null
  }
*/

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



componentDidMount = async () =>{
  
  //Verificar se empresa_id e 0
  this.setState({ empresa_id: await AsyncStorage.getItem('empresa_id') });
  
  
  //this.setState({ area_id: await AsyncStorage.getItem('area_id') });
  //this.setState({ projeto_id: await AsyncStorage.getItem('projeto_id') });
  this.listarArea()
  this.listarProjeto()  

  if(this.props.route.params){
    this.setState({botao: "Atualizar",
                  atividade_id: this.props.route.params.item.atividade_id,
                  area_id: this.props.route.params.item.area_id,
                  projeto_id: this.props.route.params.item.projeto_id,
                  descricao: this.props.route.params.item.descricao,    
                })
  }
  }



setar(Item){


  if(Item.item.area_id){  
//  Alert.alert(JSON.stringify(projeto.item.area_id))
this.setState({areaDesc: Item.item.descricao})
this.setState({area_id: Item.item.area_id})
//this.listarProjeto()  


}else{
    this.setState({projetoDesc: Item.item.descricao})
    this.setState({projeto_id: Item.item.projeto_id})
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


  keyExtractor = (item, index) => index.toString()

  renderItens = ({item}) => {
    return(
    <ListItem bottomDivider 
    rightElement={this.getActions({item})}     
    title={item.descricao}
    subtitle={"Área: "+item.descricao_area+"\nTipo: "+item.descricao_tipo}    

    />
    )}


render(){
//var item =''
//Alert.alert(JSON.stringify(this.state.area))

/*

<SearchBar        
      placeholder="Buscar projeto..."        
      
      round        
      underlineColorAndroid='transparent'
      lightTheme
      round
      style={{color: '#000000'}}
      onChangeText={text => this.searchFilterFunction(text)}
      autoCorrect={false}             
    />  

*/

return(


<KeyboardAwareScrollView style={styles.container}>



<View   >


<TextInput
style={styles.textInput} placeholder='Buscar projeto...'
onChangeText={texto => this.searchFilterFunction(texto)}
underlineColorAndroid='transparent'

value={this.state.texto}
/>


<Text style={{fontWeight:"bold", fontSize: 16, color: '#fff'}}>Projeto:</Text>

<ShimmerPlaceholder
style={{}}
autorun={true}
visible={this.state.visible2}>

<FlatList style={styles.flat} 
      contentContainerStyle={{ borderRadius:5, overflow: 'hidden'}}
      keyExtractor={this.keyExtractor}
      data={this.state.projeto}
      renderItem={this.renderItens}
      refreshing={this.state.atualiza}
    />


</ShimmerPlaceholder>
<TextInput
style={styles.textInput} placeholder='Selecione o projeto acima...'
//onChangeText={(areaDesc) => this.setState({areaDesc})}
underlineColorAndroid='transparent'
value={this.state.projetoDesc}
/>

<TextInput
style={styles.textInput} placeholder='Descreva a atividade/funcionalidade...'
onChangeText={(descricao) => this.setState({descricao})}
underlineColorAndroid='transparent'

value={this.state.descricao}
/>
<TouchableOpacity
style={styles.btn}
onPress={this.cadastrar}
>
   
<Text style={{color:"#fff", fontWeight:"900"}} >{this.state.botao}</Text>

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
          empresa_id: this.state.empresa_id,
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

  listarProjeto = () => {

    this.setState({atualiza: true})  
    
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
            vinculo: 'SIM',
            area_id: this.state.area_id,
            empresa_id: this.state.empresa_id,
            filtro: this.state.pesquisa,
            ativo: 'SIM',
          })
      })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          projeto:res.row,
          visible2: true,
          atualiza: false  
        })
        this.arrayholder = res.row;      

      })
    }

cadastrar = () => {

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
        atividade_id: this.state.atividade_id,
        descricao: this.state.descricao,
        area_id: this.state.area_id,
        projeto_id: this.state.projeto_id,
        empresa_id:  this.state.empresa_id
      })
  })
  .then((response) => response.json())
  .then((res) => {
    if(res.sucess===true){
       Alert.alert(res.message)
       let change = 'sim';//tirar change
       this.props.navigation.navigate('Atividade', change)
    }else{
      Alert.alert(res.message)
    }
  })
}
}