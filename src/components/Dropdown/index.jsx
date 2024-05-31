import React, {useState, useRef, useEffect, useCallback} from "react";
import {className} from "@helpers/class";

import "./Dropdown.css";

// todo add translate
const DEFAULT_ITEM = {value: null, title: 'Не выбрано'};
const ID_PREFIX = 'dropdown_element_';

// todo уйти от фиксированных значений
const DROPDOWN_WIDTH = 224;
const DROPDOWN_ITEM_HEIGHT = 46.5;
const DROPDOWN_HEAD_HEIGHT = 40;
const DROPDOWN_ITEMS_GAP = 10;

const DEFAULT_DROP_POS = [0, -DROPDOWN_HEAD_HEIGHT];

function countDropdownPos(el, itemsLength) {
    const bounds = el.getBoundingClientRect();
    const bottom = bounds.bottom + window.scrollY + DROPDOWN_ITEM_HEIGHT * itemsLength;
    const right = bounds.left + window.scrollX + DROPDOWN_WIDTH;

    const canDrawRight = document.documentElement.clientWidth > right;
    const canDrawBot = document.documentElement.clientHeight > bottom;

    const x = canDrawRight ? 0 : (-DROPDOWN_WIDTH + bounds.width);
    const y = canDrawBot ? (DROPDOWN_ITEM_HEIGHT * itemsLength + DROPDOWN_ITEMS_GAP) : -DROPDOWN_HEAD_HEIGHT;

    return [x, y];
}

export default function Dropdown({items, onChange = () => {}}) {
    // todo remove mock
    items = [
        {value: 0, title: 'value 1', default: true},
        {value: 3, title: 'value 3'},
        {value: 4, title: 'value 4'},
        {value: 5, title: 'value 5'},
    ];

    const [activeItem, setActiveItem] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [pos, setPos] = useState(DEFAULT_DROP_POS);

    const dropRef = useRef(null);
    const recalculatePos = () => {
        setPos(countDropdownPos(dropRef.current, items.length));
    };

    const changeItem = useCallback((item) => {
        setActiveItem(item);
        onChange(item);
    }, []);

    const handleBodyClick = useCallback((e) => {
        if (dropRef.current.contains(e.target)) {
            return;
        }

        setIsOpen(false);
    }, []);

    useEffect(() => {
        if (activeItem !== null) {
            return;
        }

        // установка значения по-умолчанию
        const itemsLen = items.length;
        let startItem = null;
        for (let i = 0; i < itemsLen; i++) {
            const item = items[i];
            if (item.default === true) {
                startItem = item;
                break;
            }
        }

        // если не передали значение по-умолчанию в настройках, берем дефолт системный
        changeItem(startItem ?? DEFAULT_ITEM);

        // установка событий пересчета позиции
        window.addEventListener('resize', recalculatePos, false);
        document.addEventListener('click', handleBodyClick, false);

        return () => {
            window.removeEventListener('resize', recalculatePos);
            document.removeEventListener('click', handleBodyClick);
        };
    }, []);

    const toggleItems = useCallback(() => {
        setIsOpen(isOpenVal => !isOpenVal);

        // перед открытием делаем пересчет
        if (isOpen === false) {
            recalculatePos();
        }
    }, []);

    const changeValue = useCallback((e) => {
        const id = e.target.getAttribute('id').replace(ID_PREFIX, '');
        const item = items[id];
        if (!item) {
            console.error('Undefined dropdown element', id, items);
            return;
        }

        changeItem(item);
        setIsOpen(false);
    }, []);

    // не рендерим компонент без дефолт значения
    if (activeItem === null) {
        return (<></>);
    }

    return (
        <div className="dropdown" ref={dropRef} onScroll={recalculatePos} data-title={activeItem.title} data-value={activeItem.value}>
            <div className={className('dropdown_head', {'active': isOpen})}>
                <div className="dropdown_title" onClick={toggleItems}>
                    <span className="dropdown_title_text">{activeItem.title}</span>
                    <i className={className('dropdown_arrow fas', {'fa-chevron-down': !isOpen, 'fa-chevron-up': isOpen})} />
                </div>
            </div>
            <div className={className('dropdown_elements', {'active': isOpen})} style={{transform: `translate(${pos[0]}px, ${pos[1]}px)`}}>
                {items.map((item, i) => <div className={className('dropdown_element', {"active": item.value === activeItem.value})} id={ID_PREFIX + i} key={'dropdown-item-' + i} onClick={changeValue}>{item.title}</div>)}
            </div>
        </div>
    );
}