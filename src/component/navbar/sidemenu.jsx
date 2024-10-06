import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../asset/css/sidemenu.css'; // Ensure this path is correct
import { nav } from '../data/nav'; // Ensure this path is correct

const Sidemenu = ({ setSelectedMenuText }) => {
    const [navlist, setNavList] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const navigate = useNavigate();

    const handleScrollToTopAndNavigate = (path, text) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
            navigate(path);
            setSelectedMenuText(text); // Set the selected menu text here
        }, 500);
    };

    const handleNavLinkClick = (path, text) => {
        handleScrollToTopAndNavigate(path, text);
        setNavList(false);
    };

    const toggleSubmenu = (index) => {
        setActiveSubmenu(activeSubmenu === index ? null : index);
    };

    return (
        <section className='sidebars'>
            <div className='container flex'>
                <div className="sidebar">
                    <ul className={navlist ? "small" : "flex"}>
                        {nav.map((item, index) => (
                            <li key={index}
                                onMouseEnter={() => toggleSubmenu(index)}
                                onMouseLeave={() => toggleSubmenu(null)}>
                                <Link
                                    to={item.path}
                                    onClick={() => handleNavLinkClick(item.path, item.text)}>
                                    <i className={item.icon}></i> {item.text}
                                </Link>
                                {item.submenu && activeSubmenu === index && (
                                    <ul className="submenu">
                                        {item.submenu.map((subitem, subindex) => (
                                            <li key={subindex}>
                                                <Link
                                                    to={subitem.path}
                                                    onClick={() => handleNavLinkClick(subitem.path, subitem.text)}>
                                                    <i className={subitem.icon}></i> {subitem.text}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Sidemenu;