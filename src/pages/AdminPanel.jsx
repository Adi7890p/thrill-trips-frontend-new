import React, { useState, useRef, useEffect } from 'react'
import { io } from 'socket.io-client';
import axios from 'axios';
import Header from '../components/Header'
import { PanelLeftClose, PanelLeftOpen, LogOut, Bell } from 'lucide-react';
import gsap from 'gsap';
import "bootstrap/dist/css/bootstrap.min.css";
import "./admin.css";
import DashboardAdmin from '../components/DashboardAdmin';
import AdminApprovals from '../components/AdminApprovals';
import AdminParks from '../components/AdminParks';
import AdminOwners from '../components/AdminOwners';
import AdminUsers from '../components/AdminUsers';
import AdminBookings from '../components/AdminBookings';
import ManageAdmins from '../components/ManageAdmins';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [sidepnl, setSidepnl] = useState(true);
  const left = useRef();
  const right = useRef();
  const [sel, setSel] = useState('Overview');
  const [approvals, setApprovals] = useState([]);
  const [hasUnread, setHasUnread] = useState(false);
  const [adminData, setAdminData] = useState({
    users: [], owners: [], parks: [], bookings: [],
    stats: { totalUsers: 0, totalOwners: 0, totalParks: 0, totalBookings: 0, totalRevenue: 0 }
  });

  useEffect(() => {
    if (!sessionStorage.getItem('admin')) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    if (sel === 'Park Approvals') {
      setHasUnread(false);
    }
  }, [sel]);

  useEffect(() => {
    const fetchPendingParks = async () => {
      try {
        const res = await axios.get('https://nodejs-production-42f2.up.railway.app/admin/parks/pending');
        if (res.data.success) {
          setApprovals(res.data.parks);
        }
      } catch (err) {
        console.log("Error fetching pending parks", err);
      }
    };
    const fetchAdminData = async () => {
      try {
        const res = await axios.get('https://nodejs-production-42f2.up.railway.app/admin/dashboard-data');
        if (res.data.success) {
          setAdminData(res.data);
        }
      } catch (err) {
        console.log("Error fetching admin data", err);
      }
    };
    fetchPendingParks();
    fetchAdminData();

    // Set refresh mechanism natively tied to socket if needed
    const newSocket = io('https://nodejs-production-42f2.up.railway.app', {
      transports: ['websocket', 'polling']
    });

    newSocket.on('connect', () => {
      console.log('Admin connected to socket server');
      newSocket.emit('join_admin');
    });

    newSocket.on('connect_error', (err) => {
      console.log('Admin socket connection error:', err);
    });

    newSocket.on('new_park_request', (park) => {
      setHasUnread(true);
      setApprovals(prev => {
        if (prev.find(p => p._id === park._id)) return prev;
        return [park, ...prev];
      });
    });

    newSocket.on('status_updated', (park) => {
      if (park.approved !== 'Pending') {
        setApprovals(prev => prev.filter(p => p._id !== park._id));
      }
    });

    newSocket.on('new_booking_admin', (newBooking) => {
      fetchAdminData();
    });

    newSocket.on('booking_cancelled_admin', (data) => {
      fetchAdminData();
    });

    return () => newSocket.close();
  }, []);

  const panelmover = () => {
    setSidepnl(!sidepnl);
    if (sidepnl) {
      gsap.to(left.current, { width: '0vw', duration: 0.5, ease: 'power2.out' });
      Array.from(left.current.children).forEach(child => child.style.display = 'none');
    } else {
      gsap.to(left.current, { width: '25%', duration: 0.5, ease: 'power2.out' });
      Array.from(left.current.children).forEach(child => child.style.display = 'flex');
    }
  }

  return (
    <div className="bg-[#151623] min-h-screen text-[#afc4d7] w-full pb-10">
      <Header />
      <div className='px-[2vw] pb-[3vh]'>
        <div className="parent flex w-[96vw] h-auto min-h-[90vh] rounded-r-2xl gap-[1vw] overflow-hidden">

          {/* Sidebar */}
          <div ref={left} className="w-1/4 h-full rounded-2xl bg-blue-300 p-2 flex flex-col items-center gap-2  pb-6">

            <div className='w-full p-[1vw] h-[10vh] shrink-0 bg-orange-400 rounded-2xl flex justify-between items-center text-blue-200 font-extrabold' style={{ fontFamily: 'titlef' }}>
              <div className='flex justify-center  pr-4 lg:pr-10 border-amber-800 border-dotted items-center gap-2'>
                <img src='admin (1).png' className='w-[3vw]'></img>
                <div className='text-blue-900 font-[bt] text-[1.8vw] tracking-wide leading-none'>Admin<br /><span className="text-[1vw] text-white">Master</span></div>
              </div>

              {/* Notification Bell Section */}
              <div className='flex items-center p-[1vw] justify-center border-l-2 border-amber-900 border-dashed h-[9vh]'>

                <label htmlFor="notifications" className={sel === 'Park Approvals' ? 'bg-blue-900 text-white p-2 rounded-full cursor-pointer shadow-inner' : 'bg-amber-900 hover:bg-blue-900 transition-all duration-300 cursor-pointer text-white p-2 rounded-full shadow-lg'}>
                  <div className="relative">
                    <Bell size={26} />
                    {approvals.length > 0 && (
                      <span className={`absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-md ${hasUnread ? 'animate-bounce' : ''}`}>{approvals.length}</span>
                    )}
                  </div>
                  <input className='hidden' type="radio" name="panel" id="notifications" value='Park Approvals' onChange={(e) => setSel(e.target.value)} />
                </label>
              </div>
            </div>

            <hr style={{ borderWidth: '1px' }} className='my-[1vh] border-dashed text-amber-900 opacity-100 w-full rounded-full shrink-0' />

            {/* Navigation Tabs */}
            {[
              { name: 'Overview', val: 'Overview' },
              { name: 'Manage Admins', val: 'Manage Admins' },
              { name: 'Park Approvals', val: 'Park Approvals' },
              { name: 'Manage Parks', val: 'Manage Parks' },
              { name: 'Manage Owners', val: 'Manage Owners' },
              { name: 'Manage Users', val: 'Manage Users' },
              { name: 'All Bookings', val: 'All Bookings' }
            ].map((item, idx) => (
              <label key={idx} htmlFor={`tab-${idx}`} className={(sel === item.val ? 'bg-blue-900 text-blue-200 p-2 lg:p-3 border-[3px] rounded-xl font-extrabold w-full text-center flex justify-center text-xl lg:text-2xl border-blue-900 cursor-pointer shrink-0 shadow-lg' : 'text-blue-900 p-2 lg:p-3 bg-blue-200 border-[3px] border-blue-300 rounded-xl font-extrabold w-full text-center hover:bg-blue-900 hover:border-blue-900 hover:text-blue-200 transition-all duration-400 text-xl lg:text-2xl flex justify-center cursor-pointer shrink-0')} style={{ fontFamily: 'titlef' }}>
                {item.name}
                <input type="radio" name="panel" className='hidden' id={`tab-${idx}`} value={item.val} onChange={(e) => setSel(e.target.value)} />
              </label>
            ))}

            <div className='text-blue-900 w-12 shrink-0 overflow-hidden h-12 mt-auto font-extrabold hover:w-44 transition-all duration-500 cursor-pointer text-2xl flex items-center rounded-full hover:bg-white/50' style={{ fontFamily: 'titlef' }} onClick={() => { sessionStorage.removeItem('admin'); navigate('/login', { replace: true }); }}>
              <div className='flex items-center gap-3 whitespace-nowrap pl-[3px]'>
                <LogOut color="#1C398E" className='p-2 bg-white rounded-full shadow-md' strokeWidth={3} size={42} />
                <span>Log Out</span>
              </div>
            </div>

          </div>

          {/* Main Content Viewer */}
          <div ref={right} className="rightpanel flex-1 min-w-0 h-full rounded-l-2xl flex-col flex p-[1vw]">
            <div className='border-b-2 text-4xl border-dotted p-[0.5vw] font-[mouldy] tracking-wider text-amber-400 text-center mb-[2vh] flex items-center justify-center relative' >
              <div className="absolute left-0">
                {sidepnl ? <PanelLeftClose className='text-amber-600 cursor-pointer hover:scale-110 transition-transform' size={35} onClick={panelmover} /> : <PanelLeftOpen className='text-amber-600 cursor-pointer hover:scale-110 transition-transform' size={35} onClick={panelmover} />}
              </div>
              {sel}
            </div>

            {/* Dynamic Render based on Selection */}
            {sel === "Overview" && <DashboardAdmin adminData={adminData} />}
            {sel === "Manage Admins" && <ManageAdmins />}
            {sel === "Park Approvals" && <AdminApprovals approvals={approvals} setApprovals={setApprovals} />}
            {sel === "Manage Parks" && <AdminParks parks={adminData.parks} />}
            {sel === "Manage Owners" && <AdminOwners owners={adminData.owners} />}
            {sel === "Manage Users" && <AdminUsers users={adminData.users} />}
            {sel === "All Bookings" && <AdminBookings bookings={adminData.bookings} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
