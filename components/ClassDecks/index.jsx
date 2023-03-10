import styles from "./ClassDecks.module.css";
import Deck from "../Deck/index";
import { FaEdit } from "react-icons/fa";
import stockImage from "../../book.png";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getDecks } from "../../api/getRequests";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "../Modal";
import AddItem from "../AddItem";
import EditInput from "../EditInput";
import UploadModal from "../UploadModal";
import Toast from "../Toast";
import { BASEURL } from "../../constants";
import {
  ADD_DECK_MESSAGE,
  ADD_DECK_TITLE,
  TOAST_DECK_ADDED,
  UPLOAD_IMAGE_MESSAGE,
  UPLOAD_TITLE,
} from "../../modalMessages";
import { addDeck } from "./functions";

const ClassDecks = ({ classData, username }) => {
  const router = useRouter();
  console.log("THIS IS THE CLASS DATA", classData);
  // use state will only pass the initial value on the first render
  // ie it will not change the initial state if class data's value changes
  const [class_, setClass] = useState(classData);
  console.log("THIS IS THE CLASS DATA IN STATE", class_);
  const currClass = parseInt(router.query.class_);
  const [decks, setDecks] = useState([]);
  const [openDeckModal, setOpenDeckModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [addDeckToast, setAddDeckToast] = useState(false);

  useEffect(() => {
    const callGetDecks = async () => {
      //console.log("count");
      //console.log("In classDecks, CURRENT CLASS IS", currClass);
      const response = await getDecks(currClass);
      //console.log("In classDecks, here are the decks", response.data);
      setDecks(response.data);
    };
    if (classData) {
      setClass(classData);
      callGetDecks();
    }
  }, [classData]);

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <img
          src={
            class_.class_picture
              ? `${BASEURL}/static/${class_.class_picture}`
              : stockImage.src
          }
          alt=""
          className={styles.class_icon}
          onClick={() => setImageModal(true)}
        />
        <UploadModal
          title={UPLOAD_TITLE}
          message={UPLOAD_IMAGE_MESSAGE}
          openModal={imageModal}
          modalSetter={setImageModal}
          contentID={class_.id}
          profileFlag={false}
        />

        <div className={styles.class_info}>
          <div className={isEditing ? styles.hidden : styles.title_wrapper}>
            <h2 className={styles.class_title}>{class_.class}</h2>
            <FaEdit
              className={styles.edit_name}
              size={25}
              onClick={() => setIsEditing(true)}
            />
          </div>

          <EditInput
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            content={class_}
            setContent={setClass}
            username={username}
          />

          <p className={styles.user}>
            User: <span className={styles.user}>{username}</span>
          </p>
        </div>
      </div>

      <div className={styles.decks_section}>
        <div className={styles.header}>
          <h2 className={styles.decks_title}>Decks</h2>
          <AiOutlinePlus
            className={styles.plus_icon}
            onClick={() => setOpenDeckModal(true)}
          />
          <Modal
            contentSetter={setDecks}
            openModal={openDeckModal}
            modalSetter={setOpenDeckModal}
            title={ADD_DECK_TITLE}
            message={ADD_DECK_MESSAGE}
            buttons={[{ text: "Submit", onClick: addDeck }]}
            setDisplayToast={setAddDeckToast}
          />
          <Toast
            show={addDeckToast}
            setShow={setAddDeckToast}
            message={TOAST_DECK_ADDED}
          />
        </div>

        <div className={styles.decks}>
          {decks.map((deck) => (
            <Deck key={deck.id} deck={deck} setDecks={setDecks} />
          ))}
        </div>

        <AddItem
          message={"Add Deck"}
          purpose={"add deck"}
          contentSetter={setDecks}
        />
      </div>
    </div>
  );
};

export default ClassDecks;
