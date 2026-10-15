"use client";

import { useState, type ReactNode } from "react";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";
import {
  TimelineControls,
  TEACHING_BEAT_MS,
} from "../../anim/timeline-controls";

// 前言需求：调用不等于授权；小任务逐层展开且可定位错误；来源不能跨版本背书。
// 三个独立结构保留原 registry 导出名；本地预置数据，不调用模型或外部系统。
// 360 单位窄画布 + 16px 标签，避免把桌面大图缩成移动端小字；初始坐标均确定。
const C = {
  bg: "var(--bg)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  border: "var(--border)",
  accent: "var(--accent)",
  danger: "var(--danger)",
};
const button =
  "min-h-11 min-w-11 rounded-control border border-border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const boundarySteps = [
  { label: "question", caption: "问题进入应用" },
  { label: "data", caption: "资料作为数据进入模型" },
  { label: "authority", caption: "应用约束外部调用" },
  { label: "answer", caption: "按需求检查回答" },
] as const;
const taskSteps = [
  { label: "decompose", caption: "展开任务依赖" },
  { label: "observe", caption: "观察调用跨度" },
  { label: "compare", caption: "逐条比较预期答案" },
] as const;
const sourceSteps = [
  { label: "history", caption: "标出2024历史范围" },
  { label: "route", caption: "选择独立实验路线" },
  { label: "evidence", caption: "连接来源与待证结论" },
] as const;

function usePrefaceTimeline(steps: readonly TeachingStep[]) {
  return useTeachingTimeline({
    steps,
    build(tl) {
      const clock = { beat: 0 };
      steps.forEach((step, i) => {
        const start = i * TEACHING_BEAT_MS;
        tl.label(step.label, start);
        tl.add(
          clock,
          { beat: [i, i + 1], duration: TEACHING_BEAT_MS, ease: "linear" },
          start,
        );
      });
    },
  });
}

function Frame({
  kind,
  title,
  children,
}: {
  kind: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      data-visual-kind={kind}
      aria-label={title}
      className="lcp-preface-lab not-prose my-6 min-w-0 rounded-card border border-border bg-bg p-3 sm:p-5"
    >
      <h3 className="mb-3 text-lg font-semibold text-primary">{title}</h3>
      {children}
      <style>{`
        .lcp-preface-lab svg { display:block; width:100%; max-width:440px; height:auto; margin:auto; }
        .lcp-preface-lab svg text { fill:var(--text-primary); font-size:16px; }
        .lcp-preface-lab button, .lcp-preface-lab input[type=range] { min-width:44px; min-height:44px; }
        .lcp-preface-lab button[aria-pressed=true] { border-color:var(--accent); color:var(--accent); }
        .lcp-preface-lab button:focus-visible, .lcp-preface-lab input:focus-visible { outline:2px solid var(--accent); outline-offset:3px; }
        .lcp-preface-lab ol[aria-hidden=true] { display:none; }
        .lcp-preface-lab .mt-4.flex { flex-wrap:wrap; }
      `}</style>
    </section>
  );
}

function Controls({
  timeline,
  steps,
  reset,
}: {
  timeline: ReturnType<typeof usePrefaceTimeline>;
  steps: readonly TeachingStep[];
  reset: () => void;
}) {
  return (
    <TimelineControls
      timeline={timeline}
      labelText={Object.fromEntries(
        steps.map((s) => [s.label, s.caption ?? s.label]),
      )}
      reset={{ label: "重置全部", onClick: reset }}
    />
  );
}

function Path({
  d,
  danger = false,
  dashed = false,
}: {
  d: string;
  danger?: boolean;
  dashed?: boolean;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke={danger ? C.danger : C.accent}
      strokeWidth={3}
      strokeDasharray={dashed ? "7 5" : undefined}
    />
  );
}
function Cross({ x, y }: { x: number; y: number }) {
  return (
    <path
      d={`M${x - 8} ${y - 8}l16 16m0 -16l-16 16`}
      stroke={C.danger}
      strokeWidth={4}
      fill="none"
    />
  );
}
function Dot({
  x,
  y,
  label,
  danger = false,
}: {
  x: number;
  y: number;
  label: string;
  danger?: boolean;
}) {
  return (
    <g>
      <circle cx={x} cy={y} r={8} fill={danger ? C.danger : C.accent} />
      <text x={x} y={y + 29} textAnchor="middle">
        {label}
      </text>
    </g>
  );
}

/** 数据支路、控制回路和外部只读边界；不是 API 执行器。 */
export function LcpPrefaceVersionContractLab() {
  const timeline = usePrefaceTimeline(boundarySteps);
  const [retrieval, setRetrieval] = useState(true);
  const [injection, setInjection] = useState(false);
  const step = timeline.currentStep;
  return (
    <Frame
      kind="lcp-preface-data-control-trust"
      title="实验一：谁在传数据，谁有权执行？"
    >
      <p className="mb-3 text-sm text-secondary">
        实线＝资料与回答；虚线＝调用控制。文档不能给应用增加删除权限。
      </p>
      <svg
        viewBox="0 0 360 650"
        role="img"
        aria-label={`展馆时间问答的数据与控制路径。检索${retrieval ? "接通" : "关闭"}，${injection ? "文档含删除指令，越权支路在只读边界被截断" : "文档只含开放时间"}；当前${boundarySteps[step].caption}。`}
      >
        <text x={180} y={26} textAnchor="middle">
          需求：回答时间，并给出处
        </text>
        <circle
          cx={180}
          cy={66}
          r={16}
          fill="none"
          stroke={C.accent}
          strokeWidth={3}
        />
        <text x={180} y={104} textAnchor="middle">
          访客提问
        </text>
        <Path d="M180 114V145" dashed />
        <rect
          x={15}
          y={145}
          width={330}
          height={300}
          rx={24}
          fill="none"
          stroke={C.border}
          strokeWidth={2}
        />
        <text x={32} y={173}>
          应用内部
        </text>
        <path
          d="M100 195l38 38-38 38-38-38Z"
          fill="none"
          stroke={C.accent}
          strokeWidth={3}
        />
        <text x={100} y={302} textAnchor="middle">
          编排调用
        </text>
        <circle
          cx={260}
          cy={233}
          r={34}
          fill="none"
          stroke={C.accent}
          strokeWidth={3}
        />
        <text x={260} y={302} textAnchor="middle">
          模型
        </text>
        <Path d="M139 222H224m0 20h-85" dashed />
        <path
          d="M217 217l8 5-8 5m-71 10-8 5 8 5"
          fill="none"
          stroke={C.accent}
          strokeWidth={2}
        />
        {step >= 1 && retrieval && (
          <g data-path="retrieved-data">
            <path
              d="M230 353h64v56h-64Z M241 367h41m-41 13h32m-32 13h37"
              fill="none"
              stroke={injection ? C.danger : C.accent}
              strokeWidth={2}
            />
            <text x={190} y={432} textAnchor="middle">
              {injection ? "资料夹带：删除全部记录" : "资料 A：常规场17:00闭馆"}
            </text>
            <Path d="M260 350V273" />
          </g>
        )}
        {step >= 1 && !retrieval && (
          <g data-path="missing-data">
            <Path d="M260 350V290" dashed danger />
            <Cross x={260} y={328} />
            <text x={180} y={402} textAnchor="middle">
              无来源，不应猜一个时间
            </text>
          </g>
        )}
        <path
          d="M20 485H340"
          stroke={C.muted}
          strokeWidth={2}
          strokeDasharray="4 5"
        />
        <text x={180} y={476} textAnchor="middle">
          应用只授予查询权限
        </text>
        {step >= 2 && (
          <g data-path="readonly-call">
            <Path d="M100 272V524" dashed />
            <path
              d="M94 513l6 10 6-10"
              fill="none"
              stroke={C.accent}
              strokeWidth={2}
            />
            <ellipse
              cx={100}
              cy={539}
              rx={42}
              ry={12}
              fill={C.bg}
              stroke={C.accent}
              strokeWidth={2}
            />
            <path
              d="M58 539v38c0 16 84 16 84 0v-38"
              fill="none"
              stroke={C.accent}
              strokeWidth={2}
            />
            <text x={100} y={614} textAnchor="middle">
              外部只读查询
            </text>
          </g>
        )}
        {step >= 2 && retrieval && injection && (
          <g data-path="blocked-delete">
            <Path d="M290 357Q338 350 318 458" dashed danger />
            <Cross x={318} y={458} />
            <text x={245} y={530} textAnchor="middle">
              删除未执行
            </text>
          </g>
        )}
        {step >= 3 && (
          <g data-path="answer-check">
            <Path d="M100 320H35V633H180" />
            <circle
              cx={180}
              cy={633}
              r={10}
              fill={retrieval ? C.accent : C.danger}
            />
            <text x={257} y={630} textAnchor="middle">
              {retrieval ? "核对时间与出处" : "缺资料应拒答"}
            </text>
          </g>
        )}
      </svg>
      <div className="my-3 flex flex-wrap gap-2">
        <button
          type="button"
          className={button}
          aria-pressed={retrieval}
          onClick={() => {
            setRetrieval(!retrieval);
            timeline.goToStep(1);
          }}
        >
          接入检索资料
        </button>
        <button
          type="button"
          className={button}
          aria-pressed={injection}
          onClick={() => {
            setInjection(!injection);
            setRetrieval(true);
            timeline.goToStep(2);
          }}
        >
          故障：资料夹带指令
        </button>
      </div>
      <p role="status" className="text-sm text-secondary">
        {injection && retrieval
          ? "出现红色越权支路，但数据库没有删除操作。模型看到指令≠应用获得权限；检查资料污染仍需独立进行。"
          : retrieval
            ? "框架连接资料与模型；应用决定只读权限，读者用“时间＋出处”检查结果。"
            : "撤掉资料后失去可核对出处；更换框架不能补回缺失的数据。"}
      </p>
      <Controls
        timeline={timeline}
        steps={boundarySteps}
        reset={() => {
          timeline.seek(0);
          setRetrieval(true);
          setInjection(false);
        }}
      />
    </Frame>
  );
}

/** 展馆问答的渐进数据依赖图与顺序跨度；先选来源再抽取，不冒充性能采样。 */
export function LcpPrefaceRunnableTraceLab() {
  const timeline = usePrefaceTimeline(taskSteps);
  const [level, setLevel] = useState(1);
  const [wrongDocument, setWrongDocument] = useState(false);
  const labels = [
    "接收问题",
    ...(level >= 2 ? ["检索候选", "选择出处"] : ["读固定摘录"]),
    "抽取时间",
    ...(level >= 3 ? ["查询临时场次", "合并查询结果"] : []),
    "回答与核对",
  ];
  const step = timeline.currentStep;
  const failed = wrongDocument && level >= 2;
  const outcomes = [
    ["常规场", "17:00 / A", "17:00 / A"],
    ["夜场", "20:00 / B", failed ? "17:00 / A" : "20:00 / B"],
    ["未收录", "资料不足", "资料不足"],
  ];
  return (
    <Frame
      kind="lcp-preface-task-tree-spans"
      title="实验二：一次只增加一种不确定性"
    >
      <p className="mb-3 text-sm text-secondary">
        第1层每题给定相应摘录；增加检索后，先选出处再抽取该来源，第3层在抽取后只读查询并合并。上图连线向下表示数据依赖；下图条带严格按先后排列，不是实测耗时。未收录样本直接拒答，不执行后续抽取。
      </p>
      <svg
        viewBox="0 0 360 740"
        role="img"
        aria-label={`第${level}级数据依赖图，共${labels.length}个子任务。${failed ? "夜场错选常规资料，错误传播到回答，三条中两条符合预期" : "三条预置核对样本符合预期"}。当前${taskSteps[step].caption}。`}
      >
        <Dot x={180} y={35} label="接收问题" />
        <Path d="M180 72V97" />
        <Dot x={180} y={105} label={level >= 2 ? "检索候选" : "给定固定摘录"} />
        {level >= 2 && (
          <g data-task="retrieval">
            <Path d="M180 143V167" danger={failed} />
            <Dot
              x={180}
              y={175}
              label={failed ? "错选 A" : "选择出处"}
              danger={failed}
            />
            {failed && <Cross x={218} y={175} />}
          </g>
        )}
        <g data-task="source-to-extraction">
          <Path
            d={level >= 2 ? "M180 213V237" : "M180 143V237"}
            danger={failed}
          />
          <Dot
            x={180}
            y={245}
            label={failed ? "抽取 A：17:00" : "抽取来源时间"}
            danger={failed}
          />
        </g>
        {level >= 3 ? (
          <g data-task="live-query">
            <Path d="M180 283L83 312" />
            <Dot x={83} y={320} label="只读查询" />
            <Path d="M188 245H277V312" danger={failed} />
            <Path d="M91 320H269" />
            <Dot x={277} y={320} label="合并场次" danger={failed} />
            <Path d="M277 358L180 378" danger={failed} />
          </g>
        ) : (
          <Path d="M180 283V378" danger={failed} />
        )}
        <Dot x={180} y={386} label="回答与核对" danger={failed} />
        <path d="M22 443H338" stroke={C.border} />
        <text x={22} y={469}>
          调用跨度（先后，非耗时）
        </text>
        {step >= 1 &&
          labels.map((label, i) => {
            const y = 491 + i * 31;
            const x = 155 + i * 22;
            const width = 20;
            const error =
              failed &&
              (label === "选择出处" ||
                label === "抽取时间" ||
                label === "合并查询结果" ||
                label === "回答与核对");
            return (
              <g key={label} data-span={label}>
                <text x={22} y={y + 16}>
                  {label}
                </text>
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={20}
                  rx={3}
                  fill={error ? C.danger : C.accent}
                  opacity={0.75}
                />
                {error && (
                  <path
                    d={`M${x} ${y + 10}h${width}`}
                    stroke={C.bg}
                    strokeDasharray="3 3"
                  />
                )}
              </g>
            );
          })}
        {step === 0 && (
          <text x={180} y={540} textAnchor="middle">
            下一步展开调用跨度
          </text>
        )}
        {step >= 2 && (
          <text x={180} y={731} textAnchor="middle">
            {failed
              ? "首个差异：选择出处，不是抽取"
              : "逐条检查时间与出处，不只看流畅度"}
          </text>
        )}
      </svg>
      <div
        className="my-3 flex flex-wrap gap-2"
        role="group"
        aria-label="渐进任务层级"
      >
        {[1, 2, 3].map((n) => (
          <button
            type="button"
            key={n}
            className={button}
            aria-pressed={level === n}
            onClick={() => {
              setLevel(n);
              timeline.goToStep(1);
            }}
          >
            {n === 1 ? "1 固定摘录" : n === 2 ? "2 加入检索" : "3 加入只读查询"}
          </button>
        ))}
        <button
          type="button"
          className={button}
          aria-pressed={wrongDocument}
          onClick={() => {
            setWrongDocument(!wrongDocument);
            setLevel(Math.max(2, level));
            timeline.goToStep(2);
          }}
        >
          故障：夜场错选资料
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <caption className="mb-2 text-left">
            预置核对样本（非真实模型评测）：A 常规17:00，B 夜场20:00
          </caption>
          <thead>
            <tr>
              <th scope="col">问题</th>
              <th scope="col">预期</th>
              <th scope="col">模拟结果</th>
            </tr>
          </thead>
          <tbody>
            {outcomes.map(([query, expected, actual]) => (
              <tr key={query}>
                <th scope="row" className="py-2 font-normal">
                  {query}
                </th>
                <td>{expected}</td>
                <td>
                  {actual}
                  {actual !== expected ? " ×" : " ✓"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p role="status" className="mt-3 text-sm text-secondary">
        {failed
          ? "2/3 条符合预期。选择了错误资料，后续抽取即使忠实也会答错；先修选择规则，不要先增加代理循环。"
          : "3/3 条预置样本符合预期，仅证明此演示数据的规则，不代表任何模型或框架的准确率。"}
      </p>
      <Controls
        timeline={timeline}
        steps={taskSteps}
        reset={() => {
          timeline.seek(0);
          setLevel(1);
          setWrongDocument(false);
        }}
      />
    </Frame>
  );
}

/** 学习路线分叉 + 有类型的来源归因，刻意不把旧导出名解释成发布门。 */
export function LcpPrefaceReleaseGateLab() {
  const timeline = usePrefaceTimeline(sourceSteps);
  const [route, setRoute] = useState<"classic" | "v1">("v1");
  const [claim, setClaim] = useState<"api" | "companion" | "fulltext">("api");
  const [mixedImports, setMixedImports] = useState(false);
  const step = timeline.currentStep;
  const sourceY = claim === "api" ? 536 : 440;
  const supported = claim !== "fulltext";
  return (
    <Frame
      kind="lcp-preface-version-evidence-branches"
      title="实验三：这份来源能证明哪句话？"
    >
      <p className="mb-3 text-sm text-secondary">
        上半图是学习路线，不是包的完整发展史；下半图连的是来源与结论，不是网页可访问性评分。
      </p>
      <svg
        viewBox="0 0 360 680"
        role="img"
        aria-label={`2024纸书历史范围分为${route === "v1" ? "当前v1与LangGraph" : "classic旧接口兼容"}学习路线。${mixedImports ? "混用导入造成路线交叉" : "两路线分开记录依赖"}。${claim === "api" ? "官方v1文档支持当前接口定位" : claim === "companion" ? "作者笔记支持公开伴学定位" : "作者笔记不能证明纸书全文"}。`}
      >
        <text x={180} y={28} textAnchor="middle">
          2024-04 纸书：历史范围
        </text>
        <circle cx={180} cy={60} r={10} fill={C.accent} />
        <text x={180} y={99} textAnchor="middle">
          不从出版年份猜依赖版本
        </text>
        {step >= 1 && (
          <g data-version="fork">
            <Path d="M180 108L83 165m97-57 97 57" />
            <circle
              cx={83}
              cy={178}
              r={route === "classic" ? 19 : 10}
              fill="none"
              stroke={C.accent}
              strokeWidth={3}
            />
            <circle
              cx={277}
              cy={178}
              r={route === "v1" ? 19 : 10}
              fill="none"
              stroke={C.accent}
              strokeWidth={3}
            />
            <text x={83} y={218} textAnchor="middle">
              classic 兼容
            </text>
            <text x={277} y={218} textAnchor="middle">
              v1 新接口
            </text>
            <Path d={route === "classic" ? "M83 231V270" : "M277 231V270"} />
            <text x={83} y={295} textAnchor="middle">
              旧 Chain 等
            </text>
            <text x={277} y={295} textAnchor="middle">
              create_agent
            </text>
            <text x={277} y={322} textAnchor="middle">
              基于 LangGraph
            </text>
            {mixedImports && (
              <g data-version="mixed">
                <Path d="M83 237Q180 320 277 237" danger dashed />
                <Cross x={180} y={279} />
                <text x={180} y={355} textAnchor="middle">
                  交叉导入不等于语义兼容
                </text>
              </g>
            )}
          </g>
        )}
        {step === 0 && (
          <text x={180} y={210} textAnchor="middle">
            下一步展开两条学习路线
          </text>
        )}
        <path d="M22 381H338" stroke={C.border} />
        <text x={22} y={411}>
          来源
        </text>
        <text x={270} y={411} textAnchor="middle">
          待证结论
        </text>
        <g>
          <path d="M35 425h104v31H35Z m10-15h83" fill="none" stroke={C.muted} />
          <text x={87} y={481} textAnchor="middle">
            作者笔记
          </text>
        </g>
        <g>
          <path d="M35 521h104v31H35Z m10-15h83" fill="none" stroke={C.muted} />
          <text x={87} y={577} textAnchor="middle">
            官方 v1 文档
          </text>
        </g>
        {step >= 2 && (
          <g data-evidence={supported ? "supported" : "unsupported"}>
            <Path
              d={`M143 ${sourceY}Q190 ${sourceY} 226 500`}
              danger={!supported}
              dashed={!supported}
            />
            <circle
              cx={269}
              cy={500}
              r={34}
              fill="none"
              stroke={supported ? C.accent : C.danger}
              strokeWidth={3}
            />
            {!supported && <Cross x={194} y={470} />}
            <text x={269} y={563} textAnchor="middle">
              {claim === "api"
                ? "当前接口"
                : claim === "companion"
                  ? "公开伴学"
                  : "纸书全文"}
            </text>
            <text x={180} y={626} textAnchor="middle">
              {supported ? "来源范围与结论相符" : "没有纸书全文证据"}
            </text>
          </g>
        )}
        <text x={180} y={663} textAnchor="middle">
          目录只限定范围，不证明正文或运行结果
        </text>
      </svg>
      <div
        className="my-3 flex flex-wrap gap-2"
        role="group"
        aria-label="选择学习路线"
      >
        <button
          type="button"
          className={button}
          aria-pressed={route === "classic"}
          onClick={() => {
            setRoute("classic");
            timeline.goToStep(1);
          }}
        >
          classic 路线
        </button>
        <button
          type="button"
          className={button}
          aria-pressed={route === "v1"}
          onClick={() => {
            setRoute("v1");
            timeline.goToStep(1);
          }}
        >
          v1 / LangGraph 路线
        </button>
        <button
          type="button"
          className={button}
          aria-pressed={mixedImports}
          onClick={() => {
            setMixedImports(!mixedImports);
            timeline.goToStep(1);
          }}
        >
          故障：混用导入
        </button>
      </div>
      <div
        className="my-3 flex flex-wrap gap-2"
        role="group"
        aria-label="选择待证结论"
      >
        <button
          type="button"
          className={button}
          aria-pressed={claim === "api"}
          onClick={() => {
            setClaim("api");
            timeline.goToStep(2);
          }}
        >
          证明当前接口
        </button>
        <button
          type="button"
          className={button}
          aria-pressed={claim === "companion"}
          onClick={() => {
            setClaim("companion");
            timeline.goToStep(2);
          }}
        >
          证明公开伴学
        </button>
        <button
          type="button"
          className={button}
          aria-pressed={claim === "fulltext"}
          onClick={() => {
            setClaim("fulltext");
            timeline.goToStep(2);
          }}
        >
          误归因：证明纸书全文
        </button>
      </div>
      <p role="status" className="text-sm text-secondary">
        {claim === "fulltext"
          ? "断线表示证据不成立：作者公开笔记不是纸书全文，开放阅读也不自动授予改编许可。"
          : mixedImports
            ? "红色交叉是接口混用示意，不是实测异常。应分开环境、记录确切版本，再用相同输入检查行为。"
            : "官方文档解释现行接口，不能反向证明2024示例的精确依赖；本图不执行安装或迁移。"}
      </p>
      <Controls
        timeline={timeline}
        steps={sourceSteps}
        reset={() => {
          timeline.seek(0);
          setRoute("v1");
          setClaim("api");
          setMixedImports(false);
        }}
      />
    </Frame>
  );
}
