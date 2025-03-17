import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
  optimizeFonts: false, 
  // تحديد مسار المجلد الجذر للمشروع 
  distDir: 'dist',
  
  // إذا كنت تستخدم مجلد src
  dir: 'src',
};

export default nextConfig;
