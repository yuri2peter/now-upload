import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import zhLocale from 'date-fns/locale/zh-CN';
import { CssBaseline, ThemeProvider } from '@mui/material';
import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear'; // 导入插件
import relativeTime from 'dayjs/plugin/relativeTime'; // 导入插件
import 'dayjs/locale/zh-cn'; // 导入本地化语言
import { USE_SPA } from './configs';
import App from './App';

// mui字体
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// animate.css
import 'animate.css';

// custom styles
import './styles/custom.scss';
import './styles/animate-delay-queue.scss';
import { enableMapSet } from 'immer';
import { myTheme } from './styles/myTheme';

dayjs.extend(relativeTime);
dayjs.extend(isLeapYear); // 使用插件
dayjs.locale('zh-cn'); // 使用本地化语言

enableMapSet(); // immer跟踪set

// 启用BrowserRouter or HashRouter
const RouterProvider = USE_SPA ? BrowserRouter : HashRouter;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={myTheme}>
      <CssBaseline />
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={zhLocale}
      >
        <RouterProvider>
          <App />
        </RouterProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>
);
