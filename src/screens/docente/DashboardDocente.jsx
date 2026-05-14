import { useEffect, useState } from "react";
import api from "../../api/axios";

import {
  FaBookOpen,
  FaClipboardCheck,
  FaChartLine,
  FaRobot,
  FaMedal,
  FaPercentage,
  FaComments,
  FaLightbulb
} from "react-icons/fa";

const DashboardDocente = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    materias: 0,
    evaluaciones: 0,
    promedio_general: 0,
    nivel_desempeno: "SIN DATOS",
    prediccion_ml: "SIN DATOS",
    probabilidad: 0
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("/docente/dashboard");

        if (response.data?.stats) {
          setStats(response.data.stats);
        }
      } catch (error) {
        console.error("Error al cargar dashboard docente:", error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <>
      <div className="docente-welcome-card">
        <h1>Bienvenido, {user?.nombre || "Docente"} 👋</h1>

        <p>
          Panel docente para revisar tus materias, evaluaciones, desempeño,
          predicción ML y recomendaciones académicas.
        </p>
      </div>

      <div className="docente-stats-grid">
        <div className="docente-stat-card">
          <div className="docente-stat-icon materias">
            <FaBookOpen />
          </div>

          <h3>Materias asignadas</h3>
          <p className="docente-stat-number">{stats.materias}</p>
          <span>Materias que dictas actualmente</span>
        </div>

        <div className="docente-stat-card">
          <div className="docente-stat-icon evaluaciones">
            <FaClipboardCheck />
          </div>

          <h3>Evaluaciones recibidas</h3>
          <p className="docente-stat-number">{stats.evaluaciones}</p>
          <span>Evaluaciones realizadas por estudiantes</span>
        </div>

        <div className="docente-stat-card">
          <div className="docente-stat-icon kpi">
            <FaChartLine />
          </div>

          <h3>Promedio general</h3>
          <p className="docente-stat-number">{stats.promedio_general}</p>
          <span>Promedio del periodo académico activo</span>
        </div>

        <div className="docente-stat-card">
          <div className="docente-stat-icon desempeno">
            <FaMedal />
          </div>

          <h3>Nivel de desempeño</h3>
          <p className="docente-stat-number">{stats.nivel_desempeno}</p>
          <span>EXCELENTE, BUENO, REGULAR u OBSERVADO</span>
        </div>

        <div className="docente-stat-card">
          <div className="docente-stat-icon ml">
            <FaRobot />
          </div>

          <h3>Predicción ML</h3>
          <p className="docente-stat-number">{stats.prediccion_ml}</p>
          <span>Clasificación generada por el modelo</span>
        </div>

        <div className="docente-stat-card">
          <div className="docente-stat-icon probabilidad">
            <FaPercentage />
          </div>

          <h3>Probabilidad</h3>
          <p className="docente-stat-number">{stats.probabilidad}%</p>
          <span>Confianza de la predicción</span>
        </div>
      </div>

      <div className="docente-panels">
        <div className="docente-panel-card">
          <div className="docente-panel-header">
            <FaComments />
            <h3>Comentarios recibidos</h3>
          </div>

          <div className="docente-panel-body">
            <div>
              <div className="docente-panel-empty-icon">
                <FaComments />
              </div>

              <h4>Sin comentarios recientes</h4>

              <p>
                Aquí se mostrarán los comentarios realizados por los estudiantes
                en las evaluaciones docentes.
              </p>
            </div>
          </div>
        </div>

        <div className="docente-panel-card">
          <div className="docente-panel-header">
            <FaLightbulb />
            <h3>Recomendaciones de mejora</h3>
          </div>

          <div className="docente-panel-body">
            <div>
              <div className="docente-panel-empty-icon">
                <FaLightbulb />
              </div>

              <h4>Sin recomendaciones disponibles</h4>

              <p>
                Aquí se visualizarán recomendaciones generadas según tus KPI,
                evaluaciones y predicción del modelo ML.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardDocente;