import React from 'react';
const AdminOwners = ({ owners = [] }) => {
    return (
        <div className='bg-[linear-gradient(135deg,#3d3088,#4a52d9)] w-full h-[90vh] p-[2vw] rounded-2xl overflow-y-auto scrollbarhider shadow-xl'>
            <div className="flex justify-between items-center mb-[2vh]">
                <h2 className="text-[1.5vw] font-bold text-white border-b-2 border-amber-300 pb-1">Platform Owners</h2>
            </div>
            <table className='w-full flex flex-col' onWheel={(e) => { e.stopPropagation() }}>
                <thead>
                    <tr className='flex py-3 border-y-2 border-amber-400 border-dashed w-full justify-between text-center font-bold text-amber-300 text-[1vw]'>
                        <th className='w-1/5'>Owner ID</th>
                        <th className='w-1/5'>Owner Name</th>
                        <th className='w-1/5'>Email</th>
                        <th className='w-1/5'>Bank Account</th>
                        <th className='w-1/5'>Actions</th>
                    </tr>
                </thead>
                <tbody className='flex flex-col w-full text-center text-white'>
                    {owners.length === 0 && <div className="text-center w-full py-10 font-bold opacity-50">No Owners Found</div>}
                    {owners.map((o, i) => (
                    <tr key={o._id || i} className='flex py-[1.5vh] border-b border-blue-400/30 w-full justify-between items-center hover:bg-white/5 transition-colors text-[0.9vw]'>
                        <td className='w-1/5 font-bold uppercase truncate px-2'>#{o._id.toString().substring(0,8)}</td>
                        <td className='w-1/5 flex items-center justify-center gap-[0.5vw]'><img src="/dubai.png" className="w-[1.8vw] h-[1.8vw] rounded-full object-cover"/> {o.name}</td>
                        <td className='w-1/5 truncate px-2' title={o.email}>{o.email}</td>
                        <td className='w-1/5 text-amber-200 font-bold tracking-widest'>{o.accountNumber ? `...${o.accountNumber.slice(-4)}` : 'Pending'}</td>
                        <td className='w-1/5'>
                            <button onClick={() => alert("Remote Delete Coming Soon...")} className="bg-red-500 hover:bg-red-600 text-white px-[0.8vw] py-[0.3vw] rounded text-[0.8vw] font-bold shadow-md cursor-pointer transition-colors">Remove</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default AdminOwners;
