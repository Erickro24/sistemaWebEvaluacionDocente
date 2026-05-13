import { Link } from "react-router-dom";
import UserNav from "../Forms/UserNav.jsx";

const Navigator = () => {
  return (
    <nav className="navbar">
      <Link to="/login" className="nav-link"></Link>


      <div className="nav-user">
        <UserNav />
      </div>
    </nav>
  );
};

export default Navigator;