import { motion } from "motion/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Spinner
} from "react-bootstrap";

import {
  BsPersonFill,
  BsLockFill,
  BsEyeFill,
  BsEyeSlashFill,
  BsShieldLockFill
} from "react-icons/bs";

import useForm from "../Hooks/useForm.js";
import ModalSuccess from "../../components/Modals/ModalSuccess.jsx";
import ModalError from "../../components/Modals/ModalError.jsx";
import { login } from "../../store/features/forms/formSlice.js";

import "./login.css";
  /* eslint-disable react/prop-types */
  const Think = ({ titleForm = "BIENVENIDOS AL SISTEMA DE EVALUACIÓN DOCENTE" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { formData, handleChange } = useForm({
    username: "",
    password: "",
    rol: ""
  });

  const [showModal, setShowModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:4000/api/auth/login", {
        email: formData.username,
        password: formData.password,
        rol: formData.rol
      });

      const data = response.data;

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        dispatch(login());
        setShowModal(true);

        setTimeout(() => {
          if (data.user.rol === "administrativo") {
            navigate("/admin");
          } else if (data.user.rol === "docente") {
            navigate("/docente");
          } else if (data.user.rol === "estudiante") {
            navigate("/estudiante");
          }
        }, 1500);
      }
    } catch (error) {
      console.error("Error login:", error);
      setShowModalError(true);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <>
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

      <div className="login-page">
        <Container className="h-100 d-flex align-items-center justify-content-center">
          <motion.div
            className="login-wrapper"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Row className="g-0 login-card shadow-lg">
              {/* LADO IZQUIERDO */}
              <Col lg={6} className="welcome-panel d-none d-lg-flex">
                <div className="welcome-content">
                  <h1 className="welcome-title">BIENVENIDO</h1>
                  <h2>al</h2>
                  <h4 className="welcome-subtitle">Sistema de Evaluación Docente</h4>
                  <p className="welcome-text">
                  </p>
                </div>

                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
                <div className="circle circle-3"></div>
              </Col>

              {/* LADO DERECHO */}
              <Col lg={6} md={12} className="form-panel">
                <div className="form-box">
                  <div className="mb-4 text-center text-lg-start">
                    <h2 className="signin-title">Login</h2>
                    <p className="signin-subtitle">
                    </p>
                  </div>

                  <h5 className="system-title text-center mb-4 d-lg-none">
                    {titleForm}
                  </h5>

                  <Form onSubmit={handleSubmit}>
                    {/* ROL */}
                    <Form.Group className="mb-3">
                      <Form.Label className="custom-label">Rol</Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="custom-input-icon">
                          <BsShieldLockFill />
                        </InputGroup.Text>
                        <Form.Select
                          name="rol"
                          value={formData.rol}
                          onChange={handleChange}
                          required
                          className="custom-input"
                        >
                          <option value="">Seleccione su rol</option>
                          <option value="administrativo">Administrativo</option>
                          <option value="docente">Docente</option>
                          <option value="estudiante">Estudiante</option>
                        </Form.Select>
                      </InputGroup>
                    </Form.Group>

                    {/* EMAIL */}
                    <Form.Group className="mb-3">
                      <Form.Label className="custom-label">Correo electrónico</Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="custom-input-icon">
                          <BsPersonFill />
                        </InputGroup.Text>
                        <Form.Control
                          type="email"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          placeholder="Ingrese su correo"
                          required
                          className="custom-input"
                        />
                      </InputGroup>
                    </Form.Group>

                    {/* PASSWORD */}
                    <Form.Group className="mb-3">
                      <Form.Label className="custom-label">Contraseña</Form.Label>
                      <InputGroup>
                        <InputGroup.Text className="custom-input-icon">
                          <BsLockFill />
                        </InputGroup.Text>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Ingrese su contraseña"
                          required
                          className="custom-input"
                        />
                        <Button
                          type="button"
                          variant="light"
                          className="show-btn"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
                        </Button>
                      </InputGroup>
                    </Form.Group>
                     {/* recordarme y olvidaste contrasenia */}
                    {/* <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                      <Form.Check
                        type="checkbox"
                        label="Recordarme"
                        className="remember-check"
                      />
                      <span className="forgot-link">¿Olvidaste tu contraseña?</span>
                    </div> */}

                    <Button
                      type="submit"
                      className="login-btn w-100"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" />
                          Ingresando...
                        </>
                      ) : (
                        "Iniciar sesión"
                      )}
                    </Button>

                    {/* <div className="text-center mt-4">
                      <small className="footer-text">
                        © 2026 Sistema de Evaluación Docente - Escuela Maritima www.esma.edu.bo
                      </small>
                    </div> */}
                  </Form>
                </div>
              </Col>
            </Row>
          </motion.div>
        </Container>
      </div>
    </>
  );
};

export default Think;