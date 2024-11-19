//main page

import Link from "next/link"
import styles from "./page.module.css"  // Adjust path as necessary


export default function Page(){
    return (
        <><h1>Home Page</h1><div>
            <Link href="/logIn-SignUp/log_in" className={styles.link}>Login</Link>
            <Link href="/profile" className={styles.link}>Profile</Link>
            <br />
            <Link href="/logIn-SignUp/sign_up" className={styles.link}>SignUp</Link>
        </div></>
    )
}