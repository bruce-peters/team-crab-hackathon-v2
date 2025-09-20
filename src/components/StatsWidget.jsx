import React from 'react';

const StatsWidget = () => {
  return (
    <div className="bg-green-500 text-white p-4 rounded-lg text-center">
      <h3 className="text-xl font-bold mb-4">Quick Stats</h3>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <div className="text-2xl font-bold">5</div>
          <div className="text-sm text-green-100">Active Courses</div>
        </div>
        <div>
          <div className="text-2xl font-bold">12</div>
          <div className="text-sm text-green-100">Assignments</div>
        </div>
        <div>
          <div className="text-2xl font-bold">3</div>
          <div className="text-sm text-green-100">Due Soon</div>
        </div>
      </div>
    </div>
  );
};

export default StatsWidget;