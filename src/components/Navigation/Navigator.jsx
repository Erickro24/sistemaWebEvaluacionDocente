import {Link} from "react-router"
import UserNav from '../Forms/UserNav.jsx';
const Navigator = () =>{
    return (
       <nav className="navbar">
            <Link to="/" className="nav-link">LandinPage</Link>
            <Link to="home" className="nav-link">Home</Link>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/convocatoria" className="nav-link">Convocatoria</Link>
            <div className="nav-user"><UserNav></UserNav></div>
       </nav> 
    )
}
export  default Navigator;