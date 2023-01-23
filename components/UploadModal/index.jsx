import styles from "./UploadModal.module.css";
import { useState } from "react";
import { encodeImageFileAsURL, saveImage } from "./functions";

const UploadModal = ({
  openModal,
  title,
  message,
  modalSetter,
  contentID,
  profileFlag,
}) => {
  console.log("open modal in upload", openModal);
  const [image, setImage] = useState({ data: "", fileName: "" });
  const unique = Date.now();

  //console.log(image)
  return (
    <div className={openModal ? styles.container : styles.hidden}>
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <label htmlFor={`image-${unique}`} className={styles.upload}>
          {image.data === "" ? (
            <p className={styles.message}>{message}</p>
          ) : (
            <>
              <img
                src={image.data}
                style={{ width: "75px", height: "75px", objectFit: "cover" }}
              />
              <p style={{ fontSize: "0.7rem" }}>{image.fileName.name}</p>
            </>
          )}
        </label>
        <input
          id={`image-${unique}`}
          name="image"
          type="file"
          accept="image/*"
          className={styles.hidden}
          onChange={(e) => encodeImageFileAsURL(e.target, setImage)}
        />
        <button
          className={styles.import_button}
          data-not-clickable={image.data === "" ? "noclick" : null}
          onClick={() => saveImage(contentID, image, profileFlag)}
        >
          {" "}
          Import
        </button>
      </div>
      <div
        className={styles.backdrop}
        onClick={() => {
          modalSetter(false);
          setImage({ data: "", title: "" });
        }}
      ></div>
    </div>
  );
};

export default UploadModal;
