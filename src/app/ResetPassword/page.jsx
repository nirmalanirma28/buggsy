"use client";

import Link from "next/link";
import { useState } from "react";
import ExclamationTriangle from "../../../public/icons/ExclamationTriangle";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await fetch("/data/users.json");
    const users = await data.json();

    const user = users.find((user) => user.email === email);

    if (user) {
      alert("password reset email is sent");
      setEmail("");
      setError("");
    } else {
      setError("That email address does not match our records");
    }
    console.log(error);
  };

  return (
    <form
      onSubmit={handleLogin}
      className="w-login-box-width-sm h-login-box-height-sm flex items-center justify-center flex-col md:h-login-box-height md:w-login-box-width bg-gray-200 p-8 md:px-20"
    >
      <p className="font-bold mb-3 text-sm md:text-lg"> Reset your password</p>
      <p className="text-sm md:text-lg text-justify">
        Enter the email associated with your account and we'll send you a link
        to reset your password
      </p>
      <input
        type="text"
        name="email"
        placeholder="email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-64 my-4 md:w-96 h-12 p-4"
      />
      {error && (
        <div className="flex gap-2 text-red-500 items-center">
          <ExclamationTriangle />
          <p className="text-sm md:text-lg">{error}</p>
        </div>
      )}
      <button
        type="submit"
        className="md:w-auto md:h-auto w-28 h-10 bg-slate-900 text-white rounded-lg px-10 py-3 font-bold text-lg mt-4 flex items-center justify-center"
      >
        Submit
      </button>
      <Link href="/dashboard" className="mt-4 underline text-sm md:text-lg">
        Return to sign in
      </Link>
    </form>
  );
};
export default ResetPassword;
