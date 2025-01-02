/** @type {import('next').NextConfig} */
export const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'bvczkuznkssqorwifgza.supabase.co',
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
  