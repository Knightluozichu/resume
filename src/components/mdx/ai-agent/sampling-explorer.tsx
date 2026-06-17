"use client";

/**
 * <AaSamplingExplorer>：采样与解码章（B 数学型，math:true）的旗舰交互 Demo（HEL-294）。
 *
 * 给一组固定候选 token + 原始 logits，两个滑块 temperature(0.1~2.0) + top-p(0.1~1.0)
 * 实时重绘「带温度的 softmax 概率分布条形图」，并高亮 top-p 截断后存活的候选（被截掉的灰显），
 * 一个「采一次」按钮按当前分布掷骰子挑中一个 token。让读者亲手体会：
 *   温度高 → 分布变平 → 更随机；top-p 小 → 只在头部少数候选里采。
 *
 * 本文件是「动态边界」——仅 next/dynamic(ssr:false) 懒加载编排，无可视化逻辑
 * （硬规则 2：Canvas / 重交互组件 next/dynamic + ssr:false + 懒加载，绝不进首屏关键路径 /
 * 公共 layout）。
 *
 * 颜色 / 间距 / 圆角全部走 DESIGN token（硬规则 5）。
 */

import dynamic from "next/dynamic";

/** 加载骨架，匹配 DemoStage 容器风格。 */
function LoadingCard() {
  return (
    <div className="mdx-sampling-explorer my-6 rounded-card border border-border bg-elevated p-6">
      <div className="mb-4">
        <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
          <span aria-hidden="true">⚡</span>
          可交互
        </span>
      </div>
      <div className="flex min-h-64 items-center justify-center text-center">
        <p className="text-sm text-secondary">采样分布交互图加载中…</p>
      </div>
    </div>
  );
}

const SamplingCanvas = dynamic(
  () => import("./sampling-explorer/sampling-canvas"),
  {
    ssr: false,
    loading: () => <LoadingCard />,
  },
);

export function AaSamplingExplorer() {
  return <SamplingCanvas />;
}
