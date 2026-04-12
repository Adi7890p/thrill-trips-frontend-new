import axios from 'axios';
import React, { use, useEffect, useState } from 'react'

const Editpro = () => {
    const [user, setUser] = useState('');
    const [c,sc] = useState(1);
    useEffect(
        () => {
            if (sessionStorage.getItem("username")) {
                axios.get('https://react.adityakuril.me/user/' + sessionStorage.getItem("username")).then((res) => {
                    setUser(res.data[0]);
                    console.log(res.data);
                })
            }

        }, [c]
    )

    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [city, setcity] = useState('');
    const [phone, setphone] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();


       
        

        await axios.post('https://react.adityakuril.me/edit',
            {
                name: name || user.fullname,
                email: email || user.email,
                city: city || user.city,
                phone: phone || user.phone,
                username: sessionStorage.getItem("username")

            }
        ).then((res) => {
            alert(res.data.message);
            setname('');
            setemail('');
            setcity('');
            setphone('');
            sc(c+1);
            // console.log(res.data);
        })

    }

    return (

        <div className='w-full h-full overflow-y-auto p-4 scrollbarhider border text-orange-600 border-amber-800 rounded-2xl shadow' onWheel={(e) => e.stopPropagation()}>
            <form onSubmit= {submitHandler}>
                <h5 className='ml-2'>Name</h5>
                <input type="text" value={name} onChange={(e) => setname((e.target.value))} placeholder={user.fullname} className='w-full font-semibold text-[#053345] rounded-2xl border-2 bg-[#BEDBFF] py-1 px-3 mb-4' />

                <h5 className='ml-2'>Email</h5>
                <input type="email" value={email} onChange={(e) => setemail((e.target.value))} placeholder={user.email} className='placeholder:font-[verdana] w-full font-semibold font-[verdana] text-[#053345] rounded-2xl border-2 bg-[#BEDBFF] py-1 px-3 mb-4' />
                <h5 className='ml-2'>City</h5>
                <input type="text" value={city} onChange={(e) => setcity((e.target.value))} placeholder={user.city} className='w-full font-semibold text-[#053345] rounded-2xl border-2 bg-[#BEDBFF] py-1 px-3 mb-4' />
                <h5 className='ml-2'>Mobile No</h5>
                <input type="text" pattern='^[0-9]{10}$' maxLength={10} title='Enter Valid Mobile Number' value={phone} onChange={(e) => setphone((e.target.value))} placeholder={user.phone} className='w-full font-semibold text-[#053345] rounded-2xl border-2 bg-[#BEDBFF] py-1 px-3 mb-3' />

                <button type='submit' className='bg-amber-500 hover:bg-blue-500 transition-all duration-300 text-white  py-2 px-4 font-medium rounded-2xl  tracking-wider'>Update Profile</button>
            </form>
        </div>

    )
}

export default Editpro

