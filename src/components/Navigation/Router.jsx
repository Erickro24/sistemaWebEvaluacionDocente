import Home from '../../screens/Home.jsx';
import Convocatoria from '../../screens/Convocatoria.jsx';
import Login from '../../screens/Login.jsx';
import LandingPage from '../../screens/LandingPage.jsx';

import {Routes, Route} from "react-router";
const Router = () => {
    return (
        <Routes>
            <Route index element={<LandingPage />} />
            <Route path="home" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="convocatoria" element={<Convocatoria />} />
           
        </Routes>
    );
}

export default Router;