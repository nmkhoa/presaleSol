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
    question: "What is the Unich Pre-Sale?",
    answer: `Unich Pre-sale is an early-stage token sale that allows users to own $UN before the TGE. Holders of Unich exclusive NFTs are eligible to buy tokens with a 25% discount. You can also earn up to 11% in referral commissions by inviting friends.

Unich is targeting a $15,000,000 fundraising goal to drive platform development, accelerate product innovation, and expand our global user base.

$UN vesting includes a 25% unlock over the first 3 months, with the remaining 75% released in 25% monthly cliffs.`,
  },
  {
    question: "What is the $UN token?",
    answer: `$UN is the native token of Unich, playing a vital role in powering the platform’s operations. $UN holders enjoy perks like saving on trading fees and withdrawals; early access to upcoming Unich products and features; and taking part in governance across the ecosystem.`,
  },
  {
    question: "What are $UN's tokenomics?",
    answer: `$UN is launched on Solana network, with a total supply of 1,000,000,000 tokens. 50% will be allocated for Community Airdrops, 23% for Ecosystem, 20% for Core Contributors, and 7% for Investors & Advisors.

Unich also adopts a Burn-to-Boost mechanism, where 30% of quarterly profits will be used to buy and burn $UN until the total supply is reduced by half.`,
  },
  {
    question: "How to participate in the Unich Pre-Sale?",
    answer: `Simply connect your wallet and choose one of the three payment methods: $SOL, $USDC, or $USDT, then select any amount of $UN tokens you want to buy.

If you hold a Unich exclusive NFT, click on the Whitelist section to buy at a discounted price!`,
  },
  {
    question: "Is the Unich Pre-Sale fair and transparent?",
    answer: `Unich ensures fairness for all users. All transactions are recorded on the blockchain, guaranteeing security and transparency. The rules and conditions are clearly communicated to everyone, with no hidden fees or unfair advantages. Users have an equal opportunity to participate and benefit from the pre-sale.`,
  },
];

export const footerSocialLinks = [
  {
    title: "x",
    icon: "/images/footer_x.svg",
    link: "https://x.com/unich_com",
  },
  {
    title: "telegram",
    icon: "/images/footer_tele.svg",
    link: "https://t.me/Unichcom",
  },
  {
    title: "telegram",
    icon: "/images/footer_tele.svg",
    link: "https://t.me/unich_com",
  },
  {
    title: "discord",
    icon: "/images/footer_discord.svg",
    link: "https://discord.com/invite/unich",
  },
  {
    title: "facebook",
    icon: "/images/footer_facebook.svg",
    link: "https://www.facebook.com/Unich.official",
  },
  {
    title: "instagram",
    icon: "/images/footer_instagram.svg",
    link: "https://www.instagram.com/unich_com/",
  },
  {
    title: "tiktok",
    icon: "/images/footer_tiktok.svg",
    link: "https://www.tiktok.com/@unichotc",
  },
  {
    title: "youtube",
    icon: "/images/footer_youtube.svg",
    link: "https://www.youtube.com/@Unichcom",
  },
  {
    title: "gitbook",
    icon: "/images/footer_gitbook.svg",
    link: "https://docs.unich.com/",
  },
  {
    title: "linktree",
    icon: "/images/footer_linktree.svg",
    link: "https://linktr.ee/Unich.com",
  },
];

export const policyLink = {
  privacyPolicy: "https://unich.com/en/privacy-policy",
  termAndConditions: "https://unich.com/en/terms-and-conditions",
  email: "hi@unich.com",
};

export const marketingLinks = {
  docs: "https://docs.unich.com/",
  visit: "https://unich.com/en",
  preMarket: "https://unich.com/en/otc/market",
  preOrder: "https://unich.com/en/otc/market",
};

export const landingPageLink = "https://unich.com/en";

export const footerLinks = [
  {
    title: "Docs",
    url: marketingLinks.docs,
  },
  {
    title: "Visit Unich",
    url: marketingLinks.visit,
  },
  {
    title: "Pre-Market",
    url: marketingLinks.preMarket,
  },
  {
    title: "Pre-Order",
    url: marketingLinks.preOrder,
  },
];
