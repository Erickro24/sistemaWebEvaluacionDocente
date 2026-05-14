import { useEffect, useState } from "react";
import api from "../../api/axios";

import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaClipboardCheck,
  FaClock,
  FaCalendarAlt,
  FaListAlt,
  FaUserGraduate
} from "react-icons/fa";

const DashboardEstudiante = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    materias: 0,
    docentesPorEvaluar: 0,
    evaluacionesCompletadas: 0,
    evaluacionesPendientes: 0,
    periodoActivo: "SIN PERIODO"
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("/estudiante/dashboard");

        if (response.data?.stats) {
          setStats(response.data.stats);
        }
      } catch (error) {
        console.error("Error al cargar dashboard estudiante:", error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <>
      <div className="estudiante-welcome-card">
        <h1>Bienvenido, {user?.nombre || "Estudiante"} 👋</h1>

        <p>
          Panel del estudiante para revisar materias, evaluar docentes, consultar
          evaluaciones realizadas e historial académico.
        </p>
      </div>

      <div className="estudiante-stats-grid">
        <div className="estudiante-stat-card">
          <div className="estudiante-stat-icon materias">
            <FaBookOpen />
          </div>

          <h3>Materias inscritas</h3>
          <p className="estudiante-stat-number">{stats.materias}</p>
          <span>Materias que cursas actualmente</span>
        </div>

        <div className="estudiante-stat-card">
          <div className="estudiante-stat-icon docentes">
            <FaChalkboardTeacher />
          </div>

          <h3>Docentes por evaluar</h3>
          <p className="estudiante-stat-number">{stats.docentesPorEvaluar}</p>
          <span>Docentes disponibles para evaluación</span>
        </div>

        <div className="estudiante-stat-card">
          <div className="estudiante-stat-icon completadas">
            <FaClipboardCheck />
          </div>

          <h3>Evaluaciones completadas</h3>
          <p className="estudiante-stat-number">
            {stats.evaluacionesCompletadas}
          </p>
          <span>Evaluaciones finalizadas</span>
        </div>

        <div className="estudiante-stat-card">
          <div className="estudiante-stat-icon pendientes">
            <FaClock />
          </div>

          <h3>Evaluaciones pendientes</h3>
          <p className="estudiante-stat-number">
            {stats.evaluacionesPendientes}
          </p>
          <span>Evaluaciones aún no realizadas</span>
        </div>

        <div className="estudiante-stat-card">
          <div className="estudiante-stat-icon periodo">
            <FaCalendarAlt />
          </div>

          <h3>Periodo activo</h3>
          <p className="estudiante-stat-number">{stats.periodoActivo}</p>
          <span>Gestión académica actual</span>
        </div>
      </div>

      <div className="estudiante-panels">
        <div className="estudiante-panel-card">
          <div className="estudiante-panel-header">
            <FaListAlt />
            <h3>Evaluaciones pendientes</h3>
          </div>

          <div className="estudiante-panel-body">
            <div>
              <div className="estudiante-panel-empty-icon">
                <FaListAlt />
              </div>

              <h4>Sin evaluaciones pendientes</h4>

              <p>
                Aquí se mostrarán los docentes y materias que todavía debes
                evaluar.
              </p>
            </div>
          </div>
        </div>

        <div className="estudiante-panel-card">
          <div className="estudiante-panel-header">
            <FaUserGraduate />
            <h3>Docentes disponibles</h3>
          </div>

          <div className="estudiante-panel-body">
            <div>
              <div className="estudiante-panel-empty-icon">
                <FaUserGraduate />
              </div>

              <h4>Lista de docentes</h4>

              <p>
                Aquí se visualizarán los docentes asignados a tus materias para
                realizar la evaluación docente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardEstudiante;