import React, { useState } from 'react'
import PaymentGateway from './PaymentGateway';
import axios from 'axios';
import { ChevronRight } from 'lucide-react'
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

const DashboardOwner = ({ isSubscribed, hasParks, setSel, parks = [], bookings = [], stats = { totalRevenue: 0, todaysBookings: 0 } }) => {
    const parkData = parks.map(p => {
        let parkRev = 0;
        bookings.forEach(b => {
            // Use loose equality or cast to ensure IDs match correctly
            
            if (String(b.pid) === String(p.pid)) {
                const addonsStr = String(b.addons || "").toLowerCase();
                let addonAmt = 0;
                if (addonsStr.includes('express pass')) addonAmt += 250;
                if (addonsStr.includes('meal pass')) addonAmt += 180;
                if (addonsStr.includes('locker pass')) addonAmt += 100;
                let basePrice = Number(b.bill || 0) - addonAmt;
                if (basePrice < 0) basePrice = 0;
                parkRev += (basePrice * 0.90) + (addonAmt * 0.40);
            }
        });
        return { name: p.approved=="Approved" && p.pname.substring(0, 10), revenue: parkRev };
    });

    const bookingsData = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();
        const dateMatcher = `${dd}-${mm}-${yyyy}`;

        const count = bookings.filter(b => b.date === dateMatcher).length;
        bookingsData.push({ name: dayName, bookings: count });
    }

    const navigate = useNavigate();

    const handleSubscribeClick = () => {
        navigate('/payment', {
            state: {
                title: "Pro Revenue Subscription",
                description: "Gain full access to advanced revenue tracking and breakdown analytics for unlimited insight.",
                amount: 499,
                btnText: "Unlock Revenue Statistics",
                apiRoute: "/owner/subscribe",
                successPath: "/owner-dashboard"
            }
        });
    };

    if (hasParks === false) {
        return (
            <div className="w-full h-full flex flex-col items-center pt-[5vh] bg-transparent rounded-2xl p-10 mt-10">
                <div className="bg-white/90 backdrop-blur-md rounded-3xl p-[4vw] text-center shadow-2xl shadow-blue-900/10 flex flex-col items-center max-w-[70vw] border-2 border-blue-100">
                    <div className="w-[10vw] h-[10vw] rounded-full bg-linear-to-br from-blue-50 to-blue-100 flex items-center justify-center mb-[4vh] shadow-inner border-[6px] border-white">
                        <img src="/carnival-tent.png" className="w-[6vw] h-[6vw] object-contain drop-shadow-md hover:scale-110 transition-transform duration-500" alt="No Parks" />
                    </div>
                    <h1 className="text-[3vw] font-extrabold text-blue-900 mb-[2vh] leading-tight tracking-wide" style={{ fontFamily: 'titlef' }}>Welcome to Your Dashboard!</h1>
                    <p className="text-[1.2vw] font-semibold text-blue-800/70 mb-[5vh] max-w-[80%] leading-relaxed font-[bt]">You haven't listed any theme parks yet. Get started by adding your first park facility to start receiving live bookings and unlock powerful revenue analytics.</p>
                    <button onClick={() => setSel && setSel('Add Park')} className="bg-[linear-gradient(135deg,#f59e0b,#d97706)] hover:bg-[linear-gradient(135deg,#d97706,#b45309)] text-white tracking-widest font-extrabold py-[2.5vh] px-[4vw] rounded-3xl shadow-[0_10px_25px_rgba(245,158,11,0.4)] text-[1.2vw] hover:scale-[1.05] active:scale-[0.98] transition-all border-4 border-amber-200">
                        + GET STARTED: ADD PARK
                    </button>
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>
            <div className='topData h-fit flex justify-between w-full'>
                <div className="blocks flex items-center bg-[linear-gradient(135deg,#3d3088,#4a52d9)] rounded-2xl p-[1vw] xl:p-[1.5vw] h-auto min-h-[16vh] w-[24%] shadow-lg transition-transform hover:scale-[1.02] overflow-hidden">
                    <div className="bg-white/10 shrink-0 p-[0.8vw] rounded-xl mr-[1vw] flex items-center justify-center shadow-inner">
                        <img src="/carnival-tent.png" className='w-[3.5vw] h-[3.5vw] object-contain drop-shadow-md' alt="Total Parks" />
                    </div>
                    <div className='flex flex-col flex-1 justify-center shrink-0 min-w-0'>
                        <p className='text-blue-100/80 font-semibold text-[0.9vw] tracking-wider uppercase leading-tight truncate'>Total Parks</p>
                        <p className='text-white font-extrabold text-[2.2vw] leading-none mt-[0.5vh] truncate'>{parks.length}</p>
                    </div>
                </div>

                <div className="blocks flex items-center bg-[linear-gradient(135deg,#3d3088,#4a52d9)] rounded-2xl p-[1vw] xl:p-[1.5vw] h-auto min-h-[16vh] w-[24%] shadow-lg transition-transform hover:scale-[1.02] overflow-hidden">
                    <div className="bg-white/10 shrink-0 p-[0.8vw] rounded-xl mr-[1vw] flex items-center justify-center shadow-inner">
                        <img src="/ticket.png" className='w-[3.5vw] h-[3.5vw] object-contain drop-shadow-md' alt="Total Bookings" />
                    </div>
                    <div className='flex flex-col flex-1 justify-center shrink-0 min-w-0'>
                        <p className='text-blue-100/80 font-semibold text-[0.9vw] tracking-wider uppercase leading-tight truncate'>Total Bookings</p>
                        <p className='text-white font-extrabold text-[2.2vw] leading-none mt-[0.5vh] truncate'>{bookings.length}</p>
                    </div>
                </div>

                <div className="blocks flex items-center bg-[linear-gradient(135deg,#3d3088,#4a52d9)] rounded-2xl p-[1vw] xl:p-[1.5vw] h-auto min-h-[16vh] w-[24%] shadow-lg transition-transform hover:scale-[1.02] overflow-hidden">
                    <div className="bg-white/10 shrink-0 p-[0.8vw] rounded-xl mr-[1vw] flex items-center justify-center shadow-inner">
                        <img src="/calendar (1).png" className='w-[3.5vw] h-[3.5vw] object-contain drop-shadow-md' alt="Today's Bookings" />
                    </div>
                    <div className='flex flex-col flex-1 justify-center shrink-0 min-w-0'>
                        <p className='text-blue-100/80 font-semibold text-[0.9vw] tracking-wider uppercase leading-tight truncate'>Today's Books</p>
                        <p className='text-white font-extrabold text-[2.2vw] leading-none mt-[0.5vh] truncate'>{stats.todaysBookings}</p>
                    </div>
                </div>

                <div className="blocks flex items-center bg-[linear-gradient(135deg,#3d3088,#4a52d9)] rounded-2xl p-[1vw] xl:p-[1.5vw] h-auto min-h-[16vh] w-[24%] shadow-lg transition-transform hover:scale-[1.02] overflow-hidden">
                    <div className="bg-white/10 shrink-0 p-[0.8vw] rounded-xl mr-[1vw] flex items-center justify-center shadow-inner">
                        <img src="/salary.png" className='w-[3.5vw] h-[3.5vw] object-contain drop-shadow-md' alt="Total Revenue" />
                    </div>
                    <div className='flex flex-col flex-1 justify-center shrink-0 min-w-0'>
                        <p className='text-blue-100/80 font-semibold text-[0.9vw] tracking-wider uppercase leading-tight truncate'>Total Revenue</p>
                        <p className='text-white font-extrabold text-[1.5vw] leading-none mt-[0.5vh] truncate'>₹{stats.totalRevenue.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            <hr className="my-6 border-white/20" />

            {/* Charts Section */}
            <div className="relative w-full h-fit ">
                <div className="charts flex justify-between h-full">
                    <div className="chart1 flex flex-col h-[45vh] p-[1vw] w-[49%] bg-amber-500 rounded-2xl shadow-xl shadow-amber-900/20">
                        <p className='text-white font-bold text-[1.2vw] border-b-2 pb-2 border-amber-200/50'>Our Bookings</p>
                        <div className='h-full w-full mt-[2vh] pr-[1vw]'>
                            {!isSubscribed ? <div className='flex h-full w-full justify-center items-center font-bold text-[1.5vw] text-red-500 cursor-pointer' onClick={handleSubscribeClick} >
                                <div className='bg-yellow-200 animate-bounce p-2 rounded-2xl text-red-500'>Upgrade to view Premium Charts</div>
                            </div> : <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={bookingsData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d97706" />
                                    <XAxis dataKey="name" tick={{ fill: 'white', fontSize: '0.9vw' }} axisLine={false} tickLine={false} dy={10} />
                                    <YAxis tick={{ fill: 'white', fontSize: '0.9vw' }} axisLine={false} tickLine={false} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', backgroundColor: '#ffffff', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        itemStyle={{ color: '#000000', fontWeight: 'bold' }}
                                        formatter={(value) => [value, 'Bookings']}
                                        labelFormatter={() => ''}
                                    />
                                    <Area type="monotone" dataKey="bookings" stroke="#fff" strokeWidth={3} fillOpacity={0.6} fill="#fff" animationDuration={1500} />
                                </AreaChart>
                            </ResponsiveContainer>}
                        </div>
                    </div>
                    <div className="chart2 flex flex-col h-[45vh] w-[49%] p-[1vw] bg-amber-500 rounded-2xl shadow-xl shadow-amber-900/20">
                        <p className='text-white font-bold text-[1.2vw] border-b-2 pb-2 border-amber-200/50'>Park Revenue</p>
                        <div className='h-full w-full mt-[2vh] pr-[1vw]'>
                            {!isSubscribed ? <div className='flex h-full w-full justify-center items-center font-bold text-[1.5vw] text-red-500 cursor-pointer'
                                onClick={handleSubscribeClick}
                            >
                                <div className='bg-yellow-200 animate-bounce p-2 rounded-2xl text-red-500'>Upgrade to view Premium Charts</div>
                            </div> : <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={parkData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d97706" />
                                    <XAxis dataKey="name" tick={{ fill: 'white', fontSize: '0.9vw' }} axisLine={false} tickLine={false} dy={10} />
                                    <YAxis tick={{ fill: 'white', fontSize: '0.9vw' }} axisLine={false} tickLine={false} />
                                    <Tooltip
                                        cursor={{ fill: '#b45309', opacity: 0.4 }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', backgroundColor: '#ffffff', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        itemStyle={{ color: '#000000', fontWeight: 'bold' }}
                                        formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
                                        labelFormatter={() => ''}
                                    />
                                    <Bar dataKey="revenue" fill="#fff" radius={[6, 6, 0, 0]} barSize={40} animationDuration={1500} />
                                </BarChart>
                            </ResponsiveContainer>}
                        </div>
                    </div>
                </div>
            </div>

            <hr className="my-6 border-white/20" />

            {/* Recent Bookings and My Parks - NOT Wrapped in Subscription Blur */}
            <div className="recent flex w-full justify-between ">
                <div className="w-[59%] p-[1vw] flex flex-col h-[40vh] rounded-2xl bg-[linear-gradient(135deg,#3d3088,#4a52d9)]  ">
                    <div className='flex justify-between h-[6vh] mb-[1vh] w-full  pb-2'>
                        <div className='text-white font-bold text-[1.2vw] border-gray-300'>Recent Bookings</div>
                        <div className='flex hover:bg-amber-400 cursor-pointer transition-all duration-300 gap-[1vw] items-center justify-between text-white border-2 rounded-lg px-[0.5vw]  w-fit h-fit py-[0.3vh]  font-bold text-[1.2vw] border-gray-300'>
                            <div className=''>View All </div>
                            <ChevronRight className='text-sm ' size={15} />
                        </div>

                    </div>
                    <div className=' h-full w-full'>
                        <table className='w-full '>
                            <thead>
                                <tr className=' flex justify-between gap-[7vw] px-3  py-2 border-y-2  '>
                                    <th className='w-1/4 text-center'>User</th>
                                    <th className='w-1/4 text-center'>Date</th>
                                    <th className='w-1/4 text-center'>Persons</th>
                                    <th className='w-1/4 text-center'>Amount</th>

                                </tr>
                            </thead>
                            <tbody className='text-white'>
                                {bookings.length === 0 ? (
                                    <tr><td colSpan="4" className="text-center p-4 text-amber-200/50">No bookings found</td></tr>
                                ) : bookings.slice(0, 3).map((b, i) => (
                                    <tr key={i} className='border-b-2 border-dashed flex justify-between border-amber-400'>
                                        <td className='flex w-1/4 items-center gap-[0.5vw] p-[0.5vw]'>
                                            <div className='text-sm truncate'>{b.username}</div>
                                        </td>
                                        <td className='text-sm w-1/4 text-center p-[0.5vw]'>{b.date}</td>
                                        <td className='text-sm w-1/4 text-center p-[0.5vw]'>{b.persons}</td>
                                        <td className='text-sm w-1/4 text-center p-[0.5vw]'>₹{b.bill}</td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>
                <div className="w-[39%] p-[1vw] flex flex-col h-[40vh] rounded-2xl bg-[linear-gradient(135deg,#3d3088,#4a52d9)]  ">
                    <p className='text-white font-bold text-[1.2vw] border-b-2 pb-2 border-gray-300'>My Parks</p>
                    <div className=' h-full w-full flex flex-col gap-[1vh]  mt-2'>
                        {parks.slice(0, 3).map((p, i) => (
                            <div key={i} className='flex justify-between px-[1.5vw] h-[8vh] bg-blue-700/50 rounded-lg shrink-0'>
                                <div className='flex items-center gap-[1vw] truncate'>
                                    <img src={p.parkImage ? `https://nodejs-production-42f2.up.railway.app/uploads/${p.parkImage}` : "/dubai.png"} className='w-[3vw] h-[3vw] rounded-full shadow-sm' alt="" />
                                    <div className='text-[0.9vw] font-bold text-white tracking-wider uppercase truncate'>{p.pname}</div>
                                </div>
                                <div className='flex items-center gap-[0.5vw]'>
                                    <div className={`text-[0.6vw] text-white font-extrabold rounded-full px-[0.8vw] py-[0.5vh] uppercase tracking-wider ${p.approved === 'Approved' ? 'bg-green-500' : p.approved === 'Rejected' ? 'bg-red-500' : 'bg-amber-500'}`}>{p.approved}</div>
                                    
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default DashboardOwner