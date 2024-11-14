"use server";
// kannski búa til cookies fyrir notandan
import {promises as fs } from "fs"
import { redirect } from "next/navigation"
import { cookies } from 'next/headers'


export async function sign_up(formdata: FormData){
    const signUpData = {
        username: formdata.get("username"),
        password: formdata.get("password"),
        passwordCheck: formdata.get("passwordCheck")
    }
    const file = await fs.readFile(process.cwd() + '/app/library/stuff.json', 'utf8');
    const data = JSON.parse(file);
    

    if (signUpData.password === signUpData.passwordCheck) {
        
        const id = data.profiles.length
        data.profiles.push({
            id: "p"+String(id+1),
            name: signUpData.username,
            pass: signUpData.password,
            email: "",
            clubs: []

        })

        fs.writeFile(process.cwd() + '/app/library/stuff.json',JSON.stringify(data))
        
    }
    else{
        // rendera eitthvað sem sýnir notandinn að lykilorðið voru ekki eins
    }
    // þarf að finna út hvernig að byrta eitthvað þegar eitthvað er að og kannski gera layout
    // gera kafli 14 í next.js
}

export async function sign_in(formdata:FormData) {
    const file = await fs.readFile(process.cwd() + '/app/library/stuff.json', 'utf8');
    const data = JSON.parse(file);

    const signInData = {
        username: formdata.get("username"),
        password: formdata.get("password"),
    }

    if (typeof signInData.username === 'string' && typeof signInData.password === 'string'){

        for (let x of data.profiles){
            if (x.name == signInData.username && x.pass == signInData.password){// do this next time (check if the username exists and then check if the password is the same then sends them to the profile page if conditions aint met, then send them to sign in and try to add a message thing to tell the user whats wrong)
               (await cookies()).set("haveSignedIn",x.name)
                redirect("/profile/"+signInData.username)//má líka vera id
            }
        }

    }
    else{
        //redirect-a til sign in og segja notandinn hvað er að (hérna þarf að segja eitthvað um texta)
    }
}

export async function signOut() {
    const cookie = await cookies() 
    cookie.delete("haveSignedIn")
    redirect("/logIn-SignUp/log_in")
}

export async function getUserData(user:string){
    const file = await fs.readFile(process.cwd() + '/app/library/stuff.json', 'utf8');
    const data = JSON.parse(file);

    for (let x of data.profiles){
        if (x.name == user){
            return x
        }
    }
}

