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
    const [searchTerm, setSearchTerm] = useState('');
    
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
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
            tags: editFormData.tags 
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
    
 
 
    const handleDownload = (documentId, fileName) => {
        axios({
            url: `http://127.0.0.1:8000/api/documents/${documentId}/download`,  
            method: 'GET',
            responseType: 'blob', // Važno za preuzimanje fajlova  */////Opcija responseType: 'blob' u Axios zahtevu označava da želite da odgovor koji primate od servera bude predstavljen kao "Blob" objekt u JavaScriptu. "Blob" (Binary Large Object) je tip objekta koji se koristi za predstavljanje binarnih podataka, kao što su slike, audio datoteke, ili u ovom slučaju, datoteke koje preuzimate sa servera.
        })
        .then((response) => {
          
            const blob = new Blob([response.data], { type: response.headers['content-type'] });  //Ova linija koda stvara objekt Blob (Binary Large Object) koji predstavlja binarni podatak. response.data pretpostavlja se da sadrži binarni podatak koji je došao kao odgovor na HTTP zahtjev. response.headers['content-type'] koristi se za postavljanje tipa sadržaja (MIME tip) za taj objekt Blob, na osnovu informacija iz zaglavlja odgovora.
            const url = window.URL.createObjectURL(blob);  //Ova linija koda koristi window.URL.createObjectURL metodu kako bi se stvorila URL adresa koja se odnosi na Blob objekt stvoren u prethodnoj liniji. Ova URL adresa će biti privremeno dostupna i može se koristiti za preuzimanje sadržaja.
            const link = document.createElement('a'); //Ova linija koda stvara novi HTML element <a> (hipertekstualna veza) koji će se koristiti za kreiranje linka za preuzimanje datoteke.
            link.href = url;  //Ova linija koda postavlja href atribut HTML elementa <a> na prethodno stvorenu URL adresu, čime se veza povezuje s Blob objektom i omogućava preuzimanje sadržaja.
            link.setAttribute('download', fileName);  //Ova linija koda postavlja atribut download na HTML elementu <a> i dodjeljuje mu vrijednost fileName. To omogućava korisnicima da preuzmu sadržaj sa zadanim imenom datoteke kada kliknu na vezu.
            document.body.appendChild(link); //Ova linija koda dodaje HTML element <a> u telo (body) HTML dokumenta, čime se omogućava njegovo prikazivanje na stranici.
            link.click(); //pokrece preuzimanje fajla
            link.parentNode.removeChild(link); //Na kraju, ova linija koda uklanja HTML element <a> iz dokumenta kako bi se oslobodili resursi i očistila stranica od tog elementa nakon preuzimanja.

            
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
                updatedFilteredDocuments = updatedFilteredDocuments.filter(document => 
                    document.category && document.category.name === filterByCategory);
            }
    
            if (filterByTags.length > 0) {
                updatedFilteredDocuments = updatedFilteredDocuments.filter(document =>
                    filterByTags.every(tagName => 
                        document.tags && document.tags.includes(tagName))
                );
            }

            if (searchTerm) {
                const searchTermLower = searchTerm.toLowerCase();
                updatedFilteredDocuments = updatedFilteredDocuments.filter(document =>
                    document.title.toLowerCase().includes(searchTermLower) ||
                    document.author.name.toLowerCase().includes(searchTermLower)
                );
            }
    
            setFilteredDocuments(updatedFilteredDocuments);
        };
    
        filterDocuments();
    }, [documents, filterByTags, filterByCategory, searchTerm]);
    
   // Ovde primenjujemo filtere svaki put kada se promeni stanje `documents`, `filterByTags`, ili `filterByCategory`
      
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
                            <option key={category.id} value={category.name}>
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
                                value.push(options[i].label);  
                            }
                        }
                        setFilterByTags(value);
                    }}>
                        {tags.map((tag) => (
                            <option key={tag.id} value={tag.name}>
                                {tag.name}
                            </option>
                        ))}
                    </select>

                </div>
                </div>
                <input
                type="text"
                placeholder="Pretraži po nazivu ili autoru"
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
            />
            <table className="documents-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Author </th>
                        <th>Category </th>
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
