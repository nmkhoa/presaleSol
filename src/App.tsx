import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Referral from "./pages/referral";
import { ROUTES } from "./constants/router";
import { Provider } from "./components/ui/provider";
import { SolanaProvider } from "./components/providers/solana-provider";
import { ConnectWalletProvider } from "./contexts/connect-wallet-context";

function App() {
  return (
    <Provider>
      <SolanaProvider>
        <ConnectWalletProvider>
          <BrowserRouter>
            <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.REFERRAL} element={<Referral />} />
            </Routes>
          </BrowserRouter>
        </ConnectWalletProvider>
      </SolanaProvider>
    </Provider>
  );
}

export default App;
