import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import zhLocale from 'date-fns/locale/zh-CN';
import { CssBaseline } from '@mui/material';
import App from './App';

// mui字体
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={zhLocale}>
      <HashRouter>
        <App />
      </HashRouter>
    </LocalizationProvider>
  </React.StrictMode>
);
