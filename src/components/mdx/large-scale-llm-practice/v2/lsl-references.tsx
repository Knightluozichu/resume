"use client";

import { useState } from "react";
import {
  useTeachingTimeline,
  type BuildTimeline,
} from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const C = {
  ink: "var(--text-primary)",
  muted: "var(--text-secondary)",
  line: "var(--border)",
  bg: "var(--bg-elevated)",
  accent: "var(--accent)",
  bad: "var(--danger, var(--text-primary))",
};
const steps = [
  { label: "找到条目" },
  { label: "核对身份" },
  { label: "检查限定" },
  { label: "记录边界" },
] as const;
const build: BuildTimeline = (tl) => {
  const clock = { value: 0 };
  steps.forEach((s, i) => {
    tl.label(s.label, i * 900);
    tl.add(clock, { value: i + 1, duration: 900, ease: "linear" }, i * 900);
  });
};
const control =
  "block min-h-11 w-full rounded border border-border bg-background px-2 text-sm text-primary";
const button =
  "min-h-11 rounded border border-border px-3 py-2 text-sm text-primary";
const frame =
  "ref-lab not-prose my-6 rounded-xl border border-border p-3 text-primary";
function Rules() {
  return (
    <style>{`.ref-lab button,.ref-lab select,.ref-lab input{min-height:44px;min-width:44px}.ref-lab .justify-center{flex-wrap:wrap}.ref-lab svg{display:block;width:100%;max-width:420px;margin:0 auto;height:auto}.ref-lab select{max-width:100%}.ref-lab p{overflow-wrap:anywhere}`}</style>
  );
}

/** Book entries [2] and [48] converge to one work, not two replications. */
export function LslReferencesContextContractLab() {
  const [copies, setCopies] = useState("two");
  const [broken, setBroken] = useState(false);
  const timeline = useTeachingTimeline({ steps, build });
  const nodes =
    copies === "two"
      ? [
          { x: 82, label: "[2]" },
          { x: 248, label: "[48]" },
        ]
      : [
          { x: 55, label: "[2]" },
          { x: 165, label: "[48]" },
          { x: 275, label: "镜像" },
        ];
  const reset = () => {
    setCopies("two");
    setBroken(false);
    timeline.goToStep(0);
  };
  return (
    <section
      className={frame}
      data-ref-lab="citation"
      data-visual-kind="references-citation-identity-graph"
      aria-label="引文归并图实验"
    >
      <Rules />
      <h3 className="mb-3 text-lg font-semibold">引文图：两条著录，一篇研究</h3>
      <label className="block text-sm">
        引文入口
        <select
          aria-label="引文入口"
          className={control}
          value={copies}
          onChange={(e) => {
            setCopies(e.target.value);
            timeline.goToStep(0);
          }}
        >
          <option value="two">双条目 [2] 与 [48]</option>
          <option value="three">增加镜像入口</option>
        </select>
      </label>
      <svg
        viewBox="0 0 330 370"
        role="img"
        aria-label="主张连接书目条目，条目归并到同一篇 Attention Is All You Need；丢失身份时保留未知分支"
        fontSize="16"
        fill={C.ink}
        data-step={timeline.currentStep}
      >
        <text x="165" y="25" textAnchor="middle">
          主张：Transformer 的架构
        </text>
        {nodes.map((n, i) => (
          <g key={n.label}>
            <path
              d={`M165 72 L${n.x} 126`}
              fill="none"
              stroke={C.accent}
              strokeWidth="2"
            />
            <path
              data-citation-edge={n.label}
              d={`M${n.x} 166 L${broken && i === nodes.length - 1 ? 270 : 165} 269`}
              fill="none"
              stroke={
                broken && i === nodes.length - 1
                  ? C.bad
                  : timeline.currentStep >= 1
                    ? C.accent
                    : C.line
              }
              strokeWidth="2"
              strokeDasharray={
                broken && i === nodes.length - 1 ? "5 5" : undefined
              }
            />
            <circle
              cx={n.x}
              cy="146"
              r="20"
              fill={C.bg}
              stroke={C.accent}
              strokeWidth="2"
            />
            <text x={n.x} y="151" textAnchor="middle">
              {n.label}
            </text>
          </g>
        ))}
        <circle
          cx="165"
          cy="52"
          r="20"
          fill={C.bg}
          stroke={C.accent}
          strokeWidth="2"
        />
        <text x="165" y="58" textAnchor="middle">
          C
        </text>

        <circle
          cx="165"
          cy="290"
          r="21"
          fill={C.bg}
          stroke={C.accent}
          strokeWidth="3"
        />
        <text x="165" y="296" textAnchor="middle">
          T
        </text>
        {broken && (
          <g>
            <circle
              cx="270"
              cy="290"
              r="21"
              fill={C.bg}
              stroke={C.bad}
              strokeDasharray="4 3"
            />
            <text x="270" y="296" textAnchor="middle">
              ?
            </text>
          </g>
        )}
        <text x="165" y="333" textAnchor="middle">
          T = 1706.03762
        </text>
        <text x="165" y="358" textAnchor="middle">
          {broken
            ? "1 篇已识别 + 1 个未知入口"
            : `${nodes.length} 个入口 → 1 篇作品`}
        </text>
      </svg>
      <button
        className={button}
        aria-label="切换引文身份缺失"
        aria-pressed={broken}
        onClick={() => setBroken(!broken)}
      >
        {broken ? "恢复身份连接" : "注入身份连接缺失"}
      </button>
      <p className="mt-3 text-sm" role="status">
        {broken
          ? "未知不等于独立：缺失分支不能计作另一项实验证据。"
          : "归并成功：[2] 与 [48] 不构成两次独立复现；镜像也不增加作品数。"}
      </p>
      <TimelineControls
        timeline={timeline}
        caption={
          [
            "从书目编号进入，编号不是作品身份。",
            "沿连接核对题名与作者，多个入口在 T 汇合。",
            "同一作品只提供同一研究的论据，不生成新实验。",
            "断边记为未知；恢复后仍只有一篇已识别作品。",
          ][timeline.currentStep]
        }
        reset={{ label: "重置引文图", onClick: reset }}
      />
    </section>
  );
}

/** Artifact identity is not the same thing as a page locator or a title. */
export function LslReferencesComputeTraceLab() {
  const [candidate, setCandidate] = useState("same");
  const [titleOnly, setTitleOnly] = useState(false);
  const timeline = useTeachingTimeline({ steps, build });
  const left = ["LLM-TAP", "第一版", "物理275", "df024a8b"];
  const right =
    candidate === "same"
      ? left
      : candidate === "page"
        ? ["LLM-TAP", "第一版", "物理276", "df024a8b"]
        : ["LLM-TAP", "异版夹具", "物理275", "demo-b"];
  const reset = () => {
    setCandidate("same");
    setTitleOnly(false);
    timeline.goToStep(0);
  };
  return (
    <section
      className={frame}
      data-ref-lab="identity"
      data-visual-kind="references-artifact-locator-comparison"
      aria-label="版本身份实验"
    >
      <Rules />
      <h3 className="mb-3 text-lg font-semibold">版本身份：同名不等于同证据</h3>
      <label className="block text-sm">
        待比较记录
        <select
          aria-label="待比较记录"
          className={control}
          value={candidate}
          onChange={(e) => {
            setCandidate(e.target.value);
            timeline.goToStep(0);
          }}
        >
          <option value="same">完全相同的定位</option>
          <option value="page">另一页，同一 PDF</option>
          <option value="edition">异版同名（教学夹具）</option>
        </select>
      </label>
      <svg
        viewBox="0 0 330 360"
        fontSize="16"
        fill={C.ink}
        role="img"
        aria-label="作品、版次、页定位和摘要逐字段比较；中间横线仅连接相同字段"
        data-step={timeline.currentStep}
      >
        <text x="82" y="25" textAnchor="middle">
          冻结记录
        </text>
        <text x="248" y="25" textAnchor="middle">
          候选记录
        </text>
        {left.map((value, i) => {
          const y = 63 + i * 68;
          const equal = value === right[i];
          return (
            <g key={i} data-identity-match={equal}>
              <text x="165" y={y} textAnchor="middle" fill={C.muted}>
                {["作品", "版次", "定位", "摘要前缀"][i]}
              </text>
              <rect
                x="12"
                y={y + 9}
                width="136"
                height="35"
                rx="4"
                fill={C.bg}
                stroke={i <= timeline.currentStep ? C.accent : C.line}
                strokeDasharray={titleOnly && i > 0 ? "4 4" : undefined}
              />
              <rect
                x="182"
                y={y + 9}
                width="136"
                height="35"
                rx="4"
                fill={C.bg}
                stroke={equal ? C.line : C.bad}
                strokeWidth={equal ? 1 : 2}
              />
              <text x="80" y={y + 32} textAnchor="middle">
                {value}
              </text>
              <text x="250" y={y + 32} textAnchor="middle">
                {right[i]}
              </text>
              {equal ? (
                <line
                  x1="148"
                  y1={y + 27}
                  x2="182"
                  y2={y + 27}
                  stroke={C.accent}
                  strokeWidth="3"
                  opacity={titleOnly && i > 0 ? 0.2 : 1}
                />
              ) : (
                <path
                  d={`M157 ${y + 19} l16 16 m0 -16 l-16 16`}
                  stroke={C.bad}
                  strokeWidth="2"
                />
              )}
            </g>
          );
        })}
        <text x="165" y="350" textAnchor="middle">
          {titleOnly ? "错误规则：只比作品名" : "身份与定位必须分开判断"}
        </text>
      </svg>
      <button
        className={button}
        aria-label="切换仅比较标题"
        aria-pressed={titleOnly}
        onClick={() => setTitleOnly(!titleOnly)}
      >
        {titleOnly ? "恢复完整比对" : "注入仅比较标题"}
      </button>
      <p role="status" className="mt-3 text-sm">
        {titleOnly
          ? candidate === "same"
            ? "此例恰好相同，但规则仍缺少版次、摘要和定位检查。"
            : "错误合并：标题相同却忽略了不同字段；图中差异并未消失。"
          : candidate === "same"
            ? "同一字节快照、同一定位。"
            : candidate === "page"
              ? "同一 PDF，不同定位；不能把物理276冒充物理275的条目。"
              : "仅作品名相同：异版夹具不得替代冻结证据。"}{" "}
        摘要仅展示前缀，实际核验使用完整 SHA256；demo-b 不是下载文件。
      </p>
      <TimelineControls
        timeline={timeline}
        caption={
          [
            "先匹配作品名；标题不是充分条件。",
            "再核对版次；出版日期不能代替版次。",
            "页定位回答在哪里，不回答字节是否相同。",
            "完整摘要锁定文件；同文件不同页仍是不同定位。",
          ][timeline.currentStep]
        }
        reset={{ label: "重置身份实验", onClick: reset }}
      />
    </section>
  );
}

/** Three-valued evidence matrix: direct support, missing support, outside scope. */
export function LslReferencesEvidenceGateLab() {
  const [scope, setScope] = useState("bounded");
  const [swapped, setSwapped] = useState(false);
  const timeline = useTeachingTimeline({ steps, build });
  const generalized = scope === "broad";
  const names = swapped ? ["[2]", "[139]", "[148]"] : ["[2]", "[148]", "[139]"];
  const reset = () => {
    setScope("bounded");
    setSwapped(false);
    timeline.goToStep(0);
  };
  return (
    <section
      className={frame}
      data-ref-lab="coverage"
      data-visual-kind="references-claim-support-matrix"
      aria-label="主张覆盖矩阵实验"
    >
      <Rules />
      <h3 className="mb-3 text-lg font-semibold">主张覆盖：缺证不等于反证</h3>
      <label className="block text-sm">
        主张范围
        <select
          aria-label="主张范围"
          className={control}
          value={scope}
          onChange={(e) => {
            setScope(e.target.value);
            timeline.goToStep(0);
          }}
        >
          <option value="bounded">限定为论文机制</option>
          <option value="broad">泛化为所有任务更快</option>
        </select>
      </label>
      <svg
        viewBox="0 0 330 370"
        fontSize="16"
        fill={C.ink}
        role="img"
        aria-label="行是架构、低秩增量、状态分片主张；列是三篇来源；圆圈为直接支持，问号为缺证，短线为范围外"
        data-step={timeline.currentStep}
      >
        {names.map((n, j) => (
          <text key={j} x={150 + j * 67} y="34" textAnchor="middle">
            {n}
          </text>
        ))}
        {["架构", "低秩增量", "状态分片"].map((name, i) => (
          <g key={name}>
            <text x="5" y={90 + i * 76}>
              {name}
            </text>
            {names.map((_, j) => {
              const expected = i === 0 ? 0 : swapped ? 3 - i : i;
              const direct = j === expected;
              const active = i <= timeline.currentStep;
              const missing = direct && generalized;
              return (
                <g
                  key={j}
                  data-cell={`${i}-${j}`}
                  data-evidence={
                    direct ? (missing ? "missing" : "support") : "outside"
                  }
                >
                  <rect
                    x={123 + j * 67}
                    y={58 + i * 76}
                    width="54"
                    height="54"
                    rx="3"
                    fill={C.bg}
                    stroke={
                      swapped && i > 0 && j === i
                        ? C.bad
                        : active
                          ? C.accent
                          : C.line
                    }
                    strokeDasharray={
                      swapped && i > 0 && j === i ? "4 3" : undefined
                    }
                    strokeWidth={active ? 2 : 1}
                  />
                  {direct ? (
                    missing ? (
                      <text
                        x={150 + j * 67}
                        y={92 + i * 76}
                        textAnchor="middle"
                        fill={C.bad}
                      >
                        ?
                      </text>
                    ) : (
                      <circle
                        cx={150 + j * 67}
                        cy={85 + i * 76}
                        r="12"
                        fill="none"
                        stroke={C.accent}
                        strokeWidth="3"
                      />
                    )
                  ) : (
                    <line
                      x1={142 + j * 67}
                      y1={85 + i * 76}
                      x2={158 + j * 67}
                      y2={85 + i * 76}
                      stroke={C.muted}
                      strokeWidth="2"
                    />
                  )}
                </g>
              );
            })}
          </g>
        ))}
        <text x="165" y="311" textAnchor="middle">
          ○ 直接支持　? 缺证　— 范围外
        </text>
        <text x="165" y="345" textAnchor="middle">
          {generalized
            ? "“所有任务更快”没有直接支持"
            : swapped
              ? "虚线格为错误引用位置"
              : "3 条限定主张，各有对应来源"}
        </text>
      </svg>
      <button
        className={button}
        aria-label="切换错配引文"
        aria-pressed={swapped}
        onClick={() => setSwapped(!swapped)}
      >
        {swapped ? "恢复引文绑定" : "注入 LoRA / ZeRO 错配"}
      </button>
      <p className="mt-3 text-sm" role="status">
        {generalized
          ? "0/3 条泛化主张得到直接支持；这不等于证明它们为假，需要同任务、硬件与基线的实测。"
          : swapped
            ? "1/3 条主张的引用位置正确；圆圈移到非对角位置，提示两条引文须交换回来。把 [139] 填到低秩增量的证据槽不会使它变成 LoRA 论文。"
            : "3/3 条限定主张有直接对应；这是教学索引检查，不是论文质量分数或实验复现。"}
      </p>
      <TimelineControls
        timeline={timeline}
        caption={
          [
            "[2] 对应架构描述，而非任意性能承诺。",
            "[148] 对应低秩增量，不是状态分片。",
            "[139] 对应训练状态的内存分片机制。",
            "不能支持的结论留空并说明缺什么实验。",
          ][timeline.currentStep]
        }
        reset={{ label: "重置覆盖矩阵", onClick: reset }}
      />
    </section>
  );
}
