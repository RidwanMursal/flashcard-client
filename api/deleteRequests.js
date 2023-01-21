import axios from "axios"
import { BASEURL } from "../constants"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { useEffect } from "react"






/**
 * sends api request for all classes 
 * Made by a certain user 
 * @param {text} user 
 */
export const deleteClass = async (classID) => {
    try {
        const response = await axios({
            method: "delete", 
            url: `${BASEURL}/classes/${classID}`
        })
        return response 
    } catch (e) {
        console.log(e)
    }
}

export const deleteDeck = async (deckID) => {
    try {
        const response = await axios({
            method: "delete", 
            url: `${BASEURL}/decks/${deckID}`
        })
        return response 
    } catch (e) {
        console.log(e)
    }
}

export const deleteCard = async (cardID) => {
    try {
        const response = await axios({
            method: "delete", 
            url: `${BASEURL}/cards/${cardID}`
        })
        return response 
    } catch (e) {
        console.log(e)
    }
}