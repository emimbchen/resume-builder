import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from "@remix-run/react";
import Logo from '/logo-default.svg';
import { UserCircleIcon } from '@heroicons/react/16/solid';

let activeBtnStyle = "underline underline-offset-4 decoration-secondary decoration-2";
const Header: React.FC = () => {
    return (
        <header className="py-4 shadow-md">
            <div className='container flex justify-between items-center'>
                <Link to="/">      
                    <img src={Logo} alt="Resume Tailor" width="200px" />
                </Link>
                {/* <nav>
                    <ul className='flex gap-x-3 text-black text-lg'>
                        <li>
                            <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? activeBtnStyle : ""
                            }
                            >
                            Home
                            </NavLink>
                        </li>
                        <li>
                        <NavLink
                            to="/content"
                            className={({ isActive }) =>
                                isActive ? activeBtnStyle : ""
                            }
                            >
                            My Experience
                            </NavLink>
                        </li>
                 
                    </ul>
                </nav> */}
                <div className='flex gap-x-3'>
                    <button className='button--secondary button'>Log in</button>
                    <button className='button--primary button'>Sign up</button>
                </div>
            </div>
        </header>
    );
};

export default Header;