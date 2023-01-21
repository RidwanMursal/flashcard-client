import {useState, useContext, createContext, useEffect} from "react"


const Context = createContext()

export const AuthContext = ({children}) => {
    const [user, setUser] = useState({
        username: "", 
        acessToken: "", 
        refreshToken: ""
    })
    const [token, setToken] = useState(null)
    const [username, setUsername] = useState(null)
    const [onHomePage, setOnHomePage] = useState(false)
    // useEffect(() => {
    //     //console.log("yoooo")
    //     //console.log("this is the token in the local storage", localStorage.getItem("token"))
    //     console.log("this is the username in the local storage", localStorage.getItem("username"))
    //     setToken(localStorage.getItem("token") || "") 
    //     setUsername(localStorage.getItem("username") || "")
        
    // }, [])
    //console.log("this is the context", token)
    //console.log("hello this is the username from context", username)
    return (
        <Context.Provider
        value={{
            token,
            username,
            onHomePage,
            user, 
            setUser,  
            setToken, 
            setUsername,
            setOnHomePage,
        }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)