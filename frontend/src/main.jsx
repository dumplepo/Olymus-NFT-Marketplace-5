import { createRoot } from 'react-dom/client';
import App from './App.jsx';  // Change the import from .tsx to .js
import './index.css';

createRoot(document.getElementById('root')).render(<App />);
