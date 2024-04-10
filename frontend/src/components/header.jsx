import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <div className=" bg-slate-300 px-10 py-4 flex justify-between mb-10">
            <Link to='/'>Home</Link>
            <div className=' flex items-center gap-10'>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
            </div>
        </div>
    );
}

export default Header;
