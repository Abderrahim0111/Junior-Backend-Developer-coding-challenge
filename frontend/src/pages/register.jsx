import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/constants";



const Register = () => {
  const [userData, setuserData] = useState({});
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate()
  const handleChange = (e) => {
    setuserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const res = await fetch(BACKEND_URL + "/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: 'include',
      });
      const data = await res.json();
      if (data.error) {
        setloading(false);
        return seterror(data.error);
      }
      setloading(false);
      navigate('/')
    } catch (error) {
      setloading(false);
      seterror(error.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className=" flex flex-col max-w-lg mx-auto border border-[#262626] rounded-lg p-6 gap-3 "
    >
      <h1 className="  text-2xl text-center mb-8">Register</h1>
      <input
        onChange={handleChange}
        className=" p-3 rounded-lg border"
        type="text"
        name="email"
        placeholder="Email"
        required
      />
      <input
        onChange={handleChange}
        className=" p-3 rounded-lg border"
        type="text"
        name="name"
        placeholder="Name"
        required
      />
      <input
        onChange={handleChange}
        className=' p-3 rounded-lg border'
        type="password"
        name="password"
        placeholder="Password"
        required
      />
      <button className='p-3 rounded-lg border bg-slate-300 cursor-pointer hover:bg-slate-400 transition-all duration-300'>
        {loading ? "Loading..." : "Sign up"}
      </button>
      <p className=" ">
        Have an account?
        <Link to="/login" className=" ml-2 cursor-pointer text-[#027FFE]">
          Log in
        </Link>
      </p>
      {error && <p className=" text-red-500">{error}</p>}
    </form>
  );
};

export default Register;
