import React from 'react';
import { View,Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
function Info (props){
 
        
    return(
        <SafeAreaProvider>
            <View style={{alignItems:'center'}}>
                <p style={{'color':'white','marginLeft':'100px',alignContent:'center','display':'block'}}>
            ESPARK is product that belongs to AFD Enterprises NGO division.It is a web application that allows students and enthusiasts to learn <br></br>
            concepts faster by providing an adaptive learning platform.This allows students to follow their goals and turn their vision into reality.<br></br>
            The idea of Espark is based on the curriculum of education in Finland.Espark allows users to store data/websites/videos and podcasts and <br></br>
            lets students study subjects of their choice.The website is flexible in handling any learning source from the web.The Espark website also <br></br>
            helps students in creating entrepreneurs because it is built around the users vision.ESPARK has a vision to help students discover their passion. <br></br>
                </p>
                <Image style={{'width':'100px','height':'100px'}}
                source={require('./afdenterpriseslogoregular.PNG')}
                />
            </View>
        </SafeAreaProvider>
    )
    
}
export default Info