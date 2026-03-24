import React, { useState } from 'react'
import Header from '../components/Header'
import {
    Goal, Telescope, TicketCheck, ShieldCheck,
    MapPinHouse, TicketPlus, Users, Globe,
    Zap, Heart, Trophy, ArrowRight, ChevronDown
} from 'lucide-react'
import Transition from '../components/Transition'

/* ── Google Fonts injected once ── */
const FontLink = () => (
    <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;800&family=Barlow+Condensed:wght@700;900&display=swap"
        rel="stylesheet"
    />
)

/* ── tiny keyframe block (only animations Tailwind can't do) ── */
const Keyframes = () => (
    <style>{`
    @keyframes gridScroll { to { background-position: 60px 60px; } }
    @keyframes glowPulse  { 0%,100%{transform:scale(1);opacity:.8} 50%{transform:scale(1.15);opacity:1} }
    @keyframes blinkDot   { 0%,100%{opacity:1} 50%{opacity:0} }
    @keyframes scrollBounce{ 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
    .animate-grid    { animation: gridScroll 20s linear infinite; }
    .animate-glow-a  { animation: glowPulse 6s ease-in-out infinite; }
    .animate-glow-b  { animation: glowPulse 8s ease-in-out infinite reverse; }
    .animate-blink   { animation: blinkDot 1.5s infinite; }
    .animate-bounce-y{ animation: scrollBounce 2s ease-in-out infinite; }
    .font-bebas      { font-family: 'Bebas Neue', sans-serif; }
    .font-barlow     { font-family: 'Barlow', sans-serif; }
    .font-barlow-cond{ font-family: 'Barlow Condensed', sans-serif; }
  `}</style>
)

/* ══════════════ DATA ══════════════ */
const stats = [
    { num: '20+', label: 'Parks Worldwide' },
    { num: '25+', label: 'Happy Adventurers' },
    { num: '10', label: 'Countries Covered' },
]

const offers = [
    { icon: <TicketCheck size={28} />, title: 'Easy Park Booking', body: 'Browse, compare, and book tickets for hundreds of parks in taps — no queues, no stress.' },
    { icon: <ShieldCheck size={28} />, title: 'Secure Payments', body: 'Bank-grade encryption on every transaction. Pay via UPI, cards, net banking, or wallets.' },
    { icon: <MapPinHouse size={28} />, title: 'Multi-City Trips', body: 'Plan park-hopping itineraries across multiple cities. We handle logistics; you pack excitement.' },
    { icon: <TicketPlus size={28} />, title: 'Exclusive Add-Ons', body: 'Meal combos, express entry, cabanas, locker passes, photo packages — all in one place.' },
    { icon: <Globe size={28} />, title: 'Global Park Network', body: 'Disneyland Paris to Ferrari World, Wonderla to Universal Studios — curated worldwide.' },
    { icon: <Zap size={28} />, title: 'Instant Confirmation', body: 'E-tickets delivered instantly. Scan and enter — your adventure starts the moment you book.' },
    { icon: <Heart size={28} />, title: 'Curated Experiences', body: 'Our experts handpick the best rides, shows & hidden gems so you never miss a moment.' },
    { icon: <Trophy size={28} />, title: 'Loyalty Rewards', body: 'Earn ThrillPoints on every booking. Redeem for discounts, free passes and VIP upgrades.' },
]


const parks = [
    'Disneyland Paris', 'Universal Studios', 'Ferrari World', 'Wonderla Bangalore',
    'Imagicaa Mumbai', 'Walt Disney World', 'Alton Towers', 'Europa-Park',
    'Six Flags', 'Busch Gardens', 'Legoland', 'Ocean Park HK', 'PortAventura', 'Gardaland', 'Adlabs Aquamagica',
]

const values = [
    { num: '01', title: 'Thrill First', body: "Every decision amplifies your adventure. If it adds excitement, we're in." },
    { num: '02', title: 'Radical Transparency', body: 'Honest reviews, real wait times, accurate pricing. We never hide the small print.' },
    { num: '03', title: 'Accessibility', body: 'Adventure belongs to everyone. We partner only with parks that offer inclusive facilities.' },
    { num: '04', title: 'Sustainability', body: 'We feature parks committed to eco-friendly practices and wildlife conservation.' },
    { num: '05', title: 'Innovation', body: 'AR maps, AI trip planners, real-time crowd data — we keep pushing what\'s possible.' },
    { num: '06', title: 'Community', body: 'A global tribe of thrill-seekers sharing tips, reviews, and lasting memories.' },
]

const timeline = [
    { year: '2025 jan', title: 'The Idea Sparks', desc: 'Two friends, one terrible booking experience, and a vision born from frustration.' },
    { year: '2025 apr', title: 'Beta Launch', desc: 'First 10 users book across 8 Indian parks.' },
    { year: '2025 nov', title: 'Going Global', desc: 'Expanded to 4+ international parks across 3 countries.' },
    { year: '2026 jan', title: 'Today', desc: '20+ parks, 25+ adventurers, and still accelerating.' },
]

const seedParks = ['Imagicaa', 'Wonderla', 'Disney Land', 'Essel World']

export default function About() {


    const [out, setOut] = useState(false);
    const [mpath, setMpath] = useState("");
    const routeHandler = (path, e = null) => {
        if (e) { e.preventDefault(); }
        setMpath(path);
        setOut(true);
    }
    return (
        <>
            <FontLink />
            <Keyframes />

            <div className="font-barlow bg-[#03192E] text-white overflow-x-hidden">
                <Header />

                <section className="relative min-h-screen flex items-end overflow-hidden">

                    <div className="absolute inset-0 bg-linear-to-br from-[#03192E] via-[#05284C] to-[#0A4F8F]" />

                    {/* animated grid */}
                    <div
                        className="absolute inset-0 animate-grid"
                        style={{
                            backgroundImage:
                                'linear-gradient(rgba(30,144,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(30,144,255,.08) 1px,transparent 1px)',
                            backgroundSize: '60px 60px',
                        }}
                    />

                    {/* glows */}
                    <div className="animate-glow-a absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full bg-amber-500/20 blur-[100px] pointer-events-none" />
                    <div className="animate-glow-b absolute bottom-0 -left-16 w-[400px] h-[400px] rounded-full bg-sky-500/20 blur-[100px] pointer-events-none" />

                    {/* content */}
                    <div className="relative z-10 px-[7vw] pb-[10vh] max-w-4xl">

                        {/* eyebrow */}
                        <div className="inline-flex items-center gap-2.5 border border-amber-400/40 bg-amber-500/10 backdrop-blur-sm text-amber-400 text-xs font-semibold tracking-[.22em] uppercase px-4 py-1.5 rounded-full mb-6">
                            <span className="animate-blink inline-block w-1.5 h-1.5 rounded-full bg-amber-400" />
                            Established 2025 jan · Adventure Awaits
                        </div>

                        {/* headline */}
                        <h1 className="font-bebas text-[clamp(4rem,11vw,9rem)] leading-[.92] tracking-wide text-white mb-7">
                            Where Every<br />Ride is an<br />
                            <span className="text-amber-400">Adventure.</span>
                        </h1>

                        <p className="font-barlow font-light text-[clamp(1rem,2vw,1.25rem)] leading-[1.75] text-white/70 max-w-xl mb-11">
                            ThrillTrips is your all-in-one gateway to the world's most exhilarating amusement
                            and adventure parks. We turn complex travel planning into a seamless, electrifying experience.
                        </p>

                        <div className="flex flex-wrap gap-4 items-center">
                            <button
                                onClick={() => routeHandler('/explore')}
                                className="font-barlow-cond inline-flex items-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-[#03192E] font-bold text-base tracking-widest uppercase px-8 py-3.5 rounded-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(245,158,11,.4)]"
                            >
                                Explore Parks <ArrowRight size={18} />
                            </button>

                        </div>
                    </div>

                    {/* scroll hint */}
                    <div className="absolute bottom-8 right-[7vw] z-10 flex flex-col items-center gap-2 text-[.72rem] tracking-[.18em] uppercase text-white/40">
                        Scroll
                        <ChevronDown size={16} className="animate-bounce-y" />
                    </div>
                </section>

                {/* ════════ STATS STRIP ════════ */}
                <div className="bg-amber-400 px-[7vw] py-7 flex flex-wrap justify-around gap-6">
                    {stats.map((s, i) => (
                        <div key={i} className="text-center">
                            <div className="font-bebas text-5xl leading-none text-[#03192E]">{s.num}</div>
                            <div className="mt-1 text-xs font-semibold tracking-[.15em] uppercase text-[#03192E]/70">{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* ════════ MISSION & VISION ════════ */}
                <section className="px-[7vw] py-24 bg-[#05284C]">
                    <p className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold tracking-[.22em] uppercase mb-4 before:block before:w-6 before:h-0.5 before:bg-amber-400">Who We Are</p>
                    <h2 className="font-bebas text-[clamp(2.8rem,6vw,5.5rem)] leading-none tracking-wide text-white mb-5">
                        Mission &amp; <span className="text-amber-400">Vision</span>
                    </h2>
                    <p className="font-light text-[1.05rem] leading-[1.85] text-white/65 max-w-2xl mb-14">
                        We exist to make the joy of theme parks accessible to every adventurer on the planet —
                        from a family in Ahmedabad planning their first Wonderla trip to a solo traveller chasing Disneyland magic in Paris.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { icon: <Goal size={52} strokeWidth={1.5} />, title: 'Our Mission', body: "To make adventure travel simple, affordable, and unforgettable by connecting thrill-seekers worldwide with the best parks, curated experiences, and seamless booking technology — so nothing stands between you and your next great ride." },
                            { icon: <Telescope size={52} strokeWidth={1.5} />, title: 'Our Vision', body: "To be the world's #1 digital destination for amusement and adventure park experiences — where every traveller, from local explorers to global adventurers, finds their perfect thrill with confidence and pure excitement." },
                        ].map((card, i) => (
                            <div
                                key={i}
                                className="relative overflow-hidden rounded-2xl p-12 border border-white/8 bg-linear-to-br from-white/6 to-white/2 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(0,0,0,.4)]"
                            >
                                <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-amber-400/10 blur-2xl" />
                                <div className="text-amber-400 mb-6">{card.icon}</div>
                                <h3 className="font-bebas text-3xl tracking-widest text-white mb-3">{card.title}</h3>
                                <p className="font-light text-[1rem] leading-[1.8] text-white/65">{card.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ════════ STORY ════════ */}
                <section className="px-[7vw] py-24">
                    <p className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold tracking-[.22em] uppercase mb-4 before:block before:w-6 before:h-0.5 before:bg-amber-400">How We Started</p>
                    <h2 className="font-bebas text-[clamp(2.8rem,6vw,5.5rem)] leading-none tracking-wide text-white mb-14">
                        Our <span className="text-amber-400">Story</span>
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        {/* text */}
                        <div>
                            <p className="font-light text-[1.05rem] leading-[1.9] text-white/65 mb-5">
                                ThrillTrips was born from a shared frustration. Two college friends — Aditya and Neel —
                                spent hours trying to plan a trip to Imagicaa, only to find fragmented websites, hidden
                                charges, and zero park insights. They knew there had to be a better way.
                            </p>
                            <blockquote className="font-barlow-cond text-[1.45rem] font-bold leading-snug text-amber-400 border-l-[3px] border-amber-400 pl-5 my-8">
                                "We didn't want to just build a booking site.<br />
                                We wanted to build the adventure experience itself."
                            </blockquote>
                            <p className="font-light text-[1.05rem] leading-[1.9] text-white/65 mb-5">
                                What started as a weekend project in a college dorm has grown into a platform connecting
                                thrill-seekers across continents. Today, ThrillTrips partners with 20+ parks in 10 countries,
                                bringing honest information and seamless booking to adventurers everywhere.
                            </p>
                            <p className="font-light text-[1.05rem] leading-[1.9] text-white/65">
                                We believe the anticipation of a great ride is just as electric as the ride itself.
                                From the moment you land on ThrillTrips to the moment you step off the last roller
                                coaster, we're with you every step of the way.
                            </p>
                        </div>

                        {/* visual card */}
                        <div className="rounded-2xl p-7 bg-linear-to-br from-[#0A4F8F]/60 to-[#05284C]/80 border border-sky-500/20 backdrop-blur-md">
                            <p className="text-[.7rem] font-bold tracking-[.2em] uppercase text-amber-400 mb-4">Parks We Started With</p>
                            <div className="flex flex-wrap gap-2 mb-7">
                                {seedParks.map(p => (
                                    <span
                                        key={p}
                                        className="px-3.5 py-1.5 rounded-full text-[.82rem] font-semibold bg-sky-500/15 border border-sky-500/30 text-white/85 hover:bg-amber-400 hover:border-amber-400 hover:text-[#03192E] transition-all duration-200 cursor-default"
                                    >{p}</span>
                                ))}
                            </div>

                            <div className="border-t border-white/10 pt-7 space-y-5">
                                {timeline.map((t, i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <div className="shrink-0 w-20 h-10 rounded-full border-2 border-amber-400 bg-amber-400/15 flex items-center justify-center font-bebas text-[.85rem] text-amber-400">
                                            {t.year}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-[.95rem] text-white">{t.title}</p>
                                            <p className="text-[.82rem] font-light text-white/50">{t.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ════════ WHAT WE OFFER ════════ */}
                <section className="px-[7vw] py-24 bg-[#05284C]">
                    <p className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold tracking-[.22em] uppercase mb-4 before:block before:w-6 before:h-0.5 before:bg-amber-400">What We Do</p>
                    <h2 className="font-bebas text-[clamp(2.8rem,6vw,5.5rem)] leading-none tracking-wide text-white mb-5">
                        What We <span className="text-amber-400">Offer</span>
                    </h2>
                    <p className="font-light text-[1.05rem] leading-[1.85] text-white/65 max-w-2xl mb-14">
                        Everything you need for a world-class park experience — from first click to final ride.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {offers.map((o, i) => (
                            <div
                                key={i}
                                className="group relative overflow-hidden rounded-2xl p-9 border border-white/7 bg-white/4 transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-400/35 hover:shadow-[0_20px_50px_rgba(0,0,0,.35)] cursor-default"
                            >
                                {/* hover overlay */}
                                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-amber-400/12 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="relative z-10">
                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-amber-400/15 text-amber-400 mb-5 transition-all duration-300 group-hover:bg-amber-400 group-hover:text-[#03192E]">
                                        {o.icon}
                                    </div>
                                    <h4 className="font-barlow-cond font-bold text-lg tracking-wide uppercase text-white mb-3">{o.title}</h4>
                                    <p className="font-light text-[.9rem] leading-[1.7] text-white/55">{o.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ════════ PARKS WE COVER ════════ */}
                <section className="px-[7vw] py-24">
                    <p className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold tracking-[.22em] uppercase mb-4 before:block before:w-6 before:h-0.5 before:bg-amber-400">Our Network</p>
                    <h2 className="font-bebas text-[clamp(2.8rem,6vw,5.5rem)] leading-none tracking-wide text-white mb-5">
                        Parks We <span className="text-amber-400">Cover</span>
                    </h2>
                    <p className="font-light text-[1.05rem] leading-[1.85] text-white/65 max-w-2xl mb-12">
                        From iconic global landmarks to hidden regional gems — if it has thrills, we've got it.
                    </p>

                    <div className="flex flex-wrap gap-3">
                        {parks.map((p, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/12 bg-white/4 text-white/70 text-[.88rem] font-semibold hover:bg-amber-400 hover:border-amber-400 hover:text-[#03192E] transition-all duration-200 cursor-default group"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:bg-[#03192E] transition-colors" />
                                {p}
                            </div>
                        ))}
                    </div>
                </section>

                {/* ════════ VALUES ════════ */}
                <section className="px-[7vw] py-24 bg-[#05284C]">
                    <p className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold tracking-[.22em] uppercase mb-4 before:block before:w-6 before:h-0.5 before:bg-amber-400">What Drives Us</p>
                    <h2 className="font-bebas text-[clamp(2.8rem,6vw,5.5rem)] leading-none tracking-wide text-white mb-14">
                        Our <span className="text-amber-400">Values</span>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5 rounded-2xl overflow-hidden">
                        {values.map((v, i) => (
                            <div
                                key={i}
                                className="bg-white/4 hover:bg-amber-400/8 border border-white/6 px-9 py-11 transition-colors duration-300 cursor-default"
                            >
                                <div className="font-bebas text-6xl text-amber-400/15 leading-none mb-2">{v.num}</div>
                                <h4 className="font-barlow-cond font-bold text-lg tracking-widest uppercase text-white mb-2.5">{v.title}</h4>
                                <p className="font-light text-[.88rem] leading-[1.7] text-white/50">{v.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ════════ FOUNDERS ════════ */}
                <section className="px-[7vw] py-24">
                    <p className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold tracking-[.22em] uppercase mb-4 before:block before:w-6 before:h-0.5 before:bg-amber-400">The People</p>
                    <h2 className="font-bebas text-[clamp(2.8rem,6vw,5.5rem)] leading-none tracking-wide text-white mb-4">
                        Meet the <span className="text-amber-400">Founders</span>
                    </h2>
                    <p className="font-light text-[1.05rem] text-white/65 mb-14">Built by adventurers, for adventurers.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                initials: 'AK', name: 'Aditya Kuril', role: 'Co-Founder & CEO',
                                bio: "A design thinker and product obsessive who believes every interaction with ThrillTrips should feel like the first drop on a rollercoaster — thrilling, effortless, and unforgettable.",
                                avatarClass: 'bg-gradient-to-br from-amber-400 to-amber-300 text-[#03192E]'
                            },
                            {
                                initials: 'NK', name: 'Neel Kanani', role: 'Co-Founder & CTO',
                                bio: "The engineering mind behind ThrillTrips' seamless platform. Neel turns complex booking logic into elegant code, ensuring your path from discovery to entry gate is always smooth.",
                                avatarClass: 'bg-gradient-to-br from-amber-400 to-amber-300 text-[#03192E]'
                            },
                            {
                                initials: null, name: 'Our Team Is Growing', role: "We're Currently Recruiting",
                                bio: "Passionate about travel, tech, or storytelling? We're always looking for bold thinkers to help us redefine adventure travel..",
                                avatarClass: 'bg-sky-500/20 text-sky-400'
                            },
                        ].map((person, i) => (
                            <div
                                key={i}
                                className="rounded-2xl p-10 text-center bg-linear-to-br from-sky-900/25 to-[#05284C]/40 border border-sky-500/15 transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-400/35"
                            >
                                <div className={`h-22 w-[88px] rounded-full mx-auto mb-5 flex items-center justify-center font-bebas text-3xl shadow-[0_8px_24px_rgba(245,158,11,.35)] ${person.avatarClass}`}>
                                    {person.initials ?? <Users size={32} />}
                                </div>
                                <h4 className="font-barlow-cond font-bold text-xl tracking-widest uppercase text-white mb-1.5">{person.name}</h4>
                                <p className="text-[.8rem] font-bold tracking-[.16em] uppercase text-amber-400 mb-4">{person.role}</p>
                                <p className="font-light text-[.88rem] leading-[1.7] text-white/50">{person.bio}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ════════ CTA ════════ */}
                <section className="relative overflow-hidden px-[7vw] py-24 text-center bg-linear-to-br from-[#05284C] via-[#0A4F8F] to-[#05284C]">
                    {/* noise overlay */}
                    <div
                        className="absolute inset-0 opacity-30 pointer-events-none"
                        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")" }}
                    />

                    <div className="relative z-10">
                        <h2 className="font-bebas text-[clamp(3rem,7vw,6.5rem)] leading-none tracking-wide text-white mb-6">
                            Ready to Feel<br />the <span className="text-amber-400">Rush?</span>
                        </h2>
                        <p className="font-light text-[1.1rem] leading-[1.7] text-white/65 max-w-lg mx-auto mb-11">
                            Join 50,000+ adventurers who've already discovered their favourite parks through ThrillTrips.
                            Your next thrill is just one click away.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <button
                                onClick={() => routeHandler('/explore')}
                                className="font-barlow-cond inline-flex items-center gap-2.5 bg-amber-400 hover:bg-amber-300 text-[#03192E] font-bold text-base tracking-widest uppercase px-8 py-3.5 rounded-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(245,158,11,.4)]"
                            >
                                Start Exploring <ArrowRight size={18} />
                            </button>
                            <button
                                onClick={() => routeHandler('/login')}
                                className="font-barlow-cond inline-flex items-center gap-2 border border-white/25 hover:border-white/70 hover:bg-white/5 text-white/80 hover:text-white font-semibold text-base tracking-widest uppercase px-7 py-3.5 rounded-md transition-all duration-300"
                            >
                                Create Free Account
                            </button>
                        </div>
                    </div>
                </section>

                {/* ════════ FOOTER ════════ */}
                <footer className="bg-[#020E1A] border-t border-white/6 px-[7vw] py-7 flex flex-wrap items-center justify-between gap-3">
                    <span className="font-bebas text-2xl tracking-widest text-amber-400">ThrillTrips</span>
                    <p className="text-[.78rem] text-white/35 text-center">
                        © 2025 ThrillTrips. All rights reserved.<br />
                        Crafted with Love by <a className="text-amber-400 hover:underline"> Aditya Kuril</a> & <a className="text-amber-400 hover:underline">Neel Kanani</a>
                    </p>
                    <span className="text-[.78rem] text-white/35">Made in India · Thrills Worldwide</span>
                </footer>
            </div>
            <div className='relative w-full h-full bg-amber-50'>
                <Transition out={out} path={mpath} />
            </div>
        </>
    )
}