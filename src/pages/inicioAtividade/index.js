import React from 'react';
import {  StyleSheet, 
          Text, 
          View,
          TextInput, 
          KeyboardAvoidingView, 
          TouchableOpacity, 
          Alert, FlatList,Image,ScrollView} from 'react-native';
//import {RNPickerSelect} from 'react-native-picker-select'
import   DropDownPicker   from 'react-native-dropdown-picker'  
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styles'
import AsyncStorage from '@react-native-community/async-storage';   
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';       
import ShimmerPlaceholder from 'react-native-shimmer-placeholder'
import { Avatar, Button, Icon, ListItem } from 'react-native-elements';
import {Card} from 'react-native-shadow-cards';
import { LineChart } from 'react-native-svg-charts';
//import BackgroundTimer from 'react-native-background-timer';



export default class InicioAtividade extends React.Component {

constructor(props){

  super(props);
   
  this.state = { 
     crono:'', 
     crono2:'', 
    situacaoAtividade: '',
    situacaoEtapa:'',  
    dia_id: 0,
    intervalo_id: 0,
    botao: "Cadastrar",
    empresa_id: 0,  
    etapa_id: 0,  
    descricao:'',
    intervalo: [],
    dia: [],
    visible1: false,
    visible2: false,
    hoje:'',
    data:'',
    play:'nao',
    pause:'nao',
    retorno:'nao',
    continue:'nao',
    listaDia: 'nao',
    listaIntervalo: 'nao',
    etapa_id:0,
    horas:0,
    minutos:0,
    segundos:0,
    horas1:0,
    minutos1:0,
    segundos1:0,
    inicio: '--:--',
    playini: 'nao',
    tempo:0

  } 
}


componentDidMount = async () =>{

 const data = new Date()
 const Data = data.getDate().toString()
 var valor = Data.length   
 var Data2=Data
 if(valor==1){
    Data2="0"+Data
 }

//Alert.alert(JSON.stringify(this.props.route.params.etapa_id))

this.setState({inicio: this.props.route.params.formatada})

 this.setState({etapa_id:this.props.route.params.etapa_id,
etapa_id:this.props.route.params.etapa_id, situacaoEtapa:this.props.route.params.situacao})

 const formatada = (""+Data2+"/"+(data.getMonth()+1)+"/"+data.getFullYear()).toString()
 
 

 if(this.props.route.params.situacao==='INTERVALO'){
  this.setState({play: 'nao', pause: 'nao', retorno: 'sim' })

 }
 
 if(this.props.route.params.situacao==='ANDAMENTO'){
  this.setState({play: 'nao', pause: 'sim', retorno: 'nao' })
 }

 if(this.props.route.params.situacao==='CONCLUÍDA'){
  this.setState({play: 'nao', pause: 'nao', retorno: 'nao' })
 }
    
  //Verificar se empresa_id e 0
  this.setState({ empresa_id: await AsyncStorage.getItem('empresa_id'),
                  hoje: formatada,
                  data: this.props.route.params.parcial});
  
  this.listarDia()
  this.listarIntervalo()  

 if(this.state.data===this.state.hoje){
   // Alert.alert(this.state.data)

}else{
 
  this.setState({listaDia: 'sim'})

 } 
 
  if(this.props.route.params){
    this.setState({botao: "Atualizar",
                  dia_id: this.props.route.params.item.area_id,
                  intervalo_id: this.props.route.params.item.tipo_id,
                  descricao: this.props.route.params.item.descricao,    
                })
         }
  }


setar(Item){


  if(Item.item.dia_id){  
//  Alert.alert(JSON.stringify(projeto.item.area_id))
this.setState({dia_selecionado: Item.item.descricao})
this.setState({dia_id: Item.item.dia_id, listaDia: 'nao', play: 'sim'})
this.setState({play: 'sim', pause: 'nao', retorno: 'nao' })


Alert.alert(JSON.stringify("Hoje é "+Item.item.descricao))

}else{
    this.setState({intervalo_selecionado: Item.item.descricao})
    this.setState({intervalo_id: Item.item.intervalo_id, listaIntervalo: 'nao' })
    Alert.alert(JSON.stringify("Intervalo para "+Item.item.descricao))

    this.setState({play: 'nao', pause: 'nao', retorno: 'sim' })

    this.state.crono2 = setInterval(() => {

        if(this.state.retorno==='sim'){
        this.setState({ segundos1: this.state.segundos1 + 1 });
        if(this.state.segundos1==60){
            this.setState({minutos1: this.state.minutos1+1, segundos1: 0})
        } 
        if(this.state.minutos1==60){
            this.setState({minutos1: this.state.horas1+1,minutos1:0, segundos1: 0})
        } 
    }
    }, 1000)
    
    



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

{this.state.listaDia==='sim'?
<ShimmerPlaceholder
style={{}}
autorun={true}
visible={this.state.visible1}>
  <View style={{alignItems:'center'}}>
  <Text style={{fontWeight:"bold", marginTop: 2, fontSize: 18, color: '#fff'}}>Que dia é hoje?</Text>

 <Card style={styles.cardSecundario}>
<FlatList style={styles.flat} 
      contentContainerStyle={{ borderRadius:5, overflow: 'hidden'}}
      keyExtractor={this.keyExtractor}
      data={this.state.dia}
      renderItem={this.renderItens}
    />
    </Card>
    </View> 
</ShimmerPlaceholder>:null
}

<View style={{alignItems:'center'}}>
<Card style={styles.cardPrimario}>
<Text style={{fontWeight:'bold', fontSize:18}} >{this.props.route.params.descricao}</Text>

<View style={{flexDirection:'row', justifyContent:'space-between'}}>

{this.state.situacaoEtapa==='ABERTA'?<Text style={{color:'brown',marginTop:10}}>{"Situação: "+this.state.situacaoEtapa}</Text>:null}
{this.state.situacaoEtapa==='ANDAMENTO'?<Text style={{color:'#00BFFF',marginTop:10}}>{"Situação: "+this.state.situacaoEtapa}</Text>:null}
{this.state.situacaoEtapa==='INTERVALO'?<Text style={{color:'yellow',marginTop:10}}>{"Situação: "+this.state.situacaoEtapa}</Text>:null}
{this.state.situacaoEtapa==='CONCLUÍDA'?<Text style={{color:'green',marginTop:10}}>{"Situação: "+this.state.situacaoEtapa}</Text>:null}




{this.state.play==='sim'?
<TouchableOpacity
         onPress={()=> this.iniciarAtividade()}
         style={{paddingBottom: 20, textAlign: "center",marginTop:5 }} ><Image style={{marginLeft: 15, width: 30, height: 30}}
source={require('../../assets/icons8-play-64.png')}
/>
</TouchableOpacity>:null
}
{this.state.pause==='sim'?
<TouchableOpacity
         onPress={()=> this.pausarAtividade()}
         style={{paddingBottom: 20, textAlign: "center",marginTop:5 }} ><Image style={{marginLeft: 15, width: 30, height: 30}}
source={require('../../assets/icons8-pause-64.png')}
/>
</TouchableOpacity>:null}

{this.state.continue==='sim'?
<TouchableOpacity
         onPress={()=> this.continuarAtividade()}
         style={{paddingBottom: 20, textAlign: "center",marginTop:5 }} ><Image style={{marginLeft: 15, width: 30, height: 30}}
source={require('../../assets/icons8-next-page-48.png')}
/>
</TouchableOpacity>:null}

{this.state.retorno==='sim'?
<TouchableOpacity
         onPress={()=> this.retornarAtividade()}
         style={{paddingBottom: 20, textAlign: "center",marginTop:5 }} ><Image style={{marginLeft: 15, width: 30, height: 30}}
source={require('../../assets/icons8-rollback-48.png')}
/>
</TouchableOpacity>:null}
</View>
<Text style={{fontWeight:'bold',marginTop:5, fontSize:14}} >{"Início: "+this.state.inicio}</Text>
<View style={{flexDirection:'row'}}>

<Text style={{fontWeight:'bold',marginTop:5, fontSize:14, color:'red'}} >{"Tempo gasto: "}</Text>

<Text style={{fontWeight:'bold',marginTop:5}}>{this.state.horas+"h:"+this.state.minutos+"m:"+this.state.segundos+"s"}</Text>

</View>
<View style={{flexDirection:'row'}}>

<Text style={{fontWeight:'bold',marginTop:5, fontSize:14, color:'red'}} >{"Tempo intervalo: "}</Text>

<Text style={{fontWeight:'bold',marginTop:5}}>{this.state.horas1+"h:"+this.state.minutos1+"m:"+this.state.segundos1+"s"}</Text>

</View>

</Card>
</View>

{this.state.listaIntervalo==='sim'?
<ShimmerPlaceholder
style={{}}
autorun={true}
visible={this.state.visible2}>

<View style={{alignItems:'center'}}>
<Text style={{fontWeight:"bold", fontSize: 16, color: '#fff'}}>Intervalo:</Text>

<Card style={styles.cardSecundario}>
<FlatList style={styles.flat} 
      contentContainerStyle={{ borderRadius:5, overflow: 'hidden'}}
      keyExtractor={this.keyExtractor}
      data={this.state.intervalo}
      renderItem={this.renderItens}
    />
</Card>
</View>
</ShimmerPlaceholder>:null
}

</View>
 
 </KeyboardAwareScrollView>

  )
}

listarDia = () => {
  this.setState({visible1: false})  

  //const proxyurl = 'https://cors-anywhere.herokuapp.com/';
  console.disableYellowBox = true;//Escondendo warningss
  
  const url = 'http://projetofaculdade.herokuapp.com/dia';
    fetch(url, {
        method: 'POST',
          headers: {
             'Accept': 'application/json', 
             'Content-Type': 'application/json',
             'Access-Control-Allow-Origin': 'http://projetofaculdade.herokuapp.com/dia',
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
        dia:res.row,
        visible1: true  
      })
      //Alert.alert(JSON.stringify(this.state.area))

    })
  }

  listarIntervalo = () => {

    this.setState({visible2: false})  
    //const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    console.disableYellowBox = true;//Escondendo warningss
    
    const url = 'http://projetofaculdade.herokuapp.com/intervalo';
      fetch(url, {
          method: 'POST',
            headers: {
               'Accept': 'application/json', 
               'Content-Type': 'application/json',
               'Access-Control-Allow-Origin': 'http://projetofaculdade.herokuapp.com/intervalo',
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
          intervalo:res.row,
          visible2: true  
    
        })
        //console.log(res.row)  
          //Alert.alert(res.)
        
      })
    
    }


iniciarAtividade(){
  this.state.playini='sim'
    const data = new Date()
    let data2 = new Date(data.valueOf() - data.getTimezoneOffset() * 60000)
//Alert.alert(JSON.stringify(this.state.dia_id))
//colocar hora inicial na tabela atividade e tabela dia_trabalho_atv
    this.state.crono = setInterval(() => {
        if(this.state.playini==='sim'){
        this.setState({ segundos: this.state.segundos + 1 });
        if(this.state.segundos==60){
            this.setState({minutos: this.state.minutos+1, segundos: 0})
        } 
        if(this.state.minutos==60){
            this.setState({minutos: this.state.horas+1,minutos:0, segundos: 0})
        } 

        this.setState({tempo: this.state.tempo + 1})
    }
    }, 1000)
    

this.setState({inicio: data2.getDate()+"/"+data2.getMonth()+"/"+data2.getFullYear()+""})    

this.setState({play: 'nao', pause: 'sim'})

const hora = data.getHours()+":"+data.getMinutes()+":"+data.getSeconds()

const url = 'http://projetofaculdade.herokuapp.com/inicioAtividadeCad';
  fetch(url, {
      method: 'POST',
        headers: {
           'Accept': 'application/json', 
           'Content-Type': 'application/json',
           'Access-Control-Allow-Origin': 'http://projetofaculdade.herokuapp.com/inicioAtividadeCad',
            'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        atividade_id: this.state.atividade_id,
        data_inicial: data2,
        dia_id: this.state.dia_id,
        etapa_id: this.state.etapa_id,
        situacaoAtividade: 'ANDAMENTO',
        situacaoEtapa: 'ANDAMENTO',
        hora: hora
      })
  })
  .then((response) => response.json())
  .then((res) => {

    if(res.sucess===true){
       this.setState({situacaoEtapa: 'ANDAMENTO'}) 
       Alert.alert(res.message)
    }else{
      Alert.alert(res.message)
    }
  })


}

finalizarEtapa(){
    //finaliza etapa e caso todas etapas estejam concluidas a atividade sera concluida com o tempo calculado

}








pausarAtividade(){

  //pausa tempo atividade e conta tempo de intervalo

  this.setState({listaIntervalo:'sim', playini: 'nao'})


    this.state.crono





    
    const data = new Date()

    
    let hora = data.getHours()-this.state.horas 
    let minutos =data.getMinutes()-this.state.minutos
    let segundos =data.getSeconds()-this.state.segundos
/*
Alert.alert(JSON.stringify("data"+data.getSeconds()))
Alert.alert("menos"+JSON.stringify(this.state.segundos))
Alert.alert(JSON.stringify(segundos))
    if(minutos<0){
        
    }

    if(segundos<0){

    }

*/

    const url = 'http://projetofaculdade.herokuapp.com/tempoAtividade';
    fetch(url, {
        method: 'POST',
          headers: {
             'Accept': 'application/json', 
             'Content-Type': 'application/json',
             'Access-Control-Allow-Origin': 'http://projetofaculdade.herokuapp.com/tempoAtividade',
              'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
          etapa_id: this.state.etapa_id,
          tempo: this.state.tempo
      
        })
    })
    .then((response) => response.json())
    .then((res) => {

    })
  
  



}


 

retornarAtividade(){
  this.setState({play: 'nao', pause: 'sim', retorno: 'nao',listaIntervalo: 'nao', playini:'sim' })
  //Contar tempo novamente
  
  Alert.alert("Atividade retornada!")
  
  this.state.crono



}


cadastrar = () => {


}
}


























//Para o temporizador e limpa as variáveis
/*
function stop() {
    
    document.getElementById('counter').innerText = '00:00:00';
}
*/
//Faz a contagem do tempo e exibição
