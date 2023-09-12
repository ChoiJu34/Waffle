import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from '../pages/Layout';
import RecoCardList from '../components/RecommendCard/RecoCardList';
import MainPage from '../components/MainPage/MainPage';
import Login from '../components/Login/Login'

const RootNavigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/recocard/list" element={<RecoCardList />} />
          <Route path="/user/login" element={<Login/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default RootNavigation;
