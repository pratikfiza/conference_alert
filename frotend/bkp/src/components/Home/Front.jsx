import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

export default function Front() {
  const [countries, setCountries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCategoryID, setSelectedCategoryID] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const navigate = useNavigate();

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
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedCountry) params.append('country', selectedCountry);
    if (selectedCategory) params.append('category', selectedCategory);
    if (selectedTopic) params.append('topic', selectedTopic);

    if (!params.toString()) {
      alert('Please select at least one search criteria.');
      return;
    }

    axios.get(`${process.env.REACT_APP_API_URL}/search?${params.toString()}`)
      .then(response => {
        navigate('/search-results', { state: { events: response.data } });
      })
      .catch(error => console.error('Error performing search:', error));
  };

  return (
    <section className="z-10">
      <div className="w-full sm:w-11/12 mx-auto">
        <div className="py-8 sm:rounded-3xl relative w-full md:h-[20vh]  bg-black bg-cover lg:bg-center bg-no-repeat bg-left flex items-center justify-center">
          <video 
            src='bg.mp4'
            autoPlay
            loop
            muted
            className="absolute z-0 w-full h-full object-cover"
          />
          <div className="flex items-center z-50 justify-center flex-wrap gap-4">
            <form className="flex items-end gap-4 flex-wrap w-full px-4 sm:px-0" onSubmit={handleSearch}>
              <select
                className="bg-white px-2 py-3 w-full sm:w-48 font-bold text-sm text-black rounded-md ring-1 ring-gray-300 focus:ring-2 focus:outline-none focus:ring-orange-500"
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
                className="bg-white px-2 py-3 w-full sm:w-48 font-bold text-sm text-black rounded-md ring-1 ring-gray-300 focus:ring-2 focus:outline-none focus:ring-orange-500"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedCategoryID(categories.find(cat => cat.category === e.target.value).id);
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
                className="bg-white px-2 py-3 w-full sm:w-48 font-bold text-sm text-black rounded-md ring-1 ring-gray-300 focus:ring-2 focus:outline-none focus:ring-orange-500"
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
              <button className="bg-[#034F75] px-3 py-3 flex items-center justify-center w-full sm:w-28 font-bold uppercase text-sm text-white hover:bg-green-600 rounded-md">
                <FiSearch className="mr-1" /> Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
