import { useEffect } from "react";
import axios from "axios";

const DashboardAdmin = () => {
    useEffect(() => {
        
        const fetchDashboard = async () => {
            
            try {
                
                const token = localStorage.getItem("token");
                
                const response = await axios.get(
                    "http://localhost:4000/api/admin/dashboard",
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
                Bienvenido Administrador {user.nombre}
            </h1>

            <div className="cards-container">

                <div className="card-dashboard">
                    <h2>Usuarios</h2>
                    <p>Gestión completa de usuarios</p>
                </div>

                <div className="card-dashboard">
                    <h2>Docentes</h2>
                    <p>Administración de docentes</p>
                </div>

                <div className="card-dashboard">
                    <h2>KPIs</h2>
                    <p>Análisis del rendimiento docente</p>
                </div>

            </div>

        </div>
    );
};

export default DashboardAdmin;