//main page

import Link from "next/link"
import styles from "./page.module.css"  // Adjust path as necessary


export default function Page(){
    return (
        <div>
            <Link href="/logIn-SignUp/log_in" className={styles.link}>Login</Link>
            <Link href="/About" className={styles.link}>About</Link>
            <Link href="/Club" className={styles.link}>Club</Link>
            <Link href="/profile" className={styles.link}>Profile</Link>
            <br />
            <Link href="/logIn-SignUp/sign_up"className={styles.link}>SignUp</Link>
        </div>
    )
}