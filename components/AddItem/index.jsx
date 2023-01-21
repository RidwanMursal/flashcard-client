import styles from "./AddItem.module.css";
import { MdAddCircle } from "react-icons/md";
import Modal from "../Modal";
import { useState, useEffect } from "react";
import { postDeck, postClass } from "../../api/postRequests";
import { postMultipleCards, patchMultipleCards } from "../EditSection";

const addClass = async ({
  username,
  data,
  contentSetter,
  setInputValue,
  modalSetter,
}) => {
  console.log("this is the user", username);
  const response = await postClass(username, data);
  console.log("IN SIDEBAR ADD CLASS, THIS WAS THE RESPONSE", response.data);
  if (response.status === 200) {
    contentSetter((prev) => [...prev, response.data[0]]);
    setInputValue("");
    modalSetter(false);
  }
  return;
};

const addDeck = async ({
  data,
  router,
  contentSetter,
  setInputValue,
  modalSetter,
}) => {
  const { className: deckName } = data;
  const args = { classID: router.query.class_, name: deckName };
  const response = await postDeck(args);
  console.log("IN CLASSDECKS ADD CLASS, THIS WAS THE RESPONSE", response.data);
  if (response.status === 200) {
    contentSetter((prev) => [...prev, response.data[0]]);
    setInputValue("");
    modalSetter(false);
  }
  return;
};

const AddItem = ({ message, purpose, contentSetter, collapsed }) => {
  const [addModal, setAddModal] = useState(false);
  const [props, setProps] = useState({});
  const addClassFunctions = {
    title: "Make a new Class",
    message: "Add Class",
    buttons: [{ text: "Submit", onClick: addClass }],
  };
  const addDeckFunctions = {
    title: "Make a new deck",
    message: "Add Deck",
    buttons: [{ text: "Submit", onClick: addDeck }],
  };
  //   const addCardFunctions = {
  //     title: "Make a new deck",
  //     message: "Add Deck",
  //     buttons=[{ text: "Submit", onClick: addDeck }]
  //   };

  // Based on purpose prop, find correct props to pass down to modal
  useEffect(() => {
    if (purpose === "add class")
      setProps((prev) => {
        return { ...prev, ...addClassFunctions };
      });
    else if (purpose === "add deck")
      setProps((prev) => {
        return { ...prev, ...addDeckFunctions };
      });
  }, []);

  //else setFunctions(prev => {return {...prev, ...addCardFunctions}})

  if (props.buttons) {
    return (
      <div className={styles.container}>
        <MdAddCircle
          className={styles.plus}
          size={35}
          onClick={() => {
            setAddModal(true);
          }}
        />
        {message}
        <Modal
          contentSetter={contentSetter}
          openModal={addModal}
          modalSetter={setAddModal}
          title={props.title}
          message={props.message}
          buttons={props.buttons}
        />
      </div>
    );
  }
};

export default AddItem;
