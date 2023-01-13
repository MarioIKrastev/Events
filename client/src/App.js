import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";

import Home from "./components/Home";
import Board from './components/Board';

import { QueryClient, QueryClientProvider } from 'react-query'
import SignIn from "./components/Form/SignIn";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Board />} />
              <Route path="/signin" element={<SignIn />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
