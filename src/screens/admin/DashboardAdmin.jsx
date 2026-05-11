import { useEffect, useState } from 'react';
import api from '../../api/axios';

const DashboardAdmin = () => {

    const [stats, setStats] = useState({
        usuarios: 0,
        docentes: 0,
        estudiantes: 0
    });

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const response = await api.get('/admin/dashboard');

                setStats(response.data.stats);

            } catch (error) {
                console.error(error);
            }
        };

        fetchDashboard();

    }, []);

    return (
        <div>

            <h1>Sistema de evaluacion docente</h1>

            <div className="cards-container">

                <div className="card-dashboard">
                    <h2>Usuarios</h2>
                    <p>{stats.usuarios}</p>
                </div>

                <div className="card-dashboard">
                    <h2>Docentes</h2>
                    <p>{stats.docentes}</p>
                </div>

                <div className="card-dashboard">
                    <h2>Estudiantes</h2>
                    <p>{stats.estudiantes}</p>
                </div>

            </div>

        </div>
    );
};

export default DashboardAdmin;