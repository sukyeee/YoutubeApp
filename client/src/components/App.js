import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import VideoUploadPage from './views/VideoUploadPage/VideoUploadPage';
import VideoDetailPage from './views/VideoDetailPage/VideoDetailPage';
import EditVideo from './views/VideoDetailPage/Sections/EditVideo';
import VideoCategoryPage from './views/VideoCategoryPage/VideoCategoryPage';

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} /> 
          {/* null : 모든 사용자 출입 가능  */}
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          {/* false:로그인 한 유저는 LoginPage 출입 불가   true:로그인 한 유저만 가능*/}
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/video/upload" component={Auth(VideoUploadPage, true)} />
          <Route exact path="/video/:videoId" component={Auth(VideoDetailPage, null)} />
          <Route exact path="/video/:videoId/edit" component={Auth(EditVideo, true)} />
          <Route exact path="/category/:categoryNumber" component={Auth(VideoCategoryPage, null)} />


        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
