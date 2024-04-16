// libraries
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
// styled
import "./styles.css";
import styled from "@emotion/styled";
import "react-toastify/dist/ReactToastify.css";
// components
import SidebarUI from "./components/UI/sidebar/sidebar.ui";
import Footer from "./components/common/footer/footer";
// hoc
import AppLoader from "./hoc/app-loader";
// utils
import ScrollToTop from "./utils/other/scroll-to-top";
// image
import grassImage from "./assets/grass.png";
// theme
import { ColorModeContext, useMode } from "./theme/theme";
// routes
import AppRoutes from "./routes/routes";
// sockets
import Sockets from "./sockets/sockets";
// store
import { getIsLoggedIn } from "@store/user/users.store";
import TopBarUI from "./components/UI/topbar/topbar.ui";

export const AppStyled = styled(Box)`
  display: flex;
  min-height: 100vh;
`;

export const RightSide = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  background-image: url(${grassImage});
  background-repeat: repeat-x;
  background-size: auto 35px;
  background-position: bottom;
`;

function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();

  const currentPath = location.pathname;
  const isHomePage = currentPath === "/";
  const isLoggedIn = useSelector(getIsLoggedIn());

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppLoader>
          <Sockets />
          <ScrollToTop />
          <AppStyled
            sx={{
              minWidth: isLoggedIn ? "1400px" : "100%"
              // minHeight: isLoggedIn
              //   ? { xs: "1900px", sm: "1400px", md: "100vh", lg: "100vh" }
              //   : "100vh"
            }}
          >
            <SidebarUI />
            <RightSide
              sx={{
                padding: isHomePage
                  ? isLoggedIn
                    ? "0 20px 50px 20px"
                    : "0"
                  : "0 20px 50px 20px"
              }}
            >
              <TopBarUI />
              <AppRoutes />
              <Footer />
            </RightSide>
          </AppStyled>
        </AppLoader>
      </ThemeProvider>
      <ToastContainer
        position="bottom-left"
        className="toast-container"
        autoClose={2200}
      />
    </ColorModeContext.Provider>
  );
}

export default App;
