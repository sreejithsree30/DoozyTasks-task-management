import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import Addtask from "./components/Addtask"
import EditTask from "./components/Edittask"
import Home from "./components/Home"
import Navbar from "./components/Navbar"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<Addtask />} />
        <Route path={`/edit/:id`} element={<EditTask />} />
      </Routes>
    </Router>
  )
}

export default App
