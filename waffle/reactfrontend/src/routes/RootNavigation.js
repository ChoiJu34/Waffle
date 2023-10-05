import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "../components/Commons/ProtectedRoute";
import ScrollToTop from "../components/Commons/ScrollToTop";
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
import TeamAccountOut from "../components/TeamAccount/TeamAccountOut"
import TeamAccountDelete from "../components/TeamAccount/TeamAccountDelete"
import ChecklistList from "../components/Checklist/ChecklistMain";
import Checklist from "../components/Checklist/Checklist";
import CardInfo from "../components/CardInfo/CardInfo";
import Favorite from "../components/MyPage/Favorite";
import UpdateUserInfo from "../components/MyPage/UpdateUserInfo";
import MyCard from "../components/MyCard/MyCard";
import CardRegister from "../components/MyCard/CardRegister";
import PackageList from "../components/RecommendPackage/PackageList";
import FavoriteDetail from "../components/MyPage/FavoriteDetail";

const RootNavigation = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
          {/* "detail"은 나중에 각 모임통장의 id로 바꿀 예정 */}
          <Route
            path="/package/main"
            element={
              <ProtectedRoute>
                <PackageMain />
              </ProtectedRoute>
            }
          />
          {/* "detail"은 나중에 각 모임통장의 id로 바꿀 예정 */}
          <Route path="/teamaccount/detail/:id" element={<TeamAccountDetail />} />
          <Route
            path="/package/list"
            element={
              <ProtectedRoute>
                <PackageList />
              </ProtectedRoute>
            }
          />
          <Route path="/teamaccount/detail" element={<TeamAccountDetail />} />
          <Route
            path="/teamaccount/add/code"
            element={<TeamAccountAddCode />}
          />
          <Route path="/teamaccount/add/new" element={<TeamAccountAddNew />} />
          <Route path="/teamaccount/update/:id" element={<TeamAccountUpdate />} />
          <Route
            path="/teamaccount/update/individual/:id"
            element={<TeamAccountUpdateIndividual />}
          />
          <Route path="/mypage/checklist" element={<ChecklistList />} />
          <Route path="/mypage/checklist/:id" element={<Checklist />} />
          <Route path="/cardinfo/:cardId" element={<CardInfo />} />
          <Route path="/mypage/favorite" element={<Favorite />} />
          <Route path="/mypage/favorite/detail" element={<FavoriteDetail/>} />
          <Route path="/mypage/update-userinfo" element={<UpdateUserInfo />} />
          <Route path="/teamaccount/out" element={<TeamAccountOut />} />
          <Route path="/teamaccount/delete" element={<TeamAccountDelete />} />
          <Route path="/mypage/mycard" element={<MyCard />} />
          <Route path="/mycard/card-register" element={<CardRegister />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default RootNavigation;
