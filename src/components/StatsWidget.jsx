import React from 'react';

const StatsWidget = () => {
  return (
    <div style={{
      backgroundColor: '#28a745',
      color: 'white',
      padding: '15px',
      borderRadius: '6px',
      textAlign: 'center'
    }}>
      <h3 style={{ margin: '0 0 10px 0' }}>Quick Stats</h3>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>5</div>
          <div style={{ fontSize: '12px' }}>Active Courses</div>
        </div>
        <div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>12</div>
          <div style={{ fontSize: '12px' }}>Assignments</div>
        </div>
        <div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>3</div>
          <div style={{ fontSize: '12px' }}>Due Soon</div>
        </div>
      </div>
    </div>
  );
};

export default StatsWidget;