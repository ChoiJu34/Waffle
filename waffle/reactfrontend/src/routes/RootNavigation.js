import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "../components/Commons/ProtectedRoute";
import Layout from "../pages/Layout";
// import ScrollTop from '../components/Commons/ScrollTop'
import RecoCardMain from "../components/RecommendCard/RecoCardMain";
import MainPage from "../components/MainPage/MainPage";
import Login from "../components/Login/Login";
import FindEmail from "../components/Login/FindEmail";
import FoundEmail from "../components/Login/FoundEmail";
import FindPassword from "../components/Login/FindPassword";
import FoundPassword from "../components/Login/FoundPassword";
import PasswordToken from "../components/Login/PasswordToken";
import VerifyEmail from "../components/Signup/VerifyEmail";
import Signup from "../components/Signup/Signup";
import SignupComplete from "../components/Signup/SignupComplete";
import RecoCardList from "../components/RecommendCard/RecoCardList";
import TeamAccount from "../components/TeamAccount/TeamAccount";
import TeamAccountDetail from "../components/TeamAccount/TeamAccountDetail";
import PackageMain from "../components/RecommendPackage/PackageMain";
import TeamAccountAddCode from "../components/TeamAccount/TeamAccountAddCode";
import TeamAccountAddNew from "../components/TeamAccount/TeamAccountAddNew";
import TeamAccountUpdate from "../components/TeamAccount/TeamAccountUpdate";
import TeamAccountUpdateIndividual from "../components/TeamAccount/TeamAccountUpdateIndividual";
import ChecklistList from "../components/Checklist/ChecklistMain";
import Checklist from '../components/Checklist/Checklist'
import CardInfo from "../components/CardInfo/CardInfo";
import Favorite from "../components/MyPage/Favorite"
import UpdateUserInfo from "../components/MyPage/UpdateUserInfo"
const RootNavigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/recocard/list" element={<RecoCardList />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/sign-up" element={<Signup />} />
          <Route path="/user/sign-up/complete" element={<SignupComplete />} />
          <Route path="/user/find-email" element={<FindEmail />} />
          <Route path="/user/found-email" element={<FoundEmail />} />
          <Route path="/user/verify-email" element={<VerifyEmail />} />
          <Route path="/user/find-password" element={<FindPassword />} />
          <Route path="/user/found-password" element={<FoundPassword />} />
          <Route path="/user/password-token" element={<PasswordToken />} />
          <Route
            path="/recocard/main"
            element={
              <ProtectedRoute>
                <RecoCardMain />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teamaccount/main"
            element={
              <ProtectedRoute>
                <TeamAccount />
              </ProtectedRoute>
            }
          />
          <Route
            path="/package/main"
            element={
              <ProtectedRoute>
                <PackageMain />
              </ProtectedRoute>
            }
          />
          {/* "detail"은 나중에 각 모임통장의 id로 바꿀 예정 */}
          <Route path="/teamaccount/detail" element={<TeamAccountDetail />} />
          <Route
            path="/teamaccount/add/code"
            element={<TeamAccountAddCode />}
          />
          <Route path="/teamaccount/add/new" element={<TeamAccountAddNew />} />
          <Route path="/teamaccount/update" element={<TeamAccountUpdate />} />
          <Route
            path="/teamaccount/update/individual"
            element={<TeamAccountUpdateIndividual />}
          />
          <Route path="/mypage/checklist" element={<ChecklistList/>} />
          <Route path="/mypage/checklist/:id" element={<Checklist/>} />
          <Route path="/cardinfo/:cardId" element={<CardInfo />} />
          <Route path="/mypage/favorite" element={<Favorite />} />
          <Route path="/mypage/update-userinfo" element={<UpdateUserInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default RootNavigation;
