import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';

const EditPark = ({ park, onBack, onUpdate }) => {
    const [editForm, setEditForm] = useState({ parkName: '', parkCategory: '', pcity: '', parkPrice: '', description: '' });

    useEffect(() => {
        if (park) {
            setEditForm({
                parkName: park.pname || '',
                parkCategory: park.category || 'Amusement Park',
                pcity: park.pcity || '',
                parkPrice: park.price || '',
                description: park.description || ''
            });
        }
    }, [park]);

    if (!park) return null;

    const submitEdit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('parkName', editForm.parkName);
        formData.append('parkCategory', editForm.parkCategory);
        formData.append('pcity', editForm.pcity);
        formData.append('parkPrice', editForm.parkPrice);
        formData.append('description', editForm.description);

        axios.put(`https://nodejs-production-42f2.up.railway.app/updatepark/${park.pid}`, formData)
            .then(res => {
                alert("Park updated successfully!");
                if (onUpdate) onUpdate();
            })
            .catch(err => {
                alert("Error updating park");
            });
    };

    return (
        <div className="w-full h-full flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden relative">
            <div className="h-[12vh] min-h-[60px] max-h-[80px] bg-gradient-to-r from-blue-700 to-indigo-800 flex items-center px-6 relative shrink-0">
                <button onClick={onBack} className="bg-white/20 hover:bg-white/40 px-3 py-1.5 rounded-full backdrop-blur-md transition text-white font-bold flex items-center gap-2 text-sm">
                    <ArrowLeft size={16} /> Cancel
                </button>
                <div className="flex-1 text-center pr-[100px]">
                    <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">Edit Park Information</h2>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 flex flex-col items-center">
                <form onSubmit={submitEdit} className="w-full max-w-3xl flex flex-col gap-4 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                    <div>
                        <label className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1 block">Park Name</label>
                        <input required value={editForm.parkName} onChange={e => setEditForm({...editForm, parkName: e.target.value})} className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg p-2.5 font-bold text-gray-800 outline-none focus:border-blue-500 transition-colors text-base" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1 block">Ticket Price (₹)</label>
                            <input required type="number" value={editForm.parkPrice} onChange={e => setEditForm({...editForm, parkPrice: e.target.value})} className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg p-2.5 font-bold text-gray-800 outline-none focus:border-blue-500 transition-colors text-base" />
                        </div>
                        <div>
                            <label className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1 block">City Located</label>
                            <input required value={editForm.pcity} onChange={e => setEditForm({...editForm, pcity: e.target.value})} className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg p-2.5 font-bold text-gray-800 outline-none focus:border-blue-500 transition-colors text-base" />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1 block">Category Type</label>
                        <select required value={editForm.parkCategory} onChange={e => setEditForm({...editForm, parkCategory: e.target.value})} className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg p-2.5 font-bold text-gray-800 outline-none focus:border-blue-500 transition-colors text-base">
                            <option value="Amusement Park">Amusement Park</option>
                            <option value="Water Park">Water Park</option>
                            <option value="Theme Park">Theme Park</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1 block">Extensive Description</label>
                        <textarea required rows="4" value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg p-2.5 font-bold text-gray-800 outline-none focus:border-blue-500 transition-colors resize-y text-base"></textarea>
                    </div>
                    
                    <button type="submit" className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-lg py-3 rounded-xl shadow-md shadow-blue-600/20 transition-all hover:-translate-y-1 active:translate-y-0">
                        Commit Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditPark;
