import { getUserData,signOut,getAllClubsData } from "@/app/library/actions"
import { Suspense } from "react"
import { cookies } from 'next/headers'
import { redirect } from "next/navigation"
import  memberOfClubs  from "@/app/components/profileMemberClubs"


export default async function Page({params}: {params:Promise<{User:string}>}){

    const user = (await params).User
    const userData = await getUserData(user)
    const allClubs = await getAllClubsData()

    const cookie = await cookies()

    let listOfClubs = []

    // ef ekki með cookie eða ekki með rétt cookie
    if (!cookie.has("haveSignedIn") || cookie.get("haveSignedIn")?.value !== userData.name){
        redirect("/logIn-SignUp/log_in")
    }

    
    else if(cookie.has("haveSignedIn") && cookie.get("haveSignedIn")?.value == userData.name){// þarf "?"

        for (let x of allClubs){
            if (userData.clubs.includes(x.id)){
                listOfClubs.push(memberOfClubs(x.name,x.disc,x.logo,x.id))
                console.log("hooray")
            }
        }
        console.log(listOfClubs.map((a)=>a))
        return(
            <div>
                <h2>velkominn!</h2>
                <h3>{userData.name}!</h3>

                {listOfClubs.map((a)=>a)}

                <button onClick={signOut}>sign out</button>
            </div>
        )
    }
    
}// probs make a separate folder that holds the components to make certain parts of the page so we can load dynamic parts while users can do other stuff