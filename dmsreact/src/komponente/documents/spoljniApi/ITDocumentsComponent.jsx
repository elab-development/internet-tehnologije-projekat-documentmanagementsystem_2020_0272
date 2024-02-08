import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import xmlJs from 'xml-js';

const fetchDocuments = async () => {
  const response = await axios.get('https://export.arxiv.org/api/query?search_query=cs.IT&start=0&max_results=10');
  
  const jsonData = xmlJs.xml2json(response.data, { compact: true, spaces: 4 });
  const parsedJson = JSON.parse(jsonData);
 
  const entries = parsedJson.feed.entry;
  const docs = entries.map(entry => {
    return {
      title: entry.title._text,
      summary: entry.summary._text,
      authors: entry.author,
      pdfLink: entry.link[0]._attributes.href
    };
  });

  return docs;
};

const ITDocumentsComponent = () => {
  const { data: documents, isLoading, error } = useQuery('documents', fetchDocuments);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching documents: {error.message}</div>;
  }

  return (
    <div className="it-documents-container">
      {documents.map((doc, index) => (
        <div key={index} className="document">
          <h2 className="title">{doc.title}</h2>
          <p className="summary">{doc.summary}</p>
          <a href={doc.pdfLink} target="_blank" rel="noopener noreferrer" className="pdf-link">PDF Link</a>
        </div>
      ))}
    </div>
  );
};

export default ITDocumentsComponent;
