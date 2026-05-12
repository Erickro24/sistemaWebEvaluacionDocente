import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

import {
  FaUsers,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaHome,
  FaChartBar,
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
  FaSearch,
  FaBell,
  FaUserCircle,
  FaDatabase,
  FaClipboardList,
  FaMoon,
  FaSun
} from "react-icons/fa";

import "./dashboardAdmin.css";

const DashboardAdmin = () => {
  const navigate = useNavigate();

  const [theme, setTheme] = useState(
    localStorage.getItem("dashboardTheme") || "dark"
  );

  const [stats, setStats] = useState({
    usuarios: 0,
    docentes: 0,
    estudiantes: 0
  });

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("/admin/dashboard");
        setStats(response.data.stats);
      } catch (error) {
        console.error("Error al cargar dashboard:", error);
      }
    };

    fetchDashboard();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    setTheme(newTheme);
    localStorage.setItem("dashboardTheme", newTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div
      className={`admin-dashboard ${
        theme === "light" ? "light-theme" : "dark-theme"
      }`}
    >
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div>
          <div className="sidebar-brand">
            <div className="brand-icon">
              <FaDatabase />
            </div>

            <div>
              <h3>ESMA</h3>
              <span>Evaluación Docente</span>
            </div>
          </div>

          <nav className="sidebar-menu">
            <button className="sidebar-item active">
              <FaHome />
              Dashboard
            </button>

            <button
              className="sidebar-item"
              onClick={() => navigate("/admin/usuarios")}
            >
              <FaUsers />
              Usuarios
            </button>

            <button
              className="sidebar-item"
              onClick={() => navigate("/admin/docentes")}
            >
              <FaChalkboardTeacher />
              Docentes
            </button>

            <button
              className="sidebar-item"
              onClick={() => navigate("/admin/reportes")}
            >
              <FaFileAlt />
              Reportes
            </button>

            <button className="sidebar-item">
              <FaChartBar />
              KPI / ML
            </button>

            <button
              className="sidebar-item"
              onClick={() => navigate("/admin/configuracion")}
            >
              <FaCog />
              Configuración
            </button>
          </nav>
        </div>

        <button className="sidebar-logout" onClick={handleLogout}>
          <FaSignOutAlt />
          Cerrar sesión
        </button>
      </aside>

      {/* MAIN */}
      <main className="admin-main">
        {/* TOPBAR */}
        <header className="admin-topbar">
          <div className="search-box">
            <FaSearch />
            <input type="text" placeholder="Buscar en el sistema..." />
          </div>

          <div className="topbar-actions">
            <button
              className="icon-btn"
              onClick={toggleTheme}
              title={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            >
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </button>

            <button className="icon-btn">
              <FaBell />
            </button>

            <div className="user-chip">
              <FaUserCircle />
              {user?.nombre || "Administrador"}
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <section className="dashboard-content">
          <div className="welcome-card">
            <h1>Hola, {user?.nombre || "Administrador"} 👋</h1>

            <p>
              Panel administrativo del Sistema Web de Evaluación Docente basado
              en Machine Learning.
            </p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon users">
                <FaUsers />
              </div>

              <h3>Usuarios registrados</h3>

              <p className="stat-number">{stats.usuarios}</p>

              <span>Administrativos, docentes y estudiantes</span>
            </div>

            <div className="stat-card">
              <div className="stat-icon teachers">
                <FaChalkboardTeacher />
              </div>

              <h3>Docentes</h3>

              <p className="stat-number">{stats.docentes}</p>

              <span>Docentes activos en el sistema</span>
            </div>

            <div className="stat-card">
              <div className="stat-icon students">
                <FaUserGraduate />
              </div>

              <h3>Estudiantes</h3>

              <p className="stat-number">{stats.estudiantes}</p>

              <span>Estudiantes habilitados para evaluar</span>
            </div>
          </div>

          <div className="dashboard-panels">
            <div className="panel-card">
              <div className="panel-header">
                <FaClipboardList />
                <h3>Evaluaciones recientes</h3>
              </div>

              <div className="panel-body">
                <div>
                  <div className="panel-empty-icon">
                    <FaClipboardList />
                  </div>

                  <h4>Sin evaluaciones recientes</h4>

                  <p>
                    Aquí se mostrarán las últimas evaluaciones docentes
                    registradas.
                  </p>
                </div>
              </div>
            </div>

            <div className="panel-card">
              <div className="panel-header">
                <FaChartBar />
                <h3>Resumen KPI / ML</h3>
              </div>

              <div className="panel-body">
                <div>
                  <div className="panel-empty-icon">
                    <FaChartBar />
                  </div>

                  <h4>Sin predicciones disponibles</h4>

                  <p>
                    Aquí se visualizarán los indicadores KPI y resultados del
                    modelo de árbol de decisión.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardAdmin;