import { useStateContext } from "../context/authContext";
import LoadingScreen from "../components/LoadingScreen";
import { useState } from "react";
import axios from "axios";
import { BASEURL } from "../constants";
import useRefreshToken from "../hooks/useRefreshToken";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Toast from "../components/Toast";

//const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ3VuIiwiYXV0aG9yaXR5IjoidXNlciIsImlhdCI6MTY3MzkwODg2OCwiZXhwIjoxNjczOTA4ODk4fQ.4J3DZGcwlSL8moJKV8XIBNHP3pEjrez9Xle1d-Lc0_o"

const refreshTest = () => {
  const axioso = useAxiosPrivate();

  const callCards = async () => {
    try {
      const response = await axioso({
        method: "get",
        url: `${BASEURL}/classes`,
      });

      console.log("IN CALL CARDS, RESPONSE IS", response);
    } catch (e) {
      console.log(e);
    }
  };
  const { user, setUser } = useStateContext();
  const [show, setShow] = useState(false);
  const refresh = useRefreshToken();
  console.log(user);
  //   const axios = useAxiosPrivate(token)

  //   const callCards = async () => {
  //       try  {
  //         const response = await axios({
  //             method: "get",
  //             url: `${BASEURL}/classes`
  //         })

  //         console.log("IN CALL CARDS, RESPONSE IS", response)
  //       } catch (e) {
  //           console.log(e)
  //       }
  //   }
  //   try {

  //   }catch(e) {
  //       console.log(e)
  //   }

  //   const callRefresh = async () => {
  //       try {
  //         const response = await  axios({
  //             method: "post",
  //             url: `${BASEURL}/auth/refresh`,
  //             withCredentials: true
  //             })
  //         console.log(response)

  //       } catch (e) {
  //           console.log(e)
  //       }

  //   }

  //callRefresh()
  //console.log(`${BASEURL}/auth/refresh`)

  return (
    <div>
      <Toast show={show} setShow={setShow} message={"SOME MESSAGE"} />
      <LoadingScreen />
      <button onClick={() => setShow(true)}>click me </button>
      {/* <button onClick={() => refresh()}>click me </button>
      <button onClick={() => callCards()}> test intercepters </button> */}
    </div>
  );
};

export default refreshTest;
