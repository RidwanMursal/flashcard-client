import React from "react";
import styles from "./StudyCard.module.css";
import { useState } from "react";
import { switchCards, destroyCard } from "./functions";

const StudyCard = ({
  card,
  numberOfCards,
  setCardsCompleted,
  setCorrectAnswers,
}) => {
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [switchCard, setSwitchCard] = useState(false);
  //const [displayCard, setDisplayCard] = useState(cardsCompleted == index)

  // if (!displayCard )return null
  return (
    <div
      className={
        switchCard ? `${styles.container} ${styles.flip}` : styles.container
      }
      onAnimationEnd={(e) =>
        destroyCard(
          e,
          styles,
          setCardsCompleted,
          setSwitchCard,
          setAnswerRevealed
        )
      }
    >
      <div className={styles.card}>
        <div className={styles.color}></div>
        <div className={styles.question_container}>
          <p>Q</p>
          {card.question}
          <div
            className={answerRevealed ? styles.answer_container : styles.hidden}
          >
            <p>A</p>
            {card.answer}
          </div>
        </div>
      </div>

      <div className={switchCard ? styles.hidden : null}>
        <button
          className={answerRevealed ? styles.hidden : styles.button}
          onClick={() => setAnswerRevealed(true)}
        >
          Reveal Answer
        </button>

        <div className={answerRevealed ? styles.answered : styles.hidden}>
          <p className={styles.score_prompt}>
            Are you comfertable with this card?
          </p>
          <button
            className={styles.button}
            onClick={() => {
              switchCards(setSwitchCard, numberOfCards, setCardsCompleted);
              setCorrectAnswers((prev) => (prev += 1));
            }}
          >
            Yes
          </button>
          <button
            className={styles.button}
            onClick={() =>
              switchCards(setSwitchCard, numberOfCards, setCardsCompleted)
            }
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudyCard;
