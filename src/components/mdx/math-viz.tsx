"use client";

/**
 * <MathViz>：2D 向量 / 矩阵 / 坐标变换交互可视化的 MDX 入口（HEL-28）。
 *
 * 数学型(B)章节主 Demo（变换 / 坐标系统 / 摄像机）：拖动输入向量 v、调 2×2 矩阵
 * 的 a/b/c/d，实时看几何输出 M·v 与被矩阵扭曲的网格 / 基向量，把抽象矩阵变换变直观。
 * 非 WebGL——用纯 SVG（轻量、清晰、矢量缩放、a11y 友好），无需 Canvas2D。
 *
 * 本文件是「dynamic 边界」——只做懒加载编排，不含可视化实现（硬规则 2：
 * Canvas / 重交互组件一律 next/dynamic + ssr:false + 懒加载，不进首屏关键路径 /
 * 公共 layout）。MathViz 虽非 WebGL，但「拖动 + 实时重算 + SVG 网格变换」属重交互
 * 组件，按规约同样切独立 chunk 懒挂载：
 *  1. <MathVizCanvas> 经 next/dynamic(ssr:false) 切独立 chunk，按需加载；
 *  2. loading 占位 = 同气质骨架卡（Demo 容器 + ⚡标签），chunk 就绪后接管，无布局跳变。
 *
 * 保留 MDX 标签名 MathViz 与同名 props，content/*.mdx 直接用 <MathViz />，透传全部 props。
 *
 * 颜色 / 间距 / 圆角 / 动效全部走 DESIGN token（硬规则 5）。
 */

import dynamic from "next/dynamic";

import type { MathVizProps } from "./math-viz/math-viz-canvas";

export type { MathVizProps };

/** dynamic loading 共用的骨架卡（与 DemoStage / ShaderDemo 容器气质一致）。 */
function LoadingCard() {
  return (
    <div className="mdx-math-viz my-6 rounded-card border border-border bg-elevated p-6">
      <div className="mb-4">
        <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
          <span aria-hidden="true">⚡</span>
          可交互
        </span>
      </div>
      <div className="flex min-h-64 items-center justify-center text-center">
        <p className="text-sm text-secondary">交互可视化加载中…</p>
      </div>
    </div>
  );
}

// 含拖动 / 实时重算 / SVG 网格变换的可视化组件——ssr:false + 独立 chunk，按需加载。
const MathVizCanvas = dynamic(() => import("./math-viz/math-viz-canvas"), {
  ssr: false,
  loading: () => <LoadingCard />,
});

export function MathViz(props: MathVizProps) {
  return <MathVizCanvas {...props} />;
}
