/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '*.supabase.co',
          port: '',
          pathname: '/**',
        },
      ],
    },
    eslint: {
      // Ignore ESLint errors during build
      ignoreDuringBuilds: true,
    },
    typescript: {
      // Ignore TypeScript errors during build
      ignoreBuildErrors: true,
    },
};

export default nextConfig;
  