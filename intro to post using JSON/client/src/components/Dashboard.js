import React from 'react'
import { useSelector } from 'react-redux'
import TopNavigation from './TopNavigation';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

  let navigate = useNavigate();

let storeObj = useSelector((store)=>{
    return store;
});


let deleteprofile = async ()=>{
  let reqOptions = {
    method:"DELETE"
      
    }

    let url = `http://localhost:4567/deleteProfile?email=${storeObj.loginDetails.email}`

    let JSONData = await fetch(url,reqOptions);

    let JSOData = await JSONData.json();



    console.log(JSOData.msg);
    alert(JSOData.msg);

    
    if(JSOData.status == "success"){
      navigate("/");

    }

  }


  return (
    <div>
      <TopNavigation></TopNavigation>
        <h2>Dashboard</h2>
        <h3>
          {storeObj.loginDetails.firstName}
          {storeObj.loginDetails.lasName}
          
          </h3>
          <img src={`http://localhost:4567/${storeObj.loginDetails.profilepic}`}></img>

          <button
          onClick={() => {
            deleteprofile();
          }}


          >Delete profile</button>
    </div>
  )
}

export default Dashboard