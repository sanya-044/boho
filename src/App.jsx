 import React, { useEffect, useRef, useState } from 'react';

function ImageCarousel({ images, title, className, style }) {
  const imageList = Array.isArray(images) ? images : [images];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (imageList.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % imageList.length);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [imageList.length]);

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {imageList.map((img, idx) => (
        <img
          key={img}
          src={img}
          alt={`${title} - ${idx}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            idx === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        />
      ))}
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [activeGallery, setActiveGallery] = useState(null);
  const [guestCount, setGuestCount] = useState('Couple (2)');
  const [menuSlide, setMenuSlide] = useState(0);
  const [menuOffset, setMenuOffset] = useState(0);
  const menuTrackRef = useRef(null);
  const [boutiqueSlide, setBoutiqueSlide] = useState(0);
  const [boutiqueOffset, setBoutiqueOffset] = useState(0);
  const boutiqueTrackRef = useRef(null);
  const [bookingData, setBookingData] = useState({ name: '', date: '2026-09-28', requests: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const menuItems = [
    { title: "Artisan Pour-Over", category: "beverages", price: "₹350", image: ["/coffee.png", "/bev.png", "/bevv.png"], desc: "Single-origin beans hand-dripped to absolute clarity." },
    { title: "Truffle Mushroom Pasta", category: "food", price: "₹680", image: ["/junk.png", "/foodie.png", "/imm3.png"], desc: "Handmade fettuccine with black truffle essence and aged parmesan." },
    { title: "Boho Harvest Salad", category: "food", price: "₹520", image: ["/foodie.png", "/imm3.png", "/junk.png"], desc: "Organic greens, toasted heirloom seeds, and citrus vinaigrette." },
    { title: "Ceremonial Uji Matcha", category: "beverages", price: "₹390", image: ["/bev.png", "/bevv.png", "/coffee.png"], desc: "Stone-ground Japanese green tea whisked with oat milk." },
    { title: "Saffron Coconut Rice", category: "food", price: "₹590", image: ["/imm3.png", "/junk.png", "/foodie.png"], desc: "Aromatic grains simmered in rich coconut broth with delicate spices." },
    { title: "Cold Brew Tonic", category: "beverages", price: "₹340", image: ["/bevv.png", "/coffee.png", "/bev.png"], desc: "18-hour steep over artisanal tonic water and citrus peel." }
  ];

  const fashionLookbook = [
    { title: "Twilight Indigo Kaftan", subtitle: "Hand-blocked organic cotton", image: "/bev.png" },
    { title: "Artisan Cream Linen", subtitle: "Sustainable neutral tailoring", image: "/bevv.png" },
    { title: "Midnight Silhouette Dress", subtitle: "Crafted for unhurried evenings", image: "/fash.png" }
  ];

  const filteredMenu = activeTab === 'all' ? menuItems : menuItems.filter(item => item.category === activeTab);

  useEffect(() => {
    setMenuSlide(0);
  }, [activeTab]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setMenuSlide((slide) => slide + 1);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [activeTab]);

  useEffect(() => {
    const track = menuTrackRef.current;
    if (!track || filteredMenu.length === 0) return undefined;

    const firstCard = track.children[0];
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    setMenuOffset((firstCard?.getBoundingClientRect().width || 0) + gap);

    if (menuSlide >= filteredMenu.length) {
      const resetTimer = window.setTimeout(() => {
        setMenuSlide(0);
      }, 750);
      return () => window.clearTimeout(resetTimer);
    }
    return undefined;
  }, [menuSlide, filteredMenu.length]);

  useEffect(() => {
    const timer = window.setInterval(() => setBoutiqueSlide((slide) => slide + 1), 3500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const track = boutiqueTrackRef.current;
    if (!track) return undefined;

    const firstCard = track.children[0];
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    setBoutiqueOffset((firstCard?.getBoundingClientRect().width || 0) + gap);

    if (boutiqueSlide >= fashionLookbook.length) {
      const resetTimer = window.setTimeout(() => setBoutiqueSlide(0), 750);
      return () => window.clearTimeout(resetTimer);
    }
    return undefined;
  }, [boutiqueSlide]);

  return (
    <div className="min-h-screen bg-[#f5efe6] text-[#2c3848] font-sans selection:bg-[#38bdf8] selection:text-[#1e293b]">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f5efe6]/95 backdrop-blur-md border-b border-[#e2d8c8] px-8 md:px-16 py-5 flex justify-between items-center shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-[#38bdf8] flex items-center justify-center text-[#1e293b] font-serif font-bold text-sm shadow-sm">
            BT
          </div>
          <span className="font-serif text-lg tracking-[0.2em] font-medium text-[#1e293b]">
            BOHO TRUNKK
          </span>
        </div>
        
        <div className="hidden md:flex space-x-10 text-[11px] font-medium uppercase tracking-[0.25em] text-[#475569]">
          <a href="#hero" className="hover:text-[#0284c7] transition">Sanctuary</a>
          <a href="#specials" className="hover:text-[#0284c7] transition">Culinary</a>
          <a href="#fashion" className="hover:text-[#0284c7] transition">Atelier & Art</a>
          <a href="#booking" className="hover:text-[#0284c7] transition">Reserve</a>
        </div>

        <a href="#booking" className="bg-[#38bdf8] hover:bg-[#0ea5e9] text-[#1e293b] text-[11px] font-semibold uppercase tracking-[0.2em] px-6 py-2.5 rounded-full transition duration-300 shadow-sm">
          Book Table
        </a>
      </nav>

      {/* HERO SECTION */}
      <section id="hero" className="relative pt-44 pb-28 px-8 md:px-16 min-h-[92vh] flex flex-col justify-center items-center overflow-hidden bg-[#f5efe6]">
        <div className="absolute inset-0 z-0">
          <img 
            src="/imm1.png" 
            alt="Cafe Interior" 
            className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e293b]/85 via-[#1e293b]/40 to-[#1e293b]/70"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto w-full grid grid-cols-1 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1e293b]/80 border border-[#38bdf8]/40 text-[#38bdf8] text-[11px] uppercase tracking-widest backdrop-blur-sm shadow-sm">
              <span>✦ Tollygunge, Kolkata • Private Sanctuary</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-normal leading-[1.1] tracking-tight text-white drop-shadow-md">
              An aesthetic intersection of <span className="italic font-light text-[#38bdf8]">coffee</span>, <span className="italic font-light text-[#fde047]">cuisine</span>, and art.
            </h1>
            <p className="text-[#e2e8f0] text-sm md:text-base font-light leading-relaxed max-w-xl drop-shadow">
              Immerse yourself in our curated environment where single-origin roasts meet sustainable artisan fashion. Claim an exclusive 20% privilege on your first complete experience.
            </p>
            
            <div className="flex items-center gap-8 pt-4 text-xs text-[#cbd5e1] border-t border-white/20">
              <div>📍 L 38, Indranipark</div>
              <div>⏰ 11:00 AM — 10:30 PM</div>
            </div>
          </div>
        </div>
      </section>

      {/* CULINARY SPECIALS */}
      <section id="specials" className="py-28 px-8 md:px-16 bg-[#f5efe6] border-t border-[#e2d8c8]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <span className="text-[#0284c7] text-[10px] font-medium uppercase tracking-[0.3em] mb-2 block">Gastronomic Curations</span>
              <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#1e293b]">Our Culinary Offerings</h2>
            </div>
            
            <div className="flex gap-1 bg-[#ede4d2] p-1 rounded-xl border border-[#d6ccb5]">
              {['all', 'food', 'beverages'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-[11px] uppercase tracking-wider transition-all ${
                    activeTab === tab 
                    ? 'bg-[#38bdf8] text-[#1e293b] font-semibold shadow-xs' 
                    : 'text-[#64748b] hover:text-[#1e293b]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-hidden">
            <div
              ref={menuTrackRef}
              onTransitionEnd={() => {
                if (menuSlide >= filteredMenu.length) {
                  const track = menuTrackRef.current;
                  if (track) {
                    track.style.transition = 'none';
                    track.style.transform = 'translateX(0)';
                    window.requestAnimationFrame(() => {
                      if (track) track.style.transition = '';
                    });
                  }
                  setMenuSlide(0);
                }
              }}
              className="flex gap-8 transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${menuSlide * menuOffset}px)` }}
            >
              {[...filteredMenu, ...filteredMenu].map((item, idx) => (
                <div key={`${item.title}-${idx}`} aria-hidden={idx >= filteredMenu.length} className="min-w-[320px] md:min-w-[360px] flex-1 group bg-[#ede4d2] border border-[#d6ccb5] rounded-2xl overflow-hidden hover:border-[#38bdf8] transition duration-500 flex flex-col shadow-xs">
                  <div className="h-64 overflow-hidden relative">
                    <ImageCarousel
                      images={item.image}
                      title={item.title}
                      className="w-full h-full filter brightness-[0.95] group-hover:scale-105 transition duration-700"
                    />
                    <div className="absolute top-4 right-4 z-20 bg-[#38bdf8] text-[#1e293b] font-semibold px-3 py-1 rounded-full text-xs shadow-sm">
                      {item.price}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <h4 className="font-serif text-lg font-medium mb-2 text-[#1e293b] group-hover:text-[#0284c7] transition">{item.title}</h4>
                      <p className="text-xs text-[#5c6878] font-light leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="pt-4 mt-6 border-t border-[#dfd5c2] flex items-center justify-between text-[11px] text-[#0284c7] tracking-widest uppercase font-semibold">
                      <span>In Season</span>
                      <span>→</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <button type="button" onClick={() => setActiveGallery('food')} className="rounded-full border border-[#0284c7] px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0284c7] transition hover:bg-[#38bdf8] hover:text-[#1e293b]">
              View More Food
            </button>
          </div>
        </div>
      </section>

      {/* FASHION & ART ATELIER */}
      <section id="fashion" className="py-28 px-8 md:px-16 bg-[#ede4d2] border-t border-[#d6ccb5]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[#0284c7] text-[10px] font-medium uppercase tracking-[0.3em] mb-2 block">Sustainable Atelier</span>
            <h2 className="font-serif text-3xl md:text-4xl font-normal mb-3 text-[#1e293b]">More Than Just a Café</h2>
            <p className="text-[#5c6878] text-xs font-light leading-relaxed">Discover independent apparel and handcrafted art pieces integrated directly into our physical space.</p>
          </div>

          <div className="overflow-hidden">
            <div
              ref={boutiqueTrackRef}
              onTransitionEnd={() => {
                if (boutiqueSlide >= fashionLookbook.length) {
                  const track = boutiqueTrackRef.current;
                  if (track) {
                    track.style.transition = 'none';
                    track.style.transform = 'translateX(0)';
                    window.requestAnimationFrame(() => {
                      if (track) track.style.transition = '';
                    });
                  }
                  setBoutiqueSlide(0);
                }
              }}
              className="flex gap-8 transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${boutiqueSlide * boutiqueOffset}px)` }}
            >
              {[...fashionLookbook, ...fashionLookbook].map((look, idx) => (
                <div key={`${look.title}-${idx}`} aria-hidden={idx >= fashionLookbook.length} className="min-w-[320px] md:min-w-[360px] flex-1 group relative h-[450px] overflow-hidden rounded-2xl border border-[#c9bd9f] shadow-xs">
                  <ImageCarousel
                    images={look.image}
                    title={look.title}
                    className="w-full h-full filter brightness-[0.9] group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#1e293b]/90 via-transparent to-transparent flex flex-col justify-end p-8 pointer-events-none">
                    <span className="text-[#38bdf8] text-[10px] uppercase tracking-[0.2em] mb-1 font-semibold">{look.subtitle}</span>
                    <h4 className="font-serif text-xl font-medium text-white">{look.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <button type="button" onClick={() => setActiveGallery('boutique')} className="rounded-full border border-[#0284c7] px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0284c7] transition hover:bg-[#38bdf8] hover:text-[#1e293b]">
              View More Boutique
            </button>
          </div>
        </div>
      </section>

      {/* BOOKING SECTION */}
      <section id="booking" className="py-24 px-8 md:px-16 bg-[#f5efe6] border-t border-[#e2d8c8]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Café Info */}
          <div className="space-y-6 bg-[#ede4d2] border border-[#d6ccb5] p-8 md:p-10 rounded-3xl shadow-md text-[#1e293b]">
            <div>
              <span className="text-[#0284c7] text-[10px] font-medium uppercase tracking-[0.3em] mb-2 block">Connect With Us</span>
              <h3 className="font-serif text-2xl md:text-3xl font-normal text-[#1e293b]">Cafe Boho Trunkk</h3>
            </div>
            
            <p className="text-xs md:text-sm text-[#5c6878] font-light leading-relaxed">
              Experience the perfect blend of coffee, culinary arts, and sustainable fashion in an unhurried, beautiful environment.
            </p>

            <div className="space-y-4 pt-2 text-xs text-[#475569]">
              <div className="flex items-start gap-3">
                <span className="font-semibold text-[#1e293b] uppercase tracking-wider min-w-[70px]">Website:</span>
                <a href="https://bohotrunk.com/" target="_blank" rel="noreferrer" className="text-[#0284c7] hover:underline break-all">
                  https://bohotrunk.com/
                </a>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-semibold text-[#1e293b] uppercase tracking-wider min-w-[70px]">Insta:</span>
                <a href="https://www.instagram.com/bohotrunkk" target="_blank" rel="noreferrer" className="text-[#0284c7] hover:underline break-all">
                  instagram.com/bohotrunkk
                </a>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-semibold text-[#1e293b] uppercase tracking-wider min-w-[70px]">Ph. No.:</span>
                <a href="tel:+917003182337" className="text-[#1e293b] font-medium hover:text-[#0284c7]">
                  +91 70031 82337
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Table Reservation Form */}
          <div className="w-full bg-[#ede4d2] border border-[#d6ccb5] p-8 rounded-3xl shadow-xl relative text-[#1e293b]">
            <div className="mb-6">
              <h3 className="font-serif text-xl font-medium tracking-wide mb-1 text-[#1e293b]">Reserve a Table</h3>
              <p className="text-[11px] text-[#5c6878]">20% introductory discount automatically applied.</p>
            </div>

            {isSubmitted ? (
              <div className="bg-[#dbeafe] border border-[#38bdf8] text-[#1e40af] p-6 rounded-2xl text-center space-y-2">
                <p className="text-xs font-medium uppercase tracking-wider">Table Secured ✓</p>
                <p className="text-[11px] text-[#475569]">Your reservation has been logged. We look forward to hosting you.</p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#5c6878] mb-1.5">Guest Name</label>
                  <input 
                    type="text" required
                    placeholder="Sanya Chauhan"
                    value={bookingData.name}
                    onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                    className="w-full bg-[#f5efe6] border border-[#d6ccb5] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#38bdf8] transition text-[#1e293b]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#5c6878] mb-1.5">Party Scale</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Couple (2)', 'Family (4)', 'Friends (6)'].map((type) => (
                      <button
                        type="button" key={type}
                        onClick={() => setGuestCount(type)}
                        className={`py-2 px-1 text-[11px] rounded-lg border transition-all ${
                          guestCount === type 
                          ? 'bg-[#38bdf8] text-[#1e293b] border-[#38bdf8] font-semibold shadow-xs' 
                          : 'bg-[#f5efe6] text-[#475569] border-[#d6ccb5] hover:border-[#94a3b8]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#5c6878] mb-1.5">Date</label>
                  <input 
                    type="date" 
                    value={bookingData.date}
                    onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                    className="w-full bg-[#f5efe6] border border-[#d6ccb5] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#38bdf8] transition text-[#475569]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#5c6878] mb-1.5">Preferences / Occasion</label>
                  <input 
                    type="text" 
                    placeholder="Quiet corner, acoustic seating..."
                    value={bookingData.requests}
                    onChange={(e) => setBookingData({...bookingData, requests: e.target.value})}
                    className="w-full bg-[#f5efe6] border border-[#d6ccb5] rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#38bdf8] transition text-[#1e293b]"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#38bdf8] hover:bg-[#0ea5e9] text-[#1e293b] text-[11px] font-semibold uppercase tracking-[0.2em] py-3.5 rounded-xl transition duration-300 shadow-md mt-2"
                >
                  Confirm Reservation
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* FULL GALLERY OVERLAY MODAL */}
      {activeGallery && (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-[#f5efe6]" role="dialog" aria-modal="true" aria-label={`${activeGallery} gallery`}>
          <div className="min-h-full px-6 py-12 md:px-12">
            <div className="mx-auto max-w-6xl">
              <div className="mb-10 flex items-center justify-between gap-4">
                <div>
                  <span className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-[#0284c7]">Boho Trunkk Gallery</span>
                  <h2 className="font-serif text-3xl text-[#1e293b] md:text-4xl">
                    {activeGallery === 'food' ? 'Food & Drinks' : 'Boutique Collection'}
                  </h2>
                </div>
                <button type="button" onClick={() => setActiveGallery(null)} className="rounded-full bg-[#38bdf8] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-[#1e293b] transition hover:bg-[#0ea5e9]">
                  Back to page
                </button>
              </div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {(activeGallery === 'food'
                  ? menuItems.map((item) => ({ title: item.title, subtitle: item.desc, image: Array.isArray(item.image) ? item.image[0] : item.image }))
                  : fashionLookbook.map((look) => ({ title: look.title, subtitle: look.subtitle, image: look.image }))
                ).map((item) => (
                  <article key={item.title} className="group overflow-hidden rounded-2xl border border-[#d6ccb5] bg-[#ede4d2] shadow-sm transition-all duration-500 hover:shadow-xl hover:border-[#38bdf8]">
                    <div className="h-64 w-full overflow-hidden bg-[#e5dbc9]">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-90" 
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="mb-2 font-serif text-xl text-[#1e293b] group-hover:text-[#0284c7] transition">{item.title}</h3>
                      <p className="text-xs leading-relaxed text-[#5c6878]">{item.subtitle}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="py-16 px-8 md:px-16 bg-[#e5dbc9] text-[#1e293b] border-t border-[#d6ccb5] flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-[#38bdf8] text-[#1e293b] flex items-center justify-center font-serif text-xs font-bold">BT</div>
          <span className="font-serif text-xs tracking-[0.2em]">BOHO TRUNKK CAFÉ</span>
        </div>
        <p className="text-[11px] text-[#5c6878] text-center md:text-left font-light">
          L 38, Indranipark, Prince Anwar Shah Road, Tollygunge, Kolkata, West Bengal 700033
        </p>
        <div className="flex space-x-5 text-[#475569] text-xs tracking-wider font-medium">
          <a href="https://www.instagram.com/bohotrunkk" target="_blank" rel="noreferrer" className="hover:text-[#0284c7] transition">INSTAGRAM</a>
          <a href="tel:+917003182337" className="hover:text-[#0284c7] transition">CONTACT</a>
        </div>
      </footer>
    </div>
  );
}