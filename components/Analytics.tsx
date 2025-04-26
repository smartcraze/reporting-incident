'use client';

import React from 'react';
import { useIncidents } from './Context';

function Analytics() {
  const { incidents } = useIncidents();

  const severityCounts = incidents.reduce(
    (acc, incident) => {
      const severity = incident.severity.toLowerCase();
      if (severity === 'low') acc.low += 1;
      else if (severity === 'medium') acc.medium += 1;
      else if (severity === 'high') acc.high += 1;
      return acc;
    },
    { low: 0, medium: 0, high: 0 }
  );

  return (
    <div className="w-full flex flex-col items-center justify-center mb-8">
      

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        
        <div className="bg-green-500/20 backdrop-blur-md p-6 rounded-xl shadow-md flex flex-col items-center border border-green-300/30">
          <h3 className="text-xl font-semibold text-green-300 mb-2">Low Severity</h3>
          <p className="text-4xl font-bold text-white">{severityCounts.low}</p>
        </div>

        <div className="bg-yellow-500/20 backdrop-blur-md p-6 rounded-xl shadow-md flex flex-col items-center border border-yellow-300/30">
          <h3 className="text-xl font-semibold text-yellow-300 mb-2">Medium Severity</h3>
          <p className="text-4xl font-bold text-white">{severityCounts.medium}</p>
        </div>

        <div className="bg-red-500/20 backdrop-blur-md p-6 rounded-xl shadow-md flex flex-col items-center border border-red-300/30">
          <h3 className="text-xl font-semibold text-red-300 mb-2">High Severity</h3>
          <p className="text-4xl font-bold text-white">{severityCounts.high}</p>
        </div>
      </div>
    </div>
  );
}

export default Analytics;