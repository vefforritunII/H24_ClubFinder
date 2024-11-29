import { getUserData,createClub,getPreferences } from "@/app/library/actions"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { isNumberObject } from "util/types"

export default async function Page({params}: {params:Promise<{User:string}>}){
    const cookie = await cookies()
    const userData = await getUserData(cookie.get("haveSignedIn")?.value)
    const user = (await params).User
    const ownedClubsType = (await params).ownedClubs // ignore-a þetta
    const prefernces = await getPreferences()
    
    if (cookie.has("haveSignedIn") && user === userData.user_name){
        if (ownedClubsType === "newClub"){
            console.log("its a new club")

            return (<div>
                <h1>test with new club!</h1>
                
                <form action={createClub}>

                    <label htmlFor="clubName">club name:</label>
                    <input name="clubName" id="clubName" required/>

                    <label htmlFor="description">description:</label>
                    <textarea name="description" id="description" required></textarea>

                    <label htmlFor="logo">logo:</label>
                    <input type="file" name="logo" id="logo" required/>

                    <label htmlFor="categories">categories:</label>
                    <div id="categories">{/* við getum breyt þetta til option element og finna eih leið til að sækja multiple values */}
                    {prefernces?.map((a)=><div key={a.id}><input type="checkbox" name={a.preference}/> {a.preference}</div>)}
                    </div>

                    <button type="submit">create club!</button>
                </form>
            </div>)
        }
        else if (!isNaN(ownedClubsType)){
            console.log("yay number")


            return (<div>
                <h1>test with already made club!</h1>
                <h3></h3>
            </div>)
        }
        

        console.log("user:",user)
        console.log("ownedClubs:",ownedClubsType)
        console.log("userdata:",userData)
    
    }
    else{
        redirect("/logIn-SignUp/log_in")
    }
    
}