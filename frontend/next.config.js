/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["commons/*"],
    env: {
        AUTH_MSG: process.env.AUTH_MSG
    }
}

module.exports = nextConfig
