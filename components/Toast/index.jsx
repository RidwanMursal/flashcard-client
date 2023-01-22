import styles from "./Toast.module.css";
import { useState, useEffect } from "react";
const Toast = ({ show, setShow, message }) => {
  //const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    if (show === true) setTimeout(() => setShow(false), 5000);
    //alert("changed");
  }, [show]);

  return (
    <div>
      {/* <button onClick={() => setShowToast((prev) => !prev)}>Hey</button> */}
      <div className={show ? `${styles.show} ${styles.toast}` : styles.toast}>
        {message}
      </div>
    </div>
  );
};

export default Toast;
