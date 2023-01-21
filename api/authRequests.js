import axios from "axios"
import { BASEURL } from "../constants"



export const register = async (args) => {
    console.log("this is the args", args)
    try {
        const response = await axios({
            method: "post", 
            url: `${BASEURL}/auth/register`, 
            data: args
        })
        return response 
    } catch (e) {
        console.log(e.response)
        return(e.response)
    }
}


export const login = async (args) => {
    try {
        const response = await axios({
            method: "post", 
            url: `${BASEURL}/auth/login`, 
            data: args, 
            withCredentials: true
        })
        return response 
    } catch (e) {
        console.log(e.response)
        return(e.response)
    }
}

export const refresh = async (args) => {
    try {
        const response = await axios({
            method: "post", 
            url: `${BASEURL}/auth/refresh`, 
            data: args
        })
        return response 
    } catch (e) {
        console.log(e)
    }
}

export const deleteToken = async (args) => {
    try {
        const response = await axios({
            method: "delete", 
            url: `${BASEURL}/auth/logout`, 
            data: args
        })
        return response 
    } catch (e) {
        console.log(e)
    }
}



