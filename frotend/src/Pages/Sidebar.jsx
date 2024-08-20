import React, { useState } from 'react';
import {
  FiHome, FiTag, FiUsers, FiPlus, FiSettings, FiMenu
} from "react-icons/fi";

const Sidebar = ({ setCurrentTab }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="lg:hidden bg-[#034F75] text-white p-4 fixed top-0 left-0 right-0 z-50 flex flex-row">
        <button className='border-0' onClick={() => setIsOpen(!isOpen)}>
          <FiMenu size={30} />
        </button>
        <img src="https://www.conferencealerts.org/images/logo.webp" alt="logo" className="w-40 h-12 object-contain  mx-auto" />
      </nav>

      <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}>
        <div className="w-80 pt-2 bg-gray-100 h-screen shadow-md flex flex-col z-50">
          <div className="flex-shrink-0 py-1 my-1">
            <img src="https://www.conferencealerts.org/images/logo.webp" alt="logo" className="w-40 h-16 object-contain rounded-full mx-auto" />
          </div>
          <nav className="flex-grow px-4 pb-4 pt-10 overflow-y-auto">
            <button  onClick={() => setCurrentTab('accepted')} className="flex items-center p-2 border-0 text-black hover:bg-orange-300 w-full rounded cursor-pointer">
              <FiHome className="mr-1" /> Accepted Events
            </button>
            <button  onClick={() => setCurrentTab('rejected')} className="flex items-center p-2 border-0 text-black hover:bg-orange-300 w-full rounded cursor-pointer">
              <FiTag className="mr-1" /> Rejected Events
            </button>
            <button  onClick={() => setCurrentTab('past')} className="flex items-center p-2 border-0 text-black hover:bg-orange-300 w-full rounded cursor-pointer">
              <FiUsers className="mr-1" /> Past Successful Events
            </button>
            <button  onClick={() => setCurrentTab('verification')} className="flex items-center p-2 border-0 text-black hover:bg-orange-300 w-full rounded cursor-pointer">
              <FiUsers className="mr-1" /> Event in Process Of Verification
            </button>
            <button  onClick={() => setCurrentTab('add')} className="flex items-center p-2 border-0 text-black hover:bg-orange-300 w-full rounded cursor-pointer">
              <FiPlus className="mr-1" /> Add New Event
            </button>
            <button  onClick={() => setCurrentTab('organizer')} className="flex items-center p-2 border-0 text-black hover:bg-orange-300 w-full rounded cursor-pointer">
              <FiSettings className="mr-1" /> Manage Organizer
            </button>
            <button  onClick={() => setCurrentTab('password')} className="flex items-center p-2 border-0 text-black hover:bg-orange-300 w-full rounded cursor-pointer">
              <FiSettings className="mr-1" /> Change Password
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
