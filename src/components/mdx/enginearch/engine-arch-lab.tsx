"use client";

import { useMemo, useState } from "react";

import { easeInOut } from "../gamemath/animotor";

type EngineArchMode =
  | "intro"
  | "tools"
  | "software"
  | "parallel"
  | "math"
  | "support"
  | "resources"
  | "loop"
  | "hid"
  | "debug"
  | "rendering"
  | "animation"
  | "physics"
  | "audio"
  | "gameplay"
  | "runtime"
  | "more";

type EngineArchLabProps = {
  mode?: EngineArchMode;
  title?: string;
};

const MODE_LABELS: Record<EngineArchMode, string> = {
  intro: "引擎总览",
  tools: "工具链",
  software: "软件分层",
  parallel: "并行任务",
  math: "数学地基",
  support: "支撑系统",
  resources: "资源管线",
  loop: "主循环",
  hid: "输入设备",
  debug: "调试工具",
  rendering: "渲染引擎",
  animation: "动画系统",
  physics: "碰撞物理",
  audio: "音频系统",
  gameplay: "玩法系统",
  runtime: "运行时玩法",
  more: "扩展地图",
};

const MODE_NODES: Record<EngineArchMode, string[]> = {
  intro: ["平台", "核心", "渲染", "玩法", "工具"],
  tools: ["IDE", "编译", "资产工具", "构建", "包体"],
  software: ["模块", "接口", "内存", "错误", "测试"],
  parallel: ["主线程", "任务图", "Worker", "同步", "帧边界"],
  math: ["向量", "矩阵", "空间", "曲线", "调试线"],
  support: ["日志", "内存", "容器", "时间", "配置"],
  resources: ["源资产", "导入", "Cook", "包", "运行时缓存"],
  loop: ["输入", "模拟", "动画", "渲染", "提交"],
  hid: ["设备", "事件", "映射", "动作", "反馈"],
  debug: ["断点", "Profile", "可视化", "回放", "自动化"],
  rendering: ["场景", "可见性", "材质", "Render Graph", "GPU"],
  animation: ["Clip", "状态机", "Blend", "骨骼", "Pose"],
  physics: ["Shape", "Broadphase", "Narrowphase", "Solver", "Transform"],
  audio: ["资源", "声源", "混音", "空间化", "输出"],
  gameplay: ["对象", "组件", "脚本", "事件", "存档"],
  runtime: ["关卡", "任务", "AI", "网络", "热更新"],
  more: ["平台", "编辑器", "服务", "多人", "生产"],
};

export function EngineArchLab({
  mode = "intro",
  title = MODE_LABELS[mode],
}: EngineArchLabProps) {
  const [progress, setProgress] = useState(0.62);
  const [load, setLoad] = useState(0.48);
  const [scale, setScale] = useState(1);
  const nodes = MODE_NODES[mode];
  const eased = easeInOut(progress);
  const active = Math.min(nodes.length - 1, Math.floor(eased * nodes.length));
  const layout = useMemo(
    () =>
      nodes.map((label, i) => {
        const angle = (-120 + (240 / Math.max(1, nodes.length - 1)) * i) * (Math.PI / 180);
        const radius = 78 * scale;
        return {
          label,
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius + 12,
        };
      }),
    [nodes, scale],
  );

  return (
    <section className="not-prose my-6 rounded-card border border-border bg-elevated p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">Engine Architecture Lab</p>
          <h4 className="text-base font-semibold text-primary">{title}</h4>
        </div>
        <button
          type="button"
          onClick={() => {
            setProgress(0.62);
            setLoad(0.48);
            setScale(1);
          }}
          className="rounded-control border border-border px-2 py-1 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
        >
          重置
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_15rem]">
        <svg
          viewBox="-180 -125 360 250"
          role="img"
          aria-label={`${title} 交互式架构图`}
          className="aspect-[3/2] w-full rounded-card border border-border bg-bg"
        >
          <defs>
            <marker id="gea3-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0 0 8 4 0 8Z" className="fill-accent" />
            </marker>
          </defs>

          <EngineGrid />
          <rect x="-52" y="-22" width="104" height="44" rx="10" className="fill-accent-glow stroke-accent" />
          <text x="0" y="-2" textAnchor="middle" className="fill-primary text-[12px]">
            {mode === "loop" ? "Frame N" : "Engine Core"}
          </text>
          <text x="0" y="14" textAnchor="middle" className="fill-secondary text-[10px]">
            load {Math.round(load * 100)}%
          </text>

          {layout.map((node, i) => (
            <g key={node.label}>
              <line
                x1="0"
                y1="0"
                x2={node.x}
                y2={node.y}
                className={i <= active ? "stroke-accent" : "stroke-border"}
                strokeWidth={i <= active ? 3 : 1.5}
                markerEnd={i <= active ? "url(#gea3-arrow)" : undefined}
              />
              <rect
                x={node.x - 34}
                y={node.y - 17}
                width="68"
                height="34"
                rx="7"
                className={i <= active ? "fill-accent-glow stroke-accent" : "fill-elevated stroke-border"}
              />
              <text x={node.x} y={node.y + 4} textAnchor="middle" className="fill-primary text-[10.5px]">
                {node.label}
              </text>
            </g>
          ))}

          <path
            d={`M -142 96 C -80 ${80 - load * 70}, -20 ${120 - load * 120}, 142 ${92 - load * 65}`}
            className="fill-none stroke-warning"
            strokeWidth="3"
          />
          <text x="-142" y="-96" className="fill-secondary text-[11px]">
            拖动参数，看模块如何在同一帧预算内协作
          </text>
        </svg>

        <div className="flex flex-col justify-center gap-4">
          <Control label="流程" value={progress} min={0} max={1} step={0.01} format={(v) => `${Math.round(v * 100)}%`} onChange={setProgress} />
          <Control label="压力" value={load} min={0} max={1} step={0.01} format={(v) => `${Math.round(v * 100)}%`} onChange={setLoad} />
          <Control label="展开" value={scale} min={0.72} max={1.28} step={0.01} format={(v) => `${v.toFixed(2)}x`} onChange={setScale} />
          <p className="text-xs leading-5 text-secondary">
            这不是静态架构图。把流程向前拖，观察模块何时被激活；把压力调高，想象帧预算、线程同步和资源加载会怎样压到系统边界。
          </p>
        </div>
      </div>
    </section>
  );
}

function Control({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (value: number) => string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-1 text-xs text-secondary">
      <span className="flex items-center justify-between gap-2">
        {label}
        <span className="font-mono text-primary">{format(value)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mdx-range h-1 w-full cursor-pointer appearance-none rounded-control bg-border accent-accent"
      />
    </label>
  );
}

function EngineGrid() {
  return (
    <g>
      {[-120, -80, -40, 0, 40, 80, 120].map((x) => (
        <line key={`v-${x}`} x1={x} y1="-100" x2={x} y2="100" className="stroke-border" strokeWidth="1" />
      ))}
      {[-80, -40, 0, 40, 80].map((y) => (
        <line key={`h-${y}`} x1="-145" y1={y} x2="145" y2={y} className="stroke-border" strokeWidth="1" />
      ))}
    </g>
  );
}

