import React from 'react'
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#5a54d8', '#ec407a', '#ffb74d'];

const Revenue = ({ isSubscribed, setIsSubscribed, parks = [], bookings = [] }) => {
    const calculateBookingStats = (b) => {
        const addonsStr = String(b.addons || "").toLowerCase();
        let addonAmt = 0;
        if (addonsStr.includes('express pass')) addonAmt += 250;
        if (addonsStr.includes('meal pass')) addonAmt += 180;
        if (addonsStr.includes('locker pass')) addonAmt += 100;

        let basePrice = Number(b.bill || 0) - addonAmt;
        if (basePrice < 0) basePrice = 0;

        return {
            gross: basePrice + addonAmt,
            commission: (basePrice * 0.10) + (addonAmt * 0.60),
            net: (basePrice * 0.90) + (addonAmt * 0.40)
        };
    };

    const aggregated = bookings.reduce((acc, b) => {
        const stats = calculateBookingStats(b);
        return { gross: acc.gross + stats.gross, comm: acc.comm + stats.commission, net: acc.net + stats.net };
    }, { gross: 0, comm: 0, net: 0 });

    const totalRev = aggregated.gross;
    const commDed = aggregated.comm;
    const netRev = aggregated.net;

    const data = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date(); d.setDate(d.getDate() - i);
        const dd = String(d.getDate()).padStart(2, '0');
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const yyyy = d.getFullYear();
        const dateMatch = `${dd}-${mm}-${yyyy}`;
        const dayBookings = bookings.filter(b => b.date && b.date.includes(dateMatch));
        const dayRev = dayBookings.reduce((s, b) => s + calculateBookingStats(b).net, 0); // Plot Net Revenue
        data.push({ name: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), revenue: dayRev });
    }

    const addonData = [{ name: "Express Pass", value: 0 }, { name: "Meal Pass", value: 0 }, { name: "Locker Pass", value: 0 }];
    bookings.forEach(b => {
        const persons = Number(b.persons || 1);
        if (b.addons && b.addons.toLowerCase().includes('express')) addonData[0].value += (250 * persons * 0.40);
        if (b.addons && b.addons.toLowerCase().includes('meal')) addonData[1].value += (180 * persons * 0.40);
        if (b.addons && b.addons.toLowerCase().includes('locker')) addonData[2].value += (100 * persons * 0.40);
    });

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

    return (
        <>
            <div className="relative w-full h-fit flex flex-col ">
                {!isSubscribed && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center rounded-2xl pb-[10vh] border-2 border-white/5 bg-black/5 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent backdrop-blur-[2px]">
                        <button onClick={handleSubscribeClick} className="bg-amber-500 hover:bg-amber-600 text-[#151623] tracking-widest font-extrabold py-[1.5vh] px-[2.5vw] rounded-2xl shadow-[0_0_20px_rgba(245,158,11,0.6)] text-[1.2vw] hover:scale-110 transition-transform border-[3px] border-amber-300 z-60 animate-pulse">
                            SUBSCRIBE TO UNLOCK "REVENUE STATISTICS & PREMIUM CHARTS" FEATURE FOR ONLY ₹499!
                        </button>
                    </div>
                )}
                <div onWheel={(e) => e.stopPropagation()} className={`w-full flex-1 overflow-y-auto p-4 lg:p-6 pb-[10vh] bg-gray-50 scrollbarhider rounded-2xl flex flex-col ${!isSubscribed ? 'pointer-events-none opacity-40 blur-sm select-none' : ''}`}>
                    {/* Top Stat Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        <div className="bg-white p-4 rounded-lg shadow-sm border-b-[5px] border-blue-500 text-center flex flex-col items-center justify-center">
                            <p className="text-gray-600 font-bold text-xs lg:text-sm mb-1">Total Revenue</p>
                            <p className="text-xl lg:text-2xl font-extrabold text-[#1a2b4c]">₹{totalRev.toLocaleString()}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border-b-[5px] border-purple-500 text-center flex flex-col items-center justify-center">
                            <p className="text-gray-600 font-bold text-xs lg:text-sm mb-1">Commission Deducted</p>
                            <p className="text-xl lg:text-2xl font-extrabold text-[#1a2b4c]">₹{commDed.toLocaleString()}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border-b-[5px] border-green-400 text-center flex flex-col items-center justify-center">
                            <p className="text-gray-600 font-bold text-xs lg:text-sm mb-1">Net Earnings</p>
                            <p className="text-xl lg:text-2xl font-extrabold text-[#1a2b4c]">₹{netRev.toLocaleString()}</p>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex flex-col lg:flex-row gap-4 mb-4">
                        {/* Left Chart Area */}
                        <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-sm p-4 relative min-h-[320px] flex flex-col">
                            <h3 className="font-extrabold text-[#1a2b4c] mb-3 text-sm">Park Revenue</h3>
                            <div className="w-full flex-1 min-h-[250px] -ml-4 mt-2">
                                <ResponsiveContainer width="100%" height="80%">
                                    <AreaChart
                                        data={data}
                                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                        className="transition-all duration-700"
                                    >
                                        <defs>
                                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#5a54d8" stopOpacity={0.6} />
                                                <stop offset="95%" stopColor="#c26bcc" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} dy={10} />
                                        <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} dx={-10} />
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            itemStyle={{ color: '#1a2b4c', fontWeight: 'bold' }}
                                            formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
                                        />
                                        <Area isAnimationActive={true} animationDuration={1500} animationEasing="ease-in-out" type="monotone" dataKey="revenue" stroke="#A260DD" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>                </div>

                        <div className="w-full lg:w-1/3 flex flex-col gap-4">
                            {/* Add-On Earnings */}
                            <div className="bg-white rounded-lg shadow-sm p-4 flex-1 flex flex-col min-h-[250px]">
                                <h3 className="font-extrabold text-[#1a2b4c] mb-3 text-sm">Add-On Earnings</h3>
                                <div className="flex-1 w-full relative">
                                    <ResponsiveContainer width="100%" height="100%" className="-ml-3">
                                        <PieChart>
                                            <Pie
                                                data={addonData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="value"
                                                animationDuration={1500}
                                                isAnimationActive={true}
                                            >
                                                {addonData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="transparent" />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                formatter={(value) => [`₹${value.toLocaleString()}`, 'Earnings']}
                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            />
                                            <Legend verticalAlign="bottom" height={30} iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Table Section */}
                    <div className="bg-white rounded-2xl shadow-md p-6 w-full mb-8 relative">
                        <h3 className="font-extrabold text-[#1a2b4c] mb-6 text-sm">Revenue Breakdown</h3>
                        <div className="overflow-x-auto flex w-full">
                            <table className="w-full text-left border-collapse min-w-[650px]">
                                <thead>
                                    <tr className="text-gray-600 text-sm border-b-2 border-gray-100">
                                        <th className="pb-3 px-2 font-semibold">Date</th>
                                        <th className="pb-3 px-2 font-semibold">Park Name</th>
                                        <th className="pb-3 px-2 font-semibold text-center">Bookings</th>
                                        <th className="pb-3 px-2 font-semibold text-center whitespace-nowrap">Total Amount</th>
                                        <th className="pb-3 px-2 font-semibold text-center">Commission</th>
                                        <th className="pb-3 px-2 font-semibold text-center whitespace-nowrap">Net Earnings</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {bookings.length === 0 ? (
                                        <tr><td colSpan="6" className="text-center p-4 text-gray-500 font-bold uppercase tracking-widest text-sm">No Payout Records Available</td></tr>
                                    ) : bookings.slice(0, 10).map((b, idx) => (
                                        <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                            <td className="py-3 px-2 text-gray-700 whitespace-nowrap">{b.date}</td>
                                            <td className="py-3 px-2 text-[#1a2b4c] font-bold flex items-center gap-2 whitespace-nowrap">
                                                {b.parkInfo?.pname || b.pid}
                                            </td>
                                            <td className="py-3 px-2 text-gray-700 text-center">{b.persons}</td>
                                            <td className="py-3 px-2 text-[#1a2b4c] font-bold text-center">₹{b.bill}</td>
                                            <td className="py-3 px-2 text-gray-500 text-center font-semibold">₹{parseInt(b.bill * 0.1)}</td>
                                            <td className="py-3 px-2 text-green-600 font-bold text-center">₹{parseInt(b.bill * 0.9)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Revenue