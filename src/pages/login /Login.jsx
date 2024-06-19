import React, { useContext, useRef ,useState} from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";

function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [error, setError ] = useState("")

  const handleSubmit = async (e) => {
    // here we are using async function as we are making call to API
    e.preventDefault();
    dispatch({
      type: "LOGIN_START",
    });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      // console.log(err.request.response)
      setError(err.request.response)
      // console.log(error)
    }
  };


  return (
    <div className=" h-screen flex flex-col  justify-center bg-cover items-center bg-login-page ">
      <div className=" bg-slate-400 p-5 flex flex-col items-center rounded-3xl bg-opacity-35">
        <span className=" text-5xl font-lora text-black font-black">Login</span>

        <form className=" mt-5 flex flex-col" onSubmit={handleSubmit}>
          <label className=" mt-3 mb-3 font-black font-lora text-xl">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username..."
            className=" p-3 bg-white border-none rounded-lg focus:outline-none "
            ref={userRef}
          />

          <label className=" mt-3 mb-3 font-black font-lora text-xl">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password...."
            className=" p-3 bg-white border-none rounded-lg focus:outline-none"
            ref={passwordRef}
          />

          <button
            type="submit"
            className=" mt-5 cursor-pointer bg-teal-600 text-white p-3 border-none rounded-lg text-center hover:bg-teal-500 disabled:cursor-not-allowed disabled:bg-teal-100"
            disabled ={isFetching}
          >
            Login
          </button>
        </form>
        <button className=" absolute top-14 right-5 bg-teal-600 cursor-pointer p-2 border-none text-white rounded-lg mt-2 hover:bg-teal-500">
          <Link to="/register"> Register </Link>
        </button>
      </div>
      {error && <span className=" text-red-600 font-black pt-2">{error}</span>}  
      {/*  here setting the error message on the basis of invalid username and password  */}
    </div>
  );
}

export default Login;
