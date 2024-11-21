import { sign_up,sign_in } from "@/app/library/actions" //þarf ekki .tsx
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export function Form(props :{type: string}){

  const {type} = props

  if (type==="log_in"){
    return(
      <form style={{margin: "auto",width: "50%", textAlign: "center"}} action={sign_in}>
        
        <h3>Username</h3>
        <input id="username" name="username" required></input>
      
        <h3>Password</h3>
        <input id="password" name="password" required></input>

        <button type="submit">Sign in</button>

      </form>
    )
  }
  else if (type==="sign_up"){
    return(
      <form style={{margin: "auto",width: "50%", textAlign: "center"}} action={sign_up}>

        <h3>Username</h3>
        <input id="username" name="username" required></input>

        <h3>Password</h3>
        <input id="password" name="password" required></input>

        <h3>Re-enter your password</h3>
        <input id="passwordCheck" name="passwordCheck" required></input>

        <button type="submit">Sign up</button>

      </form>
    )
  }
  else{
    console.log("fail")
    redirect("/")
  }
  
}

export default async function Page({params}: {params: Promise<{Type:string}>}){

  const type = (await params).Type//nafnið af þetta og nafnið á dynamic route þarf að vera eins
  const cookie = await cookies()

  if (cookie.has("haveSignedIn")){
    redirect("/profile/"+cookie.get("haveSignedIn")?.value)
  }

  return (
    <div>
      <h1>ClubScout</h1>
      <Form type={type} />
    </div>
)
}