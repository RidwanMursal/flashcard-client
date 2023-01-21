import '../styles/globals.css'
import {AuthContext} from "../context/authContext"
import useAxiosPrivate from '../hooks/useAxiosPrivate'


function MyApp({ Component, pageProps }) {
  
  return (
    <AuthContext>
      <Component {...pageProps} />
    </AuthContext>
  )
  
  
}

export default MyApp
