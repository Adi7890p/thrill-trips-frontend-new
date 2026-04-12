import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { X } from 'lucide-react';

const PaymentGateway = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const {
        amount = 999,
        title = "Thrill Trips Secure",
        accountNumber = "Not Provided",
        btnText = "Pay Securely",
        apiRoute = "",
        payload = null,
        successPath = "/"
    } = location.state || {};

    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('UPI');

    // Form states
    const [upiId, setUpiId] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');

    const handlePay = async () => {
        setLoading(true);
        setTimeout(async () => {
            try {
                if (apiRoute) {
                    const token = sessionStorage.getItem("token") || sessionStorage.getItem("user");
                    const submitPayload = payload || { token };
                    const res = await axios.post(`https://react.adityakuril.me${apiRoute}`, submitPayload);
                    if (!res.data.success && !res.data) {
                        alert('Error processing transaction: ' + res.data.message);
                        setLoading(false);
                        return;
                    }
                }
                if (successPath == "/user") {
                    alert("Payment Successful,Your Booking is Confirmed!")
                } else {
                    alert("Payment Successful,Now you can use our Revenue Statistics!")
                }
                navigate(successPath);
            } catch (error) {
                console.error(error);
                alert('Network error during transaction processing.');
            } finally {
                setLoading(false);
            }
        }, 1500);
    };

    const handleVerification = () => {
        if (activeTab === 'UPI') {
            if (upiId === 'true') {
                handlePay();
            } else {
                alert("wrong credentials");
                if (successPath == "/user") {
                    navigate('/booking');
                } else {
                    navigate('/owner-dashboard');
                }
            }
        } else if (activeTab === 'Cards') {
            if (cardNumber === 'true') {
                handlePay();
            } else {
                alert("wrong credentials");
                if (successPath == "/user") {
                    navigate('/booking');
                } else {
                    navigate('/owner-dashboard');
                }
            }
        } else {
            handlePay();
        }
    };

    return (
        <div className="w-screen min-h-screen bg-[#f0f4f8] flex items-center justify-center p-4">
            <div className="bg-white rounded-[24px] shadow-2xl flex max-w-[1100px] w-full overflow-hidden min-h-[600px] font-sans relative">

                {/* Left Sidebar */}
                <div className="w-[35%] bg-linear-to-b from-[#2ad686] to-[#0fac67] p-8 flex flex-col relative overflow-hidden md:flex">
                    <div className="w-full flex items-center gap-3 mb-8 relative z-10">
                        <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center overflow-hidden">
                            <img src="/dubai.png" alt="Logo" className="w-[85%] h-[85%] object-cover rounded-md" />
                        </div>
                        <div className="flex flex-col text-white">
                            <h2 className="font-extrabold text-xl mb-0 leading-tight tracking-tight">{title}</h2>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl w-full p-4 mb-4 shadow-sm relative z-10 text-left">
                        <p className="text-gray-500 font-bold text-[13px] mb-1">Price Summary</p>
                        <h1 className="text-[34px] font-black text-gray-900 leading-none">₹{Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</h1>
                    </div>

                    {accountNumber !== "Not Provided" && (
                        <div className="bg-white rounded-xl w-full p-4 mb-4 shadow-sm relative z-10 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs">🏦</span>
                                <span className="text-[13px] text-gray-600 font-bold">Paying to <span className="text-gray-900 font-extrabold">{accountNumber}</span></span>
                            </div>
                        </div>
                    )}

                    {loading && (
                        <div className="mt-8 bg-green-900/20 w-full rounded-2xl p-4 flex flex-col items-center justify-center z-10">
                            <span className="animate-spin text-3xl mb-2">💸</span>
                            <p className="text-white font-bold text-center tracking-widest">Processing Transaction...</p>
                        </div>
                    )}

                    <div className="absolute bottom-0 left-0 w-full h-[250px] opacity-30 pointer-events-none">
                        <div className="absolute bottom-4 left-4 w-16 h-24 bg-white/40 transform -rotate-12 rounded"></div>
                        <div className="absolute bottom-8 right-6 w-20 h-16 bg-white/40 transform rotate-12 rounded shadow-2xl"></div>
                        <div className="absolute -bottom-6 left-[30%] w-24 h-32 bg-white/50 rounded-lg shadow-[0_0_40px_rgba(255,255,255,0.4)]"></div>
                    </div>

                    <p className="absolute bottom-4 left-8 text-white font-extrabold flex items-center gap-1 text-[13px] z-10 tracking-wider">
                        Secured by <span className="italic font-black text-[15px]">ThrillTrips</span>
                    </p>
                </div>

                {/* Right Side Options */}
                <div className="w-full md:w-[65%] flex flex-col h-full bg-white relative">
                    <div className="h-[65px] border-b border-gray-100 flex items-center justify-between px-6 shrink-0 relative">
                        <h2 className="text-[17px] font-black text-gray-800 tracking-wide text-center absolute left-1/2 transform -translate-x-1/2">Payment Options</h2>
                        <div></div>
                        <button onClick={() => navigate(-1)} className="w-[30px] h-[30px] rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
                            <X size={20} strokeWidth={3} />
                        </button>
                    </div>

                    <div className="flex w-full h-[calc(100%-65px)]">
                        {/* Options Menu Sidebar */}
                        <div className="w-[38%] bg-[#f7f9fb] border-r border-gray-100 flex flex-col overflow-y-auto">
                            <div className="px-4 py-4 uppercase text-[#0fac67] font-extrabold text-[11px] tracking-wider">Recommended</div>

                            <div onClick={() => setActiveTab('UPI')} className={`flex flex-col justify-center px-4 py-[14px] cursor-pointer border-l-4 transition-all ${activeTab === 'UPI' ? 'bg-[#e5fbf0] border-[#0fac67]' : 'border-transparent hover:bg-gray-100'}`}>
                                <div className="flex justify-between w-full items-center">
                                    <span className={`font-extrabold text-[14px] ${activeTab === 'UPI' ? 'text-[#0fac67]' : 'text-gray-700'}`}>UPI</span>
                                </div>
                            </div>

                            <div onClick={() => setActiveTab('Cards')} className={`flex flex-col justify-center px-4 py-[14px] cursor-pointer border-l-4 transition-all ${activeTab === 'Cards' ? 'bg-[#e5fbf0] border-[#0fac67]' : 'border-transparent hover:bg-gray-100'}`}>
                                <div className="flex justify-between w-full items-center">
                                    <span className={`font-extrabold text-[14px] ${activeTab === 'Cards' ? 'text-[#0fac67]' : 'text-gray-700'}`}>Cards</span>
                                </div>
                            </div>

                        </div>

                        {/* Options Main Block */}
                        <div className="w-[62%] h-full flex flex-col p-6 overflow-y-auto">

                            {activeTab === 'UPI' && (
                                <div className="w-full flex-col flex fade-in">
                                    <h3 className="font-bold text-gray-700 text-[14px] mb-4 flex justify-between">
                                        Pay via UPI
                                    </h3>

                                    <div className="w-full flex flex-col gap-4">
                                        <p className="text-gray-500 text-sm">Enter your registered UPI ID to complete the payment.</p>
                                        <input
                                            type="text"
                                            value={upiId}
                                            onChange={(e) => setUpiId(e.target.value)}
                                            placeholder="Example: true"
                                            className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#0fac67] transition-colors font-bold text-gray-700 text-[15px]"
                                        />

                                        <button
                                            onClick={handleVerification}
                                            disabled={loading}
                                            className={`w-full py-3.5 rounded-xl text-white font-extrabold tracking-wider text-[15px] mt-4 shadow-[0_4px_15px_rgba(15,172,103,0.3)] ${loading ? 'bg-gray-400 cursor-wait' : 'bg-[#0fac67] hover:-translate-y-0.5 active:scale-[0.98] transition-all'}`}
                                        >
                                            {loading ? 'Processing...' : btnText}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'Cards' && (
                                <div className="w-full flex flex-col fade-in">
                                    <h3 className="font-bold text-gray-700 text-[14px] mb-4 border-b border-gray-200 pb-2">
                                        Pay using Credit / Debit Card
                                    </h3>

                                    <div className="w-full flex flex-col gap-4 mt-2">
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Card Number</label>
                                            <input
                                                type="text"
                                                value={cardNumber}
                                                maxLength={16}
                                                pattern='^[0-9]{16}$'
                                                title='Enter Valid Card Number'
                                                onChange={(e) => setCardNumber(e.target.value)}
                                                placeholder="Example: true"
                                                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#0fac67] transition-colors font-bold text-gray-700 text-[15px]"
                                            />
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex-1">
                                                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Expiry</label>
                                                <input
                                                    type="text"
                                                    value={expiry}
                                                    maxLength={5}
                                                    pattern='^(0[1-9]|1[0-2])\/([0-9]{2})$'
                                                    title='Enter Valid Expiry'
                                                    onChange={(e) => setExpiry(e.target.value)}
                                                    placeholder="MM/YY"
                                                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#0fac67] transition-colors font-bold text-gray-700 text-[15px]"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">CVV</label>
                                                <input
                                                    type="password"
                                                    value={cvv}
                                                    maxLength={3}
                                                    pattern='^[0-9]{3}$'
                                                    title='Enter Valid CVV'
                                                    onChange={(e) => setCvv(e.target.value)}
                                                    placeholder="123"
                                                    className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#0fac67] transition-colors font-bold text-gray-700 text-[15px]"
                                                />
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleVerification}
                                            disabled={loading}
                                            className={`w-full py-3.5 rounded-xl text-white font-extrabold tracking-wider text-[15px] mt-4 shadow-[0_4px_15px_rgba(15,172,103,0.3)] ${loading ? 'bg-gray-400 cursor-wait' : 'bg-[#0fac67] hover:-translate-y-0.5 active:scale-[0.98] transition-all'}`}
                                        >
                                            {loading ? 'Processing...' : btnText}
                                        </button>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PaymentGateway;

