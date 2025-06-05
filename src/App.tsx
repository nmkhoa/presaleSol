import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Referral from "./pages/referral";
import { routes } from "./constants/router";
import { Provider } from "./components/ui/provider";
import { SolanaProvider } from "./components/providers/solana-provider";
import { ConnectWalletProvider } from "./contexts/connect-wallet-context";
import ReactQueryProvider from "./components/providers/react-query-provider";
import AuthProvider from "./components/providers/auth-provider";
import { Toaster } from "./components/ui/toaster";
import ScrollToTop from "./components/pages/global/scroll-to-top";
import AuthGuard from "./guard/auth-guard";
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
                  <Route path={routes.HOME} element={<Home />} />
                  <Route
                    path={routes.REFERRAL}
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
