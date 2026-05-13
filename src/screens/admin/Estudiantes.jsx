import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import api from '../../api/axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

const Estudiantes = () => {
    const [estudiantes, setEstudiantes] = useState([]);

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        estado: 'ACTIVO',
        ru: '',
        carrera: '',
        semestre: ''
    });

    const [editando, setEditando] = useState(false);
    const [idEditar, setIdEditar] = useState(null);

    const fetchEstudiantes = async () => {
        try {
            const response = await api.get('/admin/estudiantes');
            setEstudiantes(response.data.estudiantes);
        } catch (error) {
            console.error(error);

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudieron cargar los estudiantes'
            });
        }
    };

    useEffect(() => {
        fetchEstudiantes();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const limpiarFormulario = () => {
        setFormData({
            nombre: '',
            apellido: '',
            email: '',
            password: '',
            estado: 'ACTIVO',
            ru: '',
            carrera: '',
            semestre: ''
        });

        setEditando(false);
        setIdEditar(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editando) {
                await api.put(`/admin/estudiantes/${idEditar}`, formData);

                Swal.fire({
                    icon: 'success',
                    title: 'Estudiante actualizado',
                    text: `El estudiante ${formData.nombre} fue actualizado correctamente`
                });

            } else {
                await api.post('/admin/estudiantes', formData);

                Swal.fire({
                    icon: 'success',
                    title: 'Registro exitoso',
                    html: `El estudiante <b>${formData.nombre}</b> fue registrado correctamente`
                });
            }

            fetchEstudiantes();
            limpiarFormulario();

        } catch (error) {
            console.error(error);

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Ocurrió un error al guardar el estudiante'
            });
        }
    };

    const handleEdit = (estudiante) => {
        setEditando(true);
        setIdEditar(estudiante.id_usuario);

        setFormData({
            nombre: estudiante.nombre || '',
            apellido: estudiante.apellido || '',
            email: estudiante.email || '',
            password: '',
            estado: estudiante.estado || 'ACTIVO',
            ru: estudiante.ru || '',
            carrera: estudiante.carrera || '',
            semestre: estudiante.semestre || ''
        });

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const cancelarEdicion = () => {
        limpiarFormulario();
    };

    const handleDelete = async (estudiante) => {
        const result = await Swal.fire({
            icon: 'warning',
            title: '¿Confirmar eliminado?',
            html: `¿Realmente desea eliminar a <b>${estudiante.nombre} ${estudiante.apellido}</b>?`,
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#0d6efd',
            cancelButtonColor: '#dc3545'
        });

        if (result.isConfirmed) {
            try {
                await api.delete(`/admin/estudiantes/${estudiante.id_usuario}`);

                fetchEstudiantes();

                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado',
                    text: 'El estudiante fue eliminado correctamente'
                });

            } catch (error) {
                console.error(error);

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo eliminar el estudiante'
                });
            }
        }
    };

    const formatearFecha = (fecha) => {
        if (!fecha) return 'Sin fecha';

        return new Date(fecha).toLocaleString('es-BO', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="usuarios-page">

            <form onSubmit={handleSubmit}>
                <div className="card usuarios-card mb-4">

                    <div className="card-header text-center bg-light">
                        <h4 className="mb-0 fw-bold">
                            GESTIÓN DE ESTUDIANTES
                        </h4>
                    </div>

                    <div className="card-body p-4">

                        <div className="input-group mb-4">
                            <span className="input-group-text">Nombre:</span>
                            <input
                                type="text"
                                name="nombre"
                                className="form-control"
                                placeholder="Ingrese un nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group mb-4">
                            <span className="input-group-text">Apellido:</span>
                            <input
                                type="text"
                                name="apellido"
                                className="form-control"
                                placeholder="Ingrese un apellido"
                                value={formData.apellido}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group mb-4">
                            <span className="input-group-text">Email:</span>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Ingrese un correo electrónico"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group mb-4">
                            <span className="input-group-text">Password:</span>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder={
                                    editando
                                        ? 'Ingrese nueva contraseña si desea cambiarla'
                                        : 'Ingrese una contraseña'
                                }
                                value={formData.password}
                                onChange={handleChange}
                                required={!editando}
                            />
                        </div>

                        <div className="input-group mb-4">
                            <span className="input-group-text">RU:</span>
                            <input
                                type="text"
                                name="ru"
                                className="form-control"
                                placeholder="Ingrese RU del estudiante"
                                value={formData.ru}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="input-group mb-4">
                            <span className="input-group-text">Carrera:</span>
                            <input
                                type="text"
                                name="carrera"
                                className="form-control"
                                placeholder="Ingrese carrera"
                                value={formData.carrera}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group mb-4">
                            <span className="input-group-text">Semestre:</span>
                            <input
                                type="text"
                                name="semestre"
                                className="form-control"
                                placeholder="Ingrese semestre"
                                value={formData.semestre}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group mb-4">
                            <span className="input-group-text">Estado:</span>
                            <select
                                name="estado"
                                className="form-select"
                                value={formData.estado}
                                onChange={handleChange}
                                required
                            >
                                <option value="ACTIVO">Activo</option>
                                <option value="INACTIVO">Inactivo</option>
                            </select>
                        </div>

                    </div>

                    <div className="card-footer text-center bg-light py-3">
                        {
                            editando ? (
                                <>
                                    <button className="btn btn-warning px-5 me-3" type="submit">
                                        Actualizar
                                    </button>

                                    <button
                                        className="btn btn-info text-white px-5"
                                        type="button"
                                        onClick={cancelarEdicion}
                                    >
                                        Cancelar
                                    </button>
                                </>
                            ) : (
                                <button className="btn btn-success px-5" type="submit">
                                    Registrar
                                </button>
                            )
                        }
                    </div>

                </div>
            </form>

            <div className="table-responsive">
                <table className="table table-hover align-middle usuarios-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>RU</th>
                            <th>Carrera</th>
                            <th>Semestre</th>
                            <th>Estado</th>
                            <th>Fecha Registro</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            estudiantes.length > 0 ? (
                                estudiantes.map((estudiante) => (
                                    <tr key={estudiante.id_usuario}>
                                        <td className="fw-bold">{estudiante.id_usuario}</td>
                                        <td>{estudiante.nombre}</td>
                                        <td>{estudiante.apellido}</td>
                                        <td>{estudiante.email}</td>
                                        <td>{estudiante.ru || 'Sin RU'}</td>
                                        <td>{estudiante.carrera}</td>
                                        <td>{estudiante.semestre}</td>

                                        <td>
                                            <span
                                                className={`badge ${
                                                    estudiante.estado === 'ACTIVO'
                                                        ? 'bg-success'
                                                        : 'bg-danger'
                                                }`}
                                            >
                                                {estudiante.estado}
                                            </span>
                                        </td>

                                        <td>{formatearFecha(estudiante.fecha_registro)}</td>

                                        <td className="text-center">
                                            <button
                                                className="btn btn-info btn-sm text-white me-2"
                                                onClick={() => handleEdit(estudiante)}
                                            >
                                                Editar
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(estudiante)}
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10" className="text-center text-muted py-4">
                                        No hay estudiantes registrados
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Estudiantes;