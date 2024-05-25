import React from "react";
import assets from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="border border-danger border-top-0 border-start-0 border-bottom-0 border-5  bg-info bg-opacity-25 p-4 ">
      <div className="rounded-pill text-center row">
        <div className="col-md-12">
          <NavLink to='/add' className="btn btn-outline-danger border border-warning border-4 rounded-5 px-5 pt-4 m-2">
            <img width="60" src={assets.Add_Icon} alt="additems" />
            <div className="fw-bold">Add Items</div>
          </NavLink>
        </div>
        <div className="col-md-12">
          <NavLink to="/list" className="btn btn-outline-danger border border-warning border-4 rounded-5 px-5 pt-4 m-2">
            <img width="60" src={assets.List_Icon} alt="listitems" />
            <div className="fw-bold">List Items</div>
          </NavLink>
        </div>
        <div className="col-md-12">
          <NavLink to='/orders' className="btn btn-outline-danger border border-warning border-4 rounded-5 px-5 pt-4 m-2">
            <img width="60" src={assets.Orders_Icon} alt="orders" />
            <div className="fw-bold">Orders</div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
