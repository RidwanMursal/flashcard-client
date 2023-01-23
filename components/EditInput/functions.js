import { patchClass, patchDeck } from "../../api/pachRequests";

export const saveClass = async ({
  class_,
  setClass,
  inputValue,
  setIsEditing,
  username,
}) => {
  const updatedClass = { ...class_, class: inputValue };
  console.log("here is the updated class", updatedClass);
  const data = { className: updatedClass.class, username: username };
  const response = await patchClass(updatedClass.id, data);
  console.log("after response", response);
  if (response.status === 200) {
    setClass(response.data[0]);
    setIsEditing(false);
  }

  return;
};

export const saveDeck = async ({
  deck,
  setClass,
  inputValue,
  setIsEditing,
}) => {
  console.log("SAVEEEEE");
  const updatedDeck = { ...deck, name: inputValue };
  console.log("here is the updated deck", updatedDeck);
  const data = { name: updatedDeck.name, classID: updatedDeck.class_id };
  console.log(`name = ${data.name} classID = ${data.classID}`);
  const response = await patchDeck(updatedDeck.id, data);
  console.log("after response", response);
  if (response.status === 200) {
    setClass(response.data[0]);
    setIsEditing(false);
  }

  return;
};

export const closeInput = (content, setInputValue, setIsEditing) => {
  setInputValue(content.name ? content.name : content.class);
  setIsEditing(false);
};
