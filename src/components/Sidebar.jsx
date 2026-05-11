import { NavLink } from 'react-router-dom';

const Sidebar = ({ links }) => {

    return (
        <div className="sidebar">

            <h2>Informacion</h2>

            {
                links.map((link, index) => (

                    <NavLink
                        key={index}
                        to={link.path}
                        className={({ isActive }) =>
                            isActive ? 'active-link' : 'link'
                        }
                    >
                        {link.label}
                    </NavLink>
                ))
            }

        </div>
    );
};

export default Sidebar;