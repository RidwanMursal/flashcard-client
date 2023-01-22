import React from "react";
import Sidebar from "../../../../../components/Sidebar";
import MobileHeader from "../../../../../components/MobileHeader";
import LoadingScreen from "../../../../../components/LoadingScreen";
import StudyCards from "../../../../../components/StudyCards";
import styles from "../../../../../styles/Home.module.css";
import {
  getDecks,
  getDeck,
  getCards,
  getUser,
} from "../../../../../api/getRequests";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import useWindowDimensions from "../../../../../hooks/useWindowDimensions";
import { useRouter } from "next/router";

/* Randomize array in-place using Durstenfeld shuffle algorithm */
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

const Study = ({ decks, currDeck, username, class_ }) => {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useAxiosPrivate();
  const [userData, setUserData] = useState([]);
  const [cards, setCards] = useState(null);
  const [deck, setDeck] = useState(null);

  useEffect(() => {
    console.log(cards);
    if (cards?.length > 0) setCards(shuffleArray(cards));
  }, [cards]);

  useEffect(() => {
    const callGetUser = async () => {
      console.log("username is", username);
      const user_ = await getUser(username);
      console.log(user_.data);
      console.log("HERE IS USER DATA", user_.data);
      setUserData(user_.data[0]);
    };

    const callGetCards = async () => {
      console.log("deck id is", currDeck);
      const cardsResponse = await getCards(currDeck);
      console.log("HERE IS cards DATA", cardsResponse.data);
      if (cardsResponse.data.length === 0)
        router.replace(`/dashboard/${username}/${class_}/${currDeck}/edit`);
      setCards(cardsResponse.data);
    };

    const callGetDeck = async () => {
      console.log("deck id is", currDeck);
      const deckResponse = await getDeck(currDeck);
      console.log("HERE IS deck DATA", deckResponse.data);
      setDeck(deckResponse.data[0].name);
    };

    callGetUser();
    callGetCards();
    callGetDeck();
  }, []);

  useEffect(() => {
    if (width && cards && deck && userData) setLoading(false);
    // if (cards.length === 0)
    //   router.replace(`/dashboard/${username}/${class_}/${currDeck}/edit`);
  }, [width, cards, deck, userData]);

  // if (!deck) return;

  // if (cards.length === 0 || userData.length === 0) return <h1>Loading...</h1>

  return (
    <>
      <LoadingScreen loading={loading} />
      {width && cards && deck && userData ? (
        <div className={styles.container}>
          {width && width > 900 ? (
            <Sidebar
              username={username}
              profilePicture={userData.profile_picture}
            />
          ) : (
            <MobileHeader username={username} />
          )}
          <StudyCards cards={cards} deck={deck} />
        </div>
      ) : null}
    </>
  );
};

export const getServerSideProps = async ({
  params: { user, class_, deck },
}) => {
  return { props: { username: user, class_, currDeck: deck, class_ } };
  // console.log(`IN GET SERVER PROPS FOR STUDY PAGE, user: ${user} class: ${class_} deck : ${deck}`)
  // // retrieve all decks for this class, and all cards from this specific deck
  // const decks = await getDecks(class_)
  // const cards = await getCards(deck)
  // const randomCards = shuffleArray(cards.data)
  // console.log("here are the decks", decks.data)
  // console.log("here are the cards", cards.data)

  //return {props: {username: user, class_, decks: decks.data, cards: cards.data, currDeck: deck, randomCards}}
};

export default Study;
