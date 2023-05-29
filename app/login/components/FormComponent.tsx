"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function FormComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const submitFunction = async function (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email && password) {
      const res = await signIn("credentials", {
        redirect: false, //we do not want the page to be reloaded when there is an error since we want to handle it
        email,
        password,
      });

      if (res?.error) {
        alert(res.error);
      } else {
        router.push("/");
      }
    }
  };

  const googleSigninHanlder = async function () {
    const res = await signIn("google", {
      redirect: false,
    });

    if (res?.error) {
      alert(res.error);
    } else {
      router.push("/");
    }
  };

  return (
    <div>
      <form
        onSubmit={submitFunction}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label htmlFor="email">Email</label>
        <input
          required={true}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          id="email"
          type="text"
          placeholder="your email"
          name="email"
        />
        <label htmlFor="email">Email</label>
        <input
          required={true}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="password"
          id="password"
          name="password"
        />
        <button type="submit">Submit</button>
      </form>
      {/* GOOGLE BUTTON */}
      <button onClick={googleSigninHanlder}>Sign in with google account</button>
    </div>
  );
}
