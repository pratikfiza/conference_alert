import React from 'react';

const CountryList = ({ title, countries }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 border-b-2 border-gray-300 pb-2">{title}</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {countries.map((country, index) => (
          <li
            key={index}
            className="text-sm text-center bg-[#034F75] text-white font-bold rounded-lg p-2 transition-colors duration-300 hover:bg-gray-200 hover:text-black cursor-pointer"
          >
            {country}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;