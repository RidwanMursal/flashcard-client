import styles from "./UploadModal.module.css";
import { useState } from "react";
import { patchClassImage, patchUserImage } from "../../api/pachRequests";
import { BASEURL } from "../../constants";

function encodeImageFileAsURL(element, setImage) {
  //console.log("in encode image")
  var file = element.files[0];
  var reader = new FileReader();
  reader.onloadend = () => {
    console.log("the result it", reader.result),
      setImage({ data: reader.result, fileName: file });
  };
  reader.readAsDataURL(file);
}

const saveImage = async (id, image, profileFlag) => {
  if (!profileFlag) {
    const response = await patchClassImage(id, image);
    console.log(response);
    location.reload();
  } else {
    const response = await patchUserImage(id, image);
    console.log(response);
    location.reload();
  }
};

const UploadModal = ({
  openModal,
  title,
  message,
  modalSetter,
  contentSetter,
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
        {/* <p className={styles.message}>{message}</p> */}
        {/* <form method="POST" enctype="multipart/form-data" action={`${BASEURL}/images/class/79`}>
              <label for="image" className={styles.upload} >
                {image.data === ""? "Add image message here" : (
                  <>
                    <img src={image.data} style={{width: "75px", height:"75px", objectFit: "cover"}} />
                    <p>{image.fileName}</p>
                  </>
                ) }
              </label> 
              <input id="image"  name="image" type="file" className={styles.hidden} onChange={(e) => encodeImageFileAsURL(e.target, setImage) } /> 
              <input className={styles.import_button} data-not-clickable={image?.data===""? "noclick":null} type="submit" value="import"/>
            </form> */}
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
