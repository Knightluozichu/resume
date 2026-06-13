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
 * 改控件实时驱动同名 uniform（值变不重编译）。
 *
 * 在线改 GLSL（HEL-27）：传 editable 即在画布旁挂 CodeMirror 编辑器，读者改 frag → 防抖
 * 重编译 → 实时渲染；编译失败时错误行高亮 + 信息。两条 dynamic 分支严格分包：
 *  - 非 editable → dynamic(./shader/shader-canvas)：只含 WebGL，绝不拉 CodeMirror。
 *  - editable    → dynamic(./shader/shader-editor-canvas)：editable 专属 chunk，经它才
 *    可达 CodeMirror（@codemirror/*）。CodeMirror 因此被切进「仅当 editable demo 挂载时
 *    才按需加载」的异步 chunk，绝不进 chapter 首屏 / 公共 layout（硬规则 2/6）。
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
  /**
   * 在线改 GLSL（HEL-27）：true 时在画布旁挂 CodeMirror 编辑器，frag 作初始内容，编辑
   * 防抖重编译实时驱动画布。false（默认）行为同 HEL-25/26，且永不加载 CodeMirror chunk。
   */
  editable?: boolean;
  /** editable 时的防抖毫秒（编辑停止后多久重编译）。默认 400。 */
  debounceMs?: number;
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

// 非 editable：含 WebGL 的画布组件——ssr:false + 独立 chunk，不含 CodeMirror。
const ShaderCanvas = dynamic(() => import("./shader/shader-canvas"), {
  ssr: false,
  loading: () => <LoadingCard />,
});

// editable（HEL-27）：含 WebGL + CodeMirror 的编辑器编排层——独立异步 chunk。
// 仅在 editable=true 分支引用，故 CodeMirror 只在此 chunk 内、按需加载（硬规则 2/6）。
const ShaderEditorCanvas = dynamic(
  () => import("./shader/shader-editor-canvas"),
  {
    ssr: false,
    loading: () => <LoadingCard />,
  },
);

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

export function ShaderDemo({ editable, ...props }: ShaderDemoProps) {
  const webgl2 = useWebGL2Supported();
  // 不支持 WebGL2：静态兜底卡，永不拉 WebGL / CodeMirror chunk、永不挂画布。
  if (!webgl2) return <FallbackCard />;
  // editable：懒加载「画布 + CodeMirror 编辑器」编排层（独立 chunk，含 CodeMirror）。
  if (editable) return <ShaderEditorCanvas {...props} />;
  // 默认：懒加载纯画布（不含 CodeMirror，loading 期显示骨架卡）。
  return <ShaderCanvas {...props} />;
}
