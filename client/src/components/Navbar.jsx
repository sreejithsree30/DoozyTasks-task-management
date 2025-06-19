import React from "react"
import { Link, useLocation } from "react-router-dom"
import { User } from "lucide-react"
import "./Navbar.css"

const Navbar = () => {
  const { pathname } = useLocation()

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="nav-link"><h2 className="site-name">DoozyTasks</h2></Link>
      </div>
      <div className="navbar-right">
        <div className="nav-links">
          <Link to="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>Home</Link>
          <Link to="/dashboard" className={`nav-link ${pathname === "/dashboard" ? "active" : ""}`}>Dashboard</Link>
          <Link to="/add" className={`nav-link ${pathname === "/add" ? "active" : ""}`}>Add Task</Link>
        </div>
        <div className="account-icon">
          <User size={22} />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
