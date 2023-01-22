import styles from "./Deck.module.css";
import { FaEdit } from "react-icons/fa";
import { AiFillPlayCircle, AiFillDelete } from "react-icons/ai";
import { SlArrowRight } from "react-icons/sl";
import { SiBookstack } from "react-icons/si";
import Link from "next/link";
import { useRouter } from "next/router";
import Modal from "../Modal";
import { deleteDeck } from "../../api/deleteRequests";
import { useState } from "react";
import { DELETE_DECK_TITLE, DELETE_MESSAGE } from "../../modalMessages";

const callDeleteDeck = async ({ contentID, contentSetter, modalSetter }) => {
  console.log("deck id is", contentID);
  const response = await deleteDeck(contentID);
  console.log("IN DELETE DECK IN CLASS DECKS, THE RESPONSE IS", response);
  if (response.status === 200) {
    contentSetter((prev) => prev.filter((deck) => deck.id !== contentID));
    alert("it worked");
    modalSetter(false);
  }
};

const closeModal = ({ modalSetter }) => {
  modalSetter(false);
};

const Deck = ({ deck, setDecks }) => {
  console.log("this is the deck", deck.id);
  const router = useRouter();
  const { user, class_ } = router.query;
  const [deleteDeckModal, setDeleteDeckModal] = useState(false);
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
        />
        <Link href={`/dashboard/${user}/${class_}/${deck.id}/study`}>
          <SlArrowRight className={styles.icon} size={23} />
        </Link>
      </div>
    </div>
  );
};

export default Deck;
