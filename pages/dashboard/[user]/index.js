import Sidebar from "../../../components/Sidebar/index";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import styles from "../../../styles/Home.module.css";
import { useEffect, useState } from "react";
import { getUser, getClasses } from "../../../api/getRequests";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useRouter } from "next/router";

export default function Home({ user }) {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [userData, setUserData] = useState("");
  const [firstClass, setFirstClass] = useState("");
  const axios = useAxiosPrivate();

  useEffect(() => {
    const callGetUser = async () => {
      console.log("username is", user);
      const user_ = await getUser(user);
      console.log(user_.data);
      console.log("HERE IS USER DATA", user_.data);
      setUserData(user_.data[0]);
    };

    const callGetClasses = async () => {
      const classes = await getClasses(user);
      console.log("HERE IS CLASSES DATA", classes.data);
      setFirstClass(classes.data[0]);
    };

    callGetUser();
    callGetClasses();
  }, []);

  // if screen size is large and the user owns classes redirect
  // to their classes page.
  if (width && width > 900 && firstClass) {
    router.push(`/dashboard/${user}/${firstClass.id}`);
    return;
  } else if (!width) {
    return null;
  } else {
    return (
      <div className={styles.container}>
        <Sidebar
          width={"100%"}
          username={userData?.username}
          profilePicture={userData.profile_picture}
        />
      </div>
    );
  }
}

export const getServerSideProps = async ({ params: { user }, req }) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    return { props: { user } };
  }
  return { props: { response: null } };
};
