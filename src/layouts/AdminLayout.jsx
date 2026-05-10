import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";


const AdminLayout = () => {

    const links = [
        { label: "Dashboard", path: "/admin" },
        { label: "Usuarios", path: "/admin/usuarios" },
        { label: "Docentes", path: "/admin/docentes" },
        { label: "Reportes", path: "/admin/reportes" },
        { label: "Configuración", path: "/admin/configuracion" }
    ];

    return (

        <div className="dashboard-container">

            <Sidebar links={links} />

            <div className="content">

                <Outlet />

            </div>

        </div>
    );
};

export default AdminLayout;