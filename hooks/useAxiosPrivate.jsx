// import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useStateContext } from "../context/authContext";
import axios from "axios";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const {user: auth } = useStateContext();
    
    axios.defaults.withCredentials = true 

    useEffect(() => {

        const requestIntercept = axios.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axios.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axios(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.request.eject(requestIntercept);
            axios.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    return axios;
}



// const useAxiosPrivate = (token, cookie) => {
//     //const refresh = useRefreshToken(cookie);
//     console.log("here is the token", token)
//     console.log("here is the cookie", cookie)
//     const c = cookie 
//     //const {user: auth } = useStateContext();
    
//     axios.defaults.withCredentials = true 

//     console.log('inter are', axios.interceptors)

//     const resInter = axios.interceptors.request.use(
//         config => {
//             if (!config.headers['Authorization']) {
//                 config.headers['Authorization'] = `Bearer ${token}`;
//             }
//             return config;
//         }, (error) => {axios.interceptors.response.eject(resInter);Promise.reject(error)}
//     );

//     const reqInter = axios.interceptors.response.use(
//         response => response,
//         async (error) => {
//             const prevRequest = error?.config;
//             if (error?.response?.status === 401 && !prevRequest?.sent) {
//                 prevRequest.sent = true;
//                 console.log('IN IF, THE COOKIE IS', c)

//                 const newAccessToken =  await refresh(cookie);
//                 console.log("NEW ACCESS TOKEN", newAccessToken)
//                 prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//                 return axios(prevRequest);
//             }
//             axios.interceptors.response.eject(reqInter);
//             console.log("ok")
            
//             return Promise.reject(error);
//         }
//     );

       
//     return axios;
// }



export default useAxiosPrivate;