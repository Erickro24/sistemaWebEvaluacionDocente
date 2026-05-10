import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const EstudianteLayout = () => {

    const links = [
        { label: "Dashboard", path: "/estudiante" },
        { label: "Evaluar Docente", path: "/estudiante/evaluar" },
        { label: "Historial", path: "/estudiante/historial" },
        { label: "Perfil", path: "/estudiante/perfil" }
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

export default EstudianteLayout;