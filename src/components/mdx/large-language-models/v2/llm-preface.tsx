"use client";

import { useState, type ReactNode } from "react";
import { useTeachingTimeline } from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const C = {
  bg: "var(--bg)",
  border: "var(--border)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
} as const;
const steps = ["来源", "中间状态", "页面结论"].map((label) => ({ label }));
function useReadingTrace() {
  return useTeachingTimeline({
    steps,
    build: (tl) => {
      const clock = { tick: 0 };
      steps.forEach((s, i) => tl.label(s.label, i * 900));
      tl.add(clock, { tick: 3, duration: 2700, ease: "linear" }, 0);
    },
  });
}
function Frame({
  id,
  title,
  children,
}: {
  id: "date" | "tree" | "citation";
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      data-preface={id}
      data-visual-kind={
        {
          date: "publication-month-cutoff",
          tree: "outline-depth-branch-tree",
          citation: "citation-support-propagation",
        }[id]
      }
      className="llm-preface-lab not-prose my-8 rounded-xl border border-border p-3 sm:p-5"
    >
      <style>{`.llm-preface-lab button,.llm-preface-lab select,.llm-preface-lab input{min-height:44px;min-width:44px}.llm-preface-lab button:focus-visible,.llm-preface-lab select:focus-visible,.llm-preface-lab input:focus-visible{outline:3px solid var(--accent);outline-offset:3px}.llm-preface-lab svg{display:block;width:100%;max-width:420px;margin:16px auto}.llm-preface-lab select{width:100%;border:1px solid var(--border);background:var(--bg);color:var(--text-primary);border-radius:6px;padding:8px}.llm-preface-lab label{display:block;margin:12px 0;font-size:14px}.llm-preface-lab p{font-size:14px;line-height:1.7}.llm-preface-lab svg text{font-family:inherit}`}</style>
      <h3 className="text-lg font-semibold">{title}</h3>
      {children}
    </section>
  );
}
function Fault({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      data-fault
      aria-pressed={active}
      onClick={onClick}
      className="my-2 w-full rounded-md border border-border px-3 py-2 text-sm"
    >
      {active ? "撤销故障：" : "注入故障："}
      {children}
    </button>
  );
}

/** 出版月份只切分时间相容性，绝不推断原书实际内容。 */
export function LlmPrefaceContextContractLab() {
  const [cutoff, setCutoff] = useState("2024-04");
  const [backdate, setBackdate] = useState(false);
  const tl = useReadingTrace();
  const dates = [
    "2019-06",
    "2020-05",
    "2023-07",
    backdate ? "2023-01" : "2025-01",
  ];
  const names = [
    "BERT · NAACL",
    "Few-shot · 预印本",
    "推测解码 · ICML",
    "教学虚构记录",
  ];
  const x = (date: string) =>
    30 +
    ((Number(date.slice(0, 4)) - 2019) * 12 + Number(date.slice(5)) - 1) * 3;
  const cutX = x(cutoff);
  const count = dates.filter((d) => d <= cutoff).length;
  return (
    <Frame id="date" title="01 / 出版时点切线">
      <label>
        截止月份
        <select
          aria-label="截止月份"
          value={cutoff}
          onChange={(e) => setCutoff(e.target.value)}
        >
          <option value="2024-04">2024-04 · 本书出版月</option>
          <option value="2023-12">2023-12 · 负例：均未跨界</option>
          <option value="2023-06">2023-06 · ICML 发表前</option>
        </select>
      </label>
      <svg
        viewBox="0 0 300 350"
        role="img"
        aria-label={`时间横轴，截止${cutoff}，${count}条时间相容，虚构记录${dates[3]}`}
      >
        <rect
          x="22"
          y="35"
          width={cutX - 22}
          height="268"
          fill={C.accent}
          opacity="0.08"
        />
        <path d="M22 305 H285" stroke={C.border} />
        {dates.map((date, i) => (
          <path
            key={date}
            data-cutoff-segment
            d={`M${cutX} ${61 + i * 65} V${100 + i * 65}`}
            stroke={C.accent}
            strokeWidth="2"
            strokeDasharray="5 4"
          />
        ))}
        <text x="24" y="22" fontSize="14" fill={C.text}>
          阴影：时间相容，不等于书中出现
        </text>
        {dates.map((d, i) => (
          <g key={names[i]}>
            <path d={`M22 ${68 + i * 65} H285`} stroke={C.border} />
            <circle
              cx={x(d)}
              cy={68 + i * 65}
              r={tl.currentStep === Math.min(i, 2) ? 8 : 5}
              fill={
                i === 3 && backdate
                  ? C.danger
                  : d <= cutoff
                    ? C.accent
                    : C.muted
              }
            />
            <text x="25" y={53 + i * 65} fontSize="14" fill={C.text}>
              {names[i]} · {d}
            </text>
          </g>
        ))}
        <text x="24" y="333" fontSize="14" fill={C.muted}>
          2019
        </text>
        <text x="245" y="333" fontSize="14" fill={C.muted}>
          2026
        </text>
      </svg>
      <p data-result>
        时间相容 {count}/4；后续 {4 - count}/4。2025
        条目是教学虚构，不对应真实模型。当前扫描：{steps[tl.currentStep].label}
        。
      </p>
      <Fault active={backdate} onClick={() => setBackdate(!backdate)}>
        把虚构记录倒填到 2023
      </Fault>
      <TimelineControls
        timeline={tl}
        reset={{
          label: "完整重置",
          onClick: () => {
            setCutoff("2024-04");
            setBackdate(false);
            tl.seek(0);
          },
        }}
      />
    </Frame>
  );
}

const chapterBranches = {
  "3": [0, 0, 2, 0, 0, 4, 6, 0],
  "9": [6, 0, 0, 0, 0, 0, 0],
} as const;
/** 真目录的三层分叉；灰色空心叶=浅来源没有列出，非不存在。 */
export function LlmPrefaceComputeTraceLab() {
  const [chapter, setChapter] = useState<"3" | "9">("3");
  const [depth, setDepth] = useState("shallow");
  const [erase, setErase] = useState(false);
  const tl = useReadingTrace();
  const branches = chapterBranches[chapter];
  const deep = branches.reduce<number>((a, b) => a + b, 0);
  const denominator = 1 + branches.length + (erase ? 0 : deep);
  return (
    <Frame id="tree" title="02 / 目录深度分叉树">
      <label>
        观察章节
        <select
          aria-label="观察章节"
          value={chapter}
          onChange={(e) => setChapter(e.target.value as "3" | "9")}
        >
          <option value="3">第3章 · Transformer</option>
          <option value="9">第9章 · 对齐语言模型与人类偏好</option>
        </select>
      </label>
      <label>
        来源深度
        <select
          aria-label="来源深度"
          value={depth}
          onChange={(e) => setDepth(e.target.value)}
        >
          <option value="shallow">得到 · 浅层目录</option>
          <option value="deep">豆瓣 · 细层目录</option>
        </select>
      </label>
      <svg
        viewBox="0 0 300 410"
        role="img"
        aria-label={`第${chapter}章，${branches.length}个一级节，${deep}个深层节，分母${denominator}`}
      >
        <text x="16" y="23" fontSize="14" fill={C.text}>
          章根
        </text>
        <text x="95" y="23" fontSize="14" fill={C.text}>
          一级节
        </text>
        <text x="204" y="23" fontSize="14" fill={C.text}>
          深层节
        </text>
        <circle cx="37" cy="195" r="13" fill={C.accent} />
        <text x="37" y="200" textAnchor="middle" fontSize="14" fill={C.bg}>
          {chapter}
        </text>
        {branches.map((n, i) => {
          const y = 53 + i * 43;
          return (
            <g key={i}>
              <path
                d={`M50 195 L104 ${y}`}
                stroke={tl.currentStep >= 1 ? C.accent : C.border}
                fill="none"
              />
              <circle cx="109" cy={y} r="5" fill={C.accent} />
              <text x="121" y={y + 5} fontSize="14" fill={C.text}>
                {chapter}.{i + 1}
              </text>
              {!erase &&
                Array.from({ length: n }, (_, j) => (
                  <g key={j}>
                    <path
                      d={`M153 ${y} L${204 + j * 14} ${y + 16}`}
                      stroke={
                        tl.currentStep >= 2 && depth === "deep"
                          ? C.accent
                          : C.border
                      }
                    />
                    <circle
                      cx={204 + j * 14}
                      cy={y + 16}
                      r="4"
                      fill={depth === "deep" ? C.accent : C.bg}
                      stroke={depth === "deep" ? C.accent : C.muted}
                      strokeDasharray={depth === "shallow" ? "2 2" : undefined}
                    />
                  </g>
                ))}
            </g>
          );
        })}
        <text x="16" y="389" fontSize="14" fill={erase ? C.danger : C.muted}>
          {erase
            ? "错误：未列出的小节被删除"
            : "空心叶：浅来源未列出；实心叶：已列出"}
        </text>
      </svg>
      <p data-result>
        章内正式坐标分母：{denominator} = 1 + {branches.length} +{" "}
        {erase ? 0 : deep}。来源列出{" "}
        {1 + branches.length + (depth === "deep" ? deep : 0)}{" "}
        个；列出多少不改变真实分母。
      </p>
      <Fault active={erase} onClick={() => setErase(!erase)}>
        将“未列出”误作“不存在”
      </Fault>
      <TimelineControls
        timeline={tl}
        reset={{
          label: "完整重置",
          onClick: () => {
            setChapter("3");
            setDepth("shallow");
            setErase(false);
            tl.seek(0);
          },
        }}
      />
    </Frame>
  );
}
const claims = ["260 纸本页", "作者为熊涛", "示范不更新梯度"];
const sourceNames = ["豆瓣元数据", "馆藏书目", "Few-shot 摘要"];
const support = [[0, 1], [1], [2]];
/** 支持集合逐边取交集；摘录/本站说明不能凭转引扩大权威范围。 */
export function LlmPrefaceEvidenceGateLab() {
  const [claim, setClaim] = useState(0);
  const [source, setSource] = useState(0);
  const [broken, setBroken] = useState(false);
  const tl = useReadingTrace();
  const supported = support[source].includes(claim);
  const reached = supported && !broken && tl.currentStep === 2;
  return (
    <Frame id="citation" title="03 / 引文来源传递路径">
      <label>
        待核对主张
        <select
          aria-label="待核对主张"
          value={claim}
          onChange={(e) => setClaim(Number(e.target.value))}
        >
          {claims.map((c, i) => (
            <option key={c} value={i}>
              {c}
            </option>
          ))}
        </select>
      </label>
      <label>
        起始来源
        <select
          aria-label="起始来源"
          value={source}
          onChange={(e) => setSource(Number(e.target.value))}
        >
          {sourceNames.map((s, i) => (
            <option key={s} value={i}>
              {s}
            </option>
          ))}
        </select>
      </label>
      <svg
        viewBox="0 0 300 360"
        role="img"
        aria-label={`来源传递路径，支持${supported}，断链${broken}，已抵达${tl.currentStep + 1}层`}
      >
        {[0, 1].map((i) => (
          <g key={i}>
            <path
              d={`M55 ${91 + i * 105} V${153 + i * 105}`}
              stroke={
                (i === 1 && broken) || !supported
                  ? C.danger
                  : tl.currentStep > i
                    ? C.accent
                    : C.border
              }
              strokeWidth="4"
              strokeDasharray={
                (i === 1 && broken) || !supported ? "5 8" : undefined
              }
            />
            {i === 1 && broken && (
              <path
                d="M44 217 l22 22 m0 -22 l-22 22"
                stroke={C.danger}
                strokeWidth="3"
              />
            )}
          </g>
        ))}
        {[sourceNames[source], "摘录 / 来源链接", "本站阅读说明"].map(
          (name, i) => (
            <g key={i}>
              <circle
                cx="55"
                cy={66 + i * 105}
                r="24"
                fill={C.bg}
                stroke={
                  i <= tl.currentStep &&
                  (i === 0 || (supported && (!broken || i < 2)))
                    ? C.accent
                    : C.border
                }
                strokeWidth="3"
              />
              <text
                x="55"
                y={71 + i * 105}
                fontSize="15"
                textAnchor="middle"
                fill={C.text}
              >
                {i + 1}
              </text>
              <text x="94" y={62 + i * 105} fontSize="14" fill={C.text}>
                {name}
              </text>
              <text x="94" y={84 + i * 105} fontSize="14" fill={C.muted}>
                {i === 0
                  ? `支持集合 {${support[source].map((n) => n + 1).join(", ")}}`
                  : i > tl.currentStep
                    ? "尚未传递"
                    : supported && (!broken || i < 2)
                      ? `保留主张 {${claim + 1}}`
                      : "支持集合为空"}
              </text>
            </g>
          ),
        )}
        <text x="20" y="338" fontSize="14" fill={C.muted}>
          编号 1=页数 · 2=作者 · 3=摘要主张
        </text>
      </svg>
      <p data-result>
        源头支持：{supported ? "是" : "否"}；页面可追溯支持：
        {reached ? "已到达" : "未到达"}
        。这是人工标记的集合传播，不自动判定语义或验证原书正文忠实性；主张 3
        仅限 GPT-3 论文摘要的实验设置。
      </p>
      <Fault active={broken} onClick={() => setBroken(!broken)}>
        摘录丢失原始链接
      </Fault>
      <TimelineControls
        timeline={tl}
        reset={{
          label: "完整重置",
          onClick: () => {
            setClaim(0);
            setSource(0);
            setBroken(false);
            tl.seek(0);
          },
        }}
      />
    </Frame>
  );
}
