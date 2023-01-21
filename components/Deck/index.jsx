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

const index = ({ deck, setDecks }) => {
  console.log("this is the deck", deck.id);
  const router = useRouter();
  const { user, class_ } = router.query;
  const [deleteDeckModal, setDeleteDeckModal] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <SiBookstack />
        <p>{deck.name}</p>

        {/* <p className={styles.percentage}>20%</p>

        <div className={styles.deck_info}>
          <div className={styles.text}>
            <h3 className={styles.title}></h3>
            <p>{deck.name}</p>
            <p className={styles.cards_studied}>3 of 3 unique cards studied</p>
          </div>

          <div className={styles.progress_bar}></div>
        </div> */}
      </div>

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
        <SlArrowRight className={styles.icon} size={23} />
      </div>
    </div>
  );
};

export default index;
