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
const apiClarifaiHttpRequest = (imageurl) =>{
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = 'f1155c26b9a34f6f80ada248fd783dd3';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'chadwin';       
    const APP_ID = 'SmartBrain';
    // Change these to whatever model and image URL you want to use
    // const MODEL_ID = 'general-image-recognition';    
    const IMAGE_URL = imageurl;
     ///////////////////////////////////////////////////////////////////////////////////
    // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
    ///////////////////////////////////////////////////////////////////////////////////
    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
};
//looking at the fetch method requestOptions has been called hence me returning it
return requestOptions

};

class App extends Component{ 
  constructor(props){
    super()
    this.state = {
      input:"",
      imageUrl:"",//image url
      box:{},//object of data from API
      route:"Signin",//initial sign in page.
      isSignedIn:"" //bool("") gives true in JS.
    }
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
  if(route==="home"){//conditional
    this.setState({isSignedIn:"false"})//sets isSignIN to true which will display sign out nav only
    this.setState({route:route})//also go to home page

  }else{//otherwise if route is not "home"
    this.setState({isSignedIn:""})//set isSignIn to false and display sign in and register nav.
    this.setState({route:route})//also go to whichever route is applied.
  }
  
}

 buttonClick = () =>{
  this.setState({imageUrl:this.state.input})
  //when I press the detect button this should take place.
  fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", apiClarifaiHttpRequest(this.state.input))
  .then(response => response.json())//json response
  .then(result => this.faceBox(this.faceBoxCalculation(result)))//nested function API data
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
                <Rank/>
                <ImageLinkForm inputBoxOnChange={this.inputBoxOnChange}  buttonClick={this.buttonClick}/>
                <FaceRecognition imageUrl={imageUrl} box={box}/>
              </div>
            :(
              route==="Signin"?
              <SignIn onChangeRoute={this.onChangeRoute}/>
              :<Register onChangeRoute={this.onChangeRoute}/>
          

              
            ) 
          
          }      
      </div>
     );
  };

};

export default App;
