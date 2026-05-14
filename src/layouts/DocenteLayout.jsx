import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  FaChalkboardTeacher,
  FaHome,
  FaUserCircle,
  FaBookOpen,
  FaClipboardCheck,
  FaChartLine,
  FaRobot,
  FaLightbulb,
  FaHistory,
  FaSignOutAlt,
  FaSearch,
  FaBell,
  FaMoon,
  FaSun,
  FaUserEdit
} from "react-icons/fa";

import "../screens/docente/dashboardDocente.css";

const DocenteLayout = () => {
  const navigate = useNavigate();

  const [theme, setTheme] = useState(
    localStorage.getItem("docenteTheme") || "dark"
  );

  const user = JSON.parse(localStorage.getItem("user"));

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("docenteTheme", newTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div
      className={`docente-dashboard ${
        theme === "light" ? "light-theme" : "dark-theme"
      }`}
    >
      <aside className="docente-sidebar">
        <div>
          <div className="docente-brand">
            <div className="docente-brand-icon">
              <FaChalkboardTeacher />
            </div>

            <div>
              <h3>ESMA</h3>
              <span>Panel Docente</span>
            </div>
          </div>

          <nav className="docente-menu">
            <NavLink
              to="/docente"
              end
              className={({ isActive }) =>
                isActive ? "docente-menu-item active" : "docente-menu-item"
              }
            >
              <FaHome />
              Mi Dashboard
            </NavLink>

            <NavLink
              to="/docente/perfil"
              className={({ isActive }) =>
                isActive ? "docente-menu-item active" : "docente-menu-item"
              }
            >
              <FaUserEdit />
              Mi Perfil
            </NavLink>

            <NavLink
              to="/docente/materias"
              className={({ isActive }) =>
                isActive ? "docente-menu-item active" : "docente-menu-item"
              }
            >
              <FaBookOpen />
              Mis Materias
            </NavLink>

            <NavLink
              to="/docente/autoevaluacion"
              className={({ isActive }) =>
                isActive ? "docente-menu-item active" : "docente-menu-item"
              }
            >
              <FaClipboardCheck />
              Autoevaluación
            </NavLink>

            <NavLink
              to="/docente/evaluaciones"
              className={({ isActive }) =>
                isActive ? "docente-menu-item active" : "docente-menu-item"
              }
            >
              <FaClipboardCheck />
              Mis Evaluaciones
            </NavLink>

            <NavLink
              to="/docente/kpi2"
              className={({ isActive }) =>
                isActive ? "docente-menu-item active" : "docente-menu-item"
              }
            >
              <FaChartLine />
              Mis KPI
            </NavLink>

            <NavLink
              to="/docente/prediccion"
              className={({ isActive }) =>
                isActive ? "docente-menu-item active" : "docente-menu-item"
              }
            >
              <FaRobot />
              Predicción ML
            </NavLink>

            <NavLink
              to="/docente/recomendaciones"
              className={({ isActive }) =>
                isActive ? "docente-menu-item active" : "docente-menu-item"
              }
            >
              <FaLightbulb />
              Recomendaciones
            </NavLink>

            <NavLink
              to="/docente/historial"
              className={({ isActive }) =>
                isActive ? "docente-menu-item active" : "docente-menu-item"
              }
            >
              <FaHistory />
              Historial
            </NavLink>
          </nav>
        </div>

        <button className="docente-logout" onClick={handleLogout}>
          <FaSignOutAlt />
          Cerrar sesión
        </button>
      </aside>

      <main className="docente-main">
        <header className="docente-topbar">
          <div className="docente-search-box">
            <FaSearch />
            <input type="text" placeholder="Buscar información docente..." />
          </div>

          <div className="docente-topbar-actions">
            <button
              className="docente-icon-btn"
              onClick={toggleTheme}
              title={
                theme === "dark"
                  ? "Cambiar a modo claro"
                  : "Cambiar a modo oscuro"
              }
            >
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </button>

            <button className="docente-icon-btn">
              <FaBell />
            </button>

            <div className="docente-user-chip">
              <FaUserCircle />
              {user?.nombre || "Docente"}
            </div>
          </div>
        </header>

        <section className="docente-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default DocenteLayout;