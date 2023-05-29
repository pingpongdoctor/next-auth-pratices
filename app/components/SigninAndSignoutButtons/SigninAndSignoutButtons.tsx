"use client";

import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { signIn, signOut } from "next-auth/react";
import React from "react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SigninAndSignoutButtons({ session }: { session: any }) {
  //DATA IS THE SESSION
  //CAN BE UNDEFINED-HAS NOT BEEN FETCHED, NULL-FAILED FETCHING,OBJECT-SUCCESSFUL
  //STATUS CAN BE "LOADING", "UNAUTHENTICATED", "AUTHENTICATED"
  const router = useRouter();
  const { data, status, update } = useSession();

  const sessionData = data?.user as UserSession | null;

  //   {
  //   //IF REQUIRE IS TRUE THE STATUS CAN NOT BE UNAUTHENTICATED
  //   required: true,
  //   onUnauthenticated() {
  //     //THE DEFAULT BEHAVIOUR IS TO REDIRECT TO THE LOGIN PAGE WHEN THE AUTHENTICATION IS FAILED
  //     //WE CAN ADD ADDITIONAL BEHAVIORS
  //     router.push("/api/auth/signin");
  //   },
  // }

  //TRIGGER REFRESHING SESSION TO CHECK IF SESSION TOKEN AND SESSION STORAGE ARE STILL VALID
  // Polling the session every 1 hour
  // useEffect(() => {
  //   // TIP: You can also use `navigator.onLine` and some extra event handlers
  //   // to check if the user is online and only update the session if they are.
  //   // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine

  //   //WHEN THE COMPONENTS ARE UNMOUNTED OR DEPENDENCIES CHANGE, THE CLEARINTERVAL WILL BE INVOKED FIRST (WHEN UNMOUNTING)
  //   //THE SETINTERVAL WILL BE INVOKED LATER (MOUNGTING)
  //   const interval = setInterval(() => update(), 1000 * 60 * 60); //miliseconds
  //   return () => clearInterval(interval);
  // }, [update]);

  // Listen for when the page is visible, if the user switches tabs
  // and makes our tab visible again, re-fetch the session
  // useEffect(() => {
  //   //WHEN THE COMPONENTS ARE UNMOUNTED OR DEPENDENCIES CHANGE, THE EVENT WILL BE DELETED FIRST (UNMOUNTING)
  //   //THEN THE VISIBILITY STATE IN DOCUMENT OBJECT WILL BE CHECKED TO ADD THE NEW EVENT TO THE WINDOW (MOUNTING)
  //   const visibilityHandler = () =>
  //     document.visibilityState === "visible" && update();
  //   window.addEventListener("visibilitychange", visibilityHandler, false);
  //   return () =>
  //     window.removeEventListener("visibilitychange", visibilityHandler, false);
  // }, [update]);

  return (
    <div>
      {data && (
        <div>SESSION GOTTEN FROM CLIENT COMPONENT{JSON.stringify(data)}</div>
      )}
      {!session && (
        <ButtonComponent
          btnContent="Sign in"
          btnOnclickHandler={(): void => {
            signIn("credentials");
          }}
        />
      )}
      {session && (
        <ButtonComponent
          btnContent="Sign out"
          btnOnclickHandler={() => {
            signOut();
          }}
        />
      )}
      <button
        onClick={async () => {
          //THIS ONLY TRIGGER JWT FUNCTION
          //TO TRIGGER THE SESSION FUNCTION, WE NEED TO ADJUST THE CALLBACK SESSION FUNCTION
          //IN SESSION FUNCTION, ACCESS THE UPDATED OBJECT WITH SESSION PROP IF USING CREDENTIALS AUTH
          //ACCESS UPDATED OBJECT WITH NEWSESSION PROP IF USING OAUTH
          await update({ name: "simon5" });
        }}
      >
        Update the session on the server with data
      </button>

      <button
        onClick={async () => {
          //THIS ONLY TRIGGER JWT FUNCTION
          await update();
        }}
      >
        Refresh the session from the server
      </button>
    </div>
  );
}
