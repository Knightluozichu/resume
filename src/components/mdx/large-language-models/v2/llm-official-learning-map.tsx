"use client";

import { useId, useMemo, useState } from "react";
import { useTeachingTimeline } from "@/components/mdx/anim/use-teaching-timeline";
import {
  TimelineControls,
  TEACHING_BEAT_MS,
} from "@/components/mdx/anim/timeline-controls";

const C = {
  bg: "var(--bg-elevated)",
  border: "var(--border)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
} as const;
const CHAPTERS = [
  "辩论与争议",
  "语言与分词",
  "Transformer",
  "目标与解码",
  "上下文与微调",
  "训练规模",
  "稀疏专家",
  "检索增强",
  "偏好对齐",
  "偏见与有害性",
  "视觉语言",
  "环境影响",
];
// 教学建议，不是原书给定的强制依赖。编号按原书，边由本站设计。
const PRE: Record<number, readonly number[]> = {
  1: [],
  2: [],
  3: [2],
  4: [3],
  5: [4],
  6: [3, 4],
  7: [6],
  8: [4, 5],
  9: [4, 5],
  10: [1, 9],
  11: [3, 5, 8],
  12: [6],
};
const ORDER = Array.from({ length: 12 }, (_, i) => i + 1);
function closure(targets: readonly number[], broken = false) {
  const found = new Set<number>();
  const visit = (n: number) => {
    if (found.has(n)) return;
    found.add(n);
    for (const p of PRE[n]) if (!(broken && p === 3 && n === 4)) visit(p);
  };
  targets.forEach(visit);
  return ORDER.filter((n) => found.has(n));
}
function useMapTimeline(labels: readonly string[]) {
  const key = labels.join("|");
  const steps = useMemo(
    () => key.split("|").map((label) => ({ label })),
    [key],
  );
  return useTeachingTimeline({
    steps,
    build: (tl) => {
      const cursor = { step: 0 };
      steps.forEach((s, i) => {
        tl.label(s.label, i * TEACHING_BEAT_MS);
        tl.add(
          cursor,
          { step: i + 1, duration: TEACHING_BEAT_MS, ease: "linear" },
          i * TEACHING_BEAT_MS,
        );
      });
    },
  });
}
const BOX =
  "not-prose my-8 rounded-xl border border-border bg-bg-elevated p-3 sm:p-4 text-primary [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_select]:min-h-11 [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-accent [&_input:focus-visible]:outline-2 [&_input:focus-visible]:outline-accent [&_select:focus-visible]:outline-2 [&_select:focus-visible]:outline-accent";
const CONTROL =
  "w-full min-w-0 rounded-lg border border-border bg-bg px-3 py-2 text-sm text-primary";

export function LlmOfficialLearningMapContextContractLab() {
  const [target, setTarget] = useState(8);
  const [broken, setBroken] = useState(false);
  const timeline = useMapTimeline(CHAPTERS);
  const marker = useId();
  const needed = closure([target], broken);
  const missing = closure([target]).filter((n) => !needed.includes(n));
  const x = (n: number) => 28 + ((n - 1) % 3) * 40;
  const y = (n: number) => 40 + (n - 1) * 56;
  const reset = () => {
    timeline.goToStep(0);
    setTarget(8);
    setBroken(false);
  };
  return (
    <section
      className={BOX}
      data-map-lab="dag"
      data-visual-kind="chapter-prerequisite-dag"
      aria-label="实验一：12章先修依赖DAG"
    >
      <h3 className="mb-3 text-lg font-semibold">实验一 · 沿边找先修</h3>
      <label className="block text-sm">
        目标章
        <select
          className={CONTROL}
          value={target}
          onChange={(e) => {
            timeline.pause();
            setTarget(Number(e.target.value));
          }}
        >
          {CHAPTERS.map((t, i) => (
            <option key={t} value={i + 1}>
              {i + 1} · {t}
            </option>
          ))}
        </select>
      </label>
      <button
        className={`${CONTROL} mt-3`}
        aria-pressed={broken}
        onClick={() => {
          timeline.pause();
          setBroken(!broken);
        }}
      >
        故障：漏掉 3 → 4 先修边 · {broken ? "已注入" : "未注入"}
      </button>
      <p className="my-3 text-sm">
        圆点为章，箭头为建议先修方向；亮线连向目标。空心环是扫描游标，不代表已学会。
      </p>
      <svg
        viewBox="0 0 336 700"
        className="mx-auto block w-full max-w-sm"
        role="img"
        aria-label={`12章依赖DAG，目标${target}，前置闭包${needed.join("、")}，遗漏${missing.join("、") || "无"}`}
      >
        <defs>
          <marker
            id={marker}
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M0 0 L8 4 L0 8" fill={C.muted} />
          </marker>
        </defs>
        {ORDER.flatMap((n) =>
          PRE[n].map((p) => {
            const lost = broken && p === 3 && n === 4;
            const active = needed.includes(n) && needed.includes(p);
            return (
              <path
                key={`${p}-${n}`}
                d={`M${x(p)} ${y(p) + 12} Q 4 ${(y(p) + y(n)) / 2} ${x(n)} ${y(n) - 16}`}
                fill="none"
                stroke={lost ? C.danger : active ? C.accent : C.border}
                strokeWidth={active || lost ? 2.5 : 1.5}
                strokeDasharray={lost ? "5 4" : undefined}
                markerEnd={`url(#${marker})`}
              />
            );
          }),
        )}
        {ORDER.map((n) => (
          <g key={n}>
            <circle
              cx={x(n)}
              cy={y(n)}
              r={n === timeline.currentStep + 1 ? 20 : 14}
              fill={C.bg}
              stroke={n === timeline.currentStep + 1 ? C.text : C.border}
              strokeWidth="2"
            />
            <circle
              cx={x(n)}
              cy={y(n)}
              r="13"
              fill={C.bg}
              stroke={
                missing.includes(n)
                  ? C.danger
                  : needed.includes(n)
                    ? C.accent
                    : C.border
              }
              strokeWidth="2"
            />
            <text
              x={x(n)}
              y={y(n) + 6}
              textAnchor="middle"
              fontSize="16"
              fill={needed.includes(n) ? C.accent : C.text}
            >
              {n}
            </text>
            <text
              x="144"
              y={y(n) + 6}
              fontSize="16"
              fill={missing.includes(n) ? C.danger : C.text}
            >
              {CHAPTERS[n - 1]}
            </text>
          </g>
        ))}
      </svg>
      <output className="block text-sm" data-result>
        闭包：{needed.join(" → ")}。
        {missing.length
          ? `缺失：${missing.join("、")}；红虚线保留故障位置。`
          : "与完整依赖图一致。"}
      </output>
      <TimelineControls
        timeline={timeline}
        reset={{ label: "完整重置", onClick: reset }}
      />
    </section>
  );
}

type Coordinate = {
  id: string;
  title: string;
  depth: number;
  parent: string | null;
  root: number;
};
const COORDINATES: readonly Coordinate[] = [
  { id: "preface", title: "前言", depth: 1, parent: null, root: 0 },
  {
    id: "c1",
    title: "第1章 大语言模型：辩论、争议与未来发展方向",
    depth: 1,
    parent: null,
    root: 1,
  },
  { id: "1.1", title: "1.1 新时代的曙光", depth: 2, parent: "c1", root: 1 },
  { id: "1.2", title: "1.2 LLM有意识吗", depth: 2, parent: "c1", root: 1 },
  {
    id: "1.2.1",
    title: "1.2.1 理解LLM的层次结构",
    depth: 3,
    parent: "1.2",
    root: 1,
  },
  {
    id: "1.2.2",
    title: "1.2.2 意识是否需要碳基生物学",
    depth: 3,
    parent: "1.2",
    root: 1,
  },
  {
    id: "1.2.3",
    title: "1.2.3 具身化与落地",
    depth: 3,
    parent: "1.2",
    root: 1,
  },
  { id: "1.2.4", title: "1.2.4 世界模型", depth: 3, parent: "1.2", root: 1 },
  { id: "1.2.5", title: "1.2.5 沟通意图", depth: 3, parent: "1.2", root: 1 },
  {
    id: "1.2.6",
    title: "1.2.6 系统性和全面泛化",
    depth: 3,
    parent: "1.2",
    root: 1,
  },
  { id: "1.3", title: "1.3 未来发展方向", depth: 2, parent: "c1", root: 1 },
  { id: "1.4", title: "1.4 小结", depth: 2, parent: "c1", root: 1 },
  { id: "c2", title: "第2章 语言模型和分词", depth: 1, parent: null, root: 2 },
  { id: "2.1", title: "2.1 语言建模的挑战", depth: 2, parent: "c2", root: 2 },
  { id: "2.2", title: "2.2 统计语言建模", depth: 2, parent: "c2", root: 2 },
  { id: "2.3", title: "2.3 神经语言模型", depth: 2, parent: "c2", root: 2 },
  { id: "2.4", title: "2.4 评估语言模型", depth: 2, parent: "c2", root: 2 },
  { id: "2.5", title: "2.5 分词", depth: 2, parent: "c2", root: 2 },
  { id: "2.5.1", title: "2.5.1 按空格分割", depth: 3, parent: "2.5", root: 2 },
  { id: "2.5.2", title: "2.5.2 字符分词", depth: 3, parent: "2.5", root: 2 },
  { id: "2.5.3", title: "2.5.3 子词分词", depth: 3, parent: "2.5", root: 2 },
  { id: "2.5.4", title: "2.5.4 无分词器", depth: 3, parent: "2.5", root: 2 },
  {
    id: "2.5.5",
    title: "2.5.5 可学习的分词",
    depth: 3,
    parent: "2.5",
    root: 2,
  },
  { id: "2.6", title: "2.6 小结", depth: 2, parent: "c2", root: 2 },
  { id: "c3", title: "第3章 Transformer", depth: 1, parent: null, root: 3 },
  {
    id: "3.1",
    title: "3.1 Transformer编码器模块",
    depth: 2,
    parent: "c3",
    root: 3,
  },
  {
    id: "3.2",
    title: "3.2 编码器-解码器架构",
    depth: 2,
    parent: "c3",
    root: 3,
  },
  { id: "3.3", title: "3.3 位置嵌入", depth: 2, parent: "c3", root: 3 },
  {
    id: "3.3.1",
    title: "3.3.1 绝对位置编码",
    depth: 3,
    parent: "3.3",
    root: 3,
  },
  {
    id: "3.3.2",
    title: "3.3.2 相对位置编码",
    depth: 3,
    parent: "3.3",
    root: 3,
  },
  { id: "3.4", title: "3.4 更长的上下文", depth: 2, parent: "c3", root: 3 },
  { id: "3.5", title: "3.5 外部记忆", depth: 2, parent: "c3", root: 3 },
  {
    id: "3.6",
    title: "3.6 更快、更小的Transformer",
    depth: 2,
    parent: "c3",
    root: 3,
  },
  { id: "3.6.1", title: "3.6.1 高效注意力", depth: 3, parent: "3.6", root: 3 },
  { id: "3.6.2", title: "3.6.2 条件计算", depth: 3, parent: "3.6", root: 3 },
  {
    id: "3.6.3",
    title: "3.6.3 搜索高效Transformer",
    depth: 3,
    parent: "3.6",
    root: 3,
  },
  {
    id: "3.6.4",
    title: "3.6.4 在单个GPU上一天内训练一个语言模型",
    depth: 3,
    parent: "3.6",
    root: 3,
  },
  { id: "3.7", title: "3.7 推理优化", depth: 2, parent: "c3", root: 3 },
  { id: "3.7.1", title: "3.7.1 推测解码", depth: 3, parent: "3.7", root: 3 },
  {
    id: "3.7.2",
    title: "3.7.2 简化Transformer",
    depth: 3,
    parent: "3.7",
    root: 3,
  },
  { id: "3.7.3", title: "3.7.3 修剪", depth: 3, parent: "3.7", root: 3 },
  { id: "3.7.4", title: "3.7.4 蒸馏", depth: 3, parent: "3.7", root: 3 },
  { id: "3.7.5", title: "3.7.5 混合精度", depth: 3, parent: "3.7", root: 3 },
  {
    id: "3.7.6",
    title: "3.7.6 高效扩展Transformer推理",
    depth: 3,
    parent: "3.7",
    root: 3,
  },
  { id: "3.8", title: "3.8 小结", depth: 2, parent: "c3", root: 3 },
  {
    id: "c4",
    title: "第4章 预训练目标和解码策略",
    depth: 1,
    parent: null,
    root: 4,
  },
  { id: "4.1", title: "4.1 模型架构", depth: 2, parent: "c4", root: 4 },
  { id: "4.2", title: "4.2 预训练目标", depth: 2, parent: "c4", root: 4 },
  {
    id: "4.3",
    title: "4.3 具有代表性的语言模型",
    depth: 2,
    parent: "c4",
    root: 4,
  },
  { id: "4.4", title: "4.4 解码策略", depth: 2, parent: "c4", root: 4 },
  { id: "4.5", title: "4.5 小结", depth: 2, parent: "c4", root: 4 },
  {
    id: "c5",
    title: "第5章 上下文学习和轻量级微调",
    depth: 1,
    parent: null,
    root: 5,
  },
  { id: "5.1", title: "5.1 上下文学习", depth: 2, parent: "c5", root: 5 },
  {
    id: "5.1.1",
    title: "5.1.1 示范样本选择",
    depth: 3,
    parent: "5.1",
    root: 5,
  },
  { id: "5.1.2", title: "5.1.2 样本排序", depth: 3, parent: "5.1", root: 5 },
  { id: "5.1.3", title: "5.1.3 指令生成", depth: 3, parent: "5.1", root: 5 },
  { id: "5.1.4", title: "5.1.4 思维链", depth: 3, parent: "5.1", root: 5 },
  { id: "5.1.5", title: "5.1.5 递归提示", depth: 3, parent: "5.1", root: 5 },
  {
    id: "5.1.6",
    title: "5.1.6 为什么ICL有效",
    depth: 3,
    parent: "5.1",
    root: 5,
  },
  { id: "5.1.7", title: "5.1.7 评估", depth: 3, parent: "5.1", root: 5 },
  {
    id: "5.2",
    title: "5.2 提示语言模型的校准",
    depth: 2,
    parent: "c5",
    root: 5,
  },
  { id: "5.3", title: "5.3 轻量级微调", depth: 2, parent: "c5", root: 5 },
  {
    id: "5.3.1",
    title: "5.3.1 基于添加的方法",
    depth: 3,
    parent: "5.3",
    root: 5,
  },
  {
    id: "5.3.2",
    title: "5.3.2 基于规范的方法",
    depth: 3,
    parent: "5.3",
    root: 5,
  },
  {
    id: "5.3.3",
    title: "5.3.3 基于重新参数化的方法",
    depth: 3,
    parent: "5.3",
    root: 5,
  },
  { id: "5.3.4", title: "5.3.4 混合方法", depth: 3, parent: "5.3", root: 5 },
  { id: "5.4", title: "5.4 小结", depth: 2, parent: "c5", root: 5 },
  { id: "c6", title: "第6章 训练更大的模型", depth: 1, parent: null, root: 6 },
  { id: "6.1", title: "6.1 扩大尺度法则", depth: 2, parent: "c6", root: 6 },
  {
    id: "6.1.1",
    title: "6.1.1 预训练Transformer扩大尺度的启示",
    depth: 3,
    parent: "6.1",
    root: 6,
  },
  {
    id: "6.1.2",
    title: "6.1.2 预训练和微调Transformer带来的新启示",
    depth: 3,
    parent: "6.1",
    root: 6,
  },
  {
    id: "6.1.3",
    title: "6.1.3 k比特推理扩大尺度法则",
    depth: 3,
    parent: "6.1",
    root: 6,
  },
  { id: "6.1.4", title: "6.1.4 挑战与机遇", depth: 3, parent: "6.1", root: 6 },
  { id: "6.2", title: "6.2 涌现能力", depth: 2, parent: "c6", root: 6 },
  { id: "6.3", title: "6.3 人工智能加速器", depth: 2, parent: "c6", root: 6 },
  { id: "6.4", title: "6.4 并行", depth: 2, parent: "c6", root: 6 },
  { id: "6.4.1", title: "6.4.1 数据并行", depth: 3, parent: "6.4", root: 6 },
  { id: "6.4.2", title: "6.4.2 流水线并行", depth: 3, parent: "6.4", root: 6 },
  {
    id: "6.4.3",
    title: "6.4.3 张量/模型并行",
    depth: 3,
    parent: "6.4",
    root: 6,
  },
  { id: "6.4.4", title: "6.4.4 专家混合", depth: 3, parent: "6.4", root: 6 },
  {
    id: "6.5",
    title: "6.5 混合训练和低精度训练",
    depth: 2,
    parent: "c6",
    root: 6,
  },
  { id: "6.5.1", title: "6.5.1 单位缩放", depth: 3, parent: "6.5", root: 6 },
  { id: "6.5.2", title: "6.5.2 FP8与INT8", depth: 3, parent: "6.5", root: 6 },
  {
    id: "6.6",
    title: "6.6 其他节省内存的设计",
    depth: 2,
    parent: "c6",
    root: 6,
  },
  { id: "6.7", title: "6.7 小结", depth: 2, parent: "c6", root: 6 },
  { id: "c7", title: "第7章 稀疏专家模型", depth: 1, parent: null, root: 7 },
  {
    id: "7.1",
    title: "7.1 为什么采用稀疏专家模型",
    depth: 2,
    parent: "c7",
    root: 7,
  },
  { id: "7.2", title: "7.2 路由算法", depth: 2, parent: "c7", root: 7 },
  {
    id: "7.2.1",
    title: "7.2.1 每个词元选择top-k个专家",
    depth: 3,
    parent: "7.2",
    root: 7,
  },
  {
    id: "7.2.2",
    title: "7.2.2 每个专家选择top-k个词元",
    depth: 3,
    parent: "7.2",
    root: 7,
  },
  {
    id: "7.2.3",
    title: "7.2.3 全局最优分配",
    depth: 3,
    parent: "7.2",
    root: 7,
  },
  { id: "7.2.4", title: "7.2.4 随机路由", depth: 3, parent: "7.2", root: 7 },
  { id: "7.2.5", title: "7.2.5 双层路由", depth: 3, parent: "7.2", root: 7 },
  {
    id: "7.2.6",
    title: "7.2.6 针对不同预训练领域的不同专家",
    depth: 3,
    parent: "7.2",
    root: 7,
  },
  { id: "7.3", title: "7.3 其他改进措施", depth: 2, parent: "c7", root: 7 },
  {
    id: "7.3.1",
    title: "7.3.1 加快训练速度",
    depth: 3,
    parent: "7.3",
    root: 7,
  },
  {
    id: "7.3.2",
    title: "7.3.2 高效的MoE架构",
    depth: 3,
    parent: "7.3",
    root: 7,
  },
  {
    id: "7.3.3",
    title: "7.3.3 生产规模部署",
    depth: 3,
    parent: "7.3",
    root: 7,
  },
  {
    id: "7.3.4",
    title: "7.3.4 通过稀疏MoE扩展视觉语言模型",
    depth: 3,
    parent: "7.3",
    root: 7,
  },
  { id: "7.3.5", title: "7.3.5 MoE与集成", depth: 3, parent: "7.3", root: 7 },
  { id: "7.4", title: "7.4 小结", depth: 2, parent: "c7", root: 7 },
  {
    id: "c8",
    title: "第8章 检索增强型语言模型",
    depth: 1,
    parent: null,
    root: 8,
  },
  {
    id: "8.1",
    title: "8.1 预训练检索增强型语言模型",
    depth: 2,
    parent: "c8",
    root: 8,
  },
  { id: "8.2", title: "8.2 词元级检索", depth: 2, parent: "c8", root: 8 },
  {
    id: "8.3",
    title: "8.3 通过高效和精简检索进行问答和多跳推理",
    depth: 2,
    parent: "c8",
    root: 8,
  },
  {
    id: "8.4",
    title: "8.4 检索增强型Transformer",
    depth: 2,
    parent: "c8",
    root: 8,
  },
  {
    id: "8.5",
    title: "8.5 检索增强型黑盒语言模型",
    depth: 2,
    parent: "c8",
    root: 8,
  },
  { id: "8.6", title: "8.6 视觉增强语言建模", depth: 2, parent: "c8", root: 8 },
  { id: "8.7", title: "8.7 小结", depth: 2, parent: "c8", root: 8 },
  {
    id: "c9",
    title: "第9章 对齐语言模型与人类偏好",
    depth: 1,
    parent: null,
    root: 9,
  },
  {
    id: "9.1",
    title: "9.1 基于人类反馈进行微调",
    depth: 2,
    parent: "c9",
    root: 9,
  },
  {
    id: "9.1.1",
    title: "9.1.1 基于人类反馈的强化学习",
    depth: 3,
    parent: "9.1",
    root: 9,
  },
  {
    id: "9.1.2",
    title: "9.1.2 KL散度：前向与反向",
    depth: 3,
    parent: "9.1",
    root: 9,
  },
  {
    id: "9.1.3",
    title: "9.1.3 REINFORCE、TRPO和PPO",
    depth: 3,
    parent: "9.1",
    root: 9,
  },
  {
    id: "9.1.4",
    title: "9.1.4 带有KL惩罚的强化学习：贝叶斯推理观点",
    depth: 3,
    parent: "9.1",
    root: 9,
  },
  {
    id: "9.1.5",
    title: "9.1.5 通过分布控制生成进行语言模型对齐",
    depth: 3,
    parent: "9.1",
    root: 9,
  },
  {
    id: "9.1.6",
    title: "9.1.6 通过f散度最小化统一RLHF和GDC方法",
    depth: 3,
    parent: "9.1",
    root: 9,
  },
  {
    id: "9.2",
    title: "9.2 基于语言反馈进行微调",
    depth: 2,
    parent: "c9",
    root: 9,
  },
  {
    id: "9.3",
    title: "9.3 基于监督学习进行微调",
    depth: 2,
    parent: "c9",
    root: 9,
  },
  {
    id: "9.4",
    title: "9.4 基于人工智能反馈的强化学习",
    depth: 2,
    parent: "c9",
    root: 9,
  },
  {
    id: "9.5",
    title: "9.5 基于自我反馈进行迭代优化",
    depth: 2,
    parent: "c9",
    root: 9,
  },
  {
    id: "9.6",
    title: "9.6 基于人类偏好进行预训练",
    depth: 2,
    parent: "c9",
    root: 9,
  },
  { id: "9.7", title: "9.7 小结", depth: 2, parent: "c9", root: 9 },
  {
    id: "c10",
    title: "第10章 减少偏见和有害性",
    depth: 1,
    parent: null,
    root: 10,
  },
  { id: "10.1", title: "10.1 偏见", depth: 2, parent: "c10", root: 10 },
  { id: "10.2", title: "10.2 有害性", depth: 2, parent: "c10", root: 10 },
  {
    id: "10.3",
    title: "10.3 偏见和有害性的检测与减少",
    depth: 2,
    parent: "c10",
    root: 10,
  },
  {
    id: "10.3.1",
    title: "10.3.1 基于解码的策略",
    depth: 3,
    parent: "10.3",
    root: 10,
  },
  {
    id: "10.3.2",
    title: "10.3.2 基于提示的脱毒",
    depth: 3,
    parent: "10.3",
    root: 10,
  },
  {
    id: "10.3.3",
    title: "10.3.3 基于数据的策略",
    depth: 3,
    parent: "10.3",
    root: 10,
  },
  {
    id: "10.3.4",
    title: "10.3.4 基于投影和正则化的方法",
    depth: 3,
    parent: "10.3",
    root: 10,
  },
  {
    id: "10.3.5",
    title: "10.3.5 基于风格转换的方法",
    depth: 3,
    parent: "10.3",
    root: 10,
  },
  {
    id: "10.3.6",
    title: "10.3.6 基于强化学习的微调和基于人类偏好的预训练",
    depth: 3,
    parent: "10.3",
    root: 10,
  },
  { id: "10.4", title: "10.4 小结", depth: 2, parent: "c10", root: 10 },
  { id: "c11", title: "第11章 视觉语言模型", depth: 1, parent: null, root: 11 },
  {
    id: "11.1",
    title: "11.1 语言处理的多模态落地",
    depth: 2,
    parent: "c11",
    root: 11,
  },
  {
    id: "11.2",
    title: "11.2 不需要额外训练即可利用预训练模型",
    depth: 2,
    parent: "c11",
    root: 11,
  },
  {
    id: "11.2.1",
    title: "11.2.1 视觉引导解码策略",
    depth: 3,
    parent: "11.2",
    root: 11,
  },
  {
    id: "11.2.2",
    title: "11.2.2 作为大语言模型提示的视觉输入",
    depth: 3,
    parent: "11.2",
    root: 11,
  },
  {
    id: "11.2.3",
    title: "11.2.3 基于相似性搜索的多模态对齐",
    depth: 3,
    parent: "11.2",
    root: 11,
  },
  { id: "11.3", title: "11.3 轻量级适配", depth: 2, parent: "c11", root: 11 },
  {
    id: "11.3.1",
    title: "11.3.1 锁定图像调优",
    depth: 3,
    parent: "11.3",
    root: 11,
  },
  {
    id: "11.3.2",
    title: "11.3.2 作为（冻结）语言模型前缀的学习视觉嵌入",
    depth: 3,
    parent: "11.3",
    root: 11,
  },
  {
    id: "11.3.3",
    title: "11.3.3 视觉-文本交叉注意力融合",
    depth: 3,
    parent: "11.3",
    root: 11,
  },
  { id: "11.4", title: "11.4 图文联合训练", depth: 2, parent: "c11", root: 11 },
  {
    id: "11.5",
    title: "11.5 检索增强视觉语言模型",
    depth: 2,
    parent: "c11",
    root: 11,
  },
  { id: "11.6", title: "11.6 视觉指令调整", depth: 2, parent: "c11", root: 11 },
  { id: "11.7", title: "11.7 小结", depth: 2, parent: "c11", root: 11 },
  { id: "c12", title: "第12章 环境影响", depth: 1, parent: null, root: 12 },
  {
    id: "12.1",
    title: "12.1 能源消耗和温室气体排放",
    depth: 2,
    parent: "c12",
    root: 12,
  },
  {
    id: "12.2",
    title: "12.2 估算训练模型的排放量",
    depth: 2,
    parent: "c12",
    root: 12,
  },
  { id: "12.3", title: "12.3 小结", depth: 2, parent: "c12", root: 12 },
  { id: "references", title: "参考文献", depth: 1, parent: null, root: 13 },
];
const ROOTS = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 0, 1, 2].map(
  (root) => COORDINATES.find((n) => n.depth === 1 && n.root === root)!,
);

export function LlmOfficialLearningMapComputeTraceLab() {
  const [depth, setDepth] = useState(3);
  const [query, setQuery] = useState("");
  const [shallow, setShallow] = useState(false);
  const [collapsed, setCollapsed] = useState<ReadonlySet<string>>(new Set());
  const timeline = useMapTimeline(ROOTS.map((n) => n.title));
  const available = COORDINATES.filter(
    (n) => n.depth <= Math.min(depth, shallow ? 2 : 3),
  );
  const hits = available.filter((n) =>
    n.title.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const keep = new Set(hits.map((n) => n.id));
  for (const hit of hits) {
    let parent = hit.parent;
    while (parent) {
      keep.add(parent);
      parent = COORDINATES.find((n) => n.id === parent)?.parent ?? null;
    }
  }
  const visible = available.filter(
    (n) =>
      keep.has(n.id) &&
      (query.trim() || n.root === ROOTS[timeline.currentStep].root),
  );
  const lost = COORDINATES.filter((n) => shallow && n.depth === 3);
  const counts = [1, 2, 3].map(
    (d) => available.filter((n) => n.depth === d).length,
  );
  const reset = () => {
    timeline.goToStep(0);
    setDepth(3);
    setQuery("");
    setShallow(false);
    setCollapsed(new Set());
  };
  // 初始展开Transformer；全部14个根通过进度与选择框直接可达。
  const renderTree = (parent: string | null): React.ReactNode => {
    const children = visible.filter((n) => n.parent === parent);
    if (!children.length) return null;
    return (
      <ul className={parent ? "ml-3 border-l border-border pl-3" : "space-y-2"}>
        {children.map((n) => {
          const branch = visible.some((child) => child.parent === n.id);
          const expanded = !!query.trim() || !collapsed.has(n.id);
          return (
            <li key={n.id} className="py-1 text-sm leading-7">
              {branch ? (
                <button
                  className="w-full rounded-lg px-2 text-left leading-7 text-accent"
                  aria-expanded={expanded}
                  onClick={() => {
                    timeline.pause();
                    setCollapsed((old) => {
                      const next = new Set(old);
                      if (next.has(n.id)) next.delete(n.id);
                      else next.add(n.id);
                      return next;
                    });
                  }}
                >
                  {expanded ? "−" : "+"} {n.title}
                </button>
              ) : (
                <span className="text-primary">{n.title}</span>
              )}
              {expanded && renderTree(n.id)}
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <section
      className={BOX}
      data-map-lab="toc"
      data-visual-kind="formal-coordinate-tree"
      aria-label="实验二：153正式坐标树"
    >
      <h3 className="mb-3 text-lg font-semibold">实验二 · 展开原书坐标</h3>
      <div className="grid gap-3">
        <label className="text-sm">
          展示层级
          <select
            className={CONTROL}
            value={depth}
            onChange={(e) => {
              timeline.pause();
              setDepth(Number(e.target.value));
            }}
          >
            <option value="1">章级 · 14</option>
            <option value="2">浅层 · 80</option>
            <option value="3">完整 · 153</option>
          </select>
        </label>
        <label className="text-sm">
          定位根节点
          <select
            className={CONTROL}
            value={timeline.currentStep}
            onChange={(e) => timeline.goToStep(Number(e.target.value))}
          >
            {ROOTS.map((n, i) => (
              <option key={n.id} value={i}>
                {n.title}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          全目录搜索（保留祖先）
          <input
            className={CONTROL}
            value={query}
            placeholder="例如：路由"
            onChange={(e) => {
              timeline.pause();
              setQuery(e.target.value);
            }}
          />
        </label>
      </div>
      <button
        className={`${CONTROL} mt-3`}
        aria-pressed={shallow}
        onClick={() => {
          timeline.pause();
          setShallow(!shallow);
        }}
      >
        故障：浅目录冒充完整目录 · {shallow ? "已注入" : "未注入"}
      </button>
      <svg
        viewBox="0 0 336 176"
        className="my-3 block w-full"
        role="img"
        aria-label={`可展开坐标按深度计数：章级${counts[0]}，节级${counts[1]}，小节${counts[2]}；固定正式分母153`}
      >
        {["章与前后置", "编号节", "编号小节"].map((name, i) => (
          <g key={name}>
            <text x="4" y={28 + i * 52} fontSize="16" fill={C.text}>
              {name}
            </text>
            <rect
              x="112"
              y={10 + i * 52}
              width="176"
              height="28"
              fill={C.bg}
              stroke={C.border}
            />
            <rect
              x="112"
              y={10 + i * 52}
              width={(counts[i] / 73) * 176}
              height="28"
              fill={C.accent}
            />
            <text x="300" y={30 + i * 52} fontSize="16" fill={C.text}>
              {counts[i]}
            </text>
          </g>
        ))}
      </svg>
      <output className="block text-sm" data-result>
        可展开 {available.length} / 固定153。得到83入口 − 3前置页 =
        浅80；豆瓣深153。
        {shallow ? "故障实际丢失73个小节。" : "目录完整不代表已读正文。"}
      </output>
      <div
        className="mt-4 rounded-lg border border-border p-3"
        aria-label="目录树"
      >
        {visible.length ? (
          renderTree(null)
        ) : (
          <p className="text-sm">没有匹配；清空搜索或恢复深层后再试。</p>
        )}
      </div>
      {!!lost.length && (
        <details className="mt-3">
          <summary className="flex min-h-11 cursor-pointer items-center text-sm text-danger">
            核对丢失的73个坐标（展开）
          </summary>
          <ul className="pl-4 text-sm leading-7">
            {lost.map((n) => (
              <li key={n.id}>{n.title}</li>
            ))}
          </ul>
        </details>
      )}
      <TimelineControls
        timeline={timeline}
        caption="进度沿14个根逐一展开；搜索时跨全部根匹配。"
        reset={{ label: "完整重置", onClick: reset }}
      />
    </section>
  );
}

const TASKS = [
  {
    name: "带出处的文本问答",
    targets: [8],
    deliver: "检索结果与回答引用对照表；另读10/12作风险和资源复核。",
  },
  {
    name: "偏好与有害性评估",
    targets: [9, 10],
    deliver: "偏好对照与分组伤害记录，不能把偏好分数当作安全证明。",
  },
  {
    name: "图文问答",
    targets: [11],
    deliver: "同图不同问题、同问不同图的对照及视觉依据。",
  },
  {
    name: "训练资源与专家预算",
    targets: [7, 12],
    deliver: "专家分配与资源估算假设表，不能把模拟当作GPU实测。",
  },
];
export function LlmOfficialLearningMapEvidenceGateLab() {
  const [task, setTask] = useState(0);
  const [known, setKnown] = useState(false);
  const [skip, setSkip] = useState(false);
  const baseline = known ? [2, 3, 4] : [];
  const required = closure(TASKS[task].targets);
  const plan = (skip ? TASKS[task].targets : required).filter(
    (n) => !baseline.includes(n),
  );
  const timeline = useMapTimeline(plan.map((n) => `${n} · ${CHAPTERS[n - 1]}`));
  // 输入缩短排课表时，effect 重建时钟之前也必须有合法的检查点。
  const step = Math.min(timeline.currentStep, plan.length - 1);
  const current = plan[step];
  // 只把先前真正通过先修检查的章加入已完成集合。
  const done = new Set(baseline);
  const checks = plan.map((n) => {
    const missing = PRE[n].filter((p) => !done.has(p));
    if (!missing.length) done.add(n);
    return missing;
  });
  const blocked = checks[step] ?? [];
  const reset = () => {
    timeline.goToStep(0);
    setTask(0);
    setKnown(false);
    setSkip(false);
  };
  return (
    <section
      className={BOX}
      data-map-lab="route"
      data-visual-kind="task-prerequisite-schedule"
      aria-label="实验三：按任务求阅读闭包"
    >
      <h3 className="mb-3 text-lg font-semibold">实验三 · 不是只读目标章</h3>
      <label className="block text-sm">
        实际任务
        <select
          className={CONTROL}
          value={task}
          onChange={(e) => {
            timeline.pause();
            setTask(Number(e.target.value));
          }}
        >
          {TASKS.map((t, i) => (
            <option key={t.name} value={i}>
              {t.name}
            </option>
          ))}
        </select>
      </label>
      <label className="mt-3 block text-sm">
        已读基础
        <select
          className={CONTROL}
          value={known ? "foundation" : "none"}
          onChange={(e) => {
            timeline.pause();
            setKnown(e.target.value === "foundation");
          }}
        >
          <option value="none">尚无</option>
          <option value="foundation">已读第2、3、4章</option>
        </select>
      </label>
      <button
        className={`${CONTROL} mt-3`}
        aria-pressed={skip}
        onClick={() => {
          timeline.pause();
          setSkip(!skip);
        }}
      >
        故障：只读目标章 · {skip ? "已注入" : "未注入"}
      </button>
      <p className="my-3 text-sm">
        先读前言确定问题；下列编号路线完成后回到参考文献追溯依据。高亮列为当前检查点，红叉表示该章先修未满足。
      </p>
      <p className="mb-3 text-sm">
        排课时间窗：第 {Math.floor(step / 4) * 4 + 1}–
        {Math.min(plan.length, Math.floor(step / 4) * 4 + 4)}{" "}
        步（离散阅读次序，不是小时）。方块为计划槽，红叉表示进度移到了该章但先修仍阻塞。
      </p>
      <svg
        viewBox={`0 0 336 ${Math.max(176, plan.length * 52 + 64)}`}
        className="block w-full"
        role="img"
        aria-label={`排课时间线${plan.join("、")}；当前第${current}章；缺失先修${blocked.join("、") || "无"}`}
      >
        {[0, 1, 2, 3].map((slot) => (
          <g key={slot}>
            <text
              x={160 + slot * 44}
              y="24"
              textAnchor="middle"
              fontSize="16"
              fill={C.muted}
            >
              {Math.floor(step / 4) * 4 + slot + 1}
            </text>
            <line
              x1={160 + slot * 44}
              y1="32"
              x2={160 + slot * 44}
              y2={plan.length * 52 + 48}
              stroke={slot === step % 4 ? C.accent : C.border}
              strokeDasharray="3 4"
            />
          </g>
        ))}
        {plan.map((n, i) => {
          const slot = i - Math.floor(step / 4) * 4;
          const label = [
            "争议",
            "语言分词",
            "Transformer",
            "目标解码",
            "上下文微调",
            "训练规模",
            "稀疏专家",
            "检索增强",
            "偏好对齐",
            "偏见有害性",
            "视觉语言",
            "环境影响",
          ][n - 1];
          const cy = 56 + i * 52;
          return (
            <g key={n}>
              <text x="4" y={cy + 6} fontSize="16" fill={C.text}>
                {n} {label}
              </text>
              <line
                x1="140"
                y1={cy + 22}
                x2="330"
                y2={cy + 22}
                stroke={C.border}
              />
              {slot >= 0 && slot < 4 ? (
                <g>
                  <rect
                    x={144 + slot * 44}
                    y={cy - 16}
                    width="32"
                    height="32"
                    rx="4"
                    fill={C.bg}
                    stroke={
                      checks[i].length
                        ? C.danger
                        : i === step
                          ? C.accent
                          : C.muted
                    }
                    strokeWidth="2"
                  />
                  {checks[i].length > 0 && (
                    <path
                      d={`M${150 + slot * 44} ${cy - 10} l20 20 m0 -20 l-20 20`}
                      stroke={C.danger}
                      strokeWidth="2"
                    />
                  )}
                </g>
              ) : (
                <text
                  x="228"
                  y={cy + 6}
                  textAnchor="middle"
                  fontSize="16"
                  fill={C.muted}
                >
                  {slot < 0 ? "前窗" : "后窗"}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <div
        className="my-3 border-l-2 border-accent pl-3 text-sm"
        aria-label="当前先修检查"
      >
        第{current}章逐项检查：
        {PRE[current].length
          ? PRE[current].map((p) => (
              <span className="block" key={p}>
                第{p}章：
                {blocked.includes(p)
                  ? "缺失，禁止跳过"
                  : "已在基础或先前有效课次中"}
              </span>
            ))
          : "独立入口，无编号先修"}
      </div>
      <output className="mt-3 block text-sm" data-result>
        完整闭包：{required.join("、")}；需读：{plan.join(" → ")}。当前{current}
        ：{blocked.length ? `阻塞，缺${blocked.join("、")}` : "可以进入"}。
      </output>
      <p className="mt-3 text-sm">任务交付：{TASKS[task].deliver}</p>
      <TimelineControls
        timeline={timeline}
        caption="先修检查只是阅读调度模拟，不评定学习能力。"
        reset={{ label: "完整重置", onClick: reset }}
      />
    </section>
  );
}
