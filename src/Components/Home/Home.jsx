import React from "react";
import { useContext } from "react";
import { DataContext } from "../../Context/DataContext";
import assests from "../../assets/assets.js";
import "./Home.css";

const Home = () => {
  const { token, admindetails } = useContext(DataContext);
  return (
    <div className="bg-secondary bg-opacity-25 rounded px-3 pb-2">
      <div>
        <div>
          {!token ? (
            <div className="">
              <div className="text-center space ">
                <h1 className="fw-bold fs-1 text-decoration-underline link-underline-danger pt-3">
                  Login to your account
                </h1>
              </div>
              <div className="bg-secondary bg-opacity-25 rounded-pill  text-center py-4 mt-5">
                <div
                  className="spinner-grow text-primary m-2 "
                  style={{ width: "60px", height: "60px" }}
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div
                  className="spinner-grow text-secondary m-2 "
                  style={{ width: "60px", height: "60px" }}
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div
                  className="spinner-grow text-success m-2 "
                  style={{ width: "60px", height: "60px" }}
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div
                  className="spinner-grow text-danger m-2 "
                  style={{ width: "60px", height: "60px" }}
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div
                  className="spinner-grow text-warning m-2 "
                  style={{ width: "60px", height: "60px" }}
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div
                  className="spinner-grow text-info m-2 "
                  style={{ width: "60px", height: "60px" }}
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div
                  className="spinner-grow text-light m-2 "
                  style={{ width: "60px", height: "60px" }}
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div
                  className="spinner-grow text-dark m-2"
                  style={{ width: "60px", height: "60px" }}
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div>
        <div>
          {token && !admindetails.approved ? (
            <div>
              <div className="text-center space">
                <h1 className="m-3 fw-bold fs-1 text-decoration-underline link-underline-danger pt-3">
                  Your account is under processing
                </h1>
                <p className="lead">
                  Please come back after sometime (Logout your account)
                </p>
              </div>
              <div className="bg-secondary bg-opacity-25 rounded-pill  text-center py-4 mt-5">
                <div
                  className="spinner-grow text-primary m-2 "
                  style={{ width: "60px", height: "60px" }}
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div
                  className="spinner-grow text-secondary m-2 "
                  style={{ width: "60px", height: "60px" }}
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div
                  className="spinner-grow text-success m-2 "
                  style={{ width: "60px", height: "60px" }}
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div
                  className="spinner-grow text-danger m-2 "
                  style={{ width: "60px", height: "60px" }}
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div
                  className="spinner-grow text-warning m-2 "
                  style={{ width: "60px", height: "60px" }}
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div
                  className="spinner-grow text-info m-2 "
                  style={{ width: "60px", height: "60px" }}
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div
                  className="spinner-grow text-light m-2 "
                  style={{ width: "60px", height: "60px" }}
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div
                  className="spinner-grow text-dark m-2"
                  style={{ width: "60px", height: "60px" }}
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div >
        <div>
          {token && admindetails.approved ? (
            <div className="text-center ">
              <img className="rounded-5 border border-dark border-4 p-2 m-4 bg-warning bg-opacity-75" src={assests.MRU_Building} width="66%" />
              <h1 className="fw-bold">Welcome Boss Good to see you hear......</h1>
              <p className="lead pb-2">Proceed......</p>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
