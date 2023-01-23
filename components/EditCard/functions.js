import { deleteCard } from "../../api/deleteRequests";

export const autoResize = (element) => {
  console.log("THIS IS E", element);
  element.style.height = 0;
  element.style.height = element.scrollHeight + "px";
};

export const setCards = (setCardsState, question, answer, id) => {
  console.log(`IN SET CARDS STATES question: ${question} answer: ${answer}`);
  setCardsState((prev) => {
    return prev.map((card) => {
      console.log("HEYY THIS IS THE PREV", prev);
      console.log("HEYY THIS IS THE CARD", card);
      if (card.id === id) {
        card.question = question;
        card.answer = answer;
      }
      return card;
    });
  });
};

export const callDeleteCard = async ({
  contentID,
  contentSetter,
  modalSetter,
  operation,
}) => {
  if (operation === "post") {
    contentSetter((prev) => prev.filter((card) => card.id !== contentID));
    return;
  }
  console.log("in edit card, the card is is:", contentID);

  const response = await deleteCard(contentID);
  console.log("IN DELETE CARD IN CLASS DECKS, THE RESPONSE IS", response);
  if (response.status === 200) {
    console.log("ID IS", contentID);
    contentSetter((prev) => prev.filter((card) => card.id !== contentID));
    //alert("it worked");
    modalSetter(false);
  }
};
