import React from "react";
import {assets} from "../../assets/assets.js"
import { useContext } from "react";
import { DataContext } from "../../Context/DataContext.jsx";
import { Link, useNavigate } from "react-router-dom";import { toast } from "react-toastify";


const NavBar = ({ setShowLogin }) => {

    const { token, setToken, setAdminDetails } = useContext(DataContext);

      const navigate = useNavigate();

      const logout = () => {
        // we have to remove the token
        toast.success("Logged out Successfully");
        localStorage.removeItem("token"); // token is the key name which we assign while adding
        localStorage.removeItem("admin");
        setToken("");
        setAdminDetails("")
        // When the user gets logout we sen them to home page we use navigate hook
        navigate("/");
      };
  return (
    <div className="border border-danger border-top-0 border-start-0 border-end-0 border-5 ">
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
        <Link to="/"><img src={assets.logo} width="102" /></Link>
          
          
          {/* {!token ? (
            <li className="nav-link">
              <button
                onClick={() => setShowLogin(true)}
                className="btn btn-danger px-4 m-1 rounded-pill"
              >
                Login
              </button>
            </li>
          ) : (
            <li className="bg-secondary bg-opacity-50 rounded-pill nav-item dropdown px-2 hstack text-center">
              <Link className="nav-link " to="/profile">
                <img
                  className=""
                  width="30"
                  src={assets.Profile_Image}
                  alt="Profile_Image"
                />
              </Link>
              <div
                className="dropdown-toggle m-2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></div>
              <ul className="dropdown-menu bg-secondary bg-opacity-25 border-dark border-2 px-2">
                <li>
                  <hr className="dropdown-divider mx-2" />
                </li>
                <li onClick={logout} className="hstack btn btn-outline-danger">
                  <img
                    className="ms-4 bg-danger bg-opacity-75 rounded p-1"
                    width="36"
                    src={assets.Logout_Icon}
                  />
                  <div className="dropdown-item bg-danger bg-opacity-75 ms-2 rounded fw-bold">
                    Logout
                  </div>
                </li>
              </ul>
            </li>
          )} */}
          <div className="d-flex">
            {!token ? (
              <li className="nav-link">
                <button
                  onClick={() => setShowLogin(true)}
                  className="btn btn-danger px-4 m-3 rounded-pill"
                >
                  Login
                </button>
              </li>
            ) : (
              <li className="bg-secondary bg-opacity-50 rounded-pill nav-item dropdown px-4 py-1 hstack text-center mx-4  btn-group ">
                <Link className="nav-link " to="/profile">
                  <img
                    src={assets.profile}
                    width="52"
                    className="rounded "
                    type="submit"
                  />
                </Link>
                <div
                  className="dropdown-toggle ms-2 ps-3 "
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                ></div>
                <ul className="dropdown-menu bg-secondary bg-opacity-25 border-dark border-2 px-2">
                  <li
                    onClick={logout}
                    className="hstack btn btn-outline-danger"
                  >
                    <img
                      className="ms-4 bg-danger bg-opacity-75 rounded p-1"
                      width="36"
                      src={assets.Logout_Icon}
                    />
                    <div className="dropdown-item bg-danger bg-opacity-75 ms-2 rounded fw-bold">
                      Logout
                    </div>
                  </li>
                </ul>
              </li>
            )}
            {/* <img
              src={assets.profile}
              width="60"
              className="rounded "
              type="submit"
            /> */}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
