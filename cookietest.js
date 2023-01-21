import axios from "axios";
import { BASEURL } from "./constants";

const response = await axios({
    method: "post", 
    url: `${BASEURL}/auth/refresh`, 
    withCredentials: true
})