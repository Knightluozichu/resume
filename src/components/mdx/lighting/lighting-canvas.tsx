"use client";

/**
 * <LightingCanvas>：Phong 光照 3D 演示画布（「光照篇」LightingDemo 实现层）。
 *
 * !!! 含 WebGL 代码，只允许经 lighting-demo.tsx 的 next/dynamic(ssr:false) 懒加载。
 *
 * 控件（≤5，spec §五）：光源方位 / 环境强度 / 镜面强度 / 高光指数 + 重置。
 * 改控件 → uniform 驱动实时按需重绘（不重编译、不挂常驻 rAF）。
 */

import { useCallback, useEffect, useId, useRef, useState } from "react";

import {
  DEFAULT_LIGHTING_PARAMS,
  type LightingParams,
} from "../camera/camera-math";
import { useLightingProgram } from "./use-lighting-program";

export type LightingCanvasProps = {
  height?: number;
  caption?: string;
};

function ParamSlider({
  label,
  min,
  max,
  step,
  value,
  format,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}) {
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
        aria-valuetext={format(value)}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mdx-range h-1 min-w-0 flex-1 cursor-pointer appearance-none rounded-control bg-border accent-accent"
      />
      <span className="w-14 shrink-0 text-right font-mono text-xs tabular-nums text-secondary">
        {format(value)}
      </span>
    </div>
  );
}

export default function LightingCanvas({
  height = 320,
  caption = "拖动光源方位看漫反射明暗随 N·L 变化；调环境/镜面强度与高光指数，观察 Phong 三项的叠加。小亮块标记点光源位置。",
}: LightingCanvasProps) {
  const paramsRef = useRef<LightingParams>({ ...DEFAULT_LIGHTING_PARAMS });
  const [params, setParams] = useState<LightingParams>({
    ...DEFAULT_LIGHTING_PARAMS,
  });

  const { canvasRef, status, requestDraw } = useLightingProgram(paramsRef);

  const syncParams = useCallback(
    (next: LightingParams) => {
      paramsRef.current = next;
      setParams(next);
      requestDraw();
    },
    [requestDraw],
  );

  useEffect(() => {
    requestDraw();
  }, [params, requestDraw]);

  const reset = () => syncParams({ ...DEFAULT_LIGHTING_PARAMS });

  return (
    <div className="mdx-lighting-demo my-6 rounded-card border border-border bg-elevated p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
          <span aria-hidden="true">⚡</span>
          可交互
        </span>
        <button
          type="button"
          onClick={reset}
          className="rounded-control border border-border px-3 py-1 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
        >
          重置
        </button>
      </div>

      <div
        className="overflow-hidden rounded-control border border-border bg-bg"
        style={{ boxShadow: "inset 0 0 0 1px var(--accent-glow)" }}
      >
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Phong 光照 3D 演示：居中立方体被一个可绕物体公转的点光源照亮，由光源方位、环境强度、镜面强度、高光指数控制明暗与高光"
          className="block w-full"
          style={{ height }}
        />
      </div>

      {status.kind === "error" && (
        <pre className="mt-3 overflow-x-auto rounded-control border border-border bg-bg p-3 font-mono text-xs text-danger">
          {status.stage}: {status.log}
        </pre>
      )}

      <div className="mt-4 space-y-3 border-t border-border pt-4">
        <ParamSlider
          label="光源方位"
          min={0}
          max={360}
          step={1}
          value={params.lightAngle}
          format={(v) => `${v}°`}
          onChange={(lightAngle) =>
            syncParams({ ...paramsRef.current, lightAngle })
          }
        />
        <ParamSlider
          label="环境强度"
          min={0}
          max={1}
          step={0.01}
          value={params.ambientStrength}
          format={(v) => v.toFixed(2)}
          onChange={(ambientStrength) =>
            syncParams({ ...paramsRef.current, ambientStrength })
          }
        />
        <ParamSlider
          label="镜面强度"
          min={0}
          max={1}
          step={0.01}
          value={params.specularStrength}
          format={(v) => v.toFixed(2)}
          onChange={(specularStrength) =>
            syncParams({ ...paramsRef.current, specularStrength })
          }
        />
        <ParamSlider
          label="高光指数"
          min={2}
          max={256}
          step={1}
          value={params.shininess}
          format={(v) => `${v}`}
          onChange={(shininess) =>
            syncParams({ ...paramsRef.current, shininess })
          }
        />
      </div>

      {caption && <p className="mt-3 text-sm text-secondary">{caption}</p>}
    </div>
  );
}
