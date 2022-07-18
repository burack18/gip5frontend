import logo from './logo.svg';
import './App.css';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import Login from './components/Login';
import Register from './components/Register';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from './components/DashboardContent';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    fallbackLng: "en",
    detection: { order: ['cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'], caches: ['cookie'] },
    backend:{loadPath: `/assets/locales/fr/translation.json`} 
    });


function App() {
  const { t } = useTranslation();

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}/>    
      <Route path='/login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='dashport' element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
