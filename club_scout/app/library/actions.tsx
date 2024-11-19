"use server";

import { supabase } from "@/app/library/supabaseClients";

import {promises as fs } from "fs"
import { redirect } from "next/navigation"
import { cookies } from 'next/headers'


export async function sign_up(formdata: FormData){
    // sækja sign up form gögn
    const signUpData = {
        username: formdata.get("username"),
        password: formdata.get("password"),
        passwordCheck: formdata.get("passwordCheck")
    }
    
    // ká ef password og passwordCheck eru eins og svo búa til nýja profile
    if (signUpData.password === signUpData.passwordCheck && String(signUpData.username).length >= 8) {

        const { error } = await supabase
        .from('profiles')
        .insert([
          { user_name: signUpData.username, password: signUpData.password, email:"", },
        ])

        if (error){
            console.log("ERROR, í sign up:",error)
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
    return data
}