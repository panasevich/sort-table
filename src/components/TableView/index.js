import React from "react";
import TableComponent from "../Table/Table";

export default function TableView({data, fetchData, error, isLoading}) {
    const handleSelect = () => fetchData();
    return(<>
        {!data &&
        <div className="choose-data__wrapper">
            <button className="choose-data__button" onClick={handleSelect}>Big data</button>
            <button className="choose-data__button" disabled>Own data</button>
            {isLoading && <div className="loading">Loading data ...</div>}
        </div>
        }

        {data &&
        <TableComponent data={data} />
        }
        {error && <div className="error">Something went wrong.</div>}
    </>);
}
