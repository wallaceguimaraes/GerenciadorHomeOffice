import * as React from 'react';
import { View, Text, Button,Image,TouchableOpacity, ImageBackground} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeBasico from  './HomeBasico'
import MeuProjeto from  './MeuProjeto'

import Login from  './Login'

import MinhaAtividade from  './MinhaAtividade/index'
import ApAtividade from  './MeuAproveitamento/apAtividade'

import Cargo from  './Cargo'
import AsyncStorage from '@react-native-community/async-storage';   
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default class Index extends React.Component{
/*
  constructor(props){
    super(props);
    this.state = {
      usuario:''
     // visible: false
    }
  }


  componentDidMount = async () =>{
    this.setState({ usuario: await AsyncStorage.getItem('usuario') });
    
    }
*/
constructor(props){

  super(props);
   
  this.state = { 
    usuario: '',
    cargo:''
  } 
}


componentDidMount = async () =>{
  this.setState({ usuario:  (await AsyncStorage.getItem('usuario')).replace('"','')});
  this.setState({ cargo: (await AsyncStorage.getItem('cargo_desc')).replace('"','')});

}  



  render(){
return(


<Drawer.Navigator   
   drawerContent={(props) => this.CustomDrawerContent(props)} initialRouteName={HomeBasico}>
<Drawer.Screen name="HomeBasico" component={HomeBasico} options={{title: 'Projetos', headerStyle: {backgroundColor: '#ffd45d'},
headerLeft: <Text onPress={() => 
  navigation.navigate('DrawerOpen')}>Menu</Text>
}} />
<Drawer.Screen name="MeuProjeto" component={MeuProjeto} options={{title: 'Meus projetos', headerStyle: {backgroundColor: '#ffd45d'},
headerLeft: <Text onPress={() => 
  navigation.navigate('DrawerOpen')}>Menu</Text>
}} />
<Drawer.Screen name="MinhaAtividade" component={MinhaAtividade} options={{title: 'Minhas atividades', headerStyle: {backgroundColor: '#ffd45d'},
headerLeft: <Text onPress={() => 
  navigation.navigate('DrawerOpen')}>Menu</Text>
}} />
<Drawer.Screen name="ApAtividade" component={ApAtividade} options={{title: 'Meu aproveitamento/Atividades', headerStyle: {backgroundColor: '#ffd45d'},
headerLeft: <Text onPress={() => 
  navigation.navigate('DrawerOpen')}>Menu</Text>
}} />

</Drawer.Navigator>

)
}


/*
 CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Close drawer"
          onPress={() => props.navigation.closeDrawer()}
        />
        <DrawerItem
          label="Toggle drawer"
          onPress={() => props.navigation.openDrawer()}
        />
      </DrawerContentScrollView>
    );
  }
    */



   CustomDrawerContent(props) {
    return (
     <View style={{flex:1}} > 
          <View style={{flex:1, alignItems: 'center'}} >

          <ImageBackground source={require('../assets/back.webp')} style={{ width: '100%', height: '100%'}}>

          <View style={{padding: 10, alignItems:'center'}}>

          <Image
            style={{width:80,height:80, borderRadius:50,  marginBottom: 20}}
            source={require('./../assets/perfil.webp')}/>
            <Text style={{fontSize: 18, color: '#fff', fontWeight: 'bold'}} >{this.state.usuario.replace('"','')}</Text>
            <Text style={{fontSize: 14,  color: '#fff'}}>{this.state.cargo.replace('"','')}</Text>
          </View>
            </ImageBackground>
              
          </View>

          <View style={{flex:3,backgroundColor: '#fff'}}>
       
          <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        </DrawerContentScrollView>
          </View>  
     </View>
    );
  }


}




