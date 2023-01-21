import axios from "axios";
import { BASEURL } from "../constants";

export const getAllUsers = async () => {
  try {
    const response = await axios({
      method: "get",
      url: `${BASEURL}/users/`,
    });
    return response;
  } catch (e) {
    console.log(e.response.data);
  }
};

export const getUser = async (user) => {
  try {
    const response = await axios({
      method: "get",
      url: `${BASEURL}/users/${user}`,
    });
    return response;
  } catch (e) {
    console.log(e.response.data);
  }
};

/**
 * sends api request for all classes
 * Made by a certain user
 * @param {text} user
 */
export const getClasses = async (user) => {
  try {
    console.log(`GET REQUEST FOR ALL CLASSES, THE LINK IS /classes/${user}`);
    const response = await axios({
      method: "get",
      url: `${BASEURL}/classes/${user}`,
    });
    return response;
  } catch (e) {
    console.log(e.response.data);
  }
};

export const getClass = async (classID) => {
  try {
    const response = await axios({
      method: "get",
      url: `${BASEURL}/classes/class/${classID}`,
    });
    return response;
  } catch (e) {
    console.log(e.response.data);
  }
};

export const getDecks = async (classID) => {
  try {
    const response = await axios({
      method: "get",
      url: `${BASEURL}/decks/${classID}`,
    });
    return response;
  } catch (e) {
    console.log(e);
    // did this because on refresh router doesnt work properly
    // returning an empty list solves the issue by allowing the code
    // tp work properly on the first mount
    return { data: [] };
  }
};

export const getDeck = async (deckID) => {
  try {
    const response = await axios({
      method: "get",
      url: `${BASEURL}/decks/deck/${deckID}`,
    });
    return response;
  } catch (e) {
    console.log(e);
    // did this because on refresh router doesnt work properly
    // returning an empty list solves the issue by allowing the code
    // tp work properly on the first mount
    return { data: [] };
  }
};

export const getDecksFromUsername = async (username) => {
  try {
    const response = await axios({
      method: "get",
      url: `${BASEURL}/decks/count/${username}`,
    });
    return response;
  } catch (e) {
    console.log(e);
    // did this because on refresh router doesnt work properly
    // returning an empty list solves the issue by allowing the code
    // tp work properly on the first mount
    return { data: [] };
  }
};

export const getCards = async (deckID) => {
  try {
    const response = await axios({
      method: "get",
      url: `${BASEURL}/cards/${deckID}`,
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};
