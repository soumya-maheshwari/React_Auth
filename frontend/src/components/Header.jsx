import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <header className="header">
        <div className="logo">
          <Link to="/">logo</Link>
        </div>
        <ul>
          <li>
            <Link to="/login">
              <FaSignInAlt />
              login
            </Link>
          </li>
          <li>
            <Link to="/register">
              <FaSignOutAlt />
              register
            </Link>
          </li>
        </ul>
      </header>
    </>
  );
};

export default Header;
