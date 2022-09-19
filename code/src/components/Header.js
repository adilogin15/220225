import React from 'react';
import "../styles/header.css";

// Sets up a basic header component with company logo and h1 tag
function Header () {
    return (
        <header className = "header">
            <img src="https://www.infosys.com/content/dam/infosys-web/en/global-resource/media-resources/infosys-nyn-tagline-png.png" alt="Infosys" />
            <h2>Since 1981</h2>
        </header>
    );
}

export default Header;
