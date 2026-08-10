"use client";

import { useMemo, useState, type ReactNode } from "react";

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

function Frame({
  ariaLabel,
  caption,
  children,
}: {
  ariaLabel: string;
  caption: string;
  children: ReactNode;
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox="0 0 720 420"
          role="img"
          aria-label={ariaLabel}
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {children}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

function wavePath({
  x,
  y,
  width,
  amplitude,
  cycles,
  phase = 0,
}: {
  x: number;
  y: number;
  width: number;
  amplitude: number;
  cycles: number;
  phase?: number;
}) {
  const points = Array.from({ length: 80 }, (_, index) => {
    const t = index / 79;
    return `${x + t * width},${y - amplitude * Math.sin(t * cycles * Math.PI * 2 + phase)}`;
  });
  return `M ${points.join(" L ")}`;
}

export function GpuGemsCh01WaveSumDiagram() {
  return (
    <Frame
      ariaLabel="水面波叠加图：三条不同波长和相位的正弦波叠加成一条复杂水面高度函数，顶点层采样低频轮廓，纹理层承载更细波纹。"
      caption="一组物理有意义的周期波叠加，比一张静态噪声贴图更容易控制和扩展。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill={primary}
      >
        H(X,t)：从多条波到一张水面
      </text>
      <line x1="54" y1="112" x2="666" y2="112" stroke={border} />
      <line x1="54" y1="208" x2="666" y2="208" stroke={border} />
      <line x1="54" y1="306" x2="666" y2="306" stroke={border} />
      <text x="66" y="92" fontSize="13" fontWeight="700" fill={accent}>
        h₁：长波
      </text>
      <path
        d={wavePath({ x: 160, y: 112, width: 486, amplitude: 24, cycles: 1.5 })}
        fill="none"
        stroke={accent}
        strokeWidth="3"
      />
      <text x="66" y="188" fontSize="13" fontWeight="700" fill={warning}>
        h₂：中波
      </text>
      <path
        d={wavePath({
          x: 160,
          y: 208,
          width: 486,
          amplitude: 18,
          cycles: 3.2,
          phase: 0.5,
        })}
        fill="none"
        stroke={warning}
        strokeWidth="3"
      />
      <text x="66" y="286" fontSize="13" fontWeight="700" fill={success}>
        h₃：短波
      </text>
      <path
        d={wavePath({
          x: 160,
          y: 306,
          width: 486,
          amplitude: 12,
          cycles: 6.5,
          phase: 1.1,
        })}
        fill="none"
        stroke={success}
        strokeWidth="3"
      />
      <rect
        x="112"
        y="340"
        width="496"
        height="48"
        rx="12"
        fill={danger}
        fillOpacity="0.1"
        stroke={danger}
      />
      <text
        x="360"
        y="370"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={danger}
      >
        H = h₁ + h₂ + h₃ + …
      </text>
    </Frame>
  );
}

export function GpuGemsCh01SurfaceBasisDiagram() {
  return (
    <Frame
      ariaLabel="高度场法线图：表面P等于x、y、H，沿x和y方向的偏导得到双切线B和切线T，叉积并归一化得到法线N。"
      caption="高度场的两个偏导数直接提供切线空间基，避免为每个顶点用邻居做有限差分。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill={primary}
      >
        从 H(x,y,t) 直接构造法线
      </text>
      <path
        d="M 92 286 L 288 286 L 390 176 L 194 176 Z"
        fill={accent}
        fillOpacity="0.08"
        stroke={accent}
        strokeWidth="2"
      />
      <path
        d="M 194 176 L 390 176 L 470 116 L 274 116 Z"
        fill={success}
        fillOpacity="0.08"
        stroke={success}
        strokeWidth="2"
      />
      <line
        x1="194"
        y1="176"
        x2="274"
        y2="116"
        stroke={border}
        strokeDasharray="5 4"
      />
      <line
        x1="194"
        y1="176"
        x2="314"
        y2="176"
        stroke={warning}
        strokeWidth="3"
      />
      <line
        x1="194"
        y1="176"
        x2="254"
        y2="236"
        stroke={accent}
        strokeWidth="3"
      />
      <line
        x1="194"
        y1="176"
        x2="238"
        y2="82"
        stroke={danger}
        strokeWidth="3"
      />
      <text x="318" y="170" fontSize="14" fontWeight="700" fill={warning}>
        B = ∂P/∂x
      </text>
      <text x="256" y="254" fontSize="14" fontWeight="700" fill={accent}>
        T = ∂P/∂y
      </text>
      <text x="246" y="82" fontSize="14" fontWeight="700" fill={danger}>
        N = normalize(B×T)
      </text>
      <rect
        x="438"
        y="176"
        width="220"
        height="116"
        rx="14"
        fill={border}
        fillOpacity="0.18"
        stroke={border}
      />
      <text
        x="548"
        y="212"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={primary}
      >
        P(x,y)=(x,y,H)
      </text>
      <text x="548" y="244" textAnchor="middle" fontSize="14" fill={secondary}>
        Hx、Hy → 切线 → 法线
      </text>
      <text x="548" y="270" textAnchor="middle" fontSize="12" fill={secondary}>
        继续送入反射与光照
      </text>
    </Frame>
  );
}

export function GpuGemsCh01WaveLayerDiagram() {
  const stages = [
    ["几何层", "少量低频波", "改变轮廓与遮挡", accent],
    ["法线层", "多频率纹理波", "改变局部光照", warning],
    ["合成层", "环境反射 + 水色", "得到动态水面", success],
  ] as const;
  return (
    <Frame
      ariaLabel="水面分层图：低频几何波在顶点阶段改变轮廓，中频和高频纹理波在像素阶段生成动态法线，最后与环境反射和水色合成。"
      caption="几何负责看得见的轮廓，法线贴图负责网格以下的细节；分层让 GPU 预算可控。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill={primary}
      >
        一套模型，两个采样尺度
      </text>
      {stages.map(([title, detail, desc, color], index) => {
        const x = 42 + index * 226;
        return (
          <g key={`wave-layer-${title}`}>
            <rect
              x={x}
              y="102"
              width="178"
              height="158"
              rx="14"
              fill={color}
              fillOpacity="0.1"
              stroke={color}
              strokeWidth="1.5"
            />
            <text
              x={x + 89}
              y="142"
              textAnchor="middle"
              fontSize="16"
              fontWeight="700"
              fill={color}
            >
              {title}
            </text>
            <text
              x={x + 89}
              y="184"
              textAnchor="middle"
              fontSize="14"
              fill={primary}
            >
              {detail}
            </text>
            <text
              x={x + 89}
              y="222"
              textAnchor="middle"
              fontSize="12"
              fill={secondary}
            >
              {desc}
            </text>
            {index < stages.length - 1 ? (
              <line
                x1={x + 184}
                y1="181"
                x2={x + 218}
                y2="181"
                stroke={secondary}
                strokeWidth="2"
              />
            ) : null}
          </g>
        );
      })}
      <text
        x="360"
        y="320"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={primary}
      >
        顶点 shader：位置 / 基向量 像素 shader：法线 / 反射
      </text>
      <text x="360" y="352" textAnchor="middle" fontSize="13" fill={secondary}>
        细节不必全部付出几何顶点的代价
      </text>
    </Frame>
  );
}

export function GpuGemsCh01AuthoringDiagram() {
  return (
    <Frame
      ariaLabel="水面 authoring 图：每个顶点携带水底高度和局部网格边长，水深控制透明度和波幅，边长滤波关闭无法采样的短波，输出到几何波和纹理波两层。"
      caption="水深和网格边长不是隐藏的魔法数字，而是可解释、可调试的内容输入。"
    >
      <text
        x="360"
        y="30"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill={primary}
      >
        Authoring：让内容数据参与物理近似
      </text>
      <rect
        x="50"
        y="92"
        width="190"
        height="212"
        rx="14"
        fill={accent}
        fillOpacity="0.1"
        stroke={accent}
      />
      <text
        x="145"
        y="132"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={accent}
      >
        顶点输入
      </text>
      <text x="145" y="174" textAnchor="middle" fontSize="14" fill={primary}>
        水底高度
      </text>
      <text x="145" y="208" textAnchor="middle" fontSize="14" fill={primary}>
        局部边长
      </text>
      <text x="145" y="242" textAnchor="middle" fontSize="14" fill={primary}>
        颜色覆盖
      </text>
      <text x="145" y="278" textAnchor="middle" fontSize="12" fill={secondary}>
        纹理坐标 / 水面高度
      </text>
      <line
        x1="260"
        y1="190"
        x2="310"
        y2="190"
        stroke={secondary}
        strokeWidth="2"
      />
      <rect
        x="330"
        y="92"
        width="180"
        height="212"
        rx="14"
        fill={warning}
        fillOpacity="0.1"
        stroke={warning}
      />
      <text
        x="420"
        y="132"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={warning}
      >
        过滤与衰减
      </text>
      <text x="420" y="174" textAnchor="middle" fontSize="14" fill={primary}>
        水深 → 靠岸波幅
      </text>
      <text x="420" y="210" textAnchor="middle" fontSize="14" fill={primary}>
        边长 → 短波响应
      </text>
      <text x="420" y="246" textAnchor="middle" fontSize="14" fill={primary}>
        颜色 → 透明/反射
      </text>
      <line
        x1="530"
        y1="190"
        x2="580"
        y2="190"
        stroke={secondary}
        strokeWidth="2"
      />
      <rect
        x="590"
        y="116"
        width="92"
        height="148"
        rx="14"
        fill={success}
        fillOpacity="0.1"
        stroke={success}
      />
      <text
        x="636"
        y="154"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={success}
      >
        GPU
      </text>
      <text x="636" y="188" textAnchor="middle" fontSize="12" fill={primary}>
        顶点
      </text>
      <text x="636" y="216" textAnchor="middle" fontSize="12" fill={primary}>
        像素
      </text>
      <text x="636" y="244" textAnchor="middle" fontSize="12" fill={secondary}>
        合成
      </text>
    </Frame>
  );
}

export function GpuGemsCh01WaterLab() {
  const [wavelength, setWavelength] = useState(4);
  const [amplitude, setAmplitude] = useState(0.2);
  const [speed, setSpeed] = useState(1);
  const path = useMemo(
    () =>
      wavePath({
        x: 36,
        y: 132,
        width: 438,
        amplitude: 22 + amplitude * 55,
        cycles: 8 / wavelength,
        phase: speed * 0.7,
      }),
    [amplitude, speed, wavelength],
  );
  const steepness = amplitude / wavelength;
  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-5"
      aria-label="水面波参数实验：调整波长、振幅和速度，观察单条波的形状与陡峭度"
    >
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-secondary">
            Water Wave Lab
          </p>
          <h4 className="mt-1 text-[15px] font-semibold text-primary">
            先调一条波，再理解参数耦合
          </h4>
        </div>
        <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">
          可交互
        </span>
      </div>
      <div className="grid gap-5 md:grid-cols-[1fr_230px] md:items-center">
        <svg
          viewBox="0 0 510 250"
          role="img"
          aria-label={`当前波长${wavelength.toFixed(1)}、振幅${amplitude.toFixed(2)}、速度${speed.toFixed(1)}，振幅与波长比为${steepness.toFixed(3)}。`}
          className="w-full"
        >
          <line x1="36" y1="132" x2="474" y2="132" stroke={border} />
          <path d={path} fill="none" stroke={accent} strokeWidth="4" />
          <line
            x1="36"
            y1="204"
            x2="474"
            y2="204"
            stroke={border}
            strokeDasharray="4 4"
          />
          <text
            x="255"
            y="44"
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fill={primary}
          >
            H(x,t) = A sin(ωx − St)
          </text>
          <text
            x="255"
            y="230"
            textAnchor="middle"
            fontSize="13"
            fill={secondary}
          >
            振幅/波长 = {steepness.toFixed(3)}：越大，波峰越陡
          </text>
        </svg>
        <div className="space-y-3">
          <label
            className="block text-sm text-primary"
            htmlFor="water-wavelength"
          >
            波长 L：{wavelength.toFixed(1)}
          </label>
          <input
            id="water-wavelength"
            className="min-h-[44px] w-full accent-accent"
            type="range"
            min="2"
            max="8"
            step="0.5"
            value={wavelength}
            onChange={(event) => setWavelength(Number(event.target.value))}
            aria-label="调整波长"
          />
          <label
            className="block text-sm text-primary"
            htmlFor="water-amplitude"
          >
            振幅 A：{amplitude.toFixed(2)}
          </label>
          <input
            id="water-amplitude"
            className="min-h-[44px] w-full accent-accent"
            type="range"
            min="0.05"
            max="0.6"
            step="0.05"
            value={amplitude}
            onChange={(event) => setAmplitude(Number(event.target.value))}
            aria-label="调整振幅"
          />
          <label className="block text-sm text-primary" htmlFor="water-speed">
            速度 S：{speed.toFixed(1)}
          </label>
          <input
            id="water-speed"
            className="min-h-[44px] w-full accent-accent"
            type="range"
            min="0"
            max="3"
            step="0.5"
            value={speed}
            onChange={(event) => setSpeed(Number(event.target.value))}
            aria-label="调整波速"
          />
          <button
            type="button"
            className="min-h-[44px] rounded-control border border-border px-3 py-2 text-sm text-primary transition hover:border-accent hover:text-accent"
            onClick={() => {
              setWavelength(4);
              setAmplitude(0.2);
              setSpeed(1);
            }}
          >
            重置实验
          </button>
        </div>
      </div>
    </section>
  );
}
