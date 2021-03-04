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


export default class AtividadesProjeto extends Component {

constructor(props){
  super(props);
  this.state = { atividade:[],
                 usuario_id: 0,
                 projeto_id: 0,
                 empresa_id: 0,
                 atualiza: 1,
                 prev: 1,
                 visible: false,
                 texto: '',
                 total: 0,
                 concluido:0,
                 visivel: false,
                 change: 'SIM'
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
  
//let id = this.props.route.params.
this.setState({projeto_id:this.props.route.params.projeto.projeto_id,
               usuario_id:this.props.route.params.usuario_id}) 

//Alert.alert(this.props.route.params.usuario_id)

await this.listar()


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
  
  this.setState({ atividade: newData });  
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
            <Text style={{color:'green'}}>{"Início: "+item.iniciado}</Text>
            <Text style={{color:'red'}}>{"Fim:    "+item.finalizado}</Text>
            {item.situacao==='ABERTO'?<Text style={{color:'brown'}}>{"Situação: "+item.situacao}</Text>:null}
            {item.situacao==='ANDAMENTO'?<Text style={{color:'#00BFFF'}}>{"Situação: "+item.situacao}</Text>:null}
            {item.situacao==='CONCLUÍDO'?<Text style={{color:'green'}}>{"Situação: "+item.situacao}</Text>:null}

        </View>

        
        <View style={{flexDirection:'row', flex:1, alignItems: 'center', alignSelf:'flex-end' }}>
          <View style={{flex: 1}} >

          {item.situacao==='CONCLUÍDO'?null:(
          <TouchableOpacity onPress={()=> this.vincularUsuarioAtividade(item)} style={{marginTop:15, height:45, width:150, padding:5, alignItems:'center', marginRight:10, backgroundColor:'#FD5979',borderColor:'#00BFFF', borderRadius:10}}>
            <Text style={{color:'#fff', margin:5, fontWeight:'bold'}} >Assumir atividade</Text>
          </TouchableOpacity>
            )}            
          </View>
          
          {item.etapa_total===0?(<Text style={{fontWeight:'700',fontStyle:'italic', color:'green'}}>0%</Text>) :
           (<Text style={{fontWeight:'700',fontStyle:'italic', color:'green'}}>{((item.etapa_concluida*100)/item.etapa_total).toFixed(2)+"%"}</Text>)}
            
        <ProgressCircle style={{ marginLeft:15, height: 40, width: 40 }} progress={((item.etapa_concluida*100)/item.etapa_total)/100} progressColor={'rgb(50, 205, 50)'} />
        
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


<View style={{backgroundColor:'#00BFFF', alignItems:'center',paddingLeft:19,paddingRight:19}} >

<TextInput
style={styles.textInput} placeholder='Buscar atividade...'
onChangeText={texto => this.searchFilterFunction(texto)}
underlineColorAndroid='transparent'

value={this.state.texto}
/>

<Card style={{backgroundColor:'#00BEEE'}}>

<FlatList style={styles.flatList} 
      keyExtractor={this.keyExtractor}
      
      data={this.state.atividade}
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




vincularUsuarioAtividade = (item) => {

//Alert.alert(item.atividade_id)
//Alert.alert(this.state.usuario_id)


console.disableYellowBox = true;//Escondendo warningss

const url = 'http://projetofaculdade.herokuapp.com/vinculaAtividade';
  fetch(url, {
      method: 'POST',
        headers: {
           'Accept': 'application/json', 
           'Content-Type': 'application/json',
           'Access-Control-Allow-Origin': 'http://projetofaculdade.herokuapp.com/vinculaAtividade',
            'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        //area_id: this.state.area_id,
        atividade_id: item.atividade_id,
        usuario_id:  this.state.usuario_id
      })

  })
  .then((res) => res.json())
  .then((res) => {

if(res.sucess!==false){

  Alert.alert(JSON.stringify(res.message))
  this.props.navigation.navigate('MinhaAtividade',{change: this.state.change})

}else{
  alert(JSON.stringify(res.message))

}
    this.arrayholder = res.row; 
    //Alert.alert(JSON.stringify(this.arrayholder[0].atividade_total))
  })



  
}


listar = () => {
this.setState({visible: false})
  //const proxyurl = 'https://cors-anywhere.herokuapp.com/';
console.disableYellowBox = true;//Escondendo warningss

const url = 'http://projetofaculdade.herokuapp.com/atribuiAtividade';
  fetch(url, {
      method: 'POST',
        headers: {
           'Accept': 'application/json', 
           'Content-Type': 'application/json',
           'Access-Control-Allow-Origin': 'http://projetofaculdade.herokuapp.com/atribuiAtividade',
            'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        //area_id: this.state.area_id,
        projeto_id: this.state.projeto_id
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
    this.arrayholder = res.row; 
    //Alert.alert(JSON.stringify(this.arrayholder[0].atividade_total))
  })
}
}



