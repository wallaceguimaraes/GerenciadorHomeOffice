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
import { Avatar, Button, Icon, ListItem } from 'react-native-elements';


export default class ProjetoForm extends React.Component {

constructor(props){

  super(props);
   
  this.state = { 
    projeto_id: 0,
    tipoDesc: '',
    tipo_id: 0,
    areaDesc: '', 
    area_id: 0,
    botao: "Cadastrar",
    empresa_id: 0,    
    descricao:'',
    projeto: [],
    tipo: [],
    area: [],
    area_selecionada: '',
    tipo_selecionado: '',
    visible1: false,
    visible2: false
  } 


}

componentDidMount = async () =>{
  
  //Verificar se empresa_id e 0
  this.setState({ empresa_id: await AsyncStorage.getItem('empresa_id') });
  
  
  this.setState({ area_id: await AsyncStorage.getItem('area_id') });
  this.setState({ tipo_id: await AsyncStorage.getItem('tipo_id') });
  this.listarArea()
  this.listarTipo()  

  


  if(this.props.route.params){
    this.setState({botao: "Atualizar",
                  projeto_id: this.props.route.params.item.projeto_id,
                  area_id: this.props.route.params.item.area_id,
                  tipo_id: this.props.route.params.item.tipo_id,
                  descricao: this.props.route.params.item.descricao,    
                })
  }
  }


setar(Item){


  if(Item.item.area_id){  
//  Alert.alert(JSON.stringify(projeto.item.area_id))
this.setState({areaDesc: Item.item.descricao})
this.setState({area_id: Item.item.area_id})

}else{
    this.setState({tipoDesc: Item.item.descricao})
    this.setState({tipo_id: Item.item.tipo_projeto_id})

}
 
  //Alert.alert(JSON.stringify(this.state.empresa_id))

}


  getActions(item){

//Alert.alert(JSON.stringify(area.item.descricao))

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
    />
    )}

    


render(){
//var item =''
//Alert.alert(JSON.stringify(this.state.area))
    return(

<KeyboardAwareScrollView style={styles.container}>
<View   >

<Text style={{fontWeight:"bold", marginTop: 2, fontSize: 16, color: '#fff'}}>Área da locação do projeto:</Text>

<ShimmerPlaceholder
style={{}}
autorun={true}
visible={this.state.visible1}>

<FlatList style={styles.flat} 
      contentContainerStyle={{ borderRadius:5, overflow: 'hidden'}}
      keyExtractor={this.keyExtractor}
      data={this.state.area}
      renderItem={this.renderItens}
    />
</ShimmerPlaceholder>
<TextInput
style={styles.textInput} placeholder='Seleciona a área acima...'
//onChangeText={(areaDesc) => this.setState({areaDesc})}
underlineColorAndroid='transparent'
value={this.state.areaDesc}
/>

<Text style={{fontWeight:"bold", fontSize: 16, color: '#fff'}}>Tipo do projeto:</Text>

<ShimmerPlaceholder
style={{}}
autorun={true}
visible={this.state.visible2}>

<FlatList style={styles.flat} 
      contentContainerStyle={{ borderRadius:5, overflow: 'hidden'}}
      keyExtractor={this.keyExtractor}
      data={this.state.tipo}
      renderItem={this.renderItens}
    />
</ShimmerPlaceholder>
<TextInput
style={styles.textInput} placeholder='Selecione o tipo do projeto acima...'
//onChangeText={(areaDesc) => this.setState({areaDesc})}
underlineColorAndroid='transparent'
value={this.state.tipoDesc}
/>

<TextInput
style={styles.textInput} placeholder='Nome do projeto...'
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

  listarTipo = () => {

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
            empresa_id: this.state.empresa_id,
            ativo: 'SIM',
          })
    
      })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          tipo:res.row,
          visible2: true  
    
        })
        //console.log(res.row)  
          //Alert.alert(res.)
        
      })
    
    }



cadastrar = () => {

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
        projeto_id: this.state.projeto_id,

        descricao: this.state.descricao,
        area_id: this.state.area_id,
        tipo_id: this.state.tipo_id,
        empresa_id:  this.state.empresa_id
      })
  })
  .then((response) => response.json())
  .then((res) => {

    if(res.sucess===true){
       Alert.alert(res.message)
       let change = 'sim';//tirar change
       this.props.navigation.navigate('Projeto', change)
    }else{
      Alert.alert(res.message)
    }
  })
}
}
