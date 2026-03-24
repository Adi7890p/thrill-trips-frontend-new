import React from 'react';

const OwnerNotifications = ({ notifications }) => {
    return (
        <div className='bg-[linear-gradient(135deg,#3d3088,#4a52d9)] w-full h-full p-[2vw] rounded-2xl overflow-y-auto scrollbarhider shadow-xl'>
            <div className="flex justify-between items-center mb-[3vh]">
                <h2 className="text-[1.8vw] font-bold text-white border-b-2 border-amber-300 pb-1">Notifications</h2>
                <div className="bg-amber-500/20 text-amber-200 border border-amber-500 font-bold px-[1vw] py-[0.5vh] rounded-lg text-[1vw]">Unread: {notifications.length}</div>
            </div>

            {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-20 text-white opacity-60">
                    <img src="/carnival-tent.png" alt="" className="w-[8vw] mb-4 opacity-50 grayscale" />
                    <p className="text-[1.2vw]">You're all caught up! No recent admin actions.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-[2vh]">
                    {notifications.map((notif, index) => (
                        <div key={notif.id || index} className={`flex items-start justify-between border-l-4 ${notif.park.approved === 'Approved' ? 'border-green-500  bg-green-500/20' : 'border-red-500 '} p-[1.5vw] rounded-xl hover:bg-white/5 transition-colors shadow-md`}>
                            <div className="flex gap-[1vw] items-center">
                                <div className="flex flex-col">
                                    <h3 className="text-white font-[gilroy] font-bold text-[1.2vw] tracking-wider">{notif.title}</h3>
                                    <p className="text-amber-100/80 text-[0.9vw] mt-1">{notif.message}</p>
                                </div>
                            </div>
                            <span className="text-white/50 text-[0.8vw] font-bold px-3 py-1 bg-black/20 rounded-lg">{new Date(notif.time).toLocaleString()}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default OwnerNotifications;
