"use client";

/**
 * <CameraCanvas>：摄像机视角 3D 演示画布（「摄像机」章 CameraDemo 实现层）。
 *
 * !!! 含 WebGL 代码，只允许经 camera-demo.tsx 的 next/dynamic(ssr:false) 懒加载。
 *
 * 控件（≤5）：pitch / yaw / distance / fov 滑块 + 重置。实时 lookAt 渲染网格 + 立方体场景。
 */

import { useCallback, useEffect, useId, useRef, useState } from "react";

import {
  DEFAULT_CAMERA_PARAMS,
  frontFromAngles,
  type CameraParams,
} from "./camera-math";
import { useCameraProgram } from "./use-camera-program";

export type CameraCanvasProps = {
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
      <label htmlFor={id} className="w-16 shrink-0 text-xs text-secondary">
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

export default function CameraCanvas({
  height = 320,
  caption = "拖动 pitch / yaw / distance / fov，看摄像机视角如何变化。场景中心是若干彩色立方体 + XZ 网格地面。",
}: CameraCanvasProps) {
  const paramsRef = useRef<CameraParams>({ ...DEFAULT_CAMERA_PARAMS });
  const [params, setParams] = useState<CameraParams>({
    ...DEFAULT_CAMERA_PARAMS,
  });

  const { canvasRef, status, requestDraw } = useCameraProgram(paramsRef);

  const syncParams = useCallback(
    (next: CameraParams) => {
      paramsRef.current = next;
      setParams(next);
      requestDraw();
    },
    [requestDraw],
  );

  useEffect(() => {
    requestDraw();
  }, [params, requestDraw]);

  const reset = () => syncParams({ ...DEFAULT_CAMERA_PARAMS });

  const front = frontFromAngles(params.pitch, params.yaw);

  return (
    <div className="mdx-camera-demo my-6 rounded-card border border-border bg-elevated p-6">
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
          aria-label="摄像机视角 3D 演示：网格地面与彩色立方体，由 pitch、yaw、distance、fov 控制观察角度"
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
          label="Pitch"
          min={-89}
          max={89}
          step={1}
          value={params.pitch}
          format={(v) => `${v}°`}
          onChange={(pitch) => syncParams({ ...paramsRef.current, pitch })}
        />
        <ParamSlider
          label="Yaw"
          min={0}
          max={360}
          step={1}
          value={params.yaw}
          format={(v) => `${v}°`}
          onChange={(yaw) => syncParams({ ...paramsRef.current, yaw })}
        />
        <ParamSlider
          label="距离"
          min={2}
          max={20}
          step={0.5}
          value={params.distance}
          format={(v) => v.toFixed(1)}
          onChange={(distance) =>
            syncParams({ ...paramsRef.current, distance })
          }
        />
        <ParamSlider
          label="FOV"
          min={15}
          max={90}
          step={1}
          value={params.fov}
          format={(v) => `${v}°`}
          onChange={(fov) => syncParams({ ...paramsRef.current, fov })}
        />
        <p className="font-mono text-xs text-secondary">
          front ≈ ({front[0].toFixed(2)}, {front[1].toFixed(2)},{" "}
          {front[2].toFixed(2)})
        </p>
      </div>

      {caption && <p className="mt-3 text-sm text-secondary">{caption}</p>}
    </div>
  );
}
