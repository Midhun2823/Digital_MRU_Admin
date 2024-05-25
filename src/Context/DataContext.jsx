import React, { createContext, useEffect, useState } from "react";


export const DataContext = createContext();

const DataContextProvider = (props) => {
  // const url = "https://digital-mru-backend.onrender.com";
  const url = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState("");
  const [admindetails, setAdminDetails] = useState("");

  useEffect(() => {
    // why we are adding is clearly explained in this function definetion
    async function loadData() {
      //   await fetchFoodItems();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token")); // when the token is avaiable we will set the token in this state so by this if we reload the page also we can access the same token
        // await loadCartData(localStorage.getItem("token")); // token is key name
        // const stringifiedObject = ;
        const myObject = JSON.parse(localStorage.getItem("admin"));
        setAdminDetails(myObject);
        // window.location.reload();
      }
    }
    loadData();
  }, []);

  // useEffect(() => {
  //   window.location.reload();
  // }, []);

  const contextValue = {
    admindetails,
    setAdminDetails,
    url,
    token,
    setToken,
  };
  console.log(JSON.stringify(admindetails) + " admindetails");
  return (
    <DataContext.Provider value={contextValue}>
      {props.children}
    </DataContext.Provider>
  );
};
export default DataContextProvider;
