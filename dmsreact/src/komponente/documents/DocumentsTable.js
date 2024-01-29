import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DocumentsTable.css';

const DocumentsTable = () => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/documents')
            .then(response => {
                setDocuments(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the documents:', error);
            });
    }, []);

    return (
        <div className="documents-container">
            <table className="documents-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Author ID</th>
                        <th>Category ID</th>
                        <th>Tags</th>
                        <th>Public</th>
                        <th>Downloads</th>
                    </tr>
                </thead>
                <tbody>
                    {documents.map((document) => (
                        <tr key={document.id}>
                            <td>{document.id}</td>
                            <td>{document.title}</td>
                            <td>{document.content}</td>
                            <td>{document.author_id}</td>
                            <td>{document.category_id}</td>
                            <td>{document.tags.join(', ')}</td>
                            <td>{document.is_public ? 'Yes' : 'No'}</td>
                            <td>{document.downloads}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DocumentsTable;
