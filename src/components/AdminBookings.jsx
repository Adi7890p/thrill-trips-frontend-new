import React from 'react';
const AdminBookings = ({ bookings = [] }) => {
    return (
        <div className='bg-[linear-gradient(135deg,#3d3088,#4a52d9)] w-full h-[90vh] p-[2vw] rounded-2xl overflow-y-auto scrollbarhider shadow-xl'>
            <div className="flex justify-between items-center mb-[2vh]">
                <h2 className="text-[1.5vw] font-bold text-white border-b-2 border-amber-300 pb-1">Global Bookings Overview</h2>
            </div>
            <table className='w-full flex flex-col' onWheel={(e) => { e.stopPropagation() }}>
                <thead>
                    <tr className='flex py-3 border-y-2 border-amber-400 border-dashed w-full justify-between text-center font-bold text-amber-300 text-[1vw]'>
                        <th className='w-1/5'>Booking RefID</th>
                        <th className='w-1/5'>Username</th>
                        <th className='w-1/5'>Park Name</th>
                        <th className='w-1/5'>Date Executed</th>
                        <th className='w-1/5'>Amount</th>
                    </tr>
                </thead>
                <tbody className='flex flex-col w-full text-center text-white'>
                    {bookings.length === 0 && <div className="text-center w-full py-10 font-bold opacity-50">No Booking Data Found</div>}
                    {bookings.map((b, i) => (
                        <tr key={b._id || i} className='flex py-[1.5vh] border-b border-blue-400/30 w-full justify-between items-center hover:bg-white/5 transition-colors cursor-pointer text-[0.9vw]'>
                            <td className='w-1/5 font-bold text-amber-200 uppercase truncate px-2'>#{b._id.toString().substring(0, 8)}</td>
                            <td className='w-1/5 flex items-center justify-center gap-[0.5vw] truncate px-2' title={b.username}><img src="/dubai.png" className="w-[1.5vw] h-[1.5vw] rounded-full object-cover" />{b.username}</td>
                            <td className='w-1/5 font-bold uppercase truncate px-2 text-blue-200' title={b.park?.pname || b.pid}>{b.park?.pname || 'Deleted Park'}</td>
                            <td className='w-1/5 truncate'>{b.date || 'N/A'}</td>
                            <td className='w-1/5 font-bold text-green-300'>₹{b.bill}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default AdminBookings;
