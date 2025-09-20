import React from 'react';

const WelcomeWidget = () => {
  const currentTime = new Date().toLocaleTimeString();
  
  return (
    <div style={{
      backgroundColor: '#4a76b2',
      color: 'white',
      padding: '15px',
      borderRadius: '6px',
      textAlign: 'center'
    }}>
      <h3 style={{ margin: '0 0 10px 0' }}>Welcome Back!</h3>
      <p style={{ margin: '0' }}>Current time: {currentTime}</p>
      <p style={{ margin: '5px 0 0 0', fontSize: '14px', opacity: '0.9' }}>
        Have a productive day on Canvas!
      </p>
    </div>
  );
};

export default WelcomeWidget;