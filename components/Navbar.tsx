import React from 'react';
import SearchBar from './SearchBar';
import IncidentForm from './IncidentForm';

function Navbar() {
  return (
    <div className="w-full px-4 flex justify-center md:flex-row items-center gap-4 mt-3 p-2 backdrop-blur-md  shadow-lg">
    
      <div className="text-2xl font-extrabold text-amber-500">
        <span className="text-gray-100">AI</span> Dashboard
      </div>

      
        <SearchBar />
        <IncidentForm />
     
    </div>
  );
}

export default Navbar;
