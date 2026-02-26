/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        port: '',
        pathname: '/**', // This allows any image path under this domain
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
