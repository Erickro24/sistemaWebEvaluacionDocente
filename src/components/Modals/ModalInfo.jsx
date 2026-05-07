import { motion } from "motion/react"

import { useDispatch } from 'react-redux'
import { logout, resetForm } from '../../store/features/forms/formSlice.js';
// eslint-disable-next-line react/prop-types
const ModalInfo = ({ visible, message, onClose }) => {
    const dispatch = useDispatch();

    if (!visible) {
        return null;
    }

    const onHandleLogout = () => {
        dispatch(logout());
        dispatch(resetForm());  
        onClose();
    };

return (
        <div className="modal-overlay">
            <motion.div
                className="notification-info"
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
            >
                <div className="button2">
                    <p>{message}</p><button onClick={onHandleLogout}>Presionar aqui para salir!!!</button>
                </div>
                <button
                    className="close-btn-success"
                    onClick={onClose}>
                    X
                </button>
            </motion.div>
            
        </div>
        
    );
    
};

export default ModalInfo;