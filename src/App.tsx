import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Referral from "./pages/referral";
import { ROUTES } from "./constants/router";
import { Provider } from "./components/ui/provider";
import { SolanaProvider } from "./components/providers/solana-provider";
import { ConnectWalletProvider } from "./contexts/connect-wallet-context";
import ReactQueryProvider from "./components/providers/react-query-provider";
import AuthProvider from "./components/providers/auth-provider";
import { Toaster } from "./components/ui/toaster";
import ScrollToTop from "./components/pages/global/ScrollToTop";
function App() {
  return (
    <ReactQueryProvider>
      <Provider>
        <SolanaProvider>
          <ConnectWalletProvider>
            <AuthProvider>
              <BrowserRouter>
                <ScrollToTop />
                <Routes>
                  <Route path={ROUTES.HOME} element={<Home />} />
                  <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                  <Route path={ROUTES.REFERRAL} element={<Referral />} />
                </Routes>
              </BrowserRouter>
              <Toaster />
            </AuthProvider>
          </ConnectWalletProvider>
        </SolanaProvider>
      </Provider>
    </ReactQueryProvider>
  );
}

export default App;
