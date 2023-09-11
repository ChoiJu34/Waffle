import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from '../pages/Layout';
import RecoCardList from '../components/RecommendCard/RecoCardList';


const RootNavigation = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/recocard/list" element={<RecoCardList />} />
      </Routes>
    </BrowserRouter>
  );
};
export default RootNavigation;
