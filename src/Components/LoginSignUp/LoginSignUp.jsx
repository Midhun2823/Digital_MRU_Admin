import React, { useState } from "react";
import assets from "../../assets/assets.js";
import axios from "axios";
import { toast } from "react-toastify";

import "./LoginSignUp.css";
import { useContext } from "react";
import { DataContext } from "../../Context/DataContext.jsx";
const LoginSignUp = ({ setShowLogin }) => {
  const { url, setToken } = useContext(DataContext);

  const [currentState, setCurrentState] = useState("Login");

  // Details of Customer Profession
  const Types = [
    { label: "Select your Admin Type", value: "Canteen" },
    { label: "Canteen", value: "Canteen" },
    { label: "Stationary", value: "Stationary" },
  ];

  const Categories = {
    Canteen: [
      "Select the Admin Category",
      "continentalcoffee",
      "sips",
      "burgerking",
      "hakkawork",
      "fivestar",
      "teawonders",
    ],
    Stationary: ["Select the Admin Category", "None"],
  };

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    admintype: "",
    admincategory: "",
    phonenumber: "",
    approved: false,
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  // For admin login we create function
  const onLogin = async (event) => {
    event.preventDefault();

    //now we create the logic to call the apis
    // to call the api we need axios support in frontend
    // create instance or the url
    let newUrl = url;
    if (currentState === "Login") {
      newUrl += "/api/admin/login";
    } else {
      newUrl += "/api/admin/register";
    }

    // call the api
    // this url works in any situation like login or register
    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      // if it comes to here it means we logged in or registered in
      // we will get one token
      setToken(response.data.token);
      // save this token in local storage

      toast.success("Logged In Successfully");
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("admin", response.data.admin);
      window.location.reload();
      setShowLogin(false);
    } else {
      toast.error(response.data.message);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const showHandler = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-popup">
      <form
        onSubmit={onLogin}
        className="login-popup-container border border-dark border-4"
      >
        <div className="position-relative">
          <h1>{currentState}</h1>

          <img
            className="position-absolute top-0 end-0 hovermanual p-2"
            width="48"
            src={assets.Cross_Icon_For_Login}
            onClick={() => setShowLogin(false)}
          />
        </div>
        <div>
          {currentState === "Sign Up" ? (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              className="form-control  mb-2"
              placeholder="Your Name"
              required
            />
          ) : (
            <></>
          )}
          <div className="mb-2">
            <input
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              className="form-control"
              placeholder="Email Id"
            />
            {/* <span className="input-group-text rounded-end-2" id="basic-addon2">
              @mallareddyuniversity.ac.in
            </span> */}
            <div id="emailHelp" className="form-text ms-1">
              We'll never share your email with anyone else.
            </div>
          </div>

          <div className="">
            <div className="input-group mb-2">
              <input
                name="password"
                onChange={onChangeHandler}
                value={data.password}
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Password"
                aria-describedby="emailHelp"
                required
              />
              <img
                width="48"
                className="input-group-text rounded-end-2"
                onClick={() => showHandler()}
                src={showPassword ? assets.Eye_Visible : assets.Eye_Not_Visible}
              />
            </div>
            {currentState === "Sign Up" ? (
              <div className="input-group mb-2">
                <input
                  name="confirmpassword"
                  onChange={onChangeHandler}
                  value={data.confirmpassword}
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Confirm Password"
                  required
                />
                <img
                  width="48"
                  className="input-group-text rounded-end-2"
                  onClick={() => showHandler()}
                  src={
                    showPassword ? assets.Eye_Visible : assets.Eye_Not_Visible
                  }
                />
              </div>
            ) : (
              <></>
            )}
          </div>
          {currentState === "Sign Up" ? (
            <div className="bg-secondary bg-opacity-25 rounded p-1 mb-2">
              <select
                name="admintype"
                onChange={onChangeHandler}
                value={data.admintype}
                className="form-select mb-2"
                aria-label="Default select example"
              >
                {Types.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>
              <div>
                {data.admintype != "" ? (
                  <select
                    name="admincategory"
                    onChange={onChangeHandler}
                    value={data.admincategory}
                    className="form-select mb-2"
                    aria-label="Default select example"
                  >
                    {Categories[data.admintype] &&
                      Categories[data.admintype].map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                  </select>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ) : (
            <></>
          )}

          {currentState === "Sign Up" ? (
            <div className="">
              <input
                name="phonenumber"
                type="number"
                onChange={onChangeHandler}
                value={data.phonenumber}
                className="form-control mb-2"
                placeholder="Enter Phone Number"
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        <button type="submit" className="btn btn-outline-danger fw-bold fs-6">
          {currentState === "Sign Up" ? "Create An Account" : "Login"}
        </button>
        <div className="hstack from-group">
          <input type="checkbox" className="p-5" required></input>
          <p className="m-2">Accept terms and conditions</p>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span
              className="text-danger fw-bold fs-6 text-decoration-underline"
              onClick={() => {
                setCurrentState("Sign Up");
              }}
            >
              Click here
            </span>
          </p>
        ) : (
          <></>
        )}
        {currentState === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              className="text-danger fw-bold fs-6 text-decoration-underline"
              onClick={() => {
                setCurrentState("Login");
              }}
            >
              Login here
            </span>
          </p>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
};

export default LoginSignUp;
