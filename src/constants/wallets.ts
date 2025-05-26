export const walletsSupported = {
  metamask: "MetaMask",
  solflare: "Solflare",
  phantom: "Phantom",
  trust: "Trust",
  walletconnect: "WalletConnect",
  backpack: "Backpack",
  glow: "Glow",
  ledger: "Ledger",
};

export const allWalletsSupported = [
  walletsSupported.metamask,
  walletsSupported.solflare,
  walletsSupported.phantom,
  walletsSupported.trust,
  walletsSupported.walletconnect,
  walletsSupported.backpack,
  walletsSupported.glow,
  walletsSupported.ledger,
];

export const walletDetectStatus = {
  installed: "Installed",
  notDetected: "NotDetected",
  loadable: "Loadable",
};

export const walletsIcon: { [key: string]: string } = {
  [walletsSupported.metamask]: "/images/metamask.png",
  [walletsSupported.solflare]: "/images/solflare.svg",
  [walletsSupported.phantom]: "/images/phantom.svg",
  [walletsSupported.trust]: "/images/trust.png",
  [walletsSupported.walletconnect]: "/images/walletconnect.png",
  [walletsSupported.backpack]: "/images/backpack.svg",
  [walletsSupported.glow]: "/images/glow.png",
  [walletsSupported.ledger]: "/images/ledger.png",
};
