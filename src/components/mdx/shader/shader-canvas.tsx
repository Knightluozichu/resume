"use client";

/**
 * <ShaderCanvas>：片段着色器实时渲染基座（HEL-25）。
 *
 * !!! 本文件含 WebGL 代码（经 use-shader-program.ts），只允许出现在 next/dynamic
 * 懒加载 chunk 内 —— 由 shader-demo.tsx 用 dynamic(ssr:false) 引入。
 * 禁止任何公共 layout / 页面静态 import 本文件（CLAUDE.md 硬规则 2/6）。
 *
 * 渲染容器走 DESIGN「交互 Demo 容器」气质：
 *  - --bg-elevated 底 + 1px border + 12px 圆角（rounded-card）
 *  - 左上角「⚡ 可交互」标签（accent 小面积）
 *  - 右上角重置按钮（复位 uTime / uMouse）
 *  - 辉光只在画布（accent-glow 内描边），不在卡片整体
 *
 * 标准 uniforms（自动注入并每帧更新）：
 *  - uTime      float  累计秒数（reduced-motion 下冻结在 0）
 *  - uResolution vec2  画布像素尺寸
 *  - uMouse     vec2   画布内归一化 0..1（y 向上），默认中心 (0.5,0.5)
 *
 * 编译 / 链接错误：use-shader-program 捕获 getShaderInfoLog / getProgramInfoLog，
 * 在容器内以 <pre> 回显，不抛错、不崩页（为 HEL-27 在线编辑预留回显口）。
 */

import { useId } from "react";

import { useShaderProgram, type UniformMap } from "./use-shader-program";

export type ShaderCanvasProps = {
  /** 片段着色器源码（必填，#version 300 es） */
  frag: string;
  /** 顶点着色器源码（可选；省略时用覆盖全屏的直通三角形） */
  vert?: string;
  /** 自定义 uniform 初值（HEL-26 将据此生成运行时控件） */
  uniforms?: UniformMap;
  /** 画布高度（px）。与 aspect 二选一，height 优先。默认 240。 */
  height?: number;
  /** 画布宽高比（如 16/9）。未给 height 时按容器宽度 × 该比例定高。 */
  aspect?: number;
  /** 图注：画布下方的说明文字（DESIGN：图注用 text-secondary） */
  caption?: string;
};

export function ShaderCanvas({
  frag,
  vert,
  uniforms,
  height,
  aspect,
  caption,
}: ShaderCanvasProps) {
  const { canvasRef, status, reset } = useShaderProgram({
    frag,
    vert,
    uniforms,
  });
  const captionId = useId();

  // 画布盒子的高度：height 优先；否则用 aspect-ratio；都没有则默认 240px。
  const sizingStyle: React.CSSProperties =
    height !== undefined
      ? { height: `${height}px` }
      : aspect !== undefined
        ? { aspectRatio: String(aspect) }
        : { height: "240px" };

  const hasError = status.kind === "error";

  return (
    <div className="mdx-shader-canvas my-6 rounded-card border border-border bg-elevated p-6">
      {/* 头部：左上⚡可交互标签 + 右上重置按钮 */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
          <span aria-hidden="true">⚡</span>
          可交互
        </span>
        <button
          type="button"
          onClick={reset}
          aria-label="重置演示（时间归零、鼠标复位）"
          className="rounded-control border border-border px-2 py-1 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
        >
          重置
        </button>
      </div>

      {/* 舞台：画布 or 错误回显。辉光（accent-glow 内描边）只在此处。 */}
      <div
        className="relative overflow-hidden rounded-control ring-1 ring-accent-glow"
        style={sizingStyle}
      >
        {/* 画布始终挂载（错误时也存在，否则 ref/effect 拿不到节点回显不了状态）。
            出错时盖一层错误卡，画布被遮住即可。 */}
        <canvas
          ref={canvasRef}
          className="block h-full w-full"
          aria-describedby={caption ? captionId : undefined}
          aria-label={caption ?? "片段着色器实时渲染画面"}
          role="img"
        />

        {hasError && (
          <div className="absolute inset-0 flex flex-col gap-2 overflow-auto bg-elevated p-4">
            <p className="text-xs font-medium text-danger">
              着色器
              {status.stage === "vertex"
                ? "顶点"
                : status.stage === "fragment"
                  ? "片段"
                  : "链接"}
              错误
            </p>
            <pre className="overflow-auto whitespace-pre-wrap font-mono text-xs text-secondary">
              {status.log}
            </pre>
          </div>
        )}
      </div>

      {caption && (
        <p id={captionId} className="mt-3 text-xs text-secondary">
          {caption}
        </p>
      )}
    </div>
  );
}

export default ShaderCanvas;
