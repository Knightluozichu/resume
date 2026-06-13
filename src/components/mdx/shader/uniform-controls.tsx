"use client";

/**
 * <UniformControls>：把一组 UniformControl schema 自动渲染成控件，运行时驱动着色器（HEL-26）。
 *
 * !!! 仅在 next/dynamic 懒加载 chunk 内出现（经 shader-canvas.tsx）。本文件本身无 WebGL
 * 代码，但与 ShaderCanvas 同 chunk，沿用 HEL-25 的懒加载边界（硬规则 2/6）。
 *
 * 数据通路（值变不重编译，HEL-26 核心）：
 *  ShaderCanvas 持有 valuesRef（当前 UniformMap）与一份 React state（仅供控件回显当前值）。
 *  控件改值 → onChange → 同时写 valuesRef.current（驱动着色器，下一帧 renderFrame 从 ref 读）
 *  与 setState（驱动控件标签 / 受控 input 重渲染）。valuesRef 不入 useShaderProgram 的
 *  effect deps，故改值不重建 program。
 *
 * 控件复用 HEL-23 controls.tsx 的 Slider / Toggle（受控用法），保持风格与 token 一致；
 * color 用原生 <input type="color">（暗色下加 label 与可见边框）。
 */

import { useId } from "react";

import { Slider, Toggle } from "../controls";
import type {
  UniformControl,
  UniformMap,
  UniformValue,
} from "./use-shader-program";

// ============================ schema → 运行时值 ============================

/**
 * 把单个 control 的 default 归一化成引擎可上传的 UniformValue：
 *  - bool → 0/1（number，对应 uniform1f）
 *  - color / vec* → number[]
 *  - float → number
 */
function defaultToValue(control: UniformControl): UniformValue {
  switch (control.type) {
    case "bool":
      return control.default ? 1 : 0;
    case "color":
    case "vec2":
    case "vec3":
      // default 已是数组；防御性拷贝成可变数组，避免共享只读引用被后续就地改动。
      return [...(control.default as readonly number[])];
    case "float":
    default:
      return control.default as number;
  }
}

/** 把整组 schema 的初值组装成一张 UniformMap（= ShaderCanvas 的初始 / 重置目标）。 */
export function controlsToInitialValues(
  controls: readonly UniformControl[],
): UniformMap {
  const map: Record<string, UniformValue> = {};
  for (const c of controls) map[c.name] = defaultToValue(c);
  return map;
}

// ============================ 颜色 hex ↔ rgb(0..1) ============================

function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n));
}

/** rgb(0..1) → "#rrggbb"（喂给原生 color input）。 */
function rgbToHex(rgb: readonly number[]): string {
  const toByte = (n: number) =>
    Math.round(clamp01(n) * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toByte(rgb[0] ?? 0)}${toByte(rgb[1] ?? 0)}${toByte(rgb[2] ?? 0)}`;
}

/** "#rrggbb" → [r, g, b]（0..1，传给着色器的 vec3）。 */
function hexToRgb(hex: string): [number, number, number] {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return [0, 0, 0];
  const int = parseInt(m[1], 16);
  return [
    ((int >> 16) & 0xff) / 255,
    ((int >> 8) & 0xff) / 255,
    (int & 0xff) / 255,
  ];
}

// ============================ 单控件渲染 ============================

const COMPONENT_LABELS = ["x", "y", "z"] as const;

type ControlRowProps = {
  control: UniformControl;
  value: UniformValue;
  onChange: (next: UniformValue) => void;
};

/** 按 type 渲染对应控件，把改动归一化成 UniformValue 回传。 */
function ControlRow({ control, value, onChange }: ControlRowProps) {
  const colorId = useId();
  const label = control.label ?? control.name;
  const min = control.min ?? 0;
  const max = control.max ?? 1;
  const step = control.step ?? 0.01;

  switch (control.type) {
    case "float":
      return (
        <Slider
          label={label}
          min={min}
          max={max}
          step={step}
          value={typeof value === "number" ? value : 0}
          onChange={onChange}
          format={(v) => v.toFixed(2)}
        />
      );

    case "bool":
      return (
        <Toggle
          label={label}
          checked={typeof value === "number" ? value > 0.5 : false}
          onChange={(on) => onChange(on ? 1 : 0)}
        />
      );

    case "color": {
      const rgb = Array.isArray(value) ? value : [0, 0, 0];
      return (
        <div className="flex items-center gap-3">
          <label htmlFor={colorId} className="text-xs text-secondary">
            {label}
          </label>
          <input
            id={colorId}
            type="color"
            value={rgbToHex(rgb)}
            aria-label={label}
            onChange={(e) => onChange(hexToRgb(e.target.value))}
            className="h-6 w-10 cursor-pointer rounded-control border border-border bg-elevated"
          />
          <span className="font-mono text-xs tabular-nums text-secondary">
            {rgbToHex(rgb)}
          </span>
        </div>
      );
    }

    case "vec2":
    case "vec3": {
      const dim = control.type === "vec2" ? 2 : 3;
      const vec = Array.isArray(value) ? value : new Array<number>(dim).fill(0);
      return (
        <div className="flex flex-col gap-2">
          <span className="text-xs text-secondary">{label}</span>
          {Array.from({ length: dim }, (_, i) => (
            <Slider
              key={i}
              label={`${label}.${COMPONENT_LABELS[i]}`}
              min={min}
              max={max}
              step={step}
              value={vec[i] ?? 0}
              onChange={(next) => {
                const updated = [...vec];
                updated[i] = next;
                onChange(updated);
              }}
              format={(v) => v.toFixed(2)}
            />
          ))}
        </div>
      );
    }

    default:
      return null;
  }
}

// ============================ 控件区 ============================

export type UniformControlsProps = {
  /** 控件声明 schema 数组 */
  controls: readonly UniformControl[];
  /** 当前各 uniform 值（受控；驱动控件回显） */
  values: UniformMap;
  /** 单个 uniform 改值回调（ShaderCanvas 据此写 valuesRef + setState） */
  onChange: (name: string, value: UniformValue) => void;
};

/**
 * 控件区：每个 control 一行。渲染在画布下方（ShaderCanvas 负责外层分隔线 / 间距容器）。
 * 控件全部受控，值来自 props.values；改动经 onChange 上抛由 ShaderCanvas 落到 ref + state。
 */
export function UniformControls({
  controls,
  values,
  onChange,
}: UniformControlsProps) {
  return (
    <div className="flex flex-col gap-3">
      {controls.map((control) => (
        <ControlRow
          key={control.name}
          control={control}
          value={values[control.name]}
          onChange={(next) => onChange(control.name, next)}
        />
      ))}
    </div>
  );
}
