"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "@/components/mdx/anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";

const C = {
  accent: "var(--accent)",
  bg: "var(--bg)",
  border: "var(--border)",
  danger: "var(--danger)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  surface: "var(--surface)",
  text: "var(--text-primary)",
  warning: "var(--warning)",
} as const;

const T = TEACHING_BEAT_MS;

function Figure({ children }: { children: ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        {children}
      </div>
    </figure>
  );
}

function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg
      viewBox="0 0 760 440"
      role="img"
      aria-label={label}
      className="mx-auto block h-auto w-full max-w-[760px]"
    >
      <rect width="760" height="440" rx="16" fill={C.bg} />
      {children}
    </svg>
  );
}

function Arrow({
  color = C.accent,
  dashed = false,
  x1,
  x2,
  y1,
  y2,
}: {
  color?: string;
  dashed?: boolean;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 8;
  const left = `${x2 - size * Math.cos(angle - Math.PI / 6)},${y2 - size * Math.sin(angle - Math.PI / 6)}`;
  const right = `${x2 - size * Math.cos(angle + Math.PI / 6)},${y2 - size * Math.sin(angle + Math.PI / 6)}`;
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth="3"
        strokeDasharray={dashed ? "7 6" : undefined}
      />
      <polygon points={`${x2},${y2} ${left} ${right}`} fill={color} />
    </g>
  );
}

function Metric({
  label,
  tone = C.accent,
  value,
}: {
  label: string;
  tone?: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border py-2 last:border-b-0">
      <span className="text-sm text-secondary">{label}</span>
      <span className="font-mono text-sm font-semibold" style={{ color: tone }}>
        {value}
      </span>
    </div>
  );
}

const TIMELINE_STEPS: readonly TeachingStep[] = [
  { label: "same", caption: "同一组 fragment 走同一条路径" },
  { label: "split", caption: "条件分裂：一组 lane 不能同时执行两条指令" },
  { label: "predicate", caption: "predication：两边都算，只有一边写回" },
  { label: "mask", caption: "把稳定条件预计算成 mask，提前跳过工作" },
  {
    label: "query",
    caption: "occlusion query 把剩余元素数交给 CPU 决定是否继续",
  },
];

const TIMELINE_LABELS: Record<string, string> = Object.fromEntries(
  TIMELINE_STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function GpuGems2Ch34FlowControlTimelineDiagram() {
  const sameRef = useRef<SVGGElement>(null);
  const splitRef = useRef<SVGGElement>(null);
  const predicateRef = useRef<SVGGElement>(null);
  const maskRef = useRef<SVGGElement>(null);
  const queryRef = useRef<SVGGElement>(null);

  const timeline = useTeachingTimeline({
    steps: TIMELINE_STEPS,
    build: (tl) => {
      tl.add(sameRef.current!, { opacity: [0.5, 1], duration: T * 0.5 }, 0);
      tl.label("same", 0);
      tl.add(splitRef.current!, { opacity: [0.5, 1], duration: T * 0.5 }, T);
      tl.label("split", T);
      tl.add(
        predicateRef.current!,
        { opacity: [0.5, 1], duration: T * 0.5 },
        T * 2,
      );
      tl.label("predicate", T * 2);
      tl.add(maskRef.current!, { opacity: [0.5, 1], duration: T * 0.5 }, T * 3);
      tl.label("mask", T * 3);
      tl.add(
        queryRef.current!,
        { opacity: [0.5, 1], duration: T * 0.5 },
        T * 4,
      );
      tl.label("query", T * 4);
    },
  });

  return (
    <Figure>
      <svg
        viewBox="0 0 760 440"
        role="img"
        aria-label="GPU flow-control 教学时间线：从同一路径开始，展示 SIMD 分歧、predication、预计算 mask 与 occlusion query 如何逐级处理分支。可播放、暂停、单步和拖动。"
        className="mx-auto block h-auto w-full max-w-[760px]"
      >
        <rect width="760" height="440" rx="16" fill={C.bg} />
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          一条分支的五种命运：先看 lane 是否同路
        </text>
        <text
          x="380"
          y="57"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          动画按原章顺序把“执行”“跳过”和“继续”拆成可观察的状态
        </text>

        <g ref={sameRef} style={{ opacity: 0.5 }}>
          <rect
            x="44"
            y="88"
            width="672"
            height="48"
            rx="10"
            fill={C.accent}
            fillOpacity="0.14"
            stroke={C.accent}
          />
          <text x="62" y="117" fontSize="13" fontWeight="700" fill={C.accent}>
            ① 同一路径
          </text>
          {Array.from({ length: 8 }, (_, index) => (
            <rect
              key={`same-${index}`}
              x={178 + index * 58}
              y="101"
              width="40"
              height="22"
              rx="5"
              fill={C.accent}
              fillOpacity="0.28"
            />
          ))}
          <text
            x="650"
            y="117"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            coherent
          </text>
        </g>

        <g ref={splitRef} style={{ opacity: 0.5 }}>
          <rect
            x="44"
            y="151"
            width="672"
            height="62"
            rx="10"
            fill={C.warning}
            fillOpacity="0.12"
            stroke={C.warning}
          />
          <text x="62" y="179" fontSize="13" fontWeight="700" fill={C.warning}>
            ② 路径分裂
          </text>
          {Array.from({ length: 8 }, (_, index) => (
            <rect
              key={`split-${index}`}
              x={178 + index * 58}
              y="165"
              width="40"
              height="22"
              rx="5"
              fill={index % 2 ? C.danger : C.success}
              fillOpacity="0.28"
              stroke={index % 2 ? C.danger : C.success}
            />
          ))}
          <text
            x="650"
            y="179"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            两条 branch 不能并发
          </text>
        </g>

        <g ref={predicateRef} style={{ opacity: 0.5 }}>
          <rect
            x="44"
            y="228"
            width="672"
            height="48"
            rx="10"
            fill={C.danger}
            fillOpacity="0.1"
            stroke={C.danger}
          />
          <text x="62" y="257" fontSize="13" fontWeight="700" fill={C.danger}>
            ③ predication
          </text>
          <rect
            x="178"
            y="241"
            width="170"
            height="22"
            rx="5"
            fill={C.danger}
            fillOpacity="0.26"
          />
          <rect
            x="360"
            y="241"
            width="170"
            height="22"
            rx="5"
            fill={C.secondary}
            fillOpacity="0.22"
          />
          <text
            x="650"
            y="257"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            两边都算，只有一边写
          </text>
        </g>

        <g ref={maskRef} style={{ opacity: 0.5 }}>
          <rect
            x="44"
            y="291"
            width="672"
            height="48"
            rx="10"
            fill={C.success}
            fillOpacity="0.11"
            stroke={C.success}
          />
          <text x="62" y="320" fontSize="13" fontWeight="700" fill={C.success}>
            ④ 预计算 mask
          </text>
          <rect
            x="178"
            y="304"
            width="170"
            height="22"
            rx="5"
            fill={C.success}
            fillOpacity="0.28"
          />
          <rect
            x="360"
            y="304"
            width="170"
            height="22"
            rx="5"
            fill={C.border}
            fillOpacity="0.32"
          />
          <text
            x="650"
            y="320"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            先算稳定条件，再复用
          </text>
        </g>

        <g ref={queryRef} style={{ opacity: 0.5 }}>
          <rect
            x="44"
            y="354"
            width="672"
            height="48"
            rx="10"
            fill={C.accent}
            fillOpacity="0.11"
            stroke={C.accent}
          />
          <text x="62" y="383" fontSize="13" fontWeight="700" fill={C.accent}>
            ⑤ query 计数
          </text>
          <rect
            x="178"
            y="367"
            width="170"
            height="22"
            rx="5"
            fill={C.accent}
            fillOpacity="0.28"
          />
          <Arrow x1={365} y1={378} x2={492} y2={378} color={C.accent} />
          <text
            x="592"
            y="383"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            还有未终止元素？继续
          </text>
        </g>
      </svg>
      <TimelineControls
        timeline={timeline}
        labelText={TIMELINE_LABELS}
        caption="分支不是禁用项；真正要问的是一组并行元素是否保持空间一致，以及能否把决定提前。"
      />
    </Figure>
  );
}

export function GpuGems2Ch34BranchCoherenceDiagram() {
  const cells = Array.from({ length: 32 }, (_, index) => index);
  return (
    <Figure>
      <Frame label="空间一致性对比图：规则矩形区域中的分支条件让相邻 fragment 走相同路径，随机条件让相邻 fragment 交替走两条路径，后者会降低 SIMD 效率">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          branch cost 取决于邻居是否同路
        </text>
        <text x="42" y="82" fontSize="14" fontWeight="700" fill={C.success}>
          high spatial locality · 可成块跳过
        </text>
        <text x="410" y="82" fontSize="14" fontWeight="700" fill={C.danger}>
          random condition · lane 互相等待
        </text>
        <g>
          {cells.map((cell) => {
            const row = Math.floor(cell / 8);
            const col = cell % 8;
            return (
              <rect
                key={`coherent-${cell}`}
                x={42 + col * 34}
                y={105 + row * 34}
                width="28"
                height="28"
                rx="5"
                fill={col < 4 ? C.success : C.border}
                fillOpacity={col < 4 ? 0.35 : 0.42}
                stroke={col < 4 ? C.success : C.border}
              />
            );
          })}
        </g>
        <g>
          {cells.map((cell) => {
            const row = Math.floor(cell / 8);
            const col = cell % 8;
            const active = (row * 3 + col) % 2 === 0;
            return (
              <rect
                key={`random-${cell}`}
                x={410 + col * 34}
                y={105 + row * 34}
                width="28"
                height="28"
                rx="5"
                fill={active ? C.danger : C.warning}
                fillOpacity="0.34"
                stroke={active ? C.danger : C.warning}
              />
            );
          })}
        </g>
        <rect
          x="42"
          y="270"
          width="318"
          height="92"
          rx="12"
          fill={C.surface}
          stroke={C.success}
        />
        <text
          x="201"
          y="299"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={C.success}
        >
          同一组 lane 大多同路
        </text>
        <text
          x="201"
          y="326"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          branch instruction 或 z-cull 都有机会跳过整块工作
        </text>
        <text
          x="201"
          y="348"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          条件稳定且有空间局部性
        </text>
        <rect
          x="410"
          y="270"
          width="318"
          height="92"
          rx="12"
          fill={C.surface}
          stroke={C.danger}
        />
        <text
          x="569"
          y="299"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={C.danger}
        >
          同一组 lane 交替分裂
        </text>
        <text
          x="569"
          y="326"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          两条路径都可能执行，成本接近两边相加
        </text>
        <text
          x="569"
          y="348"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          先考虑整理数据或预计算 mask
        </text>
        <text
          x="380"
          y="408"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          不是“有 if 就慢”，而是“相邻元素走不同路时难以保持并行”
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch34PredicateChoiceDiagram() {
  return (
    <Figure>
      <Frame label="GPU 分支策略选择图：短分支适合 predication，中等分支可用原生 branch，能隔离成独立 pass 且有空间局部性时可用 z-cull">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          先看分支体量，再看条件能否提前
        </text>
        <text
          x="380"
          y="57"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          选择机制不是 API 偏好，而是“要算多少”和“能跳过多少”的取舍
        </text>
        <rect
          x="42"
          y="92"
          width="676"
          height="54"
          rx="11"
          fill={C.accent}
          fillOpacity="0.12"
          stroke={C.accent}
        />
        <text x="64" y="125" fontSize="14" fontWeight="700" fill={C.accent}>
          2–4 个操作的短分支
        </text>
        <Arrow x1={252} y1={119} x2={320} y2={119} color={C.accent} />
        <text x="500" y="125" fontSize="13" fill={C.text}>
          predication：两边计算的额外成本较小
        </text>
        <rect
          x="42"
          y="164"
          width="676"
          height="70"
          rx="11"
          fill={C.warning}
          fillOpacity="0.11"
          stroke={C.warning}
        />
        <text x="64" y="197" fontSize="14" fontWeight="700" fill={C.warning}>
          分支嵌在较大的 program 中
        </text>
        <Arrow x1={282} y1={197} x2={350} y2={197} color={C.warning} />
        <text x="376" y="191" fontSize="13" fill={C.text}>
          有原生 branch 且局部性尚可
        </text>
        <text x="376" y="214" fontSize="13" fill={C.secondary}>
          否则考虑先整理 stream，再进入 branch
        </text>
        <rect
          x="42"
          y="252"
          width="676"
          height="83"
          rx="11"
          fill={C.success}
          fillOpacity="0.11"
          stroke={C.success}
        />
        <text x="64" y="285" fontSize="14" fontWeight="700" fill={C.success}>
          分支可独立成 pass，且条件有块状局部性
        </text>
        <Arrow x1={430} y1={285} x2={498} y2={285} color={C.success} />
        <text x="524" y="280" fontSize="13" fill={C.text}>
          z-cull：让 fragment program
        </text>
        <text x="524" y="303" fontSize="13" fill={C.text}>
          根本不启动
        </text>
        <rect
          x="42"
          y="354"
          width="676"
          height="50"
          rx="11"
          fill={C.danger}
          fillOpacity="0.1"
          stroke={C.danger}
        />
        <text
          x="380"
          y="385"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={C.danger}
        >
          随机分支 + 大分支体 + 低局部性：任何“跳过”机制都可能退化
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch34ZCullDiagram() {
  return (
    <Figure>
      <Frame label="z-cull 两阶段图：预处理 pass 将无需计算的 landlocked cells 写入深度缓冲，正常 pass 以较高深度绘制，深度测试在 fragment program 运行前拒绝它们">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          z-cull：在 shader 启动前就把无效工作挡掉
        </text>
        <rect
          x="40"
          y="88"
          width="204"
          height="242"
          rx="13"
          fill={C.surface}
          stroke={C.warning}
        />
        <text
          x="142"
          y="119"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.warning}
        >
          pass 1 · preprocess
        </text>
        <text
          x="142"
          y="145"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          检查邻居，生成 z mask
        </text>
        <rect
          x="70"
          y="174"
          width="144"
          height="108"
          rx="8"
          fill={C.bg}
          stroke={C.border}
        />
        {Array.from({ length: 12 }, (_, index) => {
          const row = Math.floor(index / 4);
          const col = index % 4;
          const blocked = col === 0 || row === 2;
          return (
            <rect
              key={`mask-${index}`}
              x={80 + col * 31}
              y={187 + row * 27}
              width="24"
              height="20"
              rx="4"
              fill={blocked ? C.danger : C.success}
              fillOpacity="0.35"
              stroke={blocked ? C.danger : C.success}
            />
          );
        })}
        <text
          x="142"
          y="307"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          landlocked = z 0.0
        </text>
        <Arrow x1={267} y1={209} x2={322} y2={209} color={C.accent} />
        <text x="294" y="188" textAnchor="middle" fontSize="12" fill={C.accent}>
          z-test
        </text>
        <rect
          x="344"
          y="88"
          width="204"
          height="242"
          rx="13"
          fill={C.surface}
          stroke={C.accent}
        />
        <text
          x="446"
          y="119"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.accent}
        >
          pass 2 · compute
        </text>
        <text
          x="446"
          y="145"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          quad at z = 0.5
        </text>
        <rect
          x="374"
          y="174"
          width="144"
          height="108"
          rx="8"
          fill={C.bg}
          stroke={C.border}
        />
        {Array.from({ length: 12 }, (_, index) => {
          const row = Math.floor(index / 4);
          const col = index % 4;
          const blocked = col === 0 || row === 2;
          return (
            <rect
              key={`run-${index}`}
              x={384 + col * 31}
              y={187 + row * 27}
              width="24"
              height="20"
              rx="4"
              fill={blocked ? C.border : C.success}
              fillOpacity={blocked ? 0.28 : 0.4}
              stroke={blocked ? C.border : C.success}
            />
          );
        })}
        <text
          x="446"
          y="307"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          灰色格子根本不进 fragment shader
        </text>
        <rect
          x="590"
          y="112"
          width="130"
          height="180"
          rx="12"
          fill={C.danger}
          fillOpacity="0.1"
          stroke={C.danger}
        />
        <text
          x="655"
          y="145"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={C.danger}
        >
          注意 locality
        </text>
        <text
          x="655"
          y="181"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          随机散点可能只按
        </text>
        <text
          x="655"
          y="204"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          粗粒度 block 判断
        </text>
        <text
          x="655"
          y="248"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          块不全被拒绝，
        </text>
        <text
          x="655"
          y="271"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          节省就会变少
        </text>
        <text
          x="380"
          y="391"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          z-cull 是“提前不执行”，不同于 shader 内部 branch 后再 discard
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch34OcclusionQueryDiagram() {
  return (
    <Figure>
      <Frame label="occlusion query 迭代图：GPU 运行计算 pass 与 termination pass，termination pass discard 已满足条件的元素，CPU 查询剩余 fragment 数，若不为零则继续下一轮">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          data-dependent loop：GPU 算，CPU 只问“还有多少没结束”
        </text>
        <rect
          x="34"
          y="92"
          width="192"
          height="112"
          rx="13"
          fill={C.surface}
          stroke={C.accent}
        />
        <text
          x="130"
          y="124"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.accent}
        >
          compute pass
        </text>
        <text
          x="130"
          y="153"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          更新所有尚未完成元素
        </text>
        <text
          x="130"
          y="178"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          仍保持 stream 形式
        </text>
        <Arrow x1={245} y1={148} x2={302} y2={148} color={C.accent} />
        <rect
          x="320"
          y="92"
          width="192"
          height="112"
          rx="13"
          fill={C.surface}
          stroke={C.warning}
        />
        <text
          x="416"
          y="124"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.warning}
        >
          termination pass
        </text>
        <text
          x="416"
          y="153"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          已满足条件的元素 discard
        </text>
        <text
          x="416"
          y="178"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          未满足者留下可见 fragment
        </text>
        <Arrow x1={531} y1={148} x2={588} y2={148} color={C.warning} />
        <rect
          x="606"
          y="92"
          width="120"
          height="112"
          rx="13"
          fill={C.surface}
          stroke={C.success}
        />
        <text
          x="666"
          y="124"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.success}
        >
          query
        </text>
        <text
          x="666"
          y="153"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          count = 37
        </text>
        <text
          x="666"
          y="178"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          只读回整数
        </text>
        <path
          d="M 666 222 C 666 317, 130 317, 130 222"
          fill="none"
          stroke={C.danger}
          strokeWidth="3"
          strokeDasharray="8 7"
        />
        <polygon points="130,222 121,239 139,239" fill={C.danger} />
        <text
          x="380"
          y="285"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.danger}
        >
          count &gt; 0：继续下一轮；count = 0：CPU 结束循环
        </text>
        <rect
          x="172"
          y="337"
          width="416"
          height="48"
          rx="11"
          fill={C.bg}
          stroke={C.border}
        />
        <text
          x="380"
          y="367"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          避免每轮读回整张纹理，但 CPU 仍掌握全局停止决定
        </text>
      </Frame>
    </Figure>
  );
}

type BranchPattern = "coherent" | "random" | "precomputed";

export function GpuGems2Ch34FlowControlLab() {
  const [pattern, setPattern] = useState<BranchPattern>("random");
  const [branchWork, setBranchWork] = useState(3);
  const [activeRatio, setActiveRatio] = useState(50);

  const result = useMemo(() => {
    const lanes = 1024;
    const activeLanes = Math.round((lanes * activeRatio) / 100);
    const groups =
      pattern === "coherent"
        ? Math.ceil(activeLanes / 32)
        : Math.ceil(lanes / 32);
    const executedPaths = pattern === "random" ? 2 : 1;
    const instructionUnits = groups * branchWork * executedPaths;
    const skippedUnits =
      pattern === "precomputed"
        ? lanes - activeLanes
        : pattern === "coherent"
          ? lanes - activeLanes
          : 0;
    const strategy =
      pattern === "coherent"
        ? "保留 branch：条件成块，SIMD 组有机会同路"
        : pattern === "precomputed"
          ? "预计算 mask：变化时重建，稳定期间复用"
          : "先整理条件：随机分支会让两条路径都付费";
    return { activeLanes, groups, instructionUnits, skippedUnits, strategy };
  }, [activeRatio, branchWork, pattern]);

  const reset = () => {
    setPattern("random");
    setBranchWork(3);
    setActiveRatio(50);
  };

  return (
    <Figure>
      <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <p className="mb-3 text-sm font-semibold text-primary">
            Flow-Control Lab · compare the execution shape
          </p>
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="branch pattern"
          >
            {(["coherent", "random", "precomputed"] as BranchPattern[]).map(
              (mode) => (
                <button
                  key={mode}
                  type="button"
                  className="rounded-full border px-3 py-1.5 text-sm font-semibold transition"
                  style={{
                    background: pattern === mode ? C.accent : C.surface,
                    borderColor: pattern === mode ? C.accent : C.border,
                    color: pattern === mode ? C.bg : C.text,
                  }}
                  onClick={() => setPattern(mode)}
                >
                  {mode}
                </button>
              ),
            )}
            <button
              type="button"
              className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-semibold text-secondary transition hover:border-accent hover:text-primary"
              onClick={reset}
            >
              reset
            </button>
          </div>
          <label className="mt-5 block text-sm text-secondary">
            branch work: {branchWork} operations
            <input
              aria-label="branch work"
              className="mt-2 block w-full accent-[var(--accent)]"
              type="range"
              min="1"
              max="6"
              step="1"
              value={branchWork}
              onChange={(event) => setBranchWork(Number(event.target.value))}
            />
          </label>
          <label className="mt-4 block text-sm text-secondary">
            active ratio: {activeRatio}%
            <input
              aria-label="active ratio"
              className="mt-2 block w-full accent-[var(--accent)]"
              type="range"
              min="10"
              max="90"
              step="10"
              value={activeRatio}
              onChange={(event) => setActiveRatio(Number(event.target.value))}
            />
          </label>
          <div className="mt-5 rounded-xl border border-border bg-surface p-4">
            <p className="text-sm font-semibold text-primary">
              What this layout exposes
            </p>
            <p className="mt-2 text-sm leading-6 text-secondary">
              {pattern === "coherent" &&
                "条件在相邻 fragment 中成块分布：每个 SIMD group 更容易只走一条路径。"}
              {pattern === "random" &&
                "条件随机交错：即使只有一半元素 active，两条路径也可能都被执行。"}
              {pattern === "precomputed" &&
                "条件变化不频繁：把判断搬到更新时刻，主循环只消费 mask。"}
            </p>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="mb-2 text-sm font-semibold text-primary">
            Derived metrics
          </p>
          <Metric
            label="active lanes"
            value={`${result.activeLanes} / 1024`}
            tone={C.success}
          />
          <Metric
            label="SIMD groups touched"
            value={`${result.groups}`}
            tone={C.accent}
          />
          <Metric
            label="branch instruction units"
            value={`${result.instructionUnits}`}
            tone={C.warning}
          />
          <Metric
            label="units skipped before shader"
            value={`${result.skippedUnits}`}
            tone={C.secondary}
          />
          <p className="mt-4 text-sm font-semibold text-primary">
            recommended move
          </p>
          <p className="mt-1 text-sm leading-6 text-secondary">
            {result.strategy}
          </p>
          <p className="mt-4 text-xs leading-5 text-secondary">
            这些值是由 lane、分支体量和 active ratio
            推导出的执行形状，不是合成性能分数；最终仍需在目标 GPU 上 profile。
          </p>
        </div>
      </div>
    </Figure>
  );
}
