'use client';

import { useRouter } from 'next/navigation';
import { useIncidents } from './Context';

export default function SearchBar() {
  const { searchTerm, setSearchTerm, filteredResults } = useIncidents();
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleIncidentClick = (id: number) => {
    router.push(`/incident/${id}`);
    setSearchTerm('');
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const getSeverityClass = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'low':
        return 'text-green-600';
      case 'medium':
        return 'text-yellow-600';
      case 'high':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto relative">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search incidents..."
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {searchTerm && (
          <button
            onClick={handleClearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600 transition"
          >
            Clear
          </button>
        )}
      </div>

      {/* Make the search results absolute and float over the page */}
      {searchTerm && (
        <div className="absolute top-full mt-2 w-full bg-white rounded shadow-lg max-h-64 overflow-y-auto z-50">
          {filteredResults.length === 0 ? (
            <p className="text-center text-gray-500 p-2">No incidents found.</p>
          ) : (
            filteredResults.map((incident) => (
              <div
                key={incident.id}
                onClick={() => handleIncidentClick(incident.id)}
                className="border-b border-gray-200 py-2 px-3 cursor-pointer hover:bg-gray-100 transition"
              >
                <h3 className="text-md text-black font-semibold">{incident.title}</h3>
                <p className="text-sm text-gray-600">{incident.description}</p>
                <p className={`text-xs font-bold ${getSeverityClass(incident.severity)}`}>
                  {incident.severity}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
