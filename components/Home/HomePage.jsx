"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";
import { 
  ArrowRight, CheckCircle2, Smartphone, Target, 
  Users, Building2, Home, GraduationCap, 
  Rocket, Scissors, MapPin,
  Instagram, MessageCircle, PhoneCall 
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// 1. PRO-LEVEL ANIMATION VARIANTS
const springTransition = { type: "spring", stiffness: 100, damping: 20, mass: 1 };

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: springTransition }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

// Create a motion-enabled Next.js Image component
const MotionImage = motion.create(Image);

// 2. PREMIUM COMPONENTS

// Magnetic Button (Cursor follows button slightly)
const MagneticButton = ({ children, className, onClick, as: Component = "button", href, target, rel }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block w-full sm:w-auto"
    >
      <Component href={href} onClick={onClick} className={className} target={target} rel={rel}>
        {children}
      </Component>
    </motion.div>
  );
};

// Scroll Reveal Wrapper
const Reveal = ({ children, width = "100%", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });
  return (
    <div ref={ref} style={{ width, overflow: "hidden" }}>
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// GSAP Counter
const Counter = ({ end, suffix, label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  useEffect(() => {
    if (isInView) {
      gsap.fromTo(ref.current, 
        { innerText: 0 }, 
        { innerText: end, duration: 2.5, ease: "power4.out", snap: { innerText: 1 } }
      );
    }
  }, [isInView, end]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-baseline text-blue-400 font-bold text-5xl md:text-6xl mb-2 tracking-tighter">
        <span ref={ref}>0</span>
        <span>{suffix}</span>
      </div>
      <p className="text-[10px] tracking-[0.2em] text-slate-400 uppercase font-bold">{label}</p>
    </div>
  );
};

// 3. MAIN PAGE COMPONENT
export default function VyomaGlobal() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Parallax values
  const heroImageY = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-blue-200 selection:text-blue-900">
      
      {/* --- NAVBAR --- */}
      <motion.header 
        initial={{ y: -100 }} animate={{ y: 0 }} transition={springTransition}
        className="fixed top-0 w-full bg-white/70 backdrop-blur-xl z-50 border-b border-slate-200/50"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <div className="text-xl font-bold text-blue-600 tracking-tight cursor-pointer">VyomaGlobal</div>
          <nav className="hidden md:flex gap-10 text-[13px] font-semibold tracking-wide text-slate-500">
            {['Features', 'Portfolio', 'Testimonials', 'About Us', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="hover:text-slate-900 transition-colors">{item}</a>
            ))}
          </nav>
          <div className="flex items-center gap-6">
            <MagneticButton as={Link} href="/clients" className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-[13px] font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 block">
              Login
            </MagneticButton>
          </div>
        </div>
      </motion.header>

      {/* --- HERO SECTION --- */}
      <section className="pt-40 pb-20 px-6 lg:px-12 max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 min-h-[95vh]">
        <motion.div className="lg:w-[55%] flex flex-col items-start z-10" variants={staggerContainer} initial="hidden" animate="visible">
          
          <motion.div variants={fadeUpVariant} className="bg-blue-50/80 text-blue-600 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase mb-8 border border-blue-100/50">
            Empowering Every Local Business in 2024
          </motion.div>
          
          <motion.h1 variants={fadeUpVariant} className="text-[56px] lg:text-[72px] font-extrabold leading-[1.05] tracking-[-0.02em] mb-6 text-slate-900">
            High-Impact <span className="text-blue-600 inline-block">Websites</span> <br />
            for Growing Local & <br />Startup Businesses
          </motion.h1>
          
          <motion.p variants={fadeUpVariant} className="text-lg text-slate-500 mb-10 max-w-lg leading-[1.6]">
            We design conversion-focused websites that look professional, load instantly, and build trust so your business grows faster online.
          </motion.p>
          
          <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row gap-4 mb-12 w-full sm:w-auto">
            <MagneticButton className="bg-blue-600 text-white px-8 py-4 rounded-full text-[15px] font-semibold hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/25 w-full block text-center">
              Let's Build Your Website
            </MagneticButton>
            <MagneticButton as={Link} href="#portfolio" scroll={true} className="bg-transparent border border-slate-200 text-slate-700 px-8 py-4 rounded-full text-[15px] font-semibold flex items-center justify-center gap-2 hover:border-slate-300 hover:bg-slate-50 transition-all w-full">
              View Our Work <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </motion.div>

          <motion.div variants={fadeUpVariant} className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[11, 12, 13, 14].map((i) => (
                <Image 
                  key={i} 
                  src={`https://i.pravatar.cc/100?img=${i}`} 
                  alt="Trusted Client" 
                  width={40} 
                  height={40} 
                  className="rounded-full border-2 border-[#F8FAFC] shadow-sm" 
                  unoptimized={false} // Will need domain whitelisted in next.config.ts
                />
              ))}
            </div>
            <p className="text-[13px] font-medium text-slate-500 leading-tight">
              Trusted by 120+ Businesses <br /> across 10+ Sectors.
            </p>
          </motion.div>
        </motion.div>
        
        {/* Parallax Hero Image with Clip-Path Reveal */}
        <div className="lg:w-[45%] w-full h-[600px] lg:h-[750px] relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200">
          <motion.div 
            className="w-full h-[120%] relative" 
            style={{ y: heroImageY }}
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <Image 
              src="/Home/harshil-2.png" 
              alt="Harshil Patel - Vyoma Global" 
              fill
              priority // Crucial for LCP (Largest Contentful Paint) optimization in Next 15
              className="object-cover object-right"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </motion.div>
        </div>
      </section>

      {/* --- TRUST BANNER --- */}
      <div className="w-full py-8 border-y border-slate-200/60 bg-white">
        <p className="text-center text-[11px] tracking-[0.25em] font-bold text-slate-400 uppercase">
          Powering <span className="text-blue-600">120+</span> Business Websites With Brocode Ocean
        </p>
      </div>

      {/* --- FEATURES SECTION --- */}
      <section className="py-32 px-6 max-w-[1400px] mx-auto text-center" id="features">
        <Reveal>
          <div className="inline-block bg-blue-50/80 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-6">Features</div>
          <h2 className="text-[40px] md:text-[48px] font-bold mb-20 max-w-3xl mx-auto tracking-tight leading-[1.1] text-slate-900">
            Professional websites should be accessible to every growing business.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          {[
            { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50", title: "Affordable & Scalable Websites", desc: "We offer pricing plans strictly per your budget and create dynamic designs that scale efficiently when you expand." },
            { icon: Smartphone, color: "text-blue-500", bg: "bg-blue-50", title: "Fast, Mobile-First Performance", desc: "Over 60% of traffic comes from mobile users. Our sites load instantly across all devices, capturing attention immediately." },
            { icon: Target, color: "text-slate-700", bg: "bg-slate-100", title: "Built for Your Business Goals", desc: "We design with clear objectives for you. From lead captures to sleek portfolios, we create what functions best." }
          ].map((feature, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="bg-white p-10 rounded-[2rem] border border-slate-100/80 hover:border-slate-200 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 group transform hover:-translate-y-2">
                <div className={`w-14 h-14 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 ease-out`}>
                  <feature.icon strokeWidth={2} className="w-6 h-6" />
                </div>
                <h3 className="text-[22px] font-bold mb-4 text-slate-900 tracking-tight">{feature.title}</h3>
                <p className="text-slate-500 leading-[1.7] text-[15px]">{feature.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* --- INDUSTRIES GRID --- */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <Reveal>
            <div className="inline-block bg-slate-50 text-slate-500 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-6">Industries</div>
            <h2 className="text-[36px] font-bold mb-4 tracking-tight text-slate-900">Websites built for your type of business</h2>
            <p className="text-slate-500 mb-16 text-[15px]">We craft websites tailored exactly to your customers' needs, specific to the demands of your industry.</p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-12 relative">
            <div className="hidden lg:block absolute top-[40px] left-0 w-full h-[1px] bg-slate-100 z-0 border-dashed border-t border-slate-200"></div>

            {[
              { icon: Users, label: "Consultants & Contractors" },
              { icon: Building2, label: "Clinics & Healthcare" },
              { icon: Home, label: "Real Estate" },
              { icon: GraduationCap, label: "Education" },
              { icon: Rocket, label: "Startups & Small Business" },
              { icon: Scissors, label: "Salons & Spas" }
            ].map((item, idx) => (
              <Reveal key={idx} delay={idx * 0.05}>
                <div className="flex flex-col items-center group cursor-pointer relative z-10">
                  <div className="w-20 h-20 bg-white border border-slate-100 rounded-full flex items-center justify-center mb-5 group-hover:border-blue-500 group-hover:bg-blue-50 transition-all duration-300 shadow-sm group-hover:shadow-md">
                    <item.icon className="w-6 h-6 text-slate-400 group-hover:text-blue-600 transition-colors" strokeWidth={1.5} />
                  </div>
                  <span className="text-[13px] font-semibold text-slate-600 text-center max-w-[120px] leading-tight group-hover:text-blue-600 transition-colors">{item.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-24 px-6 max-w-[1400px] mx-auto">
        <Reveal>
          <div className="bg-[#0B1120] rounded-[3rem] py-20 px-8 relative overflow-hidden shadow-2xl">
            <div className="absolute -top-[50%] -right-[10%] w-[80%] h-[150%] bg-blue-900/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10 divide-x divide-white/10">
              <Counter end={100} suffix="+" label="Websites Delivered" />
              <Counter end={95} suffix="%" label="Client Retention" />
              <Counter end={10} suffix="+" label="Industries Served" />
              <Counter end={50} suffix="k+" label="Lines of Code" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section className="py-32 px-6 max-w-[1400px] mx-auto flex flex-col md:flex-row items-center gap-20" id="about-us">
        <div className="md:w-1/2 pr-0 lg:pr-10">
          <Reveal>
            <div className="inline-block bg-blue-50/80 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-6">About the Founder</div>
            <h2 className="text-[40px] font-bold mb-8 tracking-tight leading-[1.1] text-slate-900">Every local business deserves a strong digital identity.</h2>
            <div className="space-y-6 text-slate-500 text-[16px] leading-[1.8]">
              <p>I believe every local business deserves a strong digital identity. VyomaGlobal was founded to bridge the gap between technology and local business growth. We ensure you step into the digital space effortlessly.</p>
              <p>From merely setting up simple websites for a local store to complex digital structures for established professionals, we build with a singular focus: Make it work perfectly. It's about opening possibilities, generating opportunities, trust, and growth that speaks louder than words.</p>
            </div>
            <div className="mt-10 pt-10 border-t border-slate-200">
              <h4 className="font-bold text-lg text-slate-900">Harshil Patel</h4>
              <p className="text-[13px] text-blue-600 font-semibold tracking-wide uppercase mt-1">Founder, VyomaGlobal</p>
            </div>
          </Reveal>
        </div>
        <div className="md:w-1/2 w-full">
          <Reveal delay={0.2}>
            <div className="relative rounded-[2.5rem] overflow-hidden h-[600px] shadow-2xl shadow-slate-200/50 group">
              <MotionImage 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                src="/Home/Harshil.png" 
                alt="Harshil Patel - Founder" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 border border-black/5 rounded-[2.5rem] pointer-events-none"></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-16 px-6 max-w-[1400px] mx-auto" id="contact">
        <Reveal>
          <div className="bg-blue-500 rounded-[3rem] p-16 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-500/30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent opacity-80"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              <h2 className="text-[44px] md:text-[56px] font-bold mb-8 tracking-tight leading-[1.05]">Ready to build a website that brings customers?</h2>
              <p className="text-blue-100 mb-12 text-[17px] leading-[1.6] max-w-2xl">
                We help startups and local businesses create modern, mobile-friendly websites that turn visitors into real revenue — without complex jargon or high costs.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-5 w-full sm:w-auto">
                <MagneticButton as={Link} href="tel:+918200953641" className="bg-white text-blue-600 px-10 py-4 rounded-full text-[15px] font-bold shadow-xl hover:shadow-2xl transition-shadow w-full block text-center flex items-center justify-center gap-2">
                  <PhoneCall className="w-4 h-4" /> Call Now
                </MagneticButton>
                
                <MagneticButton as={Link} href="https://wa.me/918200953641" target="_blank" rel="noopener noreferrer" className="bg-transparent border border-blue-300 text-white px-10 py-4 rounded-full text-[15px] font-bold hover:bg-white/10 transition-colors w-full block text-center flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
                </MagneticButton>
              </div>

              <p className="mt-12 text-[11px] text-blue-200 uppercase tracking-[0.2em] font-bold">
                100% Secure • No Hidden Costs • Fast Turnaround
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white pt-24 pb-8 border-t border-slate-200 mt-10">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          
          <div className="col-span-1 md:col-span-1 pr-8">
            <h3 className="text-2xl font-bold text-blue-600 mb-6 tracking-tight">VyomaGlobal</h3>
            <p className="text-slate-500 text-[14px] leading-[1.7] mb-8">
              Empowering local businesses and startups with high-impact digital infrastructures that drive growth.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/vyomaglobal" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all cursor-pointer group shadow-sm">
                <Instagram className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
              </a>
              <a href="https://wa.me/918200953641" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center hover:bg-emerald-500 hover:border-emerald-500 hover:text-white transition-all cursor-pointer group shadow-sm">
                <MessageCircle className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
              </a>
              <a href="tel:+918200953641" className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all cursor-pointer group shadow-sm">
                <PhoneCall className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-8 text-slate-900 tracking-wide text-[15px]">Services</h4>
            <ul className="space-y-4 text-[14px] text-slate-500 font-medium">
              <li><Link href="#" className="hover:text-blue-600 transition-colors block">Website Design</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors block">Digital Marketing</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors block">Brand Strategy</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors block">E-commerce Solutions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-8 text-slate-900 tracking-wide text-[15px]">Company</h4>
            <ul className="space-y-4 text-[14px] text-slate-500 font-medium">
              <li><Link href="#" className="hover:text-blue-600 transition-colors block">About the Founder</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors block">Affiliate Program</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors block">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors block">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-8 text-slate-900 tracking-wide text-[15px]">Stay Connected</h4>
            <ul className="space-y-5 text-[14px] text-slate-500 font-medium">
              <li>
                <a href="https://instagram.com/vyomaglobal" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-blue-600 cursor-pointer transition-colors group">
                  <Instagram className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" /> @vyomaglobal
                </a>
              </li>
              <li>
                <a href="https://wa.me/918200953641" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-emerald-500 cursor-pointer transition-colors group">
                  <MessageCircle className="w-4 h-4 text-blue-500 group-hover:text-emerald-500 group-hover:scale-110 transition-all" /> wp: (+91) 8200953641
                </a>
              </li>
              <li>
                <a href="tel:+918200953641" className="flex items-center gap-4 hover:text-blue-600 cursor-pointer transition-colors group">
                  <PhoneCall className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" /> Call: (+91) 8200953641
                </a>
              </li>
              <li className="flex items-center gap-4 pt-2">
                <MapPin className="w-4 h-4 text-slate-400" /> Ahmedabad, Gujarat
              </li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-[1400px] mx-auto px-6 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-[13px] text-slate-400 font-medium">
          <p>© 2024 VyomaGlobal. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Designed to convert <span className="text-blue-500 mx-1">✦</span> Built for speed</p>
        </div>
      </footer>

    </div>
  );
}