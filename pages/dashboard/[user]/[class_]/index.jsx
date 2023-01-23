import Sidebar from "../../../../components/Sidebar/index";
import MobileHeader from "../../../../components/MobileHeader/index";
import LoadingScreen from "../../../../components/LoadingScreen";
import ClassDecks from "../../../../components/ClassDecks/index";
import useWindowDimensions from "../../../../hooks/useWindowDimensions";
import styles from "../../../../styles/Home.module.css";
import { useEffect, useState } from "react";
import { getClasses, getClass, getUser } from "../../../../api/getRequests";
import { useRouter } from "next/router";
import { useStateContext } from "../../../../context/authContext.js";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

export default function Home({ user, class_ }) {
  const { width } = useWindowDimensions();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState("");
  const [classData, setClassData] = useState("");
  const axios = useAxiosPrivate();
  console.log("THIS IS THE CLASS ID", class_);

  useEffect(() => {
    const callGetUser = async () => {
      console.log("username is", user);
      const user_ = await getUser(user, axios);
      console.log(user_.data);
      console.log("HERE IS USER DATA", user_.data);
      setUserData(user_.data[0]);
    };

    const callGetClass = async () => {
      console.log("class id is", class_);
      const response = await getClass(class_, axios);
      //console.log(response.data)
      console.log("HERE IS CLASS DATA", response.data);
      setClassData(response.data[0]);
    };

    callGetUser();
    callGetClass();

    // Note that i put the class_ props here as the component doesn't remount
    // when you visit another page therefore useeffect is not called.
    // tldr, just because getserverside props is called doesn't mean the component
    // remounts
  }, [class_]);

  useEffect(() => {
    if (classData && userData && width) {
      setLoading(false);
    }
  }, [classData, userData, width]);

  console.log("THIS IS THE class data ", classData);

  return (
    <>
      <LoadingScreen loading={loading} />
      {classData && userData && width ? (
        <div className={styles.container}>
          <div className={styles.fade_out}></div>
          {width > 900 ? (
            <Sidebar
              username={user}
              profilePicture={userData.profile_picture}
            />
          ) : (
            <MobileHeader
              username={user}
              profilePicture={userData.profile_picture}
            />
          )}
          <ClassDecks classData={classData} username={user} />
        </div>
      ) : null}
    </>
  );
}

export const getServerSideProps = async ({ params: { user, class_ }, req }) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    return { props: { user, class_ } };
  }

  // console.log(`IN GET SERVER PROPS, user: ${user} class: ${class_}`)
  // const classResponse = await getClass(class_)
  // const userResponse = await getUser(user)
  // const profilePicture = userResponse.data[0].profile_picture
  // const classData = classResponse.data[0]
  // console.log(classData)
  return { props: { classData, user, profilePicture } };
};
