"use server";

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

    // sækja json gögn (mun breyta til supabase á eftir)
    const file = await fs.readFile(process.cwd() + '/app/library/stuff.json', 'utf8');
    const data = JSON.parse(file);
    
    // ká ef password og passwordCheck eru eins og svo búa til nýja profile
    if (signUpData.password === signUpData.passwordCheck) {
        
        const id = data.profiles.length
        data.profiles.push({
            id: "p"+String(id+1),
            name: signUpData.username,
            pass: signUpData.password,
            email: "",
            clubs: []

        })
        //skrifa nýja profile í json
        fs.writeFile(process.cwd() + '/app/library/stuff.json',JSON.stringify(data))
        
    }
    else{
        // rendera eitthvað sem sýnir notandinn að lykilorðið voru ekki eins
    }
    // þarf að finna út hvernig að byrta eitthvað þegar eitthvað er að og kannski gera layout
    // gera kafli 14 í next.js
}

export async function sign_in(formdata:FormData) {

    // sækja json gögn (mun breyta til supabase á eftir)
    const file = await fs.readFile(process.cwd() + '/app/library/stuff.json', 'utf8');
    const data = JSON.parse(file);

    // sækja sign in form gögn
    const signInData = {
        username: formdata.get("username"),
        password: formdata.get("password"),
    }
    // checka ef username og password eru strings til að double checka svo reynir að finna notandan profile'ið og redirect-a profile'ið
    if (typeof signInData.username === 'string' && typeof signInData.password === 'string'){

        for (let x of data.profiles){
            if (x.name == signInData.username && x.pass == signInData.password){
               (await cookies()).set("haveSignedIn",x.name)
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
    // sækjir json data 
    const file = await fs.readFile(process.cwd() + '/app/library/stuff.json', 'utf8');
    const data = JSON.parse(file);
    // reynir að finna profile'ið notandan's og svo returna gögnin
    for (let x of data.profiles){
        if (x.name == user){
            return x
        }
    }
}

