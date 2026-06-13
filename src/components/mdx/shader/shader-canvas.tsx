"use client";

/**
 * <ShaderCanvas>：片段着色器实时渲染基座（HEL-25）+ uniform 自动控件（HEL-26）。
 *
 * !!! 本文件含 WebGL 代码（经 use-shader-program.ts），只允许出现在 next/dynamic
 * 懒加载 chunk 内 —— 由 shader-demo.tsx 用 dynamic(ssr:false) 引入。
 * 禁止任何公共 layout / 页面静态 import 本文件（CLAUDE.md 硬规则 2/6）。
 *
 * 渲染容器走 DESIGN「交互 Demo 容器」气质：
 *  - --bg-elevated 底 + 1px border + 12px 圆角（rounded-card）
 *  - 左上角「⚡ 可交互」标签（accent 小面积）
 *  - 右上角重置按钮（复位 uTime / uMouse + 全部自定义 uniform 回 default）
 *  - 辉光只在画布（accent-glow 内描边），不在卡片整体
 *  - 有 controls 时画布下方加分隔线 + 控件区（UniformControls）
 *
 * 标准 uniforms（自动注入并每帧更新）：
 *  - uTime      float  累计秒数（reduced-motion 下冻结在 0）
 *  - uResolution vec2  画布像素尺寸
 *  - uMouse     vec2   画布内归一化 0..1（y 向上），默认中心 (0.5,0.5)
 *
 * 自定义 uniform（HEL-26）：作者传 controls schema → 自动生成控件；改控件实时驱动着色器。
 * 值变不重编译——见下方 valuesRef 注释与 use-shader-program 文件头说明。
 *
 * 编译 / 链接错误：use-shader-program 捕获 getShaderInfoLog / getProgramInfoLog，
 * 在容器内以 <pre> 回显，不抛错、不崩页（为 HEL-27 在线编辑预留回显口）。
 */

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  useShaderProgram,
  type ShaderStatus,
  type UniformControl,
  type UniformMap,
  type UniformValue,
} from "./use-shader-program";
import { controlsToInitialValues, UniformControls } from "./uniform-controls";

export type ShaderCanvasProps = {
  /** 片段着色器源码（必填，#version 300 es） */
  frag: string;
  /** 顶点着色器源码（可选；省略时用覆盖全屏的直通三角形） */
  vert?: string;
  /** 自定义 uniform 控件声明 schema（HEL-26）。据此自动生成控件并驱动同名 uniform。 */
  controls?: readonly UniformControl[];
  /** 画布高度（px）。与 aspect 二选一，height 优先。默认 240。 */
  height?: number;
  /** 画布宽高比（如 16/9）。未给 height 时按容器宽度 × 该比例定高。 */
  aspect?: number;
  /** 图注：画布下方的说明文字（DESIGN：图注用 text-secondary） */
  caption?: string;
  /**
   * 编译 / 运行状态变化回调（HEL-27）。editable 包装层（shader-editor-canvas）据此从
   * error 的 InfoLog 解析错误行号、在编辑器里高亮。非 editable 用法不传，行为不变。
   */
  onStatusChange?: (status: ShaderStatus) => void;
  /**
   * 嵌入模式（HEL-30）：true 时不画自己的卡片外壳与头部（⚡标签 + 重置按钮），只渲染
   * 「画布舞台 + 控件 + 图注」。editable 编排层（shader-editor-canvas）据此把画布嵌进
   * 它统一的 editable 卡里，避免「卡中卡 + 双 ⚡」（收成单层卡）。默认 false：行为同前，
   * 画布自带完整 Demo 卡（非 editable 用法不变）。
   */
  bare?: boolean;
  /**
   * 重置信号（HEL-30，仅 bare 模式有意义）：数值递增一次 → 触发内部 reset（uTime/uMouse
   * 复位 + 全部自定义 uniform 回 default）。bare 模式下画布无自带重置按钮，由外层 editable
   * 卡的统一「重置」按钮通过递增本信号驱动画布复位。默认不传（0），不触发。
   */
  resetSignal?: number;
};

const EMPTY_CONTROLS: readonly UniformControl[] = [];

export function ShaderCanvas({
  frag,
  vert,
  controls = EMPTY_CONTROLS,
  height,
  aspect,
  caption,
  onStatusChange,
  bare = false,
  resetSignal = 0,
}: ShaderCanvasProps) {
  // 由 schema 算出初值（= 重置目标）。controls 来自 .mdx，按其内容 memo，避免每渲染重算。
  const controlsKey = useMemo(() => JSON.stringify(controls), [controls]);
  const initialValues = useMemo(
    () => controlsToInitialValues(controls),
    // controlsKey 已涵盖 controls 内容；用它做 dep 以稳引用。
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [controlsKey],
  );

  // valuesRef = 引擎每帧读取的当前 uniform 值（值变不重编译的关键：不入 effect deps）。
  // values（state）= 仅供控件回显当前值。两者同步更新。
  const valuesRef = useRef<UniformMap>(initialValues);
  const [values, setValues] = useState<UniformMap>(initialValues);

  const {
    canvasRef,
    status,
    reset: resetStandard,
  } = useShaderProgram({
    frag,
    vert,
    uniformValuesRef: valuesRef,
  });

  // 状态上抛（HEL-27）：每次 status 变化通知包装层（editable 时用于解析错误行）。
  // onChange 用 ref 持有最新引用（在 effect 内同步，避免 render 期写 ref），status 是触发源。
  const onStatusChangeRef = useRef(onStatusChange);
  useEffect(() => {
    onStatusChangeRef.current = onStatusChange;
  }, [onStatusChange]);
  useEffect(() => {
    onStatusChangeRef.current?.(status);
  }, [status]);

  // 控件改值：先写 ref（驱动着色器，下一帧 renderFrame 从 ref 读），再 setState（驱动控件回显）。
  const handleControlChange = useCallback(
    (name: string, value: UniformValue) => {
      valuesRef.current = { ...valuesRef.current, [name]: value };
      setValues(valuesRef.current);
    },
    [],
  );

  // 重置：标准 uniform（uTime/uMouse）复位 + 全部自定义 uniform 回 default。
  const reset = useCallback(() => {
    resetStandard();
    valuesRef.current = controlsToInitialValues(controls);
    setValues(valuesRef.current);
  }, [resetStandard, controls]);

  // bare 模式（HEL-30）：外层 editable 卡的统一「重置」按钮通过递增 resetSignal 驱动画布复位
  // （画布在 bare 下无自带重置按钮）。首挂载的 0 不触发；之后每次递增跑一次 reset。
  const prevResetSignalRef = useRef(resetSignal);
  useEffect(() => {
    if (resetSignal !== prevResetSignalRef.current) {
      prevResetSignalRef.current = resetSignal;
      reset();
    }
  }, [resetSignal, reset]);

  const hasControls = controls.length > 0;
  const captionId = useId();

  // 画布盒子的高度：height 优先；否则用 aspect-ratio；都没有则默认 240px。
  const sizingStyle: React.CSSProperties =
    height !== undefined
      ? { height: `${height}px` }
      : aspect !== undefined
        ? { aspectRatio: String(aspect) }
        : { height: "240px" };

  const hasError = status.kind === "error";

  // 舞台 + 控件 + 图注：bare 与非 bare 共用这块「内容」，差异只在外壳与头部。
  const body = (
    <>
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

      {/* 控件区（DESIGN Demo 容器气质：上分隔线 + 间距）。改控件实时驱动着色器（不重编译）。 */}
      {hasControls && (
        <div className="mt-4 border-t border-border pt-4">
          <UniformControls
            controls={controls}
            values={values}
            onChange={handleControlChange}
          />
        </div>
      )}

      {caption && (
        <p id={captionId} className="mt-3 text-xs text-secondary">
          {caption}
        </p>
      )}
    </>
  );

  // bare 模式（HEL-30）：去掉自带卡片外壳与头部（⚡ + 重置），只输出内容，由外层
  // editable 卡统一承载头部与边框 —— 收成单层卡、单一 ⚡ 标签。
  if (bare) {
    return <div className="mdx-shader-canvas">{body}</div>;
  }

  // 非 bare（默认）：画布自带完整 Demo 卡（外壳 + ⚡可交互标签 + 重置按钮）。
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
          aria-label={
            hasControls
              ? "重置演示（时间归零、鼠标复位、参数回默认值）"
              : "重置演示（时间归零、鼠标复位）"
          }
          className="rounded-control border border-border px-2 py-1 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
        >
          重置
        </button>
      </div>

      {body}
    </div>
  );
}

export default ShaderCanvas;
