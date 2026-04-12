import React from 'react';
import axios from 'axios';

const AdminApprovals = ({ approvals, setApprovals }) => {

    const handleAction = async (id, status) => {
        try {
            setApprovals(prev => prev.filter(p => p._id !== id));
            await axios.put(`https://react.adityakuril.me/admin/parks/${id}/status`, { status });
        } catch (error) {
            console.error("Failed to update status");
        }
    };

    return (
        <div className='bg-[linear-gradient(135deg,#3d3088,#4a52d9)] w-full h-fit max-h-[85vh] p-[2vw] rounded-2xl overflow-y-auto scrollbarhider shadow-xl'>
            <div className="flex justify-between items-center mb-[2vh]">
                <h2 className="text-[1.5vw] font-bold text-white border-b-2 border-amber-300 pb-1">Park Approvals Notifications</h2>
                <div className="bg-amber-500/20 text-amber-200 border border-amber-500 font-bold px-[1vw] py-[0.5vh] rounded-lg text-[1vw]">Requests: {approvals.length}</div>
            </div>
            {approvals.length === 0 ? (
                <div className="flex items-center justify-center p-10 text-white opacity-50 text-[1.2vw]">No pending approvals at the moment.</div>
            ) : (
                <table className='w-full flex flex-col' onWheel={(e) => { e.stopPropagation() }}>
                    <thead>
                        <tr className='flex py-3 border-y-2 border-amber-400 border-dashed w-full justify-between items-center text-center font-bold text-amber-300 text-[1vw]'>
                            <th className='w-[15%]'>Req ID</th>
                            <th className='w-[30%]'>Park & Owner Details</th>
                            <th className='w-[35%]'>Provided Images</th>
                            <th className='w-[20%]'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='flex flex-col w-full text-center text-white'>
                        {approvals.map((park) => (
                            <tr key={park._id} className='flex py-[2vh] border-b border-blue-400/30 w-full justify-between items-center hover:bg-white/5 transition-colors text-[0.9vw]'>
                                <td className='w-[15%] flex flex-col items-center gap-2'>
                                    <span className='font-bold text-amber-200 text-[1vw]'>#{park._id.substring(0, 8)}</span>
                                    <span className='bg-red-500 text-white rounded px-2 py-0.5 text-[0.7vw] font-bold tracking-widest uppercase'>{park.approved}</span>
                                </td>
                                <td className='w-[30%] flex flex-col items-start justify-center gap-1.5 pl-[1vw]'>
                                    <div className="flex flex-col gap-[0.8vh] w-full text-left">
                                        <div className="text-[1.1vw] truncate bg-black/30 px-2 py-[0.5vh] rounded-md shadow-sm w-[95%] border border-black/20"><span className="text-gray-400 font-bold mr-2 text-[0.8vw] uppercase tracking-wider">Park Name:</span><span className="font-[gilroy] font-extrabold text-[1vw] tracking-wide capitalize text-white">{park.pname}</span></div>
                                        <div className="text-[0.9vw] truncate bg-black/30 px-2 py-[0.5vh] rounded-md shadow-sm w-[95%] border border-black/20"><span className="text-gray-400 font-bold mr-2 text-[0.8vw] uppercase tracking-wider">City:</span><span className="text-amber-200 font-semibold">{park.pcity}</span></div>
                                        <div className="text-[0.9vw] truncate bg-black/30 px-2 py-[0.5vh] rounded-md shadow-sm w-[95%] border border-black/20"><span className="text-gray-400 font-bold mr-2 text-[0.8vw] uppercase tracking-wider">Category:</span><span className="text-amber-200 font-semibold">{park.category}</span></div>
                                    </div>

                                    <div className="w-[95%] text-left bg-black/30 px-2 py-1.5 border rounded-md mt-1 shadow-sm">
                                        <span className="text-gray-400 font-bold mr-1 text-[0.75vw] uppercase tracking-wider">Desc:</span>
                                        <span className="text-[0.85vw] font-normal opacity-90 tracking-wide text-white leading-tight">"{park.description}"</span>
                                    </div>

                                    <div className="flex gap-[0.5vw] mt-2 justify-evenly w-full ml-[-0.5vw]">
                                        <span className="text-[0.9vw] text-green-400 font-bold border shadow-sm bg-black/30 px-2 py-1.5 rounded-md">Price: ₹{park.price}</span>
                                        <span className="text-[0.9vw] text-orange-300 font-bold shadow-sm bg-black/30 border px-2 py-1.5 rounded-md">Ph: {park.phone}</span>
                                    </div>
                                    <div className="flex flex-col gap-[0.8vh] mt-1 w-[95%] items-start">
                                        <span className="text-[0.8vw] text-blue-200 bg-blue-900/50 flex flex-col px-2 py-1.5 rounded-lg font-semibold break-all text-left shadow-inner w-full border border-blue-400/20">
                                            <span className="text-[0.8svw]  tracking-widest text-blue-400 font-[gilroy] font-extrabold">Owner Email : {park.ownerEmail || park.owner}</span>

                                        </span>
                                        <span className={`text-[0.85vw] px-2 py-[0.3vh] w-full text-left rounded-md font-extrabold tracking-wider border-[1.5px] shadow-md ${park.accountNumber ? 'text-red-100 bg-red-600/60 border-red-400' : 'text-gray-400 bg-gray-600/30 border-gray-500'}`}>
                                            A/C: {park.accountNumber || "Not Provided"}
                                        </span>
                                    </div>
                                </td>
                                <td className='w-[35%] flex justify-center items-center gap-[1vw]'>
                                    <div className="flex flex-col items-center">
                                        <a href={`https://react.adityakuril.me/uploads/${park.parkImage}`} target="_blank" rel="noreferrer" title="View Full Park Image">
                                            <img src={`https://react.adityakuril.me/uploads/${park.parkImage}`} className="w-[4vw] h-[4vw] object-cover rounded-lg border border-blue-300 p-0.5 bg-white/10 shadow-md hover:scale-110 transition-transform cursor-pointer" alt="Park Main" onError={(e) => { e.target.src = '/carnival-tent.png' }} />
                                        </a>
                                        <span className="text-[0.7vw] mt-1 text-blue-200 uppercase tracking-widest">Main</span>
                                    </div>
                                    {park.rideImages && park.rideImages.map((ride, idx) => (
                                        <div key={idx} className="flex flex-col items-center">
                                            <a href={`https://react.adityakuril.me/uploads/${ride}`} target="_blank" rel="noreferrer" title={`View Full Ride ${idx + 1} Image`}>
                                                <img src={`https://react.adityakuril.me/uploads/${ride}`} className="w-[4vw] h-[4vw] object-cover rounded-lg border border-blue-300 p-0.5 bg-white/10 shadow-md hover:scale-110 transition-transform cursor-pointer" alt={`Ride ${idx + 1}`} onError={(e) => { e.target.src = '/ticket.png' }} />
                                            </a>
                                            <span className="text-[0.7vw] mt-1 text-blue-200 uppercase tracking-widest">Ride {idx + 1}</span>
                                        </div>
                                    ))}
                                </td>
                                <td className='w-[20%] flex flex-col items-center justify-center gap-[1vh]'>
                                    <button onClick={() => handleAction(park._id, 'Approved')} className="bg-green-500 hover:bg-green-600 text-white px-[1vw] py-[0.8vh] w-[70%] rounded-md text-[0.9vw] font-bold shadow-md transition-colors">Approve</button>
                                    <button onClick={() => handleAction(park._id, 'Rejected')} className="bg-red-500 hover:bg-red-600 text-white px-[1vw] py-[0.8vh] w-[70%] rounded-md text-[0.9vw] font-bold shadow-md transition-colors">Reject</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
export default AdminApprovals;

