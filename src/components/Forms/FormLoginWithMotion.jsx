import { motion } from "motion/react";
import useForm from "../Hooks/useForm.js";
import ModalSuccess from "../../components/Modals/ModalSuccess.jsx";
import ModalError from "../../components/Modals/ModalError.jsx";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { updateForm, login } from '../../store/features/forms/formSlice.js';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const Think = ({ titleForm = "Login" }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { formData, handleChange } = useForm({
        username: '',
        password: '',
        rol: '' 
    });

    const [showModal, setShowModal] = useState(false);
    const [showModalError, setShowModalError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        const response = await axios.post(
            'http://localhost:4000/api/auth/login',
            {
                email: formData.username,
                password: formData.password,
                rol: formData.rol
            }
        );

        const data = response.data;
        localStorage.setItem('token', data.token);

        console.log(
        "TOKEN GUARDADO:",
        localStorage.getItem("token")
        );
        console.log("LOGIN RESPONSE:", data);
        if (data.success) {

            localStorage.setItem('token', data.token);

            localStorage.setItem(
                'user',
                JSON.stringify(data.user)
            );

            dispatch(login());

            setShowModal(true);

            setTimeout(() => {

                if (data.user.rol === 'administrativo') {
                    navigate('/admin');
                }

                else if (data.user.rol === 'docente') {
                    navigate('/docente');
                }

                else if (data.user.rol === 'estudiante') {
                    navigate('/estudiante');
                }

            }, 1500);
        }

    } catch (error) {

        console.error(error);

        setShowModalError(true);
    }
};

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <ModalSuccess 
                visible={showModal} 
                message={`Bienvenido ${formData.username}`} 
                onClose={() => setShowModal(false)} 
            />
            <ModalError 
                visible={showModalError} 
                message="Credenciales incorrectas o rol no seleccionado" 
                onClose={() => setShowModalError(false)} 
            />

            <form onSubmit={handleSubmit}>
                <motion.div initial={{ x: -100 }} animate={{ x: 0 }} transition={{ duration: 0.5 }}>
                    <h3>{titleForm}</h3>
                </motion.div>

            <div className="form-container">
                {/* Selector de ROL */}
                <motion.div initial={{ x: -100 }} animate={{ x: 0 }} transition={{ duration: 0.5 }}>
                    <div className="text_area">
                        <label>Rol:
                            <select 
                                className="text_input" 
                                name="rol" 
                                value={formData.rol} 
                                onChange={handleChange} 
                                required
                                style={{ width: '100%', padding: '10px' }}
                                >
                                <option value="">Seleccione su rol</option>
                                <option value="administrativo">Administrativo</option>
                                <option value="docente">Docente</option>
                                <option value="estudiante">Estudiante</option>
                            </select>
                        </label>
                    </div>
                </motion.div>

                {/* Username */}
                <motion.div initial={{ x: -100 }} animate={{ x: 0 }} transition={{ duration: 0.5 }}>
                    <div className="text_area">
                        <label>Username:
                            <input 
                                className="text_input" 
                                type="text" 
                                name="username" 
                                value={formData.username} 
                                onChange={handleChange} 
                                required 
                                />
                        </label>
                    </div>
                </motion.div>

                {/* Password */}
                <motion.div initial={{ x: -100 }} animate={{ x: 0 }} transition={{ duration: 0.5 }}>
                    <div className="text_area">
                        <label>Password:
                            <input 
                                className="text_input" 
                                type={showPassword ? 'text' : 'password'} 
                                name="password" 
                                value={formData.password} 
                                onChange={handleChange} 
                                required 
                                />
                            <button type="button" onClick={togglePasswordVisibility} className="button-visibility">
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </label>
                    </div>
                </motion.div>

                <motion.div initial={{ y: 100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
                    <div >
                        <button className="btn" type="submit">Login</button>
                    </div>
                </motion.div>
            </div>
            </form>
        </motion.div>
    );
};

export default Think;
