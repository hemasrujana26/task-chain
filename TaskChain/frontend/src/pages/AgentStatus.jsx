import React, { useState, useEffect } from 'react';
import AgentLog from '../components/AgentLog';

const AgentStatus = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Simulate fetching logs from a backend or WebSocket
    const mockLogs = [
      'Agent started',
      'New task 0, fetching price...',
      'Submitted result for task 0: 2000.00000000',
      'Verified and paid for task 0',
    ];
    setLogs(mockLogs);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Agent Status</h1>
      <AgentLog logs={logs} />
    </div>
  );
};

export default AgentStatus; 