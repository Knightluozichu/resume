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
  DEFAULT_LIGHTING_ENABLED,
  DEFAULT_LIGHTING_PARAMS,
  type LightingEnabled,
  type LightingParams,
} from "../camera/camera-math";
import { useLightingProgram } from "./use-lighting-program";

/**
 * 分步模式的一步（HEL-64）：opt-in。作者按 Phong 计算管线把光照拆成几个累积阶段，
 * 每步声明本阶段哪几项参与（enabled），读者用步进 transport 逐阶段叠加观察。
 */
export type LightingStep = {
  /** 步标题（如「只环境光」「+漫反射」） */
  label: string;
  /** 一句说明：本阶段画面要看什么 */
  caption?: string;
  /** 本步 Phong 三项的参与与否（驱动引擎 gating） */
  enabled: LightingEnabled;
};

export type LightingCanvasProps = {
  height?: number;
  caption?: string;
  /**
   * 分步模式（opt-in）。不传 / 空数组 → 维持现状：无步进条、三项全开、4 滑块照旧。
   * 传入 → 画布下方渲染紧凑步进条，当前步的 enabled 驱动引擎 gating。
   * 初始停在最后一步（=全开，开箱即完整 Phong），读者可往回点看分解。
   */
  steps?: LightingStep[];
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
  steps,
}: LightingCanvasProps) {
  const paramsRef = useRef<LightingParams>({ ...DEFAULT_LIGHTING_PARAMS });
  const [params, setParams] = useState<LightingParams>({
    ...DEFAULT_LIGHTING_PARAMS,
  });

  // 分步：仅当作者传了非空 steps 才启用。初始停在最后一步（=全开，开箱即完整 Phong）。
  const stepCount = steps?.length ?? 0;
  const hasSteps = stepCount > 0;
  const lastStep = stepCount - 1;
  const [stepIndex, setStepIndex] = useState(lastStep);
  const enabledRef = useRef<LightingEnabled>({ ...DEFAULT_LIGHTING_ENABLED });

  const { canvasRef, status, requestDraw } = useLightingProgram(
    paramsRef,
    enabledRef,
  );

  const syncParams = useCallback(
    (next: LightingParams) => {
      paramsRef.current = next;
      setParams(next);
      requestDraw();
    },
    [requestDraw],
  );

  // 切步：写 enabledRef（驱动引擎 gating）+ 重绘。不传 steps 时保持全开。
  const goStep = useCallback(
    (next: number) => {
      if (!steps || steps.length === 0) return;
      const clamped = Math.min(steps.length - 1, Math.max(0, next));
      setStepIndex(clamped);
      enabledRef.current = { ...steps[clamped].enabled };
      requestDraw();
    },
    [steps, requestDraw],
  );

  // steps 变化（或挂载）时把当前步的 gating 落到 ref，初始即最后一步（全开）。
  useEffect(() => {
    if (steps && steps.length > 0) {
      const idx = Math.min(stepIndex, steps.length - 1);
      enabledRef.current = { ...steps[idx].enabled };
    } else {
      enabledRef.current = { ...DEFAULT_LIGHTING_ENABLED };
    }
    requestDraw();
  }, [steps, stepIndex, requestDraw]);

  useEffect(() => {
    requestDraw();
  }, [params, requestDraw]);

  const reset = () => {
    syncParams({ ...DEFAULT_LIGHTING_PARAMS });
    if (hasSteps) goStep(lastStep);
  };

  const currentStep = hasSteps ? steps![Math.min(stepIndex, lastStep)] : null;

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

      {hasSteps && currentStep && (
        <section
          aria-label="Phong 分步演示"
          className="mt-4 space-y-3 border-t border-border pt-4"
        >
          {/* 步点条 + 序号：每步即该阶段实时渲染，步点驱动 gating（非纯文字） */}
          <div className="flex items-center justify-between gap-3">
            <ol className="flex flex-wrap gap-2" aria-hidden="true">
              {steps!.map((s, i) => (
                <li key={s.label}>
                  <button
                    type="button"
                    onClick={() => goStep(i)}
                    className={`rounded-control border px-2 py-1 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                      i === stepIndex
                        ? "border-accent text-accent"
                        : i < stepIndex
                          ? "border-border text-primary"
                          : "border-border text-secondary hover:text-primary"
                    }`}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ol>
            <span className="shrink-0 font-mono text-xs tabular-nums text-secondary">
              第 {stepIndex + 1} / {stepCount} 步
            </span>
          </div>

          {/* 当前步标题 + 一句说明 */}
          <div role="group" aria-label={`第 ${stepIndex + 1} 步`}>
            <h4 className="text-sm font-semibold text-accent">
              {currentStep.label}
            </h4>
            {currentStep.caption && (
              <p className="mt-1 text-xs text-secondary">
                {currentStep.caption}
              </p>
            )}
          </div>

          {/* transport：上一步 / 从头分步看 / 下一步 */}
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => goStep(stepIndex - 1)}
              disabled={stepIndex === 0}
              aria-label="上一步"
              className="rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              ◀ 上一步
            </button>
            <button
              type="button"
              onClick={() => goStep(0)}
              aria-label="从头分步看"
              className="rounded-control border border-border px-3 py-2 text-xs text-accent transition-colors duration-(--duration-hover) ease-standard hover:border-accent"
            >
              从头分步看
            </button>
            <button
              type="button"
              onClick={() => goStep(stepIndex + 1)}
              disabled={stepIndex === lastStep}
              aria-label="下一步"
              className="rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              下一步 ▶
            </button>
          </div>
        </section>
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
