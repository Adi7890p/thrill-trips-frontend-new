import React from 'react'

const ParkBookings = ({ bookings = [] }) => {
    return (
        <>
            <div className='bg-amber-50 w-full h-full p-[2vw] text-red-500 rounded-2xl overflow-hidden'>
                <table className='w-full h-full overflow-auto flex flex-col scrollbarhider' onWheel={(e) => { e.stopPropagation() }}>
                    <thead className=''>
                        <tr className='flex py-3 border-y-2 border-amber-900 border-dashed w-full justify-between text-center'>
                            <th className='w-1/6'>User</th>
                            <th className='w-1/6'>Park</th>
                            <th className='w-1/6'>Date</th>
                            <th className='w-1/6'>Tickets</th>
                            <th className='w-1/6'>Add-Ons</th>
                            <th className='w-1/6'>Bill</th>
                        </tr>
                    </thead>
                    <tbody className='flex flex-col w-full justify-between text-center'>
                        {bookings.length === 0 ? (
                            <div className="w-full text-center mt-10 font-bold text-amber-900/50 text-[1.5vw]">No Bookings Recorded</div>
                        ) : bookings.map((b, idx) => (
                        <tr key={idx} className='flex w-full py-[2vh] border-b-2 border-amber-900 border-dashed items-center justify-between text-center hover:bg-amber-100 transition-colors'>
                            <td className='w-1/6 font-extrabold uppercase truncate px-1'>{b.username}</td>
                            <td className='w-1/6  font-bold text-amber-800 tracking-wider' title={b.parkInfo?.pname || b.pid}>{b.parkInfo?.pname || b.pid}</td>
                            <td className='w-1/6 font-semibold '>{b.date}</td>
                            <td className='w-1/6 font-black text-[1.2vw]'>{b.persons}</td>
                            <td className='w-1/6 text-[0.9vw] whitespace-normal truncate px-2 font-semibold text-gray-600'>{b.addons || "None"}</td>
                            <td className='w-1/6 text-green-700 font-extrabold text-[1.1vw]'>₹{b.bill}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ParkBookings