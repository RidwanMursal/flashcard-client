import styles from "./NoContentMessage.module.css"

const NoContentMessage = ({size, bold, message}) => {
  return (
    <p className={bold? styles.bold_message : styles.message} 
    style={ !isNaN(size) ? { fontSize : `${size}rem`} : {}}>
      {message}
    </p>
  )
}

export default NoContentMessage