import styles from "./LoadingScreen.module.css";
import { useState, useEffect } from "react";

const LoadingScreen = ({ loading }) => {
  const [destroy, setDestroy] = useState(false);
  // have some state variable notify me to transition it out without
  // making it display none. Then use useeffect kind of like on animation end
  // to cchange another state variable which then changes this to display none
  console.log("LOADING IS..", loading);

  useEffect(() => {
    if (!loading) setTimeout(() => setDestroy(true), 500);
  }, [loading]);

  return (
    <div className={destroy ? styles.hidden : null}>
      <div
        className={
          loading ? styles.container : `${styles.container} ${styles.fade_out}`
        }
      >
        <div className={styles.spinner}>
          Loading
          <div
            className={`${styles.spinner_sector} ${styles.spinner_sector_red}`}
          ></div>
          <div
            className={`${styles.spinner_sector} ${styles.spinner_sector_blue}`}
          ></div>
          <div
            className={`${styles.spinner_sector} ${styles.spinner_sector_green}`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
