import React, { useEffect, useState } from 'react'
import { Pencil, XCircle, FileDown } from 'lucide-react';
import axios from 'axios';

const Trips = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(
        () => {
            const helo = async () => {
                await axios.get('https://react.adityakuril.me/bookings/' + sessionStorage.getItem("username")).then((res) => {
                    setBookings(res.data);
                    console.log(res.data);
                });
            }
            helo();
        }, []
    )
    
    return (
        <div className='w-full h-full overflow-y-auto scrollbarhider border border-amber-800 rounded-2xl shadow' onWheel={(e) => { e.stopPropagation() }}>
            <table className='w-full h-full '>
                <thead>
                    <tr className='flex justify-between w-full p-3 rounded-t-2xl text-white bg-amber-600'>
                        <th className='w-1/4 text-center'>Park Name</th>
                        <th className='w-1/4 text-center'>Park Image</th>
                        <th className='w-1/4 text-center'>City</th>
                        <th className='w-1/4 text-center'>Category</th>
                    </tr>
                </thead>
                <tbody className=' border-amber-400 bg-transparent rounded-4xl  h-full'>
                    {bookings.length !== 0 ? (bookings.map((elem, idx) => {
                        return (
                            <tr key={idx} className='flex border-b border-dashed hover:bg-yellow-200 transition-all duration-300 justify-between w-full p-3 items-center  text-orange-600 flex-wrap '>
                                <td className='w-1/4 text-center' >{elem.park?.pname}</td>
                                <td className='w-1/4 text-center' ><img src={"https://react.adityakuril.me/uploads/" + (elem.park?.parkImage || elem.park?.pimage)} className='rounded-xl border-2 border-amber-700 border-dashed p-1 mx-auto' alt="" /></td>
                                <td className='w-1/4 text-center' >{elem.park?.pcity}</td>
                                <td className='w-1/4 text-center' >{elem.park?.category}</td>
                            </tr>
                        )
                    }))
                : (<tr className='flex border-b border-dashed hover:bg-yellow-200 transition-all duration-300 justify-between w-full p-3 items-center  text-orange-600 flex-wrap '>No Trips yet!!!  <b className='border-y-2 p-2 border-amber-700'>Click Explore to Book parks !!</b></tr>)}



                </tbody>
            </table>
        </div>

    )
}

export default Trips

