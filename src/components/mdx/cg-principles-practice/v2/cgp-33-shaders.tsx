"use client";

import { useMemo, useState, type ReactNode } from "react";

type ShaderMode = "phong shader" | "environment mapping" | "debug";

const COLORS = {
  accent: "var(--accent)",
  bg: "var(--bg)",
  border: "var(--border)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  surface: "var(--surface)",
  text: "var(--text-primary)",
  warning: "var(--warning)",
} as const;

function Figure({ children }: { children: ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        {children}
      </div>
    </figure>
  );
}

function SvgFrame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg
      viewBox="0 0 720 380"
      role="img"
      aria-label={label}
      className="block h-auto w-full"
    >
      <rect width="720" height="380" rx="14" fill={COLORS.bg} />
      {children}
    </svg>
  );
}

function round(value: number): number {
  return Math.round(value * 1000) / 1000;
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
  dashed = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  dashed?: boolean;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 9;
  const leftX = round(x2 - size * Math.cos(angle - Math.PI / 6));
  const leftY = round(y2 - size * Math.sin(angle - Math.PI / 6));
  const rightX = round(x2 - size * Math.cos(angle + Math.PI / 6));
  const rightY = round(y2 - size * Math.sin(angle + Math.PI / 6));
  return (
    <>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth="3"
        strokeDasharray={dashed ? "8 6" : undefined}
      />
      <polygon
        points={`${x2},${y2} ${leftX},${leftY} ${rightX},${rightY}`}
        fill={color}
      />
    </>
  );
}

export function Cgp33ShaderPipelineDiagram() {
  return (
    <Figure>
      <SvgFrame label="着色器管线图：顶点属性经过顶点着色器、光栅化和片段着色器生成颜色">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          shaders：把每个阶段的输入契约写清楚
        </text>
        <rect
          x="34"
          y="90"
          width="154"
          height="194"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="111"
          y="126"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          顶点输入
        </text>
        <text
          x="111"
          y="168"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.accent}
        >
          position
        </text>
        <text
          x="111"
          y="202"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.success}
        >
          normal · uv
        </text>
        <text
          x="111"
          y="236"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          材质与矩阵
        </text>
        <Arrow x1={206} y1={188} x2={244} y2={188} color={COLORS.accent} />
        <rect
          x="256"
          y="90"
          width="154"
          height="194"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="333"
          y="126"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          顶点着色器
        </text>
        <text
          x="333"
          y="170"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.accent}
        >
          变换 position
        </text>
        <text
          x="333"
          y="204"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.success}
        >
          传递 varyings
        </text>
        <text
          x="333"
          y="238"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          输出裁剪空间
        </text>
        <Arrow x1={428} y1={188} x2={466} y2={188} color={COLORS.warning} />
        <rect
          x="478"
          y="90"
          width="208"
          height="194"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="582"
          y="126"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          光栅化与片段着色器
        </text>
        <text
          x="582"
          y="170"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          插值 varyings
        </text>
        <text
          x="582"
          y="204"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.accent}
        >
          光照 / 反射
        </text>
        <text
          x="582"
          y="238"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          输出 fragment color
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          着色器不是一段孤立代码，而是阶段之间的类型与坐标契约
        </text>
      </SvgFrame>
    </Figure>
  );
}

export function Cgp33PhongShaderDiagram() {
  return (
    <Figure>
      <SvgFrame label="Phong 着色分解图：环境、漫反射和镜面反射三项组合成片段颜色">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          phong shader：把光照贡献分成可测的三项
        </text>
        <circle
          cx="360"
          cy="210"
          r="54"
          fill={COLORS.accent}
          fillOpacity="0.18"
          stroke={COLORS.accent}
          strokeWidth="4"
        />
        <line
          x1="360"
          y1="210"
          x2="360"
          y2="132"
          stroke={COLORS.border}
          strokeWidth="3"
          strokeDasharray="7 5"
        />
        <Arrow x1={360} y1={210} x2={274} y2={132} color={COLORS.warning} />
        <Arrow x1={360} y1={210} x2={454} y2={132} color={COLORS.success} />
        <text
          x="360"
          y="220"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          片段
        </text>
        <text x="244" y="120" fontSize="14" fill={COLORS.warning}>
          light direction
        </text>
        <text x="458" y="120" fontSize="14" fill={COLORS.success}>
          view direction
        </text>
        <rect
          x="34"
          y="88"
          width="168"
          height="200"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="118"
          y="126"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          环境项
        </text>
        <text
          x="118"
          y="174"
          textAnchor="middle"
          fontSize="18"
          fill={COLORS.accent}
        >
          Cₐ
        </text>
        <text
          x="118"
          y="222"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          基础可见颜色
        </text>
        <Arrow x1={212} y1={188} x2={262} y2={188} color={COLORS.accent} />
        <rect
          x="518"
          y="88"
          width="168"
          height="200"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="602"
          y="126"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          镜面项
        </text>
        <text
          x="602"
          y="174"
          textAnchor="middle"
          fontSize="18"
          fill={COLORS.success}
        >
          Cₛ · (r·v)ⁿ
        </text>
        <text
          x="602"
          y="222"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          视角相关高光
        </text>
        <Arrow x1={482} y1={188} x2={508} y2={188} color={COLORS.success} />
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          C = Cₐ + C_d · max(n·l, 0) + Cₛ · max(r·v, 0)ⁿ
        </text>
      </SvgFrame>
    </Figure>
  );
}

export function Cgp33EnvironmentMappingDiagram() {
  return (
    <Figure>
      <SvgFrame label="环境映射图：法线与视线计算反射向量，再将其转换为环境纹理坐标">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          environment mapping：用反射方向查询外部环境
        </text>
        <circle
          cx="224"
          cy="218"
          r="58"
          fill={COLORS.accent}
          fillOpacity="0.16"
          stroke={COLORS.accent}
          strokeWidth="4"
        />
        <line
          x1="224"
          y1="218"
          x2="224"
          y2="126"
          stroke={COLORS.border}
          strokeWidth="3"
          strokeDasharray="7 5"
        />
        <Arrow x1={224} y1={218} x2={146} y2={142} color={COLORS.warning} />
        <Arrow x1={224} y1={218} x2={300} y2={144} color={COLORS.success} />
        <text
          x="224"
          y="226"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          表面
        </text>
        <text x="112" y="132" fontSize="14" fill={COLORS.warning}>
          view v
        </text>
        <text x="306" y="132" fontSize="14" fill={COLORS.success}>
          normal n
        </text>
        <Arrow x1={300} y1={144} x2={370} y2={104} color={COLORS.accent} />
        <text x="370" y="92" fontSize="14" fill={COLORS.accent}>
          reflect r
        </text>
        <rect
          x="408"
          y="82"
          width="278"
          height="210"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="547"
          y="120"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          环境纹理 / cubemap
        </text>
        <path
          d="M446 156 L520 140 L584 158 L650 142 L650 248 L446 248 Z"
          fill={COLORS.accent}
          fillOpacity="0.12"
          stroke={COLORS.accent}
          strokeWidth="2"
        />
        <path
          d="M446 204 Q498 174 548 204 T650 196"
          fill="none"
          stroke={COLORS.success}
          strokeWidth="4"
        />
        <circle cx="584" cy="158" r="8" fill={COLORS.warning} />
        <text
          x="547"
          y="274"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          r → lookup → reflected color
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          反射向量必须与环境纹理的坐标空间一致，否则会出现旋转或翻转错觉
        </text>
      </SvgFrame>
    </Figure>
  );
}

function ShaderScene({
  mode,
  lightAngle,
  shininess,
  environment,
  normalScale,
}: {
  mode: ShaderMode;
  lightAngle: number;
  shininess: number;
  environment: number;
  normalScale: number;
}) {
  const isEnvironment = mode === "environment mapping";
  const isDebug = mode === "debug";
  const highlight = round(0.2 + Math.max(0, Math.cos(lightAngle)) * 0.52);
  const lobeWidth = Math.max(12, round(48 - shininess * 0.26));
  const baseColor = isDebug
    ? COLORS.warning
    : isEnvironment
      ? COLORS.success
      : COLORS.accent;
  const normalEndX = round(230 + Math.cos(-1.2 + normalScale * 0.5) * 88);
  const normalEndY = round(190 + Math.sin(-1.2 + normalScale * 0.5) * 88);
  return (
    <svg
      viewBox="0 0 720 320"
      role="img"
      aria-label="着色器实验场景：法线、光线、Phong 高光与环境映射反馈"
      className="block h-auto w-full"
    >
      <rect width="720" height="320" rx="14" fill={COLORS.bg} />
      <text
        x="360"
        y="27"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={COLORS.text}
      >
        {mode}：片段输入与颜色反馈
      </text>
      <circle
        cx="230"
        cy="190"
        r="86"
        fill={baseColor}
        fillOpacity="0.2"
        stroke={baseColor}
        strokeWidth="4"
      />
      <ellipse
        cx={round(214 + lightAngle * 10)}
        cy={round(160 + lightAngle * 5)}
        rx={lobeWidth}
        ry={Math.max(10, round(lobeWidth * 0.64))}
        fill={COLORS.success}
        fillOpacity={highlight}
      />
      <Arrow
        x1={230}
        y1={190}
        x2={normalEndX}
        y2={normalEndY}
        color={COLORS.warning}
      />
      <Arrow x1={230} y1={190} x2={138} y2={118} color={COLORS.accent} />
      <text
        x={normalEndX + 5}
        y={normalEndY - 4}
        fontSize="13"
        fill={COLORS.warning}
      >
        n
      </text>
      <text x="108" y="112" fontSize="13" fill={COLORS.accent}>
        l
      </text>
      {isEnvironment ? (
        <path
          d="M230 190 Q292 140 344 96"
          fill="none"
          stroke={COLORS.success}
          strokeWidth="4"
          strokeDasharray="8 6"
        />
      ) : null}
      {isDebug ? (
        <>
          <rect
            x="178"
            y="76"
            width="104"
            height="34"
            rx="8"
            fill={COLORS.warning}
            fillOpacity="0.18"
            stroke={COLORS.warning}
            strokeWidth="2"
          />
          <text
            x="230"
            y="98"
            textAnchor="middle"
            fontSize="12"
            fill={COLORS.warning}
          >
            坐标空间检查
          </text>
        </>
      ) : null}
      <rect
        x="414"
        y="82"
        width="272"
        height="214"
        rx="16"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="550"
        y="118"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.text}
      >
        片段输出
      </text>
      <text
        x="550"
        y="158"
        textAnchor="middle"
        fontSize="14"
        fill={COLORS.accent}
      >
        diffuse {Math.max(0, Math.cos(lightAngle)).toFixed(2)}
      </text>
      <text
        x="550"
        y="192"
        textAnchor="middle"
        fontSize="14"
        fill={COLORS.success}
      >
        specular {highlight.toFixed(2)}
      </text>
      <text
        x="550"
        y="226"
        textAnchor="middle"
        fontSize="14"
        fill={COLORS.warning}
      >
        environment {environment.toFixed(2)}
      </text>
      <text
        x="550"
        y="264"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        shininess {shininess} · normal {normalScale.toFixed(2)}
      </text>
      <text
        x="360"
        y="304"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.warning}
      >
        {isDebug
          ? "先看法线与坐标空间，再改光照常数"
          : isEnvironment
            ? "反射向量决定环境纹理查询位置"
            : "Phong 分量共同决定片段颜色"}
      </text>
    </svg>
  );
}

export function Cgp33ShadersLab() {
  const [mode, setMode] = useState<ShaderMode>("phong shader");
  const [lightAngle, setLightAngle] = useState(0.2);
  const [shininess, setShininess] = useState(32);
  const [environment, setEnvironment] = useState(0.35);
  const [normalScale, setNormalScale] = useState(0.7);

  function reset() {
    setMode("phong shader");
    setLightAngle(0.2);
    setShininess(32);
    setEnvironment(0.35);
    setNormalScale(0.7);
  }

  const metrics = useMemo(() => {
    const diffuse = Math.max(0, Math.cos(lightAngle));
    const specular = Math.pow(Math.max(0, diffuse), Math.max(1, shininess / 8));
    const mismatch =
      mode === "debug" ? Math.abs(normalScale - 0.7) * 0.35 : 0.02;
    return { diffuse, specular, mismatch };
  }, [lightAngle, mode, normalScale, shininess]);

  return (
    <section
      aria-label="着色器专属实验"
      data-visual-kind="cgp-33-shaders"
      data-unit-id="cgp-33"
      className="not-prose my-6 rounded-card border border-border bg-elevated p-4 sm:p-5"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
            Cgp33 Lab
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            着色器专属实验
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-secondary">
            固定一个片段，切换 phong shader、environment mapping 和
            debug；观察法线、光线、高光与环境查询如何共同决定输出。
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          aria-label="重置着色器实验"
          className="min-h-11 rounded-control border border-border px-3 py-2 text-sm text-secondary hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </div>
      <div className="flex flex-wrap gap-2" aria-label="选择着色器模式">
        {(["phong shader", "environment mapping", "debug"] as const).map(
          (option) => (
            <button
              key={option}
              type="button"
              aria-pressed={mode === option}
              onClick={() => setMode(option)}
              className={
                "min-h-11 rounded-control border px-3 py-2 text-sm " +
                (mode === option
                  ? "border-accent bg-accent/10 font-semibold text-primary"
                  : "border-border text-secondary")
              }
            >
              {option}
            </button>
          ),
        )}
      </div>
      <div className="mt-4 grid gap-4 rounded-card border border-border bg-background p-4 md:grid-cols-2">
        <label className="flex min-w-40 flex-col gap-1 text-sm text-secondary">
          <span className="flex justify-between gap-3">
            <span>光源角度</span>
            <span className="font-mono text-primary">
              {lightAngle.toFixed(2)}
            </span>
          </span>
          <input
            type="range"
            min="-1.4"
            max="1.4"
            step="0.1"
            value={lightAngle}
            onChange={(event) => setLightAngle(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
        <label className="flex min-w-40 flex-col gap-1 text-sm text-secondary">
          <span className="flex justify-between gap-3">
            <span>shininess</span>
            <span className="font-mono text-primary">{shininess}</span>
          </span>
          <input
            type="range"
            min="4"
            max="96"
            step="4"
            value={shininess}
            onChange={(event) => setShininess(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
        <label className="flex min-w-40 flex-col gap-1 text-sm text-secondary">
          <span className="flex justify-between gap-3">
            <span>environment mix</span>
            <span className="font-mono text-primary">
              {environment.toFixed(2)}
            </span>
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={environment}
            onChange={(event) => setEnvironment(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
        <label className="flex min-w-40 flex-col gap-1 text-sm text-secondary">
          <span className="flex justify-between gap-3">
            <span>normal scale</span>
            <span className="font-mono text-primary">
              {normalScale.toFixed(2)}
            </span>
          </span>
          <input
            type="range"
            min="0.2"
            max="1.2"
            step="0.05"
            value={normalScale}
            onChange={(event) => setNormalScale(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
      </div>
      <div className="mt-4 min-w-0 overflow-hidden rounded-card border border-border bg-background p-3 sm:p-4">
        <ShaderScene
          mode={mode}
          lightAngle={lightAngle}
          shininess={shininess}
          environment={environment}
          normalScale={normalScale}
        />
      </div>
      <div
        className="mt-4 grid gap-3 sm:grid-cols-3"
        role="status"
        aria-live="polite"
      >
        <div className="rounded-card border border-border bg-background p-3">
          <p className="text-xs text-secondary">diffuse term</p>
          <p className="mt-1 font-mono text-lg text-primary">
            {metrics.diffuse.toFixed(3)}
          </p>
        </div>
        <div className="rounded-card border border-border bg-background p-3">
          <p className="text-xs text-secondary">specular term</p>
          <p className="mt-1 font-mono text-lg text-primary">
            {metrics.specular.toFixed(3)}
          </p>
        </div>
        <div className="rounded-card border border-border bg-background p-3">
          <p className="text-xs text-secondary">空间不一致提示</p>
          <p className="mt-1 font-mono text-lg text-primary">
            {metrics.mismatch.toFixed(3)}
          </p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-secondary">
        先预测：提高 shininess 会让高光更窄；提高 environment mix
        只应改变环境反射贡献，不应改变法线方向。
      </p>
    </section>
  );
}
