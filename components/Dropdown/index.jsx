import React from 'react'
import styles from "./Dropdown.module.css"
import Link from 'next/link'

const index = ({items, open, colorPrimary, color, colorSecondary}) => {
  console.log(items)
  
  return (
    
      <div className={open? `${styles.container} ${styles.open}`: styles.container}
      style={{backgroundColor: colorPrimary}} >   
          {items.map(item => {
          return(
            <Link href={item.href}>
              <div className={styles.item}  data-color={color} data-secondary-color={colorSecondary}><p>{item.name}</p></div>
            </Link>
          )  })}
      </div>
    
  )
}

export default index