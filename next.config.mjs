/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig = {
  output: "export", // static site for GitHub Pages
  basePath: basePath || undefined,
  reactStrictMode: true,
  transpilePackages: ["three"],
  images: { unoptimized: true }, // required for static export
  trailingSlash: true, // friendlier directory serving on GitHub Pages
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
