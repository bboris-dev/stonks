import React, {useMemo} from "react";
import Dropdown from "@components/Dropdown";

import "./Filter.css";

function getPercentFilterData(from, to, defaultValue = -1) {
    const res = [];
    for (let i = from; i <= to; i++) {
        const item = {value: i, title: `${i}%`};
        if (i === defaultValue) {
            item.default = true;
        }

        res.push(item);
    }

    return res;
}

function getCompanyData() {
    return [
        {value: 1, title: 'Металлургия'},
        {value: 2, title: 'Нефтяное искусство'},
        {value: 3, title: 'Энергетика'},
        {value: 4, title: 'Банковское дело'},
        {value: 5, title: 'IT индустрия'},
        {value: 6, title: 'Недвижимость'},
        {value: 7, title: 'Автомобильная промышленность'},
    ];
}

export default function Filter({updateField = () => {}}) {
    // todo fetch from backend
    const divItems = useMemo(() => getPercentFilterData(5, 20, 5), []);
    const companyItems = useMemo(() => getCompanyData(), []);

    return (
        <div className="page_block filter_wrap">
            Дивиденды от <Dropdown items={divItems} onChange={(item) => updateField('dividends', item.value)} />
            Отрасль компании <Dropdown items={companyItems} onChange={(item) => updateField('company', item.value)} />
        </div>
    );
}