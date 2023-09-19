import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../components/Commons/ProtectedRoute'
import Layout from '../pages/Layout';
import ScrollTop from '../components/Commons/ScrollTop'
import RecoCardMain from '../components/RecommendCard/RecoCardMain';
import MainPage from '../components/MainPage/MainPage';
import Login from '../components/Login/Login'
import FindEmail from '../components/Login/FindEmail'
import FoundEmail from '../components/Login/FoundEmail'
import Signup from '../components/Signup/Signup'
import SignupComplete from '../components/Signup/SignupComplete'
import VerifyEmail from '../components/Signup/VerifyEmail'

const RootNavigation = () => {
  return (
    <BrowserRouter>
      <ScrollTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/user/login" element={<Login/>} />
          <Route path="/user/sign-up" element={<Signup/>} />
          <Route path="/user/sign-up/complete" element={<SignupComplete/>} />
          <Route path="/user/find-email" element={<FindEmail/>} />
          <Route path="/user/found-email" element={<FoundEmail/>} />
          <Route path="/user/verify-email" element={<VerifyEmail/>} />
          <Route path="/recocard/main" element={<ProtectedRoute><RecoCardMain /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default RootNavigation;
