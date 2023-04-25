import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppGuard from 'src/layouts/AppGuard';
import Loadable from 'src/components/Loadable';
import WindowLayout from 'src/layouts/WindowLayout';

const HomePage = Loadable(lazy(() => import('src/pages/home')));

function MainRoute() {
  return (
    <Routes>
      <Route path="/" element={<AppGuard />}>
        <Route path="/" element={<WindowLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default MainRoute;
