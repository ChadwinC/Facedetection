import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Particle from './Components/Particles/Particle';
import { Component } from 'react';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';

//below is HTTPRequest facedetection API call

const initialstate ={
  input:"",
      imageUrl:"",//image url
      box:{},//object of data from API
      route:"Signin",//initial sign in page.
      isSignedIn:false,
      user:{
        id: "",
				name: "",
				surname: "",
				email: "",
				password: "",
				entries: 0,
				joined: ""
      }
}



class App extends Component{ 
  constructor(props){
    super(props)
    this.state =initialstate;

 } 

 //loaduser 
 loadUser = (data) => {
  this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      entries: data.entries,
      joined: data.joined
    }})
 }

 //below function will calcuate where the faceBox should be
 faceBoxCalculation = (resp) =>{//gets data from api call
   const clarifaiImageData = resp.outputs[0].data.regions[0].region_info.bounding_box;//returns json info
   const image = document.getElementById("inputImage");//get image from the id
   const width = Number(image.width);
   const height = Number(image.height);
  
  return {// the below will get the face box points
    topRow: clarifaiImageData.top_row*height,
    bottomRow: height - (clarifaiImageData.bottom_row*height),
    leftCol: clarifaiImageData.left_col * width,
    rightCol: width - (clarifaiImageData.right_col*width)

  }

 }

 //box object update.
 faceBox = (box) =>{
  this.setState({box:box});
  
 }

 //inputbox change detection
 inputBoxOnChange = (event) =>{
  this.setState({input: event.target.value})
}

onChangeRoute = (route) =>{
  if(route==="Signin"){//conditional
    this.setState({isSignedIn:false})
   
    //sets isSignIN to true which will display sign out nav only
    this.setState({route:route})//also go to home page

  }else if (route === 'home'){//otherwise if route is not "home"
    this.setState({isSignedIn: true})
    
    //also go to whichever route is applied.
  }else if(route==="signOut"){
    window.location.reload();
    this.setState({isSignedIn:false})
  }
  this.setState({route:route})
}

 buttonClick = () =>{
  this.setState({imageUrl:this.state.input})
  //when I press the detect button this should take place.
  fetch("http://localhost:3001/imageURL",{
                method: "post",
                headers: {'Content-Type':"application/json"},
                body: JSON.stringify({
                  input: this.state.input
                }) 
    })
    .then(response => {
        if(response){
          fetch("http://localhost:3001/image",{
                method: "put",
                headers: {'Content-Type':"application/json"},
                body: JSON.stringify({
                  id: this.state.user.id
                }) 
          })
          .then(resp => resp.json())
          .then(count => {
            this.setState(Object.assign(this.state.user,{entries:count}))
          })
          
        }
      return response.json(); 
    })//json response
  .then(data => this.faceBox(this.faceBoxCalculation(data)))
  .catch(error => console.log('error', error));
 }
 
  
  render(){

   const {isSignedIn,imageUrl, route, box} = this.state;

    return (
      <div className="App" >
       <Particle/>
        <Navigation onChangeRoute={this.onChangeRoute} isSignedIn={isSignedIn}/>

          { route == "home"?
              <div>
                <Logo/>
                <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                <ImageLinkForm inputBoxOnChange={this.inputBoxOnChange}  buttonClick={this.buttonClick}/>
                <FaceRecognition imageUrl={imageUrl} box={box}/>
              </div>
            :(
              route==="Signin"?
              <SignIn loadUser={this.loadUser} onChangeRoute={this.onChangeRoute}/>
              :<Register loadUser={this.loadUser} onChangeRoute={this.onChangeRoute}/>
          

              
            ) 
          
          }      
      </div>
     );
  };

};

export default App;
