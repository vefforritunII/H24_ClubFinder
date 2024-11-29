"use server";

import { supabase } from "@/app/library/supabaseClients";

import { redirect } from "next/navigation"
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers'
import memberOfClubs from "../components/profileMemberClubs";


export async function sign_up(formdata: FormData){
    // sækja sign up form gögn
    const signUpData = {
        username: formdata.get("username"),
        password: formdata.get("password"),
        passwordCheck: formdata.get("passwordCheck")
    }
    
    // ká ef password og passwordCheck eru eins og svo búa til nýja profile 
    // BÆTT VIÐ SHIT TIL AÐ KÁ EF USERNAME ER UNIQUE (í supabase eða í if statement)
    if (signUpData.password === signUpData.passwordCheck && String(signUpData.password).length >= 8) {

        const { error } = await supabase
        .from('profiles')
        .insert([
          { user_name: signUpData.username, password: signUpData.password, email:"" },
        ])

        if (error){
            console.log("ERROR, í sign up:",error)
        }
        else{
            redirect("logIn-SignUp/log_in")
        }
        
    }
    else{
        // rendera eitthvað sem sýnir notandinn að lykilorðið voru ekki eins
    }
    // þarf að finna út hvernig að byrta eitthvað þegar eitthvað er að og kannski gera layout
    // gera kafli 14 í next.js
}

export async function sign_in(formdata:FormData) {

    // sækja sign in form gögn
    const signInData = {
        username: formdata.get("username"),
        password: formdata.get("password"),
    }

    const cookie = await cookies()

    // checka ef username og password eru strings svo reynir að finna notandan profile'ið og redirect-a til profile síðan
    if (typeof signInData.username === 'string' && typeof signInData.password === 'string'){

        // sækjir supabase gögn af profiles
        const { data, error } = await supabase
        .from('profiles')
        .select()

        if (error){
            console.log("ERROR í log in:",error)
        }
        
        for (let x of data){
            console.log(x)
            if (x.user_name == signInData.username && x.password == signInData.password){
               (await cookies()).set("haveSignedIn",x.user_name)
                redirect("/profile/"+signInData.username)//má líka vera id
            }
        }

    }
    else{
        //redirect-a til sign in og segja notandinn hvað er að (hérna þarf að segja eitthvað um texta)
    }
}

// delete-a cookie af notandan
export async function signOut() {
    const cookie = await cookies() 
    cookie.delete("haveSignedIn")
    redirect("/logIn-SignUp/log_in")
}

// sækjir gögn af notandan
export async function getUserData(user:string){

    // sækjir supabase gögn af profiles
    const { data, error } = await supabase
    .from('profiles')
    .select()

    if (error){
        console.log("ERROR í getUserData:",error)
    }

    // reynir að finna profile'ið notandan's og svo returna gögnin
    for (let x of data){
        if (x.user_name == user){
            return x
        }
    }
}

export async function joinOrLeaveClub(formdata: FormData){

    const club_id = formdata.get("club_id")
    const type = formdata.get("type")

    const cookie = await cookies()
    const user = await getUserData(cookie.get("haveSignedIn")?.value)//ignore þetta

    if (!cookie.has("haveSignedIn")){
        redirect("/logIn-SignUp/log_in")
    }
    else if (type == "join"){

        const { error } = await supabase
        .from('club_members')
        .insert([
          { profile_id:user.id,club_id:club_id },
        ])

        if (error){
            console.log("ERROR, í sign up:",error)
        }

        // refresh-a síðan hjá notandinn og redirect-a til síðan til að double checka
        revalidatePath("/Club/"+club_id)
        redirect("/Club/"+club_id)

    }
    else if (type=="leave"){

        const {error} = await supabase.from('club_members').delete().eq("profile_id",user.id).eq("club_id",club_id)

        if (error){
            console.log("ERROR: í joinOrLeaveClub þegar reyna að leave-a club, info:",error)
        }

        // refresh-a síðan hjá notandinn og redirect-a til síðan til að double checka
        revalidatePath("/Club/"+club_id)
        redirect("/Club/"+club_id)
    }
    else{
        console.log("ERROR: í joinOrLeaveClub, enginn statements voru keyrið")
    }
}

export async function listOfMembersOfClubs(user_id:Number){
    const members = await getMembers()
    let lists = []

    for (let x of members){
        if (user_id == x.profile_id){
            lists.push(x.club_id)
        }
    }
    return lists
}

export async function getAllClubsData(){

    // sækjir supabase gögn af clubs
    const { data, error } = await supabase
    .from('clubs')
    .select()

    if (error){
        console.log("ERROR í getAllClubsData:",error)
    }

    return data
}

export async function getClubData(clubID:number){
        // sækjir supabase gögn af clubs
        const { data, error } = await supabase
        .from('clubs')
        .select()
    
        if (error){
            console.log("ERROR í getClubData:",error)
        }

    // reynir að finna gögn af club'ið með nafnið og svo returna gögnin
    for (let x of data){        
        if (x.id == clubID){      
            return x
        }
    }
}

export async function getMembers() {
    const { data, error } = await supabase
    .from('club_members')
    .select()

    if (error){
        console.log("ERROR í getMembers:",error)
    }

    return data
}

export async function changeInfoAboutUser(formdata:FormData) { // BÆTT VIÐ FILE STUFF NÆSTA TÍMA -_-____-----_----_

    const cookie = await cookies()
    const userPrefences = await getUserPreferences()
    const preferences = await getPreferences()
    
    const changedInfo = {
        oldUsername: formdata.get("old_username"),
        username: formdata.get("username"),
        email: formdata.get("email"),
    }

    const userData = await getUserData(String(changedInfo.oldUsername))
    let listOfFormPreferences = []
    let listOfUserPreferences = []

    for (let x of preferences){
        if (formdata.get(String(x.preference)) === "on"){
            listOfFormPreferences.push("on")
        }
        else{
            listOfFormPreferences.push(null)
        }
    }
    
    for (let x of userPrefences){
        if (x.profile_id === userData.id){
            
            listOfUserPreferences.push(String(x.preference_id))            
        }
    }

    for ( let x = 0; x<listOfFormPreferences?.length;x++ ){
        // ef notandan breytir ekki
        if(listOfFormPreferences[x] === "on" && listOfUserPreferences.includes(String(x+1)) || listOfFormPreferences[x] === null && !listOfUserPreferences.includes(String(x+1))){
            
        }
        // ef notandan langar að bætta við nýja preference
        else if (listOfFormPreferences[x] === "on" && !listOfUserPreferences.includes(String(x+1))){
            const {error} = await supabase.from("member_preferences").insert({profile_id: userData.id,preference_id:x+1})

            if (error){
                console.log("ERROR í changeInfoAboutUser, reyndi að bætt við nýja gögn member_preference:",error)
            }
        }
        // ef notandan langar að eyða preference
        else if (listOfFormPreferences[x] === null && listOfUserPreferences.includes(String(x+1))){

            let idRow = undefined
            for (let i of userPrefences){
                if (i.profile_id === userData.id && i.preference_id === x+1){
                    idRow = i.id
                }
            }

            const {error} = await supabase.from("member_preferences").delete().eq("id",idRow)

            if (error){
                console.log("ERROR í changeInfoAboutUser, reyndi að delete-a gögn frá member_preference:",error)
            }

        }
        
    }

    const { error } = await supabase
    .from("profiles")
    .update({ user_name: changedInfo.username, email:changedInfo.email})
    .eq("id",userData.id)

    if (error){
        console.log("ERROR í changeInfoAboutUser, reyndi að update-a info um user:",error)
    }
    
    // breyta cookies og redirecta til profile síðan
    cookie.delete("haveSignedIn")
    cookie.set("haveSignedIn",String(changedInfo.username))

    revalidatePath("/profile/"+changedInfo.oldUsername)
    redirect("/profile/"+changedInfo.username)
} 

export async function changePassword(formdata:FormData){

    const passwordData = {
        username: formdata.get("username"),
        password: formdata.get("password"),
        passwordCheck: formdata.get("passwordCheck")
    }

    const userData = await getUserData(String(passwordData.username))

    if (passwordData.password === passwordData.passwordCheck && String(passwordData.password).length >= 8){
        const { error } = await supabase
        .from("profiles")
        .update({ password: passwordData.password})
        .eq("id",userData.id)

        if (error){
            console.log("ERROR í changepassword:",error)
        }

        revalidatePath("/profile/"+passwordData.username)
        redirect("/profile/"+passwordData.username)
    }
}

export async function getPreferences(){
    const {data,error} = await supabase
        .from("preference")
        .select()

    if (error){
        console.log("ERROR í getPreferences:",error)
    }

    return data
}

export async function getUserPreferences(){
    const {data,error} = await supabase.from("member_preferences").select()

    if (error){
        console.log("ERROR í getUserPreferences:",error)
    }

    return data
}

export async function createClub(formdata: FormData){   

    const cookie = await cookies()
    const preferences = await getPreferences()
    const userData = await getUserData(String(cookie.get("haveSignedIn")?.value))
    const createdClubData = {
        clubName: formdata.get("clubName"),
        desciption: formdata.get("description"),
        logo: formdata.get("logo")
    }

    // list af preferences
    let isChecked = false
    let listOfPreferences = []

    for (let x of preferences){
        let checkboxPreference = formdata.get(String(x.preference))
        if (checkboxPreference === "on"){
            console.log("IT WENT IN, THE ONE THAT WENT IN IS:",x)
            isChecked = true
            listOfPreferences.push(x)
        }
        else{

        }
    }

    if (isChecked === false){
        //alert("you didnt pick any preferences!")
        redirect("/profile/"+cookie.get("haveSignedIn")?.value)
    }
    else if (isChecked === true){

        const {data, error} = await supabase.from("clubs").insert({name:createdClubData.clubName,description:createdClubData.desciption,owner_id:userData.id}).select()

        console.log("created club data:",data)

        if (error){
            console.log("ERROR í createClub á meðan að setja inn nýja club í supabase:",error)
        }

        // BÆTT KÓÐA SEM BÚAR TIL NÝJA FILE FYRIR BUCKET !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        
        /* // gera þetta næsta tíma svo í user bætt við listi af owned clubs og svo bætt við leið til að edit-a clubs
        for (let x of listOfPreferences){
            const {error} = await supabase.from("club_preferences").insert("")
        }

        */

        redirect("/profile/"+cookie.get("haveSignedIn")?.value)
    }
    else{

    }
    
}

export async function ownedClubs(userID:Number){ // búa til kóða fyrir þetta þegar búinn með createClub

}