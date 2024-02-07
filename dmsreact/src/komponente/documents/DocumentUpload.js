import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import './DocumentUpload.css';  
import InputField from '../auth/InputField';
import { useNavigate } from 'react-router-dom';
import useCategories from '../customHooks/useCategories';
import useTags from '../customHooks/useTags';

const DocumentUpload = () => {
    let navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        author_id: '',
        category_id: '',
        new_category_name: '', // Dodali smo polje za unos novog naziva kategorije
        tags: '',
        file: null,
        is_public: false,
        downloads: 0
    });

    const { categories, setCategories } = useCategories();
    const { tags, setTags } = useTags();

    const handleChange = (e) => {
        const { name, type, value, options } = e.target;
        
        if (type === 'select-multiple') {
            let selectedValues = Array.from(options).filter(o => o.selected).map(o => o.value);
            setFormData({ ...formData, [name]: selectedValues });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('token');
    
        const data = new FormData();
        data.append('title', formData.title);
        data.append('content', formData.content);
        data.append('author_id', Number(sessionStorage.getItem("id")));
    
        // Check if a new category name is provided
        if (formData.new_category_name) {
            // If new category name is provided, use it
            data.append('category_name', formData.new_category_name);
        } else if (formData.category_id) {
            // If an existing category is selected and no new category name is provided
            const selectedCategory = categories.find(category => category.id.toString() === formData.category_id);
            if (selectedCategory) {
                data.append('category_name', selectedCategory.name);
            } else {
                // Handle error if category_id is set but no matching category is found
                console.error('Selected category not found');
                return; // Stop the form submission
            }
        } else {
            // If neither new category name is provided nor an existing category is selected
            // You might want to handle this as an error or a case of missing category information
            console.error('No category selected or provided');
            return; // Stop the form submission
        }
        
        // Append other form data
        data.append('tags[]', formData.tags);
        data.append('file', formData.file);
        data.append('is_public', formData.is_public);
        data.append('downloads', formData.downloads);
    
        axios.post('http://127.0.0.1:8000/api/documents', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('Document uploaded successfully:', response.data);
            alert('Document uploaded successfully');
            navigate('/docs');
        })
        .catch(error => {
            console.error('Error uploading document:', error);
        });
    };
    
    

    return (
        <div className="register-container">
            <div className="register-card">
                <h3>Upload Document</h3>
                <form onSubmit={handleSubmit} className="register-form">
                    <InputField label="Title" type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
                    <InputField label="Content" type="text" id="content" name="content" value={formData.content} onChange={handleChange} required />
                    <div className="input-group">
                        <label htmlFor="category_id">Category</label>
                        <select id="category_id" name="category_id" value={formData.category_id} onChange={handleChange}>
                            <option value="">Select or create a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                   
                    <InputField label="New Category Name" type="text" id="new_category_name" name="new_category_name" value={formData.new_category_name} onChange={handleChange} />
                    <div className="input-group">
                        <label htmlFor="tags">Tags</label>
                        <select id="tags" name="tags" multiple value={formData.tags} onChange={handleChange} required>
                            {tags.map((tag) => (
                                <option key={tag.id} value={tag.id}>
                                    {tag.name}
                                </option>
                            ))}
                        </select>
                    </div> 
                    <InputField label="File" type="file" id="file" name="file" onChange={handleFileChange} required />
                    <button type="submit" className="register-button">Upload</button>
                </form>
            </div>
        </div>
    );
};

export default DocumentUpload;
