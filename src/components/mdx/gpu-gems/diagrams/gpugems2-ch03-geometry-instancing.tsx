"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const surface = "var(--surface)";

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
          viewBox="0 0 720 390"
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

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color = accent,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
}) {
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={2.5} />
      <path
        d={`M ${x2 - 8} ${y2 - 5} L ${x2} ${y2} L ${x2 - 8} ${y2 + 5}`}
        fill="none"
        stroke={color}
        strokeWidth={2.5}
      />
    </>
  );
}

export function GpuGems2Ch03PacketInstanceDiagram() {
  return (
    <Frame
      ariaLabel="GeometryPacket 与 InstanceAttributes 分离：一个静态几何包由多个实例属性驱动"
      caption="把不变的三角形拓扑和每棵树、每名士兵各自的变换属性拆开，才有复用几何的空间。"
    >
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>
        GeometryInstance = GeometryPacket + InstanceAttributes
      </text>
      <g transform="translate(46 92)">
        <rect width={238} height={188} rx={18} fill={surface} stroke={accent} strokeWidth={2} />
        <text x={119} y={32} textAnchor="middle" fontSize={15} fontWeight={700} fill={accent}>
          GeometryPacket
        </text>
        <path d="M 84 140 L 120 68 L 160 140 Z" fill={accent} fillOpacity={0.24} stroke={accent} strokeWidth={3} />
        <text x={119} y={168} textAnchor="middle" fontSize={12} fill={secondary}>
          顶点、索引、材质
        </text>
        <text x={119} y={186} textAnchor="middle" fontSize={11} fill={secondary}>
          一批实例共享
        </text>
      </g>
      <Arrow x1={304} y1={186} x2={356} y2={186} />
      <g transform="translate(372 92)">
        <rect width={298} height={188} rx={18} fill={surface} stroke={success} strokeWidth={2} />
        <text x={149} y={32} textAnchor="middle" fontSize={15} fontWeight={700} fill={success}>
          InstanceAttributes
        </text>
        {[
          ["T0", "位置 + 旋转"],
          ["T1", "位置 + 旋转"],
          ["T2", "位置 + 旋转"],
          ["…", "每个实例不同"],
        ].map(([id, label], index) => (
          <g key={id} transform={`translate(28 ${54 + index * 30})`}>
            <rect width={242} height={22} rx={6} fill={success} fillOpacity={index === 3 ? 0.12 : 0.07} />
            <text x={12} y={16} fontSize={12} fontWeight={700} fill={success}>{id}</text>
            <text x={52} y={16} fontSize={12} fill={secondary}>{label}</text>
          </g>
        ))}
      </g>
      <text x={360} y={334} textAnchor="middle" fontSize={13} fill={secondary}>
        GPU 只需重复读取同一几何包，再为每个实例应用不同属性
      </text>
    </Frame>
  );
}

export function GpuGems2Ch03BatchStrategiesDiagram() {
  const rows = [
    ["Static batching", "预先合并", "低", "低", success],
    ["Dynamic batching", "每帧流式", "高", "高", danger],
    ["Vertex constants", "常量寄存器", "中", "受容量限", warning],
    ["Geometry Instancing API", "双 stream", "低", "低", accent],
  ] as const;
  return (
    <Frame
      ariaLabel="四种 geometry instancing 策略的灵活性、CPU 代价和实例属性来源对比"
      caption="四种策略不是谁永远更快：静态程度、动画需求和实例数量决定可接受的更新路径。"
    >
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>
        四种 batching 策略：把更新责任放在哪里？
      </text>
      <g transform="translate(40 68)">
        <text x={14} y={18} fontSize={12} fontWeight={700} fill={secondary}>策略</text>
        <text x={196} y={18} fontSize={12} fontWeight={700} fill={secondary}>实例数据</text>
        <text x={372} y={18} fontSize={12} fontWeight={700} fill={secondary}>CPU 更新</text>
        <text x={490} y={18} fontSize={12} fontWeight={700} fill={secondary}>灵活性</text>
        {rows.map(([name, data, cpu, flexibility, color], index) => (
          <g key={name} transform={`translate(0 ${36 + index * 52})`}>
            <rect width={638} height={40} rx={9} fill={surface} stroke={border} />
            <rect width={8} height={40} rx={4} fill={color} />
            <text x={20} y={25} fontSize={13} fontWeight={700} fill={color}>{name}</text>
            <text x={196} y={25} fontSize={12} fill={secondary}>{data}</text>
            <text x={372} y={25} fontSize={12} fill={secondary}>{cpu}</text>
            <text x={490} y={25} fontSize={12} fill={secondary}>{flexibility}</text>
          </g>
        ))}
      </g>
      <text x={360} y={344} textAnchor="middle" fontSize={13} fill={secondary}>
        选择标准：实例是否静态、是否要 skinning、是否超出常量容量
      </text>
    </Frame>
  );
}

export function GpuGems2Ch03StreamFrequencyDiagram() {
  return (
    <Frame
      ariaLabel="Geometry Instancing API 使用静态几何 stream 与动态实例属性 stream，GPU 通过 stream frequency 复用顶点"
      caption="静态 stream 只上传一次，实例 stream 每个实例提供一次属性；GPU 将两者组合成许多副本。"
    >
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>
        Geometry Instancing API：两个更新频率不同的 stream
      </text>
      <g transform="translate(46 84)">
        <rect width={246} height={106} rx={16} fill={surface} stroke={accent} strokeWidth={2} />
        <text x={123} y={30} textAnchor="middle" fontSize={14} fontWeight={700} fill={accent}>Stream 0</text>
        <text x={123} y={58} textAnchor="middle" fontSize={12} fill={secondary}>GeometryPacket</text>
        <text x={123} y={82} textAnchor="middle" fontSize={11} fill={secondary}>顶点频率：每个实例复用</text>
      </g>
      <g transform="translate(46 218)">
        <rect width={246} height={106} rx={16} fill={surface} stroke={success} strokeWidth={2} />
        <text x={123} y={30} textAnchor="middle" fontSize={14} fontWeight={700} fill={success}>Stream 1</text>
        <text x={123} y={58} textAnchor="middle" fontSize={12} fill={secondary}>InstanceAttributes</text>
        <text x={123} y={82} textAnchor="middle" fontSize={11} fill={secondary}>属性频率：每个实例一次</text>
      </g>
      <Arrow x1={304} y1={136} x2={362} y2={174} />
      <Arrow x1={304} y1={270} x2={362} y2={232} color={success} />
      <g transform="translate(382 94)">
        <rect width={282} height={220} rx={18} fill={surface} stroke={warning} strokeWidth={2} />
        <text x={141} y={34} textAnchor="middle" fontSize={15} fontWeight={700} fill={warning}>GPU instance expansion</text>
        {[0, 1, 2, 3].map((index) => (
          <g key={index} transform={`translate(${32 + (index % 2) * 116} ${62 + Math.floor(index / 2) * 72})`}>
            <path d="M 10 42 L 32 6 L 54 42 Z" fill={index % 2 ? success : accent} fillOpacity={0.22} stroke={index % 2 ? success : accent} strokeWidth={2} />
            <text x={32} y={62} textAnchor="middle" fontSize={11} fill={secondary}>instance {index + 1}</text>
          </g>
        ))}
        <text x={141} y={202} textAnchor="middle" fontSize={12} fill={secondary}>同一拓扑 + 不同变换</text>
      </g>
    </Frame>
  );
}

export function GpuGems2Ch03DecisionMatrixDiagram() {
  const scenarios = [
    ["室内静态装饰", "Static batching", success],
    ["大量行走士兵", "Dynamic batching", danger],
    ["少量可控实例", "Vertex constants", warning],
    ["植被 / 树木 / 粒子", "Geometry Instancing API", accent],
  ] as const;
  return (
    <Frame
      ariaLabel="场景到 geometry instancing 策略的选择矩阵"
      caption="先判断几何是否相同、实例是否会动，再决定是合并、流式、常量还是专用实例化 API。"
    >
      <text x={36} y={34} fontSize={14} fontWeight={700} fill={primary}>
        场景选择：相同几何只是起点
      </text>
      <g transform="translate(56 72)">
        {scenarios.map(([scenario, strategy, color], index) => (
          <g key={scenario} transform={`translate(0 ${index * 62})`}>
            <rect width={608} height={46} rx={11} fill={surface} stroke={border} />
            <circle cx={28} cy={23} r={9} fill={color} fillOpacity={0.2} stroke={color} strokeWidth={2} />
            <text x={54} y={29} fontSize={13} fontWeight={700} fill={primary}>{scenario}</text>
            <Arrow x1={254} y1={23} x2={318} y2={23} color={color} />
            <text x={344} y={29} fontSize={13} fontWeight={700} fill={color}>{strategy}</text>
          </g>
        ))}
      </g>
      <rect x={92} y={342} width={536} height={28} rx={8} fill={accent} fillOpacity={0.1} />
      <text x={360} y={361} textAnchor="middle" fontSize={12} fill={secondary}>
        关键约束：同一 GeometryPacket；不同网格不能靠实例属性“变成同一个网格”
      </text>
    </Frame>
  );
}

type Strategy = "static" | "dynamic" | "constants" | "api";

const strategyCopy: Record<Strategy, { label: string; upload: string; draw: string; note: string; color: string }> = {
  static: { label: "Static batching", upload: "预先合并", draw: "一组几何", note: "最适合完全不动的重复物体", color: success },
  dynamic: { label: "Dynamic batching", upload: "每帧流式", draw: "一组几何", note: "灵活，但 CPU 与带宽压力最大", color: danger },
  constants: { label: "Vertex constants", upload: "常量寄存器", draw: "受容量限制", note: "适合实例少、shader 可控的场景", color: warning },
  api: { label: "Geometry Instancing API", upload: "实例 stream", draw: "一组几何", note: "相同拓扑的大量实例优先考虑", color: accent },
};

export function GpuGems2Ch03GeometryInstancingLab() {
  const [strategy, setStrategy] = useState<Strategy>("api");
  const [instances, setInstances] = useState(12);
  const [animated, setAnimated] = useState(true);
  const current = strategyCopy[strategy];
  const positions = useMemo(
    () => Array.from({ length: 24 }, (_, index) => ({
      x: 38 + (index % 8) * 61,
      y: 74 + Math.floor(index / 8) * 66,
      rotate: animated ? (index % 3) * 5 - 5 : 0,
    })),
    [animated],
  );

  function reset() {
    setStrategy("api");
    setInstances(12);
    setAnimated(true);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated"
      aria-label="GPU Gems 2 Chapter 3 geometry instancing 实验：切换 batching 策略、实例数量和动画状态"
      data-visual-kind="gpu-gems2-ch03-geometry-instancing"
    >
      <div className="border-b border-border px-5 py-4">
        <p className="text-sm font-semibold text-primary">Geometry instancing 实验</p>
        <p className="mt-1 text-sm text-secondary">同一组几何包保持不变，只改变实例属性的更新方式。</p>
      </div>
      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_230px]">
        <div className="overflow-hidden rounded-card border border-border bg-[var(--bg)] p-3">
          <svg viewBox="0 0 540 330" role="img" aria-label="多个实例共享一个三角形几何包的预览" className="block h-auto w-full">
            <rect x={18} y={18} width={504} height={254} rx={16} fill={surface} stroke={border} />
            {positions.slice(0, instances).map((item, index) => (
              <g key={index} transform={`translate(${item.x} ${item.y}) rotate(${item.rotate})`}>
                <path d="M 0 30 L 20 -12 L 40 30 Z" fill={current.color} fillOpacity={0.18} stroke={current.color} strokeWidth={2} />
                <circle cx={20} cy={34} r={3} fill={current.color} />
              </g>
            ))}
            <text x={270} y={304} textAnchor="middle" fontSize={12} fill={secondary}>
              {instances} 个实例 · {animated ? "实例属性随帧变化" : "实例属性保持静态"}
            </text>
          </svg>
        </div>
        <div className="space-y-4">
          <label className="block text-sm text-secondary">
            更新策略
            <select className="mt-2 block h-11 w-full rounded-md border border-border bg-[var(--bg)] px-3 text-sm text-primary" value={strategy} onChange={(event) => setStrategy(event.target.value as Strategy)}>
              <option value="static">Static batching</option>
              <option value="dynamic">Dynamic batching</option>
              <option value="constants">Vertex constants</option>
              <option value="api">Geometry Instancing API</option>
            </select>
          </label>
          <label className="block text-sm text-secondary">
            实例数量：{instances}
            <input className="mt-2 block h-11 w-full accent-[var(--accent)]" type="range" min="4" max="24" step="4" value={instances} onChange={(event) => setInstances(Number(event.target.value))} />
          </label>
          <label className="flex min-h-11 items-center gap-2 text-sm text-secondary">
            <input type="checkbox" checked={animated} onChange={(event) => setAnimated(event.target.checked)} />
            让实例属性随帧变化
          </label>
          <div className="rounded-md border border-border bg-[var(--bg)] p-3 text-xs leading-5 text-secondary" aria-live="polite">
            <p className="font-semibold" style={{ color: current.color }}>{current.label}</p>
            <p>数据路径：{current.upload}</p>
            <p>绘制组织：{current.draw}</p>
            <p className="mt-1">{animated ? current.note : "关闭动画后，静态数据可以更积极地缓存。"}</p>
          </div>
          <button type="button" className="min-h-11 w-full rounded-md border border-border px-3 py-2 text-sm font-semibold text-primary transition hover:border-[var(--accent)]" onClick={reset}>
            重置
          </button>
        </div>
      </div>
    </section>
  );
}
