import { setGlobalState, useGlobalState } from "." 
import { base_api } from "../constant/url"

export const setLoading=(val)=>{
    setGlobalState('loading', val)
}

export const setAuth =(data)=>{
    setGlobalState("auth", data)
}


export const setNewApp = (val)=>{
    setGlobalState("newApp", val)
}

export function storeToken(token){
    localStorage.setItem('token', JSON.stringify(token));
}
export const getAllApps =()=>{
    try{
        setLoading(true)
        const token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token })
            };
            fetch(`${base_api}/app/getAll`, requestOptions)
                .then(response => response.json())
                .then(async data => {
                    setLoading(false)
                    if(data&&data.data){
                    setGlobalState("allApps", data.data)
                }
                })
                .catch(err => {
                    setLoading(false)
                })
        }
        else    setLoading(false)
    }
    catch(err){
        setLoading(false)
    }
}
export function retriveToken(){
    try{
        setLoading(true)
        const token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token })
            };
            fetch(`${base_api}/user/loginWIthToken`, requestOptions)
                .then(response => response.json())
                .then(async data => {
                    setLoading(false)
                    if(data&&data.user){
                    setGlobalState("auth", data.user)
                }
                })
                .catch(err => {
                    setLoading(false)
                })
        }
        else    {
            setLoading(false)
        }
    }
    catch(err){
        setLoading(false)

    }
}

export function getToken(){
    const token = JSON.parse(localStorage.getItem('token'));
    return token
}

export const getAppFromId = (id) =>{
    try{
        setLoading(true)
        const token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, id })
            };
            fetch(`${base_api}/app/getApp`, requestOptions)
                .then(response => response.json())
                .then(async data => {
                    setLoading(false)
                    
                    if(data&&data.data){
                    var app = data.data
                  
                    
                }
                })
                .catch(err => {
                    setLoading(false)
                })
        }
        else  {  
            setLoading(false)
        }
    }
    catch(err){
        setLoading(false)
    }
}