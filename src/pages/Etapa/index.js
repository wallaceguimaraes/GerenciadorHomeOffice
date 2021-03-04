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


export default class MinhaAtividade extends Component {

constructor(props){
  super(props);
  this.state = { etapa:[],
                 atividade_id: 0,
                 etapa_id:0,
                 atualiza: 1,
                 prev: 1,
                 visible: false,
                 texto: '',
                 total: 0,
                 concluido:0,
                 visivel: false,
                 descricao:''
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
  
if(this.props.route.params){
    this.setState({
        atividade_id:await this.props.route.params.atividade.atividade_id
     }) 
}



 this.listar()


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
  
  this.setState({ etapa: newData });  
};



excluir = (etapa) => {
    //Alert.alert(etapa.etapa_id)

    const url = 'http://projetofaculdade.herokuapp.com/etapaCad';
    fetch(url, {
        method: 'POST',
          headers: {
             'Accept': 'application/json', 
             'Content-Type': 'application/json',
             'Access-Control-Allow-Origin': 'http://projetofaculdade.herokuapp.com/etapaCad',
              'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
          etapa_id: etapa.etapa_id,
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
  


confirma_excluir(etapa){
    Alert.alert('Excluir Dia ', 'Deseja excluir o dia "'+etapa.descricao+'"?', [
       {
           text: 'Sim',
           onPress: () => this.excluir(etapa)
       },
       {
           text: 'Não'
       }
   ])
   }



teste = async(item)=>{

 //Alert.alert(JSON.stringify( item.formatada))   
 //let data2 = new Date(data.valueOf() - data.getTimezoneOffset() * 60000)
// Alert.alert(JSON.stringify(formatada))

}
    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
    <View style={{alignItems:'center'}}>
    <Card style={styles.card}  >
        <View style={{}}  >
          {this.state.visivel ? (<Text>Olá</Text>): null}
            <Text style={{ fontWeight:'bold'}} >{"Descrição: "+item.descricao}</Text>
            {item.situacao==='ABERTA'?<Text style={{marginTop:10,color:'brown'}}>{"Situação: "+item.situacao}</Text>:null}
            {item.situacao==='ANDAMENTO'?<Text style={{marginTop:10,color:'#00BFFF'}}>{"Situação: "+item.situacao}</Text>:null}
            {item.situacao==='CONCLUÍDA'?<Text style={{marginTop:10,color:'green'}}>{"Situação: "+item.situacao}</Text>:null}

        </View>
        <View style={{flexDirection:'row', flex:1, alignItems: 'center', alignSelf:'flex-end' }}>
          <View style={{flex: 1}} >

          {item.situacao==='CONCLUÍDO'?null:(
          <TouchableOpacity onPress={()=> this.props.navigation.navigate('InicioAtividade',item)} style={{marginTop:15, height:45, width:150, padding:5, alignItems:'center', marginRight:10, backgroundColor:'#FD5979',borderColor:'#00BFFF', borderRadius:10}}>
            <Text style={{color:'#fff', margin:5, fontWeight:'bold'}} >Entrar</Text>
          </TouchableOpacity>
            )}            
          </View>

        
          <Button 
                onPress={() => this.props.navigation.navigate('EtapaForm',item)}
                type="clear"
                icon={ <Icon name="edit" size={25} color="orange" /> }
            />
          <Button 
                onPress={() => this.confirma_excluir(item)}
                type="clear"
                icon={ <Icon name="delete" size={25} color="red" /> }
            />    
        
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
<View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
<TextInput
style={{flex: 1, backgroundColor:'#fff', paddingLeft: 15, borderRadius:5,marginBottom: 10,  marginTop: 10 }} placeholder='Cadastrar etapa...'
onChangeText={etapaDesc => this.setState({descricao: etapaDesc})}
underlineColorAndroid='transparent'
value={this.state.descricao}
/>

<TouchableOpacity onPress={()=> this.cadastrar()} style={{marginBottom: 10,  marginTop: 10,marginLeft: 15, height:45, width:40, alignItems:'center', backgroundColor:'#FD5979',borderColor:'#00BFFF',justifyContent:'center', borderRadius:10, flex:1}}>
            <Text style={{color:'#fff', margin:5, fontWeight:'bold'}} >Salvar</Text>
          </TouchableOpacity> 
</View>
<TextInput
style={styles.textInput} placeholder='Buscar etapa...'
onChangeText={texto => this.searchFilterFunction(texto)}
underlineColorAndroid='transparent'

value={this.state.texto}
/>

<Card style={{backgroundColor:'#00BEEE'}}>

<FlatList style={styles.flatList} 
      keyExtractor={this.keyExtractor}
      
      data={this.state.etapa}
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


cadastrar(){

//Alert.alert(JSON.stringify(this.state.descricao))



    const url = 'http://projetofaculdade.herokuapp.com/etapaCad';
    fetch(url, {
        method: 'POST',
          headers: {
             'Accept': 'application/json', 
             'Content-Type': 'application/json',
             'Access-Control-Allow-Origin': 'http://projetofaculdade.herokuapp.com/etapaCad',
              'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
          etapa_id: this.state.etapa_id,  
          descricao: this.state.descricao,
          atividade_id: this.state.atividade_id
        })
  
    })
    .then((response) => response.json())
    .then((res) => {
      //Alert.alert(res.message)
      
      if(res.sucess===true){
          Alert.alert(res.message)
         // AsyncStorage.setItem('usuario', res.usuario)
         //let change = 'sim';
        //this.props.navigation.navigate('Etapa', change)
    this.listar()  
    }else{
        Alert.alert(res.message)
      }
  
    })
    




}


iniciar(){

}




vincularUsuarioAtividade(item){

//Alert.alert(JSON.stringify(item.atividade_id))

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
        
        usuario_id: this.state.usuario_id
      })

  })
  .then((res) => res.json())
  .then((res) => {
  
if(res.sucess!==false){

  alert(JSON.stringify(res.message))
  this.props.navigation.navigate('')

}else{
  alert(JSON.stringify(res.meessage))

}


    this.arrayholder = res.row; 
    //Alert.alert(JSON.stringify(this.arrayholder[0].atividade_total))
  })











  
}


listar(){
    console.disableYellowBox = true;//Escondendo warningss
    
    const url = 'http://projetofaculdade.herokuapp.com/etapa';
      fetch(url, {
          method: 'POST',
            headers: {
               'Accept': 'application/json', 
               'Content-Type': 'application/json',
               'Access-Control-Allow-Origin': 'http://projetofaculdade.herokuapp.com/etapa',
                'Access-Control-Allow-Credentials': true,
          },
          body: JSON.stringify({
            atividade_id: this.state.atividade_id
          })
    
      })
      .then((res) => res.json())
      .then((res) => {

       
        this.setState({
            etapa:res.row,
            visible: true  
          })
    
    
        this.arrayholder = res.row; 
        //Alert.alert(JSON.stringify(this.arrayholder[0].atividade_total))
    })
    
    }
    


}



