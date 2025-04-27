
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Context } from './context/contextProvider.js';

import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { SubmissionProvider } from './context/SubmissionContext';


createRoot(document.getElementById('root')).render(
  <SubmissionProvider>
    <App />
  </SubmissionProvider>
);
