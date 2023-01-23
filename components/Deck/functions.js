import { deleteDeck } from "../../api/deleteRequests";

export const callDeleteDeck = async ({
  contentID,
  contentSetter,
  modalSetter,
  setDisplayToast,
}) => {
  console.log("deck id is", contentID);
  const response = await deleteDeck(contentID);
  console.log("IN DELETE DECK IN CLASS DECKS, THE RESPONSE IS", response);
  if (response.status === 200) {
    let x;
    setDisplayToast((prev) => {
      x = prev;
      console.log("PREVVVVV IS", prev);
      return !prev;
    });
    contentSetter((prev) => prev.filter((deck) => deck.id !== contentID));
    modalSetter(false);
    console.log("DISPLAY DELETE DECK TOAST", setDisplayToast);

    console.log("XXXX", !x);
  }
};
