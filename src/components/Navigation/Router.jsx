import Home from '../../screens/Home.jsx';
import Convocatorias from '../../screens/Convocatorias.jsx';
import Login from '../../screens/Login.jsx';
import Contactos from '../../screens/Contactos.jsx';

import {Routes, Route, Navigate} from "react-router-dom";

import Navigator from "../Navigation/Navigator.jsx";
import ProtectedRoute from "../ProtectedRoute.jsx";


import AdminLayout from '../../layouts/AdminLayout.jsx';
import DocenteLayout from '../../layouts/DocenteLayout.jsx';
import EstudianteLayout from '../../layouts/Estudiante.jsx';

import DashboardAdmin from '../../screens/admin/DashboardAdmin.jsx';
import DashboardDocente from '../../screens/docente/DashboardDocente.jsx';
import DashboardEstudiante from '../../screens/estudiante/DashboardEstudiante.jsx';

const Router = () => {
    return (
      <>
      {/* NAVBAR GLOBAL */}
      <Navigator />
        <Routes>
           
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="login" element={<Login />} />
            <Route path="home" element={<Home />} />
            <Route path="convocatorias" element={<Convocatorias />} />
            <Route path="contactos" element={<Contactos />} />
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
          
        </Routes>
        </>
    );
}

export default Router;