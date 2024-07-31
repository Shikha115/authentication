import React, { useState } from "react";
import axios from "axios";

function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const btnCss =
    "w-full py-2 rounded-full bg-blue-400 text-gray-100 focus:outline-none";
  const inputCss =
    "w-full border rounded px-3 py-2 text-gray-700 focus:outline-none";

  const register = async (e) => {
    e.preventDefault();
    try {
      const response=await axios.post("http://localhost:8000/register", {
        username,
        password,
      });
      setMessage("User registered successfully");
      console.log("response: ", response);
    } catch (error) {
      setMessage("Error registering user: " + error);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/login", {
        username,
        password,
      });
      setToken(response.data.token);
      console.log("response: ", response);
      setMessage("User logged in successfully");
    } catch (error) {
      setMessage("Error logging in: " + error);
    }
  };

  const accessProtected = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:8000/protected", {
        headers: { Authorization: `Bearer ${token}` }, //set header
      });
      setMessage(response.data);
      console.log("response: ", response);
    } catch (error) {
      setMessage("Error accessing protected route: " + error);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-indigo-100">
      <form className="w-full md:w-2/3 rounded-lg">
        <h2 className="text-3xl font-semibold text-center text-black mb-8">
          JWT Authentication
        </h2>
        <div className="px-12 pb-10">
          <div className="w-full mb-2">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={inputCss}
                required
              />
            </div>
          </div>
          <div className="w-full mb-2">
            <div className="flex items-center">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputCss}
                required
              />
            </div>
          </div>
          <div className="flex flex-row items-center gap-x-2 mt-8">
            <button onClick={(e) => register(e)} className={btnCss}>
              Register
            </button>
            <button onClick={(e) => login(e)} className={btnCss}>
              Login
            </button>
            <button onClick={(e) => accessProtected(e)} className={btnCss}>
              Access Protected Route
            </button>
          </div>
          {message && <p className="text-black">{message}</p>}
        </div>
      </form>
    </div>
  );
}

export default Auth;
