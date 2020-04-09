import React from "react";

export default function PaginationButton({page, active, selectPage}) {
    const handleClick = () => selectPage(page);
    return <button
        className={`pagination__button ${active && 'pagination__button-active'}`}
        onClick={handleClick}
    >
        {page}
    </button>
}
