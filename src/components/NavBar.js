import "../../css/NavBar.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DOMAIN_NAME, GET_USER_ID } from "../constant";

const NavBar = () => {
  const [searchText, setSearchText] = useState("");
  const accessToken = localStorage.getItem("token");
  const [userId, setUserId] = useState("");

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/">
          <div className="logo">Book Exchange</div>
        </Link>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button>Search</button>
        </div>
        <div className="account">
          <Link to="/add-book">Add Book</Link>
          <Link to="/profile/">Profile</Link>
          <Link to="/personal-recomentations">For You</Link>
          <a href="#">Sign Out</a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
