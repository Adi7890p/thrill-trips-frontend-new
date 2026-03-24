import React from 'react';
const AdminUsers = ({ users = [] }) => {
    return (
        <div className='bg-[linear-gradient(135deg,#3d3088,#4a52d9)] w-full h-[90vh] p-[2vw] rounded-2xl overflow-y-auto scrollbarhider shadow-xl'>
            <div className="flex justify-between items-center mb-[2vh]">
                <h2 className="text-[1.5vw] font-bold text-white border-b-2 border-amber-300 pb-1">Registered Users Table</h2>
            </div>
            <table className='w-full flex flex-col' onWheel={(e) => { e.stopPropagation() }}>
                <thead>
                    <tr className='flex py-3 border-y-2 border-amber-400 border-dashed w-full justify-between text-center font-bold text-amber-300 text-[1vw]'>
                        <th className='w-1/5'>User ID</th>
                        <th className='w-1/5'>Username</th>
                        <th className='w-1/5'>Full Name</th>
                        <th className='w-1/5'>Phone</th>
                        <th className='w-1/5'>Status</th>
                    </tr>
                </thead>
                <tbody className='flex flex-col w-full text-center text-white'>
                    {users.length === 0 && <div className="text-center w-full py-10 font-bold opacity-50">No Users Found</div>}
                    {users.map((u, i) => (
                    <tr key={u._id || i} className='flex py-[1.5vh] border-b border-blue-400/30 w-full justify-between items-center hover:bg-white/5 transition-colors cursor-pointer text-[0.9vw]'>
                        <td className='w-1/5 font-bold uppercase truncate px-2'>#{u._id.toString().substring(0,8)}</td>
                        <td className='w-1/5 flex items-center justify-center gap-[0.5vw] truncate px-2' title={u.username}><img src="/dubai.png" className="w-[1.8vw] h-[1.8vw] rounded-full object-cover"/>{u.username}</td>
                        <td className='w-1/5 truncate px-2' title={u.fullname}>{u.fullname}</td>
                        <td className='w-1/5'>{u.phone || 'N/A'}</td>
                        <td className='w-1/5'><span className="bg-green-500 text-white px-[0.5vw] py-[0.1vw] rounded text-[0.8vw] font-bold shadow-md truncate">Active</span></td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default AdminUsers;
