import { getUserData,signOut } from "@/app/library/actions"
import { Suspense } from "react"
import { cookies } from 'next/headers'
import { redirect } from "next/navigation"


export default async function Page({params}: {params:Promise<{User:string}>}){

    const user = (await params).User
    const userData = await getUserData(user)

    const cookie = await cookies()

    if (!cookie.has("haveSignedIn") || cookie.get("haveSignedIn")?.value !== userData.name){
        redirect("/logIn-SignUp/log_in")
    }

    
    else if(cookie.has("haveSignedIn") && cookie.get("haveSignedIn")?.value == userData.name){// þarf "?" dunno why
        return(
            <div>
                <h2>velkominn!</h2>
                <h3>{userData.name}!</h3>

                <button onClick={signOut}>sign out</button>
            </div>
        )
    }
    
}// probs make a separate folder that holds the components to make certain parts of the page so we can load dynamic parts while users can do other stuff