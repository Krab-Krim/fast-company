import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <ul className="nav nav-pills justify-content-center m-2">
            <li className="nav-item">
                <NavLink className="nav-link" exact={true} to="/">Main</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/login">Login</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/users">Users</NavLink>
            </li>
        </ul>
    );
};

export default NavBar;
