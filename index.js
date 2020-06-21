import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import { firebase, firebaseDB } from './firebase';


const App = (props) =>{
    
    return(
        <BrowserRouter>
            <Routes {...props}/>
        </BrowserRouter>
    )
}

firebase.auth().onAuthStateChanged((user)=>{
    ReactDOM.render(<App auth={user}/>, document.getElementById('root'));
})

if(localStorage.getItem('id') !== null){
    setInterval(() => {
        console.log('Every 15 seconds - Interval triggered');
        firebaseDB.ref("users/"+localStorage.getItem('id')+"/timestamp").set(Date.now())
      }, 15000);

}

// window.addEventListener('beforeunload', function (e) { 

//     return "this is error"
//     localStorage.removeItem('username');
//     localStorage.removeItem('status');
//     firebaseDB.ref("users/"+localStorage.getItem('id')+"/session").set(false)
//     firebaseDB.ref("users/"+localStorage.getItem('id')+"/timestamp").set(Date.now())
// }); 

// window.addEventListener('beforeunload', function (e) {
//     console.log("Ths is the vent", e)
//     e.preventDefault();
//     e.returnValue = '';
// });
