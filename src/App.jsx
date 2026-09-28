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
          alt={`${title} ${idx}`}
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
  const [bookingData, setBookingData] = useState({ name: '', date: '2026-09-29', requests: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [logoError, setLogoError] = useState(false);

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
    { title: "Twilight Indigo Kaftan", subtitle: "Hand-blocked organic cotton", image: "/fashh.png" },
    { title: "Artisan Cream Linen", subtitle: "Sustainable neutral tailoring", image: "/suit.png" },
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
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f5efe6]/95 backdrop-blur-md border-b border-[#e2d8c8] px-8 md:px-16 py-5 flex justify-between items-center shadow-xs">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-[#1e293b] flex items-center justify-center shadow-sm border border-[#d6ccb5]">
            <img 
              src="https://tse1.mm.bing.net/th/id/OIP.ILAx1KwR92WCCJ7xDCSnIAHaHU?r=0&pid=Api&h=220&P=0" 
              alt="Boho Trunkk Logo" 
              className="w-full h-full object-cover" 
              onError={(e) => {
                e.target.style.display = 'none';
                if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
              }}
            />
            <span className="font-serif text-xs font-bold text-[#f5efe6] tracking-tighter" style={{ display: 'none' }}>BT</span>
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

        <div className="flex items-center space-x-4">
          <a 
            href="https://www.instagram.com/bohotrunkk" 
            target="_blank" 
            rel="noreferrer" 
            className="text-xs font-medium uppercase tracking-widest bg-[#1e293b] text-[#f5efe6] px-5 py-2.5 rounded-full hover:bg-[#334155] transition shadow-xs"
          >
            Instagram
          </a>
        </div>
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
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          
          {/* Left Side: Café Info */}
          <div className="space-y-6 bg-[#ede4d2] border border-[#d6ccb5] p-8 md:p-10 rounded-3xl shadow-md text-[#1e293b] flex flex-col justify-between">
            <div>
              <div>
                <span className="text-[#0284c7] text-[10px] font-medium uppercase tracking-[0.3em] mb-2 block">Connect With Us</span>
                <h3 className="font-serif text-2xl md:text-3xl font-normal text-[#1e293b]">Cafe Boho Trunkk</h3>
              </div>
              
              <p className="text-xs md:text-sm text-[#5c6878] font-light leading-relaxed mt-4">
                Experience the perfect blend of coffee, culinary arts, and sustainable fashion in an unhurried, beautiful environment.
              </p>
            </div>

            <div className="space-y-4 pt-2 text-xs text-[#475569]">
              <div className="flex items-start gap-3">
                
              </div>

              <div className="flex items-center gap-3">
                <span className="font-semibold text-[#1e293b] uppercase tracking-wider min-w-[70px] flex items-center">
                  <svg className="w-4 h-4 fill-[#1e293b]" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </span>
                <a href="https://www.instagram.com/bohotrunkk" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[#0284c7] hover:underline">
                  @bohotrunkk
                </a>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-semibold text-[#1e293b] uppercase tracking-wider min-w-[70px] flex items-center">
                  <svg className="w-4 h-4 fill-[#22c55e]" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </span>
                <a href="https://wa.me/917003182337?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20Boho%20Trunkk%20Caf%C3%A9" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[#22c55e] font-medium hover:underline">
                  +91 70031 82337
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Table Reservation Form */}
          <div className="w-full bg-[#ede4d2] border border-[#d6ccb5] p-8 md:p-10 rounded-3xl shadow-xl relative text-[#1e293b] flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <h3 className="font-serif text-xl md:text-2xl font-medium tracking-wide mb-1 text-[#1e293b]">Reserve a Table</h3>
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
          <div className="w-8 h-8 rounded-full overflow-hidden bg-[#1e293b] flex items-center justify-center border border-[#d6ccb5]">
            {!logoError ? (
              <img 
                src="https://tse1.mm.bing.net/th/id/OIP.ILAx1KwR92WCCJ7xDCSnIAHaHU?r=0&pid=Api&h=220&P=0" 
                alt="Boho Trunkk Logo" 
                className="w-full h-full object-cover" 
                onError={() => setLogoError(true)}
              />
            ) : (
              <span className="font-serif text-[10px] font-bold text-[#f5efe6] tracking-tighter">BT</span>
            )}
          </div>
          <span className="font-serif text-xs tracking-[0.2em]">BOHO TRUNKK CAFÉ</span>
        </div>
        <p className="text-[11px] text-[#5c6878] text-center md:text-left font-light">
          L 38, Indranipark, Prince Anwar Shah Road, Tollygunge, Kolkata, West Bengal 700033
        </p>
        <div className="flex items-center space-x-3">
          <a 
            href="https://www.instagram.com/bohotrunkk" 
            target="_blank" 
            rel="noreferrer" 
            className="w-8 h-8 rounded-full bg-[#ede4d2] border border-[#d6ccb5] flex items-center justify-center text-[#1e293b] hover:bg-[#38bdf8] hover:border-[#38bdf8] transition shadow-xs"
            title="Instagram @bohotrunkk"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}