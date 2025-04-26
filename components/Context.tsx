'use client';

import { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';
import mock_data from '@/data/mock_data.json';

interface Incident {
  id: number;
  title: string;
  description: string;
  severity: string;
  reported_at: string;
}

interface IncidentContextType {
  incidents: Incident[];
  addIncident: (incident: Incident) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filteredResults: Incident[];
}

const IncidentContext = createContext<IncidentContextType | undefined>(undefined);

export const IncidentProvider = ({ children }: { children: ReactNode }) => {
  const [incidents, setIncidents] = useState<Incident[]>(mock_data);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState<Incident[]>([]);

  const addIncident = (incident: Incident) => {
    setIncidents(prev => [...prev, incident]);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim() === '') {
        setFilteredResults([]);
      } else {
        const filtered = incidents.filter(incident =>
          incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          incident.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredResults(filtered);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, incidents]);

  const memoizedResults = useMemo(() => filteredResults, [filteredResults]);

  return (
    <IncidentContext.Provider value={{ incidents, addIncident, searchTerm, setSearchTerm, filteredResults: memoizedResults }}>
      {children}
    </IncidentContext.Provider>
  );
};

export const useIncidents = () => {
  const context = useContext(IncidentContext);
  if (!context) {
    throw new Error('useIncidents must be used within an IncidentProvider');
  }
  return context;
};
