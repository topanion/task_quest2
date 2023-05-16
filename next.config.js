require("dotenv").config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SUPABASE_KEY: process.env.SUPABASE_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL,
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
