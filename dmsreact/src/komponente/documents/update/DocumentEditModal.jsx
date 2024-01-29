import React, { useState } from 'react';
import InputField from '../../auth/InputField';
import './DocumentEditModal.css';  

const DocumentEditModal = ({ document, categories, tags, onSave, onClose }) => {
    const [editFormData, setEditFormData] = useState({
        title: document.title,
        content: document.content,
        category_id: document.category_id,
        tags: document.tags.map(tag => tag.toString()),
        
    });

    const handleChange = (e) => {
        const { name, value, options } = e.target;
    
        if (name === "tags") {
            const selectedTags = Array.from(options)
                                     .filter(option => option.selected)
                                     .map(option => option.value);
            setEditFormData({ ...editFormData, [name]: selectedTags });
        } else {
            setEditFormData({ ...editFormData, [name]: value });
        }
    };
    

    const handleSave = () => {
        onSave(document.id, editFormData);
        onClose();  
    };

    return (
        <div className="document-edit-modal">
            <div className="modal-content">
                <h3>Edit Document</h3>
                <InputField label="Title" type="text" name="title" value={editFormData.title} onChange={handleChange} />
                <InputField label="Content" type="text" name="content" value={editFormData.content} onChange={handleChange} />
                <div className="input-group">
                    <label htmlFor="category_id">Category</label>
                    <select name="category_id" value={editFormData.category_id} onChange={handleChange}>
                    <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="input-group">
                    <label htmlFor="tags">Tags</label>
                    <select name="tags" multiple value={editFormData.tags} onChange={handleChange}>
                        {tags.map((tag) => (
                                <option key={tag.id} value={tag.id}>
                                    {tag.name}
                                </option>
                            ))}
                    </select>
                </div>
                <button onClick={handleSave}>Save</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default DocumentEditModal;
