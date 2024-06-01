import React from 'react';

import Header from "@components/Header";
import Footer from "@components/Footer";

import "./MainLayout.css";

export default ({header, footer, element: Element}) => {
    return (
        <>
            {header && <Header />}
            <main className="page_content">
                <Element />
                <div className="page_aside">
                    todo aside
                </div>
            </main>
            {footer && <Footer />}
        </>
    );
};