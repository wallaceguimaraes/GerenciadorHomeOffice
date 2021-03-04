import React from 'react';
import {  StyleSheet, 
          Text, 
          View,
          TextInput,  
          TouchableOpacity, 
          Alert,
          Button,Image, KeyboardAvoidingView} from 'react-native';
import styles from './styles'
import AsyncStorage from '@react-native-community/async-storage';   
import {createStackNavigator} from '@react-navigation/stack';       
import {Card} from 'react-native-shadow-cards';
import {Icon} from 'react-native-elements';


export default class HomeCadastro extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      perfil_id:0,
      empresa_id: 0,
      showing: 'none',
      botao:<Text></Text> 
    }
  }
  
componentDidMount = async() => {
  this.setState({ perfil_id: await AsyncStorage.getItem('perfil_id') });
// Alert.alert(this.state.perfil_id);
  if(this.state.perfil_id==1){
    this.setState({showing: 'block' })
  }
}



  
render(){ 

  
  return(


<View style={styles.container}>

    <View style={{flexDirection: "row",justifyContent: "space-between" }}>
    <Card 
    
    style={{ marginTop:15, padding: 10, marginRight: 20, width: 130, height: 110}}>
            <Text style={{ textAlign:"center" }}
 >Área</Text>
         
         <TouchableOpacity
         onPress={()=> this.props.navigation.navigate('Area')}
         style={{paddingBottom: 20, textAlign: "center" }} ><Image style={{marginLeft: 15, width: 80, height: 80}}
source={require('../../assets/icons8-area-chart-48.png')}
/>
</TouchableOpacity>

          </Card>
          <Card style={{paddingBottom:20, marginTop:15, padding: 10,height:110, width: 130}}>
            <Text style={{textAlign:"center"}}>Cargo</Text>

            <TouchableOpacity
         onPress={()=> this.props.navigation.navigate('Cargo')}
         style={{padding: 3, textAlign: "center", alignItems:"center" }} ><Image style={{ width: 80, height: 68}}
source={require('../../assets/icons8-supplier-96.png')}
/>
</TouchableOpacity>


          </Card>

    </View>


    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
    <Card style={{ padding: 10,marginTop: 10,  marginRight: 20 , width: 130, height: 110}}>
            <Text style={{ textAlign:"center" }}>Tipos dos projetos</Text>
          
            <TouchableOpacity
         onPress={()=> this.props.navigation.navigate('TipoProjeto')}
         style={{paddingBottom: 20, textAlign: "center", alignItems:"center" }} ><Image style={{width: 80, height: 60}}
source={require('../../assets/icons8-elective-96.png')}
/></TouchableOpacity>
          
          
          </Card>
          <Card style={{padding: 10, marginTop: 10, height:110, width: 130}}>
            <Text style={{textAlign:"center"}} >Projetos</Text>
           

            <TouchableOpacity
         onPress={()=> this.props.navigation.navigate('Projeto')}
         style={{padding: 10, textAlign: "center", alignItems: "center" }} ><Image style={{marginLeft:9, width: 80, height: 60}}
source={require('../../assets/icons8-blueprint-96.png')}
/>
</TouchableOpacity>

          </Card>

    </View>



    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
    <Card style={{ padding: 10,marginTop: 10,  marginRight: 20 , width: 130, height: 110}}>
            <Text style={{ textAlign:"center" }}>Intervalos/Pausa</Text>
          
            <TouchableOpacity
         onPress={()=> this.props.navigation.navigate('Intervalo')}
         style={{paddingBottom: 20, textAlign: "center",alignItems:"center" }} ><Image style={{ width: 80, height: 80}}
source={require('../../assets/icons8-pause-squared-96.png')}
/></TouchableOpacity>
          
          
          </Card>
          <Card style={{padding: 10, marginTop: 10,height:110, width: 130}}>
            <Text style={{textAlign:"center"}} >Atividades</Text>
            <TouchableOpacity
         onPress={()=> this.props.navigation.navigate('Atividade')}
         style={{padding: 10, textAlign: "center", alignItems:"center" }} ><Image style={{ marginLeft: 9, width: 80, height: 60}}
source={require('../../assets/icons8-activity-history-96.png')}
/>
</TouchableOpacity>

          </Card>

    </View>

    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
    <Card style={{ padding: 10,marginTop: 10,  marginRight: 20 , width: 130, height: 110}}>
            <Text style={{ textAlign:"center" }}>Usuários</Text>
          
            <TouchableOpacity
         onPress={()=> this.props.navigation.navigate('Usuario')}
         style={{paddingBottom: 20, textAlign: "center",alignItems:"center" }} ><Image style={{ width: 80, height: 80}}
source={require('../../assets/icons8-add-user-male-96.png')}
/></TouchableOpacity>
          
          
          </Card>
          <Card style={{padding: 10, marginTop: 10,height:110, width: 130}}>
            <Text style={{textAlign:"center"}} >Dias da semana</Text>
            <TouchableOpacity
         onPress={()=> this.props.navigation.navigate('Dia')}
         style={{padding: 10, textAlign: "center", alignItems:"center" }} ><Image style={{ width: 80, height: 60}}
source={require('../../assets/icons8-timetable-96.png')}
/>
</TouchableOpacity>

          </Card>

    </View>


</View>


  )
}

}


