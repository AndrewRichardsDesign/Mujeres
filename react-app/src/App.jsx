import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext';
import HomePage from './pages/HomePage';
import MarchPage from './pages/MarchPage';
import './styles.css';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/march" element={<MarchPage />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
