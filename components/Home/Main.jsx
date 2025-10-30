import React from 'react'
import { UiButton } from '../BTN'
import { HomeCard } from './Card'

function Main() {
    const cardData = [
        {
            title: 'Empowered Clients',
            desc: 'At Vyoma Global, we build experiences that delight. From strategy to support, we help brands shine online and connect deeply with their audience.',
            img: "../Home/1st.jpg"
        },
        {
            title: 'Seamless Integrations',
            desc: 'Our platforms are crafted to blend effortlessly with your existing systems — offering smooth scalability, automation, and flexibility for modern businesses.',
            img: "../Home/2nd.jpg"
        },
        {
            title: 'Sustainable Growth',
            desc: 'We don\'t just build websites; we build opportunities. With data-driven strategies and adaptive technology, Vyoma Global ensures your business evolves with the future.',
            img: "../Home/3rd.jpg"
        }
    ]

    return (
        <>
            {/* Hero Section */}
            <section className='min-h-screen w-full p-4 sm:p-8 lg:p-20 text-white grid bg-cyan-900'>
                <div className='flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-12'>
                    <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold lg:flex-1 text-center lg:text-left'>
                        High-Impact Digital <br /> 
                        <span className='text-amber-500'>Teams & Professionals</span> 
                    </h1>
                    <p className='text-base sm:text-lg lg:text-xl urbanist-regular lg:flex-1 text-center lg:text-left max-w-2xl'>
                        Vyoma Global empowers businesses with innovative digital solutions and professional strategies designed to elevate your online presence. We make technology simple, scalable, and impactful — helping brands grow, connect, and thrive globally.
                    </p>
                </div>
            </section>

            {/* Innovative Elements Section */}
            <section className='flex flex-col lg:flex-row gap-8 lg:gap-12 p-6 sm:p-8 lg:p-10 items-center'>
                <div className='grid gap-6 lg:gap-10 lg:flex-1 w-full lg:w-auto'>
                    <UiButton theme={"HOME"}>
                        Benificial
                    </UiButton>
                    <h4 className='text-4xl sm:text-5xl lg:text-6xl font-semibold text-center lg:text-left'>
                        Innovative Elements
                    </h4>
                    <p className='text-lg text-center lg:text-left max-w-2xl'>
                        Smart & powerful digital solutions that help your business grow faster, smarter, and stronger.
                    </p>
                </div>
                <div className='flex flex-col md:flex-row gap-6 lg:gap-4 lg:flex-2 w-full'>
                    {cardData.map((e, index) => (
                        <HomeCard key={index} title={e.title} desc={e.desc} img={e.img} />
                    ))}
                </div>
            </section>

            {/* Bridge Section */}
            <section className='relative flex flex-col lg:flex-row gap-8 lg:gap-40 justify-between px-6 sm:px-8 lg:px-12 py-12'>
                <div className='w-full lg:w-1/2 relative'>
                    <img 
                        src="../Home/mainConsult.jpg" 
                        className='w-full h-auto object-cover rounded-lg' 
                        alt="Consultation" 
                    />
                    {/* Award Badge - Responsive positioning */}
                    <div className='absolute -bottom-6 -right-6 lg:bottom-2/12 lg:right-3/6 h-32 w-32 lg:h-48 lg:w-48 flex items-center justify-center bg-cyan-950 rounded-full transform lg:translate-x-1/2 lg:translate-y-1/2'>
                        <p className='text-center font-semibold text-white text-sm lg:text-base'>
                            <span className='text-2xl lg:text-4xl'>#1</span> <br />
                            Best Support
                            <br />
                            2025
                        </p>
                    </div>
                </div>
                
                <div className='w-full lg:w-1/2 grid gap-6 items-center mt-12 lg:mt-0'>
                    <h1 className='text-4xl sm:text-5xl lg:text-6xl urbanist-regular font-bold text-black text-center lg:text-left'>
                        Building bridge between <span className='text-gray-500'>clients and their customers</span>
                    </h1>
                    <p className='text-lg text-center lg:text-left'>
                        With in-depth data analysis and rapid technology adaptation, Vyoma Global bridges the gap between businesses and their customers — creating seamless digital connections that drive growth and trust.
                    </p>
                    <div className='text-center lg:text-left'>
                        <UiButton theme={'HOME'}>
                            View Results 
                        </UiButton>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className='p-6 sm:p-8 lg:p-10 my-8 lg:my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 justify-items-center'>
                {[
                    { a: "120+", b: 'Websites Delivered' },
                    { a: "95%", b: 'Client Satisfaction Rate' },
                    { a: "10+", b: 'Industries Served' },
                    { a: "50k+", b: 'Global Reach & Impressions' },
                ].map(({a, b}, i) => (
                    <div className="grid gap-3 text-center" key={i}>
                        <h1 className='text-4xl sm:text-5xl lg:text-6xl font-semibold text-cyan-900'>
                            {a}
                        </h1>
                        <p className='text-lg sm:text-xl font-semibold text-gray-500'>
                            {b}
                        </p>
                    </div>
                ))}
            </section>

            {/* Founder Section */}
            <section className='flex flex-col lg:flex-row justify-between urbanist-regular p-6 sm:p-8 lg:p-12 gap-12 lg:gap-8'>
                <div className='grid gap-6 lg:gap-8 lg:flex-1 justify-center items-center'>
                    <h1 className='text-4xl sm:text-5xl lg:text-6xl font-semibold text-center lg:text-left'>
                        Meet Our Founder
                    </h1>
                    <p className='text-lg text-center lg:text-left'>
                        <span className='font-semibold'>I believe every local business deserves a global identity.</span>
                        Vyoma Global was built from the belief that technology isn't just for big companies — it's for every dream that deserves to be seen.
                        I started this journey to help brands turn their ideas into impactful digital realities — affordable, professional, and built with purpose.
                        For me, it's not just about creating websites; it's about creating opportunities, trust, and growth that speak louder than words.
                    </p>
                    
                    <div className='text-center lg:text-left'>
                        <h1 className='mb-4'>
                            <span className='font-bold text-2xl lg:text-3xl'>
                                Harshil Patel
                            </span>
                            <br />
                            <span className='text-gray-500 text-lg'>
                                Founder Vyoma Global, Keshro
                            </span>
                        </h1>
                        <UiButton theme={'HOME'} className='mx-auto lg:mx-0'>
                            See Another Innovations 
                        </UiButton>
                    </div>
                </div>
                <div className='lg:flex-1 flex justify-center lg:justify-end'>
                    <img 
                        src="../Home/harshil.png" 
                        className='w-full max-w-md lg:max-w-lg h-auto object-contain' 
                        alt="Harshil Patel - Founder" 
                    />
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-[#0B0D17] text-white flex flex-col lg:flex-row items-center justify-between p-6 sm:p-8 lg:px-20 lg:py-16 overflow-hidden gap-12 lg:gap-8">
                {/* Left Content */}
                <div className="max-w-xl space-y-6 text-center lg:text-left">
                    <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight">
                        Take Your Customer <br />
                        Service To The Next Level
                    </h1>

                    <div className="space-y-3">
                        <button className="flex items-center gap-2 bg-[#F5B400] hover:bg-[#e3a000] transition-all px-6 sm:px-8 py-3 rounded-full font-semibold text-[#0B0D17] mx-auto lg:mx-0">
                            Get 14 Days Free Trial <span className="text-xl">→</span>
                        </button>
                        <p className="text-gray-300 text-sm">No credit card required</p>
                    </div>
                </div>

                {/* Right Image Section */}
                <div className="relative mt-8 lg:mt-0">
                    <img
                        src="../Home/agent.png"
                        alt="Customer Support Agent"
                        className="w-64 sm:w-72 lg:w-80 rounded-lg object-cover relative z-10"
                    />

                    {/* Decorative Shapes */}
                    <div className="absolute -bottom-4 -right-6 bg-[#F5B400] w-12 h-24 lg:w-16 lg:h-32 rounded-t-full flex items-center justify-center">
                        <span className="text-white text-xl lg:text-2xl">🔍</span>
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-[#0D3B55] w-10 h-20 lg:w-14 lg:h-28 rounded-t-full flex items-center justify-center">
                        <span className="text-white text-lg lg:text-xl">⭐</span>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Main