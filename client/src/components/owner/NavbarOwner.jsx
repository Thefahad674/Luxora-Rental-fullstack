import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { UseAppContext } from '../../context/AppContext'

const NavbarOwner = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const { user } = UseAppContext()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <div className='flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor bg-white fixed top-0 left-0 right-0 z-30'>
      {/* Logo and Mobile Menu Button */}
      <div className='flex items-center gap-4'>
        {/* Mobile Menu Button - only visible on small screens */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className='md:hidden p-1 focus:outline-none'
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        <Link to='/'>
          <img src={assets.logo} alt="" className='h-7' />
        </Link>
      </div>

      {/* User Profile Section */}
      <div className='flex items-center gap-3 relative'>
        <p className='hidden sm:inline'>Welcome, {user?.name || "Owner"}</p>
        
        {/* Profile Dropdown */}
        <div 
          className='relative cursor-pointer'
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <div className='w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden'>
            {user?.image ? (
              <img src={user.image} alt="profile" className='w-full h-full object-cover' />
            ) : (
              <span className='text-sm font-medium'>
                {user?.name?.charAt(0) || 'O'}
              </span>
            )}
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-40'>
              <Link 
                to="/owner/profile" 
                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                onClick={() => setDropdownOpen(false)}
              >
                Profile
              </Link>
              <Link 
                to="/logout" 
                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                onClick={() => setDropdownOpen(false)}
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NavbarOwner