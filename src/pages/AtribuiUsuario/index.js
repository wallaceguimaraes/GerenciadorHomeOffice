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
import {Card} from 'react-native-shadow-cards';


export default class AtribuiUsu extends React.Component {

constructor(props){

  super(props);
   
  this.state = { 
    projeto_id: 0,
    usuarioDesc: '', 
    usuario_id: 0,
    botao: "Cadastrar",
    empresa_id: 0,    
    ativo:'',
    projeto: [],
    usuarioProjeto: [],
    usuario: [],
    area_selecionada: '',
    tipo_selecionado: '',
    visible1: false,
    visible2: false,
    texto:''
  } 
  this.arrayholder = [];


}




componentDidMount = async () =>{

    if(this.props.route.params){
        this.setState({
                      projeto_id: await this.props.route.params.projeto_id,
                      area_id: this.props.route.params.area_id,
                      //tipo_id: this.props.route.params.item.tipo_id,
                          
                    })
      }

//Alert.alert(JSON.stringify(this.props.route.params.projeto_id))
  //Verificar se empresa_id e 0
  this.setState({ empresa_id: await AsyncStorage.getItem('empresa_id') });
  
  //this.setState({ area_id: await AsyncStorage.getItem('area_id') });
  //this.setState({ tipo_id: await AsyncStorage.getItem('tipo_id') });
  this.listarUsuario()
  this.listarUsuarioProjeto()  

  



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



setar = async (Item) =>{
    


    this.setState({usuarioDesc: Item.item.nome})
    this.setState({usuario_id: await Item.item.usuario_id})

  if(Item.item.projeto_id){  
    //  Alert.alert(JSON.stringify(projeto.item.area_id))
//Exclui usuario
this.confirma_excluir(Item)

}else{
//vincular usuario

this.atribuiUsuario()


//Alert.alert("ID: "+JSON.stringify(Item.item.usuario_id))
}
 
  //Alert.alert(JSON.stringify(this.state.empresa_id))

}


confirma_excluir(item){
    Alert.alert('Excluir usuário do projeto', 'Deseja retirar o usuário "'+item.item.nome+'" desse projeto?', [
       {
           text: 'Sim',
           onPress: () => this.excluir(item)        
       },
       {
           text: 'Não'
       }
   ])
   
   }



excluir = (item) => {
    const url = 'http://projetofaculdade.herokuapp.com/atribuiProjetoCad';
    fetch(url, {
        method: 'POST',
          headers: {
             'Accept': 'application/json', 
             'Content-Type': 'application/json',
             'Access-Control-Allow-Origin': 'http://projetofaculdade.herokuapp.com/atribuiProjetoCad',
              'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
          usuario_id: item.item.usuario_id,
          projeto_id: this.state.projeto_id, 
          ativo: 'NÃO'
        })
    })
    .then((res) => res.json())
    .then((res) => {  
      if(res.sucess===true){
        Alert.alert(res.message)
        this.listarUsuario()
        this.listarUsuarioProjeto()        
      }
    })
  }





  getActions(item){

//Alert.alert(JSON.stringify(area.item.descricao))

    return (
        <>{item.item.projeto_id ?  
            <Button 
                onPress={() => this.confirma_excluir(item)}
                type="clear"
                icon={ <Icon name="delete" size={25} color="red" /> }
            />
        :
            <Button 
                onPress={() => this.setar(item)}
                type="clear"
                icon={ <Icon name="check" size={25} color="green" /> }
            />
  }
            </>

    )
}


  keyExtractor = (item, index) => index.toString()

  renderItens = ({item}) => {
    return(
    <ListItem bottomDivider 
    rightElement={this.getActions({item})}     
    title={item.nome}
    subtitle={"Login: "+item.login+"\nÁrea: "+item.area_desc}
    />
    )}

    


render(){
//var item =''
//Alert.alert(JSON.stringify(this.state.area))
    return(

<KeyboardAwareScrollView style={styles.container}>
<View>

<TextInput
style={styles.textInput} placeholder='Buscar usuário...'
onChangeText={texto => this.searchFilterFunction(texto)}
underlineColorAndroid='transparent'

value={this.state.texto}
/>   



<ShimmerPlaceholder
style={{}}
autorun={true}
visible={this.state.visible1}>
<View style={{alignItems:'center'}}>
<Text style={{fontWeight:"bold", marginTop: 2, fontSize: 16, color: '#fff'}}>Selecionar usuário:</Text>
<Card style={{flex:1}}>
<FlatList style={styles.flat} 
      contentContainerStyle={{ borderRadius:5, overflow: 'hidden'}}
      keyExtractor={this.keyExtractor}
      data={this.state.usuario}
      renderItem={this.renderItens}
    />
    </Card>
    </View>
</ShimmerPlaceholder>




<ShimmerPlaceholder
style={{}}
autorun={true}
visible={this.state.visible2}>

<View style={{alignItems:'center'}}>
<Text style={{fontWeight:"bold",marginTop:10, fontSize: 16, color: '#fff'}}>Usuários participantes no projeto:</Text>
<Card style={{padding:5}}>
<FlatList style={styles.flat} 
      contentContainerStyle={{ borderRadius:5, overflow: 'hidden'}}
      keyExtractor={this.keyExtractor}
      data={this.state.usuarioProjeto}
      renderItem={this.renderItens}
    />
    </Card>
    </View>
</ShimmerPlaceholder>



 </View>
 </KeyboardAwareScrollView>

  )
}

listarUsuario = () => {
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
          empresa_id: this.state.empresa_id,
          ativo: 'SIM',
          projeto_id: this.state.projeto_id,
          filtro: 'SIM'
        })
  
    })
    .then((res) => res.json())
    .then((res) => {
      this.setState({
        usuario:res.row,
        visible1: true  
      })
      this.arrayholder = res.row;      

      //Alert.alert(JSON.stringify(this.state.area))

    })
  }

  listarUsuarioProjeto = () => {

    this.setState({visible: false})  
    //const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    console.disableYellowBox = true;//Escondendo warningss
    
    const url = 'http://projetofaculdade.herokuapp.com/usuarioProjeto';
      fetch(url, {
          method: 'POST',
            headers: {
               'Accept': 'application/json', 
               'Content-Type': 'application/json',
               'Access-Control-Allow-Origin': 'http://projetofaculdade.herokuapp.com/usuarioProjeto',
                'Access-Control-Allow-Credentials': true,
          },
          body: JSON.stringify({
            empresa_id: this.state.empresa_id,
            projeto_id: this.state.projeto_id,
            ativo: 'SIM',
          })
    
      })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          usuarioProjeto:res.row,
          visible2: true  
    
        })
        //console.log(res.row)  
          //Alert.alert(res.)
        
      })
    
    }



atribuiUsuario = () => {

const url = 'http://projetofaculdade.herokuapp.com/atribuiProjetoCad';
  fetch(url, {
      method: 'POST',
        headers: {
           'Accept': 'application/json', 
           'Content-Type': 'application/json',
           'Access-Control-Allow-Origin': 'http://projetofaculdade.herokuapp.com/atribuiProjetoCad',
            'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        projeto_id: this.state.projeto_id,
        usuario_id: this.state.usuario_id,
        ativo:'SIM'
      })
  })
  .then((response) => response.json())
  .then((res) => {

    if(res.sucess===true){
       Alert.alert(res.message)
       let change = 'sim';//tirar change
       //this.props.navigation.navigate('Projeto', change)
       this.listarUsuario()
       this.listarUsuarioProjeto()
    }else{
      Alert.alert(res.message)
    }
  })
}
}
