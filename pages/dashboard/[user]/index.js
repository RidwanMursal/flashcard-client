import Sidebar from "../../../components/Sidebar/index";
import MobileHeader from "../../../components/MobileHeader/index";
import ClassDecks from "../../../components/ClassDecks/index";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import styles from "../../../styles/Home.module.css";
import { useEffect, useState } from "react";
import { getUser, getAllUsers, getClasses } from "../../../api/getRequests";
import { useStateContext } from "../../../context/authContext";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { BASEURL } from "../../../constants";
import useRefreshToken from "../../../hooks/useRefreshToken";
import { useRouter } from "next/router";

export default function Home({ user }) {
  // const {username} = useStateContext()
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [userData, setUserData] = useState("");
  const [firstClass, setFirstClass] = useState("");
  //const {user: userInfo} = useStateContext()
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

  // if (!userData) return <h1>WAITING FOR DATA...</h1>

  // if (userData) {
  //   console.log("IN IF USER DATA IS", userData)
  //   return <h1>Loading...</h1>
  // }

  //   callGetUsers()

  // }, [])

  if (!width) {
    return <h1>GETTING WIDTH</h1>;
  }

  // if screen size is large and the user owns classes redirect
  // to their classes page.
  if (width && width > 900 && firstClass) {
    router.push(`/dashboard/${user}/${firstClass.id}`);
    return;
  }

  // const {width} = useWindowDimensions()
  // if (typeof (window) !== "undefined") {const {width} = useWindowDimensions()}
  return (
    <div className={styles.container}>
      {/* {width && width > 900? <h1>LOADING...</h1>:<h1>HERE!!</h1>} */}
      <Sidebar
        width={"100%"}
        username={userData?.username}
        profilePicture={userData.profile_picture}
      />
      {/* {(width !== null && width > 900) ? <Sidebar width={"100%"}/> : <MobileHeader /> } */}
      {/* { width > 900 ? <Sidebar/> : <MobileHeader />} */}
      {/* {(typeof(window) !== "undefined" && width > 900) ? <Sidebar width={"100%"}/> : <MobileHeader /> } */}
      {/* <ClassDecks />  */}
      {/* <Sidebar />  */}
      {/* <Decks />  */}
    </div>
  );
}

// export const getStaticPaths = async () => {

//   const users = await getAllUsers()
//   console.log(users.data)

//   const paths = users.data.map((user) => ({
//       params: {
//           user: user.username
//       }
//   }))

//   return {
//       paths,
//       fallback: "blocking"
//   }
// }

export const getServerSideProps = async ({ params: { user }, req }) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    return { props: { user } };
  }
  // console.log('refresh token is', req.headers.cookie)
  // const refresh = useRefreshToken(req.headers.cookie)

  // refresh(refreshToken)

  //console.log("IN SERVER SIDE PROPS FOR USERS REQ IS", req.cookies)
  // const accessToken = req.cookies.acessToken
  // const cookie = req.headers.cookie

  //console.log(accessToken)

  // const axios = useAxiosPrivate(accessToken, cookie)
  // try  {
  //   const response = await axios({
  //       method: "get",
  //       url: `${BASEURL}/classes`
  //   })

  //console.log(response)

  //console.log("IN USER SERVER SIDE PROPS, RESPONSE IS", response.data)
  // return {props: {userData: response.data} }
  // } catch (e) {
  //     console.log(e)
  // }

  // console.log("this is the user", user)
  // const user_ = await getUser(user)
  // const userData = user_.data[0]
  // console.log(userData)
  return { props: { response: null } };
};
