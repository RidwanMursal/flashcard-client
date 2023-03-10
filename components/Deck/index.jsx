import styles from "./Deck.module.css";
import { FaEdit } from "react-icons/fa";
import { AiFillPlayCircle, AiFillDelete } from "react-icons/ai";
import { SlArrowRight } from "react-icons/sl";
import { SiBookstack } from "react-icons/si";
import Link from "next/link";
import { useRouter } from "next/router";
import Modal from "../Modal";
import Toast from "../Toast";
import { deleteDeck } from "../../api/deleteRequests";
import { useState } from "react";
import {
  DELETE_DECK_TITLE,
  DELETE_MESSAGE,
  TOAST_DECK_DELETED,
} from "../../modalMessages";
import { callDeleteDeck } from "./functions";

const closeModal = ({ modalSetter }) => {
  modalSetter(false);
};

const Deck = ({ deck, setDecks }) => {
  console.log("this is the deck", deck.id);
  const router = useRouter();
  const { user, class_ } = router.query;
  const [deleteDeckModal, setDeleteDeckModal] = useState(false);
  const [deleteDeckToast, setDeleteDeckToast] = useState(false);
  // const [addDeckToast, setAddDeckToast] = useState(false);
  return (
    <div className={styles.container}>
      <Link href={`/dashboard/${user}/${class_}/${deck.id}/study`}>
        <div className={styles.left}>
          <SiBookstack />
          <p>{deck.name}</p>
        </div>
      </Link>

      <div className={styles.icons}>
        <Link href={`/dashboard/${user}/${class_}/${deck.id}/study`}>
          <AiFillPlayCircle className={styles.icon} size={23} />
        </Link>
        <Link href={`/dashboard/${user}/${class_}/${deck.id}/edit`}>
          <FaEdit className={styles.icon} size={23} />
        </Link>
        <AiFillDelete
          className={styles.icon}
          size={23}
          onClick={() => setDeleteDeckModal(true)}
        />
        <Modal
          contentSetter={setDecks}
          openModal={deleteDeckModal}
          modalSetter={setDeleteDeckModal}
          contentID={deck.id}
          title={DELETE_DECK_TITLE}
          message={DELETE_MESSAGE}
          noInput={true}
          buttons={[
            { text: "No, Go Back!", onClick: closeModal },
            { text: "Yes, Delete.", onClick: callDeleteDeck },
          ]}
          setDisplayToast={setDeleteDeckToast}
        />

        <Toast
          show={deleteDeckToast}
          setShow={setDeleteDeckToast}
          message={TOAST_DECK_DELETED}
        />
        <Link href={`/dashboard/${user}/${class_}/${deck.id}/study`}>
          <SlArrowRight className={styles.icon} size={23} />
        </Link>
      </div>
    </div>
  );
};

export default Deck;
