// import axios from "../axios";
import axios from "axios"
import { useStateContext } from '../context/authContext';
import { BASEURL } from "../constants";

const useRefreshToken = () => {
    const { setUser } = useStateContext();
    console.log(`${axios.getUri()}/auth/refresh`)
    console.log("IN USEREFRESH TOKEN")

    

    const refresh = async () => {
        try {
            // const response = await axios.post("//auth/login", {
            //     withCredentials: true
            // });
            console.log('CALLING REFRESH')
            const response = await axios({
                method: "post", 
                url: `${BASEURL}/auth/refresh`, 
                withCredentials: true, 
            })
            setUser(prev => {
                console.log(JSON.stringify(prev));
                console.log(response.data.accessToken);
                return { ...prev, accessToken: response.data.accessToken }
            });
            console.log("response data" , response.data);
            return response.data.accessToken;
        }catch(e) {
            console.log(e)
        }
        
    }
    return refresh;
};

export default useRefreshToken;