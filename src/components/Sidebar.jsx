import { Link } from "react-router-dom";

const Sidebar = ({ links }) => {

    return (

        <div className="sidebar">

            <h2>Sistema ESMA</h2>

            {
                links.map((link, index) => (

                    <Link
                        key={index}
                        to={link.path}
                        className="sidebar-link"
                    >
                        {link.label}
                    </Link>
                ))
            }

        </div>
    );
};

export default Sidebar;