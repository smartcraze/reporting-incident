import React from 'react';

import Navbar from './Navbar';
import IncidentTable from './IncidentTable';
import Analytics from './Analytics';

function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen p-4 gap-6">
      <Navbar />

      <Analytics />

      <IncidentTable />
    </div>
  );
}

export default Dashboard;
