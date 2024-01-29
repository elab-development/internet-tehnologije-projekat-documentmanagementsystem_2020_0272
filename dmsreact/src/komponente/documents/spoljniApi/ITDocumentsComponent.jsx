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
    <div>
      {documents.map((doc, index) => (
        <div key={index}>
          <h2>{doc.title}</h2>
          <p>{doc.summary}</p>
            <a href={doc.pdfLink} target="_blank" rel="noopener noreferrer">PDF Link</a>
          <p>Authors: {doc.authors.toString()}</p>
        </div>
      ))}
    </div>
  );
};

export default ITDocumentsComponent;
