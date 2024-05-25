import React from 'react'
import { useContext } from 'react'
import { DataContext } from '../../Context/DataContext'

const Profile = () => {

  const {admindetails} = useContext(DataContext)
  return (
    <div>
      {admindetails.name}
      <p>Admin Type: {admindetails.admintype}</p>
      <p>Admin Category: {admindetails.admincategory}</p>
    </div>
  );
}

export default Profile
 