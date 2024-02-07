import { useState, useEffect } from 'react';
import axios from 'axios';

const useDocuments = () => {
    const [documents, setDocuments] = useState([]);
    const [error, setError] = useState(null);
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/documents', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setDocuments(response.data);
            } catch (error) {
                console.error('There was an error fetching the documents:', error);
                setError(error);
            }
        };

        if (token) {
            fetchDocuments();
        }
    }, [token]);

    return { documents, setDocuments, error };
};

export default useDocuments;
