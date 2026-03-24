import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageAdmins = () => {
    const [admins, setAdmins] = useState([]);
    const [unm, setUnm] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            const res = await axios.get('https://nodejs-production-42f2.up.railway.app/admin/admins');
            if (res.data.success) {
                setAdmins(res.data.admins);
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleAddAdmin = async (e) => {
        e.preventDefault();
        if (!unm || !password) return alert("Please fill all fields");
        try {
            const res = await axios.post('https://nodejs-production-42f2.up.railway.app/admin/admins', { unm, password });
            if (res.data.success) {
                setAdmins([...admins, res.data.admin]);
                setUnm("");
                setPassword("");
            } else {
                alert(res.data.message);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to remove this administrator account?")) return;
        try {
            const res = await axios.delete(`https://nodejs-production-42f2.up.railway.app/admin/admins/${id}`);
            if (res.data.success) {
                setAdmins(admins.filter(a => a._id !== id));
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='bg-[linear-gradient(135deg,#3d3088,#4a52d9)] w-full flex-1 p-[2vw] rounded-2xl overflow-y-auto scrollbarhider shadow-xl text-white flex flex-col'>
            <div className="flex justify-between items-center mb-[3vh] shrink-0">
                <h2 className="text-[1.5vw] font-bold border-b-2 border-amber-300 pb-1">Manage Administrators</h2>
                <div className="bg-amber-500/20 text-amber-200 border border-amber-500 font-bold px-[1vw] py-[0.5vh] rounded-lg text-[1vw]">Total Admins: {admins.length}</div>
            </div>

            <div className="flex flex-col gap-6">
                <form onSubmit={handleAddAdmin} className="bg-black/20 border-l-4 border-amber-400 p-6 rounded-xl flex flex-wrap gap-4 items-end shadow-md w-full justify-between">
                    <div className="flex gap-4 w-[80%]">
                        <div className="flex flex-col flex-1">
                            <label className="text-amber-200 font-bold mb-2 uppercase tracking-widest text-[0.8vw]">Username</label>
                            <input type="text" value={unm} onChange={(e)=>setUnm(e.target.value)} required className="bg-white/10 border border-blue-400/30 text-white rounded-lg px-4 py-2 outline-none focus:border-amber-400 font-[gilroy] tracking-wider transition-colors" placeholder="New Admin ID" />
                        </div>
                        <div className="flex flex-col flex-1">
                            <label className="text-amber-200 font-bold mb-2 uppercase tracking-widest text-[0.8vw]">Password</label>
                            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required className="bg-white/10 border border-blue-400/30 text-white rounded-lg px-4 py-2 outline-none focus:border-amber-400 font-[gilroy] tracking-wider transition-colors" placeholder="Secure Password" />
                        </div>
                    </div>
                    <button type="submit" className="bg-green-500/90 hover:bg-green-500 text-white font-extrabold px-[2vw] py-2 rounded-lg shadow-lg transition-all border border-green-400 h-[6vh] tracking-widest shrink-0">+ ADD ADMIN</button>
                </form>

                <div className="bg-black/20 rounded-2xl overflow-hidden shadow-md mt-2 w-full">
                    {loading ? (
                        <p className="p-8 text-center text-blue-200 font-bold tracking-widest uppercase">Fetching Roster...</p>
                    ) : admins.length === 0 ? (
                        <p className="p-8 text-center text-blue-200 font-bold tracking-widest uppercase">No accounts found.</p>
                    ) : (
                        <table className="w-full text-left">
                            <thead className="bg-black/40 border-b-2 border-amber-500/50">
                                <tr>
                                    <th className="px-[2vw] py-4 font-bold text-amber-200 uppercase tracking-widest text-[0.9vw]">Admin Username</th>
                                    <th className="px-[2vw] py-4 font-bold text-amber-200 uppercase tracking-widest text-[0.9vw]">Account ID</th>
                                    <th className="px-[2vw] py-4 font-bold text-amber-200 uppercase tracking-widest text-right text-[0.9vw]">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {admins.map((a, idx) => (
                                    <tr key={a._id} className="border-b border-blue-400/20 hover:bg-white/10 transition-colors">
                                        <td className="px-[2vw] py-[2vh] font-extrabold text-white text-[1.1vw] font-[gilroy] uppercase">{a.unm}</td>
                                        <td className="px-[2vw] py-[2vh] font-mono text-blue-200 text-[0.85vw] tracking-wider">{a._id}</td>
                                        <td className="px-[2vw] py-[2vh] text-right">
                                            <button onClick={() => handleDelete(a._id)} className="bg-red-500/20 text-red-300 hover:bg-red-500 hover:text-white border border-red-500/50 font-bold px-4 py-[0.5vh] rounded-lg transition-colors shadow-sm tracking-wider uppercase text-[0.8vw]">
                                                Revoke Access
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageAdmins;
