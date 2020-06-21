import React, { Component } from 'react';
import { firebaseDB } from '../firebase';
import { Redirect } from "react-router-dom";

class Login extends Component {

    state = {
        status:true,
        username:'',
        password: '',
        error: false
    }
    handleUserNameChange = (event) => {
        this.setState({
            username:event.target.value
        })
    }

    handlePasswordChange = (event) => {
        this.setState({
            password:event.target.value
        })
    }

    onshandler = (event) =>{
        event.preventDefault();

        console.log(this.state)
    }

    // changeState = () => {
    //     let st = localStorage.getItem('status');
    //     let un = localStorage.getItem('username');
    //     this.setState({status: st, username: un})
    // }
    // componentWillMount(){
    //     console.log("here", localStorage.getItem('username'))
    //     let st = localStorage.getItem('status');
    //     let un = localStorage.getItem('username');
    //     this.setState({status: st, username: un})
 
    // }
    signIn = () => {
        firebaseDB.ref("users").once("value")
        .then((snapshot) => {
            let id = '';
            snapshot.forEach((child) => {
                console.log("user checked ", child.val().password)
                console.log(this.state.username, "+++", this.state.status)
                if(child.val().username == this.state.username && child.val().password == this.state.password)
                {
                    console.log("inside if")
                    localStorage.setItem('username', this.state.username);
                    localStorage.setItem('status', false)
                    this.setState({status: false, error: false})
                    console.log("logged in ")
                    id = child.key
                    localStorage.setItem('id', id);
                    console.log(child.key, "this is id")
                    return null;
                }
            })
            if (id !== ''){
                firebaseDB.ref("users/"+id+"/session").set(true)
                // {<Redirect to="/" />}
                // window.location.href = "/"
            }
            else{
                this.setState({error: true})
            }
            // this.setState({error: true})
            // console.log("error not found")
        })
    
        // this.setState({status: false})
    }

    signOut = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('status');
        firebaseDB.ref("users/"+localStorage.getItem('id')+"/session").set(false)
        firebaseDB.ref("users/"+localStorage.getItem('id')+"/timestamp").set(Date.now())
        this.setState({status: true, username: '', error: false})
    }

    
    

    render(){
        if(!!localStorage.getItem('username') && this.state.username !== localStorage.getItem('username')){
            let t = localStorage.getItem('status') === "false"?false:true
            this.setState({username: localStorage.getItem('username'), status: t})
            
        }
        return(
            <div >
                { this.state.status?
                    <div className="sign_up">
                    <form onSubmit={this.onshandler}>
                        <div className="form_element">
                            <label>Enter username</label>
                            <input 
                                type="text"
                                onChange={this.handleUserNameChange}
                                value={this.state.name}
                            />
                        </div>
    
                        <div className="form_element">
                            <label>Enter password</label>
                            <input 
                                type="password"
                                onChange={this.handlePasswordChange}
                                value={this.state.lastname}
                            />
                        </div>
                    <button type="submit" onClick={ this.signIn }>Submit</button>
                    </form>
                </div>
                    :
                    <button onClick={ this.signOut }> Logout </button>
                }

                {
                    this.state.error?
                    <div class="alert">
                    
                    <strong>Error!</strong> No user found.
                    </div>
                    :
                    null
                }
            </div>
        )
    }
}

export default Login;
