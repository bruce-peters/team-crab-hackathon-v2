import React from "react";
import WelcomeWidget from "./WelcomeWidget";
import StatsWidget from "./StatsWidget";
import QuickActions from "./QuickActions";
import React from "react";
import WelcomeWidget from "./WelcomeWidget";
import StatsWidget from "./StatsWidget";
import QuickActions from "./QuickActions";
import TasksWidget from "./TasksWidget";

const Dashboard = () => {
  return (
    <div className="bg-gray-100 border border-gray-300 rounded-lg p-5 my-2 shadow-md font-sans">
      <h2 className="text-gray-800 mt-0 mb-5 text-center text-xl font-semibold">
        Canvas Dashboard Extension
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <TasksWidget />
      </div>
    </div>
  );
};

export default Dashboard;

