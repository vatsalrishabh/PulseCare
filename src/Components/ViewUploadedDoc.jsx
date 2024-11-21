import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BaseUrl } from './BaseUrl';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import { FaFileDownload } from 'react-icons/fa';

const ViewUploadedDoc = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/patients/viewUploadedFiles`);
        setDocuments(response.data);
      } catch (err) {
        setError('Failed to load documents');
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <div>{error}</div>;

  // Group documents by Booking ID
  const groupedDocuments = documents.reduce((acc, doc) => {
    if (!acc[doc.bookingId]) {
      acc[doc.bookingId] = [];
    }
    acc[doc.bookingId].push(doc);
    return acc;
  }, {});

  return (
    <div>
      <Typography variant="h4" gutterBottom>Uploaded Documents</Typography>
      {Object.keys(groupedDocuments).map((bookingId) => (
        <Card key={bookingId} className="mb-4">
          <CardContent>
            <Typography variant="h5">Booking ID: {bookingId}</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Document Type</TableCell>
                    <TableCell>Patient ID</TableCell>
                    <TableCell>File Link</TableCell>
                    <TableCell>Upload Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {groupedDocuments[bookingId].map((doc) => (
                    <TableRow key={doc._id}>
                      <TableCell>{doc.documentType}</TableCell>
                      <TableCell>{doc.patientId}</TableCell>
                      <TableCell>
                      <a 
  href={`${doc.fileLink}`} 
  target="_blank" 
  rel="noopener noreferrer"
>
  <FaFileDownload className="mr-2" /> View File
</a>

                      </TableCell>
                      <TableCell>{new Date(doc.uploadDate).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ViewUploadedDoc;
