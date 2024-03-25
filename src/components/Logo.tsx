import Link from 'next/link'
import styles from "../styles/logo.module.scss"
function Logo() {
  return (
    <Link href="/home" className={`${styles.logo}`}>
        <span>
            FOOD
        </span>
        <p>
            MANAGER
        </p>
    </Link>
  )
}

export default Logo