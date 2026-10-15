"use client";

import { useState } from "react";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";

const muted = "var(--text-secondary)";
const accent = "var(--accent)";
const border = "var(--border)";
const warning = "var(--warning)";
const paper = "var(--bg-primary)";
const postingSteps: readonly TeachingStep[] = [
  { label: "保留拼写" },
  { label: "展开页码" },
  { label: "上下文筛选" },
];
const rulerSteps: readonly TeachingStep[] = [
  { label: "读印刷页" },
  { label: "检查载体" },
  { label: "换算落点" },
];
const readingSteps: readonly TeachingStep[] = [
  { label: "补齐前提" },
  { label: "读定义" },
  { label: "返回目标" },
];
function useIndexTimeline(steps: readonly TeachingStep[]) {
  return useTeachingTimeline({
    steps,
    build: (tl) => {
      const clock = { value: 0 };
      steps.forEach((step, i) => {
        tl.label(step.label, i * 900);
        tl.add(clock, { value: i + 1, duration: 900, ease: "linear" }, i * 900);
      });
    },
  });
}
function IndexStyles() {
  return (
    <style>{`
    .index-lab { border:1px solid var(--border); border-radius:12px; padding:12px; margin:24px 0; color:var(--text-primary); }
    .index-lab h4 { font-size:1.1rem; margin:0 0 12px; }
    .index-lab p,.index-lab output { line-height:1.7; margin:12px 0; overflow-wrap:anywhere; }
    .index-lab output { display:block; font-variant-numeric:tabular-nums; }
    .index-lab svg { display:block; width:100%; max-width:440px; height:auto; margin:16px auto; }
    .index-lab svg text { fill:var(--text-primary); font-size:16px; font-family:inherit; }
    .index-lab .index-inputs { display:flex; flex-wrap:wrap; align-items:end; gap:10px; }
    .index-lab label { display:flex; flex-direction:column; gap:5px; max-width:100%; }
    .index-lab select,.index-lab button { min-width:44px; min-height:44px; padding:8px; border:1px solid var(--border); border-radius:6px; color:var(--text-primary); background:var(--bg-primary); font-size:14px; white-space:normal; }
    .index-lab select { max-width:100%; width:100%; }
    .index-lab button[aria-pressed=true] { border:2px solid var(--warning); }
    .index-lab input[type=range] { min-height:44px; }
    .index-lab .mt-4.flex { flex-wrap:wrap; }
    .index-lab :focus-visible { outline:2px solid var(--accent); outline-offset:3px; }
  `}</style>
  );
}

/** Preserve raw spellings before merging their one-to-many posting lists. */
export function LslIndexContextContractLab() {
  const [term, setTerm] = useState("icl");
  const [context, setContext] = useState("all");
  const [overwrite, setOverwrite] = useState(false);
  const timeline = useIndexTimeline(postingSteps);
  const pages = term === "icl" ? [3, 122] : [149, 197];
  const labels = term === "icl" ? ["概述", "适配"] : ["强化学习", "应用代理"];
  const active = pages.map(
    (_, i) =>
      !(overwrite && i === 0) &&
      (timeline.currentStep < 2 || context === "all" || context === String(i)),
  );
  const reset = () => {
    setTerm("icl");
    setContext("all");
    setOverwrite(false);
    timeline.goToStep(0);
  };
  return (
    <section
      className="index-lab not-prose"
      data-lab="postings"
      data-visual-kind="alias-posting-list-fanout"
      data-step={timeline.currentStep}
      data-fault={overwrite}
      aria-label="别名与一对多页码实验"
    >
      <IndexStyles />
      <h4>别名入口不是唯一页码</h4>
      <div className="index-inputs">
        <label>
          检索词
          <select
            aria-label="检索词"
            value={term}
            onChange={(e) => {
              setTerm(e.target.value);
              setContext("all");
              timeline.goToStep(0);
            }}
          >
            <option value="icl">ICL / 语境学习</option>
            <option value="agent">Agent / 智能体</option>
          </select>
        </label>
        <label>
          阅读上下文
          <select
            aria-label="阅读上下文"
            value={context}
            onChange={(e) => setContext(e.target.value)}
          >
            <option value="all">全部落点</option>
            <option value="0">A：{labels[0]}</option>
            <option value="1">B：{labels[1]}</option>
          </select>
        </label>
        <button
          type="button"
          aria-pressed={overwrite}
          onClick={() => setOverwrite(!overwrite)}
        >
          故障：只留最后页码
        </button>
      </div>
      <svg
        viewBox="0 0 340 330"
        role="img"
        aria-label={`别名扇出到印刷页 ${pages.join("、")}；上下文只筛选，不删除原始记录`}
      >
        <text x="170" y="30" textAnchor="middle">
          {term === "icl" ? "ICL / 语境学习" : "Agent / 智能体"}
        </text>
        <path d="M170 44 H40 V254" stroke={muted} fill="none" strokeWidth="2" />
        {pages.map((p, i) => {
          const y = 112 + i * 126;
          return (
            <g
              key={p}
              opacity={active[i] ? 1 : 0.3}
              data-posting={p}
              data-active={active[i]}
            >
              <path
                d={`M40 ${y} H94 M220 ${y} H246`}
                fill="none"
                stroke={overwrite && i === 0 ? warning : accent}
                strokeWidth={active[i] && timeline.currentStep > 0 ? 4 : 2}
                strokeDasharray={overwrite && i === 0 ? "5 5" : undefined}
              />
              <rect
                x="94"
                y={y - 23}
                width="126"
                height="46"
                rx="8"
                fill={paper}
                stroke={border}
              />
              <text x="157" y={y + 6} textAnchor="middle">
                {labels[i]}
              </text>
              <circle
                cx="278"
                cy={y}
                r="31"
                fill={paper}
                stroke={active[i] ? accent : border}
                strokeWidth="2"
              />
              <text x="278" y={y + 6} textAnchor="middle">
                {p}
              </text>
              <text x="157" y={y + 55} textAnchor="middle">
                {overwrite && i === 0 ? "覆盖后丢失" : `候选 ${i + 1} · 印刷页`}
              </text>
            </g>
          );
        })}
      </svg>
      <output aria-live="polite">
        {timeline.currentStep < 2
          ? "先保留所有落点；第 3 步才按上下文筛选。"
          : `当前候选：${pages.filter((_, i) => active[i]).join("、") || "空集（需要恢复丢失记录）"}。`}
        {overwrite
          ? " 故障删除首项，切换上下文也找不回来。"
          : " 未命中的候选仍保存在原始表中。"}
      </output>
      <p>
        {term === "icl"
          ? "原始词条：In-context Learning，ICL → 3；Incontext Learning, ICL → 122；语境学习 → 3, 122。这里合并检索入口，不宣称所有出现位置的论述完全相同。"
          : "原始词条 Agent 与智能体都指向 149, 197；智能代理指向 197。环境/动作语境与工具调用语境需要分别回读正文。"}
      </p>
      <TimelineControls
        timeline={timeline}
        reset={{ label: "重置", ariaLabel: "重置别名实验", onClick: reset }}
      />
    </section>
  );
}

/** A coordinate transform tied to one carrier, not an edition-independent offset. */
export function LslIndexComputeTraceLab() {
  const [printed, setPrinted] = useState(122);
  const [carrier, setCarrier] = useState("first");
  const [missingOffset, setMissingOffset] = useState(false);
  const timeline = useIndexTimeline(rulerSteps);
  const known = carrier === "first";
  const physical = printed + 14;
  const landing = missingOffset ? printed : physical;
  const reset = () => {
    setPrinted(122);
    setCarrier("first");
    setMissingOffset(false);
    timeline.goToStep(0);
  };
  return (
    <section
      className="index-lab not-prose"
      data-lab="coordinates"
      data-visual-kind="printed-pdf-dual-ruler"
      data-step={timeline.currentStep}
      data-fault={missingOffset}
      aria-label="印刷页与PDF坐标实验"
    >
      <IndexStyles />
      <h4>页码是带载体的坐标</h4>
      <div className="index-inputs">
        <label>
          索引印刷页
          <select
            aria-label="索引印刷页"
            value={printed}
            onChange={(e) => setPrinted(Number(e.target.value))}
          >
            <option value={3}>3 · ICL 概述</option>
            <option value={122}>122 · 上下文学习</option>
            <option value={240}>240 · 困惑度</option>
          </select>
        </label>
        <label>
          载体映射
          <select
            aria-label="载体映射"
            value={carrier}
            onChange={(e) => setCarrier(e.target.value)}
          >
            <option value="first">First · 已核对作者稿</option>
            <option value="unknown">Unmapped · 其他版本</option>
          </select>
        </label>
        <button
          type="button"
          aria-pressed={missingOffset}
          onClick={() => setMissingOffset(!missingOffset)}
        >
          故障：漏加 14 页
        </button>
      </div>
      <svg
        viewBox="0 0 340 360"
        role="img"
        aria-label={`印刷 ${printed} 对应已核对PDF物理 ${physical}；${known ? `当前落点 ${landing}` : "版本未映射，不跳转"}`}
      >
        <text x="74" y="28" textAnchor="middle">
          印刷坐标
        </text>
        <text x="265" y="28" textAnchor="middle">
          PDF物理页
        </text>
        <path d="M74 55 V254 M265 55 V254" stroke={border} strokeWidth="3" />
        {[-2, -1, 0, 1, 2].map((d, i) => (
          <g key={d}>
            <path
              d={`M64 ${75 + i * 42} H84 M255 ${75 + i * 42} H275`}
              stroke={muted}
            />
            <text x="48" y={81 + i * 42} textAnchor="end">
              {printed + d}
            </text>
            <text x="290" y={81 + i * 42}>
              {known ? physical + d : "?"}
            </text>
          </g>
        ))}
        <circle cx="74" cy="159" r="9" fill={accent} />
        {timeline.currentStep > 0 && known && (
          <path
            d={missingOffset ? "M84 159 H180 V300 H255" : "M84 159 H255"}
            stroke={missingOffset ? warning : accent}
            strokeWidth="3"
            fill="none"
          />
        )}
        {timeline.currentStep > 0 && !known && (
          <g>
            <path
              d="M84 159 H160 M185 147 L169 171 M185 171 L169 147"
              stroke={warning}
              strokeWidth="3"
            />
            <text x="170" y="205" textAnchor="middle">
              没有映射：停止
            </text>
          </g>
        )}
        {timeline.currentStep === 2 && known && (
          <g>
            <circle
              cx="265"
              cy={missingOffset ? 300 : 159}
              r="9"
              fill={missingOffset ? warning : accent}
            />
            <text x="170" y="333" textAnchor="middle">
              {missingOffset
                ? `错落物理 ${landing}，差 14 页`
                : `${printed} + 14 = ${physical}`}
            </text>
          </g>
        )}
        {missingOffset && known && (
          <text x="265" y="282" textAnchor="middle">
            {landing}（尺外）
          </text>
        )}
        <text x="170" y="64" textAnchor="middle">
          {known ? "+14" : "未知偏移"}
        </text>
      </svg>
      <output aria-live="polite">
        {!known
          ? "拒绝跳转：其他版本必须先建立独立映射。"
          : timeline.currentStep < 2
            ? `待换算：印刷 ${printed}；作者稿映射已知。`
            : missingOffset
              ? `错页：把印刷 ${printed} 当成物理 ${landing}；正确目标是物理 ${physical}。`
              : `定位成功：印刷 ${printed} → 物理 ${physical}。仅适用于本作者稿。`}
      </output>
      <TimelineControls
        timeline={timeline}
        reset={{ label: "重置", ariaLabel: "重置坐标实验", onClick: reset }}
      />
    </section>
  );
}

/** Reading prerequisites are authored navigation, not implications proved by an index. */
export function LslIndexEvidenceGateLab() {
  const [target, setTarget] = useState("ppl");
  const [shortcut, setShortcut] = useState(false);
  const timeline = useIndexTimeline(readingSteps);
  const ppl = target === "ppl";
  const labels = ppl
    ? ["词序列概率", "长度与词元", "交叉熵", "困惑度"]
    : ["真实类别", "预测类别", "混淆矩阵", "精确率"];
  const pages = ppl ? [1, 52, 240, 240] : [237, 237, 237, 238];
  const positions = [
    [90, 95],
    [250, 95],
    [170, 215],
    [170, 335],
  ];
  const reached = (i: number) =>
    shortcut
      ? i === 3
      : i < 2 ||
        (i === 2 && timeline.currentStep >= 1) ||
        (i === 3 && timeline.currentStep >= 2);
  const reset = () => {
    setTarget("ppl");
    setShortcut(false);
    timeline.goToStep(0);
  };
  return (
    <section
      className="index-lab not-prose"
      data-lab="dependencies"
      data-visual-kind="prerequisite-reading-dag"
      data-step={timeline.currentStep}
      data-fault={shortcut}
      aria-label="知识依赖阅读导航实验"
    >
      <IndexStyles />
      <h4>沿前提阅读，不沿页码猜结论</h4>
      <p>图中连线是本站独立阅读建议，不是原索引的内容或证明。</p>
      <div className="index-inputs">
        <label>
          阅读目标
          <select
            aria-label="阅读目标"
            value={target}
            onChange={(e) => {
              setTarget(e.target.value);
              timeline.goToStep(0);
            }}
          >
            <option value="ppl">Perplexity · 困惑度</option>
            <option value="precision">Precision · 精确率</option>
          </select>
        </label>
        <button
          type="button"
          aria-pressed={shortcut}
          onClick={() => setShortcut(!shortcut)}
        >
          故障：把索引当证明
        </button>
      </div>
      <svg
        viewBox="0 0 340 420"
        role="img"
        aria-label={`${labels.join("、")}的阅读依赖；连线是本站教学顺序，不是原索引的语义证明`}
      >
        <g
          fill="none"
          stroke={shortcut ? border : accent}
          strokeWidth="2"
          strokeDasharray={shortcut ? "5 5" : undefined}
        >
          <path d="M90 117 V157 L153 200 M250 117 V157 L187 200" />
          <path
            d="M148 215 H35 V335 H148"
            opacity={timeline.currentStep > 0 ? 1 : 0.35}
          />
        </g>
        {shortcut && (
          <path
            d="M316 95 V335 H192"
            fill="none"
            stroke={warning}
            strokeWidth="3"
          />
        )}
        {positions.map(([x, y], i) => (
          <g key={i} data-node={i} data-reached={reached(i)}>
            <circle
              cx={x}
              cy={y}
              r="22"
              fill={paper}
              stroke={reached(i) ? (shortcut ? warning : accent) : border}
              strokeWidth={reached(i) ? 4 : 2}
            />
            <text x={x} y={y + 6} textAnchor="middle">
              {i + 1}
            </text>
            <text x={x} y={i < 2 ? y - 53 : y + 47} textAnchor="middle">
              {labels[i]}
            </text>
            <text x={x} y={i < 2 ? y - 30 : y + 68} textAnchor="middle">
              p.{pages[i]}
            </text>
          </g>
        ))}
      </svg>
      <output aria-live="polite">
        {shortcut
          ? "只找到目标词，前提尚未核对：不能据此断言指标定义或模型质量。"
          : timeline.currentStep === 0
            ? `先核对 ${labels[0]} 与 ${labels[1]} 的对象。`
            : timeline.currentStep === 1
              ? `回读 ${labels[2]} 的定义与分母，再向目标前进。`
              : `已走完建议阅读路径；${labels[3]} 的含义仍须由正文公式核验，索引不证明结论。`}
      </output>
      <p>
        {ppl
          ? "不同词元切分会改变困惑度的比较单位。交叉熵的对数底须与指数还原的底匹配；仅换底并正确还原不改变困惑度。p.52 只补词元背景，不是索引声明的依赖边。"
          : "精确率关心预测为正的集合；先核对混淆矩阵里真阳性和假阳性，不能因为索引有 Accuracy 就用准确率替代它。"}
      </p>
      <TimelineControls
        timeline={timeline}
        reset={{ label: "重置", ariaLabel: "重置依赖实验", onClick: reset }}
      />
    </section>
  );
}
