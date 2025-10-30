import React from 'react'
import { SimpleButton, UiButton } from '../BTN'

function Hero() {
  return (
    <>
      <section className='w-full overflow-hidden'>
        {/* Main Hero Section */}
        <div className='flex flex-col lg:flex-row'>
          {/* Side Images - Hidden on mobile, visible on large screens */}
          <div className='hidden lg:block flex-1'>
            <img 
              src="./Home/hero-side-1.png" 
              className='w-full h-full object-cover' 
              alt="Decoration" 
            />
          </div>
          
          {/* Main Content */}
          <div className='flex-1 lg:flex-3 bg-[#F2F5F6] grid urbanist-regular justify-center items-center text-center px-4 sm:px-6 lg:px-8 py-12 lg:py-16'>
            <div className='max-w-4xl mx-auto space-y-6'>
              <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight'>
                Build a Digital Identity that Drives Growth — with{' '}
                <span className='text-cyan-950'>VyomaGlobal</span>.
              </h2>
              
              <p className='text-gray-500 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed'>
                We help startups and local businesses create professional, mobile-friendly websites 
                that turn visitors into customers — at prices made for growing brands.
              </p>
              
              <div className='flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-4'>
                <UiButton theme={'HOME'}>
                  Let's Build Your Website 
                </UiButton>
                <SimpleButton>
                  Explore 
                </SimpleButton>
              </div>
              
              <p className='text-sm sm:text-base pt-4'>
                ⭐ Chosen by Leading Businesses | Rated Excellent on Google
              </p>
            </div>
          </div>
          
          {/* Right Side Image - Hidden on mobile, visible on large screens */}
          <div className='hidden lg:block flex-1'>
            <img 
              src="./Home/hero-side-1.png" 
              className='w-full scale-x-[-1] h-full object-cover' 
              alt="Decoration" 
            />
          </div>
        </div>

        {/* Trusted By Section */}
        <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-between p-6 sm:p-8 bg-white'>
          <p className='font-bold urbanist-regular text-sm sm:text-base text-center sm:text-left whitespace-nowrap'>
            Trusted By the best Large/Small Businesses
          </p>
          
          <div className='flex flex-wrap justify-center gap-3 sm:gap-4 text-gray-600'>
            {['City-Cafe', 'Real-Estate', 'Hospitals-Clinics', 'Saloons-SPA', 'Hotel-Management'].map((item, index) => (
              <h1 
                key={index}
                className='italiana-regular font-extrabold text-lg sm:text-xl md:text-2xl text-center'
              >
                {item}
              </h1>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero