import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  FaUserGraduate,
  FaHome,
  FaUserCircle,
  FaBookOpen,
  FaClipboardCheck,
  FaHistory,
  FaSignOutAlt,
  FaSearch,
  FaBell,
  FaMoon,
  FaSun,
  FaUserEdit,
  FaChalkboardTeacher
} from "react-icons/fa";

import "../screens/estudiante/DashboardEstudiante.css";

const EstudianteLayout = () => {
  const navigate = useNavigate();

  const [theme, setTheme] = useState(
    localStorage.getItem("estudianteTheme") || "dark"
  );

  const user = JSON.parse(localStorage.getItem("user"));

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    setTheme(newTheme);
    localStorage.setItem("estudianteTheme", newTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div
      className={`estudiante-dashboard ${
        theme === "light" ? "light-theme" : "dark-theme"
      }`}
    >
      <aside className="estudiante-sidebar">
        <div>
          <div className="estudiante-brand">
            <div className="estudiante-brand-icon">
              <FaUserGraduate />
            </div>

            <div>
              <h3>ESMA</h3>
              <span>Panel Estudiante</span>
            </div>
          </div>

          <nav className="estudiante-menu">
            <NavLink
              to="/estudiante"
              end
              className={({ isActive }) =>
                isActive
                  ? "estudiante-menu-item active"
                  : "estudiante-menu-item"
              }
            >
              <FaHome />
              Mi Dashboard
            </NavLink>

            <NavLink
              to="/estudiante/perfil"
              className={({ isActive }) =>
                isActive
                  ? "estudiante-menu-item active"
                  : "estudiante-menu-item"
              }
            >
              <FaUserEdit />
              Mi Perfil
            </NavLink>

            <NavLink
              to="/estudiante/mismaterias"
              className={({ isActive }) =>
                isActive
                  ? "estudiante-menu-item active"
                  : "estudiante-menu-item"
              }
            >
              <FaBookOpen />
              Mis Materias
            </NavLink>

            <NavLink
              to="/estudiante/evaluar-docente"
              className={({ isActive }) =>
                isActive
                  ? "estudiante-menu-item active"
                  : "estudiante-menu-item"
              }
            >
              <FaChalkboardTeacher />
              Evaluar Docente
            </NavLink>

            {/* <NavLink
              to="/estudiante/evaluaciones"
              className={({ isActive }) =>
                isActive
                  ? "estudiante-menu-item active"
                  : "estudiante-menu-item"
              }
            >
              <FaClipboardCheck />
              Evaluaciones Hechas
            </NavLink> */}

            <NavLink
              to="/estudiante/historial"
              className={({ isActive }) =>
                isActive
                  ? "estudiante-menu-item active"
                  : "estudiante-menu-item"
              }
            >
              <FaHistory />
              Historial Académico
            </NavLink>
          </nav>
        </div>

        <button className="estudiante-logout" onClick={handleLogout}>
          <FaSignOutAlt />
          Cerrar sesión
        </button>
      </aside>

      <main className="estudiante-main">
        <header className="estudiante-topbar">
          <div className="estudiante-search-box">
            <FaSearch />
            <input type="text" placeholder="Buscar información académica..." />
          </div>

          <div className="estudiante-topbar-actions">
            <button
              className="estudiante-icon-btn"
              onClick={toggleTheme}
              title={
                theme === "dark"
                  ? "Cambiar a modo claro"
                  : "Cambiar a modo oscuro"
              }
            >
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </button>

            <button className="estudiante-icon-btn">
              <FaBell />
            </button>

            <div className="estudiante-user-chip">
              <FaUserCircle />
              {user?.nombre || "Estudiante"}
            </div>
          </div>
        </header>

        <section className="estudiante-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default EstudianteLayout;