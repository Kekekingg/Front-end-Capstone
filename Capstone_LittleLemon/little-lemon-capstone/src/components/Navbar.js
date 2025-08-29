import Logo from '../Assets/icons_assets/Logo.svg'
import LogoAlt from '../Assets/icons_assets/little-lemon-grey-logo2.png'
import { useState } from 'react';

function Nav() {
    const [logoSrc, setLogoSrc] = useState(Logo);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }
    return (
        <nav className={`nav-container ${menuOpen ? "open" : ""}`}>
            <div className='nav-list'>
                <a href="/#" className="nav-logo">
                    <img 
                    src={logoSrc} 
                    alt="Little Lemon Logo" 
                    className="logo_LiLemon"
                    onMouseEnter={() => setLogoSrc(LogoAlt)}
                    onMouseLeave={() => setLogoSrc(Logo)}
                    style={{ transition: '0.5s'}}
                    />
                </a>
                {/* Hamburger Menu Icon| Mobil navbar */}
                <div className="menu-icon"
                    onClick={toggleMenu}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>

                {/* Navigation Links */}
                <ul className={`nav-links ${menuOpen ? "visible" : ""}`}>
                    <li><a href="/#">Home</a></li>
                    <li><a href="/#">About</a></li>
                    <li><a href="/#">Menu</a></li>
                    <li><a href="/#">Reservations</a></li>
                    <li><a href="/#">Order Online</a></li>
                    <li><a href="/#">Login</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav;