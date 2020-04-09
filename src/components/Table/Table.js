import React, {useEffect, useState} from "react";
import TableRow from "./TableRow";
import Pagination from "../Pagination/Pagination";
import {paginationLimit} from "../../config/paginationConfig";

export default function TableComponent({data}) {
    const [pagedData, setPagedData] = useState(data.length / paginationLimit);
    const [newData, setNewData] = useState(data);
    const [filterData, setFilterData] = useState(null);
    const [startPage, setStartPage] = useState(1);
    const [isSorted, setSorted] = useState(0);
    const [filter, setFilter] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
    const handleSelectPage = (page) => setStartPage(page);
    const comparePage = (idx) => idx >= (startPage - 1)*paginationLimit && idx < startPage*paginationLimit;

    useEffect(() => {
        setNewData(data.filter((item, idx) => comparePage(idx)));
        setSorted(0);
        if (filterData) {
            setNewData(filterData.filter((item, idx) => comparePage(idx)));
        }
    }, [startPage]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (filter) {
            setStartPage(1);
            const filteredData = data.filter(({title}) => title.includes(filter));
            setPagedData(Math.round(filteredData.length / paginationLimit));
            setFilterData(filteredData);
        } else {
            setPagedData(Math.round(data.length / paginationLimit));
            setNewData(data.filter((item, idx) => comparePage(idx)));
            setFilterData(null);
        }
    }, [filter]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (filterData) {
            setNewData(filterData.filter((item, idx) => comparePage(idx)));
        } else {
            setFilterData(null)
        }
    }, [filterData]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if(isSorted) {
            setNewData([...newData].sort((a, b) => isSorted > 0 ? b.id - a.id : a.id - b.id));
        }
    }, [isSorted]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleSort = () => {
        switch (isSorted) {
            case 0: return setSorted(1);
            case 1: return setSorted(-1);
            case -1: return setSorted(1);
            default: setSorted(0);
        }
    };

    const handleChangeFilter = ({target: {value}}) => setFilter(value);

    const handleSelectRow = row => setSelectedRow(newData.find(({id}) => id === row));

    return(
        <div className="table__wrapper">
            <div className="table__filter">
                <label htmlFor="filter">Filter titles:</label><input name="filter" type="text" value={filter} onChange={handleChangeFilter} />
            </div>
            <div className="table">
                <div className="table__header table__row">
                    <div className="table__id">Id</div>
                    <div className="table__title" onClick={handleSort}>Title</div>
                    <div className="table__completed">Completed</div>
                </div>
                <div className="table__body">
                    {newData.map(({id, title, completed}) => <TableRow id={id} key={`${id}-id`} title={title} completed={completed} selectRow={handleSelectRow} />)}
                </div>
            </div>
            <div className="table__selected-row">
                <div className="table__selected-label">Selected row:</div> {selectedRow && selectedRow.title}
            </div>
            <Pagination pages={pagedData} activePage={startPage} onSelectPage={handleSelectPage} />
        </div>

    )
}
