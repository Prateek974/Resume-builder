import React from 'react';
const Navbar = () => {
    return(
    <header className="header-contianer">
        <nav className="navbar">
            <div className="navbar-logo">
                <a>SmartResume builder</a>
            </div>

            <ul className="navbar-links">
                <li>
                    <a>Home</a>
                </li>
                <li>
                    <a>contact</a>
                </li>
            </ul>
        </nav>
    </header>
); 
};
 export default Navbar;