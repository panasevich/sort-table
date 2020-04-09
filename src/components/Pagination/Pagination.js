import React from "react";
import PaginationButton from "./PaginationButton";

export default function Pagination ({pages, activePage, onSelectPage}) {
    const pagesArray = [...Array(pages).keys()] ;
    const handleClick = page => onSelectPage(page);
    return <div className="pagination__wrapper">
        {
            pagesArray &&
            pagesArray.map((item) =>
                <PaginationButton
                    key={`pagination-button-${item}`}
                    active={activePage === item + 1}
                    page={item + 1}
                    selectPage={handleClick}
                />
                )
        }
    </div>
}
