/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // pdfjs-dist has optional Node deps (e.g. `canvas`) which should not be bundled
    // for the browser build.
    config.resolve.fallback = {
      ...(config.resolve.fallback ?? {}),
      canvas: false,
      fs: false,
      path: false,
      stream: false,
      zlib: false,
    };

    // Also prevent server bundle from trying to resolve optional deps.
    if (isServer) {
      config.externals = config.externals ?? [];
    }
    return config;
  },
};

export default nextConfig;

