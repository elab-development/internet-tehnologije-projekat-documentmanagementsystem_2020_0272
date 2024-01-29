import { useState, useEffect } from 'react';
import axios from 'axios';

const useDocuments = () => {
    const [documents, setDocuments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/documents')
            .then(response => {
                setDocuments(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the documents:', error);
                setError(error);
            });
    }, []);

    return { documents,setDocuments, error };
};

export default useDocuments;
