import styles from "./EditInput.module.css";
import { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { saveClass, saveDeck, closeInput } from "./functions";

const EditInput = ({
  content,
  setContent,
  isEditing,
  setIsEditing,
  username,
}) => {
  const [inputValue, setInputValue] = useState(
    content.name ? content.name : content.class
  );
  const inputRef = useRef(null);
  const args = {
    ...(content.class && { class_: content }),
    ...(content.name && { deck: content }),
    setClass: setContent,
    setInputValue,
    inputValue,
    setIsEditing,
    username,
  };
  console.log("HERE IS ARGS", args);

  // Needs to log when the content changes so the edit input doesn't persist
  useEffect(() => {
    // setInputValue(content.name ? content.name : content.class);
    // setIsEditing(false);
    closeInput(content, setInputValue, setIsEditing);
  }, [content]);

  useEffect(() => {
    if (isEditing) inputRef.current.focus();
  }, [isEditing]);

  return (
    <div className={isEditing ? styles.container : styles.hidden}>
      <input
        className={styles.input}
        type="text"
        value={inputValue}
        ref={inputRef}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={(e) => {
          // If the button was clicked, don't call the close input function yet
          if (e.relatedTarget && e.relatedTarget.classList[0] === styles.save)
            return;
          closeInput(content, setInputValue, setIsEditing);
        }}
      />
      <div className={styles.buttons_container}>
        <AiOutlineClose
          size={25}
          className={styles.cancel}
          onClick={() => {
            setInputValue(content.name ? content.name : content.class);
            setIsEditing(false);
          }}
        />
        <button
          className={styles.save}
          onClick={() => {
            console.log(`content is`, content);

            if (content.name) saveDeck(args);
            else saveClass(args);
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditInput;

// import styles from "./EditInput.module.css";
// import { useState } from "react";
// import { AiOutlineClose } from "react-icons/ai";
// import { patchClass } from "../../api/pachRequests";
// import { useStateContext } from "../../context/authContext";

// const save = async ({
//   class_,
//   setClass,
//   inputValue,
//   setIsEditing,
//   username,
// }) => {
//   const updatedClass = { ...class_, class: inputValue };
//   console.log("here is the updated class", updatedClass);
//   const data = { className: updatedClass.class, username: username };
//   const response = await patchClass(updatedClass.id, data);
//   console.log("after response", response);
//   if (response.status === 200) {
//     setClass(response.data[0]);
//     setIsEditing(false);
//   }

//   return;
// };

// const EditInput = ({ class_, setClass, isEditing, setIsEditing, username }) => {
//   const [inputValue, setInputValue] = useState(class_.class);
//   const args = {
//     class_,
//     setClass,
//     setInputValue,
//     inputValue,
//     setIsEditing,
//     username,
//   };

//   return (
//     <div className={isEditing ? styles.container : styles.hidden}>
//       <input
//         className={styles.input}
//         type="text"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//       />
//       <div className={styles.buttons_container}>
//         <AiOutlineClose
//           size={25}
//           className={styles.cancel}
//           onClick={() => {
//             setInputValue(class_.class);
//             setIsEditing(false);
//           }}
//         />
//         <button
//           className={styles.save}
//           onClick={() => {
//             save(args);
//           }}
//         >
//           Save
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EditInput;
