'use client';
import React, { useState } from 'react';
import Pagination from './Pagination';
import { useIncidents } from './Context';
import Filters from './Filters'; // 👈 Import new Filters component

const ITEMS_PER_PAGE = 5;

export default function IncidentTable() {
  const { incidents } = useIncidents();
  const data = incidents;

  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const [selectedSortOrder, setSelectedSortOrder] = useState('Newest');

  // Step 1: Filter
  let filteredData = selectedSeverity === 'All'
    ? [...data]
    : data.filter(incident => incident.severity.toLowerCase() === selectedSeverity.toLowerCase());

  // Step 2: Sort
  filteredData.sort((a, b) => {
    const dateA = new Date(a.reported_at).getTime();
    const dateB = new Date(b.reported_at).getTime();
    if (selectedSortOrder === 'Newest') {
      return dateB - dateA; // Newest first
    } else {
      return dateA - dateB; // Oldest first
    }
  });

  // Step 3: Paginate
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleExpand = (id: number) => {
    setExpandedRow(prev => (prev === id ? null : id));
  };

  const getSeverityBackground = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'low':
        return 'bg-green-200';   
      case 'medium':
        return 'bg-yellow-200';  
      case 'high':
        return 'bg-red-200';     
      default:
        return 'bg-gray-200';   
    }
  };

  const getSeverityTextColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'low':
        return 'text-green-700';
      case 'medium':
        return 'text-yellow-700';
      case 'high':
        return 'text-red-700';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* 👇 Add Filters component */}
      <Filters
        selectedSeverity={selectedSeverity}
        onSeverityChange={(severity) => {
          setSelectedSeverity(severity);
          setCurrentPage(1);
        }}
        selectedSortOrder={selectedSortOrder}
        onSortOrderChange={(order) => {
          setSelectedSortOrder(order);
          setCurrentPage(1);
        }}
      />

      <div className="w-[80%] overflow-x-auto">
        <table className="min-w-full text-sm text-left border border-gray-300 rounded-xl shadow-lg">
          <thead className="bg-gray-200 text-amber-500">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Severity</th>
              <th className="p-4">Reported Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((incident) => (
              <React.Fragment key={incident.id}>
                <tr className={`${getSeverityBackground(incident.severity)} border-t border-gray-300 transition-all`}>
                  <td className="p-4 text-gray-800">{incident.title}</td>
                  <td className={`p-4 font-semibold ${getSeverityTextColor(incident.severity)}`}>
                    {incident.severity}
                  </td>
                  <td className="p-4 text-gray-800">{new Date(incident.reported_at).toLocaleDateString()}</td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleExpand(incident.id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                      {expandedRow === incident.id ? 'Hide' : 'Expand'}
                    </button>
                  </td>
                </tr>

                {expandedRow === incident.id && (
                  <tr className="bg-gray-100">
                    <td className="p-4 text-gray-800" colSpan={4}>
                      <p><strong>Description:</strong> {incident.description}</p>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center mt-4">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </div>
    </div>
  );
}
