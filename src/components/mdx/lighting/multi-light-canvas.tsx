"use client";

/**
 * <MultiLightCanvas>：多光源交互 Demo 控件层（HEL-66，multiple-lights 章主 Demo 实现层）。
 *
 * !!! 含 WebGL 代码（经 use-multi-light-program.ts），只允许经 multi-light-demo.tsx 的
 * next/dynamic(ssr:false) 懒加载（CLAUDE.md 硬规则 2/6）。禁止任何公共 layout / 页面静态 import。
 *
 * 渲染：一个居中立方体，同时叠加 1 平行光 + 至多 4 点光源（可增删）+ 1 聚光，
 * 片元对每类光各算一份 Phong 后相加（不 clamp，可顶白过曝）—— 直观看到「多盏贡献相加」。
 *
 * 主从控件（spec §五：任一时刻活动可调控件 ≤5）：
 *  - 顶部「灯管理」行：选择当前编辑对象（平行光 / 点光#i / 聚光）；各类光「开/关」；
 *    点光源带 ＋/－ 增删（上限 4）。
 *  - 下方只显示「当前选中那一盏」的参数控件：颜色 + 方位 + （衰减档 / 切光角 / 强度），≤5。
 *  - 重置：回到默认布灯（1 平行光 + 2 异色点光源 + 1 聚光），开箱即「多盏叠加、亮处过曝」。
 *
 * 列表标记泄漏防护（HEL-64 教训）：分步/列表根容器加 not-prose，否则被 globals.css 的
 * .prose :where(ol/ul) 加上标记。本组件灯管理用 div（非 ol/ul），不受影响；保险起见外层带 not-prose 区段。
 */

import { useCallback, useEffect, useId, useRef, useState } from "react";

import {
  ATTENUATION_TABLE,
  defaultModel,
  MAX_POINT_LIGHTS,
  useMultiLightProgram,
  type AttenuationLevel,
  type MultiLightModel,
} from "./use-multi-light-program";
import type { Vec3 } from "../camera/camera-math";

export type MultiLightCanvasProps = {
  height?: number;
  caption?: string;
};

// —— 颜色工具：Vec3(0..1) ↔ #rrggbb —— //
function vecToHex(v: Vec3): string {
  const c = (x: number) =>
    Math.max(0, Math.min(255, Math.round(x * 255)))
      .toString(16)
      .padStart(2, "0");
  return `#${c(v[0])}${c(v[1])}${c(v[2])}`;
}
function hexToVec(hex: string): Vec3 {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return [1, 1, 1];
  const n = parseInt(m[1], 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

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

function ColorControl({
  value,
  onChange,
}: {
  value: Vec3;
  onChange: (v: Vec3) => void;
}) {
  const id = useId();
  return (
    <div className="flex items-center gap-3">
      <label htmlFor={id} className="w-16 shrink-0 text-xs text-secondary">
        颜色
      </label>
      <input
        id={id}
        type="color"
        value={vecToHex(value)}
        aria-label="光源颜色"
        onChange={(e) => onChange(hexToVec(e.target.value))}
        className="h-6 w-10 cursor-pointer rounded-control border border-border bg-elevated"
      />
      <span className="font-mono text-xs tabular-nums text-secondary">
        {vecToHex(value)}
      </span>
    </div>
  );
}

const ATT_ORDER: AttenuationLevel[] = ["near", "mid", "far"];

// 选中编辑对象的标识：平行光 / 第 i 盏点光源 / 聚光。
type Selection =
  | { kind: "dir" }
  | { kind: "point"; index: number }
  | { kind: "spot" };

export default function MultiLightCanvas({
  height = 340,
  caption = "一个立方体同时被「平行光 + 多盏点光源 + 聚光」照亮：片元对每类光各算一份 Phong（环境+漫反射+镜面）再相加。顶部选灯、开关、给点光源 ＋/－ 增删；下方只调当前选中那盏的参数。被多盏光同时照到的面会更亮，贡献加多了甚至顶满成纯白（过曝）。",
}: MultiLightCanvasProps) {
  // model = 渲染源（UI 从它出）；modelRef = 引擎用（draw 里读 .current，effect 内同步）。
  // 不在 render 里读 ref（react-hooks/refs），改模型走 setState + 不可变更新。
  const [model, setModel] = useState<MultiLightModel>(() => defaultModel());
  const modelRef = useRef<MultiLightModel>(model);
  const [selection, setSelection] = useState<Selection>({
    kind: "point",
    index: 0,
  });

  const { canvasRef, status, requestDraw } = useMultiLightProgram(modelRef);

  // 每次 model 变 → 同步给引擎的 ref + 按需重绘（引擎读 ref，不重编译、不挂常驻 rAF）。
  useEffect(() => {
    modelRef.current = model;
    requestDraw();
  }, [model, requestDraw]);

  // 改模型：不可变 producer → 新 model（上面的 effect 负责同步 ref + 重绘）。
  const mutate = useCallback((produce: (m: MultiLightModel) => MultiLightModel) => {
    setModel((m) => produce(m));
  }, []);

  const pointCount = model.points.length;

  const addPoint = useCallback(() => {
    mutate((m) => {
      if (m.points.length >= MAX_POINT_LIGHTS) return m;
      // 新点光源放到与现有错开的方位，给个鲜明色，便于看出新增了一盏。
      const palette: Vec3[] = [
        [0.5, 1.0, 0.4],
        [1.0, 0.3, 0.8],
      ];
      const idx = m.points.length;
      return {
        ...m,
        points: [
          ...m.points,
          {
            on: true,
            azimuth: (90 + idx * 90) % 360,
            color: palette[idx % palette.length] ?? [1, 1, 1],
            intensity: 1.2,
            attenuation: "mid" as AttenuationLevel,
          },
        ],
      };
    });
    setSelection({ kind: "point", index: pointCount });
  }, [mutate, pointCount]);

  const removePoint = useCallback(
    (index: number) => {
      mutate((m) => {
        if (m.points.length <= 0) return m;
        return { ...m, points: m.points.filter((_, i) => i !== index) };
      });
      // 选中态收敛到一个合法对象（删完最后一盏点光源就跳到平行光）。
      setSelection((sel) => {
        if (pointCount - 1 <= 0) return { kind: "dir" };
        if (sel.kind === "point") {
          return {
            kind: "point",
            index: Math.min(sel.index, pointCount - 2),
          };
        }
        return sel;
      });
    },
    [mutate, pointCount],
  );

  const reset = useCallback(() => {
    setModel(defaultModel());
    setSelection({ kind: "point", index: 0 });
  }, []);

  // 不可变更新小工具：改某类光的某些字段，返回新 model。
  const patchDir = useCallback(
    (patch: Partial<MultiLightModel["dir"]>) =>
      mutate((m) => ({ ...m, dir: { ...m.dir, ...patch } })),
    [mutate],
  );
  const patchSpot = useCallback(
    (patch: Partial<MultiLightModel["spot"]>) =>
      mutate((m) => ({ ...m, spot: { ...m.spot, ...patch } })),
    [mutate],
  );
  const patchPoint = useCallback(
    (index: number, patch: Partial<MultiLightModel["points"][number]>) =>
      mutate((m) => ({
        ...m,
        points: m.points.map((p, i) => (i === index ? { ...p, ...patch } : p)),
      })),
    [mutate],
  );

  // 当前选中对象的参数控件（≤5：开关算在灯管理行里，下方是 颜色 + 方位 + 1~2 项）。
  const renderDetail = () => {
    if (selection.kind === "dir") {
      const d = model.dir;
      return (
        <div className="space-y-3">
          <ColorControl
            value={d.color}
            onChange={(color) => patchDir({ color })}
          />
          <ParamSlider
            label="方向"
            min={0}
            max={360}
            step={1}
            value={Math.round(d.azimuth)}
            format={(v) => `${v}°`}
            onChange={(azimuth) => patchDir({ azimuth })}
          />
          <ParamSlider
            label="强度"
            min={0}
            max={2}
            step={0.05}
            value={d.intensity}
            format={(v) => v.toFixed(2)}
            onChange={(intensity) => patchDir({ intensity })}
          />
        </div>
      );
    }

    if (selection.kind === "spot") {
      const s = model.spot;
      return (
        <div className="space-y-3">
          <ColorControl
            value={s.color}
            onChange={(color) => patchSpot({ color })}
          />
          <ParamSlider
            label="朝向"
            min={0}
            max={360}
            step={1}
            value={Math.round(s.azimuth)}
            format={(v) => `${v}°`}
            onChange={(azimuth) => patchSpot({ azimuth })}
          />
          <ParamSlider
            label="强度"
            min={0}
            max={3}
            step={0.05}
            value={s.intensity}
            format={(v) => v.toFixed(2)}
            onChange={(intensity) => patchSpot({ intensity })}
          />
          <ParamSlider
            label="切光角"
            min={6}
            max={45}
            step={1}
            value={Math.round(s.outerAngleDeg)}
            format={(v) => `${v}°`}
            onChange={(outerAngleDeg) => patchSpot({ outerAngleDeg })}
          />
        </div>
      );
    }

    // 点光源
    const idx = Math.min(selection.index, pointCount - 1);
    if (idx < 0) {
      return (
        <p className="text-xs text-secondary">
          当前没有点光源。用上方「＋ 加点光源」加一盏，或选平行光 / 聚光编辑。
        </p>
      );
    }
    const p = model.points[idx];
    return (
      <div className="space-y-3">
        <ColorControl
          value={p.color}
          onChange={(color) => patchPoint(idx, { color })}
        />
        <ParamSlider
          label="方位"
          min={0}
          max={360}
          step={1}
          value={Math.round(p.azimuth)}
          format={(v) => `${v}°`}
          onChange={(azimuth) => patchPoint(idx, { azimuth })}
        />
        <ParamSlider
          label="强度"
          min={0}
          max={3}
          step={0.05}
          value={p.intensity}
          format={(v) => v.toFixed(2)}
          onChange={(intensity) => patchPoint(idx, { intensity })}
        />
        <div className="flex items-center gap-3">
          <span className="w-16 shrink-0 text-xs text-secondary">衰减</span>
          <div className="flex gap-1">
            {ATT_ORDER.map((lvl) => (
              <button
                key={lvl}
                type="button"
                aria-pressed={p.attenuation === lvl}
                onClick={() => patchPoint(idx, { attenuation: lvl })}
                className={`rounded-control border px-2 py-1 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                  p.attenuation === lvl
                    ? "border-accent text-accent"
                    : "border-border text-secondary hover:text-primary"
                }`}
              >
                {ATTENUATION_TABLE[lvl].label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 灯管理「芯片」：名称 + 选中态 + 开/关。点光源芯片还带删除。
  const chipClass = (active: boolean) =>
    `rounded-control border px-2 py-1 text-xs transition-colors duration-(--duration-hover) ease-standard ${
      active
        ? "border-accent text-accent"
        : "border-border text-secondary hover:text-primary"
    }`;

  const selectedLabel =
    selection.kind === "dir"
      ? "平行光"
      : selection.kind === "spot"
        ? "聚光"
        : `点光源 #${Math.min(selection.index, pointCount - 1) + 1}`;

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
          aria-label="重置为默认布灯（1 平行光 + 2 异色点光源 + 1 聚光）"
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
          aria-label="多光源 3D 演示：一个立方体同时被一盏平行光、若干点光源、一盏聚光照亮，片元对每类光各算一份 Phong 贡献再相加；被多盏光同时照到的面更亮，叠加过多会过曝顶白"
          className="block w-full"
          style={{ height }}
        />
      </div>

      {status.kind === "error" && (
        <pre className="mt-3 overflow-x-auto rounded-control border border-border bg-bg p-3 font-mono text-xs text-danger">
          {status.stage}: {status.log}
        </pre>
      )}

      {/* 主从控件区：not-prose 防 .prose 列表标记泄漏（HEL-64 教训） */}
      <section
        aria-label="多光源灯管理与参数"
        className="not-prose mt-4 space-y-3 border-t border-border pt-4"
      >
        {/* 灯管理行：选灯 + 开关 + 点光源增删 */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            {/* 平行光 */}
            <div className="inline-flex overflow-hidden rounded-control border border-border">
              <button
                type="button"
                onClick={() => setSelection({ kind: "dir" })}
                aria-pressed={selection.kind === "dir"}
                className={`px-2 py-1 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                  selection.kind === "dir"
                    ? "bg-accent-glow text-accent"
                    : "text-secondary hover:text-primary"
                }`}
              >
                平行光
              </button>
              <button
                type="button"
                role="switch"
                aria-checked={model.dir.on}
                aria-label="平行光开关"
                onClick={() => patchDir({ on: !model.dir.on })}
                className={`border-l border-border px-2 py-1 text-xs ${
                  model.dir.on ? "text-accent" : "text-secondary"
                }`}
              >
                {model.dir.on ? "开" : "关"}
              </button>
            </div>

            {/* 点光源芯片们 */}
            {model.points.map((p, i) => {
              const active = selection.kind === "point" && selection.index === i;
              return (
                <div
                  key={i}
                  className="inline-flex overflow-hidden rounded-control border border-border"
                >
                  <button
                    type="button"
                    onClick={() => setSelection({ kind: "point", index: i })}
                    aria-pressed={active}
                    className={`px-2 py-1 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                      active
                        ? "bg-accent-glow text-accent"
                        : "text-secondary hover:text-primary"
                    }`}
                  >
                    点光源 #{i + 1}
                  </button>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={p.on}
                    aria-label={`点光源 #${i + 1} 开关`}
                    onClick={() => patchPoint(i, { on: !p.on })}
                    className={`border-l border-border px-2 py-1 text-xs ${
                      p.on ? "text-accent" : "text-secondary"
                    }`}
                  >
                    {p.on ? "开" : "关"}
                  </button>
                  <button
                    type="button"
                    aria-label={`删除点光源 #${i + 1}`}
                    onClick={() => removePoint(i)}
                    className="border-l border-border px-2 py-1 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:text-danger"
                  >
                    －
                  </button>
                </div>
              );
            })}

            {/* 加点光源（达上限禁用） */}
            <button
              type="button"
              onClick={addPoint}
              disabled={pointCount >= MAX_POINT_LIGHTS}
              className={chipClass(false) + " disabled:cursor-not-allowed disabled:opacity-40"}
            >
              ＋ 加点光源
            </button>

            {/* 聚光 */}
            <div className="inline-flex overflow-hidden rounded-control border border-border">
              <button
                type="button"
                onClick={() => setSelection({ kind: "spot" })}
                aria-pressed={selection.kind === "spot"}
                className={`px-2 py-1 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                  selection.kind === "spot"
                    ? "bg-accent-glow text-accent"
                    : "text-secondary hover:text-primary"
                }`}
              >
                聚光
              </button>
              <button
                type="button"
                role="switch"
                aria-checked={model.spot.on}
                aria-label="聚光开关"
                onClick={() => patchSpot({ on: !model.spot.on })}
                className={`border-l border-border px-2 py-1 text-xs ${
                  model.spot.on ? "text-accent" : "text-secondary"
                }`}
              >
                {model.spot.on ? "开" : "关"}
              </button>
            </div>
          </div>
          <p className="text-xs text-secondary">
            点光源 {pointCount} / {MAX_POINT_LIGHTS} 盏。选中谁就在下方调谁的参数。
          </p>
        </div>

        {/* 当前选中那盏的参数（≤5 活动控件） */}
        <div
          role="group"
          aria-label={`${selectedLabel} 参数`}
          className="border-t border-border pt-3"
        >
          <h4 className="mb-2 text-sm font-semibold text-accent">
            正在编辑：{selectedLabel}
          </h4>
          {renderDetail()}
        </div>
      </section>

      {caption && <p className="mt-3 text-sm text-secondary">{caption}</p>}
    </div>
  );
}
