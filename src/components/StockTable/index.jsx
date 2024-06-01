import React from 'react';
import {Link} from "react-router-dom";

import "./StockTable.css";

function StockRow({index, name, icon = 'https://assets.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400', ticker, price, priceChange, dividends, sparkline}) {
    return (
        <tr className="stock_row">
            <td>{index}</td>
            <td className="stocks_table_name">
                <Link to="/top" className="stocks_name_wrap">
                    <img src={icon} alt={name} className="stocks_icon" />
                    <span className="stocks_name">{name}</span>
                    <span className="stocks_ticker">{ticker}</span>
                </Link>
            </td>
            <td>{price.value} {price.currency}</td>
            <td>{priceChange['1d']}</td>
            <td>{priceChange['7d']}</td>
            <td>{dividends.value}</td>
            <td>{dividends.lastDate}</td>
            {/*<td><img alt={name + " last 7 days price change"} src={sparkline} /></td>*/}
        </tr>
    );
}

export default function StockTable({stocks}) {
    return (
        <div className="stocks_wrap">
            <table className="stocks_table" cellPadding="0" cellSpacing="0" border="0">
                <thead className="stocks_table_head">
                    <tr>
                        <th>#</th>
                        <th className="stocks_table_name_head">Имя</th>
                        <th>Цена</th>
                        <th>24ч</th>
                        <th>7д</th>
                        <th>Дивиденды</th>
                        <th>Дата выплаты</th>
                        {/*<th>Последние 7 дней</th>*/}
                    </tr>
                </thead>
                <tbody className="stocks_table_body">
                    {stocks.map((stock, i) => <StockRow key={i} {...{index: i + 1, ...stock}} />)}
                </tbody>
            </table>
        </div>
    );
}