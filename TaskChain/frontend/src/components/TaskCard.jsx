import React from 'react';

const TaskCard = ({ task }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold">Task #{task.id}</h3>
      <p>User: {task.user}</p>
      <p>Reward: {task.reward} TASK</p>
      <p>Status: {task.status}</p>
      {task.submittedPrice && <p>Submitted Price: {task.submittedPrice}</p>}
      {task.agent && <p>Agent: {task.agent}</p>}
    </div>
  );
};

export default TaskCard; 