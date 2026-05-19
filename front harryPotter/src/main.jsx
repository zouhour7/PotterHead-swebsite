// main.jsx
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Intro from './intro.jsx';
import './index.css';
import Map from './map.jsx';
import Sorting from './Sorting.jsx';
import Result from './Result.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Intro onReady={() => window.location.href = '/app'} />} />
            <Route path="/app" element={<App />} />
            <Route path="/map" element={<Map />} />
            <Route path="/sorting" element={<Sorting />} />
            <Route path="/result" element={<Result />} />
        </Routes>
    </BrowserRouter>
);
