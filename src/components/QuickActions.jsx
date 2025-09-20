import React from 'react';

const QuickActions = () => {
  const handleAction = (action) => {
    alert(`${action} functionality would be implemented here`);
  };

  return (
    <div className="bg-gray-600 text-white p-4 rounded-lg">
      <h3 className="text-xl font-bold mb-4 text-center">Quick Actions</h3>
      <div className="space-y-3">
        <button 
          onClick={() => handleAction('View Grades')}
          className="w-full bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded transition-colors"
        >
          View Grades
        </button>
        <button 
          onClick={() => handleAction('Check Calendar')}
          className="w-full bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded transition-colors"
        >
          Check Calendar
        </button>
        <button 
          onClick={() => handleAction('Messages')}
          className="w-full bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded transition-colors"
        >
          Messages
        </button>
      </div>
    </div>
  );
};

export default QuickActions;