import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import assert from "../../assets/assets.js";
import { useContext } from "react";
import { DataContext } from "../../Context/DataContext.jsx";
import { useNavigate } from "react-router-dom";
import Home from "../../Components/Home/Home.jsx";

const Orders = () => {
  const { token, admindetails,url } = useContext(DataContext);

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list"); // as this is get request we need not to pass and headers or token to it
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("Error");
    }
  };
  // let [deliverytype, setDeliveryType] = useState("hi No delivery");

  // for changing thr delivery status in database
  const updateStatusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/updatestatus", {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      await fetchAllOrders(); // so that all the orders are refreshed // why we do refresh because to get the updated values
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      // When ever the token is not avaiable this if bolck will be excueted
      // we navigate to cart page
      toast.error("Please Login to your Account!......");
      navigate("/");
    } else {
      fetchAllOrders();
    }
  }, [token]);

  return (
    <div>
      {admindetails.approved ? (
        <div className="">
          <h1 className="text-center text-decoration-underline fw-bold my-4">
            Orders
          </h1>
          <div>
            {orders.map((order, index) =>
             {
              if(order.items) {
                return(order.items.map((check) => {
                console.log(check.type + " hi " + check.stall_name);
                console.log(
                  admindetails.admintype +
                    " Hello " +
                    admindetails.admincategory
                );
                if (
                  (check.type === admindetails.admintype &&
                    check.stall_name === admindetails.admincategory) ||
                  admindetails.admintype === "2111CS010283"
                ) {
                  console.log(check.type + " Inside hi " + check.stall_name);
                  console.log(
                    admindetails.admintype + " Inside Hello " + order.status
                  );
                  return (
                    <div
                      className={
                        order.status === "Delivered"
                          ? "bg-success rounded py-1"
                          : ""
                      }
                    >
                      <div
                        key={index}
                        className={
                          order.ordercanceled
                            ? "row border border-warning border-2 rounded p-2 m-4 bg-danger"
                            : "row border border-warning border-2 rounded p-2 m-4  "
                        }
                      >
                        <div className="col-md-1">
                          <img
                            className=""
                            src={assert.Parcel_Icon}
                            width="36"
                          />
                        </div>

                        <div className="col-md-4">
                          <div>
                            {order.items.map((item, index1) => {
                              if (index === order.items.length - 1) {
                                return item.name + " x " + item.quantity;
                              } else {
                                return item.name + " x " + item.quantity + ", ";
                              }
                            })}
                          </div>
                          <div>
                            {order.address.firstname +
                              " " +
                              order.address.lastname}
                            <div>
                              <p>
                                {order.address.school}
                                {"\t,"}
                                {order.address.course}
                                {"\t,"}
                                {order.address.branch}
                              </p>
                            </div>
                            <div>{order.address.phonenumber}</div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div>
                            <i>Items:</i> {order.items.length}
                          </div>
                          <div>
                            <i>Items Amount:</i>{" "}
                            {order.amount + order.discount - order.delivery}
                          </div>
                          <div>
                            <i>Delivery Amount:</i> {order.delivery}
                          </div>
                          <div>
                            <i>Discount Recieved:</i> {order.discount}
                          </div>
                          <div>
                            <i>Amount:</i> {order.amount}
                          </div>
                        </div>
                        <div className="col-md-2 pt-2 ">
                          {order.ordercanceled ? (
                            <div className="mt-4">
                              {" "}
                              <p className=" border border-5 border-dark  fw-bold  p-2 m-1 bg-secondary bg-opacity-75">
                                Order Canceled
                              </p>
                            </div>
                          ) : (
                            <div className="">
                              <i>Delivery Status: </i>
                              {order.address.delivery
                                ? "hello No delivery"
                                : `Delivery to ${
                                    order.address.deliverytoclass
                                      ? "Classroom"
                                      : "Building"
                                  }`}
                            </div>
                          )}
                        </div>
                        {/* {
      if (order.address.deliverytoclass) {
        setDeliveryType("Delivery to Classroom")
      } else if (order.address.deliverytobuilding) {
        setDeliveryType("Delivery to Building")
      } else if (order.address.delivery) {
        setDeliveryType("hello No delivery")
      }
    } */}
                        <div className="col-md-2">
                          {order.ordercanceled ? (
                            <div className="mt-2 text-center bg-danger bg-opacity-25 p-1 border border-dark border-2">
                              <div className="fw-bold text-decoration-underline">
                                Canceled Amount status:{" "}
                              </div>
                              {order.address.canceledorderpayment ? (
                                <span className="text-warning fw-bold bg-success px-3 rounded">
                                  Paid
                                </span>
                              ) : (
                                <span className="text-warning">Not Paid</span>
                              )}

                              <div className="bg-dark text-danger py-2 fs-3 rounded fw-bold">
                                {Math.round(`${(30 * order.amount) / 100}`)}/-
                              </div>
                            </div>
                          ) : (
                            <div>
                              <select
                                onChange={(event) =>
                                  updateStatusHandler(event, order._id)
                                }
                                value={order.status}
                                className="form-select"
                                aria-label="Default select example"
                              >
                                <option value="Items are Processing" selected>
                                  Items are Processing
                                </option>
                                <option value="Out for Delivery">
                                  Out for Delivery
                                </option>
                                <option value="Delivered">Delivered</option>
                              </select>
                              <div className="fs-6">
                                <p>Placed On: {order.date}</p>
                              </div>
                            </div>
                          )}
                        </div>
                        <div></div>
                      </div>
                    </div>
                  );
                }
              }))
              }
              
            })}
          </div>
        </div>
      ) : (
        <Home></Home>
      )}
    </div>
  );
};

export default Orders;
