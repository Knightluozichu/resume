"use client";

/**
 * <LightingMapsCanvas>：光照贴图渐进三步演示画布（HEL-65，lighting-maps 章专用实现层）。
 *
 * !!! 含 WebGL 代码（经 use-lighting-maps-program.ts），只允许经 lighting-maps-demo.tsx 的
 * next/dynamic(ssr:false) 懒加载（CLAUDE.md 硬规则 2/6）。禁止任何公共 layout / 页面静态 import。
 *
 * 渲染：贴图立方体（木箱风 diffuse + 配套灰度 specular 遮罩）+ 公转点光源（小亮块标记）。
 * 三步推进（复用 HEL-64 步进 transport 的气质，但本组件自带一份实现，不改 lighting-canvas）：
 *  1. 常量材质：整块一套常量 diffuse/specular 的 Phong（贴图之前的基线，整块一起泛高光）
 *  2. +漫反射贴图：material.diffuse = texture(diffuseMap, uv).rgb——木纹 + 钢边底色出现
 *  3. +镜面光贴图遮罩：material.specular *= texture(specularMap, uv).r——钢边白=反光、木头黑=哑，
 *     于是只有钢边随光高光、木面哑光
 *
 * 控件（≤5，spec §五；重置不计入）：步进 transport（上一步/从头/下一步）、光源方位滑块、
 * 自转开关（reduced-motion 默认关）+ 重置。改控件 → uniform/ref 驱动按需重绘，不重编译。
 *
 * 列表标记泄漏防护（HEL-64 教训）：步点条所在的结构性 <ol> 根容器加 not-prose，
 * 否则被 globals.css 的 .prose :where(ol) 加上 decimal 标记。
 */

import { useCallback, useEffect, useId, useRef, useState } from "react";

import {
  DEFAULT_LIGHTING_MAPS_PARAMS,
  useLightingMapsProgram,
  type LightingMapsParams,
  type LightingMapsStep,
} from "./use-lighting-maps-program";

export type LightingMapsCanvasProps = {
  height?: number;
  caption?: string;
};

type StepMeta = {
  value: LightingMapsStep;
  label: string;
  caption: string;
};

// 三步元数据：标题 + 一句「本步画面要看什么」。
const STEPS: ReadonlyArray<StepMeta> = [
  {
    value: "constant",
    label: "① 常量材质（贴图之前）",
    caption:
      "整块用一套常量底色 + 常量镜面强度的 Phong。转动光源，整个立方体一起明暗、一起泛起高光——同一物体上分不出区，这正是常量材质的局限。",
  },
  {
    value: "diffuse",
    label: "② + 漫反射贴图",
    caption:
      "把 material.diffuse 换成 texture(diffuseMap, uv).rgb：木箱的木纹与四周钢边底色出现了，整块一色变成各处各色。但镜面仍是整块一个常量，高光还是整面一起亮。",
  },
  {
    value: "specular",
    label: "③ + 镜面光贴图遮罩",
    caption:
      "再把 material.specular 乘上 texture(specularMap, uv).r 这张灰度遮罩（钢边白≈反光、木头黑≈哑）。现在转动光源：只有钢边和铆钉随光泛起高光，木面始终哑光——同一物体分区反光。",
  },
];

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

export default function LightingMapsCanvas({
  height = 320,
  caption = "贴图立方体 + 公转点光源（小亮块标记其位置）。用下方步进条从「常量材质」推进到「漫反射贴图」「+镜面光贴图遮罩」，对比同一物体在三步下的反光：第 3 步只有钢边随光高光、木面始终哑光。拖光源方位或开自转让高光游走。",
}: LightingMapsCanvasProps) {
  const paramsRef = useRef<LightingMapsParams>({
    ...DEFAULT_LIGHTING_MAPS_PARAMS,
  });
  const [params, setParams] = useState<LightingMapsParams>({
    ...DEFAULT_LIGHTING_MAPS_PARAMS,
  });

  // 初始停在最后一步（=完整效果，开箱即「贴图后只有钢边亮」），读者可往回看分解。
  const lastStep = STEPS.length - 1;
  const [stepIndex, setStepIndex] = useState(lastStep);
  const stepRef = useRef<LightingMapsStep>(STEPS[lastStep].value);

  const { canvasRef, status, requestDraw, syncSpin } = useLightingMapsProgram(
    paramsRef,
    stepRef,
  );

  const goStep = useCallback(
    (next: number) => {
      const clamped = Math.min(lastStep, Math.max(0, next));
      setStepIndex(clamped);
      stepRef.current = STEPS[clamped].value;
      requestDraw();
    },
    [lastStep, requestDraw],
  );

  const updateAngle = useCallback(
    (lightAngle: number) => {
      paramsRef.current = { ...paramsRef.current, lightAngle };
      setParams((p) => ({ ...p, lightAngle }));
      requestDraw();
    },
    [requestDraw],
  );

  const toggleAutoRotate = useCallback(() => {
    const next = !paramsRef.current.autoRotate;
    paramsRef.current = { ...paramsRef.current, autoRotate: next };
    setParams((p) => ({ ...p, autoRotate: next }));
    syncSpin();
    requestDraw();
  }, [syncSpin, requestDraw]);

  // 自转开关变化 / 挂载时同步自转循环（进出视口由引擎内 IO 处理）。
  useEffect(() => {
    syncSpin();
  }, [params.autoRotate, syncSpin]);

  const reset = useCallback(() => {
    paramsRef.current = { ...DEFAULT_LIGHTING_MAPS_PARAMS };
    setParams({ ...DEFAULT_LIGHTING_MAPS_PARAMS });
    goStep(lastStep);
    syncSpin();
    requestDraw();
  }, [goStep, lastStep, syncSpin, requestDraw]);

  const current = STEPS[Math.min(stepIndex, lastStep)];

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
          aria-label="重置演示（回到最后一步、光源方位与自转回默认值）"
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
          aria-label="光照贴图 3D 演示：贴图立方体被一个绕物体公转的点光源照亮；可分三步从常量材质推进到漫反射贴图、再到镜面光贴图遮罩，观察钢边随光高光、木面哑光"
          className="block w-full"
          style={{ height }}
        />
      </div>

      {status.kind === "error" && (
        <pre className="mt-3 overflow-x-auto rounded-control border border-border bg-bg p-3 font-mono text-xs text-danger">
          {status.stage}: {status.log}
        </pre>
      )}

      {/* 步进区：not-prose 防 .prose 给内部 ol 加 decimal 标记（HEL-64 教训） */}
      <section
        aria-label="光照贴图分步演示"
        className="not-prose mt-4 space-y-3 border-t border-border pt-4"
      >
        <div className="flex items-center justify-between gap-3">
          <ol className="flex flex-wrap gap-2" aria-hidden="true">
            {STEPS.map((s, i) => (
              <li key={s.value}>
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
            第 {stepIndex + 1} / {STEPS.length} 步
          </span>
        </div>

        <div role="group" aria-label={`第 ${stepIndex + 1} 步`}>
          <h4 className="text-sm font-semibold text-accent">{current.label}</h4>
          <p className="mt-1 text-xs text-secondary">{current.caption}</p>
        </div>

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

      <div className="mt-4 space-y-3 border-t border-border pt-4">
        <ParamSlider
          label="光源方位"
          min={0}
          max={360}
          step={1}
          value={Math.round(params.lightAngle)}
          format={(v) => `${v}°`}
          onChange={updateAngle}
        />
        <div className="flex items-center gap-3">
          <span className="w-20 shrink-0 text-xs text-secondary">自转</span>
          <button
            type="button"
            role="switch"
            aria-checked={params.autoRotate}
            onClick={toggleAutoRotate}
            className={`rounded-control border px-3 py-1 text-xs transition-colors duration-(--duration-hover) ease-standard ${
              params.autoRotate
                ? "border-accent text-accent"
                : "border-border text-secondary hover:text-primary"
            }`}
          >
            {params.autoRotate ? "公转中（点击停）" : "让光源自动公转"}
          </button>
        </div>
      </div>

      {caption && <p className="mt-3 text-sm text-secondary">{caption}</p>}
    </div>
  );
}
