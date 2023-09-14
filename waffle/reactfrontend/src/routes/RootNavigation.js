import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from '../pages/Layout';
import RecoCardMain from '../components/RecommendCard/RecoCardMain';
import MainPage from '../components/MainPage/MainPage';

const RootNavigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/recocard/main" element={<RecoCardMain />} />
          <Route path="/" element={<MainPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default RootNavigation;
