import React, { useState } from "react";
import { User as UserProps } from "../types";
import Loader from "./Loader";
import TextInput from "./TextInput";

interface Props extends UserProps {
  updateUser: (userId: string, name: string, password: string) => Promise<void>;
}

const User: React.FC<Props> = ({ id, email, password }) => {
  const [inputs, setInputs] = useState({
    modifiedEmail: email,
    modifiedPassword: password,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs((old) => ({ ...old, [name]: value }));
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  const toggleEditMode = () => {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      setInputs({ modifiedEmail: email, modifiedPassword: password });
    }
  };

  return (
    <article className="bg-indigo-300 px-2 py-4 rounded-md shadow-md border-2 flex flex-col justify-center gap-2">
      <p>
        <strong>Email</strong>: {email}
      </p>
      <p>
        <strong>Password</strong>: {password}
      </p>
      <button
        type="submit"
        className="bg-purple-800 px-5 py-1.5 rounded-md text-white w-full my-3"
        onClick={toggleEditMode}
      >
        {isEditing ? "Cancel" : "Edit"}
      </button>

      {isEditing ? (
        <form
          onSubmit={handleSubmit}
          className="my-2 w-full mx-auto flex flex-col gap-2"
        >
          {isLoading ? <Loader /> : null}
          <TextInput
            type="text"
            placeholder="Email"
            name="modifiedEmail"
            value={inputs.modifiedEmail}
            onChange={handleChange}
          />
          <TextInput
            type="password"
            placeholder="Password"
            name="modifiedPassword"
            value={inputs.modifiedPassword}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-blue-700 px-5 py-1.5 rounded-md text-white"
          >
            Submit
          </button>
        </form>
      ) : null}
    </article>
  );
};

export default User;
