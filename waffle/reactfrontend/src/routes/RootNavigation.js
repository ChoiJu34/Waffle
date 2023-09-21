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
import FindPassword from '../components/Login/FindPassword'
import FoundPassword from '../components/Login/FoundPassword';
import PasswordToken from '../components/Login/PasswordToken'
import VerifyEmail from '../components/Signup/VerifyEmail'
import Signup from '../components/Signup/Signup'
import SignupComplete from '../components/Signup/SignupComplete'
import RecoCardList from '../components/RecommendCard/RecoCardList';
import TeamAccount from '../components/TeamAccount/TeamAccount'

const RootNavigation = () => {
  return (
    <BrowserRouter>
      <ScrollTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/recocard/main" element={<RecoCardMain />} />
          <Route path="/recocard/list" element={<RecoCardList />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/user/login" element={<Login/>} />
          <Route path="/user/sign-up" element={<Signup/>} />
          <Route path="/user/sign-up/complete" element={<SignupComplete/>} />
          <Route path="/user/find-email" element={<FindEmail/>} />
          <Route path="/user/found-email" element={<FoundEmail/>} />
          <Route path="/user/verify-email" element={<VerifyEmail/>} />
          <Route path="/user/find-password" element={<FindPassword/>} />
          <Route path="/user/found-password" element={<FoundPassword/>} />
          <Route path="/user/password-token" element={<PasswordToken/>} />
          <Route path="/recocard/main" element={<ProtectedRoute><RecoCardMain /></ProtectedRoute>} />
          <Route path="/teamaccount/main" element={<ProtectedRoute><TeamAccount /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default RootNavigation;
