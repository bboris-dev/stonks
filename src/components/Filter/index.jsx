import React from "react";
import Dropdown from "@components/Dropdown";

import "./Filter.css";

export default function Filter() {

    return (
        <div className="page_block filter_wrap">
            <Dropdown />
            <Dropdown />
            Дивиденды % (select from and select to)
        </div>
    );
}