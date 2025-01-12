import { Link } from 'react-router-dom';
import { BiCameraMovie, BiSearchAlt2 } from 'react-icons/bi';
import './NavBar.css';

const NavBar = () => {
    return (
        <div className="navContainer">
            <div className="navBar">
                <h2>
                    <Link to="/">
                        <BiCameraMovie />
                        WK Movies
                    </Link>
                </h2>
                <form action="">
                    <input type="text" placeholder="Busque um filme" />
                    <button type="submit">
                        <BiSearchAlt2 />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NavBar;
