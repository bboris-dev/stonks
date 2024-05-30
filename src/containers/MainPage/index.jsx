import React from 'react';
import Filter from '@components/Filter';

import "./MainPage.css";

const MainPage = () => {
    return (
        <main className="mainpage">
            <div style={{height: "200px"}} />
            <Filter />
            <div className="page_block">
                filter results
                <h1>My little main page</h1>
            </div>
        </main>
    );
};

export default MainPage;