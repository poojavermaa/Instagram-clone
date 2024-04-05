import React, { useContext } from "react";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

function Navbar({ login }) {
  const navigate = useNavigate();
  const { setModalOpen } = useContext(LoginContext);
  const loginStatus = () => {
    const token = localStorage.getItem("jwt");
    if (login || token) {
      return [
        <>
          <Link to="profile">
            <li>Profile</li>
          </Link>
          <Link to="/createPost">
            <li>Create Post</li>
          </Link>
          <Link
            style={{ marginLeft: "20px", color: "black" }}
            to="/myfollowingpost"
          >
            My Following
          </Link>
          <Link to={""}>
            <button className="primaryBtn" onClick={() => setModalOpen(true)}>
              Log Out
            </button>
          </Link>
        </>,
      ];
    } else {
      return [
        <>
          <Link to="/signup">
            <li>SignUp</li>
          </Link>
          <Link to="/signin">
            <li>SignIn</li>
          </Link>
        </>,
      ];
    }
  };

  const loginStatusMobile = () => {
    const token = localStorage.getItem("jwt");
    if (login || token) {
      return [
        <>
          <Link to="/">
            <li><span class="material-symbols-outlined">home</span></li>
          </Link>
          <Link to="profile">
            <li><span class="material-symbols-outlined">account_circle</span></li>
          </Link>
          <Link to="/createPost">
            <li><span class="material-symbols-outlined">add_box</span></li>
          </Link>
          <Link
            style={{ marginLeft: "20px", color: "black" }}
            to="/myfollowingpost">
                <li>
                  <span class="material-symbols-outlined">explore</span>
                </li>
          </Link>
          <Link to={""}>
            <li onClick={() => setModalOpen(true)}>
            <span class="material-symbols-outlined">logout</span>
            </li>
          </Link>
        </>,
      ];
    } else {
      return [
        <>
          <Link to="/signup">
            <li>SignUp</li>
          </Link>
          <Link to="/signin">
            <li>SignIn</li>
          </Link>
        </>,
      ];
    }
  };

  return (
    <div className="navbar">
      <img
        id="insta-logo"
        src="https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram-1.png"
        alt=""
        onClick={() => {
          navigate("/");
        }}
      />
      <ul className="nav-menu">{loginStatus()}</ul>
      <ul className="nav-mobile">{loginStatusMobile()}</ul>
    </div>
  );
}

export default Navbar;
