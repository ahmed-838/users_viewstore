import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
  
  // تحديد مسار المجلد الجذر للتطبيق
  experimental: {
    // appDir تم إزالتها لأنها لم تعد مدعومة في الإصدارات الحديثة
  },
  
  // تحديد مسار المجلد الجذر للمشروع 
  distDir: 'dist',
  
  // إذا كنت تستخدم مجلد src
  dir: 'src',
};

export default nextConfig;
