import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [user,setUser]=useState('');
  useEffect(
    ()=>{
      if(sessionStorage.getItem("username")){
        axios.get('https://react.adityakuril.me/user/'+sessionStorage.getItem("username")).then((res)=>{
          setUser(res.data[0]);
          console.log(res.data);
        })

      }
    },[]
  )
  let {username, password, fullname, email, phone,city} = user;

  // const user = {
  //   name: 'Aditya Kuril',
  //   username: 'ak50',
  //   email: 'aditya02@gmail.com',
  //   country: 'United States',
  //   phone: '1212121211',
  // };

  return (
    <div className="h-full w-full bg-transparent flex">
      <div className="h-full w-full  flex flex-col bg-transparent p-0 m-0">
        <div className="bg-transparent shadow-lg  overflow-hidden border-amber-700 rounded-2xl  w-full">
          <div className="bg-amber-600 text-xl -mb-4 font-semibold text-white py-4 px-6 border-b border-amber-700 rounded-t-2xl">
            User Dashboard
          </div>
          <div className="p-6 text-lg text-red-800">
            <div className="flex justify-between py-3 border-b border-amber-700">
              <span className="font-medium text-yellow-700">Username:</span>
              <span>{username}</span>
            </div>

            <div className="flex justify-between py-3 border-b border-amber-700">
              <span className="font-medium text-yellow-700">Name:</span>
              <span>{fullname}</span>
            </div>

            <div className="flex justify-between py-3 border-b border-amber-700">
              <span className="font-medium text-yellow-700">Email:</span>
              <span className='font-[verdana]'>{email}</span>
            </div>

            <div className="flex justify-between py-3 border-b border-amber-700">
              <span className="font-medium text-yellow-700">City:</span>
              <span>{city}</span>
            </div>

            <div className="flex  justify-between py-3">
              <span className="font-medium text-yellow-700  bg-amber-100">Phone Number:</span>
              <span>{phone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

