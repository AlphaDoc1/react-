import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ErrorIcon from '@mui/icons-material/Error';
import { Box, Button, List, ListItem, Paper, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import { keyframes } from '@mui/system';
import React, { useRef, useState } from 'react';
import { api } from '../api';

const DropZone = styled(Paper)(({ theme }) => ({
  border: '2px dashed #1976d2',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
  backgroundColor: '#f8fafc',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    borderColor: '#1565c0',
    backgroundColor: '#f1f5f9',
  }
}));

const UploadButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #1976d2 30%, #1565c0 90%)',
  color: 'white',
  padding: '12px 24px',
  borderRadius: theme.spacing(1),
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '1rem',
  boxShadow: '0 3px 5px 2px rgba(25, 118, 210, .3)',
  '&:hover': {
    background: 'linear-gradient(45deg, #1565c0 30%, #0d47a1 90%)',
  }
}));

// Add animation keyframes
const successAnimation = keyframes`
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.2); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

function UploadSection() {
  const [uploadResult, setUploadResult] = useState('');
  const [fileList, setFileList] = useState([]);
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setFileList(prev => [...prev, ...files]);
    console.log("Files selected:", files);
  };

  const handleSelectFiles = () => {
    fileInputRef.current.click();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setFileList(prev => [...prev, ...files]);
    console.log("Files dropped:", files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUpload = async () => {
    setIsUploading(true);
    setUploadComplete(false);
    
    const formData = new FormData();
    fileList.forEach(file => formData.append('files', file));
    try {
      const response = await api.post('/notes/upload', formData);
      const text = await response.text();
      setUploadResult(text);
      setFileList([]);
      setUploadComplete(true);
    } catch (error) {
      setUploadResult('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
      // Reset upload complete status after 3 seconds
      setTimeout(() => {
        setUploadComplete(false);
      }, 3000);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 4 }}>
      <Typography 
        variant="h4" 
        sx={{ 
          color: '#1a202c',
          mb: 4, 
          textAlign: 'center',
          fontWeight: 600
        }}
      >
        Upload Files or Folders
      </Typography>

      <input
        type="file"
        ref={fileInputRef}
        multiple
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <DropZone
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            gap: 2 
          }}>
            <CloudUploadIcon sx={{ fontSize: 48, color: '#1976d2' }} />
            <Typography variant="h6" sx={{ color: '#1a202c' }}>
              Drag & drop files here
            </Typography>
            <Typography variant="body1" sx={{ color: '#4a5568' }}>
              or
            </Typography>
            <Button
              variant="contained"
              onClick={handleSelectFiles}
              sx={{
                bgcolor: '#1976d2',
                '&:hover': { bgcolor: '#1565c0' }
              }}
            >
              Select Files
            </Button>
          </Box>

          {fileList.length > 0 && (
            <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid #e2e8f0' }}>
              <Typography variant="h6" sx={{ color: '#1a202c', mb: 2 }}>
                Selected Files ({fileList.length})
              </Typography>
              <List>
                {fileList.map((file, index) => (
                  <ListItem 
                    key={index}
                    sx={{
                      bgcolor: '#f8fafc',
                      borderRadius: 1,
                      mb: 1,
                      color: '#1a202c'
                    }}
                  >
                    {file.name}
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </DropZone>

        {fileList.length > 0 && (
          <Box sx={{ position: 'relative' }}>
            <UploadButton
              fullWidth
              onClick={handleUpload}
              disabled={isUploading}
              startIcon={
                isUploading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : uploadComplete ? (
                  <CheckCircleIcon sx={{
                    animation: `${successAnimation} 0.5s ease-out`,
                    color: '#4caf50'
                  }} />
                ) : (
                  <CloudUploadIcon />
                )
              }
              sx={{
                opacity: isUploading ? 0.7 : 1,
                transition: 'all 0.3s ease'
              }}
            >
              {isUploading ? 'Uploading...' : uploadComplete ? 'Upload Complete!' : 'Upload Files'}
            </UploadButton>
          </Box>
        )}

        {uploadResult && (
          <Paper
            sx={{
              p: 2,
              mt: 2,
              textAlign: 'center',
              bgcolor: uploadResult.includes('Restricted file') ? '#fee2e2' : '#dcfce7',
              color: uploadResult.includes('Restricted file') ? '#991b1b' : '#166534',
              borderRadius: 2,
              animation: `${fadeIn} 0.5s ease-out`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1
            }}
          >
            {uploadResult.includes('Restricted file') ? (
              <ErrorIcon 
                sx={{
                  color: '#991b1b',
                  animation: `${successAnimation} 0.5s ease-out`
                }}
              />
            ) : (
              uploadComplete && !uploadResult.includes('failed') && (
                <CheckCircleIcon 
                  sx={{
                    color: '#166534',
                    animation: `${successAnimation} 0.5s ease-out`
                  }}
                />
              )
            )}
            {uploadResult}
          </Paper>
        )}

        {isUploading && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              zIndex: 9999,
              overflow: 'hidden',
              '&::after': {
                content: '""',
                display: 'block',
                position: 'absolute',
                left: '-50%',
                width: '50%',
                height: '100%',
                backgroundColor: '#1976d2',
                animation: `progressBar 1s linear infinite`,
                '@keyframes progressBar': {
                  '0%': {
                    left: '-50%',
                  },
                  '100%': {
                    left: '100%',
                  },
                },
              },
            }}
          />
        )}
      </Box>
    </Box>
  );
}

export default UploadSection;
