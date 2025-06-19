import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import "./EditTask.css";

const EditTask = () => {
  const navigate = useNavigate();
  const { id: taskId } = useParams();
  const API_URL = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [task, setTask] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo",
    dueDate: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`${API_URL}/api/tasks/${taskId}`);
        if (!res.ok) throw new Error("Task not found");

        const data = await res.json();
        setTask(data);
        setFormData({
          title: data.title || "",
          description: data.description || "",
          status: data.status || "todo",
          dueDate: data.dueDate ? data.dueDate.slice(0, 10) : "",
        });
      } catch (err) {
        console.error("Fetch error:", err);
        setTask(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId, API_URL]);

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

    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update task");
      navigate("/dashboard");
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update the task.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    setDeleting(true);
    try {
      const res = await fetch(`${API_URL}/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete task");
      navigate("/dashboard");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete the task.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <div className="loading">Loading task...</div>;

  if (!task) {
    return (
      <div className="not-found">
        <h2>Task Not Found</h2>
        <p>This task does not exist or was removed.</p>
        <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="edit-task-container">
      <div className="header">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          <ArrowLeft size={18} /> Back
        </button>
        <h1>Edit Task</h1>
        <p>Update task information below</p>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className={errors.title ? "error" : ""}
          />
          {errors.title && <span className="error-msg">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows="4"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status *</label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) => handleInputChange("status", e.target.value)}
            className={errors.status ? "error" : ""}
          >
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          {errors.status && <span className="error-msg">{errors.status}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            id="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={(e) => handleInputChange("dueDate", e.target.value)}
          />
        </div>

        <div className="actions">
          <button
            type="button"
            className="delete-btn"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : <><Trash2 size={16} /> Delete</>}
          </button>
          <div>
            <button type="button" onClick={() => navigate("/dashboard")}>Cancel</button>
            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : <><Save size={16} /> Save Changes</>}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
