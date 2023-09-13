import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from '../pages/Layout';
import RecoCardList from '../components/RecommendCard/RecoCardList';
import MainPage from '../components/MainPage/MainPage';
import Login from '../components/Login/Login'
import Signup from '../components/Signup/Signup'

const RootNavigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/user/login" element={<Login/>} />
          <Route path="/user/sign-up" element={<Signup/>} />
          <Route path="/recocard/list" element={<RecoCardList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default RootNavigation;
