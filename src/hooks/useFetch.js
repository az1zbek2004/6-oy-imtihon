import { useEffect, useState } from "react";

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true)
        fetch(url, {
            method: 'GET',
            headers:{
                'X-API-KEY': 'ESSRH4Y-Z6AM52J-NVW1E5J-H5FM35Y'
        }
        })
         .then(res => res.json())
         .then(fetchedData => {
            setData(fetchedData);
         })
         .catch(err => {
            console.log(err);
            setError(err);
         })
         .finally(() => {
            setLoading(false)
         })
    }, [url])

    return {data, loading, error}
}

export default useFetch;