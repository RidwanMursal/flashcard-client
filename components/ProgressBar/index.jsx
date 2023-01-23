import styles from "./ProgressBar.module.css";

const ProgressBar = ({ percentage }) => {
  return (
    <div
      className={styles.bar}
      data-percent={`${percentage}%`}
      style={{
        background: `conic-gradient(#1959e3 ${percentage * 3.6}deg, #adbde0 ${
          percentage * 3.6
        }deg)`,
      }}
    ></div>
  );
};

export default ProgressBar;
