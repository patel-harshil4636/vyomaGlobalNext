"use client";
import React, { useState } from 'react'
import { SimpleButton, UiButton } from '../BTN'
import Link from 'next/link';

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className='flex justify-between items-center py-4 px-4 sm:px-6 lg:ps-14 lg:pe-8 relative'>
      {/* Logo */}
      <div id='logo' className='w-1/4 sm:w-1/6 lg:w-1/12'>
        <img 
          src="./Vyoma Global.png" 
          className='w-full h-auto max-w-[80px] sm:max-w-[100px]' 
          alt="Vyoma Global Logo" 
        />
      </div>

      {/* Desktop Navigation */}
      <ul className='hidden lg:flex gap-6 xl:gap-8' >
        {['Feature','Solution','Company','Resources','Contact'].map((item, index) => (
        <>  
        {item=='Contact'?<>
        <Link href={'/contact'}>
        <li 
         key={index}
            className={`text-sm xl:text-base font-medium transition-colors duration-200 hover:text-cyan-900 ${
              item === 'Feature' ? 'text-cyan-900 font-semibold' : 'text-gray-600'
            }`}
          >
            {item}
          </li>
        </Link>
        </>:<li 
         key={index}
            className={`text-sm xl:text-base font-medium transition-colors duration-200 hover:text-cyan-900 ${
              item === 'Feature' ? 'text-cyan-900 font-semibold' : 'text-gray-600'
            }`}
          >
            {item}
          </li>}
         
          </>
        ))}
      </ul>

      {/* Desktop Buttons */}
      <div className='hidden lg:flex gap-3'>
        <SimpleButton>
          Log In
        </SimpleButton>
        <UiButton theme={'HOME'}>
          SIGN UP
        </UiButton>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className='lg:hidden flex flex-col w-6 h-6 justify-center items-center space-y-1'
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 ${
          isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
        }`}></span>
        <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 ${
          isMenuOpen ? 'opacity-0' : 'opacity-100'
        }`}></span>
        <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 ${
          isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
        }`}></span>
      </button>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 bg-white z-50 transition-transform duration-300 ease-in-out ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className='flex flex-col h-full pt-20 px-6'>
          {/* Close Button */}
          <button 
            className='absolute top-6 right-6 text-2xl'
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>

          {/* Mobile Navigation Items */}
          <ul className='flex flex-col gap-6 mb-8'>
            {['Feature','Solution','Company','Resources','Contact'].map((item, index) => (
              <li 
                key={index}
                className={`text-lg font-medium border-b border-gray-100 pb-4 ${
                  item === 'Feature' ? 'text-cyan-900 font-semibold' : 'text-gray-600'
                }`}
              >
                {item}
              </li>
            ))}
          </ul>

          {/* Mobile Buttons */}
          <div className='flex flex-col gap-4 mt-auto mb-8'>
            <SimpleButton className='w-full justify-center'>
              Log In
            </SimpleButton>
            <UiButton theme={'HOME'} className='w-full justify-center'>
              SIGN UP
            </UiButton>
          </div>
        </div>
      </div>

      {/* Backdrop for mobile menu */}
      {isMenuOpen && (
        <div 
          className='lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40'
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </nav>
  )
}

export default Nav