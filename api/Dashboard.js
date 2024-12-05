import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    axios.get('https://pacer-sim.vercel.app/api/cases')
      .then((response) => setCases(response.data))
      .catch((error) => console.error('Error fetching cases:', error));
  }, []);

  return (
    <div>
      <h1>Judicial Dashboard</h1>
      <ul>
        {cases.map((c) => (
          <li key={c.id}>
            {c.case_name} - {c.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
