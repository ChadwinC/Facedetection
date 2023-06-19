import React from "react";
import "./FaceRecognition.css"


const FaceRecognition = ({imageUrl, box}) =>{
    return(

        <div className="center flex justify-center">
        {imageUrl && (
         <div className=" absolute mt2">
            <img id="inputImage" alt='No image available, insert URL above' src={imageUrl} width="500px" height="auto"/>
            {box && (
            <div className="bounding-box" style={{top:box.topRow, bottom:box.bottomRow, left:box.leftCol, right:box.rightCol}}></div>
            )}
         </div>
        )}
        </div>
    );

};



export default FaceRecognition;