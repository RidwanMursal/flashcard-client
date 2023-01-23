import styles from "./EditCard.module.css";
import { useState, useRef, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "../Modal";
import { deleteCard } from "../../api/deleteRequests";
import { DELETE_CARD_TITLE, DELETE_MESSAGE } from "../../modalMessages";
import { autoResize, setCards, callDeleteCard } from "./functions";

const closeModal = ({ modalSetter }) => {
  modalSetter(false);
};

const EditCard = ({ card, setCardsState }) => {
  const { question, answer, id } = card;
  const [inFocus, setInFocus] = useState(false);
  const [questionState, setQuestionState] = useState(question);
  const [answerState, setAnswerState] = useState(answer);
  const answerRef = useRef();
  const questionRef = useRef();
  const focusRef = useRef(null);
  const [deleteCardModal, setDeleteCardModal] = useState(false);

  useEffect(() => {
    autoResize(questionRef.current);
    autoResize(answerRef.current);
  }, []);

  useEffect(() => {
    setCards(setCardsState, questionState, answerState, id);
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
        operation={card.operation}
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

export default EditCard;
