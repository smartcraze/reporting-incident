'use client';

import { use } from 'react';  
import { useRouter } from 'next/navigation';
import { useIncidents } from '@/components/Context';
import { Metadata } from 'next';

export default function IncidentDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);  
  const { incidents } = useIncidents();
  const router = useRouter();

  const incident = incidents.find((item) => item.id === Number(id));

  if (!incident) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Incident not found.
      </div>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High':
        return 'text-red-500';
      case 'Medium':
        return 'text-yellow-400';
      case 'Low':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-black">{incident.title}</h1>

        <p className="text-gray-700 mb-4">{incident.description}</p>

        <p className="text-sm mb-2">
          <span className="font-semibold text-gray-600">Severity: </span>
          <span className={`font-bold ${getSeverityColor(incident.severity)}`}>
            {incident.severity}
          </span>
        </p>

        <p className="text-xs text-green-500 mb-4">
          <span className="font-semibold text-gray-600">Reported at: </span>
          {incident.reported_at}
        </p>

        <button
          onClick={() => router.push('/')}
          className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
        >
          Home
        </button>
      </div>
    </>
  );
}

const metadata: Metadata = {
  title: "Incident Details",
  description: "View details of the selected incident",
};