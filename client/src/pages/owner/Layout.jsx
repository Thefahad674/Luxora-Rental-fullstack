import React, { useEffect, useState } from 'react'
import NavbarOwner from '../../components/owner/NavbarOwner'
import SideBar from '../../components/owner/SideBar'
import { Outlet } from 'react-router-dom'
import { UseAppContext } from '../../context/AppContext'

const Layout = () => {
  const {isOwner, navigate} = UseAppContext()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if(!isOwner) {
      navigate('/')
    }
  }, [isOwner])

  return (
    <div className='flex flex-col md:pt-15'>
      {/* Navbar with mobile menu button */}
      <div className='flex flex-col'>
        <NavbarOwner 
          mobileMenuOpen={mobileMenuOpen} 
          setMobileMenuOpen={setMobileMenuOpen} 
        />
        
        {/* Mobile menu overlay (only shown on small screens) */}
        {mobileMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
        )}
      </div>

      <div className='flex'>
        {/* Sidebar - hidden on mobile, shown on desktop */}
        <div className={`hidden md:block`}>
          <SideBar />
        </div>

        {/* Mobile sidebar - shown when menu is open */}
        <div className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out 
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
          <SideBar mobileView={true} closeMenu={() => setMobileMenuOpen(false)} />
        </div>

        {/* Main content with responsive padding */}
        <div className={`flex-1 pt-16 md:pt-0 ${mobileMenuOpen ? 'md:pl-0' : 'md:pl-10'}`}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout