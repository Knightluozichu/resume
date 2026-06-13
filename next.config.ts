import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 部署产物：.next/standalone（deploy.sh rsync 到服务器，pm2 托管 server.js）
  output: "standalone",
};

export default nextConfig;
