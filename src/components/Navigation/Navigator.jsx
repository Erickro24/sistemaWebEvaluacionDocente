import {Link} from "react-router"
import UserNav from '../Forms/UserNav.jsx';
const Navigator = () =>{
    return (
       <nav className="navbar">
            <Link to="/login" className="nav-link">login</Link>
            <Link to="home" className="nav-link">Home</Link>
            <Link to="/contactos" className="nav-link">Contactos</Link>
            <div className="nav-user"><UserNav></UserNav></div>
       </nav> 
    )
}
export  default Navigator;