/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "img.freepik.com"],
  },
};

module.exports = nextConfig;
