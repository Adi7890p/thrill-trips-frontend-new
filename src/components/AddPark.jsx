import axios from 'axios';
import React, { useState } from 'react'

const AddPark = ({ onAdded }) => {
    const [parkName, setParkName] = useState("");
    const [city, setCity] = useState("");
    const [category, setCategory] = useState("Amusement Park");
    const [description, setDescription] = useState("");
    const [phone, setPhone] = useState("");
    const [price, setPrice] = useState("");
    const [parkImage, setParkImage] = useState("");
    const [rideImages, setRideImages] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const isFirstPark = !sessionStorage.getItem("accountNumber");
    const submitHandler = (e) => {
        e.preventDefault();
        const form = e.target;
        console.log(parkName, city, category, description, phone, price, parkImage, rideImages);
        const formData = new FormData();
        formData.append("parkName", parkName);
        formData.append("pcity", city);
        formData.append("category", category);
        formData.append("description", description);
        formData.append("phone", phone);
        formData.append("price", price);
        formData.append("parkImage", form.parkImage.files[0]);
        const rides = form.rideImages.files;
        for (let i = 0; i < rides.length; i++) {
            formData.append("rideImages", rides[i]);
        }
        formData.append("owner", sessionStorage.getItem("owner"));
        if (isFirstPark) {
            formData.append("accountNumber", accountNumber);
            sessionStorage.setItem("accountNumber", accountNumber); // Cache locally
        } else {
            const accCache = sessionStorage.getItem("accountNumber");
            if (accCache) formData.append("accountNumber", accCache);
        }

        axios.post("https://nodejs-production-42f2.up.railway.app/owner/addpark", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((res) => {
            if (res.data.success) {
                alert("Park added successfully");
                setParkName("");
                setCity("");
                setCategory("Amusement Park");
                setDescription("");
                setPhone("");
                setPrice("");
                setParkImage("");
                setRideImages("");
                setAccountNumber("");
                alert("Park Request Sent to Admin for Approval!")
                if (onAdded) onAdded();
            }
            console.log(res.data);

        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
            <div className='w-full h-full overflow-y-auto p-4 scrollbarhider text-orange-600 bg-amber-100 rounded-2xl shadow' onWheel={(e) => e.stopPropagation()}>
                <form onSubmit={submitHandler} method="post" encType="multipart/form-data">
                    {isFirstPark && (
                        <div className="mb-6 bg-blue-50/50 p-4 rounded-2xl border-2 border-blue-200 shadow-sm">
                            <h5 className='ml-2 text-blue-600 font-extrabold flex items-center gap-2'>

                                Bank Account Number (Required for Payouts)
                            </h5>
                            <input type="text" pattern="^[0-9]+$" title="Please provide a valid numeric bank account number." maxLength={12} required value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="Enter Account Number" className='w-full font-bold text-lg text-blue-900 rounded-xl border-2 border-blue-300 bg-white py-2 px-4 mt-2' />
                            <p className="text-blue-400 text-xs ml-2 mt-2 font-semibold">*We need your bank details to distribute revenue properly before your first park is approved.</p>
                        </div>
                    )}

                    <h5 className='ml-2'>Park Name</h5>
                    <input type="text" autoComplete="on" value={parkName} required onChange={(e) => setParkName((e.target.value))} placeholder="Enter Park Name" className='w-full font-semibold text-lg text-[#053345] rounded-2xl border-2 bg-[#BEDBFF] py-1 px-3 mb-4' />

                    <h5 className='ml-2'>Park Location(City name)</h5>
                    <input type="text" autoComplete="on" value={city} required onChange={(e) => setCity((e.target.value))} placeholder="Enter Park Location" className='placeholder:font-[verdana] w-full font-semibold text-lg text-[#053345] rounded-2xl border-2 bg-[#BEDBFF] py-1 px-3 mb-4' />
                    <h5 className='ml-2'>Park Category</h5>
                    <select name="" id="" className='w-full font-semibold text-[#053345] rounded-2xl border-2 bg-[#BEDBFF] text-lg py-1 px-3 mb-4' value={category} onChange={(e) => setCategory((e.target.value))}>
                        <option value="Amusement Park" >Amusement Park</option>
                        <option value="Water Park">Water Park</option>
                        <option value="Theme Park">Theme Park</option>
                    </select>
                    <h5 className='ml-2'>Description</h5>
                    <input type="text" value={description} onChange={(e) => setDescription((e.target.value))} placeholder="Enter Description" className='w-full font-semibold text-lg text-[#053345] rounded-2xl border-2 bg-[#BEDBFF] py-1 px-3 mb-4' />
                    <h5 className='ml-2'>Mobile No</h5>
                    <input type="text" pattern='^[0-9]{10}$' required maxLength={10} title='Enter Valid Mobile Number' value={phone} onChange={(e) => setPhone((e.target.value))} placeholder="Enter Mobile Number" className='w-full font-semibold text-lg text-[#053345] rounded-2xl border-2 bg-[#BEDBFF] py-1 px-3 mb-3' />
                    <h5 className='ml-2'>Price</h5>
                    <input type="text" pattern='^[0-9]*$' title='Enter Valid Price' required value={price} onChange={(e) => setPrice((e.target.value))} placeholder="Enter Price" className='w-full font-semibold text-lg text-[#053345] rounded-2xl border-2 bg-[#BEDBFF] py-1 px-3 mb-3' />
                    <h5 className='ml-2'>Park Image</h5>
                    <input type="file" name='parkImage' required value={parkImage} onChange={(e) => setParkImage((e.target.value))} placeholder="Enter Park Image" className='w-full font-semibold text-[#053345] rounded-2xl border-2 bg-[#BEDBFF] py-1 px-3 mb-3' />
                    <h5 className='ml-2'>Ride Images (Max 3)</h5>
                    <input type="file" name='rideImages' multiple accept="image/*" required value={rideImages} onChange={(e) => {
                        if (e.target.files.length > 3) {
                            alert("only 3 ride images can be uploaded.");
                            e.target.value = "";
                            setRideImages("");
                        } else {
                            setRideImages(e.target.value);
                        }
                    }} className='w-full font-semibold text-[#053345] rounded-2xl border-2 bg-[#BEDBFF] py-1 px-3 mb-3' />


                    <button type='submit' className='bg-amber-500 hover:bg-blue-500 transition-all duration-300 text-white   py-2 px-4 font-medium rounded-2xl  tracking-wider'>Add Park</button>
                </form>
            </div>

        </>
    )
}

export default AddPark