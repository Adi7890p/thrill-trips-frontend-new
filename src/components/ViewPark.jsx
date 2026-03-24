import React from 'react';
import { ArrowLeft } from 'lucide-react';

const ViewPark = ({ park, bookings = [], onBack }) => {
    if (!park) return null;

    const pBookings = bookings.filter(b => b.pid === park.pid);
    const revenue = pBookings.reduce((sum, b) => sum + (b.bill || 0), 0);
    const totalBookings = pBookings.length;

    return (
        <div className="w-full h-full flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden p-6 md:p-8">
            {/* Header Toolbar */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6 shrink-0">
                <button onClick={onBack} className="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-colors font-bold flex items-center gap-2">
                    <ArrowLeft size={20} /> Back to My Parks
                </button>
                <div className={`px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-widest shadow-sm ${park.approved === 'Approved' ? 'bg-green-500 text-white' : park.approved === 'Rejected' ? 'bg-red-500 text-white' : 'bg-yellow-400 text-amber-900'}`}>
                    {park.approved}
                </div>
            </div>
            
            <div className="flex-1 overflow-y-auto scrollbarhider flex flex-col gap-8">
                {/* Core Park Info & Main Image Flow */}
                <div className="flex flex-col md:flex-row gap-8 items-start shrink-0">
                    <div className="w-full md:w-[40%] max-w-md shrink-0">
                        <img src={park.parkImage ? `https://nodejs-production-42f2.up.railway.app/uploads/${park.parkImage}` : "/dubai.png"} className="w-full h-[300px] object-cover rounded-2xl shadow-md border border-gray-100" alt="Main Park Cover" />
                    </div>
                    <div className="flex-1 flex flex-col pt-2">
                        <h2 className="text-4xl md:text-5xl font-black text-[#1a2b4c] uppercase tracking-wider mb-4 leading-tight">{park.pname}</h2>
                        <div className="flex flex-col gap-2 text-gray-500 font-bold text-lg">
                            <p>📍 {park.pcity} • {park.category}</p>
                            {park.phone && <p>📞 +91 {park.phone}</p>}
                        </div>
                    </div>
                </div>

                {/* Analytical Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 shrink-0">
                    <div className="bg-gray-50 p-4 md:p-6 rounded-2xl border-b-4 border-blue-500 shadow-sm flex flex-col justify-center items-center text-center">
                        <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Base Ticket Price</p>
                        <p className="text-xl md:text-2xl font-black text-blue-900">₹{park.price}</p>
                    </div>
                    <div className="bg-gray-50 p-4 md:p-6 rounded-2xl border-b-4 border-amber-500 shadow-sm flex flex-col justify-center items-center text-center">
                        <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Park Reference ID</p>
                        <p className="text-sm md:text-lg font-bold text-amber-900 truncate">#{park.pid}</p>
                    </div>
                    <div className="bg-gray-50 p-4 md:p-6 rounded-2xl border-b-4 border-green-500 shadow-sm flex flex-col justify-center items-center text-center">
                        <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Bookings Executed</p>
                        <p className="text-xl md:text-2xl font-black text-green-700">{totalBookings}</p>
                    </div>
                    <div className="bg-gray-50 p-4 md:p-6 rounded-2xl border-b-4 border-purple-500 shadow-sm flex flex-col justify-center items-center text-center">
                        <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Revenue Generated</p>
                        <p className="text-lg md:text-xl font-black text-purple-900">₹{revenue.toLocaleString()}</p>
                    </div>
                </div>

                {/* Descriptions */}
                <div className="bg-gray-50 p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 shrink-0">
                    <h3 className="text-lg font-black text-[#1a2b4c] uppercase tracking-wider mb-4 border-b pb-2">Park Description Details</h3>
                    <p className="text-gray-700 font-medium leading-relaxed text-base whitespace-pre-wrap">
                        {park.description || "No extensive description has been provided by the park owner yet."}
                    </p>
                </div>

                {/* Dynamic Gallery */}
                {park.rideImages && park.rideImages.length > 0 && (
                    <div className="bg-gray-50 p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 shrink-0 overflow-hidden">
                        <h3 className="text-lg font-black text-[#1a2b4c] uppercase tracking-wider mb-6 border-b pb-2">Park Gallery & Rides Showcase</h3>
                        <div className="flex overflow-x-auto gap-4 scrollbarhider pb-4">
                            {park.rideImages.map((img, idx) => (
                                <img key={idx} src={`https://nodejs-production-42f2.up.railway.app/uploads/${img}`} className="h-[20vh] md:h-[25vh] min-w-[250px] md:min-w-[350px] rounded-xl object-cover shadow-sm border border-gray-200 shrink-0 cursor-pointer" alt="Park Ride View" />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewPark;
