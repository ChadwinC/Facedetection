import React from "react";
import "./ImageLinkForm.css"


const ImageLinkForm = ({inputBoxOnChange,buttonClick }) =>{
    return(
        <div>
            <p className="f3 ">  
                {"This Magic Brain will detect faces in your pictures. Give it a try."}
            </p>
            
            <div className="Form w-50 shadow-5 dib br3 pa4 center">
                <input 
                    className="f4 pa2 w-80 center" 
                    type="text" 
                    placeholder="Image url here" 
                    onChange={inputBoxOnChange}
                />
                <button 
                    className="w-5 grow f4 link pa2 white bg-light-purple"
                    onClick={buttonClick}

                >Detect</button>
                
            </div>
        </div>

    );

}
export default ImageLinkForm;