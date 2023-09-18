import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from '../pages/Layout';
import RecoCardMain from '../components/RecommendCard/RecoCardMain';
import MainPage from '../components/MainPage/MainPage';
import Login from '../components/Login/Login'
import FindEmail from '../components/Login/FindEmail'
import FoundEmail from '../components/Login/FoundEmail'
import Signup from '../components/Signup/Signup'
import SignupComplete from '../components/Signup/SignupComplete'

const RootNavigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/recocard/main" element={<RecoCardMain />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/user/login" element={<Login/>} />
          <Route path="/user/sign-up" element={<Signup/>} />
          <Route path="/user/sign-up/complete" element={<SignupComplete/>} />
          <Route path="/user/find-email" element={<FindEmail/>} />
          <Route path="/user/found-email" element={<FoundEmail/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default RootNavigation;