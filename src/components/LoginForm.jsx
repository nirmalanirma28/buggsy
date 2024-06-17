"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import ExclamationTriangle from "../../public/icons/ExclamationTriangle";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await fetch("/data/users.json");
    const users = await data.json();

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      router.push("/dashboard");
    } else {
      setError("Incorrect email or password");
    }
    console.log(error);
  };

  return (
    <form onSubmit={handleLogin}>
      <div className=" w-login-box-width-sm h-login-box-height-sm  md:h-login-box-height bg-gray-200 md:w-login-box-width flex items-center justify-center flex-col">
        <p className="text-xl text-slate-900 font-bold">Login</p>
        <input
          type="text"
          name="email"
          placeholder="email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-64 my-4 md:w-96 h-12 p-4"
        />
        <input
          type="text"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-64 my-4 md:w-96 h-12 p-4"
        />
        {error && (
          <div className="flex gap-2 text-red-500 items-center">
            <ExclamationTriangle />
            <p>{error}</p>
          </div>
        )}
        <button
          type="submit"
          className="w-auto h-auto bg-slate-900 text-white rounded-lg px-10 py-3 font-bold text-lg mt-4"
        >
          Log In
        </button>
        <Link
          href="/ResetPassword"
          className="mt-2 underline text-sm md:text-lg"
        >
          Forgot your password?
        </Link>
      </div>
    </form>
  );
};
export default LoginForm;
