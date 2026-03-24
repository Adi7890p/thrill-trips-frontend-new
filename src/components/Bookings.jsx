import React, { useEffect, useRef, useState } from 'react';
import jsPDF from 'jspdf';
import { Pencil, XCircle, FileDown } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { log } from 'console';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    // const [pnm, setpnm] = useState([]);
    const [c, sc] = useState(1);
    // const [cc,scc] = useState(1);

    useEffect(
        () => {
            const helo = async () => {
                await axios.get('https://nodejs-production-42f2.up.railway.app/bookings/' + sessionStorage.getItem("username")).then((res) => {
                    setBookings(res.data);
                    console.log("data : ", res.data);

                });

            }
            helo();
        }, [c]
    )
    // useEffect(
    //     () => {
    //         bookings.map((elem) => {
    //             axios.get('https://nodejs-production-42f2.up.railway.app/bookpark/' + elem.pid).then((res) => {
    //                 setpnm((prev)=>[...prev,res.data]);
    //                 sc(c+1);
    //                 // console.log(res.data);
    //             })
    //         })
    //     }, [cc,c]
    // )
    // const [p, sp] = useState('');
    // const [pnm,setpnm]=useState('');


    const navigate = useNavigate();
    const editBooking = (_id, pid) => {
        console.log('clicked');

        sessionStorage.setItem("status", "edit");
        sessionStorage.setItem("pid", pid);
        sessionStorage.setItem("uid", _id);
        navigate('/booking');
    }
    const cancelBooking = async (_id, pid) => {
        await axios.delete('https://nodejs-production-42f2.up.railway.app/cancel/' + _id).then((res) => {
            alert(pid + " " + res.data.message);
            sc(c + 1);
            // scc(cc+1);
        })
    }
    const reciptGen = async (idx) => {
        const doc = new jsPDF();
        let y = 10;


        // Header styling
        doc.setFontSize(18);
        doc.setTextColor(40, 40, 120);
        doc.setFont('sherif', 'bold');
        doc.text('Thrill Trips Receipt', 105, y, { align: 'center' });
        y += 10;
        doc.setDrawColor(255, 193, 7);
        doc.setLineWidth(1);
        doc.line(20, y, 190, y);
        y += 6;

        // User info section
        doc.setFontSize(12);
        doc.setTextColor(40, 40, 120);
        doc.setFont('helvetica', 'bold');
        doc.text('User Information', 20, y);
        y += 7;
        doc.setTextColor(60, 60, 60);
        doc.setFont('helvetica', 'normal');
        doc.text(`Username: ${bookings[idx].username}`, 20, y);
        y += 6;
        doc.text(`Name: ${bookings[idx].user.fullname}`, 20, y);
        y += 6;
        doc.text(`Email: ${bookings[idx].user.email}`, 20, y);
        y += 6;
        doc.text(`City: ${bookings[idx].user.city}`, 20, y);
        y += 6;
        doc.text(`Mobile No: ${bookings[idx].user.phone}`, 20, y);
        y += 8;
        doc.setDrawColor(255, 193, 7);
        doc.setLineWidth(1);
        doc.line(20, y, 190, y);
        y += 6;

        // Booking details section
        doc.setFontSize(12);
        doc.setTextColor(40, 40, 120);
        doc.setFont('helvetica', 'bold');
        doc.text('Booking Details', 20, y);
        y += 7;
        // Fetch park image as data URL
        let imageUrl = `https://nodejs-production-42f2.up.railway.app/uploads/${bookings[idx].park.parkImage || bookings[idx].park.pimage}`;
        let imageDataUrl = null;
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            imageDataUrl = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(blob);
            });
        } catch (err) {
            imageDataUrl = null;
        }

        // Add image if available
        if (imageDataUrl) {
            doc.addImage(imageDataUrl, 'JPEG', 45, y, 120, 80);
            y += 90;
        }

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(60, 60, 60);
        doc.text(`Booking Id: ${idx + 1}`, 20, y);
        y += 6;
        doc.text(`Park Name: ${bookings[idx].park.pname}`, 20, y);
        y += 6;
        doc.text(`Date: ${bookings[idx].date}`, 20, y);
        y += 6;
        doc.text(`Person: ${bookings[idx].persons}`, 20, y);
        y += 6;
        doc.text(`Add-Ons: ${bookings[idx].addons || 'No Add-Ons'}`, 20, y);
        y += 15;
        doc.setDrawColor(255, 193, 7);
        doc.setLineWidth(1);
        doc.line(20, y - 10, 190, y - 10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 100, 0);
        doc.text(`Total Amount: Rs. ${bookings[idx].bill}/-`, 20, y);
        y += 10;
        doc.setDrawColor(255, 193, 7);
        doc.setLineWidth(1);
        doc.line(20, y, 190, y);
        y += 10;

        // Footer
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(40, 40, 120);
        doc.text('Thank you for booking with Thrill Trips!', 105, y, { align: 'center' });
        doc.save(`${bookings[idx].park.pname}_Receipt.pdf`);
    }

    return (
        <div className='w-full h-full overflow-y-auto scrollbarhider border border-amber-800 rounded-2xl shadow' onWheel={(e) => { e.stopPropagation() }}>
            <table className='w-full h-full '>
                <thead>
                    <tr className='flex justify-between w-full p-3 rounded-t-2xl text-white bg-amber-600'>
                        <th className='w-1/8 text-center'>Booking Id</th>
                        <th className='w-1/8 text-center'>Park Name</th>
                        <th className='w-1/8 text-center'>Date</th>
                        <th className='w-1/8 text-center'>Person</th>
                        <th className='w-1/8 text-center'>Add-Ons</th>
                        <th className='w-1/8 text-center'>Total Amount</th>
                        <th className='w-1/8 text-center'>Action</th>
                        <th className='w-1/8 text-center'>Download</th>
                    </tr>
                </thead>
                <tbody className=' border-amber-400 bg-transparent rounded-4xl  h-full'>

                    {bookings.length != 0 ? (bookings.map((elem, idx) => {
                        return (

                            <tr key={idx} className='flex border-b border-dashed hover:bg-yellow-200 transition-all duration-300 justify-between w-full p-3 items-center  text-orange-600 flex-wrap '>
                                <td className='w-1/8 text-center' >{idx + 1}</td>
                                <td className='w-1/8 text-center wrap-break-word' >{elem.park.pname}</td>
                                <td className='w-1/8 text-center' >{elem.date}</td>
                                <td className='w-1/8 text-center' >{elem.persons}</td>
                                <td className='w-1/8 text-center' >{(elem.addons) ? elem.addons : "No Add-Ons"}</td>
                                <td className='w-1/8 text-center' >{elem.bill}/-</td>
                                <td className='w-1/8 text-center flex flex-col justify-center px-1 gap-1' ><button className='w-full hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-300 flex border-2 rounded-full justify-evenly p-1' onClick={() => editBooking(elem._id, elem.pid)}><Pencil className='' /> Edit</button><button className='w-full flex border-2 rounded-full justify-evenly p-1 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300' onClick={() => cancelBooking(elem._id, elem.park.pname)}><XCircle /> Cancel</button></td>
                                <td className='w-1/8 text-center flex justify-center px-2' ><button onClick={() => reciptGen(idx)} className='w-full flex border-2 rounded-full justify-evenly p-1 hover:bg-green-500 hover:text-white hover:border-green-500 transition-all duration-300'><FileDown /> Receipt</button></td>

                            </tr>
                        )
                    }))
                        : (<tr className='flex border-b border-dashed hover:bg-yellow-200 transition-all duration-300 justify-between w-full p-3 items-center  text-orange-600 flex-wrap '>No Bookings yet!!! <b className='border-y-2 p-2 border-amber-700'>Click Explore to Book parks !!</b></tr>)
                    }



                </tbody>
            </table>
        </div>
    );
};

export default Bookings;
