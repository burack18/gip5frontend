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
import PrivateRoute from './utilities/PrivateRoute';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MainPage } from './pages/MainPage';
import { AutoUsageAdd } from './components/AutoUsageAdd';
import React from 'react';
import { AutoDetailsPage } from './components/AutoDetailsPage';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    fallbackLng: "en",
    detection: { order: ['cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'] },
    backend: { loadPath: `/assets/locales/nl/translation.json` }
  });


function App() {
  const { t } = useTranslation();


  return (
    <div>
      <BrowserRouter>
        <Routes>          
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/dashboard/:autoId/details' element={<AutoDetailsPage />} />       
          </Route>
          <Route path="/" element={<MainPage />}/>
          <Route path="/auto-usage" element={<AutoUsageAdd />}/>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
