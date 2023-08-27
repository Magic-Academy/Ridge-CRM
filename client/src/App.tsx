// libraries
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// layouts
import Main from "./layouts/main/main";
import Signup from "./layouts/sigup/signup";
import Users from "./layouts/users/users";
import Login from "./layouts/login/login";
import Profile from "./layouts/profile/profile";
import Objects from "./layouts/objects/objects";
import Meetings from "./layouts/meetings/meetings";
import Presentations from "./layouts/presentations/presentations";
// components
import TopBar from "./components/UI/topbar/topbar";
import Sidebar from "./components/UI/sidebar/sidebar";
import ObjectPage from "./components/pages/object/object-page";
import CreateObject from "./components/pages/create-object/create-object";
import UpdateObject from "./components/pages/update-object/update-object";
import UpdateProfile from "./components/pages/update-profile/update-profile";
import CreateManager from "./components/pages/create-manager/create-manager";
import UpdateManager from "./components/pages/update-manager/update-manager";
import CreateMeeting from "./components/pages/create-meeting/create-meeting";
import UpdateMeeting from "./components/pages/update-meeting/update-meeting";
// styled
import "react-toastify/dist/ReactToastify.css";
import { AppStyled, RightSide } from "./styled";
import "./styles.css";
// other
import AppLoader from "./hoc/app-loader";
import ScrollToTop from "./utils/scroll-to-top";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./layouts/calendar/calendar";
import Footer from "./components/common/footer/footer";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppLoader>
          <ScrollToTop />
          <AppStyled>
            <Sidebar />
            <RightSide>
              <TopBar />
              <Routes>
                <Route index path="" element={<Main />} />

                <Route path="auth" element={<Login />}>
                  <Route index element={<Navigate to="/auth/login" />} />
                  <Route path={"login"} element={<Login />} />
                  <Route path="*" element={<Navigate to="" />} />
                </Route>

                <Route path="auth" element={<Signup />}>
                  <Route index element={<Navigate to="/auth/SignUp" />} />
                  <Route path={"signup"} element={<Signup />} />
                  <Route path="*" element={<Navigate to="" />} />
                </Route>

                <Route path="users">
                  <Route index element={<Users />} />
                  <Route path="create" element={<CreateManager />} />
                  <Route path=":userId?/edit" element={<UpdateManager />} />
                  <Route path="*" element={<Navigate to="/users" />} />
                </Route>

                <Route path="profile" element={<Profile />}>
                  <Route index element={<Navigate to="/profile" />} />
                  <Route
                    path=":userId?/profileUpdate"
                    element={<UpdateProfile />}
                  />
                  <Route path="*" element={<Navigate to="/profile" />} />
                </Route>

                <Route path="objects">
                  <Route index element={<Objects />} />
                  <Route path={":objectId/"} element={<ObjectPage />} />
                  <Route path={"create"} element={<CreateObject />} />
                  <Route path={":objectId/edit"} element={<UpdateObject />} />
                  <Route path="*" element={<Navigate to="/objects" />} />
                </Route>

                <Route path="meetings">
                  <Route index element={<Meetings />} />
                  <Route path={"create"} element={<CreateMeeting />} />
                  <Route path={":meetingId/edit"} element={<UpdateMeeting />} />
                  <Route path="*" element={<Navigate to="/meetings" />} />
                </Route>

                <Route path="calendar">
                  <Route index element={<Calendar />} />
                  <Route path="*" element={<Navigate to="/calendar" />} />
                </Route>

                <Route path="presentations">
                  <Route index element={<Presentations />} />
                  <Route path="*" element={<Navigate to="/presentations" />} />
                </Route>

              </Routes>
              

              <Footer/>
    
            </RightSide>
          </AppStyled>
        </AppLoader>
      </ThemeProvider>
      <ToastContainer position="bottom-left" />
    </ColorModeContext.Provider>
  );
}

export default App;
