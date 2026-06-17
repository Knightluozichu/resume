"use client";

/**
 * <AmdahlCurveExplorer>: Amdahl 定律加速比曲线交互 MDX 入口（HEL-237）。
 *
 * type D「设计并发代码」一章（全书唯一 math:true 章）的 §4/§5 数学交互 Demo。
 * Canvas2D 画 Amdahl 加速比曲线 S(N) = 1 / ((1-p) + p/N)，x 轴 = 核数 N(1~64)、
 * y 轴 = 加速比 S，由「可并行比例 p」滑块驱动。直观展示：串行部分 (1-p) 决定加速上限——
 * p 越小，再多核也卡在很低的加速比上。
 *
 * 本文件是「动态边界」——仅 next/dynamic(ssr:false) 懒加载编排，无可视化逻辑
 * （硬规则 2：Canvas / 重交互组件 next/dynamic + ssr:false + 懒加载，绝不进首屏关键路径 /
 * 公共 layout）。
 *
 * 颜色 / 间距 / 圆角全部走 DESIGN token（硬规则 5）。
 */

import dynamic from "next/dynamic";

/** 加载骨架，匹配 DemoStage / BrdfCurveExplorer 容器风格。 */
function LoadingCard() {
  return (
    <div className="mdx-amdahl-curve my-6 rounded-card border border-border bg-elevated p-6">
      <div className="mb-4">
        <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
          <span aria-hidden="true">⚡</span>
          可交互
        </span>
      </div>
      <div className="flex min-h-64 items-center justify-center text-center">
        <p className="text-sm text-secondary">Amdahl 加速比曲线加载中…</p>
      </div>
    </div>
  );
}

const AmdahlCurveCanvas = dynamic(
  () => import("./amdahl-curve-explorer/amdahl-curve-canvas"),
  {
    ssr: false,
    loading: () => <LoadingCard />,
  },
);

export function AmdahlCurveExplorer() {
  return <AmdahlCurveCanvas />;
}
