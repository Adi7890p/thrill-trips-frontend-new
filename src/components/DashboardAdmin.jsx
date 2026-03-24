import React, { useMemo } from 'react'
import { BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#5a54d8', '#ec407a', '#85eb56', '#facc15', '#38bdf8'];

const DashboardAdmin = ({ adminData }) => {

    const { stats, bookings, parks, owners } = adminData || {
        stats: { totalParks: 0, totalOwners: 0, totalUsers: 0, totalBookings: 0, totalRevenue: 0 },
        bookings: [], parks: [], owners: []
    };

    // Calculate Platform Revenue Data (Group by Month)
    const revData = useMemo(() => {
        if (!bookings.length) return [];
        const monthlyRev = {};
        bookings.forEach(b => {
            // Basic parsing assume date 'DD/MM/YYYY' or 'YYYY-MM-DD'
            const d = b.date ? new Date(b.date) : new Date();
            if (isNaN(d.getTime())) return;
            const m = d.toLocaleString('en-US', { month: 'short' });
            monthlyRev[m] = (monthlyRev[m] || 0) + (b.bill || 0);
        });
        return Object.entries(monthlyRev).map(([name, rev]) => ({ name, rev })).slice(-6); // last 6 active months
    }, [bookings]);

    // Calculate Platform Bookings (Group by Weekday)
    const bookData = useMemo(() => {
        if (!bookings.length) return [];
        const days = { 'Mon': 0, 'Tue': 0, 'Wed': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0, 'Sun': 0 };
        bookings.forEach(b => {
            const d = b.date ? new Date(b.date) : new Date();
            if (isNaN(d.getTime())) return;
            const day = d.toLocaleString('en-US', { weekday: 'short' });
            if (days[day] !== undefined) days[day]++;
        });
        return Object.entries(days).map(([name, b]) => ({ name, b }));
    }, [bookings]);

    // Calculate Best Park
    const bestPark = useMemo(() => {
        if (!bookings.length || !parks.length) return [];
        const pCounts = {};
        bookings.forEach(b => {
            pCounts[b.pid] = (pCounts[b.pid] || 0) + 1;
        });
        const sorted = Object.entries(pCounts).sort((a, b) => b[1] - a[1]).slice(0, 3);
        return sorted.map(([pid, b]) => {
            const park = parks.find(p => p.pid == pid);
            return { name: park ? park.pname : pid, b };
        });
    }, [bookings, parks]);

    // Calculate Addons (Including Admin Owner Subscriptions)
    const addonsData = useMemo(() => {
        const addonCounts = {};
        let valid = false;

        // Add Pro Subscription Revenue (999 per Subbed Owner)
        const subCount = owners?.filter(o => o.subscription === true)?.length || 0;
        if (subCount > 0) {
            addonCounts['Owner Subs'] = subCount * 999;
            valid = true;
        }

        bookings?.forEach(b => {
            if (b.addons && typeof b.addons === 'string') {
                const arr = b.addons.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
                const persons = Number(b.persons || 1);
                arr.forEach(addonItem => {
                    let fullPrice = 0;
                    if(addonItem.includes('express')) fullPrice = 250;
                    else if(addonItem.includes('meal')) fullPrice = 180;
                    else if(addonItem.includes('locker')) fullPrice = 100;
                    
                    if(fullPrice > 0) {
                        // Admin gets 60% of addons
                        const adminShare = (fullPrice * persons) * 0.60;
                        addonCounts[addonItem] = (addonCounts[addonItem] || 0) + adminShare;
                        valid = true;
                    }
                });
            }
        });

        if (!valid) return [{ name: 'Meal', val: 30 }, { name: 'Express', val: 50 }, { name: 'Locker', val: 20 }];
        return Object.entries(addonCounts).map(([name, val]) => ({ name, val })).slice(0, 5);
    }, [bookings, owners]);

    return (
        <div className="w-full h-full overflow-y-auto scrollbarhider flex flex-col gap-[2vh] pb-[4vh]">
            <div className='topData h-fit flex justify-between w-full'>
                {[
                    { title: 'Total Parks', val: (stats?.totalParks || 0).toString(), icon: 'carnival-tent.png' },
                    { title: 'Total Owners', val: (stats?.totalOwners || 0).toString(), icon: 'ogowner.png' },
                    { title: 'Total Users', val: (stats?.totalUsers || 0).toString(), icon: 'team.png' },
                    { title: 'Total Bookings', val: (stats?.totalBookings || 0).toString(), icon: 'ticket.png' },
                    { title: 'Total Revenue', val: `₹${(stats?.totalRevenue || 0).toLocaleString()}`, icon: 'salary.png' }
                ].map((item, i) => (
                    <div key={i} className="blocks flex bg-[linear-gradient(135deg,#3d3088,#4a52d9)] rounded-2xl p-[1vw] h-[15vh] w-[19%] shadow-xl border-b-[3px] border-amber-400">
                        <img src={`/${item.icon}`} className='w-auto mr-2 h-[8vh] p-[0.2vw] mt-2 drop-shadow-md' alt="" />
                        <div className='flex flex-col pt-[1.5vh] justify-center leading-tight'>
                            <p className='text-amber-100 text-[0.8vw] font-semibold whitespace-nowrap'>{item.title}</p>
                            <p className='text-white font-bold text-2xl mt-2 overflow-visible'>{item.val}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-[2vh]">
                <div className="flex flex-col h-[40vh] p-[1vw] bg-amber-500 rounded-2xl shadow-xl shadow-amber-900/20">
                    <p className='text-white font-bold text-[1vw] border-b-2 pb-1 border-amber-200/50'>Platform Revenue Analytics</p>
                    <div className='h-full w-full mt-2 pr-4'>
                        {revData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={revData} margin={{ top: 20, right: 30, left: -10, bottom: 0 }}>
                                    <XAxis dataKey="name" tick={{ fill: 'white' }} axisLine={false} tickLine={false} dy={5} />
                                    <YAxis tick={{ fill: 'white' }} tickFormatter={(v) => `₹${v / 1000}k`} axisLine={false} tickLine={false} />
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#d97706" />
                                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', backgroundColor: '#ffffff' }} itemStyle={{ color: '#000000', fontWeight: 'bold' }} formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']} labelFormatter={() => ''} />
                                    <Area type="monotone" dataKey="rev" stroke="#fff" fillOpacity={0.6} fill="#fff" animationDuration={1500} />
                                </AreaChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-amber-100 font-bold">No Revenue Data Available</div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col h-[40vh] p-[1vw] bg-amber-500 rounded-2xl shadow-xl shadow-amber-900/20">
                    <p className='text-white font-bold text-[1vw] border-b-2 pb-1 border-amber-200/50'>Platform Net Bookings</p>
                    <div className='h-full w-full mt-2 pr-4'>
                        {bookData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={bookData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                                    <XAxis dataKey="name" tick={{ fill: 'white' }} axisLine={false} tickLine={false} dy={5} />
                                    <YAxis tick={{ fill: 'white' }} axisLine={false} tickLine={false} />
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#d97706" />
                                    <Tooltip cursor={{ fill: '#b45309', opacity: 0.4 }} contentStyle={{ borderRadius: '8px', border: 'none', backgroundColor: '#ffffff' }} itemStyle={{ color: '#000000', fontWeight: 'bold' }} formatter={(value) => [value, 'Bookings']} labelFormatter={() => ''} />
                                    <Bar dataKey="b" fill="#fff" radius={[4, 4, 0, 0]} barSize={25} animationDuration={1500} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-amber-100 font-bold">No Booking Data Available</div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col h-[40vh] p-[1vw] bg-amber-500 rounded-2xl shadow-xl shadow-amber-900/20">
                    <p className='text-white font-bold text-[1vw] border-b-2 pb-1 border-amber-200/50'>Best Parks (By Bookings)</p>
                    <div className='h-full w-full mt-2 pr-4'>
                        {bestPark.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={bestPark} layout="vertical" margin={{ top: 20, right: 30, left: 10, bottom: 0 }}>
                                    <XAxis type="number" tick={{ fill: 'white' }} axisLine={false} tickLine={false} />
                                    <YAxis dataKey="name" type="category" tick={{ fill: 'white', fontSize: 12 }} axisLine={false} tickLine={false} width={100} />
                                    <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="#d97706" />
                                    <Tooltip cursor={{ fill: '#b45309', opacity: 0.4 }} contentStyle={{ borderRadius: '8px', border: 'none', backgroundColor: '#ffffff' }} itemStyle={{ color: '#000000', fontWeight: 'bold' }} formatter={(value) => [value, 'Bookings']} labelFormatter={() => ''} />
                                    <Bar dataKey="b" fill="#fff" radius={[0, 4, 4, 0]} barSize={25} animationDuration={1500} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-amber-100 font-bold">No Best Park Data Available</div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col h-[40vh] p-[1vw] bg-amber-500 rounded-2xl shadow-xl shadow-amber-900/20">
                    <p className='text-white font-bold text-[1vw] border-b-2 pb-1 border-amber-200/50'>Add-On Revenue Split</p>
                    <div className='h-full w-full mt-2 pb-[1vh]'>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                <Pie data={addonsData} dataKey="val" cx="50%" cy="45%" innerRadius="40%" outerRadius="75%" isAnimationActive={true} animationDuration={1500}>
                                    {addonsData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="none" />)}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', backgroundColor: '#ffffff' }} itemStyle={{ color: '#000000', fontWeight: 'bold' }} formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']} />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ color: '#fff', fontSize: '11px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            <div className="h-[2vh] w-full shrink-0"></div>
        </div>
    )
}
export default DashboardAdmin
