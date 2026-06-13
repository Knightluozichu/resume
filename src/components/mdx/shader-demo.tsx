"use client";

/**
 * <ShaderDemo>：章节里片段着色器实时渲染的 MDX 入口（HEL-25，替换 HEL-20 占位）。
 *
 * 本文件是「dynamic 边界」——只做三件轻量事，绝不 import WebGL 代码（硬规则 2/6）：
 *  1. WebGL2 能力检测（client，SSR 安全）：不支持 → 静态兜底卡，绝不挂载画布、绝不白屏
 *  2. 支持 WebGL2 → next/dynamic(ssr:false) 懒加载真正含 WebGL 代码的 <ShaderCanvas>，
 *     它被切成独立 chunk，不进首屏关键路径 / 公共 layout
 *  3. dynamic 的 loading 占位 = 同气质的骨架卡（Demo 容器 + ⚡标签），chunk 就绪后接管
 *
 * 保留 MDX 标签名 ShaderDemo 与同名 props（vert/frag），content/*.mdx 无需改写入口标签；
 * 另透传 controls/height/aspect/caption 给 ShaderCanvas。
 *
 * 标准 uniforms（由 ShaderCanvas 自动注入并每帧更新）：uTime / uResolution / uMouse。
 * 自定义 uniform（HEL-26）：作者传 controls schema → ShaderCanvas 自动生成滑块/颜色/开关，
 * 改控件实时驱动同名 uniform（值变不重编译）。HEL-27 将加在线改 GLSL
 * （编译错误回显口已在 ShaderCanvas 内就绪）。
 */

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

import type { UniformControl } from "./shader/use-shader-program";

type ShaderDemoProps = {
  /** 片段着色器源码（必填，#version 300 es） */
  frag: string;
  /** 顶点着色器源码（可选；省略时用覆盖全屏的直通三角形） */
  vert?: string;
  /** 自定义 uniform 控件声明 schema（HEL-26）。据此自动生成控件并驱动同名 uniform。 */
  controls?: readonly UniformControl[];
  /** 画布高度（px）。与 aspect 二选一，height 优先。 */
  height?: number;
  /** 画布宽高比（如 16/9）。 */
  aspect?: number;
  /** 图注：画布下方说明文字。 */
  caption?: string;
};

/**
 * 共用「Demo 容器气质」外壳：loading 占位 / WebGL2 兜底卡复用之，
 * 保证三态（加载中 / 不支持 / 真画布）容器气质一致（无布局跳变）。
 */
function DemoShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mdx-shader-demo my-6 rounded-card border border-border bg-elevated p-6">
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
      <p className="text-sm text-secondary">实时演示加载中…</p>
    </DemoShell>
  );
}

/** WebGL2 不支持时的静态兜底卡（DESIGN 容器气质 + 文案），绝不白屏。 */
function FallbackCard() {
  return (
    <DemoShell>
      <p className="max-w-prose text-sm text-secondary">
        当前浏览器不支持 WebGL2，无法运行实时着色器演示。请用较新版本的 Chrome /
        Firefox / Edge / Safari 查看。
      </p>
    </DemoShell>
  );
}

// 真正含 WebGL 代码的组件——唯一 dynamic 加载点，ssr:false + 独立 chunk。
const ShaderCanvas = dynamic(() => import("./shader/shader-canvas"), {
  ssr: false,
  loading: () => <LoadingCard />,
});

// —— WebGL2 能力检测（与 hero-canvas 同款一次性探测 + useSyncExternalStore）——
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

export function ShaderDemo(props: ShaderDemoProps) {
  const webgl2 = useWebGL2Supported();
  // 不支持 WebGL2：静态兜底卡，永不拉 WebGL chunk、永不挂画布。
  if (!webgl2) return <FallbackCard />;
  // 支持：dynamic 懒加载真画布（loading 期显示骨架卡）。
  return <ShaderCanvas {...props} />;
}
