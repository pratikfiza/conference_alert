import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Continents() {
  const [categorizedCountries, setCategorizedCountries] = useState({});
  const [openRegion, setOpenRegion] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/countries`)
      .then(response => response.json())
      .then(data => {
        categorizeCountries(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const categorizeCountries = (countries) => {
    const categories = countries.reduce((acc, country) => {
      if (!acc[country.region]) {
        acc[country.region] = [];
      }
      acc[country.region].push(country);
      return acc;
    }, {});
    setCategorizedCountries(categories);

    // Set all regions to open by default
    const initialOpenRegions = Object.keys(categories).reduce((acc, region) => {
      acc[region] = true;
      return acc;
    }, {});
    setOpenRegion(initialOpenRegions);
  };

  const toggleRegion = (region) => {
    setOpenRegion(prevState => ({
      ...prevState,
      [region]: !prevState[region]
    }));
  };

  const handleSearch = (selectedCountry) => {
    const params = new URLSearchParams();
    if (selectedCountry) params.append('country', selectedCountry);

    axios.get(`${process.env.REACT_APP_API_URL}/search?${params.toString()}`)
      .then(response => {
        navigate('/search-results', { state: { events: response.data } });
      })
      .catch(error => console.error('Error performing search:', error));
  };

  return (
    <div className="App container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Countries Categorized by Continent</h1>
      {Object.keys(categorizedCountries).map(region => (
        <div key={region} className="mb-4 border-b-2 pb-2">
          <div
            className="cursor-pointer text-2xl font-semibold text-blue-700 hover:text-blue-900 flex justify-between items-center"
            onClick={() => toggleRegion(region)}
          >
            <span>{region}</span>
            <span>{openRegion[region] ? '-' : '+'}</span>
          </div>
          <ul
            className={`mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-hidden transition-max-height duration-500 ease-in-out ${
              openRegion[region] ? 'max-h-screen' : 'max-h-0'
            }`}
          >
            {categorizedCountries[region].map(country => (
              <li
                key={country.id}
                className="bg-gray-200 p-4 rounded hover:bg-gray-300 transition-colors duration-300"
                onClick={(e)=>{
                    e.preventDefault();
                    handleSearch(country.country)}}
              >
                {country.country}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Continents;
