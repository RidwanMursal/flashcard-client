import axios from "axios"
import { BASEURL } from "../constants"


export const postClass = async (user, args) => {
    try {
        const response = await axios({
            method: "post", 
            url: `${BASEURL}/classes/${user}`, 
            data: args
        })
        return response 
    } catch (e) {
        console.log(e)
    }
}

export const postDeck = async (args) => {
    try {
        const response = await axios({
            method: "post", 
            url: `${BASEURL}/decks/`, 
            data: args
        })
        return response 
    } catch (e) {
        console.log(e)
    }
}

export const postCard = async (args) => {
    try {
        const response = await axios({
            method: "post", 
            url: `${BASEURL}/cards/`, 
            data: args
        })
        return response 
    } catch (e) {
        console.log(e)
    }
}

