import { postDeck } from "../../api/postRequests";

export const addDeck = async ({
  data,
  router,
  contentSetter,
  setInputValue,
  modalSetter,
  setDisplayToast,
}) => {
  const { className: deckName } = data;
  const args = { classID: router.query.class_, name: deckName };
  const response = await postDeck(args);
  console.log("IN CLASSDECKS ADD CLASS, THIS WAS THE RESPONSE", response.data);
  if (response.status === 200) {
    contentSetter((prev) => [...prev, response.data[0]]);
    setInputValue("");
    modalSetter(false);
    setDisplayToast(true);
  }
  return;
};
