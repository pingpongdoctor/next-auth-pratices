import NextAuth, { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { SERVER_DIRECTORY } from "next/dist/shared/lib/constants";
const SERVER_URL = process.env.SERVER_URL;

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },

  pages: {
    signIn: "/login",
  },
  providers: [
    //CREDENTIALS
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Sign-in",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        } else {
          const res = await fetch(`${SERVER_URL}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });
          //INSTEAD OF CHECKING THE STATUS, WE CAN CHECK THE RES.OK
          //RES.OK IS TRUE WHEN THE STATUS IS FROM 200=>299
          if (!res.ok) {
            return null;
          }

          //IF RES.OK IS TRUE
          const data: { message: string; user: User } = await res.json();
          console.log(data);
          //RETURN USER ID
          return {
            id: data.user.id,
            name: data.user.username,
            email: credentials.email,
          };
        }
      },
    }),
    //GOOGLE PROVIDERS
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    //JWT FUNCTION
    async jwt({ user, token, account, profile, trigger, session }) {
      //IF USING OAUTH, WE ACCESS PROFILE AND CAN CHECK IF(ACCOUNT){TOKEN.ACCESSTOKEN=ACCOUNT.ACCESSTOKEN} TO ADD ACCESS TOKEN TO TOKEN
      // console.log("token", token);
      // console.log("user", user);
      // console.log("account", account);
      // console.log("profile", profile);
      // console.log("trigger", session);
      // console.log("session", session);
      //CHECK IF UPDATE FUNCTION IS USED TO GET NEW UPDATED DATA
      // if (trigger === "update" && session?.name) {
      //   return { ...token, ...user, name: session.name };
      // }

      //CHECK IF PROVIDER IS GOOGLE
      if (account?.provider === "google") {
        //MAKE A POST REQUEST TO CREATE NEW USER ACCOUNT IN CASE THIS IS A NEW USER OR GET USER ID IN CASE THIS USER ALREADY EXIST
        const googleId = account.providerAccountId;
        const email = profile?.email;

        if (googleId && email) {
          const res = await fetch(`${SERVER_URL}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              googleId,
              email,
            }),
          });

          const data = await res.json();

          return { ...token, ...user, id: data.id };
        }
      }

      return { ...token, ...user };
    },
    //SESSION FUNCTION
    async session({ session, token }) {
      return { ...session, user: { ...session.user, id: token.id } };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
