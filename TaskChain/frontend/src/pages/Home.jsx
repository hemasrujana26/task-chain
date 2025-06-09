import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to TaskChain</h1>
      <p className="text-lg mb-8">A decentralized task board for ETH/USD price fetching</p>
      <div className="space-x-4">
        <Link to="/taskboard" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          View Task Board
        </Link>
        <Link to="/agent-status" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Agent Status
        </Link>
      </div>
    </div>
  );
};

export default Home; 