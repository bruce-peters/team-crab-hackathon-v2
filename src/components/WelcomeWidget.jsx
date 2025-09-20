import React from 'react';

const WelcomeWidget = () => {
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-blue-500 text-white p-4 rounded-lg text-center">
      <h3 className="text-xl font-bold mb-2">Welcome Back!</h3>
      <p className="mb-1">Current time: {getCurrentTime()}</p>
      <p className="text-blue-100">Have a productive day on Canvas!</p>
    </div>
  );
};

export default WelcomeWidget;