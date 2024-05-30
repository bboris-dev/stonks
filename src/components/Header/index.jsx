import React from "react";
import {Link} from "react-router-dom";

import "./Header.css";

import LogoLight from "@assets/icons/logo-light.svg?jsx";

// todo move to config with translation or something else
const links = [
    {name: 'Home', path: '/'},
    {name: 'Top', path: '/top'},
    {name: 'Hot', path: '/hot'},
];

export default function Header() {
    const path = window.location.pathname;

    return (
        <header className="page_header">
            <div className="topbar">
                <Link to="/" className="topbar_logotype">
                    <LogoLight className="logotype_icon" />
                    <span className="logotype_company">Boris Stonks</span>
                </Link>
                <nav className="topbar_nav">
                    {links.map((lnk, i) => <Link to={lnk.path} className={path === lnk.path ? "active" : ""} key={"topbar_lnk_" + i}>{lnk.name}</Link>)}
                </nav>
            </div>
        </header>
    );
};