import React from "react";
import LOogo from '../Assets/lord-murugan-clipart-png.png'

const Navbar = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <img src={LOogo} alt="logo" style={{ height: "70px", width: '60px' }} />
            <h2 className="custom-logo-head-navav">ARLUMIGU THANDAYUTHAPANI KOVIL</h2>

        </div>
    )
}
export default Navbar