import React, { useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { database } from "./firebaseConfig";
import Loader from "./components/Loader";
import { User as UserType } from "./types";
import User from "./components/User";
import Container from "./components/Container";
import TextInput from "./components/TextInput";

const DatabaseApp: React.FC = () => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<UserType[]>([]);

  const collectionRef = collection(database, "users");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs((old) => ({ ...old, [name]: value }));
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    setIsLoading(true);
    try {
      const response = await addDoc(collectionRef, {
        ...inputs,
      });
      console.log("Data Added", response);
    } catch (error) {
      alert(JSON.stringify(error));
    } finally {
      setIsLoading(false);
      getData();
    }
  };

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await getDocs(collectionRef);
      const data = response.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as UserType[];
      console.log(data);
      setUsers(data);
    } catch (error) {
      alert(JSON.stringify(error));
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (userId: string, name: string, password: string) => {
    try {
    } catch (error) {}
  };

  return (
    <main>
      <form
        onSubmit={handleSubmit}
        className="w-[90%] max-w-[300px] my-7 mx-auto flex flex-col gap-2"
      >
        {isLoading ? <Loader /> : null}
        <TextInput
          type="text"
          placeholder="Email"
          name="email"
          value={inputs.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          placeholder="Password"
          name="password"
          value={inputs.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-700 px-5 py-1.5 rounded-md text-white"
        >
          Submit
        </button>
        <button
          type="button"
          className="bg-green-800 px-5 py-1.5 rounded-md text-white"
          onClick={getData}
        >
          Get Data
        </button>
      </form>
      {users?.length ? (
        <Container>
          <div className="grid gap-2 grid-cols-1 lg:grid-cols-3">
            {users.map((user) => (
              <User {...user} key={user.id} updateUser={updateUser} />
            ))}
          </div>
        </Container>
      ) : null}
    </main>
  );
};

export default DatabaseApp;
