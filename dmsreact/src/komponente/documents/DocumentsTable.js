import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DocumentsTable.css';
import DocumentTableRow from './DocumentTableRow';
import useDocuments from '../customHooks/useDocuments';
import useCategories from '../customHooks/useCategories';
import useTags from '../customHooks/useTags';
import DocumentEditModal from './update/DocumentEditModal';


const DocumentsTable = () => {
    const { documents,setDocuments, error } = useDocuments();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentDocument, setCurrentDocument] = useState(null);
    const [filterByTags, setFilterByTags] = useState([]);
    const [filterByCategory, setFilterByCategory] = useState('');
    const [filteredDocuments, setFilteredDocuments] = useState([]);
    const {categories,setCategories} = useCategories();
    const {tags,setTags} = useTags();
    const [currentPage, setCurrentPage] = useState(1);
    const documentsPerPage = 3;

    const handleEdit = (document) => {
        setCurrentDocument(document);
        setIsEditModalOpen(true);
    };
    const handleSaveEdit = (documentId, editFormData) => {
        const token = sessionStorage.getItem('token');  
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' // Ako šaljete JSON
            }
        }; 
    
        const updatedData = {
            ...editFormData,
            tags: editFormData.tags.map(Number)
        };
        console.log(updatedData.tags)
        axios.put(`http://127.0.0.1:8000/api/documents/${documentId}`, updatedData, config)
            .then(response => {
                // Ažuriranje prikaza dokumenata
                setDocuments(documents.map(doc => doc.id === documentId ? {...doc, ...response.data} : doc));
                alert('Document updated successfully');
                setIsEditModalOpen(false); // Zatvaranje modala
            })
            .catch(error => {
                console.error('Error updating document:', error);
            });
    };
    
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
    useEffect(() => {
     
        const filterDocuments = () => {
            let updatedFilteredDocuments = [...documents];

            if (filterByCategory) {
                updatedFilteredDocuments = updatedFilteredDocuments.filter(document => document.category_id.toString() === filterByCategory);
            }

            if (filterByTags.length > 0) {
                updatedFilteredDocuments = updatedFilteredDocuments.filter(document =>
                    filterByTags.every(tag => document.tags.map(tag => tag.toString()).includes(tag))
                );
            }

            setFilteredDocuments(updatedFilteredDocuments);
        };

        filterDocuments();
    }, [documents, filterByTags, filterByCategory]);   // Ovde primenjujemo filtere svaki put kada se promeni stanje `documents`, `filterByTags`, ili `filterByCategory`
      
    if (error) {
        return <div>Došlo je do greške: {error.message}</div>;
    }
    const indexOfLastDocument = currentPage * documentsPerPage;
    const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
    const currentDocuments = filteredDocuments.slice(indexOfFirstDocument, indexOfLastDocument);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredDocuments.length / documentsPerPage); i++) {
      pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map(number => {
        return (
          <li key={number} className='page-item'>
            <button onClick={() => paginate(number)}   className='page-link'>
              {number}
            </button>
          </li>
        );
      });
    return (
        <div className="documents-container">
            <div className="filter-container">
                <div className="input-group">
                    <label htmlFor="filter-category">Filter by Category</label>
                    <select id="filter-category" value={filterByCategory} onChange={(e) => setFilterByCategory(e.target.value)}>
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                        {category.name}
                        </option>
                    ))}
                    </select>
                </div>
                <div className="input-group">
                    <label htmlFor="filter-tags">Filter by Tags</label>
                    <select id="filter-tags" multiple value={filterByTags} onChange={(e) => {
                    const options = e.target.options;
                    const value = [];
                    for (let i = 0, l = options.length; i < l; i++) {
                        if (options[i].selected) {
                        value.push(options[i].value);
                        }
                    }
                    setFilterByTags(value);
                    }}>
                    {tags.map((tag) => (
                        <option key={tag.id} value={tag.id}>
                        {tag.name}
                        </option>
                    ))}
                    </select>
                </div>
                </div>

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
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {currentDocuments.map((document) => (
                        <DocumentTableRow
                        key={document.id}
                        document={document}
                        onDelete={handleDelete}
                        onDownload={handleDownload}
                        onEdit={handleEdit}
                        />
                    ))}
                    </tbody>

            </table>
            <div>
            <ul className='pagination'>
                {renderPageNumbers}
            </ul>
            </div>

            {isEditModalOpen && currentDocument && (
                <DocumentEditModal
                    document={currentDocument}
                    categories={categories}
                    tags={tags}
                    onSave={handleSaveEdit}
                    onClose={() => setIsEditModalOpen(false)}
                />
            )}
        </div>
    );
};

export default DocumentsTable;
