import React from "react";

class Register extends  React.Component{
    constructor(props){
        super(props)
        this.state ={
            emailRegister:"",
            passwordRegister:"",
            nameRegister: ""
        }
    }

    //read value from email and password inputbox
emailInputRegister = (event)=>{
    this.setState({emailRegister: event.target.value})
}

nameInputRegister = (event)=>{
    this.setState({nameRegister: event.target.value})
}


passwordInputRegister = (event)=>{
    this.setState({passwordRegister: event.target.value})
}
// create form submission to server for checking and route to home page
RegisterSubmitForm = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    // Rest of the code allows me to changeroute inside event promise
    fetch("http://localhost:3001/register", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: this.state.emailRegister,
            password: this.state.passwordRegister,
            name: this.state.nameRegister
        })
    })
    .then(resp => resp.json())
    .then(user => {
        if(user){
            this.props.loadUser(user)
            this.props.onChangeRoute("Signin");
        }
        
    })
    
}


    render(){
        
        return(

            <div className="center flex justify-center">
                <article className="br3 shadow-5 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
                    <main className="pa4 black-80">
                        <form className="measure">
                                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0">Register</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                                    <input 
                                    onChange={this.nameInputRegister}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="name" 
                                    name="name"  id="name" 
                                    autoComplete="off"/>
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input 
                                    onChange={this.emailInputRegister}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address"/>
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input 
                                    onChange={this.passwordInputRegister}
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    id="password" 
                                    autoComplete="on"/>
                                </div>
                                
                                </fieldset>
                                <div className="">
                                <input onClick={this.RegisterSubmitForm} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
                                </div>
    
                            </form>
                    </main>
                </article>
            </div>
        );
    

    }
    
};



export default Register;