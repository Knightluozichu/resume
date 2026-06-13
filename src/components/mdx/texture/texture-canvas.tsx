"use client";

/**
 * <TextureCanvas>：纹理交互教学画布（HEL-45）。让读者吃透「纹理坐标 / 采样 / 环绕 / 过滤」。
 *
 * !!! 本文件含 WebGL 代码（经 use-texture-program.ts），只允许出现在 next/dynamic
 * 懒加载 chunk 内 —— 由 texture-demo.tsx 用 dynamic(ssr:false) 引入。
 * 禁止任何公共 layout / 页面静态 import 本文件（CLAUDE.md 硬规则 2/6）。
 *
 * 容器走 DESIGN「交互 Demo 容器」气质（与 ShaderCanvas 一致）：
 *  - --bg-elevated 底 + 1px border + 12px 圆角
 *  - 左上角「⚡ 可交互」标签 + 右上角重置按钮（恢复默认参数）
 *  - 画布辉光（accent-glow 内描边）只在画布盒子上
 *  - 画布下方分隔线 + 控件区（环绕 / 过滤分段按钮 + uvScale / zoom 滑块）
 *
 * 五类可调（≤5 个控件，chapter-spec §五硬约束；重置不计入）：
 *  1. 纹理选择 kind：UV 测试图 / 木板 / 砖墙 / 笑脸（分段按钮，HEL-65，切换看真实感差异）
 *  2. 环绕方式 wrap：REPEAT / MIRRORED_REPEAT / CLAMP_TO_EDGE（分段按钮）
 *  3. 过滤方式 filter：NEAREST / LINEAR（分段按钮）
 *  4. UV 缩放 uvScale：0.5–4 滑块（>1 越界看环绕）
 *  5. 放大观察 zoom：1–12 滑块（放大看过滤：NEAREST 马赛克 vs LINEAR 平滑）
 *  + 重置：恢复默认（右上角按钮，不计入 5 个可调控件）
 *
 * 数据通路（值变不重编译/不重传，HEL-45 核心）：参数同时写 paramsRef（驱动 GL，requestDraw
 * 从 ref 读）与 React state（驱动控件回显）。引擎不挂 rAF 常转——仅按需重绘一帧。
 */

import { useCallback, useId, useMemo, useRef, useState } from "react";

import {
  useTextureProgram,
  type TextureFilter,
  type TextureKind,
  type TextureParams,
  type TextureWrap,
} from "./use-texture-program";

export type TextureCanvasProps = {
  /** 可选外部图片 URL；不传则用程序化「UV 测试图」（推荐：无外部资源、效果一眼可辨）。 */
  src?: string;
  /** 画布高度（px）。默认 280。 */
  height?: number;
  /** 图注：画布下方说明文字（DESIGN：图注用 text-secondary）。 */
  caption?: string;
};

const DEFAULT_PARAMS: TextureParams = {
  wrap: "REPEAT",
  filter: "LINEAR",
  uvScale: 1,
  zoom: 1,
  kind: "uv",
};

// 纹理选择：默认 UV 测试图（诊断项），另含三张「一眼认得出」的真实感程序化纹理。
const KIND_OPTIONS: ReadonlyArray<{ value: TextureKind; label: string }> = [
  { value: "uv", label: "UV 测试图" },
  { value: "wood", label: "木板" },
  { value: "brick", label: "砖墙" },
  { value: "face", label: "笑脸" },
];

const WRAP_OPTIONS: ReadonlyArray<{ value: TextureWrap; label: string }> = [
  { value: "REPEAT", label: "REPEAT" },
  { value: "MIRRORED_REPEAT", label: "MIRRORED" },
  { value: "CLAMP_TO_EDGE", label: "CLAMP" },
];

const FILTER_OPTIONS: ReadonlyArray<{ value: TextureFilter; label: string }> = [
  { value: "NEAREST", label: "NEAREST" },
  { value: "LINEAR", label: "LINEAR" },
];

// ============================ 分段按钮（本地控件，沿用 token 与 ghost 气质） ============================

type SegmentedProps<T extends string> = {
  /** 控件标签 */
  label: string;
  options: ReadonlyArray<{ value: T; label: string }>;
  value: T;
  onChange: (value: T) => void;
};

/**
 * 分段按钮：一组互斥选项。ghost 气质（border + hover 亮起），选中态用 accent 文字 + accent-glow 底。
 * 用原生 button + role="radiogroup"/"radio" 保证键盘与无障碍。颜色/圆角/动效全走 token。
 */
function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: SegmentedProps<T>) {
  const groupId = useId();
  return (
    <div className="flex items-center gap-3">
      <span id={groupId} className="text-xs text-secondary">
        {label}
      </span>
      <div
        role="radiogroup"
        aria-labelledby={groupId}
        className="inline-flex overflow-hidden rounded-control border border-border"
      >
        {options.map((opt, i) => {
          const selected = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(opt.value)}
              className={`px-2 py-1 font-mono text-xs transition-colors duration-(--duration-hover) ease-standard ${
                i > 0 ? "border-l border-border" : ""
              } ${
                selected
                  ? "bg-accent-glow text-accent"
                  : "text-secondary hover:text-primary"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============================ 滑块（本地小封装，复用 mdx-range 样式 + token） ============================

type ParamSliderProps = {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
};

function ParamSlider({
  label,
  min,
  max,
  step,
  value,
  format,
  onChange,
}: ParamSliderProps) {
  const id = useId();
  return (
    <div className="flex items-center gap-3">
      <label htmlFor={id} className="w-20 shrink-0 text-xs text-secondary">
        {label}
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        aria-valuetext={format(value)}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mdx-range h-1 flex-1 cursor-pointer appearance-none rounded-control bg-border accent-accent"
      />
      <span className="w-12 text-right font-mono text-xs tabular-nums text-primary">
        {format(value)}
      </span>
    </div>
  );
}

// ============================ 主组件 ============================

export function TextureCanvas({
  src,
  height = 280,
  caption,
}: TextureCanvasProps) {
  // paramsRef = 引擎按需读取的当前参数（值变不重编译/不重传）；params(state) = 控件回显。
  const paramsRef = useRef<TextureParams>({ ...DEFAULT_PARAMS });
  const [params, setParams] = useState<TextureParams>({ ...DEFAULT_PARAMS });

  const { canvasRef, status, requestDraw } = useTextureProgram({
    src,
    paramsRef,
  });

  // 改参数：先写 ref（驱动 GL），再 setState（驱动回显），再请求重绘一帧。
  const update = useCallback(
    (patch: Partial<TextureParams>) => {
      const next = { ...paramsRef.current, ...patch };
      paramsRef.current = next;
      setParams(next);
      requestDraw();
    },
    [requestDraw],
  );

  const reset = useCallback(() => {
    update({ ...DEFAULT_PARAMS });
  }, [update]);

  const captionId = useId();
  const hasError = status.kind === "error";
  const sizingStyle = useMemo<React.CSSProperties>(
    () => ({ height: `${height}px` }),
    [height],
  );

  return (
    <div className="mdx-texture-canvas my-6 rounded-card border border-border bg-elevated p-6">
      {/* 头部：左上⚡可交互标签 + 右上重置按钮 */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
          <span aria-hidden="true">⚡</span>
          可交互
        </span>
        <button
          type="button"
          onClick={reset}
          aria-label="重置演示（纹理/环绕/过滤/缩放回默认值）"
          className="rounded-control border border-border px-2 py-1 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
        >
          重置
        </button>
      </div>

      {/* 舞台：画布 or 错误回显。辉光只在此处。 */}
      <div
        className="relative overflow-hidden rounded-control ring-1 ring-accent-glow"
        style={sizingStyle}
      >
        <canvas
          ref={canvasRef}
          className="block h-full w-full"
          aria-describedby={caption ? captionId : undefined}
          aria-label={caption ?? "纹理采样实时渲染画面"}
          role="img"
        />

        {hasError && (
          <div className="absolute inset-0 flex flex-col gap-2 overflow-auto bg-elevated p-4">
            <p className="text-xs font-medium text-danger">
              纹理演示初始化失败
            </p>
            <pre className="overflow-auto whitespace-pre-wrap font-mono text-xs text-secondary">
              {status.log}
            </pre>
          </div>
        )}
      </div>

      {/* 控件区（DESIGN Demo 容器气质：上分隔线 + 间距）。改控件实时重绘（不重编译）。 */}
      <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
        <Segmented
          label="纹理"
          options={KIND_OPTIONS}
          value={params.kind}
          onChange={(kind) => update({ kind })}
        />
        <Segmented
          label="环绕"
          options={WRAP_OPTIONS}
          value={params.wrap}
          onChange={(wrap) => update({ wrap })}
        />
        <Segmented
          label="过滤"
          options={FILTER_OPTIONS}
          value={params.filter}
          onChange={(filter) => update({ filter })}
        />
        <ParamSlider
          label="UV 缩放"
          min={0.5}
          max={4}
          step={0.1}
          value={params.uvScale}
          format={(v) => `${v.toFixed(1)}×`}
          onChange={(uvScale) => update({ uvScale })}
        />
        <ParamSlider
          label="放大观察"
          min={1}
          max={12}
          step={0.1}
          value={params.zoom}
          format={(v) => `${v.toFixed(1)}×`}
          onChange={(zoom) => update({ zoom })}
        />
      </div>

      {caption && (
        <p id={captionId} className="mt-3 text-xs text-secondary">
          {caption}
        </p>
      )}
    </div>
  );
}

export default TextureCanvas;
