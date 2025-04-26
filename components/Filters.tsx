'use client';
import React from 'react';

interface FiltersProps {
  selectedSeverity: string;
  onSeverityChange: (severity: string) => void;
  selectedSortOrder: string;
  onSortOrderChange: (order: string) => void;
}

export default function Filters({
  selectedSeverity,
  onSeverityChange,
  selectedSortOrder,
  onSortOrderChange,
}: FiltersProps) {
  return (
    <div className="flex gap-6 mb-6 justify-center text-black">
      
      <div className="flex flex-col">
        <label className="mb-1 text-gray-600 font-semibold ">Filter by Severity:</label>
        <select
          value={selectedSeverity}
          onChange={(e) => onSeverityChange(e.target.value)}
          className="p-2 rounded border border-gray-300 bg-amber-700"
        >
          <option value="All">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

    
      <div className="flex flex-col ">
        <label className="mb-1 text-gray-600 font-semibold">Sort by Date:</label>
        <select
          value={selectedSortOrder}
          onChange={(e) => onSortOrderChange(e.target.value)}
          className="p-2 rounded border border-gray-300 bg-amber-700 "
        >
          <option value="Newest">Newest First</option>
          <option value="Oldest">Oldest First</option>
        </select>
      </div>
    </div>
  );
}
