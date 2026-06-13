"use client";

/**
 * <ModelDemo>：「模型加载篇·模型 Model 章」交互式模型查看器的 MDX 入口（HEL-58）。
 *
 * 本文件是「dynamic 边界」——只做轻量三件事，绝不 import three/R3F/drei（硬规则 2/6）：
 *  1. WebGL2 能力检测（client，SSR 安全）：不支持 → 静态兜底卡，绝不挂画布、绝不白屏
 *  2. 支持 → next/dynamic(ssr:false) 懒加载含 three import 的 <ModelCanvas>（独立 chunk）
 *  3. dynamic 的 loading 占位 = 同气质骨架卡（Demo 容器 + ⚡标签）
 *
 * 教学目标：让读者亲眼看到「模型 = 一堆有名字的 mesh」——线框透视结构、隔离/高亮单个 mesh。
 * 与 LightingDemo / CameraDemo / TextureDemo 同一封装范式（照搬 lighting-demo.tsx）。
 *
 * MDX 用法：<ModelDemo />（默认）或 <ModelDemo height={...} caption="..." />。
 */

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

import type { ModelCanvasProps } from "./model/model-canvas";

type ModelDemoProps = ModelCanvasProps;

function DemoShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mdx-model-demo my-6 rounded-card border border-border bg-elevated p-6">
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
      <p className="text-sm text-secondary">模型查看器加载中…</p>
    </DemoShell>
  );
}

function FallbackCard() {
  return (
    <DemoShell>
      <p className="max-w-prose text-sm text-secondary">
        当前浏览器不支持 WebGL，无法运行 3D 模型查看器。请用较新版本的 Chrome /
        Firefox / Edge / Safari 查看。
      </p>
    </DemoShell>
  );
}

const ModelCanvas = dynamic(() => import("./model/model-canvas"), {
  ssr: false,
  loading: () => <LoadingCard />,
});

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

export function ModelDemo(props: ModelDemoProps) {
  const webgl2 = useWebGL2Supported();
  if (!webgl2) return <FallbackCard />;
  return <ModelCanvas {...props} />;
}
