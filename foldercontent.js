import React,{useState,useEffect,useRef} from 'react'
import { StyleSheet, Text, View,TextInput,TouchableOpacity, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Particle_Background from './starbg';
import Google_Tag from './google_tag';
export default function FolderContent(props){
    const [_foldername_,setFolderName] = useState(props.navigation.getParam('foldername_'))
    const [name,setName] = useState(props.navigation.getParam('name'))
    const [googlesearch,setGoogleSearch] = useState('')
    const [retrievegoogledata1,setRetrieveGoogleData1] = useState([])
    const [retrievegoogledata2,setRetrieveGoogleData2] = useState([])
    const [youtubesearch,setYoutubeSearch] = useState('')
    const [linkjoin,setLinkJoin] = useState([])
    const [djoin,setDJoin] = useState([])
    const [indexval,setIndexVal] = useState(0)
    const [youtubeAPITitles,setyoutubeAPITitles] = useState([])
    const [youtubeAPILinks,setyoutubeAPILinks] = useState([])
    const [updated,setUpdated] = useState(0)
    const [stored_data_array,setStored_dataArray] = useState([])
    const [linkarray,setLinkaray] = useState([])
    const [ytlinkjoin,setytLinkJoin] = useState([])
    const [ytdjoin,setytDJoin] = useState([])
    const [link_array,setLinked_array] = useState([])
    const [update_effect,setue]= useState(0)
    const [thumbnail,setThumbnail] = useState([])
    console.log(_foldername_.data)
    useEffect(async()=>{
        let emailandlastname = await fetch(`http://localhost:8000/get_last_name_and_email/${name}`)
        emailandlastname = await emailandlastname.json()
        let username_firstore = name+emailandlastname['lastname']+emailandlastname['email']
        let api_call = await fetch(`http://localhost:8000/get_stored_links/${name+emailandlastname['lastname']+emailandlastname['email']}/${_foldername_.data}`)
        api_call = await api_call.json()
        console.log(api_call.data)
        setLinked_array(api_call.data)
        
    },[update_effect])
    const LoadData = () =>{
        
    } 

    return(
        <SafeAreaProvider>

            <div style={{display:'flex',marginTop:'20px'}}>

            <div style={{padding:'10px'}}>
                <button style={{backgroundColor:"#3275A6",marginLeft:130,height:50,width:100,border:'none',borderRadius:10}} onClick={async()=>{
                    
  let emailandlastname = await fetch(`http://localhost:8000/get_last_name_and_email/${name}`)
  emailandlastname = await emailandlastname.json()
                    let api = await fetch(`http://localhost:8000/load_data/${name+emailandlastname['lastname']+emailandlastname['email']}/${_foldername_.data}`)
                    api = await api.json()
                    console.log(api.data)
                     setStored_dataArray(api.data)
                    console.log(stored_data_array)

            }}>Stored data</button><br></br>
            <div>{
                stored_data_array.map((data,index)=>{
                    let linkarray__ = []
                    data['link'].split('').map((data,index)=>{
                        if(data=='`'){
                            linkarray__[index]='/'
                        }
                        else{
                            linkarray__[index]=data
                        }
                    })
                    console.log(linkarray__.join(""))

                    return (
                        <div>
                        <Google_Tag bn={''}val={data['name']} link={linkarray__.join("")}/>
                        <br></br>
                        <br></br>
                        </div>
                    )
                })



}</div>
            
            </div>
               
                
                <div style={{padding:'10px'}}><TextInput type='text' placeholder='Google search' style={{padding:15,marginLeft:100,borderWidth:2,color:'black',backgroundColor:'white'}} onChangeText={(e)=>(setGoogleSearch(e))}/>
                <button style={{backgroundColor:"#3275A6",marginLeft:130,height:50,width:100,border:'none',borderRadius:10}} onClick={async()=>{
                    setue(update_effect+1)
let api = await fetch(`http://localhost:8000/get_google_content/${googlesearch}`)
api = await api.json()
console.log(api['names'],api.urls)
setRetrieveGoogleData1(api['names'])
setRetrieveGoogleData2(api['urls'])
console.log(retrievegoogledata1,retrievegoogledata2)
                    }}>search data</button>

                <br></br><br></br><div>
                {
                    
                   retrievegoogledata1.map((data,index)=>{
                    var linkjoin_ = []
                    var djoin_ = []
                    var link_array_mod_ = []
                    let disable = false
                link_array.map((data,index_)=>{
                    console.log(data)
                    data.split('').map((info,i)=>{
                        if (info == '`'){
                            info = '/'
                        }
                        link_array_mod_.push(info)
                    })
                })
                link_array_mod_ = link_array_mod_.join('').split('http')
                    console.log(link_array_mod_)
                let link_array_mod_1 = []
                link_array_mod_.map((data,index__)=>{
                    link_array_mod_1.push('http'+data)
                })
                console.log(link_array_mod_1,link_array_mod_1.length)
                console.log(retrievegoogledata2,retrievegoogledata2.length)

                       return(
                           <Google_Tag bn={'save source'} val={data} link={retrievegoogledata2[index]} disable={disable} clickfunction={async()=>{
                            retrievegoogledata2[index].split('').map((data_)=>{
                                if(data_ == '/'){
                                    console.log('alert')
                                    data_ = '`'
                                }
                                linkjoin_.push(data_)

                            })
                            data.split('').map((_)=>{
                                if(_ == '/'){
                                    _ = "`"
                                    console.log('alert')
                                }
                                djoin_.push(_)

                            })
                        

                            
                            console.log(djoin.join(''),linkjoin.join(""))
                            
  let emailandlastname = await fetch(`http://localhost:8000/get_last_name_and_email/${name}`)
  emailandlastname = await emailandlastname.json()

                            let api = await fetch(`http://localhost:8000/add_google_content/${name+emailandlastname['lastname']+emailandlastname['email']}/${_foldername_.data}/${djoin_.join("")}/${linkjoin_.join("")}`)
                            api = await api.json()
                            console.log(api)
                            
                           // for(let i in api_call.data){
                          //      if(i['link'] === retrievegoogledata2[index]){
                         //           console.log('found match')
                        //        }
                            //}
                           }}/>
                       )
                       setIndexVal(indexval+1)

                   })
                }
                </div>
                </div>



                <div style={{padding:'10px'}}><TextInput type='text' placeholder='Youtube search' style={{padding:15,marginLeft:100,borderWidth:2,color:'black',backgroundColor:'white'}} onChangeText={(e)=>(setYoutubeSearch(e))}/>
                <button style={{backgroundColor:"#3275A6",marginLeft:130,height:50,width:100,border:'none',borderRadius:10}} onClick={async()=>{
                setUpdated(updated+1)
                let api = await fetch(`http://localhost:8000/get_youtube_data/${youtubesearch}`)
                api = await api.json()
                setyoutubeAPITitles(api.titles)
                setyoutubeAPILinks(api.link)
                setThumbnail(api.thumbnail)
                console.log(youtubeAPITitles,youtubeAPILinks)
                }}><Text>Search data</Text></button><br></br><br></br>
                <div id='youtubecol' style={{marginLeft:'109px'}}>
                {   
                    youtubeAPITitles.map((data,index)=>{
                        let ytlinkjoin_ = []
                        let ytdjoin_ = []
                        return(
                            <Google_Tag val={data}  bn={'save source'} link={youtubeAPILinks[index]}  
                            
                            clickfunction={async()=>{
                                youtubeAPILinks[index].split('').map((data_)=>{

                                    if(data_ == '/'){
                                        console.log('alert')
                                        data_ = '`'
                                    }
                                    ytlinkjoin_.push(data_)
    
                                })
                                data.split('').map((_)=>{
                                    if(_ == '/'){
                                        _ = "`"
                                         console.log('alert')
                                    }
                                    ytdjoin_.push(_)
    
                                })
                            
    
                                console.log(ytlinkjoin_)
                                console.log('link is '+ytlinkjoin_.join("").split('=')[1])
                                
  let emailandlastname = await fetch(`http://localhost:8000/get_last_name_and_email/${name}`)
  emailandlastname = await emailandlastname.json()
  console.log({'name':name+emailandlastname['lastname']+emailandlastname['email'],'foldername':_foldername_.data,'ytname':ytdjoin_.join(""),'link':ytlinkjoin_.join("").split('=')[1]})
                                let api = await fetch(`http://localhost:8000/add_youtube_content/${name+emailandlastname['lastname']+emailandlastname['email']}/${_foldername_.data}/${ytdjoin_.join("")}/${ytlinkjoin_.join("").split('=')[1]}`)
                                api = await api.json()
                                console.log(api)
                               }}
                            />
                        )
                    })
                     
                }
            
            
                
                   
                
                </div></div>


               
            </div>
        </SafeAreaProvider>
    )
}
