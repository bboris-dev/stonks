import React, {useMemo} from "react";
import Dropdown from "@components/Dropdown";

import "./Filter.css";

function getPercentFilterData(from, to) {
    const res = [];
    for (let i = from; i <= to; i++) {
        const item = {value: i, title: `${i}%`};
        if (i === from) {
            item.default = true;
        }

        res.push(item);
    }

    return res;
}

function getCompanyData() {
    return [
        {value: 1, title: 'Металлургия', default: true},
        {value: 2, title: 'Нефтяное искусство'},
        {value: 3, title: 'Энергетика'},
        {value: 4, title: 'Банковское дело'},
        {value: 5, title: 'IT индустрия'},
        {value: 6, title: ''},
    ];
}

export default function Filter() {
    const divItems = useMemo(() => getPercentFilterData(5, 20), []);
    const companyItems = useMemo(() => getCompanyData(), []);

    return (
        <div className="page_block filter_wrap">
            Дивиденды от <Dropdown items={divItems} />
            Отрасль компании <Dropdown items={companyItems} />
        </div>
    );
}