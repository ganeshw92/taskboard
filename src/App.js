import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/Topbar/Topbar";
import TaskBoard from "./components/TaskBoard/TaskBoard";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="content">
        <Topbar />
        <TaskBoard />
      </div>
    </div>
  );
}

export default App;
