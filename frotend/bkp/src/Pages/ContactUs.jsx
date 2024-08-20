import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Import marker icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for the default marker icon issue
let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const ContactUs = () => {
  const position = [20.2961, 85.8245]; // Coordinates for Bhubaneswar, Odisha

  return (
    <div className="container mx-auto p-4 md:p-12 bg-gray-100">
      <h1 className="text-xl md:text-xl font-bold mb-4 text-[#034F75]">Conference Alerts India</h1>
      <p className="text-sm md:text-base ">
        Corporate office: 1056/B1, LANE 5, ITER College Rd,
      </p>
      <p>
        Jagmohan Nagar,  Bhubaneswar,
      </p>
      <p className='mb-6'>
        Odisha 751030
      </p>

      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <h2 className="text-xl font-semibold mb-3 text-[#034F75]">Looking to add/list your conferences/events with us?</h2>
          <a href="/add-event" className="text-orange-400 hover:underline text-sm">Go to Add New Events</a>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-[#034F75]">Looking for updates on upcoming conferences and events?</h2>
          <a href="/subscribe" className="text-orange-400 hover:underline text-sm">Go to Subscribe here</a>

          <h2 className="text-xl font-semibold mt-6 mb-3 text-[#034F75]">Get in Touch</h2>
          <p className="mb-4 text-sm">Whether you're a conference/event seeker or an event organizer, we will be happy to help you with all your queries. Please email us to help you and resolve your query.</p>
        </div>

        <div className="md:w-1/2">
          <MapContainer center={position} zoom={13} className="h-64 w-full mb-6">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>Conference Alerts India</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>

      <div className="mt-6 bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3 text-[#034F75]">Support</h2>
        <p className="text-sm">Email: <a href="mailto:info@conferencealerts.in" className="text-orange-400 hover:underline">info@conferencealerts.in</a></p>
      </div>
    </div>
  );
};

export default ContactUs;