import StudyCard from "../StudyCard";
import styles from "./StudyCards.module.css";
import { useState } from "react";
import StudyResults from "../StudyResults";

// const cards = [{
//     question: "4 main concepts",
//     answer: `a
//     Encapsulation- the idea of bundling data and methods that work on that data within one unit

//     Abstraction-

//     Inheritance

//     Polymorphism

//     (aside: overloading: using same method definition but changing the parameters)`
// }, {
//   question: "4 main concepts",
//   answer: `a
//   Encapsulation- the idea of bundling data and methods that work on that data within one unit

//   Abstraction-

//   Inheritance

//   Polymorphism

//   (aside: overloading: using same method definition but changing the parameters)`
// }]
const StudyCards = ({ cards, deck }) => {
  const [cardsCompleted, setCardsCompleted] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const card = cards[cardsCompleted];
  console.log("CARD IS ", card);
  console.log("STYLES", styles.container);
  console.log("DECK IS", deck);
  return (
    <div className={styles.container}>
      <div className={styles.header_container}>
        <p>
          Deck: <span className={styles.bold}>{deck}</span>
        </p>
        <p>
          Card:{" "}
          <span className={styles.bold}>
            {`${cardsCompleted + 1}/${cards.length}`}
          </span>
        </p>
      </div>
      <div className={styles.cards_container}>
        {card ? (
          <StudyCard
            key={card.id}
            card={card}
            cardsCompleted={cardsCompleted}
            numberOfCards={cards.length}
            setCardsCompleted={setCardsCompleted}
            correctAnswers={correctAnswers}
            setCorrectAnswers={setCorrectAnswers}
          />
        ) : null}

        {/* {cards.map( (card, i) => <StudyCard card={card} cardsCompleted={cardsCompleted} numberOfCards={cards.length} setCardsCompleted={setCardsCompleted} correctAnswers={correctAnswers} setCorrectAnswers={setCorrectAnswers} index={i}/>)} */}
        {cardsCompleted > 0 && cardsCompleted == cards.length ? (
          <StudyResults
            totalCards={cards.length}
            correctAnswers={correctAnswers}
          />
        ) : null}
      </div>
    </div>
  );
};

export default StudyCards;
