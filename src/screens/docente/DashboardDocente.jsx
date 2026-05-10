import { useEffect } from "react";
import axios from "axios";

const DashboardDocente = () => {
     useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await axios.get(
                    "http://localhost:4000/api/docente/dashboard",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                console.log(response.data);

            } catch (error) {

                console.error(error);
            }
        };

        fetchDashboard();

    }, []);

    const user = JSON.parse(localStorage.getItem("user"));

    return (

        <div>

            <h1>
                Bienvenido Docente {user.nombre}
            </h1>

            <div className="cards-container">

                <div className="card-dashboard">
                    <h2>Materias</h2>
                    <p>Ver materias asignadas</p>
                </div>

                <div className="card-dashboard">
                    <h2>Evaluaciones</h2>
                    <p>Resultados de evaluaciones</p>
                </div>

                <div className="card-dashboard">
                    <h2>Desempeño</h2>
                    <p>Análisis de KPIs</p>
                </div>

            </div>

        </div>
    );
};

export default DashboardDocente;