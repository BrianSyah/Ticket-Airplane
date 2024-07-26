/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push("@node-rs/bcrypt");
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "toeoevewlebctbwyrvba.supabase.co",
      },
    ],
    unoptimized: true,
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
