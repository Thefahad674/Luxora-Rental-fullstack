import React, { useState } from 'react'
import { assets, ownerMenuLinks } from '../../assets/assets'
import { NavLink, useLocation } from 'react-router-dom'
import { UseAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import pp from '../../assets/dp.jpg'

const SideBar = ({ mobileView = false, closeMenu = () => {} }) => {
  const { user, axios, fetchUser } = UseAppContext()
  const location = useLocation()
  const [image, setImage] = useState('')

  const updateImage = async () => {
    try {
      const formData = new FormData()
      formData.append('image', image)

      const { data } = await axios.post('/api/owner/update-image', formData)

      if (data.success) {
        fetchUser()
        toast.success(data.message)
        setImage('')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className={`${mobileView ? 'w-64 p-4' : 'min-h-screen flex flex-col items-center pt-6 w-full max-w-[210px] border-r border-borderColor'} text-sm bg-white`}>
      {/* Avatar */}
      <div className="group relative">
        <label htmlFor="image">
          <img
            src={image ? URL.createObjectURL(image) : pp}
            alt=""
            className={`${mobileView ? 'h-12 w-12' : 'h-14 w-14'} rounded-full mx-auto object-cover border border-borderColor`}
          />
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />

          <div className="absolute hidden top-0 right-0 left-0 bottom-0 bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer">
            <img src={assets.edit_icon} alt="edit" />
          </div>
        </label>
      </div>

      {/* Save Button */}
      {image && (
        <button
          onClick={updateImage}
          className="mt-2 flex px-2 py-1 gap-1 bg-primary/10 text-primary text-xs rounded"
        >
          Save
          <img src={assets.check_icon} width={13} alt="check" />
        </button>
      )}

      {/* User name */}
      <p className={`mt-3 text-base font-medium text-center ${mobileView ? 'text-sm' : ''}`}>
        {user?.name}
      </p>

      {/* Nav Links */}
      <div className={`w-full mt-6 ${mobileView ? 'pl-2' : ''}`}>
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            onClick={() => mobileView && closeMenu()}
            className={`relative flex items-center gap-2 w-full py-3 ${mobileView ? 'pl-3 pr-2' : 'pl-4 pr-2'} ${
              link.path === location.pathname
                ? 'bg-primary/10 text-primary'
                : 'text-gray-600'
            }`}
          >
            <img
              src={
                link.path === location.pathname
                  ? link.coloredIcon
                  : link.icon
              }
              alt="icon"
              className={mobileView ? 'w-5 h-5' : ''}
            />
            <span className="whitespace-nowrap">{link.name}</span>
            {!mobileView && (
              <div
                className={`${
                  link.path === location.pathname && 'bg-primary'
                } w-1.5 h-8 rounded-l right-0 absolute`}
              ></div>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default SideBar