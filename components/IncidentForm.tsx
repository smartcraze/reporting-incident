'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useIncidents } from './Context';

export default function IncidentForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('Low');

  const { addIncident } = useIncidents();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description) {
      toast.error('All fields are required!');
      return;
    }

    const newIncident = {
      id: Date.now(),
      title,
      description,
      severity,
      reported_at: new Date().toISOString(),
    };

    addIncident(newIncident);

    // clean up the form
    setTitle('');
    setDescription('');
    setSeverity('Low');
    setIsOpen(false); // close modal after submit

    toast.success('Incident reported successfully!');
  };

  return (
    <div className="">
     
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow-md transition-transform hover:scale-105 mr-6"
      >
        Report Incident
      </button>

     
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-20 backdrop-blur-sm z-50" >
          
          
          <div className="bg-slate-200 text-black rounded-xl p-8 shadow-lg w-full max-w-sm transform transition-all duration-300 scale-100">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Report New Incident</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter incident title"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter incident description"
                  rows={4}
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Severity</label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
