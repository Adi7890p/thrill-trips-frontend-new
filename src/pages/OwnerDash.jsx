import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { PanelLeftClose, PanelLeftOpen, LogOut, Bell } from 'lucide-react';
import gsap from 'gsap';
import DashboardOwner from '../components/DashboardOwner';
import AddPark from '../components/AddPark';
import MyParks from '../components/MyParks';
import ParkBookings from '../components/ParkBookings';
import Revenue from '../components/Revenue';
import OwnerNotifications from '../components/OwnerNotifications';
import { io } from 'socket.io-client';
import EditPark from '../components/EditPark';
import ViewPark from '../components/ViewPark';

const OwnerDash = () => {
    const navigate = useNavigate();
    const [sidepnl, setSidepnl] = useState(true);
    const token = sessionStorage.getItem("token");
    const left = useRef();
    const right = useRef();
    const [sel, setSel] = useState('Dashboard')
    const [activePark, setActivePark] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [hasUnread, setHasUnread] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [hasParks, setHasParks] = useState(true);
    const [parks, setParks] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [dashStats, setDashStats] = useState({ totalRevenue: 0, todaysBookings: 0 });
    const [refreshData, setRefreshData] = useState(false);

    useEffect(() => {
        if (!sessionStorage.getItem('owner')) {
            navigate('/owner-login', { replace: true });
        }
    }, [navigate]);

    useEffect(() => {
        if (sel === 'Notifications') {
            setHasUnread(false);
            const ownerEmail = sessionStorage.getItem("owner");
            if (ownerEmail) {
                axios.post('https://nodejs-production-42f2.up.railway.app/owner/notifications/read', { email: ownerEmail });
                setNotifications(prev => prev.map(n => ({ ...n, read: true })));
            }
        } else {
            setNotifications(prev => prev.filter(n => !n.read));
        }
    }, [sel]);

    useEffect(() => {
        const ownerEmail = sessionStorage.getItem("owner");
        if (ownerEmail) {
            axios.get(`https://nodejs-production-42f2.up.railway.app/owner/notifications/${ownerEmail}`).then(res => {
                if (res.data.success) {
                    setNotifications(res.data.notifications);
                    setHasUnread(res.data.notifications.some(n => !n.read));
                }
            });
            axios.get(`https://nodejs-production-42f2.up.railway.app/owner/data/${ownerEmail}`).then(res => {
                if (res.data.success) {
                    setParks(res.data.parks);
                    setBookings(res.data.bookings);
                    setDashStats(res.data.stats);
                    setHasParks(res.data.parks.length > 0);
                }
            });
        }
    }, [isSubscribed, refreshData]);

    useEffect(() => {
        if (!token) {
            // alert("Please login first");
            // navigate("/owner-login");
        }
        if (token) {
            axios.post("https://nodejs-production-42f2.up.railway.app/owner-verifier", { token }).then((res) => {
                if (!res.data.success) {
                    alert(res.data.message);
                    // navigate("/owner-login");
                } else {
                    // alert(res.data.message);
                    sessionStorage.setItem("owner", res.data.owner);
                    sessionStorage.setItem("accountNumber", res.data.accountNumber || "");
                    setIsSubscribed(res.data.subscribed);
                    setHasParks(res.data.hasParks);

                    // Initialise WebSocket room connection targeting this Owner specifically
                    const newSocket = io('https://nodejs-production-42f2.up.railway.app');
                    newSocket.on('connect', () => {
                        newSocket.emit('join_owner', res.data.owner);
                    });

                    newSocket.on('park_status_updated', (notif) => {
                        setHasUnread(true);
                        setNotifications(prev => [notif, ...prev]);
                        setRefreshData(prev => !prev);
                    });

                    newSocket.on('new_booking_notification', (notif) => {
                        setHasUnread(true);
                        setNotifications(prev => [notif, ...prev]);
                        setRefreshData(prev => !prev);
                    });
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }, [])

    const panelmover = () => {
        setSidepnl(!sidepnl);
        if (sidepnl) {
            gsap.to(left.current, { width: '0vw', duration: 0.5, ease: 'power2.out' });
            Array.from(left.current.children).forEach(child => {
                child.style.display = 'none';
            });
            gsap.to(right.current, { width: '100vw', duration: 0.5, ease: 'power2.out' });
        }
        else {
            gsap.to(left.current, { width: '33vw', duration: 0.5, ease: 'power2.out' });
            Array.from(left.current.children).forEach(child => {
                child.style.display = 'flex';
            });
            gsap.to(right.current, { width: 'full', duration: 0.5, ease: 'power2.out' });

        }
    }
    return (
        <div>
            <Header />
            <div className='px-[2vw] pb-[3vh]'>
                <div className="parent flex w-[96vw] h-auto min-h-[95vh] pb-8 rounded-r-2xl gap-[1vw] overflow-hidden">
                    <div ref={left} className="leftpanel w-1/4 self-stretch rounded-r-2xl bg-blue-300 leftpanel rounded-2xl p-2 flex flex-col justify-start items-center gap-3">
                        <div className='w-full p-[1vw] h-[10vh] bg-orange-400 rounded-2xl flex justify-between items-center text-blue-200 text-1xl font-extrabold' style={{ fontFamily: 'titlef' }}>
                            <div className='flex justify-center  pr-13 border-amber-800 border-dotted  items-center gap-2'>
                                <img src="/profile.png" className=' border-amber-800 h-[8vh] w-[8vh] rounded-full' alt="" />
                                <div className='text-blue-900 font-[bt] text-[2vw] tracking-wide'>{(sessionStorage.getItem('owner') || 'Owner').split('@')[0]}</div>

                            </div>

                            <div className='flex items-center p-[1vw] justify-center border-l-2 border-amber-900 border-dashed h-[9vh]'>
                                <label htmlFor="notifications" className={sel == 'Notifications' ? 'bg-blue-900 cursor-pointer text-white p-2 rounded-full shadow-inner' : 'bg-amber-900 hover:bg-blue-900 transition-all duration-300 cursor-pointer text-white p-2 rounded-full shadow-lg'}>
                                    <div className="relative">
                                        <Bell size={30} />
                                        {notifications.length > 0 && (
                                            <span className={`absolute -top-2 -right-2 bg-green-500 text-white text-[12px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-md ${hasUnread ? 'animate-bounce' : ''}`}>{notifications.length}</span>
                                        )}
                                    </div>
                                    <input className='hidden' type="radio" name="panel" id="notifications" value='Notifications' onChange={(e) => setSel(e.target.value)} />
                                </label>
                            </div>


                        </div>
                        <hr style={{ borderWidth: '1px' }} className=' my-1 border-dashed text-amber-900 opacity-100 w-full rounded-full' />

                        <label htmlFor='dashboard' className={(sel == 'Dashboard' ? 'bg-blue-900 text-blue-200 p-2 flex justify-center border-2 rounded font-extrabold w-full text-center  text-2xl border-blue-900'
                            :
                            'text-blue-900  p-2 border-2 rounded font-extrabold w-full text-center hover:bg-blue-900 hover:border-2 hover:border-blue-900 hover:text-blue-200 transition-all duration-400 text-2xl flex justify-center')}

                            style={{ fontFamily: 'titlef' }}>Dashboard<input type="radio" name="panel" className='hidden' id="dashboard" value="Dashboard" onChange={(e) => setSel(e.target.value)} /></label>


                        <label htmlFor='addpark' className={(sel == 'Add Park' ? 'bg-blue-900 text-blue-200 p-2 border-2 rounded font-extrabold w-full text-center flex justify-center  text-2xl border-blue-900' : 'text-blue-900  p-2 border-2 rounded font-extrabold w-full text-center hover:bg-blue-900 hover:border-2 hover:border-blue-900 hover:text-blue-200 transition-all duration-400 text-2xl flex justify-center')} style={{ fontFamily: 'titlef' }}>Add Park<input type="radio" name="panel" className='hidden' id="addpark" value='Add Park' onChange={(e) => setSel(e.target.value)} /></label>

                        <label htmlFor='myParks' className={(sel == 'My Parks' ? 'bg-blue-900 text-blue-200 p-2 border-2 rounded font-extrabold  w-full text-center flex justify-center  text-2xl border-blue-900'
                            :
                            'text-blue-900 flex justify-center  p-2 border-2 rounded font-extrabold w-full text-center hover:bg-blue-900 hover:border-2 hover:border-blue-900 hover:text-blue-200 transition-all duration-400 text-2xl')} style={{ fontFamily: 'titlef' }}>My Parks<input type="radio" name="panel" className='hidden' id="myParks" value='My Parks' onChange={(e) => setSel(e.target.value)} /></label>

                        <label htmlFor='bookings' className={(sel == 'Bookings' ? 'bg-blue-900 flex justify-center text-blue-200 p-2 border-2 rounded font-extrabold w-full text-center  text-2xl border-blue-900'
                            :
                            'text-blue-900 flex justify-center  p-2 border-2 rounded font-extrabold w-full text-center hover:bg-blue-900 hover:border-2 hover:border-blue-900 hover:text-blue-200 transition-all duration-400 text-2xl')} style={{ fontFamily: 'titlef' }}>Bookings<input type="radio" name="panel" className='hidden' id="bookings" value='Bookings' onChange={(e) => setSel(e.target.value)} /></label>



                        <label htmlFor='revenue' className={(sel == 'Revenue Statistics' ? 'bg-blue-900 flex justify-center text-blue-200 p-2 border-2 rounded font-extrabold w-full text-center  text-2xl border-blue-900'
                            :
                            'text-blue-900  p-2 border-2 rounded font-extrabold flex justify-center w-full text-center hover:bg-blue-900 hover:border-2 hover:border-blue-900 hover:text-blue-200 transition-all duration-400 text-2xl')} style={{ fontFamily: 'titlef' }}>Revenue Statistics<input type="radio" name="panel" className='hidden' id="revenue" value='Revenue Statistics' onChange={(e) => setSel(e.target.value)} /></label>

                        <div className='text-blue-900 w-11 overflow-hidden h-10 font-extrabold hover:w-40  transition-all duration-500 cursor-pointer  text-2xl' style={{ fontFamily: 'titlef' }} onClick={() => { sessionStorage.removeItem('owner'); sessionStorage.removeItem('token'); navigate('/owner-login', { replace: true }); }}>
                            <div className='flex flex-wrap items-center gap-2' style={{ fontFamily: 'titlef' }}><LogOut color="#1C398E" className=' px-1.5 border-2 rounded-full' strokeWidth={3.5} size={40} />Log Out</div>
                        </div>

                    </div>
                    <div ref={right} className="rightpanel flex-1 min-w-0 self-stretch rounded-l-2xl flex-col flex p-[1vw]">
                        <div className='border-b-2 text-4xl border-dotted p-[0.5vw] font-[mouldy] tracking-wider text-amber-400 text-center mb-[2vh]' >
                            {sidepnl ? <PanelLeftClose className='text-amber-600' onClick={panelmover} /> : <PanelLeftOpen className='text-amber-600' onClick={panelmover} />}
                            {sel}
                        </div>
                        {sel == "Dashboard" ? <DashboardOwner isSubscribed={isSubscribed} hasParks={hasParks} setSel={setSel} parks={parks} bookings={bookings} stats={dashStats} />
                            : sel == "Add Park" ? <AddPark onAdded={() => setRefreshData(prev => !prev)} />
                                : sel == "My Parks" ? <MyParks parks={parks} bookings={bookings} onUpdate={() => setRefreshData(prev => !prev)} setSel={setSel} setActivePark={setActivePark} /> : sel == "Bookings" ? <ParkBookings bookings={bookings} /> : sel == "Revenue Statistics" ? <Revenue isSubscribed={isSubscribed} setIsSubscribed={setIsSubscribed} parks={parks} bookings={bookings} stats={dashStats} /> : sel == "Edit Park" ? <EditPark park={activePark} onBack={() => setSel("My Parks")} onUpdate={() => { setRefreshData(prev => !prev); setSel("My Parks"); }} /> : sel == "View Park" ? <ViewPark park={activePark} bookings={bookings} onBack={() => setSel("My Parks")} /> : sel == "Notifications" ? <OwnerNotifications notifications={notifications} /> : ""}
                    </div>
                </div>
            </div>

        </div >

    )
}

export default OwnerDash