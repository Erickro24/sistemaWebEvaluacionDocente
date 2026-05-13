import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  FaUsers,
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
  FaMoon,
  FaSun,
  FaBook,
  FaClipboardCheck,
  FaSlidersH
} from "react-icons/fa";

import "../screens/admin/dashboardAdmin.css";

const AdminLayout = () => {
  const navigate = useNavigate();

  const [theme, setTheme] = useState(
    localStorage.getItem("dashboardTheme") || "dark"
  );

  const user = JSON.parse(localStorage.getItem("user"));

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
      {/* SIDEBAR FIJO */}
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
  <NavLink
    to="/admin"
    end
    className={({ isActive }) =>
      isActive ? "sidebar-item active" : "sidebar-item"
    }
  >
    <FaHome />
    Dashboard
  </NavLink>

  {/* <NavLink
    to="/admin/usuarios"
    className={({ isActive }) =>
      isActive ? "sidebar-item active" : "sidebar-item"
    }
  >
    <FaUsers />
    Usuarios
  </NavLink> */}
    <NavLink
    to="/admin/estudiantes"
    className={({ isActive }) =>
      isActive ? "sidebar-item active" : "sidebar-item"
    }
  >
    <FaChalkboardTeacher />
    Estudiantes
  </NavLink>

  <NavLink
    to="/admin/docentes"
    className={({ isActive }) =>
      isActive ? "sidebar-item active" : "sidebar-item"
    }
  >
    <FaChalkboardTeacher />
    Docentes
  </NavLink>

  <NavLink
    to="/admin/materias"
    className={({ isActive }) =>
      isActive ? "sidebar-item active" : "sidebar-item"
    }
  >
    <FaBook />
    Materias
  </NavLink>

  <NavLink
    to="/admin/evaluaciones"
    className={({ isActive }) =>
      isActive ? "sidebar-item active" : "sidebar-item"
    }
  >
    <FaClipboardCheck />
    Evaluaciones
  </NavLink>

  <NavLink
    to="/admin/criteriosparametros"
    className={({ isActive }) =>
      isActive ? "sidebar-item active" : "sidebar-item"
    }
  >
    <FaSlidersH />
    Criterios
  </NavLink>
<NavLink
    to="/admin/kpi"
    className={({ isActive }) =>
      isActive ? "sidebar-item active" : "sidebar-item"
    }
  >
    <FaChartBar />
    KPI / ML
  </NavLink>

  <NavLink
    to="/admin/reportes"
    className={({ isActive }) =>
      isActive ? "sidebar-item active" : "sidebar-item"
    }
  >
    <FaFileAlt />
    Reportes
  </NavLink>

  <NavLink
    to="/admin/configuracion"
    className={({ isActive }) =>
      isActive ? "sidebar-item active" : "sidebar-item"
    }
  >
    <FaCog />
    Configuración
  </NavLink>
</nav>
        </div>

        <button className="sidebar-logout" onClick={handleLogout}>
          <FaSignOutAlt />
          Cerrar sesión
        </button>
      </aside>

      {/* MAIN */}
      <main className="admin-main">
        {/* TOPBAR FIJO */}
        <header className="admin-topbar">
          <div className="search-box">
            <FaSearch />
            <input type="text" placeholder="Buscar en el sistema..." />
          </div>

          <div className="topbar-actions">
            <button
              className="icon-btn"
              onClick={toggleTheme}
              title={
                theme === "dark"
                  ? "Cambiar a modo claro"
                  : "Cambiar a modo oscuro"
              }
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

        {/* AQUÍ CAMBIAN LAS PÁGINAS */}
        <section className="dashboard-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default AdminLayout;