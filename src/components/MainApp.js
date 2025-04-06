// react-notes-app/src/components/MainApp.js
import { Apps, Chat, Dashboard, Download, Edit, Person, Save, Search, Upload } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import api from '../api';
import './MainApp.css';

function MainApp() {
  const [note, setNote] = useState('');
  const [savedNote, setSavedNote] = useState('');

  // Load saved note from localStorage on component mount
  useEffect(() => {
    const savedContent = localStorage.getItem('quickNote');
    if (savedContent) {
      setNote(savedContent);
      setSavedNote(savedContent);
    }
  }, []);

  const handleSaveNote = () => {
    localStorage.setItem('quickNote', note);
    setSavedNote(note);
  };

  const handleDownloadNote = () => {
    const blob = new Blob([note], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-notes.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="main-container">
      <div className="header" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        background: 'linear-gradient(90deg, #2196F3 0%, #64B5F6 100%)',
        padding: '16px 24px',
        color: 'white',
        borderRadius: '0 0 16px 16px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      }}>
        <Apps sx={{ fontSize: 28 }} />
        <h2 style={{
          margin: 0,
          fontSize: '24px',
          fontWeight: '600',
        }}>Dashboard</h2>
      </div>
      
      <div className="content-wrapper" style={{
        background: '#f5f7fa',
        minHeight: '100vh',
        padding: '20px'
      }}>
        <nav className="sidebar" style={{
          background: 'white',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          borderRadius: '12px',
          margin: '0 0 20px 0',
          padding: '20px',
        }}>
          <div className="options-section">
            <div className="options-header" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px'
            }}>
              <Dashboard sx={{ 
                fontSize: 24, 
                color: '#2196F3',
              }} />
              <h4 style={{ 
                fontFamily: "'Inter', sans-serif", 
                fontSize: '18px', 
                fontWeight: '600',
                color: '#1976d2',
                margin: 0
              }}>Quick Access</h4>
            </div>
            
            <div className="options-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '16px'
            }}>
              {[
                { to: "upload", icon: <Upload sx={{ fontSize: 24 }} />, text: "File Upload", description: "Upload your documents" },
                { to: "search", icon: <Search sx={{ fontSize: 24 }} />, text: "File Search", description: "Search through files" },
                { to: "chatbot", icon: <Chat sx={{ fontSize: 24 }} />, text: "Chatbot", description: "AI Assistant" },
                { to: "/profile", icon: <Person sx={{ fontSize: 24 }} />, text: "User Profile", description: "Manage account" }
              ].map((item) => (
                <Link to={item.to} key={item.to} className="option-card" style={{
                  background: 'white',
                  borderRadius: '8px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none',
                  color: 'inherit',
                  border: '1px solid #e0e0e0',
                }}>
                  <div className="option-icon" style={{
                    background: '#2196F3',
                    borderRadius: '8px',
                    padding: '10px',
                    color: 'white',
                  }}>
                    {item.icon}
                  </div>
                  <div className="option-details">
                    <h5 style={{ 
                      fontFamily: "'Inter', sans-serif", 
                      fontSize: '16px', 
                      fontWeight: '600', 
                      margin: '0 0 4px 0',
                      color: '#333'
                    }}>{item.text}</h5>
                    <p style={{ 
                      fontFamily: "'Inter', sans-serif", 
                      fontSize: '14px', 
                      margin: 0, 
                      color: '#666' 
                    }}>{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </nav>
        
        <div className="content-container" style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '20px'
        }}>
          <div className="main-content-area" style={{
            background: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          }}>
            <div className="content-header">
              <h3 style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '18px',
                fontWeight: '600',
                margin: '0 0 20px 0',
                color: '#333'
              }}>Results View</h3>
            </div>
            <main className="main-content">
              <Outlet />
            </main>
          </div>

          <div className="quick-notes" style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
            height: 'calc(100vh - 140px)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}>
              <h3 style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '20px',
                fontWeight: '600',
                margin: 0,
                color: '#333',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Edit sx={{ fontSize: 24 }} />
                Quick Notes
              </h3>
              <div style={{
                display: 'flex',
                gap: '12px'
              }}>
                <button
                  onClick={handleDownloadNote}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    background: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.2s'
                  }}
                >
                  <Download sx={{ fontSize: 18 }} />
                  Download
                </button>
                <button
                  onClick={handleSaveNote}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    background: '#2196F3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.2s'
                  }}
                >
                  <Save sx={{ fontSize: 18 }} />
                  Save
                </button>
              </div>
            </div>
            
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write your notes here..."
              style={{
                width: '100%',
                flex: 1,
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                fontSize: '15px',
                lineHeight: '1.6',
                resize: 'none',
                fontFamily: "'Inter', sans-serif",
                backgroundColor: '#f8f9fa',
                marginBottom: '12px'
              }}
            />
            
            {savedNote !== note && (
              <div style={{
                fontSize: '13px',
                color: '#666',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 0'
              }}>
                <span style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  background: '#ffa726',
                  display: 'inline-block' 
                }}></span>
                Unsaved changes
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainApp;
