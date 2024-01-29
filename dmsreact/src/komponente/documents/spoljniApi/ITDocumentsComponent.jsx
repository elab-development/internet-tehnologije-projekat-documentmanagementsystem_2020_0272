import axios from 'axios';
import React, { useState, useEffect } from 'react';
import xmlJs from 'xml-js';

const ITDocumentsComponent = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('https://export.arxiv.org/api/query?search_query=cs.IT&start=0&max_results=10');
     
        const jsonData = xmlJs.xml2json(response.data, { compact: true, spaces: 4 });
        const parsedJson = JSON.parse(jsonData);
 
        const entries = parsedJson.feed.entry;
        console.log(entries)
        const docs = entries.map(entry => {
          return {
         
            title: entry.title._text,
            summary: entry.summary._text,
            authors: entry.author,
            pdfLink: entry.link[0]._attributes.href
          };
        });

        setDocuments(docs);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div className="it-documents-container">
      {documents.map((doc, index) => (
       <div key={index} className="document">
           <h2 className="title">{doc.title}</h2>
           <p className="summary">{doc.summary}</p>
           <a href={doc.pdfLink} target="_blank" rel="noopener noreferrer" className="pdf-link">PDF Link</a>
           {/* <p className="authors">Authors: {doc.author.name._text}</p> */}
        </div>
      ))}
    </div>
  );
};

export default ITDocumentsComponent;
