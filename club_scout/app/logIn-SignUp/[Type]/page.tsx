import { sign_up, sign_in } from "@/app/library/actions"; // No need for .tsx
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export function Form(props: { type: string }) {
  const { type } = props;

  if (type === "log_in") {
    return (
      <form style={{ margin: "auto", width: "50%", textAlign: "center" }} action={sign_in}>
        <h3>Username</h3>
        <input id="username" name="username" required />

        <h3>Password</h3>
        <input id="password" name="password" type="password" required />

        <button type="submit">Sign in</button>

        <p>Don't have an account? <a href="/logIn-SignUp/sign_up">Sign up</a></p> {/* Link to sign-up */}
      </form>
    );
  } else if (type === "sign_up") {
    return (
      <form style={{ margin: "auto", width: "50%", textAlign: "center" }} action={sign_up}>
        <h3>Username</h3>
        <input id="username" name="username" required />

        <h3>Password</h3>
        <input id="password" name="password" type="password" required />

        <h3>Re-enter your password</h3>
        <input id="passwordCheck" name="passwordCheck" type="password" required />

        <button type="submit">Sign up</button>

        <p>Already have an account? <a href="/logIn-SignUp/log_in">Log in</a></p> {/* Link to log-in */}
      </form>
    );
  } else {
    console.log("Invalid type");
    redirect("/");
  }
}

export default async function Page({ params }: { params: Promise<{ Type: string }> }) {
  const type = (await params).Type; // Ensure route and dynamic param name match
  const cookie = await cookies();

  if (cookie.has("haveSignedIn")) {
    redirect("/profile/" + cookie.get("haveSignedIn")?.value);
  }

  return (
    <div>
      <h1>ClubScout</h1>
      <Form type={type} />
    </div>
  );
}