// components/ResultsScreen.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiSearch, FiCalendar, FiMapPin } from 'react-icons/fi';

export default function ResultsScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const { events } = location.state || { events: [] };

  const [searchResults, setSearchResults] = useState(events);
  const [countries, setCountries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCategoryID, setSelectedCategoryID] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');

  useEffect(() => {
    // Fetch countries
    axios.get(`${process.env.REACT_APP_API_URL}/countries`)
      .then(response => setCountries(response.data))
      .catch(error => console.error('Error fetching countries:', error));

    // Fetch categories
    axios.get(`${process.env.REACT_APP_API_URL}/event_cat`)
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  useEffect(() => {
    // Fetch topics based on selected category ID
    if (!selectedCategoryID) return;
    axios.get(`${process.env.REACT_APP_API_URL}/event_cat/${selectedCategoryID}/event-topics`)
      .then(response => setTopics(response.data))
      .catch(error => console.error('Error fetching topics:', error));
  }, [selectedCategoryID]);

  const handleSearch = (e) => {
    setSearchResults([]);
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedCountry) params.append('country', selectedCountry);
    if (selectedCategory) params.append('category', selectedCategory);
    if (selectedTopic) params.append('topic', selectedTopic);

    axios.get(`${process.env.REACT_APP_API_URL}/search?${params.toString()}`)
      .then(response => {
        setSearchResults(response.data);
      })
      .catch(error => console.error('Error performing search:', error));
  };

  const handleEventClick = (event) => {
    navigate('/event-details', { state: { event } });
  };

  return (
    <div className="container mx-auto p-4 min-h-[80vh]">
      <h1 className="text-3xl font-bold text-center mb-8">Search Results</h1>

      <form className="flex items-end justify-center gap-4 flex-wrap mb-4" onSubmit={handleSearch}>
        <select
          className="bg-white px-2 py-3 w-48 font-bold text-sm text-black rounded-md ring-1 ring-gray-300 focus:ring-2 focus:outline-none focus:ring-orange-500"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="">Choose a Country</option>
          {countries.map(country => (
            <option key={country.id} value={country.country}>
              {country.country}
            </option>
          ))}
        </select>
        <select
          className="bg-white px-2 py-3 w-48 font-bold text-sm text-black rounded-md ring-1 ring-gray-300 focus:ring-2 focus:outline-none focus:ring-orange-500"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            const selectedCategoryObj = categories.find(category => category.category === e.target.value);
            setSelectedCategoryID(selectedCategoryObj.id);
            
          }}
        >
          <option value="">Choose a Category</option>
          {categories.map(category => (
            <option key={category.id} value={category.category}>
              {category.category}
            </option>
          ))}
        </select>
        <select
          className="bg-white px-2 py-3 w-48 font-bold text-sm text-black rounded-md ring-1 ring-gray-300 focus:ring-2 focus:outline-none focus:ring-orange-500"
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
        >
          <option value="">Choose a Topic</option>
          {topics.map(topic => (
            <option key={topic.topic_id} value={topic.topic}>
              {topic.topic}
            </option>
          ))}
        </select>
        <button className="bg-orange-500 px-2 py-3 w-24 flex items-center justify-around font-bold uppercase text-sm text-white hover:bg-orange-700 rounded-md">
          <FiSearch className="mr-2" /> Search
        </button>
      </form>

      {searchResults.length === 0 ? (
        <p className="text-center text-gray-500">No events found.</p>
      ) : (
        <ul className="list-none">
          {searchResults.map(event => (
            <li
              key={event.event_id}
              className="border p-4 rounded shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer mb-4"
              onClick={() => handleEventClick(event)}
            >
              <div className="flex items-center justify-start space-x-4">
                <div className="flex items-center text-gray-600">
                  <FiCalendar className="mr-1" />
                  <span className="text-xl font-bold">{new Date(event.event_stat).toLocaleDateString()}</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">{event.event_name}</h2>
                  <p className="flex items-center text-gray-600"><FiMapPin className="mr-1" /> {event.city}, {event.country}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
