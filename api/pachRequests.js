import axios from "axios"
import { BASEURL } from "../constants"



export const patchClass = async (classID, args) => {
    console.log("in patch deck, here is the class id and args", classID, args)
    try {
        const response = await axios({
            method: "patch", 
            url: `${BASEURL}/classes/${classID}`, 
            data: args
        })
        return response 
    } catch (e) {
        console.log(e)
    }
}

export const patchDeck = async (deckID, args) => {
    try {
        const response = await axios({
            method: "patch", 
            url: `${BASEURL}/decks/${deckID}`, 
            data: args
        })
        return response 
    } catch (e) {
        console.log(e)
    }
}

export const patchCard = async (cardID, args) => {
    try {
        const response = await axios({
            method: "patch", 
            url: `${BASEURL}/cards/${cardID}`, 
            data: args
        })
        return response 
    } catch (e) {
        console.log(e)
    }
}

export const patchClassImage = async (classID, image) => {
    try {
        console.log("FORM DATA")
        let formData = new FormData();
        formData.append('image', image.fileName);
        const response = await axios({
            method: "post", 
            url: `${BASEURL}/images/class/${classID}`, 
            data: formData
        })
        return response 
    } catch (e) {
        console.log(e)
    }
}

export const patchUserImage = async (userID, image) => {
    try {
        console.log("FORM DATA")
        let formData = new FormData();
        formData.append('image', image.fileName);
        const response = await axios({
            method: "post", 
            url: `${BASEURL}/images/user/${userID}`, 
            data: formData
        })
        return response 
    } catch (e) {
        console.log(e)
    }
}