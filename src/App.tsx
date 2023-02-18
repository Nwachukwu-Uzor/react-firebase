import React, { useState } from "react";

import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";

const App = () => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  // const auth = getAuth(app);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs((old) => ({ ...old, [name]: value }));
  };

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();

    alert(JSON.stringify(inputs));
    setInputs({ email: "", password: "" });
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      );
      console.log(userCredential.user);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      );
      console.log(userCredential.user);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await signInWithPopup(auth, googleProvider);
      console.log(response.user);
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  const handleGithubSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await signInWithPopup(auth, githubProvider);
      console.log(response.user);
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  return (
    <main>
      <form
        onSubmit={handleLogin}
        className="w-[90%] max-w-[300px] my-7 mx-auto flex flex-col gap-2"
      >
        {isLoading ? <h2>Loading....</h2> : null}
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={inputs.email}
          onChange={handleChange}
          className="py-1 px-3 border-2  border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={inputs.password}
          onChange={handleChange}
          className="py-1 px-3 border-2  border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-700 px-5 py-1.5 rounded-md text-white"
        >
          Submit
        </button>
        <button
          type="button"
          className="bg-blue-700 px-5 py-1.5 rounded-md text-white"
          onClick={handleGoogleSignin}
        >
          Sign in with Google
        </button>
        <button
          type="button"
          onClick={handleGithubSignup}
          className="bg-black px-5 py-1.5 rounded-md text-white"
        >
          Sign in with Github
        </button>
      </form>
    </main>
  );
};

export default App;
