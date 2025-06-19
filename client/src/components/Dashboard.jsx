import React, { useEffect, useState } from 'react';
import { Clock, Circle, PlayCircle, CheckCircle, Plus ,Edit, Trash } from 'lucide-react';
import { Link } from 'react-router-dom'; 
import './Dashboard.css';

const Dashboard = () => {
  const [filter, setFilter] = useState("all");
  const [filteredTask, setFilteredTask] = useState([]);
  const [allTask, setAllTask] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks`);
        const data = await res.json();
        setAllTask(data);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    if (filter === "all") setFilteredTask(allTask);
    else setFilteredTask(allTask.filter((task) => task.status === filter));
  }, [filter, allTask]);

  const handleDeleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, {
          method: "DELETE",
        });
        setAllTask(prev => prev.filter(task => task._id !== id));
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete task.");
      }
    }
  };

  const countByStatus = (status) => allTask.filter(t => t.status === status).length;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="main-title">Task Manager</h1>
        <p className="subtitle">Organize your work and stay productive</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div>
            <p>Total Tasks</p>
            <h2>{allTask.length}</h2>
          </div>
          <Clock />
        </div>
        <div className="stat-card">
          <div>
            <p>To Do</p>
            <h2>{countByStatus("todo")}</h2>
          </div>
          <Circle />
        </div>
        <div className="stat-card">
          <div>
            <p>In Progress</p>
            <h2>{countByStatus("in_progress")}</h2>
          </div>
          <PlayCircle />
        </div>
        <div className="stat-card">
          <div>
            <p>Completed</p>
            <h2>{countByStatus("done")}</h2>
          </div>
          <CheckCircle />
        </div>
      </div>

      <div className="toolbar">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Tasks</option>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Completed</option>
        </select>
        <span>Showing tasks</span>

        <Link to="/add">
          <button className="add-task-btn">
            <Plus size={16} /> Add Task
          </button>
        </Link>
      </div>

      {filteredTask.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        filteredTask.map((task) => (
          <div key={task._id} className="task-card">
            <h2>{task.title}</h2>
            <div>
              <Link to={`/edit/${task._id}`}><button><Edit /></button></Link>
              <button onClick={() => handleDeleteTask(task._id)}><Trash /></button>
            </div>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            {task.dueDate && <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>}
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
