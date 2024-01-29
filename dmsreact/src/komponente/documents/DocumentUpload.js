import React, { useState } from 'react';
import axios from 'axios';
 
import './DocumentUpload.css';  
import InputField from '../auth/InputField';

const DocumentUpload = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        author_id: '',
        category_id: '',
        tags: '',
        file: null,
        is_public: false,
        downloads: 0
    });
    const handleChange = (e) => {
        const { name, type, checked } = e.target;
        let newValue;
    
        if (type === 'checkbox') {
            newValue = checked ? 1 : 0; // Ako je checkbox označen, vrednost će biti 1, inače 0
        } else {
            newValue = e.target.value;
        }
    
        setFormData({ ...formData, [name]: newValue });
    };
    
    

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData.is_public)
        const data = new FormData();
        data.append('title', formData.title);
        data.append('content', formData.content);
        data.append('author_id', Number(sessionStorage.getItem("id")));
        data.append('category_id', formData.category_id);
        data.append('tags[]', formData.tags); // Ovo je niz u   Laravel aplikaciji
        data.append('file', formData.file);
        data.append('is_public', formData.is_public);
        data.append('downloads', formData.downloads);

        axios.post('http://127.0.0.1:8000/api/documents', data)
            .then(response => {
                console.log('Document uploaded successfully:', response.data);
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
                    
                    <InputField label="Category ID" type="text" id="category_id" name="category_id" value={formData.category_id} onChange={handleChange} required />
                    <InputField label="Tags" type="text" id="tags" name="tags" value={formData.tags} onChange={handleChange} required />
                    <InputField label="File" type="file" id="file" name="file" onChange={handleFileChange} required />
                    <InputField label="Is public" type="checkbox" id="is_public" name="is_public" value={formData.is_public} onChange={handleChange} />
                    <button type="submit" className="register-button">Upload</button>
                </form>
            </div>
        </div>
    );
};

export default DocumentUpload;
