import React from "react";

class SignIn extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            emailSignin:"",
            passwordSignin:""
        }
    }
//read value from email and password inputbox
emailInput = (event)=>{
    this.setState({emailSignin: event.target.value})
}

passwordInput = (event)=>{
    this.setState({passwordSignin: event.target.value})
}
// create form submission to server for checking and route to home page
signInSubmitForm = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    // Rest of the code allows me to changeroute inside event promise
    fetch("http://localhost:3001/signin", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: this.state.emailSignin,
            password: this.state.passwordSignin
        })
    })
    .then(resp => resp.json())
    .then(user => {
        if(user.id){
            this.props.loadUser(user);
            this.props.onChangeRoute("home");
        }
        
    })
    
}
    render() {
        const {onChangeRoute} = this.props
        return(

            <div className="center flex justify-center">
                <article className="br3 shadow-5 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
                    <main className="pa4 black-80">
                        <form className="measure">
                                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" name="email-address" 
                                    id="email-address"
                                    onChange={this.emailInput}
                                     />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    id="password" 
                                    autoComplete="on"
                                    onChange={this.passwordInput}
                                    />
                                </div>
                                
                                </fieldset>
                                <div className="">
                                <input onClick={this.signInSubmitForm}//form submission
                                 className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                 type="submit" 
                                 value="Sign in"/>
                                </div>
                                <div className="lh-copy mt3 pointer">
                                <p onClick={()=>onChangeRoute("Register")} href="#0" className="f6 link dim black db">Register</p>
                                
                                </div>
                            </form>
                    </main>
                </article>
            </div>
        );
    }

};



export default SignIn;