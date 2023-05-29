import { getServerSession } from "next-auth";
import styles from "./page.module.css";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SigninAndSignoutButtons from "./components/SigninAndSignoutButtons/SigninAndSignoutButtons";

export default async function Home() {
  const session: { user: UserSession } | null = await getServerSession(
    authOptions
  );

  //TO PROTECT THE PAGE, WE NEED TO CHECK THE SESSION
  // if (!session) {
  //   //REDIRECT TO THE LOGIN PAGE
  // }
  //BUT I AM USING A MIDDLEWARE TO HANDLE THIS
  return (
    <main className={styles.main}>
      <div>{JSON.stringify(session)}</div>
      <h1>Content is here</h1>
      <SigninAndSignoutButtons session={session} />
    </main>
  );
}
