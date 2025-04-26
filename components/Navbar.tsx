import React from 'react';
import SearchBar from './SearchBar';
import IncidentForm from './IncidentForm';

function Navbar() {
  return (
    <div className="w-full px-4 flex justify-between items-center gap-4 p-2 bg-black relative z-10">
      <div className="text-2xl font-extrabold text-amber-500">
        <span className="text-white">AI</span> Dashboard
      </div>
      
      <div className="flex-grow max-w-xl mx-4 z-50">
        <SearchBar />
      </div>
      
      <IncidentForm />
    </div>
  );
}

export default Navbar;