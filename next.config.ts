import type { NextConfig } from "next";
import { availableParallelism } from "node:os";

const nextConfig: NextConfig = {
  // 本地视觉审计会从 127.0.0.1 驱动开发服务器。Next 默认把该主机视为
  // 与 localhost 不同的开发来源并阻止 HMR/客户端水合资源，因此显式只放行
  // 两个 loopback 主机；不扩大到局域网或任意来源。
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  // 部署产物：.next/standalone（deploy.sh rsync 到服务器，pm2 托管 server.js）
  output: "standalone",
  // 本站需要预渲染 2400+ 章节；按当前机器可用 CPU 并行生成静态页，避免 Next
  // 默认只使用一部分核心。availableParallelism 会尊重容器/进程的 CPU 配额。
  experimental: {
    cpus: availableParallelism(),
    staticGenerationMaxConcurrency: availableParallelism(),
  },
  // 关闭 React StrictMode（HEL-38）：R3F / @react-three/postprocessing 的 WebGL 上下文
  // 生命周期与 React StrictMode 开发期「双挂载」（mount→unmount→remount）不兼容——
  // Canvas 第一次挂载创建 WebGL 上下文，StrictMode 立刻卸载时 R3F 清理会销毁/丢失该上下文，
  // 重挂期间 EffectComposer 对着已丢失的上下文初始化，gl.getContextAttributes() 返回 null，
  // 再读 `.alpha` → 抛 "Cannot read properties of null (reading 'alpha')"，dev 首页崩。
  // StrictMode 的双调用仅 dev 生效，prod 构建不双挂载，故线上一直正常、不受此项影响。
  // 这是 R3F 生态对该崩溃的通行解。
  reactStrictMode: false,
  // 保旧链（HEL-48 书化）：两段式旧 URL /learn/getting-started/* 永久重定向到
  // 三段式新 URL /learn/learnopengl/getting-started/*（standalone 运行时支持 redirects）。
  async redirects() {
    return [
      {
        source: "/learn/getting-started/:slug*",
        destination: "/learn/learnopengl/getting-started/:slug*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
