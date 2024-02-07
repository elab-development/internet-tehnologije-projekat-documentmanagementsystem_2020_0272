import { useState, useEffect } from 'react';
import axios from 'axios';

const useTags = () => {
    const [tags, setTags] = useState([]);
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/tags', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setTags(response.data);
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };

        if (token) {
            fetchTags();
        }
    }, [token]);

    return { tags, setTags };
};

export default useTags;
