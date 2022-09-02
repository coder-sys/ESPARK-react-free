import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native';
import React,{useState,useEffect} from 'react'
import {GoogleLogin} from 'react-google-login';
import Particle_Background from './starbg';
import {gapi} from 'gapi-script'

import * as THREE from 'three'
import { Mesh } from 'three';

const new_body = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial()
const body = new THREE.Mesh(new_body,material)
export default function SignIn (props){

  const [renderer,setRenderer] = useState(props.navigation.getParam('obj'))
  const [scene,setScene] = useState(props.navigation.navigate('scene'))
  const [fname,setFname] = useState("")
  const [lname,setLname] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [marginTop,setMargin] = useState(200)
  const [marginLeft,setMarginLeft] = useState(500)
  const [marginRight,setMarginRight] = useState(300)
  const [opacity,setOpacity] = useState(0.8)
  const [checked_lastname,setChecked_lastname] = useState('')
  const [checked_firstname,setChecked_firstname] = useState('')
  const [checked_email,setChecked_email] = useState('')
  const signinwithgoogle = async(firstname,lastname,__password__,__email__) =>{
    let __api__ = await fetch(`http://localhost:8000/verify_sign_in_information/${firstname}/${lastname}`)
          __api__ = await __api__.json()
          if(__api__['data'] == 'good to go!'){
            alert(__api__['data'])

          let api = await fetch(`http://localhost:8000/sign_in/${firstname}/${lastname}/${__password__}/${__email__}`)
          let api_json = await api.json()
          props.navigation.navigate('Login')
          }
  }
  document.body.classList.add("no-scroll")
//scene.add(body)
  renderer.setSize(window.innerWidth/4, window.innerHeight/4)
   useEffect(()=>{
    function start(){
      gapi.client.init({
        'clientId':'615921346526-8gs4b74dja97fje48tv2o459a6g7e9ns.apps.googleusercontent.com',
        scope:''
      })
    }
    gapi.load('client:auth2',start)
  })
//document.getElementById('threejscontainer').style.transform = 'translate(-10px,0px)'
  return (
    <View >
      <div style={{marginTop:marginTop,marginLeft:marginLeft,marginRight:marginRight,opacity:opacity,width:'40%'}} >
        <TextInput placeholder='first name' type='text'style={{padding:15,marginRight:5,borderWidth:2,backgroundColor:'white'}} onChangeText={(e)=>{setFname(e);console.log(e)}}/> 
        <TextInput placeholder='lastname' type='text' style={{padding:15,borderWidth:2,backgroundColor:'white'}} onChangeText={(e)=>{setLname(e)}}/>
        <br></br>        <br></br>
        <br></br>

        <TextInput placeholder='email' type='email' style={{padding:15,marginLeft:100,borderWidth:2,backgroundColor:'white'}} onChangeText={(e)=>(setEmail(e))}/> <br></br>        <br></br>
        <br></br>
        <TextInput placeholder='password' type='password' style={{padding:15,marginLeft:100,borderWidth:2,backgroundColor:'white'}} onChangeText={(e)=>(setPassword(e))}/><br></br><br></br>
        <div style={{marginLeft:'107px'}}>
        <GoogleLogin 
     clientId={'615921346526-8gs4b74dja97fje48tv2o459a6g7e9ns.apps.googleusercontent.com'}
      onSuccess={(res)=>signinwithgoogle(res.profileObj['name'],res.profileObj['givenName'],res.profileObj['googleId'],res.profileObj['email'])}
      onFailure={(res)=>alert('had trouble signing in,please try again',res)}
      cookiePolicy={'single_host_origin'}
      isSignedIn={false}
/>
</div><br></br><br></br>
        <button type='sumbit' style={{backgroundColor:"#3275A6",marginLeft:130,height:50,width:100,border:'none',borderRadius:10}} onClick={async()=>{
          let __api__ = await fetch(`http://localhost:8000/verify_sign_in_information/${fname}/${lname}`)
          __api__ = await __api__.json()
          alert(__api__['data'])
          if(__api__['data'] == 'good to go!'){
          let api = await fetch(`http://localhost:8000/sign_in/${fname}/${lname}/${password}/${email}`)
          let api_json = await api.json()
          props.navigation.navigate('Login')
          }
        }}><Text>Sign in</Text></button>
        </div>
      
    </View>
  );
  
}
