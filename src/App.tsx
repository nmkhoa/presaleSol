import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Referral from "./pages/referral";
import { ROUTES } from "./constants/router";
import { Provider } from "./components/ui/provider";
import { SolanaProvider } from "./components/providers/solana-provider";
import { ConnectWalletProvider } from "./contexts/connect-wallet-context";
import ReactQueryProvider from "./components/providers/react-query-provider";
import AuthProvider from "./components/providers/auth-provider";
import { Toaster } from "./components/ui/toaster";
import ScrollToTop from "./components/pages/global/ScrollToTop";
import AuthGuard from "./Guard/AuthGuardProps ";
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
                  <Route
                    path={ROUTES.REFERRAL}
                    element={
                      <AuthGuard>
                        <Referral />
                      </AuthGuard>
                    }
                  />
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
