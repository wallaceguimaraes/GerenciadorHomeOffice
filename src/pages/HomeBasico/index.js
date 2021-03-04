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
import {Card} from 'react-native-shadow-cards';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { ProgressCircle } from 'react-native-svg-charts'


export default class HomeBasico extends Component {

constructor(props){
  super(props);
  this.state = { projeto:[],
                 area_id: 0,
                 empresa_id: 0,
                 tipo_id:0,
                 atualiza: 1,
                 prev: 1,
                 visible: false,
                 texto: '',
                 total: 0,
                 concluido:0,
                 visivel: false
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
await this.listar()

//Alert.alert(JSON.stringify(this.arrayholder))


}
atualizarTela(){
  this.listar()
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


teste(item){
Alert.alert(JSON.stringify(item))
}


    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
    <View style={{alignItems:'center'}}>
    <Card style={styles.card}  >
        <View style={{}}  >
          {this.state.visivel ? (<Text>Olá</Text>): null}
            <Text style={{fontWeight:'bold'}} >{item.descricao}</Text>
            <Text style={{fontWeight:'100', fontStyle:'italic'}} >{"Tipo: "+item.tipo_desc}</Text>
            <Text style={{color:'green'}}>{"Início: "+item.iniciado}</Text>
            <Text style={{color:'red'}}>{"Fim:    "+item.fim_projeto}</Text>
            {item.situacao==='ABERTO'?<Text style={{color:'brown'}}>{"Situação: "+item.situacao}</Text>:null}
            {item.situacao==='ANDAMENTO'?<Text style={{color:'#00BFFF'}}>{"Situação: "+item.situacao}</Text>:null}
            {item.situacao==='CONCLUÍDO'?<Text style={{color:'green'}}>{"Situação: "+item.situacao}</Text>:null}

        </View>
        <View style={{flexDirection:'row', flex:1, alignItems: 'center', alignSelf:'flex-end' }}>
          <View style={{flex: 1}} >

      
            
          </View>
          
            <Text style={{fontWeight:'700',fontStyle:'italic', color:'green'}}>{((item.atividade_concluida*100)/item.atividade_total).toFixed(2)+"%"}</Text>
        <ProgressCircle style={{ marginLeft:15, height: 40, width: 40 }} progress={((item.atividade_concluida*100)/item.atividade_total)/100} progressColor={'rgb(50, 205, 50)'} />
        </View>
    </Card>
      


      


    </View>

    )


render(){
  return(

<ShimmerPlaceholder
autorun={true}
style={{backgroundColor:'#00BFFF', flex: 4}}
visible={this.state.visible}
>    


<View style={{backgroundColor:'#00BFFF', alignItems:'center', paddingRight:20,paddingLeft:20}} >

<Text style={{color:'#fff', fontWeight:'bold', fontSize:18, margin:10}} >Projetos</Text>

<TextInput
style={styles.textInput} placeholder='Buscar projeto...'
onChangeText={texto => this.searchFilterFunction(texto)}
underlineColorAndroid='transparent'

value={this.state.texto}
/>

<Card style={{backgroundColor:'#00BEEE'}}>

<FlatList style={styles.flatList} 
      keyExtractor={this.keyExtractor}
      
      data={this.state.projeto}
      renderItem={this.renderItem}
    
    
    />
</Card>

<TouchableOpacity onPress={()=> this.atualizarTela()} style={{marginTop:15, height:45, width:150, padding:5, alignItems:'center', marginRight:10, backgroundColor:'#FD5979',borderColor:'#00BFFF', borderRadius:10}}>
            <Text style={{color:'#fff', margin:5, fontWeight:'bold'}} >Atualizar</Text>
          </TouchableOpacity>       
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

const url = 'http://projetofaculdade.herokuapp.com/atribuiProjeto';
  fetch(url, {
      method: 'POST',
        headers: {
           'Accept': 'application/json', 
           'Content-Type': 'application/json',
           'Access-Control-Allow-Origin': 'http://projetofaculdade.herokuapp.com/atribuiProjeto',
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
    //Alert.alert(JSON.stringify(this.arrayholder[0].atividade_total))
  })
}
}



