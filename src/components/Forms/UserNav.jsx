import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
// eslint-disable-next-line no-unused-vars
import { logout, resetForm } from '../../store/features/forms/formSlice.js';
import ModalInfo from "../../components/Modals/ModalInfo.jsx";

const UserNav = () => {
    // eslint-disable-next-line no-unused-vars
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.form.isLoggedIn);    
    
    

    const [showModal, setShowModal] = useState(false);
    const onCloseModal = () => {
        setShowModal(false);        
    };
    
    const onShowModal = () => {
        setShowModal(true);        
    };
 
    return (
        <>
        <ModalInfo visible={showModal} 
                       message="Estas seguro que quieres cerrar sesion? "
                       onClose={onCloseModal} 
            />
            {isLoggedIn ? (
                <>
                <span>Bienvenido </span>
                <button className="btn2" onClick={ onShowModal }>Cerrar Sesión</button>
                </>
            ) : (
                <span></span>
            )}
        </>
    );
    
};

export default UserNav;