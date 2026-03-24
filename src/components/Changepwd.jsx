import axios from 'axios';
import React, { useState } from 'react'

const Changepwd = () => {
    const [old ,setold]=useState('');
    const [neww ,setneww]=useState('');

    const cng = async () =>{
        await axios.post('https://nodejs-production-42f2.up.railway.app/cng',
            {old : old,neww : neww,username : sessionStorage.getItem("username")}
        ).then((res)=>{
            alert(res.data.message);
            console.log(res.data);
            if(res.data.success){
                setold('');
                setneww('');
            }
            
        })
    }
    return (
        <div className='w-full h-full overflow-y-auto p-4 scrollbarhider border text-orange-600 border-amber-800 rounded-2xl shadow'>
            <h5 className='ml-2'>Old Password</h5>
            <input value={old} onChange={(e)=>setold(e.target.value)} type="text" className='w-full font-semibold text-[#053345] rounded-2xl border-2 bg-[#BEDBFF] py-1 px-3 mb-4' />

            <h5 className='ml-2'>New Password</h5>
            <input value={neww} onChange={(e)=>setneww(e.target.value)} type="text" className='w-full font-semibold text-[#053345] rounded-2xl border-2 bg-[#BEDBFF] py-1 px-3 mb-3' />
            <button onClick={cng} className='bg-amber-500 hover:bg-blue-500 transition-all duration-300 text-white  py-2 px-4 font-medium rounded-2xl  tracking-wider'>Change Password</button>
        </div>
    )
}

export default Changepwd
