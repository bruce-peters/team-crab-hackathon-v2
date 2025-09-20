import React from "react";
import TasksWidget from "./TasksWidget";
import ChatboxWidget from "./ChatboxWidget";

const Dashboard = () => {
  return (
    <div style={{ padding: "0px", fontFamily: "Arial, sans-serif" }}>
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#333",
          fontSize: "24px",
        }}
      >
        CANVAI
      </h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <TasksWidget />
        <ChatboxWidget />
      </div>
    </div>
  );
};

export default Dashboard;
