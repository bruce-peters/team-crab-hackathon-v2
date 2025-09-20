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
            { id: 2, title: "Complete Module 3 quiz", priority: "medium", dueDate: "Tomorrow" },
            { id: 3, title: "Submit research paper", priority: "high", dueDate: "Friday" }
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

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'high': 
        return {
          borderColor: 'border-red-400',
          bgColor: 'bg-red-50',
          textColor: 'text-red-700',
          badge: 'bg-red-100 text-red-800'
        };
      case 'medium': 
        return {
          borderColor: 'border-yellow-400',
          bgColor: 'bg-yellow-50',
          textColor: 'text-yellow-700',
          badge: 'bg-yellow-100 text-yellow-800'
        };
      case 'low': 
        return {
          borderColor: 'border-green-400',
          bgColor: 'bg-green-50',
          textColor: 'text-green-700',
          badge: 'bg-green-100 text-green-800'
        };
      default: 
        return {
          borderColor: 'border-gray-400',
          bgColor: 'bg-gray-50',
          textColor: 'text-gray-700',
          badge: 'bg-gray-100 text-gray-800'
        };
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 h-fit">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          <h3 className="text-xl font-semibold text-slate-800">Tasks</h3>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-slate-600">Loading tasks...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 h-fit hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          <h3 className="text-xl font-semibold text-slate-800">Tasks</h3>
        </div>
        <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
          {tasks.length} items
        </span>
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {tasks.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-slate-500 text-sm">No tasks available</p>
          </div>
        ) : (
          tasks.map(task => {
            const styles = getPriorityStyle(task.priority);
            return (
              <div 
                key={task.id} 
                className={`${styles.bgColor} border-l-4 ${styles.borderColor} rounded-r-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer group`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className={`font-medium ${styles.textColor} group-hover:text-slate-900 transition-colors`}>
                      {task.title}
                    </h4>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-xs text-slate-500 flex items-center space-x-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Due: {task.dueDate}</span>
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${styles.badge}`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TasksWidget;