import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Particle_Background from './starbg';
import * as THREE from 'three'
import { Mesh } from 'three';

const scene = new THREE.Scene()

// Objects
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// Materials

const material = new THREE.MeshNormalMaterial()

// Mesh

const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 10
pointLight.position.y = 10
pointLight.position.z = 10
scene.add(pointLight)

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth/2, window.innerHeight/2);
renderer.setAnimationLoop(Frontpage);

const sizes = {
  width: window.innerWidth/4,
  height: window.innerHeight/4
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)
let div = document.createElement('div')
div.id = 'threejscontainer'
div.style.transform = 'translate(-90px,250px)'
div.append(renderer.domElement)
document.body.style = "background-color:black"
renderer.setAnimationLoop(Frontpage)
export default function Frontpage(props) {
	renderer.render( scene, camera );
    document.body.append(div)
    sphere.rotation.x = props/1000
    sphere.rotation.y = props/1000
    sphere.rotation.z = props/1000

  
  return (
    <View style={{'backgroundColor':'black'}}>
      <div id='mainview' style={{display:'flex',flexWrap:'wrap',flexDirection:'row',padding:'40px','backgroundColor':'black'}}>
        <div style={{backgroundColor:'#3275a6',width:'400px',height:'200px',marginBottom:'30px',borderRadius:'10px'}}>

          <div style={{marginTop:'90px',marginLeft:'120px',fontFamily:'serif'}}><h1><i>E spark</i><sub style={{'fontSize':'11px'}}><i>Learning is limitless</i></sub></h1></div>
        </div>

    

        <div>

            <button style={{backgroundColor:"#3275A6",marginLeft:130,height:50,width:100,border:'none',borderRadius:10}} onClick={()=>{
                props.navigation.navigate('SignIn',{'obj':renderer,'scene':scene})
            }}>Sign in</button>
 
               <button style={{backgroundColor:"#3275A6",marginLeft:130,height:50,width:100,border:'none',borderRadius:10}} onClick={()=>{
                props.navigation.navigate('Login',{'obj':renderer,'scene':scene})
            }}>Logn in</button>
            </div>
        
         
            </div>

    </View>
  );

}
