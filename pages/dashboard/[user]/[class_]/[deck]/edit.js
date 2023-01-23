import { useEffect, useState } from "react";
import Sidebar from "../../../../../components/Sidebar/index";
import MobileHeader from "../../../../../components/MobileHeader/index";
import LoadingScreen from "../../../../../components/LoadingScreen";
import DeckPreviewHeader from "../../../../../components/DeckPreviewHeader/index";
import EditSection from "../../../../../components/EditSection/index";
import styles from "../../../../../styles/EditPage.module.css";
import { getCards, getDecks, getUser } from "../../../../../api/getRequests";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import useWindowDimensions from "../../../../../hooks/useWindowDimensions";

const Edit = ({ currDeck, username, class_ }) => {
  const [loading, setLoading] = useState(true);
  const [decks, setDecks] = useState(null);
  const [cards, setCards] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const { width } = useWindowDimensions();
  console.log(!decks);
  const axios = useAxiosPrivate();

  useEffect(() => {
    const callGetDecks = async () => {
      console.log("current class is", class_);
      const decksResponse = await getDecks(class_);
      console.log("HERE IS DECK DATA", decksResponse.data);
      setDecks(decksResponse.data);
    };

    const callGetCards = async () => {
      console.log("deck id is", currDeck);
      const cardsResponse = await getCards(currDeck);
      console.log("HERE IS cards DATA", cardsResponse.data);
      setCards(cardsResponse.data);
    };

    const callGetUser = async () => {
      console.log("username is", username);
      const user_ = await getUser(username);
      console.log(user_.data);
      console.log("HERE IS USER DATA", user_.data);
      setProfilePicture(user_.data[0].profile_picture);
    };
    callGetDecks();
    callGetCards();
    callGetUser();
  }, []);

  useEffect(() => {
    const callGetCards = async () => {
      console.log("deck id is", currDeck);
      const cardsResponse = await getCards(currDeck);
      console.log("HERE IS cards DATA", cardsResponse.data);
      setCards(cardsResponse.data);
    };
    callGetCards();
  }, [currDeck]);

  useEffect(() => {
    if (decks && cards && width) setLoading(false);
  });

  return (
    <>
      <LoadingScreen loading={loading} />
      {decks && cards && width ? (
        <div className={styles.container}>
          {width && width > 900 ? (
            <Sidebar username={username} profilePicture={profilePicture} />
          ) : (
            <MobileHeader username={username} profilePicture={profilePicture} />
          )}

          <div className={styles.content}>
            <DeckPreviewHeader
              class_={class_}
              currDeck={currDeck}
              decks={decks}
              username={username}
            />
            <EditSection cards={cards} deckID={currDeck} />
          </div>
        </div>
      ) : null}
    </>
  );
};

export const getServerSideProps = async ({
  params: { user, class_, deck },
}) => {
  // console.log(`IN GET SERVER PROPS FOR EDIT PAGE, user: ${user} class: ${class_} deck : ${deck}`)
  // // retrieve all decks for this class, and all cards from this specific deck
  // const decks = await getDecks(class_)
  // const cards = await getCards(deck)
  // console.log("here are the decks", decks.data)
  // console.log("here are the cards", cards.data)

  return { props: { username: user, class_, currDeck: deck } };
};
export default Edit;
