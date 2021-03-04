//Rotas

import ReactHandler from 'react-native-gesture-handler'
import React from 'react'
import{ Text, View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';   

import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Login from './src/pages/Login'
import Home from  './src/pages/Home'
import Cadastro from  './src/pages/Cadastro'
import TipoProjeto from  './src/pages/TipoProjeto'
import TipoForm from  './src/pages/TipoProjeto/tipoForm'
import HomeCadastro from  './src/pages/HomeCadastro'
import HomeBasico from  './src/pages/HomeBasico'
import Usuario from  './src/pages/Cadastro/listaUsuario'
import CadastroAdm from  './src/pages/Cadastro/cadastroAdm'
import Area from  './src/pages/Area'
import AreaForm from  './src/pages/Area/areaForm'
import Cargo from  './src/pages/Cargo'
import CargoForm from  './src/pages/Cargo/cargoForm'
import Index from  './src/pages/index'
import IndexBasico from  './src/pages/indexBasico'
import Projeto from  './src/pages/Projeto'
import ProjetoForm from  './src/pages/Projeto/projetoForm'
import Intervalo from  './src/pages/Intervalo'
import IntervaloForm from  './src/pages/Intervalo/intervaloForm'
import Atividade from  './src/pages/Atividade'
import AtividadeForm from  './src/pages/Atividade/atividadeForm'
import Dia from  './src/pages/Dia'
import DiaForm from  './src/pages/Dia/diaForm'
import AtribuiUsu from  './src/pages/AtribuiUsuario'
import AtividadesProjeto from  './src/pages/AtividadesProjeto'
import Etapa from  './src/pages/Etapa'
import EtapaForm from  './src/pages/Etapa/etapaForm'
import InicioAtividade from  './src/pages/inicioAtividade'
import AproveitamentoAtividade from  './src/pages/MeuAproveitamento/aproveitamentoAtividade'

import { Button, Icon } from 'react-native-elements'

const Stack =createStackNavigator()

export default class App extends React.Component{

    constructor(props){

        super(props);
         
        this.state = { 
          empresa: '',
          
        } 
      }

      componentDidMount = async () =>{
        this.setState({ empresa: await (await AsyncStorage.getItem('empresa')).replace('"','')});    
      }  
    


  render(){
  return (

    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{title: 'Gerenciador Home-Office', headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FD5956'},  headerLeft: null }}/>
        <Stack.Screen name="Home" component={Home} 
        options={{title: 'Seja bem vindo !',headerTintColor: '#fff',
        headerStyle: {
            backgroundColor: '#FD5956'},  headerLeft: null }}/>
        <Stack.Screen name="Cadastro" component={Cadastro} options={{title: 'Usuário', headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FD5956'}  }}/>
        <Stack.Screen name="TipoProjeto" component={TipoProjeto} options={{title: 'Tipos de projeto',headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FD5956'} }}/>
      <Stack.Screen name="TipoForm" component={TipoForm} options={{title: 'Tipos de projeto', headerTintColor: '#fff',
        headerStyle: {
            backgroundColor: '#FD5956'} }}/>
      <Stack.Screen name="HomeCadastro" component={HomeCadastro} options={{title: 'Cadastrar'}}/>
      <Stack.Screen name="HomeBasico" component={HomeBasico} options={{title: 'Seja Bem vindo!', headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FD5956'},  headerLeft: null }}/>
      <Stack.Screen name="CadastroAdm" component={CadastroAdm} options={{title: 'Cadastrar gestor', headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FD5956'} }}/>
      <Stack.Screen name="Area" component={Area} options={{title: 'Áreas cadastradas', headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FD5956'} }}/>
      <Stack.Screen name="AreaForm" component={AreaForm} options={{title: 'Área', headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FD5956'} }}/>
      <Stack.Screen name="Cargo" component={Cargo} options={{title: 'Cargos cadastrados', headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FD5956'} }}/>
      <Stack.Screen name="CargoForm" component={CargoForm} options={{title: 'Cargo', headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FD5956'} }}/>
      <Stack.Screen name="Index" component={Index} options={{title: 'Empresa: '+this.state.empresa.replace('"','') , headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FD5956'},  headerLeft: null }}/>
      
      <Stack.Screen name="IndexBasico" component={IndexBasico} options={{title: 'Bem vindo!', headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FD5956'},  headerLeft: null }}/>
      <Stack.Screen name="Projeto" component={Projeto} options={{title: 'Projetos cadastrados', headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FD5956'} }}/>
      <Stack.Screen name="ProjetoForm" component={ProjetoForm} options={{title: 'Projeto', headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FD5956'}}}/>
 <Stack.Screen name="AtribuiUsu" component={AtribuiUsu} options={{title: 'Atribuir usuário ao projeto', headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FD5956'}}}/>

     <Stack.Screen name="Intervalo" component={Intervalo} options={{title: 'Intervalos cadastrados', headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FD5956'} }}/>
      <Stack.Screen name="IntervaloForm" component={IntervaloForm} options={{title: 'Intervalo', headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FD5956'}}}/>
     <Stack.Screen name="Atividade" component={Atividade} options={{title: 'Atividades cadastradas', headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FD5956'} }}/>
      <Stack.Screen name="AtividadeForm" component={AtividadeForm} options={{title: 'Atividade', headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FD5956'}}}/>
                      <Stack.Screen name="Usuario" component={Usuario} options={{title: 'Usuários cadastrados', headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FD5956'}}}/>
 <Stack.Screen name="Dia" component={Dia} options={{title: 'Dias cadastrados', headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FD5956'} }}/>
      <Stack.Screen name="DiaForm" component={DiaForm} options={{title: 'Dia', headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FD5956'}}}/>
<Stack.Screen name="AtividadesProjeto" component={AtividadesProjeto} options={{title: 'Atividades do projeto', headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FD5956'}}}/>
<Stack.Screen name="Etapa" component={Etapa} options={{title: 'Etapas da atividade', headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FD5956'}}}/>
<Stack.Screen name="EtapaForm" component={EtapaForm} options={{title: 'Etapa', headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FD5956'}}}/>
<Stack.Screen name="InicioAtividade" component={InicioAtividade} options={{title: 'Tempo de trabalho', headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FD5956'}}}/>
                <Stack.Screen name="AproveitamentoAtividade" component={AproveitamentoAtividade} options={{title: 'Meu aproveitamento', headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#FD5956'}}}/>

    </Stack.Navigator>
</NavigationContainer>
  
  );
}
}

