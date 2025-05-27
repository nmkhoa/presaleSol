import { tokenSolana, tokenUsdc, tokenUsdt } from "./environment";

export const navKey = {
  buy: "buy",
  benefit: "benefit",
  products: "products",
  partners: "partners",
  faq: "faq",
  visit: "visit",
};

export const navbarItems = [
  {
    name: "Buy $UN",
    link: "#",
    key: navKey.buy,
  },
  // {
  //   name: "Referral",
  //   link: ROUTES.REFERRAL,
  // },
  {
    name: "Benefits",
    link: "#",
    key: navKey.benefit,
  },
  {
    name: "Products",
    link: "#",
    key: navKey.products,
  },
  {
    name: "Partners",
    link: "#",
    key: navKey.partners,
  },
  {
    name: "FAQ",
    link: "#",
    key: navKey.faq,
  },
  {
    name: "Visit Unich",
    link: "#",
    key: navKey.visit,
  },
];

export const socialLinks = [
  {
    title: "x",
    icon: "/images/x.svg",
    link: "https://x.com/unich_com",
  },
  {
    title: "website",
    icon: "/images/web.svg",
    link: "https://unich.com/en",
  },
  {
    title: "telegram",
    icon: "/images/telegram.svg",
    link: "https://t.me/unich_com",
  },
];

export const paymentMethods = [
  {
    title: "SOL",
    key: "sol",
    icon: "/images/solana.svg",
    link: "https://unich.finance/",
    token: tokenSolana,
  },
  {
    title: "USDC",
    key: "usdc",
    icon: "/images/usdc.svg",
    link: "https://unich.finance/",
    token: tokenUsdc,
  },
  {
    title: "USDT",
    key: "usdt",
    icon: "/images/usdt.svg",
    link: "https://unich.finance/",
    token: tokenUsdt,
  },
];

export const askedQuestions = [
  {
    question: "What is $UN Token?",
    answer: "Unich is a decentralized finance (DeFi)",
  },
  {
    question: "What is the Unich Pre-Sale?",
    answer: "Unich is a decentralized finance (DeFi)",
  },
  {
    question: "How do I participate in the Pre-Sale?",
    answer: "Unich is a decentralized finance (DeFi)",
  },
  {
    question: "What’s the advantage of joining the $UN Pre-Sale early?",
    answer: "Unich is a decentralized finance (DeFi)",
  },
  {
    question: "Is the Pre-Sale fair and transparent?",
    answer: "Unich is a decentralized finance (DeFi)",
  },
];

export const footerLinks = [
  {
    title: "Docs",
  },
  {
    title: "Visit Unich",
  },
  {
    title: "Pre-Market",
  },
  {
    title: "Pre-Order",
  },
];

export const footerSocialLinks = [
  {
    title: "x",
    icon: "/images/footer_x.svg",
    link: "https://twitter.com/UnichFinance",
  },
  {
    title: "telegram",
    icon: "/images/footer_tele.svg",
    link: "https://t.me/UnichFinance",
  },
  {
    title: "telegram",
    icon: "/images/footer_tele.svg",
    link: "https://t.me/UnichFinance",
  },
  {
    title: "discord",
    icon: "/images/footer_discord.svg",
    link: "https://discord.gg/UnichFinance",
  },
  {
    title: "facebook",
    icon: "/images/footer_facebook.svg",
    link: "https://www.facebook.com/UnichFinance",
  },
  {
    title: "instagram",
    icon: "/images/footer_instagram.svg",
    link: "https://www.instagram.com/UnichFinance",
  },
  {
    title: "tiktok",
    icon: "/images/footer_tiktok.svg",
    link: "https://www.tiktok.com/@UnichFinance",
  },
  {
    title: "youtube",
    icon: "/images/footer_youtube.svg",
    link: "https://www.youtube.com/@UnichFinance",
  },
  {
    title: "gitbook",
    icon: "/images/footer_gitbook.svg",
    link: "https://unich.gitbook.io/unich-finance/",
  },
  {
    title: "linktree",
    icon: "/images/footer_linktree.svg",
    link: "https://linktr.ee/unichfinance",
  },
];

export const landingPageLink = "https://unich.com/en";
