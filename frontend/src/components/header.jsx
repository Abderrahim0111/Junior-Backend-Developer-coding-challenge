import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/constants";

const Header = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
        const res = await fetch(BACKEND_URL + '/logout',{
            credentials: 'include'
        })
        const data = await res.json()
        if(!data.error){
            localStorage.clear()
            navigate('/login')
        }
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
  }, [navigate, currentUser])

  return (
    <div className=" bg-slate-300 px-10 py-4 flex justify-between mb-10">
      <Link to="/">Home</Link>
      {currentUser ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <div className=" flex items-center gap-10">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </div>
  );
};

export default Header;
