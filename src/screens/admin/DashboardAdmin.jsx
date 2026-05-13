import { useEffect, useState } from "react";
import api from "../../api/axios";

import {
  FaUsers,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaChartBar,
  FaClipboardList
} from "react-icons/fa";

const DashboardAdmin = () => {
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

  return (
    <>
      <div className="welcome-card">
        <h1>Hola, {user?.nombre || "Administrador"} 👋</h1>

        <p>
          Panel administrativo del Sistema Web de Evaluación Docente basado en
          Machine Learning.
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
                Aquí se mostrarán las últimas evaluaciones docentes registradas.
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
                Aquí se visualizarán los indicadores KPI y resultados del modelo
                de árbol de decisión.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardAdmin;