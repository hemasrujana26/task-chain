import React from 'react';

const AgentLog = ({ logs }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Agent Logs</h3>
      <div className="space-y-2">
        {logs.map((log, index) => (
          <div key={index} className="text-sm text-gray-700">
            {log}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentLog; 