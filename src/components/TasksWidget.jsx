import React, { useState, useEffect } from 'react';

const TasksWidget = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get tasks from service worker
    const fetchTasks = async () => {
      try {
        if (chrome?.runtime?.sendMessage) {
          chrome.runtime.sendMessage({ action: 'getTasks' }, (response) => {
            if (response?.tasks) {
              setTasks(response.tasks);
            }
            setLoading(false);
          });
        } else {
          // Fallback for development/testing
          setTasks([
            { id: 1, title: "Review assignment feedback", priority: "high", dueDate: "Today" },
            { id: 2, title: "Complete Module 3 quiz", priority: "medium", dueDate: "Tomorrow" }
          ]);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return (
      <div style={{
        backgroundColor: '#17a2b8',
        color: 'white',
        padding: '15px',
        borderRadius: '6px',
        textAlign: 'center'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>Tasks</h3>
        <p style={{ margin: '0' }}>Loading tasks...</p>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: '#17a2b8',
      color: 'white',
      padding: '15px',
      borderRadius: '6px'
    }}>
      <h3 style={{ margin: '0 0 15px 0', textAlign: 'center' }}>Tasks</h3>
      <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {tasks.length === 0 ? (
          <p style={{ margin: '0', textAlign: 'center', opacity: '0.9' }}>
            No tasks available
          </p>
        ) : (
          tasks.map(task => (
            <div key={task.id} style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              padding: '8px',
              marginBottom: '8px',
              borderRadius: '4px',
              borderLeft: `4px solid ${getPriorityColor(task.priority)}`
            }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
                {task.title}
              </div>
              <div style={{ fontSize: '12px', opacity: '0.9' }}>
                Due: {task.dueDate} • Priority: {task.priority}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TasksWidget;