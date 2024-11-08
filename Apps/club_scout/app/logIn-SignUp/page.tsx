import { sign_up,sign_in } from "@/app/library/actions" //þarf ekki .tsx

export function Form(props :{type: string}){
  const {type} = props
  if (type==="log in"){
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
  else {
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
  
}
// TEST TEST
export default function Page(){//make it so it takes in a prop and uses it to define the Form
  return (
    <div>
      <h1>THIS IS A TEST</h1>
      <Form type="log in" />
      <Form type=""/>
    </div>
)
}