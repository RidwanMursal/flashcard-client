import styles from "./EditCard.module.css";
import { useState, useRef, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "../Modal";
import { deleteCard } from "../../api/deleteRequests";
import { DELETE_CARD_TITLE, DELETE_MESSAGE } from "../../modalMessages";

/**
 * auto adjusts height of text area when overflow-y occurs
 * @param {element} e
 */
const autoResize = (element) => {
  console.log("THIS IS E", element);
  element.style.height = 0;
  element.style.height = element.scrollHeight + "px";
};

// const save = (prev, current) => {
//   if (current === false && prev === true ) {
//     alert("left focus")
//   }

// }

const focused = (element) => {
  element.setAttribute("data-focused", "true");
};

const setCards = (setCardsState, question, answer, id) => {
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

const callDeleteCard = async ({
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
    alert("it worked");
    modalSetter(false);
  }
};

const closeModal = ({ modalSetter }) => {
  modalSetter(false);
};

const index = ({ card, setCardsState }) => {
  const { question, answer, id } = card;
  const [inFocus, setInFocus] = useState(false);
  const [questionState, setQuestionState] = useState(question);
  const [answerState, setAnswerState] = useState(answer);
  const answerRef = useRef();
  const questionRef = useRef();
  const focusRef = useRef(null);
  const [deleteCardModal, setDeleteCardModal] = useState(false);

  // useAutosizeTextArea(questionRef.current, questionState )

  // if you would like to save every time user changes input
  // have a useeffect that goes off every time question or answer state changes
  // and send an update request to api. But first check if the div is out of focus.

  useEffect(() => {
    autoResize(questionRef.current);
    autoResize(answerRef.current);
    // document.querySelectorAll(`.${styles.ta}`).forEach(element => {
    //   autoResize(element)
    // })
  }, []);

  useEffect(() => {
    setCards(setCardsState, questionState, answerState, id);
    //save(focusRef.current, inFocus)
    // document.querySelectorAll(`.${styles.ta}`).forEach(element => {
    //   autoResize(element)
    // })
  }, [answerState, questionState]);

  return (
    <div
      className={
        inFocus ? `${styles.focus} ${styles.container}` : styles.container
      }
    >
      <AiOutlineClose
        className={styles.close}
        onClick={() => setDeleteCardModal(true)}
      />
      <Modal
        contentSetter={setCardsState}
        openModal={deleteCardModal}
        modalSetter={setDeleteCardModal}
        contentID={id}
        title={DELETE_CARD_TITLE}
        message={DELETE_MESSAGE}
        noInput={true}
        buttons={[
          { text: "No, Go Back!", onClick: closeModal },
          { text: "Yes, Delete.", onClick: callDeleteCard },
        ]}
      />

      <div className={styles.question} data-question="Q">
        <textarea
          onFocus={(e) => {
            focusRef.current = false;
            setInFocus(true);
          }}
          onBlur={(e) => {
            focusRef.current = true;
            setInFocus(false);
          }}
          ref={questionRef}
          name=""
          id="question"
          value={questionState}
          className={styles.ta}
          onChange={(e) => {
            autoResize(e.target);
            setQuestionState(e.target.value);
          }}
        ></textarea>

        {/* <div className={styles.button}>
          <button tabIndex="-1" className={styles.picture_button}>
            hello
          </button>
          <button tabIndex="-1" className={styles.audio_button}></button>
          
        </div> */}
      </div>

      <div className={styles.answer} data-answer="A">
        <textarea
          onFocus={() => setInFocus(true)}
          onBlur={(e) => setInFocus(false)}
          ref={answerRef}
          name=""
          id="answer"
          value={answerState}
          className={styles.ta}
          onChange={(e) => {
            autoResize(e.target);
            setAnswerState(e.target.value);
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default index;
