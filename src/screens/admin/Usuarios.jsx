import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import api from '../../api/axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

const Usuarios = () => {

    const [usuarios, setUsuarios] = useState([]);

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        id_rol: '',
        estado: 'ACTIVO'
    });

    const [editando, setEditando] = useState(false);
    const [idEditar, setIdEditar] = useState(null);

    // ========================================
    // OBTENER USUARIOS
    // ========================================

    const fetchUsuarios = async () => {
        try {
            const response = await api.get('/users');
            setUsuarios(response.data.users);
        } catch (error) {
            console.error(error);

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudieron cargar los usuarios'
            });
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    // ========================================
    // HANDLE CHANGE
    // ========================================

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // ========================================
    // CREAR O ACTUALIZAR USUARIO
    // ========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editando) {
                await api.put(`/users/${idEditar}`, formData);

                Swal.fire({
                    icon: 'success',
                    title: 'Usuario actualizado',
                    text: `El usuario ${formData.nombre} fue actualizado correctamente`,
                    confirmButtonText: 'OK'
                });

            } else {
                await api.post('/users', formData);

                Swal.fire({
                    icon: 'success',
                    title: 'Registro exitoso!!!',
                    html: `El usuario <b>${formData.nombre}</b> fue registrado con éxito!!!`,
                    confirmButtonText: 'OK'
                });
            }

            fetchUsuarios();
            limpiarFormulario();

        } catch (error) {
            console.error(error);

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Ocurrió un error al guardar el usuario'
            });
        }
    };

    // ========================================
    // EDITAR USUARIO
    // ========================================

    const handleEdit = (user) => {
        setEditando(true);
        setIdEditar(user.id_usuario);

        setFormData({
            nombre: user.nombre || '',
            apellido: user.apellido || '',
            email: user.email || '',
            password: '',
            id_rol: obtenerIdRol(user.nombre_rol),
            estado: user.estado || 'ACTIVO'
        });

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // ========================================
    // OBTENER ID ROL POR NOMBRE
    // ========================================

    const obtenerIdRol = (nombreRol) => {
        if (nombreRol === 'Administrativo') return '1';
        if (nombreRol === 'Docente') return '2';
        if (nombreRol === 'Estudiante') return '3';
        return '';
    };

    // ========================================
    // CANCELAR EDICIÓN
    // ========================================

    const cancelarEdicion = () => {
        limpiarFormulario();
    };

    // ========================================
    // LIMPIAR FORMULARIO
    // ========================================

    const limpiarFormulario = () => {
        setFormData({
            nombre: '',
            apellido: '',
            email: '',
            password: '',
            id_rol: '',
            estado: 'ACTIVO'
        });

        setEditando(false);
        setIdEditar(null);
    };

    // ========================================
    // FORMATEAR FECHA
    // ========================================

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

    // ========================================
    // ELIMINAR USUARIO
    // ========================================

    const handleDelete = async (user) => {
        const result = await Swal.fire({
            icon: 'warning',
            title: 'Confirmar eliminado?',
            html: `Realmente desea eliminar a <b>${user.nombre} ${user.apellido}</b>?`,
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminarlo!',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#0d6efd',
            cancelButtonColor: '#dc3545'
        });

        if (result.isConfirmed) {
            try {
                await api.delete(`/users/${user.id_usuario}`);

                fetchUsuarios();

                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado',
                    text: 'El usuario fue eliminado correctamente'
                });

            } catch (error) {
                console.error(error);

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudo eliminar el usuario'
                });
            }
        }
    };

    return (

        <div className="usuarios-page">

            {/* ============================= */}
            {/* FORMULARIO */}
            {/* ============================= */}

            <form onSubmit={handleSubmit}>

                <div className="card usuarios-card mb-4">

                    <div className="card-header text-center bg-light">
                        <h4 className="mb-0 fw-bold">
                            GESTIÓN DE USUARIOS
                        </h4>
                    </div>

                    <div className="card-body p-4">

                        {/* NOMBRE */}
                        <div className="input-group mb-4">
                            <span className="input-group-text">
                                Nombre:
                            </span>

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

                        {/* APELLIDO */}
                        <div className="input-group mb-4">
                            <span className="input-group-text">
                                Apellido:
                            </span>

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

                        {/* EMAIL */}
                        <div className="input-group mb-4">
                            <span className="input-group-text">
                                Email:
                            </span>

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

                        {/* PASSWORD */}
                        <div className="input-group mb-4">
                            <span className="input-group-text">
                                Password:
                            </span>

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

                        {/* ROL */}
                        <div className="input-group mb-4">
                            <span className="input-group-text">
                                Rol:
                            </span>

                            <select
                                name="id_rol"
                                className="form-select"
                                value={formData.id_rol}
                                onChange={handleChange}
                                required
                            >
                                <option value="">
                                    Seleccione Rol
                                </option>

                                <option value="1">
                                    Administrativo
                                </option>

                                <option value="2">
                                    Docente
                                </option>

                                <option value="3">
                                    Estudiante
                                </option>
                            </select>
                        </div>
                                {/* ESTADO */}
                            <div className="input-group mb-4">
                            <span className="input-group-text">
                             Estado:
                            </span>

                            <select
                            name="estado"
                            className="form-select"
                            value={formData.estado}
                            onChange={handleChange}
                         required
                            >
                         <option value="ACTIVO">
                        Activo
                        </option>

                            <option value="INACTIVO">
                            Inactivo
                            </option>
                        </select>
                        </div>

                    <div className="card-footer text-center bg-light py-3">

                        {
                            editando ? (
                                <>
                                    <button
                                        className="btn btn-warning px-5 me-3"
                                        type="submit"
                                    >
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
                                <button
                                    className="btn btn-success px-5"
                                    type="submit"
                                >
                                    Registrar
                                </button>
                            )
                        }

                    </div>

                </div>
              </div>          
            </form>
                            
            {/* ============================= */}
            {/* TABLA */}
            {/* ============================= */}

            <div className="table-responsive">

                <table className="table table-hover align-middle usuarios-table">

                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Estado</th>
                            <th>Fecha Registro</th>
                            <th className="text-center">
                                Acciones
                            </th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            usuarios.length > 0 ? (
                                usuarios.map((user) => (

                                    <tr key={user.id_usuario}>

                                        <td className="fw-bold">
                                            {user.id_usuario}
                                        </td>

                                        <td>
                                            {user.nombre}
                                        </td>

                                        <td>
                                            {user.apellido}
                                        </td>

                                        <td>
                                            {user.email}
                                        </td>

                                        <td>
                                            {user.nombre_rol}
                                        </td>

                                        <td>
                                            <span
                                                className={`badge ${
                                                    user.estado === 'ACTIVO'
                                                        ? 'bg-success'
                                                        : 'bg-danger'
                                                }`}
                                            >
                                                {user.estado || 'SIN ESTADO'}
                                            </span>
                                        </td>

                                        <td>
                                            {formatearFecha(user.fecha_registro)}
                                        </td>

                                        <td className="text-center">

                                            <button
                                                className="btn btn-info btn-sm text-white me-2"
                                                onClick={() => handleEdit(user)}
                                            >
                                                Editar
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(user)}
                                            >
                                                Eliminar
                                            </button>

                                        </td>

                                    </tr>

                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center text-muted py-4">
                                        No hay usuarios registrados
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

export default Usuarios;