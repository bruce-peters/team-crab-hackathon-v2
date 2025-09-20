import React from 'react';
import WelcomeWidget from './WelcomeWidget';
import StatsWidget from './StatsWidget';
import QuickActions from './QuickActions';

const Dashboard = () => {
  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      border: '1px solid #dee2e6',
      borderRadius: '8px',
      padding: '20px',
      margin: '10px 0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{
        color: '#2c3e50',
        marginTop: '0',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        Canvas Dashboard Extension
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '15px'
      }}>
        <WelcomeWidget />
        <StatsWidget />
        <QuickActions />
      </div>
    </div>
  );
};

export default Dashboard;