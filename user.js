import React, { Component } from 'react';
import FormFields from '../widgets/Forms/formFields';
import { firebaseDB } from '../firebase';
import { Redirect } from "react-router-dom";

class User extends Component {

    state = {
        status: true,
        error: false,
        formData:{
            name:{
                element:'input',
                value:'',
                label:true,
                labelText:'Name',
                config:{
                    name:'name_input',
                    type:'text',
                    placeholder:'Enter your name'
                },
                validation:{
                    required:true,
                    minLen:5
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            lastname:{
                element:'input',
                value:'',
                label:true,
                labelText:'Lastname',
                config:{
                    name:'lastname_input',
                    type:'text',
                    placeholder:'Enter your Lastname'
                },
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            username:{
                element:'input',
                value:'',
                label:true,
                labelText:'Username',
                config:{
                    name:'username_input',
                    type: 'text',
                    placeholder: "Enter username"
                },
                validation:{
                    required:true
                },
                valid:true
            },
            password:{
                element:'input',
                value:'',
                label:true,
                labelText:'Password',
                config:{
                    name:'password_input',
                    type: 'password',
                    placeholder: "Enter password"
                },
                validation:{
                    required:true
                },
                valid:true
            },
            age:{
                element:'select',
                value:'',
                label:true,
                labelText:'Age',
                config:{
                    name:'age_input',
                    options:[
                        {val:'1',text:'10-20'},
                        {val:'2',text:'20-30'},
                        {val:'3',text:'+30'}
                    ]
                },
                validation:{
                    required:false
                },
                valid:true
            }
        }
    }

    updateForm = (newState) => {
        this.setState({
            formData:newState
        })
    }

    submitForm = (event) => {
        event.preventDefault();
        let dataToSubmit = {};
        let formIsValid = true;
        
        let firebaseUsers = []
        
        console.log("usernames - ", firebaseUsers)
        for(let key in this.state.formData){
            dataToSubmit[key] = this.state.formData[key].value;
        }
        firebaseDB.ref('users').on('value', (snapshot) => {
            console.log("triggered")
            snapshot.forEach((child) => {
                console.log("child", child.val())
                firebaseUsers.push(child.val().username)
                if(child.val().username == dataToSubmit["username"])
                console.log("data firebase", firebaseUsers)
            })
            localStorage.setItem('firebaseUsers', firebaseUsers);
        });
        let users = localStorage.getItem('firebaseUsers').split(',')
        console.log("local status", users)
        dataToSubmit["timestamp"] = Date.now();
        dataToSubmit["session"] = true;

        for(let key in this.state.formData){
            formIsValid = this.state.formData[key].valid && formIsValid;
        }


        if(formIsValid && !(users.includes(dataToSubmit["username"])) ){
            firebaseDB.ref('users').push(dataToSubmit)
            .then(()=>{
               console.log('new user added') 
            }).catch( e =>{
                console.log(e)
            })
            localStorage.setItem('username', dataToSubmit["username"]);
            localStorage.setItem('status', false)
            
            firebaseDB.ref("users").once("value")
            .then((snapshot) => {
                let id = '';
                snapshot.forEach((child) => {
                    
                    if(child.val().username == dataToSubmit["username"] && child.val().password == dataToSubmit["password"])
                    {
                        console.log("logged in ")
                        id = child.key
                        localStorage.setItem('id', id);

                    }
                })
            })
            this.setState({status: false, error: false})
        }
        else{
            this.setState({error: true})
        }
    
    }

    render(){
        if(!!localStorage.getItem('username') && this.state.username !== localStorage.getItem('username')){
            let t = localStorage.getItem('status') === "false"?false:true
            this.setState({username: localStorage.getItem('username'), status: t})
            
        }
        return(
            
            <div className="sign_up">
                <h2>Sign up form</h2>
                { this.state.status?
                <form onSubmit={this.submitForm}>

                    <FormFields
                        formData={this.state.formData}
                        onblur={(newState) => this.updateForm(newState)}
                        change={(newState) => this.updateForm(newState)}
                    />

                    <button type="submit">Submit</button>
                </form>
                :
                 <Redirect to="/" />
                }
                {
            this.state.error?
            <div class="alert">

            <strong>Error!</strong> Duplicate username found.
            </div>
            :
            null
            }
            </div>
            
        )
    }
}

export default User;
