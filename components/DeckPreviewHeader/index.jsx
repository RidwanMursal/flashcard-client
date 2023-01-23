import styles from "./DeckPreviewHeader.module.css";
import Dropdown from "../Dropdown/index";
import { SlArrowLeft, SlArrowDown } from "react-icons/sl";
import { FaEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import Link from "next/link";
import EditInput from "../EditInput";

const DeckPreviewHeader = ({ currDeck, decks, username, class_ }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  console.log(decks);
  const [currDeckInfo, setCurrDeckInfo] = useState(
    decks.filter((deck) => deck.id === parseInt(currDeck))[0]
  );
  const dropdownItems = decks.map((deck) => {
    // should use use memo here
    return {
      ...deck,
      href: `/dashboard/${username}/${class_}/${deck.id}/edit`,
    };
  });

  useEffect(() => {
    setCurrDeckInfo(decks.filter((deck) => deck.id === parseInt(currDeck))[0]);
  }, [currDeck]);

  return (
    <>
      <header className={styles.container}>
        <div className={isEditing ? styles.hidden : styles.left}>
          <div className={styles.back}>
            <Link href={`/dashboard/${username}/${class_}`}>
              <SlArrowLeft />
            </Link>
            <img src="" alt="" className="class_icon" />
          </div>

          <div className={styles.dropdown}>
            <h2 className={styles.deck_name}>{currDeckInfo.name}</h2>
            <SlArrowDown
              className={styles.dropdown_arrow}
              onClick={() => setMenuOpen((prev) => !prev)}
            />
            <Dropdown
              items={dropdownItems}
              open={menuOpen}
              colorPrimary={"blue"}
              colorSecondary={"red"}
              color={"black"}
            />
          </div>

          <FaEdit
            className={styles.edit_icon}
            size={25}
            onClick={() => setIsEditing(true)}
          />
        </div>

        <EditInput
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          content={currDeckInfo}
          setContent={setCurrDeckInfo}
        />

        <Link href={`/dashboard/${username}/${class_}/${currDeck}/study`}>
          <button className={styles.study_button}>Study</button>
        </Link>
      </header>
    </>
  );
};

export default DeckPreviewHeader;
