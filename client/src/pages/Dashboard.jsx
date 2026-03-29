
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Navigation ke liye
import UploadForm from "../components/uploadForm";
import UploadedFiles from "../components/UploadedFiles";
import "../css/dashboard.css";
import background from "../assets/dashboardbackground.png";

const Dashboard = ({ darkMode, toggleDarkMode }) => {
  const [username, setUsername] = useState("");
  const navigate=useNavigate();

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);
    // 🔹 Logout function with confirmation
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      navigate("/login"); // ✅ React Router redirect
    }
  };

  return (
    <div
      className="dashboard-container"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Sidebar */}
      <aside className="sidebar">
          <h2 
          className="logo"
           style={{
             color: "#E0F7FA", // light cyan shade
             fontWeight: "bold",
             letterSpacing: "1px"
            }}
  >
   🚀AeroDrive
  </h2>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>Starred</li>
            <li>Recycle Bin</li>
            <li>Shared Files</li>
            <li>Settings</li>
            <li>Support</li>
             {/* 🔹 Logout item with click */}
            <li
              onClick={handleLogout}
              style={{
                color: "red",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Logout
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <input type="text" placeholder="Search..." />
          <div className="actions">
            <button className="create-btn">+ Create New</button>

            {/* Dark mode toggle 
            <div
              className="dark-toggle"
              onClick={toggleDarkMode}
              style={{ cursor: "pointer" }}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? "☀️" : "🌙"}
            </div>*/}

            <div className="user-profile">
              {username || "👤 Guest"}
            </div>
          </div>
        </header>

        {/* Upload + Files Section */}
        <section className="content-area">
          <div className="upload-section">
            <UploadForm />
          </div>

          <div className="files-section">
            <UploadedFiles />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
