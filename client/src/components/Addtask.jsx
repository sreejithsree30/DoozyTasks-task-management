import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save } from "lucide-react";
import "./Addtask.css";

const Addtask = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo",
    dueDate: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.status) newErrors.status = "Status is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      const data = await response.json();
      console.log("Task created:", data);
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong while creating the task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addtask-container">
      <div className="header">
        <button className="back-button" onClick={() => navigate("/")}> ← Back to Tasks</button>
        <h2>Create New Task</h2>
        <p>Add a new task to your workflow</p>
      </div>

      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            placeholder="Enter task title..."
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className={errors.title ? "error" : ""}
          />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            rows="4"
            placeholder="Enter task description..."
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Status *</label>
          <select
            value={formData.status}
            onChange={(e) => handleInputChange("status", e.target.value)}
            className={errors.status ? "error" : ""}
          >
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          {errors.status && <span className="error-text">{errors.status}</span>}
        </div>

        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => handleInputChange("dueDate", e.target.value)}
          />
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={() => navigate("/")}>Cancel</button>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Creating..." : (
              <>
                <Save size={16} style={{ marginRight: "6px" }} />
                Create Task
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addtask;