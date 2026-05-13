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
import DashboardEstudiante from "../../screens/estudiante/DashboardEstudiante.jsx";

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
        <Route path="/" element={<Navigate to="/" />} />
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
        </Route>

        {/* RUTA NO ENCONTRADA */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
};

export default Router;