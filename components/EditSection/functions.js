import { patchCard } from "../../api/pachRequests";
import { postCard } from "../../api/postRequests";

export const patchMultipleCards = async (cards) => {
  if (cards.length < 1) return -1;
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    console.log("HERE IS THE CARD", card);
    const data = {
      question: card.question,
      answer: card.answer,
      deckID: card.deck_id,
    };
    const response = await patchCard(card.id, data);
    console.log(response);
  }
};

export const postMultipleCards = async (cards) => {
  if (cards.length < 1) return -1;
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const data = {
      question: card.question,
      answer: card.answer,
      deckID: card.deck_id,
    };
    console.log("HERE IS THE DATA", data);
    const response = await postCard(data);
    console.log(response);
  }
};

export const save = async (cards, setCards, setDisplayToast) => {
  setCards((prev) => {
    console.log("CARDS IN SAVE PRE FILTER", prev);
    // filter out empty cards
    let newCards = prev.filter(
      (card) => card.question !== "" && card.answer !== ""
    );
    console.log("HERE ARE THE CARDS POST FILER", newCards);
    //  switch bettween the post and patch requests
    const postCards = newCards.filter((card) => card.operation === "post");
    const patchCards = newCards.filter((card) => card.operation === "patch");
    console.log("HERE ARE THE POSTCARDS", postCards);
    console.log("HERE ARE THE PATCH CARDS", patchCards);

    patchMultipleCards(patchCards);
    postMultipleCards(postCards);
    setDisplayToast(true);

    // set all prior post cards to patch cards as they have now been
    // added to the db
    newCards = newCards.map((card) => {
      return { ...card, operation: "patch" };
    });

    return newCards;
  });
};
