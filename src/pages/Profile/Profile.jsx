import React from 'react'
import { useContext } from 'react'
import { DataContext } from '../../Context/DataContext'

const Profile = () => {

  const {admindetails} = useContext(DataContext)
  return (
    <div className="pt-2 ">
      <h1 className="text-center text-decoration-underline bg-danger p-2 border border-black mx-4">
        Profile
      </h1>
      <div className=" mx-5 px-5">
        {" "}
        <table className="table table-hover border border-dark">
          <tbody>
            <tr class="table-primary">
              <td className="fs-3 fw-bold">Name :</td>
              <td className=" fs-3">{admindetails.name}</td>
            </tr>
            <tr class="table-success">
              <td className="fs-3 fw-bold">Email :</td>
              <td className="fs-3">{admindetails.email}</td>
            </tr>
            <tr class="table-danger">
              <td className="col-md-6 fs-3 fw-bold">Admin Type: </td>
              <td className="col-md-4 fs-4">{admindetails.admintype}</td>
            </tr>
            <tr class="table-warning">
              <td className="col-md-6 fs-3 fw-bold">Admin Category:</td>
              <td className="col-md-4 fs-4">{admindetails.admincategory}</td>
            </tr>
            
            <tr class="table-info">
              <td className="col-md-6 fs-3 fw-bold">Phonenumber : </td>
              <td className="col-md-4 fs-4">{admindetails.phonenumber}</td>
            </tr> 
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Profile
 