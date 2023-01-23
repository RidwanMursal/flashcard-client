import styles from "./EditSection.module.css";
import EditCard from "../EditCard/index";
import Toast from "../Toast";
import { AiOutlinePlus } from "react-icons/ai";
import { MdAddCircle } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import { patchCard } from "../../api/pachRequests";
import { postCard } from "../../api/postRequests";
import AddItem from "../AddItem";
import { TOAST_CARDS_SAVED } from "../../modalMessages";
import { save } from "./functions";

// export const patchMultipleCards = async (cards) => {
//   if (cards.length < 1) return -1;
//   for (let i = 0; i < cards.length; i++) {
//     const card = cards[i];
//     console.log("HERE IS THE CARD", card);
//     const data = {
//       question: card.question,
//       answer: card.answer,
//       deckID: card.deck_id,
//     };
//     const response = await patchCard(card.id, data);
//     console.log(response);
//   }
// };

// export const postMultipleCards = async (cards) => {
//   if (cards.length < 1) return -1;
//   for (let i = 0; i < cards.length; i++) {
//     const card = cards[i];
//     const data = {
//       question: card.question,
//       answer: card.answer,
//       deckID: card.deck_id,
//     };
//     console.log("HERE IS THE DATA", data);
//     const response = await postCard(data);
//     console.log(response);
//   }
// };

// const save = async (cards, setCards, setDisplayToast) => {
//   setCards((prev) => {
//     console.log("CARDS IN SAVE PRE FILTER", prev);
//     // filter out empty cards
//     const newCards = prev.filter(
//       (card) => card.question !== "" && card.answer !== ""
//     );
//     console.log("HERE ARE THE CARDS POST FILER", newCards);
//     //  switch bettween the post and patch requests
//     const postCards = newCards.filter((card) => card.operation === "post");
//     const patchCards = newCards.filter((card) => card.operation === "patch");
//     console.log("HERE ARE THE POSTCARDS", postCards);
//     console.log("HERE ARE THE PATCH CARDS", patchCards);

//     patchMultipleCards(patchCards);
//     postMultipleCards(postCards);
//     setDisplayToast(true);

//     return newCards;
//   });
// };

const EditSection = ({ cards, deckID }) => {
  console.log("CARDS CHANGED HERE ARE CARDS", cards);
  const [displayToast, setDisplayToast] = useState(false);
  const patchCards = cards.map((card) => {
    return { ...card, operation: "patch" };
  });
  const [cardsState, setCardsState] = useState(patchCards);
  useEffect(() => {
    // If there are not  cards in deck, add a new empty card
    // so user sees inputs
    if (!cardsState || cardsState?.length === 0) {
      setCardsState([
        { question: "", answer: "", deck_id: deckID, operation: "post" },
      ]);
    }
  }, []);

  useEffect(() => setCardsState(patchCards), [cards]);

  return (
    <div className={styles.container}>
      {cardsState.map((card) => (
        <EditCard card={card} setCardsState={setCardsState} key={card.id} />
      ))}
      <div className={styles.wrapper}>
        <MdAddCircle
          size={30}
          className={styles.plus}
          onClick={() =>
            setCardsState((prev) => {
              // if user already added a new card but hasn't
              // inputted anything yet, don't add a new card
              if (
                prev.length > 0 &&
                !prev.slice(-1)[0].answer &&
                !prev.slice(-1)[0].question
              )
                return prev;
              return [
                ...prev,
                {
                  question: "",
                  answer: "",
                  deck_id: deckID,
                  operation: "post",
                  id: Date.now(), // temporary id
                },
              ];
            })
          }
        />
        <button
          className={styles.save}
          onClick={() => save(cardsState, setCardsState, setDisplayToast)}
        >
          Save
        </button>
        <Toast
          show={displayToast}
          setShow={setDisplayToast}
          message={TOAST_CARDS_SAVED}
        />
      </div>
    </div>
  );
};

export default EditSection;
