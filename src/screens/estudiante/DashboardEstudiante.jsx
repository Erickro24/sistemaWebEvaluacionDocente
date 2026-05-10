import { useEffect } from "react";
import axios from "axios";

const DashboardEstudiante = () => {
    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await axios.get(
                    "http://localhost:4000/api/estudiante/dashboard",
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
                Bienvenido Estudiante {user.nombre}
            </h1>

            <div className="cards-container">

                <div className="card-dashboard">
                    <h2>Evaluar</h2>
                    <p>Evaluar docentes</p>
                </div>

                <div className="card-dashboard">
                    <h2>Historial</h2>
                    <p>Ver evaluaciones realizadas</p>
                </div>

                <div className="card-dashboard">
                    <h2>Perfil</h2>
                    <p>Datos personales</p>
                </div>

            </div>

        </div>
    );
};

export default DashboardEstudiante;