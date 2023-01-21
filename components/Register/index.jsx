import styles from "./Register.module.css"
import {register} from "../../api/authRequests"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/router"

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;



const submit = async (data, router, setErrorMessage) => {
    
    // send  request 
    const response = await register(data)
    // if status is 200, redirect to login 
    if (response.status === 200) {
        router.push("/login")
    }
    else if (response.status === 409) {
        setErrorMessage("Username is taken already, please pick another one. ")
    } else {
        setErrorMessage("Internal server error, please try again later.")
    }
    // else add error messages
    console.log(response) 
    return
}

const RegisterComponent = () => {
    const router = useRouter()
    //const [didType, setDidType] = useState(false)
    const [didType, setDidType] = useState({username: false, password: false, confirmPassword: false})
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const data = {username: username, password: password, confirmPassword: confirmPassword}
    const [errorFlags, setErrorFlags] = useState({username: false, password: false, confirmPassword: false})
    const [focusFlags, setfocusFlags] = useState({username: false, password: false, confirmPassword: false})
    const [errorMessage, setErrorMessage] = useState("")

    console.log("this is the error flags", errorFlags)

    useEffect(() => {
        // checks if user has typed so we don't get annoying animation at start
        if (username) setDidType(prev => {return {...prev, username: true}})
        if (password) setDidType(prev => {return {...prev, password: true}})
        if (confirmPassword) setDidType(prev => {return {...prev, confirmPassword: true}})
        


        
        
        // setDidMount(true)
    }, [username, password, confirmPassword])

    useEffect(() => {
      console.log("checking user regex", USER_REGEX.test(username))
      setErrorFlags((prev) => {return {...prev, username: !USER_REGEX.test(username)}})
    }, [username])

    useEffect(() => {
        console.log("confirm password and password boolean", confirmPassword === password)
        setErrorFlags((prev) => {
            return {...prev, 
                password: !PASSWORD_REGEX.test(password)}})   
        }, [password])

    useEffect(() => {
        console.log("confirm password and password boolean", confirmPassword === password)
        setErrorFlags((prev) => {
            return {...prev, 
                confirmPassword: ! ( (password === confirmPassword) && (PASSWORD_REGEX.test(password) ) )}
        })   
    }, [confirmPassword, password])

    return (
    <div className={styles.container}>
        <div className={styles.form_container} >
            <div className={errorMessage? styles.error_display:styles.hidden}>
                {errorMessage}
            </div>
            <label className={styles.label} data-error={errorFlags.username && username? "error":null} htmlFor="username">username</label>
            <input className={styles.input}  
                type="text" id="username" value={username}
                onFocus={() => setfocusFlags(prev => {return{...prev, username: true}})} 
                onBlur={() => setfocusFlags(prev => {return{...prev, username: false}})} 
                onChange={(e) => setUsername(e.target.value) }/>
            <p className={ focusFlags.username && errorFlags.username && username ? styles.p : `${didType.username? styles.hidden_visibility:styles.hidden}`}>
                4 to 24 characters.<br />
                Must begin with a letter.<br />
                Letters, numbers, underscores, hyphens allowed.
            </p>
            {/* <p className={errorFlags.username? styles.p : styles.hidden}>{errorMessages.usernameError}</p> */}
            <label className={styles.label}
                data-error={errorFlags.password && password? "error":null} 
                htmlFor="password">password</label>
            <input className={styles.input} 
                autoComplete="off"
                data-error={errorFlags.password && password? "error":null} 
                type="password" id="password" value={password} 
                onFocus={() => setfocusFlags(prev => {return{...prev, password: true}})} 
                onBlur={() => setfocusFlags(prev => {return{...prev, password: false}})}
                onChange={(e) => setPassword(e.target.value)}/>
            <p className={focusFlags.password && errorFlags.password && password ? styles.p : `${didType.password? styles.hidden_visibility:styles.hidden}`}>
                {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
                8 to 24 characters.<br />
                Must include uppercase and lowercase letters, a number and a special character.<br />
                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
            </p>
            {/* <p className={errorFlags.password? styles.p : styles.hidden}>{errorMessages.passwordError}</p> */}
            <label className={styles.label} 
                data-error={errorFlags.confirmPassword && confirmPassword? "error":null} 
                htmlFor="confirm_password">Confirm Password</label>
            <input className={styles.input}  
                data-error={errorFlags.confirmPassword && confirmPassword? "error":null} 
                type="password" id="confirm_password" 
                value={confirmPassword} 
                onFocus={() => setfocusFlags(prev => {return{...prev, confirmPassword: true}})} 
                onBlur={() => setfocusFlags(prev => {return{...prev, confirmPassword: false}})}
                onChange={(e) => setConfirmPassword(e.target.value)}/>
            <p className={ focusFlags.confirmPassword && errorFlags.confirmPassword && confirmPassword ? styles.p : `${didType.confirmPassword? styles.hidden_visibility:styles.hidden}`}>
                {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
                Must match the first password input field.           
            </p>
            {/* <p className={errorFlags.confirmPassword? styles.p : styles.hidden}>{errorMessages.passwordError}</p> */}
            <button 
            className={styles.register_button}
            data-disabled={Object.values(errorFlags).includes(true)? "disabled":null}
            onClick={() => submit(data, router, setErrorMessage)}>
            Register
            </button>
        </div>
    </div>
  )
}

// const submit = async (data, setErrorFlags,  router, setErrorMessages) => {
//     // if passwords entered do not match return 
//     if (data.confirmPassword !== data.password) {
//         console.log("HELLO")
//         setErrorFlags((prev) => {
//             return {...prev, password: true, confirmPassword: true}
//         })
//         setErrorMessages((prev) => {
//             return {...prev, passwordError: "Passwords do not match"}
//         })
//         return 
//     }
//     // send  request 
//     const response = await register(data)
//     // if status is 200, redirect to login 
//     if (response.status === 200) {
//         setErrorFlags({username: false, password: false, confirmPassword: false})
//         router.push("/login")
//     }
//     else {
//         const errorMessage = response.data.error 
//         if (errorMessage === "duplicate key value violates unique constraint \"unique_username\"") {
//             setErrorFlags((prev) => {
//                 return {...prev, username: true }
//             }) 
//             setErrorMessages((prev) => {
//                 return {...prev, usernameError: "Username already exists, please choose another one"}
//             })
//         }else {
//             setErrorFlags((prev) => {
//                 return {...prev, password: true, confirmPassword: true}
//             })
//             setErrorMessages((prev) => {
//                 return {...prev, passwordError: errorMessage}
//             })
//         }
//     }
//     // else add error messages
//     console.log(response) 
//     return
// }

// const RegisterComponent = () => {
//     const router = useRouter()
//     const [username, setUsername] = useState("")
//     const [password, setPassword] = useState("")
//     const [confirmPassword, setConfirmPassword] = useState("")
//     const data = {username: username, password: password, confirmPassword: confirmPassword}
//     const [errorFlags, setErrorFlags] = useState({username: false, password: false, confirmPassword: false})
//     const [errorMessages, setErrorMessages] = useState({usernameError: "", passwordError: ""})
    
//     return (
//     <div className={styles.container}>
//         <div className={styles.form_container}>
//             <label className={styles.label} data-error={errorFlags.username? "error":null} htmlFor="username">username</label>
//             <input className={styles.input} data-error={errorFlags.username? "error":null} type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value) }/>
//             <p className={errorFlags.username? styles.p : styles.hidden}>{errorMessages.usernameError}</p>
//             <label className={styles.label} data-error={errorFlags.password? "error":null} htmlFor="password">password</label>
//             <input className={styles.input} data-error={errorFlags.password? "error":null} type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
//             <p className={errorFlags.password? styles.p : styles.hidden}>{errorMessages.passwordError}</p>
//             <label className={styles.label} data-error={errorFlags.confirmPassword? "error":null} htmlFor="confirm_password">Confirm Password</label>
//             <input className={styles.input} data-error={errorFlags.confirmPassword? "error":null} type="password" id="confirm_password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
//             <p className={errorFlags.confirmPassword? styles.p : styles.hidden}>{errorMessages.passwordError}</p>
//             <button className={styles.register_button} onClick={() => submit(data, setErrorFlags, router, setErrorMessages)}>Register</button>
//         </div>
//     </div>
//   )
// }

export default RegisterComponent