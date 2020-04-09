import React, {useState} from "react";
import TableView from "../../components/TableView";

export default function TableContainer ({fetchData}) {
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);
    const handleSelect = () => {
        setLoading(true);
        !data &&
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => {
                setLoading(false);
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error();
                }
            }).then(json => {
            setData(json);
        }).catch(err => setError(err));
    };
    return <TableView data={data} isLoading={isLoading} error={error} fetchData={handleSelect} />
}
