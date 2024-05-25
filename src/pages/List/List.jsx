import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import assets from "../../assets/assets.js";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../Context/DataContext.jsx";
import Home from "../../Components/Home/Home.jsx";

const List = () => {
  const { token, admindetails, url } = useContext(DataContext);

  // const url = "http://localhost:4000";
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    // console.log(response.data);
    if (response.data.success) {
      // this excutes only when the data is loaded in response variable
      setList(response.data.data); // data is saved in List variable
    } else {
      toast.error("Error");
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });

    // after removing the data we need to fetch the data and display so ......
    await fetchList();
    if (response.data.success) {
      // this excutes only when the data is loaded in response variable
      toast.success(response.data.message); // data is saved in List variable
    } else {
      toast.error("Error");
    }
  };

  //pending to modify
  // const StockFood = async (foodId) => {
  //   const response = await axios.post(`${url}/api/food/stockFood`, {
  //     id: foodId,
  //   });

  //   // after removing the data we need to fetch the data and display so ......
  //   await fetchList();
  // };

  // when the page is load we have to run the fetchList function

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      // When ever the token is not avaiable this if bolck will be excueted
      // we navigate to cart page
      toast.error("Please Login to your Account!......");
      navigate("/");
    } else {
      fetchList();
    }
  }, [token]);
  return (
    <div> {admindetails.approved ? <div>
        <h1 className="text-center text-decoration-underline fw-bold my-4">
          All Items list
        </h1>
        <div>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Type/Stall/Category</th>
                <th scope="col">Price</th>

                {/* pending to modify  */}
                {/* <th scope="col">No_Stock</th> */}

                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item, index) => {
                if (
                  (item.type === admindetails.admintype &&
                    item.stall_name === admindetails.admincategory) ||
                  admindetails.admintype === "2111CS010283"
                ) {
                  return (
                    <tr key={index} className="fw-bold">
                      <th>
                        <img src={`${url}/images/` + item.image} width="102" />
                      </th>
                      <td>{item.name}</td>
                      <td className="pt-4">
                        <div className="row">
                          <div className="col-md-4 hstack">
                            <img
                              className=""
                              src={assets.Right_Arrow}
                              width="40"
                              height="40"
                            />
                            <div>{item.type}</div>
                          </div>

                          <div className="col-md-4 hstack">
                            <img
                              className=""
                              width="40"
                              height="40"
                              src={assets.Right_Arrow}
                            />
                            <div>{item.stall_name}</div>
                          </div>
                          <div className="col-md-4 hstack">
                            <img
                              className=""
                              src={assets.Right_Arrow}
                              width="40"
                              height="40"
                            />
                            <div>{item.category}</div>
                          </div>
                        </div>
                      </td>
                      <td>{item.new_price}/-</td>

                      {/* //pending to modify */}
                      {/* <td onClick={() => StockFood(item._id)}>
                      <input
                        
                        type="checkbox"
                        name="nostock"
                      />
                    </td> */}
                      <td onClick={() => removeFood(item._id)}>
                        <img
                          className="top-0 end-0 hovermanual p-2"
                          width="48"
                          src={assets.Cross_Icon_For_Login}
                        />
                        
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </div>:<Home></Home>}
      
    </div>
  );
};

export default List;
