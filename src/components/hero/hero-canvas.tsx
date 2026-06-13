"use client";

/**
 * 首页 Hero 画布的 dynamic 边界（CLAUDE.md 硬规则 2/6）。
 *
 * 这里是唯一的 next/dynamic + ssr:false 加载点：真正含 three import 的
 * FerrariScene 被切成独立 chunk，不进首屏关键路径、不进公共 layout。
 * 加载期显示深色占位 + 居中细微 loading（token 颜色），不白屏不闪烁。
 */

import dynamic from "next/dynamic";

function HeroLoading() {
  return (
    <div
      aria-hidden="true"
      className="flex h-full w-full items-center justify-center bg-bg"
    >
      {/* 细微脉冲点：用 accent，pulse 是教学/装饰之外的极轻提示 */}
      <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
    </div>
  );
}

const FerrariScene = dynamic(() => import("./ferrari-scene"), {
  ssr: false,
  loading: () => <HeroLoading />,
});

export function HeroCanvas() {
  return <FerrariScene />;
}
