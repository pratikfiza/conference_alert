// components/EventDetails.js
import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const EventDetails = () => {
  const location = useLocation();
  const { event } = location.state;

  return (
    <div className=" mx-auto p-4 mt-6 mb-6 min-h-[70vh]">
      <div className="bg-white  rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{event.event_name}</h2>
          <p className="text-gray-700 mb-4">{event.short_desc}</p>
          <div className="flex items-center text-gray-700 mb-2">
            <FaCalendarAlt className="mr-2" />
            <span>{new Date(event.event_stat).toLocaleDateString()} - {new Date(event.event_end).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-gray-700 mb-2">
            <FaMapMarkerAlt className="mr-2" />
            <span>{event.city}, {event.country.split('#')[1]}</span>
          </div>
          <div className="flex items-center text-gray-700 mb-2">
            <FaEnvelope className="mr-2" />
            <span>{event.event_enq_email}</span>
          </div>
          <div className="flex items-center text-gray-700 mb-2">
            <span className="font-bold mr-2">Organizer:</span>
            <span>{event.org_society}</span>
          </div>
          <div className="mt-4">
            <a href={event.web_url} className="text-blue-500 hover:underline">Event Website</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
