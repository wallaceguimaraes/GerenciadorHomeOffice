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
//import {Picker} from '@react-native-community/picker'   
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from './styles'
import AsyncStorage from '@react-native-community/async-storage';   
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';       
import ShimmerPlaceholder from 'react-native-shimmer-placeholder'
import { Avatar, Button, Icon, ListItem } from 'react-native-elements';


export default class CargoForm extends React.Component {

constructor(props){

  super(props);
   
  this.state = { 
    cargo_id: 0,
    areaDesc: '', 
    area_id: 0,
    botao: "Cadastrar",
    empresa_id: 0,    
    descricao:'',
    area: [],
    area_selecionada: '',
    lingua: 'algo',
    visible: false
  } 


}

componentDidMount = async () =>{
  this.setState({ empresa_id: await AsyncStorage.getItem('empresa_id') });

  this.listarArea()


  


  if(this.props.route.params){
    this.setState({botao: "Atualizar",
                  cargo_id: this.props.route.params.item.cargo_id,
                  area_id: this.props.route.params.item.area_id,
                  descricao: this.props.route.params.item.descricao,    
                })
  }
  }


setarArea(area){

  this.setState({areaDesc: area.item.descricao})
  this.setState({area_id: area.item.area_id})

 // Alert.alert(JSON.stringify(area.item.area_id))
}


  getActions(area){

//Alert.alert(JSON.stringify(area.item.descricao))

    return (
        <>
            <Button 
                onPress={() => this.setarArea(area)}
                type="clear"
                icon={ <Icon name="check" size={25} color="green" /> }
            />
        
        </>

    )
}

  keyExtractor = (item, index) => index.toString()

  renderItem = ({item}) => {

   // Alert.alert(JSON.stringify(item))
    

    return(
    <ListItem bottomDivider 
    rightElement={this.getActions({item})}     
    title={item.descricao}
        
    />
  
    )

  }

render(){
//var item =''
//Alert.alert(JSON.stringify(this.state.area))

    return(

<KeyboardAwareScrollView style={styles.container}>
<View   >

<Text style={{fontWeight:"bold", fontSize: 16, color: '#fff'}}>Selecione a área:</Text>

<ShimmerPlaceholder
style={{}}
autorun={true}
visible={this.state.visible}>

<FlatList style={styles.flat} 
      contentContainerStyle={{ borderRadius:5, overflow: 'hidden'}}
      keyExtractor={this.keyExtractor}
      data={this.state.area}
      renderItem={this.renderItem}
    />
</ShimmerPlaceholder>
<TextInput
style={styles.textInput} placeholder='Seleciona a área...'
//onChangeText={(areaDesc) => this.setState({areaDesc})}

underlineColorAndroid='transparent'
value={this.state.areaDesc}
/>


<TextInput
style={styles.textInput} placeholder='Digite o cargo aqui...'
onChangeText={(descricao) => this.setState({descricao})}
underlineColorAndroid='transparent'

value={this.state.descricao}
/>
<TouchableOpacity
style={styles.btn}
onPress={this.cadastrar}
>
   
<Text style={{fontWeight:"900", color:"#fff"}}>{this.state.botao}</Text>

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
        visible: true  
      })
      //Alert.alert(JSON.stringify(this.state.area))

    })
  }




cadastrar = () => {

const url = 'http://projetofaculdade.herokuapp.com/cargoCad';
  fetch(url, {
      method: 'POST',
        headers: {
           'Accept': 'application/json', 
           'Content-Type': 'application/json',
           'Access-Control-Allow-Origin': 'http://projetofaculdade.herokuapp.com/cargoCad',
            'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        descricao: this.state.descricao,
        area_id: this.state.area_id,
        cargo_id: this.state.cargo_id
        //empresa_id:  this.state.empresa_id
      })
  })
  .then((response) => response.json())
  .then((res) => {

    if(res.sucess===true){
       Alert.alert(res.message)
       let change = 'sim';
       this.props.navigation.navigate('Cargo', change)
    }else{
      Alert.alert(res.message)
    }

  })
  
}

}
