import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'
import { useCookies } from "react-cookie";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";

import Landing from "./components/Landing";
import Board from './components/Board';
import Page404 from './components/404'
import SignIn from "./components/Auth/SignIn";

function App() {
  const queryClient = new QueryClient();
  const [cookies] = useCookies(['Bearer']);
  const [isAuth, setisAuth] = useState(false);
  useEffect(() => {
    if (cookies.Bearer) {
      setisAuth(true)
    }
  }, [cookies])
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Router>
            <Routes>
              <Route path="/" element={isAuth ? (<Navigate replace to={'/home'} />) : (<Landing />)} />
              <Route path="/signin" element={isAuth ? (<Navigate replace to={'/home'} />) : (<SignIn />)} />
              <Route path="/home" element={!isAuth ? (<Navigate replace to={'/'} />) : (<Board />)} />
              <Route path='*' element={<Page404 />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
