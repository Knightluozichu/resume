"use client";

/**
 * <TextureDemo>：章节里纹理交互演示的 MDX 入口（HEL-45，HEL-34「纹理」章核心 viz）。
 *
 * 本文件是「dynamic 边界」——只做三件轻量事，绝不 import WebGL 代码（硬规则 2/6）：
 *  1. WebGL2 能力检测（client，SSR 安全）：不支持 → 静态兜底卡，绝不挂载画布、绝不白屏
 *  2. 支持 WebGL2 → next/dynamic(ssr:false) 懒加载真正含 WebGL 代码的 <TextureCanvas>，
 *     它被切成独立 chunk，不进首屏关键路径 / 公共 layout
 *  3. dynamic 的 loading 占位 = 同气质骨架卡（Demo 容器 + ⚡标签），chunk 就绪后接管
 *
 * MDX 用法：<TextureDemo />（默认程序化 UV 测试图）或 <TextureDemo src="..." caption="..." />。
 * 与 ShaderDemo 同一封装范式（能力检测 + dynamic 懒加载 + 骨架/兜底三态容器一致）。
 */

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

import type { TextureCanvasProps } from "./texture/texture-canvas";

type TextureDemoProps = TextureCanvasProps;

/**
 * 共用「Demo 容器气质」外壳：loading 占位 / WebGL2 兜底卡复用之，
 * 保证三态（加载中 / 不支持 / 真画布）容器气质一致（无布局跳变）。
 */
function DemoShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mdx-texture-demo my-6 rounded-card border border-border bg-elevated p-6">
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

/** dynamic loading / 兜底共用的骨架卡。 */
function LoadingCard() {
  return (
    <DemoShell>
      <p className="text-sm text-secondary">纹理演示加载中…</p>
    </DemoShell>
  );
}

/** WebGL2 不支持时的静态兜底卡（DESIGN 容器气质 + 文案），绝不白屏。 */
function FallbackCard() {
  return (
    <DemoShell>
      <p className="max-w-prose text-sm text-secondary">
        当前浏览器不支持 WebGL2，无法运行纹理实时演示。请用较新版本的 Chrome /
        Firefox / Edge / Safari 查看。
      </p>
    </DemoShell>
  );
}

// 含 WebGL 的画布组件——ssr:false + 独立 chunk。
const TextureCanvas = dynamic(() => import("./texture/texture-canvas"), {
  ssr: false,
  loading: () => <LoadingCard />,
});

// —— WebGL2 能力检测（与 shader-demo / hero-canvas 同款一次性探测 + useSyncExternalStore）——
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
  return useSyncExternalStore(
    noopSubscribe,
    detectWebGL2, // client：真实探测（带模块级缓存）
    () => true, // server：乐观按支持，client 挂载后纠正（避免 hydration 抖动）
  );
}

export function TextureDemo(props: TextureDemoProps) {
  const webgl2 = useWebGL2Supported();
  // 不支持 WebGL2：静态兜底卡，永不拉 WebGL chunk、永不挂画布。
  if (!webgl2) return <FallbackCard />;
  // 默认：懒加载纹理画布（loading 期显示骨架卡）。
  return <TextureCanvas {...props} />;
}
