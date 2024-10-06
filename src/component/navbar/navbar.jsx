import React from 'react';
import '../../asset/css/Navbar.css';
import userimg from '../../asset/img/user.png'

const Header = ({ selectedMenuText }) => {
    return (
        <header>
            <div className='container flex'>
                <div className="menusitem">
                    <label>{selectedMenuText || "Select a menu"}</label>
                </div>
                <div className="userprofile">
                    <img src={userimg} className='userimage' alt="User"/>
                    <i class="fa-solid fa-angle-down"></i>
                    
                </div>

            </div>
        </header>
    );
};

export default Header;