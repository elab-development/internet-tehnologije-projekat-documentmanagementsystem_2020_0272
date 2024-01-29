import React from 'react';
 

const DocumentTableRow = ({ document, onDelete, onDownload }) => {
    const handleDownload = () => {
        onDownload(document.id, document.title);
    };

    const handleDelete = () => {
        onDelete(document.id);
    };

    return (
        <tr key={document.id}>
            <td>{document.id}</td>
            <td>{document.title}</td>
            <td>{document.content}</td>
            <td>{document.author_id}</td>
            <td>{document.category_id}</td>
            <td>{document.tags.join(', ')}</td>
            <td>{document.is_public ? 'Yes' : 'No'}</td>
            <td>
                <button onClick={handleDownload}>Download</button>
            </td>
            <td>
                <button onClick={handleDelete}>Obriši</button>
            </td>
        </tr>
    );
};

export default DocumentTableRow;
