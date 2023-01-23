import styles from "./StudyResults.module.css";
import ProgressProvider from "../ProgressProvider.jsx";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useEffect, useState } from "react";

const StudyResults = ({ totalCards, correctAnswers }) => {
  const percent = (correctAnswers / totalCards) * 100;
  const [valueEnd, setValueEnd] = useState(0);
  useEffect(() => {
    console.log("PERCENT", percent);
    setTimeout(() => setValueEnd(percent.toFixed(2)), 10);
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.h1}>CHECKPOINT REACHED</h1>
      </div>
      <div className={styles.progress_wrapper}>
        <ProgressProvider valueStart={10} valueEnd={valueEnd}>
          {(value) => <CircularProgressbar value={value} text={`${value}%`} />}
        </ProgressProvider>
      </div>

      <div className={styles.buttons_container}>
        <button className={styles.button} onClick={() => setValueEnd(90)}>
          DashBoard
        </button>
        <button className={styles.button} onClick={() => location.reload()}>
          Try Again
        </button>
      </div>
    </div>
  );
};

export default StudyResults;
