import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const DocenteLayout = () => {

    const links = [
        { label: "Dashboard", path: "/docente" },
        { label: "Mis Materias", path: "/docente/materias" },
        { label: "Evaluaciones", path: "/docente/evaluaciones" },
        { label: "Resultados", path: "/docente/resultados" }
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

export default DocenteLayout;