import React, { useEffect, useState } from "react";
import assests from "../../assets/assets.js";
import "./Add.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../Context/DataContext.jsx";
import Home from "../../Components/Home/Home.jsx";

const Add = () => {
  // const url = "http://localhost:4000/";

  // for Type, Stall, Category selection

  const { token, admindetails, url } = useContext(DataContext);
  const Types = [
    { label: "Select the Type", value: "select" },
    { label: "Canteen", value: "Canteen" },
    { label: "Stationary", value: "Stationary" },
  ];

  const Stalls = {
    Canteen: [
      "Select the Stall",
      "continentalcoffee",
      "sips",
      "burgerking",
      "hakkawok",
      "fivestar",
      "teawonders",
    ],
    Stationary: [
      "Select the Stall",
      "books",
      "writingmaterials",
      "records",
      "sheets",
      "papergoods",
      "items",
      "printouts",
    ],
  };
  const categorys = {
    continentalcoffee: [
      "Select the Category",
      "WinterSpecial",
      "Noodles",
      "Momos",
      "Omelette",
      "Fries",
      "Others",
    ],
    sips: [
      "Select the Category",
      "Shakes",
      "Mocktails",
      "Lassi",
      "Natural Juice",
      "Tea & Coffee",
    ],
    burgerking: ["Select the Category", "Veg", "Non Veg"],
    hakkawok: [
      "Select the Category",
      "Rice",
      "Noodles",
      "Combos Veg",
      "Combos Non Veg",
    ],
    fivestar: ["Select the Category", "Chicken", "Veg Items", "Snacks"],
    teawonders: [
      "Select the Category",
      "Cakes",
      "Ice Creams",
      "Chocolates",
      "Biscuits",
      "Cool Drinks",
      "Tea & Coffee",
      "Others",
    ],
    books: ["Select the Category", "Long Books", "Short Books", "Medium Books"],
    writingmaterials: [
      "Select the Category",
      "Pens",
      "Pencils",
      "Color_Materials",
    ],
    records: ["Select the Category", "R20", "R22", "R23"],
    sheets: ["Select the Category", "A4 Size", "A Charts"],
    papergoods: [
      "Select the Category",
      "Letter Paper",
      "Envelopes",
      "Greeting Cards",
    ],
    items: [
      "Select the Category",
      "Files",
      "Clips",
      "Smart Gadgets",
      "All Items",
    ],
    printouts: ["Select the Category", "A4 Sheet", "Thick Paper"],
  };

  //for image
  const [image, setImage] = useState(false);

  const [data, setData] = useState({
    name: "",
    description: "",
    type: "",
    stall: "",
    category: "",
    oldprice: "",
    newprice: "",
    duration: "",
    available: true,
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({
      ...data,
      [name]: name === "available" ? event.target.checked : value,
    }));
  };

  // is used when ever our data is updated this function will be excueted
  useEffect(() => {
    console.log(data);
  }, [data]);

  const onSubmitHandler = async (event) => {
    event.preventDefault(); // to prevent from reload
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("des", data.description);
    formdata.append("type", data.type);
    formdata.append("stall_name", data.stall);
    formdata.append("category", data.category);
    formdata.append("old_price", Number(data.oldprice));
    formdata.append("new_price", Number(data.newprice));
    formdata.append("item_time", Number(data.duration));
    formdata.append("available", data.available);
    formdata.append("image", image);

    const response = await axios.post(`${url}/api/food/add`, formdata); // this is the endpoint where we will upload the product after we send formadate so we use formadata by that all filed data will be sent

    // this is used because when we upload on product successfully the fields in the form will refresh and ready to take input
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        type: "",
        stall: "",
        category: "",
        oldprice: "",
        newprice: "",
        duration: "",
        available: true,
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      // When ever the token is not avaiable this if bolck will be excueted
      // we navigate to cart page
      toast.error("Please Login to your Account!......");
      navigate("/");
    }
  }, [token]);
  console.log(JSON.stringify(admindetails.approved) + " afbaj");

  return (
    <div>
      {admindetails.approved ? (
        <div className="pt-4">
          <h1 className="text-center text-decoration-underline fw-bold ">
            Add Items
          </h1>
          <div className="bg-secondary bg-opacity-25 p-4 rounded-pill rounded-start-0">
            <form onSubmit={onSubmitHandler}>
              <div>
                <div className="fw-bold m-1">Upload Image</div>
                <label htmlFor="image">
                  <img
                    width="120"
                    className={
                      image
                        ? "bg-warning bg-opacity-50 border border-danger border-4 p-2 rounded"
                        : "bg-secondary bg-opacity-75 border border-dark border-4 p-2 rounded"
                    }
                    src={
                      image ? URL.createObjectURL(image) : assests.Upload_Image
                    }
                    alt=""
                  />
                </label>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  hidden
                  required
                />
              </div>
              <div className="row">
                <div className="col-md-8">
                  <div className="fw-bold m-1">Item Name</div>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    onChange={onChangeHandler}
                    value={data.name}
                    placeholder="Enter Item Name"
                    required
                  />
                </div>
              </div>
              <div>
                <div className="fw-bold m-1">Item Description</div>
                <textarea
                  className="form-control"
                  type="text"
                  name="description"
                  onChange={onChangeHandler}
                  value={data.description}
                  rows="6"
                  placeholder="Enter Item Description"
                  required
                />
              </div>
              {admindetails.admintype === "2111CS010283" ? (
                <div className="row">
                  <div className="col-md-4">
                    <div className="fw-bold m-1">Select Type</div>
                    <select
                      className="form-select mb-2"
                      aria-label="Default select example"
                      name="type"
                      onChange={onChangeHandler}
                      value={data.type}
                    >
                      {Types.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    {data.type != "" ? (
                      <div>
                        <div className="fw-bold m-1">Select Stall</div>
                        <select
                          className="form-select mb-2"
                          aria-label="Default select example"
                          name="stall"
                          onChange={onChangeHandler}
                          value={data.stall}
                        >
                          {Stalls[data.type] &&
                            Stalls[data.type].map((stall) => (
                              <option key={stall} value={stall}>
                                {stall}
                              </option>
                            ))}
                        </select>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="col-md-4">
                    {data.stall != "" ? (
                      <div>
                        <div className="fw-bold m-1">Select Category</div>
                        <select
                          className="form-select mb-2"
                          aria-label="Default select example"
                          name="category"
                          onChange={onChangeHandler}
                          value={data.category}
                        >
                          {categorys[data.stall] &&
                            categorys[data.stall].map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                        </select>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              ) : (
                <div className="row">
                  <div className="col-md-4">
                    <div className="fw-bold m-1">Select Type</div>
                    <select
                      className="form-select mb-2"
                      aria-label="Default select example"
                      name="type"
                      onChange={onChangeHandler}
                      value={data.type}
                    >
                      <option key="Select">Select</option>
                      <option
                        key={admindetails.type}
                        value={admindetails.admintype}
                      >
                        {admindetails.admintype}
                      </option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    {data.type != "" ? (
                      <div>
                        <div className="fw-bold m-1">Select Stall</div>
                        <select
                          className="form-select mb-2"
                          aria-label="Default select example"
                          name="stall"
                          onChange={onChangeHandler}
                          value={data.stall}
                        >
                          <option key="Select">Select</option>
                          <option
                            key={admindetails.admincategory}
                            value={admindetails.admincategory}
                          >
                            {admindetails.admincategory}
                          </option>
                        </select>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="col-md-4">
                    {data.stall != "" ? (
                      <div>
                        <div className="fw-bold m-1">Select Category</div>
                        <select
                          className="form-select mb-2"
                          aria-label="Default select example"
                          name="category"
                          onChange={onChangeHandler}
                          value={data.category}
                        >
                          {categorys[data.stall] &&
                            categorys[data.stall].map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                        </select>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              )}

              <div className="row">
                <div className="col-md-4">
                  <div>
                    <div className="fw-bold m-1">Old Price</div>
                    <input
                      className="form-control"
                      name="oldprice"
                      onChange={onChangeHandler}
                      value={data.oldprice}
                      type="Number"
                      placeholder="Enter Item Old Price /-"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div>
                    <div className="fw-bold m-1">New Price</div>
                    <input
                      className="form-control"
                      name="newprice"
                      onChange={onChangeHandler}
                      value={data.newprice}
                      type="Number"
                      placeholder="Enter Item New Price /-"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8">
                  <div className="fw-bold m-1">Item Duration</div>
                  <input
                    className="form-control"
                    name="duration"
                    onChange={onChangeHandler}
                    value={data.duration}
                    type="Number"
                    placeholder="Enter Item Duration to prepare"
                    required
                  />
                </div>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="btn btn-outline-dark rounded-0 px-5"
                >
                  ADD
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <Home />
      )}
    </div>
  );
};

export default Add;
