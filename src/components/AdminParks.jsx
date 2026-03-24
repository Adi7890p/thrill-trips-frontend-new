import React from 'react';
const AdminParks = ({ parks = [] }) => {
    return (
        <div className='bg-[linear-gradient(135deg,#3d3088,#4a52d9)] w-full h-[90vh] p-[2vw] rounded-2xl overflow-y-auto scrollbarhider shadow-xl'>
            <div className="flex justify-between items-center mb-[2vh]">
                <h2 className="text-[1.5vw] font-bold text-white border-b-2 border-amber-300 pb-1">All Parks Directory</h2>
            </div>
            <table className='w-full flex flex-col' onWheel={(e) => { e.stopPropagation() }}>
                <thead>
                    <tr className='flex py-3 border-y-2 border-amber-400 border-dashed w-full justify-between text-center font-bold text-amber-300 text-[1vw]'>
                        <th className='w-1/6'>Park ID</th>
                        <th className='w-1/6'>Park Name</th>
                        <th className='w-1/6'>City</th>
                        <th className='w-1/6'>Price</th>
                        <th className='w-1/6'>Status</th>
                        <th className='w-1/6'>Action</th>
                    </tr>
                </thead>
                <tbody className='flex flex-col w-full text-center text-white'>
                    {parks.length === 0 && <div className="text-center w-full py-10 font-bold opacity-50">No Parks Found</div>}
                    {parks.map((p, i) => (
                    <tr key={p._id || i} className='flex py-[1.5vh] border-b border-blue-400/30 w-full justify-between items-center hover:bg-white/5 transition-colors text-[0.9vw]'>
                        <td className='w-1/6 font-bold uppercase truncate px-2'>#{p.pid.toString().substring(0,8)}</td>
                        <td className='w-1/6 font-bold truncate px-2' title={p.pname}>{p.pname}</td>
                        <td className='w-1/6 truncate px-2'>{p.pcity}</td>
                        <td className='w-1/6 text-green-300 font-bold'>₹{p.price}</td>
                        <td className='w-1/6'><span className={`text-white px-[0.5vw] py-[0.1vw] rounded text-[0.8vw] font-bold shadow-md truncate ${p.approved === 'Approved' ? 'bg-green-500' : p.approved === 'Rejected' ? 'bg-red-500' : 'bg-yellow-500'}`}>{p.approved}</span></td>
                        <td className='w-1/6'>
                            <button onClick={() => alert("Suspend Park mode coming soon")} className="bg-amber-600 hover:bg-red-600 text-white px-[0.8vw] py-[0.3vw] rounded text-[0.8vw] font-bold shadow-md cursor-pointer transition-colors">Suspend</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default AdminParks;
