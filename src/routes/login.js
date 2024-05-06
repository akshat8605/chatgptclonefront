import React, { useState } from 'react'
import Login from '../components/login';
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, gitProvider, provider } from '../util/firebase';
import { base_api } from '../constant/url';
import { setAuth, storeToken } from '../state/functions';
import { useNavigate } from "react-router-dom";

const LoginLayout =()=>{
    const [load, setLoading] = useState(false)
    const navigate = useNavigate();


    const handleClose=()=>{
    navigate(`/`);
        
    }
    const signinwithgoogle = () => {
        setLoading(true)
        signInWithPopup(auth, provider).then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            register(user.email, user.displayName)
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch(alert);
    }
    const signInWithGithub=()=>{
        signInWithPopup(auth, gitProvider)
        .then((result) => {
          // This gives you a GitHub Access Token. You can use it to access the GitHub API.
          const credential = GithubAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
      
          // The signed-in user info.
          const user = result.user;
          register(user.email, user.displayName)

          // IdP data available using getAdditionalUserInfo(result)
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GithubAuthProvider.credentialFromError(error);
          console.log(errorMessage)
          // ...
        });
    }

    const register = (emaild, named) => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: emaild, name: named })
        };
        fetch(`${base_api}/user/register`, requestOptions)
            .then(response => response.json())
            .then(async data => {
                handleClose(false)
                setLoading(false)
                if(data&&data.user){
                setAuth(data.user)
            }
            if(data&&data.user&&data.user.token){
                storeToken(data.user.token)
            }
                
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }

    return (
        <Login signinwithgoogle={signinwithgoogle} signInWithGithub={signInWithGithub}/>
    )
    
}

export default LoginLayout;