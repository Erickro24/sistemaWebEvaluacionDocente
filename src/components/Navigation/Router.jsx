import Home from '../../screens/Home.jsx';
import Convocatorias from '../../screens/Convocatorias.jsx';
import Inicio from '../../screens/Inicio.jsx';
import LandingPage from '../../screens/LandingPage.jsx';
import Contactos from '../../screens/Contactos.jsx';

import {Routes, Route} from "react-router";
const Router = () => {
    return (
        <Routes>
            <Route path="inicio" element={<Inicio />} />
            <Route index element={<LandingPage />} />
            <Route path="home" element={<Home />} />
            <Route path="convocatorias" element={<Convocatorias />} />
            <Route path="contactos" element={<Contactos />} />
           
        </Routes>
    );
}

export default Router;