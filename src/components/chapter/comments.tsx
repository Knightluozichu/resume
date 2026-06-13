"use client";

import { useEffect, useRef, useState } from "react";

/**
 * <Comments />：章末 giscus 评论区（GitHub Discussions，HEL-43）。
 *
 * 由章节页 page.tsx（Server Component）在正文容器底部挂载——本组件是 'use client'
 * 叶子壳，不会把整页变成 client，RSC 边界照常保持。
 *
 * 性能（硬规则 2 的理念）：giscus 运行时（https://giscus.app/client.js）属第三方脚本，
 * 不得进首屏关键路径。故用 IntersectionObserver 懒加载——评论区滚动进视口附近
 * （rootMargin 200px 预热）才把 <script> 注入容器；注入前显示 token 化占位骨架。
 * 注入用 ref 标志防重复，对 React 19 + dev 双渲染（StrictMode）幂等。
 *
 * giscus 的这些 data-* 是公开值（设计上即嵌在客户端 HTML 里供 GitHub 识别仓库/分类），
 * 非密钥，直接写进组件。pathname 映射走 giscus 自带 data-mapping=pathname，
 * 自动用 location，组件无需接收任何 prop。
 *
 * 主题用 transparent_dark 贴合站点暗色底；颜色/间距/圆角/动效全部走 DESIGN token
 * （硬规则 5）。reduced-motion 友好：占位骨架的脉冲动画在 reduced-motion 下停。
 */

/** giscus 脚本与配置（公开值，非密钥；照填自仓库 GitHub Discussions 设置）。 */
const GISCUS_SRC = "https://giscus.app/client.js";
const GISCUS_CONFIG: Record<string, string> = {
  "data-repo": "Knightluozichu/resume",
  "data-repo-id": "R_kgDOS5M3Qw",
  "data-category": "Announcements",
  "data-category-id": "DIC_kwDOS5M3Q84C_E5l",
  "data-mapping": "pathname",
  "data-strict": "1",
  "data-reactions-enabled": "1",
  "data-emit-metadata": "0",
  "data-input-position": "top",
  "data-theme": "transparent_dark",
  "data-lang": "zh-CN",
  crossorigin: "anonymous",
};

export function Comments() {
  // giscus 脚本注入的目标容器（giscus 会把 iframe 挂到本节点后）
  const containerRef = useRef<HTMLDivElement>(null);
  // 注入幂等标志：StrictMode 双 effect / observer 多次回调下只注入一次
  const injectedRef = useRef(false);
  // 占位骨架仅在脚本未注入时显示
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || injectedRef.current) return;

    const inject = () => {
      // 双重幂等：observer 回调与降级路径都可能触发，仅放行第一次
      if (injectedRef.current || !containerRef.current) return;
      injectedRef.current = true;

      const script = document.createElement("script");
      script.src = GISCUS_SRC;
      for (const [key, value] of Object.entries(GISCUS_CONFIG)) {
        script.setAttribute(key, value);
      }
      script.async = true;
      containerRef.current.appendChild(script);
      setLoaded(true);
    };

    // 不支持 IntersectionObserver 的环境直接注入（不挡功能）
    if (typeof IntersectionObserver === "undefined") {
      inject();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          inject();
          observer.disconnect();
        }
      },
      // 评论区进入视口前 200px 即开始预热加载
      { rootMargin: "200px" },
    );
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      // data-pagefind-ignore：评论是用户生成内容，不进站内搜索索引（HEL-42 同理）
      data-pagefind-ignore
      aria-label="讨论"
      className="mt-12 border-t border-border pt-8"
    >
      <h2 className="mb-4 text-xl font-semibold text-primary">讨论</h2>
      <div ref={containerRef} className="giscus">
        {!loaded && (
          <div
            // 占位骨架：token 化卡片 + 次要色提示；脉冲动画 reduced-motion 下自动停
            className="flex min-h-24 items-center justify-center rounded-card border border-border bg-elevated p-6 text-sm text-secondary motion-safe:animate-pulse"
            role="status"
            aria-live="polite"
          >
            评论区加载中…
          </div>
        )}
      </div>
    </section>
  );
}
