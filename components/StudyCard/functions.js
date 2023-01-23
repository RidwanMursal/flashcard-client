export const switchCards = (setSwitchCard) => {
  setSwitchCard(true);
};

export const destroyCard = (
  e,
  styles,
  setCardsCompleted,
  setSwitchCard,
  setAnswerRevealed
) => {
  if (e.animationName === styles.animate_flip) {
    setSwitchCard(false);
    setCardsCompleted((prev) => (prev += 1));
    setAnswerRevealed(false);
  }
};
