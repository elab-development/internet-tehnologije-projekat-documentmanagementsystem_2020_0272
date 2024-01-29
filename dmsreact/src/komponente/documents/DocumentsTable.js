import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DocumentsTable.css';
import DocumentTableRow from './DocumentTableRow';
import useDocuments from './useDocuments';

const DocumentsTable = () => {
    const { documents,setDocuments, error } = useDocuments();
    // const [documents, setDocuments] = useState([]);

    // useEffect(() => {
    //     axios.get('http://127.0.0.1:8000/api/documents')
    //         .then(response => {
    //             setDocuments(response.data);
    //         })
    //         .catch(error => {
    //             console.error('There was an error fetching the documents:', error);
    //         });
    // }, []);
 
    const handleDownload = (documentId, fileName) => {
        axios({
            url: `http://127.0.0.1:8000/api/documents/${documentId}/download`,  
            method: 'GET',
            responseType: 'blob', // Važno za preuzimanje fajlova  */////Opcija responseType: 'blob' u Axios zahtevu označava da želite da odgovor koji primate od servera bude predstavljen kao "Blob" objekt u JavaScriptu. "Blob" (Binary Large Object) je tip objekta koji se koristi za predstavljanje binarnih podataka, kao što su slike, audio datoteke, ili u ovom slučaju, datoteke koje preuzimate sa servera.
        })
        .then((response) => {
          
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName); 
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        })
        .catch((error) => {
            console.error('There was an error downloading the file:', error);
        });
    };
    const handleDelete = (documentId) => {
        
        const token = sessionStorage.getItem('token');  
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }; 
        axios.delete(`http://127.0.0.1:8000/api/documents/${documentId}`, config)
            .then(() => {
                setDocuments(documents.filter(document => document.id !== documentId));
            })
            .catch((error) => {
                console.error('Došlo je do greške prilikom brisanja dokumenta:', error);
            });
    };
    if (error) {
        return <div>Došlo je do greške: {error.message}</div>;
    }
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
                        <th>Download</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {documents.map((document) => (
                        <DocumentTableRow
                            key={document.id}
                            document={document}
                            onDelete={handleDelete}
                            onDownload={handleDownload}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DocumentsTable;