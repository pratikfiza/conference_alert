import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaUserCircle,
  FaEnvelope,
  FaBuilding,
  FaClipboardList,
  FaGlobe,
  FaFlag,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const SubscribeForm = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    university: '',
    designation: '',
    country: '',
    state: '',
    city: '',
    category: '',
    interests: [],
  });

  const [categories, setCategories] = useState({});
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Fetch categories and keywords from API
    axios.get('http://localhost:3000/event_keywords/')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });

    // Fetch countries from API
    axios.get('http://localhost:3000/country')
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (category, keyword) => {
    const updatedInterests = [...formData.interests];
    const interestIndex = updatedInterests.findIndex((interest) => interest === keyword);

    if (interestIndex > -1) {
      updatedInterests.splice(interestIndex, 1);
    } else {
      updatedInterests.push(keyword);
    }

    setFormData({ ...formData, interests: updatedInterests });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3000/subscribe', formData)
      .then((response) => {
        console.log('Subscription created:', response.data);
      })
      .catch((error) => {
        console.error('Error creating subscription:', error);
      });
  };

  return (
    <div>
      <div className="bg-[#034F75] text-white p-4 ">
        <h1 className="text-xl md:text-2xl font-bold">Subscribe Now</h1>
      </div>
      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto p-6 bg-white text-black rounded-lg mt-4 mb-6 border shadow-md">
        <h2 className="text-xl font-bold mb-4">New Subscriber</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
          <div className="mb-4">
            <label htmlFor="first_name" className="flex items-center mb-2">
              <FaUserCircle className="mr-2 text-black" />
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="last_name" className="flex items-center mb-2">
              <FaUserCircle className="mr-2 text-black" />
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-black"
              required
            />
          </div>
          <div className="mb-4 col-span-2">
            <label htmlFor="email" className="flex items-center mb-2">
              <FaEnvelope className="mr-2 text-black" />
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-black"
              required
            />
          </div>
          <div className="mb-4 col-span-2">
            <label htmlFor="university" className="flex items-center mb-2">
              <FaBuilding className="mr-2 text-black" />
              University/Organization
            </label>
            <input
              type="text"
              id="university"
              name="university"
              value={formData.university}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-black"
            />
          </div>
          <div className="mb-4 col-span-2 md:col-span-1">
            <label htmlFor="designation" className="flex items-center mb-2">
              <FaClipboardList className="mr-2 text-black" />
              Designation
            </label>
            <input
              type="text"
              id="designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-black"
            />
          </div>
          <div className="mb-4 col-span-2 md:col-span-1">
            <label htmlFor="country" className="flex items-center mb-2">
              <FaGlobe className="mr-2 text-black" />
              Country
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-black"
            >
              <option value="">Choose a Country</option>
              {countries.map((country) => (
                <option key={country.id} value={country.country}>{country.country}</option>
              ))}
            </select>
          </div>
          <div className="mb-4 col-span-2 md:col-span-1">
            <label htmlFor="state" className="flex items-center mb-2">
              <FaFlag className="mr-2 text-black" />
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-black"
            />
          </div>
          <div className="mb-4 col-span-2 md:col-span-1">
            <label htmlFor="city" className="flex items-center mb-2">
              <FaMapMarkerAlt className="mr-2 text-black" />
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-black"
            />
          </div>
          <div className="mb-4 col-span-2">
            <label htmlFor="category" className="flex items-center mb-2">
              <FaClipboardList className="mr-2 text-black" />
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-black"
            >
              <option value="">Choose a Category</option>
              {Object.keys(categories).map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Interests */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Areas Of Interest</h2>
          {Object.keys(categories).map((category) => (
            <div key={category} className="mb-4">
              <h3 className="font-semibold">{category}</h3>
              {categories[category].length > 0 ? (
                categories[category].map((keyword) => (
                  <div key={keyword} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`interest-${keyword}`}
                      name="interests"
                      value={keyword}
                      checked={formData.interests.includes(keyword)}
                      onChange={() => handleCheckboxChange(category, keyword)}
                      className="mr-2"
                    />
                    <label htmlFor={`interest-${keyword}`} className="text-black">{keyword}</label>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No interests available for this category.</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Captcha</h2>
          <div className="mb-4 col-span-2 md:col-span-1">
            <label htmlFor="captcha" className="flex items-center mb-2">
              Captcha: 3 + 1 = ?
            </label>
            <input
              type="text"
              id="captcha"
              name="captcha"
              value={formData.captcha}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 text-black"
              required
            />
          </div>
        </div>

        <button type="submit" className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-700">Subscribe</button>
      </form>
    </div>
  );
};

export default SubscribeForm;
