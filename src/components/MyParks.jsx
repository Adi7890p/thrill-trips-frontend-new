import React from 'react'
import axios from 'axios'

const MyParks = ({ parks = [], setSel, setActivePark, onUpdate }) => {

    const handleView = (p) => {
        if (setActivePark) setActivePark(p);
        if (setSel) setSel("View Park");
    };

    const handleEdit = (p) => {
        if (setActivePark) setActivePark(p);
        if (setSel) setSel("Edit Park");
    };

    const handleDelete = async (p) => {
        if (window.confirm(`Are you want to delete "${p.pname}"?`)) {
            try {
                const res = await axios.delete(`https://nodejs-production-42f2.up.railway.app/deletepark/${p.pid}`);
                if (res.status === 200 || res.data.message) {
                    alert("Park successfully deleted.");
                    if (onUpdate) onUpdate();
                }
            } catch (err) {
                alert("Failed to delete park.");
            }
        }
    };

    return (
        <React.Fragment>
            <div className='bg-amber-50 w-full h-full p-[2vw] text-red-500 rounded-2xl overflow-hidden relative'>
                <table className='w-full h-full overflow-auto flex flex-col scrollbarhider' onWheel={(e) => { e.stopPropagation() }}>
                    <thead className=''>
                        <tr className='flex py-3 border-y-2 border-amber-900 border-dashed w-full justify-between text-center'>
                            <th className='w-1/6'>Park No.</th>
                            <th className='w-1/6'>Park Name</th>
                            <th className='w-1/6'>Image</th>
                            <th className='w-1/6'>Ticket Price</th>
                            <th className='w-1/6'>Approved</th>
                            <th className='w-1/6'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='flex flex-col w-full justify-between text-center overflow-y-auto pb-10'>
                        {parks.length === 0 ? (
                            <div className="w-full text-center mt-10 font-bold text-amber-900/50">No Parks Listed</div>
                        ) : parks.map((p, idx) => (
                            <tr key={p._id || idx} className='flex w-full py-2 border-b-2 border-amber-900 border-dashed items-center justify-between text-center hover:bg-amber-100 transition-colors shrink-0'>
                                <td className='w-1/6 text-amber-900 font-bold'>#{p.pid.toString().substring(0, 8)}</td>
                                <td className='w-1/6 font-[gilroy] font-extrabold text-[1.2vw] tracking-wider uppercase'>{p.pname}</td>
                                <td className='w-1/6 flex justify-center'><img src={p.parkImage ? `https://nodejs-production-42f2.up.railway.app/uploads/${p.parkImage}` : "/dubai.png"} className='h-[12vh] rounded-lg border-2 p-1 border-amber-900 border-dashed w-full max-w-[12vw] object-cover' alt="park" /></td>
                                <td className='w-1/6 font-extrabold text-green-700'>₹{p.price}</td>
                                <td className='w-1/6 flex justify-center'>
                                    <div className={`w-2/3 flex justify-center py-[0.5vh] items-start text-white text-[0.8vw] tracking-widest uppercase font-extrabold shadow-sm rounded-full ${p.approved === 'Approved' ? 'bg-green-500' : p.approved === 'Rejected' ? 'bg-red-500' : 'bg-yellow-500'}`}>{p.approved}</div>
                                </td>
                                <td className='w-1/6 flex flex-col gap-[1vh] px-[2vw] justify-center text-[0.8vw] font-bold'>
                                    <button onClick={() => handleView(p)} className='border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white p-1 rounded-full transition-colors'>View</button>
                                    {p.approved !== 'Rejected' && (
                                        <button onClick={() => handleEdit(p)} className='border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white p-1 rounded-full transition-colors'>Edit</button>
                                    )}
                                    <button onClick={() => handleDelete(p)} className='border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white p-1 rounded-full transition-colors'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}

export default MyParks