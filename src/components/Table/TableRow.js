import React from "react";

export default function TableRow({id, title, completed, selectRow}) {
    const handleClick = () => selectRow(id);
    return (
        <div className="table__row" onClick={handleClick}>
            <div className="table__id">{id}</div>
            <div className="table__title">{title}</div>
            <div className="table__completed"><input type="checkbox" checked={completed}/></div>
        </div>
    )
}
