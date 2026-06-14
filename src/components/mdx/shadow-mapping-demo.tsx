"use client";

/**
 * <ShadowMappingDemo>：「阴影映射」章（HEL-82）主 viz 的 MDX 入口（three.js 内建 shadow map 实时调参）。
 *
 * 本文件是「dynamic 边界」——只做轻量三件事，绝不 import three/R3F/drei（硬规则 2/6）：
 *  1. WebGL2 能力检测（client，SSR 安全）：不支持 → 静态兜底卡，绝不挂画布、绝不白屏
 *  2. 支持 → next/dynamic(ssr:false) 懒加载含 three import 的 <ShadowMappingCanvas>（独立 chunk）
 *  3. dynamic 的 loading 占位 = 同气质骨架卡（Demo 容器 + ⚡标签）
 *
 * MDX 用法：<ShadowMappingDemo />（默认）或 <ShadowMappingDemo height={...} caption="..." />。
 * 与 CubemapDemo / InstancingDemo / FramebufferDemo 同一封装范式。
 */

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

import type { ShadowMappingCanvasProps } from "./shadow-mapping/shadow-mapping-canvas";

type ShadowMappingDemoProps = ShadowMappingCanvasProps;

function DemoShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mdx-shadow-mapping-demo my-6 rounded-card border border-border bg-elevated p-6">
      <div className="mb-4">
        <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
          <span aria-hidden="true">⚡</span>
          可交互
        </span>
      </div>
      <div className="flex min-h-40 items-center justify-center text-center">
        {children}
      </div>
    </div>
  );
}

function LoadingCard() {
  return (
    <DemoShell>
      <p className="text-sm text-secondary">阴影映射演示加载中…</p>
    </DemoShell>
  );
}

function FallbackCard() {
  return (
    <DemoShell>
      <p className="max-w-prose text-sm text-secondary">
        当前浏览器不支持 WebGL2，无法运行阴影映射「拖 bias 造出/修掉 shadow acne
        与 peter panning」演示。请用较新版本的 Chrome / Firefox / Edge / Safari
        查看。
      </p>
    </DemoShell>
  );
}

const ShadowMappingCanvas = dynamic(
  () => import("./shadow-mapping/shadow-mapping-canvas"),
  {
    ssr: false,
    loading: () => <LoadingCard />,
  },
);

let cachedWebgl2: boolean | null = null;

function detectWebGL2(): boolean {
  if (cachedWebgl2 !== null) return cachedWebgl2;
  try {
    const canvas = document.createElement("canvas");
    cachedWebgl2 = !!canvas.getContext("webgl2");
  } catch {
    cachedWebgl2 = false;
  }
  return cachedWebgl2;
}

const noopSubscribe = () => () => {};

function useWebGL2Supported(): boolean {
  return useSyncExternalStore(noopSubscribe, detectWebGL2, () => true);
}

export function ShadowMappingDemo(props: ShadowMappingDemoProps) {
  const webgl2 = useWebGL2Supported();
  if (!webgl2) return <FallbackCard />;
  return <ShadowMappingCanvas {...props} />;
}
