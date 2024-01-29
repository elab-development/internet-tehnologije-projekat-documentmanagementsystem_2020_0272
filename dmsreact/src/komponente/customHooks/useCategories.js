 
import { useState, useEffect } from 'react';
import axios from 'axios';

const useCategories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    return {categories,setCategories};
};

export default useCategories;
