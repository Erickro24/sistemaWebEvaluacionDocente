import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import api from '../../api/axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

const Materias = () => {

    const [materias, setMaterias] = useState([]);

    const [formData, setFormData] = useState({
        nombre_materia: '',
        sigla: '',
        semestre: ''
    });

    const [editando, setEditando] = useState(false);
    const [idEditar, setIdEditar] = useState(null);

    // ========================================
    // OBTENER MATERIAS
    // ========================================

    const fetchMaterias = async () => {
        try {
            const response = await api.get('/admin/materias');
            setMaterias(response.data.materias);
        } catch (error) {
            console.error(error);

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudieron cargar las materias'
            });
        }
    };

    useEffect(() => {
        fetchMaterias();
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
    // LIMPIAR FORMULARIO
    // ========================================

    const limpiarFormulario = () => {
        setFormData({
            nombre_materia: '',
            sigla: '',
            semestre: ''
        });

        setEditando(false);
        setIdEditar(null);
    };

    // ========================================
    // CREAR O ACTUALIZAR MATERIA
    // ========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (editando) {

                await api.put(
                    `/admin/materias/${idEditar}`,
                    formData
                );

                Swal.fire({
                    icon: 'success',
                    title: 'Materia actualizada',
                    text: `La materia ${formData.nombre_materia} fue actualizada correctamente`
                });

            } else {

                await api.post(
                    '/admin/materias',
                    formData
                );

                Swal.fire({
                    icon: 'success',
                    title: 'Registro exitoso',
                    html: `La materia <b>${formData.nombre_materia}</b> fue registrada correctamente`
                });
            }

            fetchMaterias();
            limpiarFormulario();

        } catch (error) {
            console.error(error);

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Ocurrió un error al guardar la materia'
            });
        }
    };

    // ========================================
    // EDITAR MATERIA
    // ========================================

    const handleEdit = (materia) => {

        setEditando(true);
        setIdEditar(materia.id_materia);

        setFormData({
            nombre_materia: materia.nombre_materia || '',
            sigla: materia.sigla || '',
            semestre: materia.semestre || ''
        });

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // ========================================
    // CANCELAR EDICIÓN
    // ========================================

    const cancelarEdicion = () => {
        limpiarFormulario();
    };

    // ========================================
    // ELIMINAR MATERIA
    // ========================================

    const handleDelete = async (materia) => {

        const result = await Swal.fire({
            icon: 'warning',
            title: '¿Confirmar eliminado?',
            html: `¿Realmente desea eliminar la materia <b>${materia.nombre_materia}</b>?`,
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#0d6efd',
            cancelButtonColor: '#dc3545'
        });

        if (result.isConfirmed) {
            try {

                await api.delete(
                    `/admin/materias/${materia.id_materia}`
                );

                fetchMaterias();

                Swal.fire({
                    icon: 'success',
                    title: 'Eliminado',
                    text: 'La materia fue eliminada correctamente'
                });

            } catch (error) {
                console.error(error);

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response?.data?.message || 'No se pudo eliminar la materia'
                });
            }
        }
    };

    return (

        <div className="usuarios-page">

            {/* FORMULARIO */}

            <form onSubmit={handleSubmit}>

                <div className="card usuarios-card mb-4">

                    <div className="card-header text-center bg-light">
                        <h4 className="mb-0 fw-bold">
                            GESTIÓN DE MATERIAS
                        </h4>
                    </div>

                    <div className="card-body p-4">

                        {/* NOMBRE MATERIA */}
                        <div className="input-group mb-4">
                            <span className="input-group-text">
                                Materia:
                            </span>

                            <input
                                type="text"
                                name="nombre_materia"
                                className="form-control"
                                placeholder="Ingrese nombre de la materia"
                                value={formData.nombre_materia}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* SIGLA */}
                        <div className="input-group mb-4">
                            <span className="input-group-text">
                                Sigla:
                            </span>

                            <input
                                type="text"
                                name="sigla"
                                className="form-control"
                                placeholder="Ejemplo: MAT-101"
                                value={formData.sigla}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* SEMESTRE */}
                        <div className="input-group mb-4">
                            <span className="input-group-text">
                                Semestre:
                            </span>

                            <select
                                name="semestre"
                                className="form-select"
                                value={formData.semestre}
                                onChange={handleChange}
                                required
                            >
                                <option value="">
                                    Seleccione semestre
                                </option>

                                <option value="1">1er Semestre</option>
                                <option value="2">2do Semestre</option>
                                <option value="3">3er Semestre</option>
                                <option value="4">4to Semestre</option>
                                <option value="5">5to Semestre</option>
                                <option value="6">6to Semestre</option>
                                <option value="7">7mo Semestre</option>
                                <option value="8">8vo Semestre</option>
                                <option value="9">9no Semestre</option>
                                <option value="10">10mo Semestre</option>
                            </select>
                        </div>

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

            </form>

            {/* TABLA */}

            <div className="table-responsive">

                <table className="table table-hover align-middle usuarios-table">

                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Materia</th>
                            <th>Sigla</th>
                            <th>Semestre</th>
                            <th className="text-center">
                                Acciones
                            </th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            materias.length > 0 ? (
                                materias.map((materia) => (

                                    <tr key={materia.id_materia}>

                                        <td className="fw-bold">
                                            {materia.id_materia}
                                        </td>

                                        <td>
                                            {materia.nombre_materia}
                                        </td>

                                        <td>
                                            <span className="badge bg-primary">
                                                {materia.sigla}
                                            </span>
                                        </td>

                                        <td>
                                            {materia.semestre}° Semestre
                                        </td>

                                        <td className="text-center">

                                            <button
                                                className="btn btn-info btn-sm text-white me-2"
                                                onClick={() => handleEdit(materia)}
                                            >
                                                Editar
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(materia)}
                                            >
                                                Eliminar
                                            </button>

                                        </td>

                                    </tr>

                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center text-muted py-4"
                                    >
                                        No hay materias registradas
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

export default Materias;