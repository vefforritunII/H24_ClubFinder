//main page

import Link from "next/link"

export default function Page(){
    return (
        <div>
            <Link href={"/logIn-SignUp/log_in"}>Login</Link>
            <br />
            <Link href={"/logIn-SignUp/sign_up"}>SignUp</Link>
        </div>
    )
}