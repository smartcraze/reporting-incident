'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useIncidents } from '@/components/Context';

export default function IncidentDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { incidents } = useIncidents();
  const router = useRouter();

  const incident = incidents.find((item) => item.id === Number(id));

  if (!incident) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <div className="text-center p-8 bg-gray-800 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Incident Not Found</h2>
          <p className="text-gray-300 mb-4">The requested incident could not be located.</p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High':
        return 'text-red-500 bg-red-100 border-red-300';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100 border-yellow-300';
      case 'Low':
        return 'text-green-600 bg-green-100 border-green-300';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.push('/')}
          className="flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-6"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </button>

        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
          <div className="p-6 border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h1 className="text-2xl font-bold text-white">{incident.title}</h1>
              <div className={`px-4 py-1.5 rounded text-sm font-medium shadow-inner ${getSeverityColor(incident.severity)}`}>
                {incident.severity}
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-8 bg-gray-750 p-5 rounded-lg border-l-4 border-blue-500">
              <h2 className="text-lg font-semibold text-gray-200 mb-3">Description</h2>
              <p className="text-gray-300 leading-relaxed">{incident.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-700 p-5 rounded-lg border-t-2 border-purple-400">
                <h3 className="text-sm uppercase tracking-wider font-medium text-gray-400 mb-2">Reported Date</h3>
                <p className="text-white font-medium text-lg">{incident.reported_at}</p>
              </div>
              
              <div className="bg-gray-700 p-5 rounded-lg border-t-2 border-cyan-400">
                <h3 className="text-sm uppercase tracking-wider font-medium text-gray-400 mb-2">Incident ID</h3>
                <p className="text-white font-medium text-lg">#{id}</p>
              </div>
            </div>
            
            
          </div>
        </div>
      </div>
    </div>
  );
}