import React, {useState, useEffect, useCallback} from 'react';

import Dropdown from "@components/Dropdown";
import Filter from '@components/Filter';
import StockTable from "@components/StockTable";

import "./MainPage.css";

const DEFAULT_STOCKS_LIMIT = {value: 100, title: '100'};
const PAGE_ITEMS = [
    {value: 50, title: '50'},
    {value: 100, title: '100', default: true},
    {value: 300, title: '300'},
];

async function getData(filter, page, limit) {
    const offset = (page - 1) * limit;
    console.log('getData', offset, limit);

    // todo make backend request
    return [
        {
            id: 1,
            name: 'Yandex',
            ticker: 'YND',
            alias: 'yandex',
            price: {
                value: 120.23,
                currency: '₽',
            },
            priceChange: {
                '1d': 0.9,
                '7d': -1.1,
            },
            dividends: {
                value: 10.5,
                lastDate: new Date().getTime(),
            },
            sparkline: 'url/1'
        },
        {
            id: 2,
            name: 'VK',
            ticker: 'VK',
            alias: 'vk',
            price: {
                value: 560.00,
                currency: '₽',
            },
            priceChange: {
                '1d': -15.23,
                '7d': 115,
            },
            dividends: {
                value: 12,
                lastDate: new Date().getTime(),
            },
            sparkline: 'url/2'
        },
    ];
}

const MainPage = () => {
    const page = 1; // todo update with router params

    const [filter, setFilter] = useState({dividends: null, company: null});
    const [stocks, setStocks] = useState([]);
    const [stocksLimit, setStocksLimit] = useState(DEFAULT_STOCKS_LIMIT);

    const updateField = useCallback((field, value) => {
        setFilter(storedFilter => {
            storedFilter[field] = value;
            return storedFilter;
        });
    }, []);

    useEffect(() => {
        getData(filter, page, stocksLimit.value)
            .then(data => setStocks(data))
            .catch(err => {
                console.error('Error fetching filtered items:', err);
            });
    }, [filter]);

    return (
        <main className="mainpage">
            <Filter updateField={updateField} />
            <div className="page_block">
                <h1>My little main page</h1>
                {stocks.length > 0 && <span>Строки <Dropdown items={PAGE_ITEMS} onChange={item => setStocksLimit(item)} chosenValue={stocksLimit} /></span>}
                <div style={{padding: "10px 0"}}>
                    <StockTable stocks={stocks} />
                </div>
                {stocks.length > 0 && <span>Строки <Dropdown items={PAGE_ITEMS} onChange={item => setStocksLimit(item)} chosenValue={stocksLimit} /></span>}
            </div>
        </main>
    );
};

export default MainPage;