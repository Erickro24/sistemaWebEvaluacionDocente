import Login from "../../screens/Login.jsx";
import {
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";

import Navigator from "../Navigation/Navigator.jsx";
import ProtectedRoute from "../ProtectedRoute.jsx";

import AdminLayout from "../../layouts/AdminLayout.jsx";
import DocenteLayout from "../../layouts/DocenteLayout.jsx";
import EstudianteLayout from "../../layouts/Estudiante.jsx";

import DashboardAdmin from "../../screens/admin/DashboardAdmin.jsx";
// import Usuarios from "../../screens/admin/Usuarios.jsx";
import Estudiantes from '../../screens/admin/Estudiantes.jsx';
import Docentes from "../../screens/admin/Docentes.jsx";
import Materias from "../../screens/admin/Materias.jsx";
import Evaluaciones from "../../screens/admin/Evaluaciones.jsx";
import CriteriosParametros from "../../screens/admin/CriteriosParametros.jsx";
import KpiMl from "../../screens/admin/KpiMl.jsx";
import Reportes from "../../screens/admin/Reportes.jsx";
import Configuracion from "../../screens/admin/Configuracion.jsx";

import DashboardDocente from "../../screens/docente/DashboardDocente.jsx";
import Perfil from "../../screens/docente/Perfil.jsx";
import MisMaterias from "../../screens/docente/MisMaterias.jsx";
import Autoevaluacion from "../../screens/docente/Autoevaluacion.jsx";
import MisEvaluaciones from "../../screens/docente/MisEvaluaciones.jsx";
import KpiMl2 from "../../screens/docente/kpiMl2.jsx";
import PrediccionML from "../../screens/docente/PrediccionML.jsx";
import Recomendaciones from "../../screens/docente/Recomendaciones.jsx";
import Historial from "../../screens/docente/Historial.jsx";


import DashboardEstudiante from "../../screens/estudiante/DashboardEstudiante.jsx";
import PerfilEstudiante from "../../screens/estudiante/PerfilEstudiante.jsx";
import EvaluarDocente from "../../screens/estudiante/EvaluarDocente.jsx";
import HistorialEstudiante from "../../screens/estudiante/HistorialEstudiante.jsx";
import MisMateriasEstudiante from "../../screens/estudiante/MisMateriasEstudiante.jsx";


const Router = () => {
  const location = useLocation();

  const ocultarNavigator =
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/docente") ||
    location.pathname.startsWith("/estudiante");

  return (
    <>
      {!ocultarNavigator && <Navigator />}

      <Routes>
        {/* RUTAS PÚBLICAS */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="administrativo">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardAdmin />} />
          <Route path="estudiantes" element={<Estudiantes />} />
          {/* <Route path="usuarios" element={<Usuarios />} /> */}
          <Route path="estudiantes" element={<Estudiantes />} />
          <Route path="docentes" element={<Docentes />} />
          <Route path="materias" element={<Materias />} />
          <Route path="evaluaciones" element={<Evaluaciones />} />
          <Route path="criteriosparametros" element={<CriteriosParametros />} />
          <Route path="kpi" element={<KpiMl />} />
          <Route path="reportes" element={<Reportes />} />
          <Route path="configuracion" element={<Configuracion />} />
        </Route>

        {/* DOCENTE */}
        <Route
          path="/docente"
          element={
            <ProtectedRoute allowedRole="docente">
              <DocenteLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardDocente />} />
            <Route path="perfil" element={<Perfil />} />
            <Route path="materias" element={<MisMaterias />} />
            <Route path="autoevaluacion" element={<Autoevaluacion />} />
            <Route path="evaluaciones" element={<MisEvaluaciones />} />
            <Route path="kpi2" element={<KpiMl2 />} />
            <Route path="prediccion" element={<PrediccionML />} />
            <Route path="recomendaciones" element={<Recomendaciones />} />
            <Route path="historial" element={<Historial />} />
          </Route>

        {/* ESTUDIANTE */}
        <Route
          path="/estudiante"
          element={
            <ProtectedRoute allowedRole="estudiante">
              <EstudianteLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardEstudiante />} />
          <Route path="perfil" element={<PerfilEstudiante />} />
          <Route path="mismaterias" element={<MisMateriasEstudiante />} />
          <Route path="evaluar-docente" element={<EvaluarDocente />} />
          <Route path="historial" element={<HistorialEstudiante />} />
        </Route>

        {/* RUTA NO ENCONTRADA */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
};

export default Router;