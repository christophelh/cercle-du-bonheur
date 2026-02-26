import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CerclePage from './pages/CerclePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cercles/:ville/:therapeute/:nom" element={<CerclePage />} />
      </Routes>
    </BrowserRouter>
  );
}
