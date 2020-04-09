import React, {useState} from "react";
import TableContainer from "../../containers/TableContainer";

export default function TableList() {
    const [list, setList] = useState([<TableContainer />]);
    const handleAddTable = () => setList([...list, <TableContainer />]);
    return <>
        {list.map(item => item)}
        <div className="add-table__wrapper">
            <button className="add-table__button" onClick={handleAddTable}>Add table</button>
        </div>
        </>
}
