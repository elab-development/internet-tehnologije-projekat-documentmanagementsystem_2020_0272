 
import { useState, useEffect } from 'react';
import axios from 'axios';

const useTags = () => {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/tags')
            .then(response => {
                setTags(response.data);
            })
            .catch(error => {
                console.error('Error fetching tags:', error);
            });
    }, []);

    return {tags,setTags};
};

export default useTags;
