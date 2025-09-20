import React from "react";
import TasksWidget from "./TasksWidget";
import ChatboxWidget from "./ChatboxWidget";

const Dashboard = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-6 min-h-screen font-inter">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-2 animate-gradient-x">
            CANVAI
          </h1>
          <p className="text-slate-600 text-lg font-medium">
            Your intelligent Canvas dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <TasksWidget />
          <ChatboxWidget />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
