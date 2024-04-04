
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import { useContext, useEffect, useState } from 'react';

const NavBar = () => {
    const {user, logOut} = useContext(AuthContext);
    
    const email = user?.email;




    const navlinks = (
        <>
            <li><NavLink to="/">Home</NavLink></li>

            { !user && <li><NavLink to="/register">Register</NavLink></li>}
            { user &&(
                <div className="flex flex-col lg:flex-row">
                        <li><NavLink to="/profile">Profile</NavLink></li>
                    </div> )
            }
        </>)

    const handleSignOut = () =>{
        logOut()
            .then()
            .catch()
    }

    return (
        <div>
            <div className="navbar bg-base-100 lg:px-20 md:px-5">
                <div className="navbar-start">
                    <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navlinks}
                    </ul>
                    </div>

                    <a className="font-bold text-xl md:text-4xl w-full">Website Name </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navlinks}
                    </ul>
                </div>
                <div className="navbar-end w-fit md:w-1/2 ml-auto">
                {
                    user ? 
                    <>
                        
                        <p className="text-md font-bold mr-2">{user.displayName}</p>    
                        <div className="dropdown dropdown-end md:mx-2">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                <img src={user.photoURL} />
                                </div>
                            </label>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content  bg-base-100 rounded-box w-52 md:hidden">
                                <li className='flex flex-row'> <img src="https://www.svgrepo.com/show/21304/logout.svg" className='w-10'/> <button onClick={handleSignOut}>LogOut</button></li>
                            </ul>
                            
                        </div>
                        <button className="btn hidden md:block" onClick={handleSignOut} >LogOut</button>
                    </>
                    :
                    <Link to="/login">
                        <button className="btn">Login</button>
                    </Link>
                }
                </div>
            </div>
        </div>
    );
};

export default NavBar;