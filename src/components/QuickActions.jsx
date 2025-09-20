import React from 'react';

const QuickActions = () => {
  const handleAction = (action) => {
    alert(`${action} clicked! This is a demo.`);
  };

  return (
    <div style={{
      backgroundColor: '#6c757d',
      color: 'white',
      padding: '15px',
      borderRadius: '6px'
    }}>
      <h3 style={{ margin: '0 0 15px 0', textAlign: 'center' }}>Quick Actions</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button 
          onClick={() => handleAction('View Grades')}
          style={{
            backgroundColor: '#495057',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          View Grades
        </button>
        <button 
          onClick={() => handleAction('Check Calendar')}
          style={{
            backgroundColor: '#495057',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Check Calendar
        </button>
        <button 
          onClick={() => handleAction('Messages')}
          style={{
            backgroundColor: '#495057',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Messages
        </button>
      </div>
    </div>
  );
};

export default QuickActions;