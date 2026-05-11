import Home from '../../screens/Home.jsx';
import Login from '../../screens/Login.jsx';
import Contactos from '../../screens/Contactos.jsx';

import {Routes, Route, Navigate} from "react-router-dom";

import Navigator from "../Navigation/Navigator.jsx";
import ProtectedRoute from "../ProtectedRoute.jsx";


import AdminLayout from '../../layouts/AdminLayout.jsx';
import DocenteLayout from '../../layouts/DocenteLayout.jsx';
import EstudianteLayout from '../../layouts/Estudiante.jsx';

import DashboardAdmin from '../../screens/admin/DashboardAdmin.jsx';
import Usuarios from '../../screens/admin/Usuarios.jsx';
import Docentes from '../../screens/admin/Docentes.jsx';
import Reportes from '../../screens/admin/Reportes.jsx';
import Configuracion from '../../screens/admin/Configuracion.jsx';

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
            <Route path="contactos" element={<Contactos />} />

             {/* ADMIN */}
            <Route path="/admin" element={<ProtectedRoute allowedRole="administrativo"><AdminLayout /> </ProtectedRoute>}>
            <Route index element={<DashboardAdmin />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="docentes" element={<Docentes />} />
            <Route path="reportes" element={<Reportes />} />
            <Route path="configuracion" element={<Configuracion />} />

            {/* DASHBOARD */}
            <Route
            index
            element={<DashboardAdmin />}
            />

            {/* USUARIOS */}
            <Route
            path="usuarios"
            element={<Usuarios />}
            />

             {/* DOCENTES */}
             <Route
             path="docentes"
             element={<Docentes />}
             />

            {/* REPORTES */}
            <Route
             path="reportes"
             element={<Reportes />}
             />

             {/* CONFIGURACIÓN */}
             <Route
              path="configuracion"
             element={<Configuracion />}
             />

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