import { getUserData,signOut,getAllClubsData,getMembers} from "@/app/library/actions"
import { Suspense } from "react"
import { cookies } from 'next/headers'
import { redirect } from "next/navigation"
import  memberOfClubs  from "@/app/components/profileMemberClubs"


export default async function Page({params}: {params:Promise<{User:string}>}){

    //sækjir gögn og búar til listi af clubs sem notandinn er member of
    const user = (await params).User
    const userData = await getUserData(user)
    const allClubs = await getAllClubsData()
    const cookie = await cookies()
    const members = await getMembers()
    let listOfClubs = []

    // ef ekki með cookie eða ekki með rétt cookie
    if (!cookie.has("haveSignedIn") || cookie.get("haveSignedIn")?.value !== userData.user_name){
        redirect("/logIn-SignUp/log_in")
    }

    
    else if(cookie.has("haveSignedIn") && cookie.get("haveSignedIn")?.value == userData.user_name){// þarf "?"
        // mun breyta á eftir þarf að gera user
        // þarf lista af clubs sem notandinn er í
        
        // sækjir clubs sem notandinn er members of
        for (let x of members){
            if (userData.id === x.profile_id){
                for (let i of allClubs){
                    if (i.id === x.id){
                        listOfClubs.push(memberOfClubs(i.name,i.description,i.img,x.club_id))
                    }
                }
                
            }
        }

        
        return(
            <div>
                <h2>velkominn!</h2>
                <h3>{userData.user_name}!</h3>

                {listOfClubs.map((a)=>a)}

                <button onClick={signOut}>sign out</button>
            </div>
        )
    }
    
}