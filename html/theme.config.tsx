import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <span>Welcome Bot</span>,
  project: {
    link: "https://github.com/xuc323/discord-bot",
  },
  chat: {
    link: "https://discord.com",
  },
  docsRepositoryBase: "https://github.com/xuc323/discord-bot-docs",
  footer: {
    text: <span>{new Date().getFullYear()} &copy; welcome-bot.xchen.org</span>,
  },
};

export default config;
