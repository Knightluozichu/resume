"use client";

import { useState } from "react";

import { DiagramCaption, DiagramTitle, T } from "../poeaa-svg-primitives";

const VIEW_W = 900;
const VIEW_H = 520;
const SUCCESS = T.success;
const WARNING = T.warning;
const DANGER = T.danger;

export type Poeaa24Pattern23QueryObjectStep = 1 | 2 | 3;

export type Poeaa24Pattern23QueryObjectProps = {
  /** 固定显示某一个阶段，供正文 Stepper 输出可复核快照。 */
  step?: Poeaa24Pattern23QueryObjectStep;
  /** 主图保留步骤、故障开关和重置；Stepper 快照关闭交互。 */
  interactive?: boolean;
};

const STEP_COPY: Record<
  Poeaa24Pattern23QueryObjectStep,
  { label: string; title: string; note: string; color: string }
> = {
  1: {
    label: "领域意图",
    title: "只描述要查什么",
    note: "调用方选择受控字段；此时还没有表名、列名或数据库方言。",
    color: SUCCESS,
  },
  2: {
    label: "查询结构",
    title: "组合并校验条件",
    note: "查询对象保存 AND 结构，元数据校验在翻译前拒绝未知字段和值域。",
    color: T.accent,
  },
  3: {
    label: "执行边界",
    title: "翻译、绑定并恢复结果",
    note: "方言适配生成占位符，参数独立绑定，结果映射再恢复领域对象。",
    color: WARNING,
  },
};

function stageOpacity(
  current: Poeaa24Pattern23QueryObjectStep,
  stage: Poeaa24Pattern23QueryObjectStep,
) {
  if (current === stage) return 1;
  return current > stage ? 0.78 : 0.42;
}

function Arrow({
  markerId,
  x1,
  x2,
  label,
}: {
  markerId: string;
  x1: number;
  x2: number;
  label: string;
}) {
  return (
    <g>
      <line
        x1={x1}
        y1="196"
        x2={x2}
        y2="196"
        stroke={T.accent}
        strokeWidth="1.8"
        markerEnd={`url(#${markerId})`}
      />
      <text
        x={(x1 + x2) / 2}
        y="180"
        textAnchor="middle"
        fontSize="11"
        fill={T.accent}
      >
        {label}
      </text>
    </g>
  );
}

export function Poeaa24Pattern23QueryObjectDiagram({
  step = 1,
  interactive = true,
}: Poeaa24Pattern23QueryObjectProps) {
  const [activeStep, setActiveStep] =
    useState<Poeaa24Pattern23QueryObjectStep>(step);
  const [faultInjected, setFaultInjected] = useState(false);
  const visibleStep = interactive ? activeStep : step;
  const current = STEP_COPY[visibleStep];
  const markerId = interactive
    ? "poeaa24-query-object-arrow"
    : `poeaa24-query-object-arrow-step-${visibleStep}`;
  const faultMarkerId = `${markerId}-fault`;

  const reset = () => {
    setActiveStep(1);
    setFaultInjected(false);
  };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="poeaa-pattern23-query-object"
        className="rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            专属查询图 · 当前阶段：{current.label}
          </span>
          {interactive && (
            <button
              type="button"
              onClick={() => setFaultInjected((value) => !value)}
              aria-pressed={faultInjected}
              className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                faultInjected
                  ? "border-danger text-danger"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              {faultInjected ? "关闭拼接故障" : "注入拼接故障"}
            </button>
          )}
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`查询对象第${visibleStep}步：${current.title}。左侧是领域筛选意图，中间是保存条件树的 QueryObject，右侧是方言 SQL、参数与领域结果。${faultInjected ? "当前注入了直接拼接值的故障，参数化边界应拒绝它。" : current.note}`}
          className="mx-auto block h-auto w-full max-w-[900px]"
        >
          <defs>
            <marker
              id={markerId}
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L9 5 L0 10 Z" fill={T.accent} />
            </marker>
            <marker
              id={faultMarkerId}
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L9 5 L0 10 Z" fill={DANGER} />
            </marker>
          </defs>

          <DiagramTitle
            x={VIEW_W / 2}
            y={30}
            text="Query Object：意图 → 条件树 → 参数化查询"
          />
          <text
            x={VIEW_W / 2}
            y="54"
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            {current.title}
          </text>

          <g opacity={stageOpacity(visibleStep, 1)}>
            <rect
              x="28"
              y="86"
              width="250"
              height="230"
              rx="10"
              fill={T.bg}
              stroke={SUCCESS}
              strokeWidth="1.5"
            />
            <rect
              x="28"
              y="86"
              width="250"
              height="36"
              rx="10"
              fill={SUCCESS}
              fillOpacity="0.12"
            />
            <rect
              x="28"
              y="112"
              width="250"
              height="10"
              fill={SUCCESS}
              fillOpacity="0.12"
            />
            <text
              x="153"
              y="110"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={SUCCESS}
            >
              领域意图
            </text>
            <text x="46" y="151" fontSize="11" fill={T.secondary}>
              OrderFilter
            </text>
            <text x="46" y="174" fontSize="11" fontFamily="monospace" fill={T.primary}>
              status: "paid"
            </text>
            <text x="46" y="196" fontSize="11" fontFamily="monospace" fill={T.primary}>
              minTotal: 100
            </text>
            <text x="46" y="218" fontSize="11" fontFamily="monospace" fill={T.primary}>
              sort: "createdAt"
            </text>
            <line x1="46" y1="238" x2="260" y2="238" stroke={T.border} />
            <text x="46" y="263" fontSize="11" fill={SUCCESS}>
              不出现表名 / SQL 片段
            </text>
            <text x="46" y="289" fontSize="11" fill={T.secondary}>
              业务边界先固定允许值
            </text>
          </g>

          <Arrow markerId={markerId} x1={278} x2={330} label="构建" />

          <g opacity={stageOpacity(visibleStep, 2)}>
            <rect
              x="330"
              y="86"
              width="250"
              height="230"
              rx="10"
              fill={T.bg}
              stroke={T.accent}
              strokeWidth="1.5"
            />
            <rect
              x="330"
              y="86"
              width="250"
              height="36"
              rx="10"
              fill={T.accent}
              fillOpacity="0.12"
            />
            <rect
              x="330"
              y="112"
              width="250"
              height="10"
              fill={T.accent}
              fillOpacity="0.12"
            />
            <text
              x="455"
              y="110"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={T.accent}
            >
              QueryObject
            </text>
            <text x="348" y="151" fontSize="11" fontFamily="monospace" fill={T.primary}>
              eq(status, "paid")
            </text>
            <text x="348" y="174" fontSize="11" fontFamily="monospace" fill={T.primary}>
              gte(total, 100)
            </text>
            <text x="348" y="197" fontSize="11" fontFamily="monospace" fill={T.accent}>
              and(left, right)
            </text>
            <line x1="348" y1="216" x2="562" y2="216" stroke={T.border} />
            <text x="348" y="242" fontSize="11" fill={T.secondary}>
              元数据校验：字段白名单
            </text>
            <text x="348" y="266" fontSize="11" fill={T.secondary}>
              条件树可测、可复用、可翻译
            </text>
            <text x="348" y="291" fontSize="11" fill={T.accent}>
              结构 ≠ SQL 文本
            </text>
          </g>

          <Arrow markerId={markerId} x1={580} x2={632} label="翻译 + 绑定" />

          <g opacity={stageOpacity(visibleStep, 3)}>
            <rect
              x="632"
              y="86"
              width="240"
              height="230"
              rx="10"
              fill={T.bg}
              stroke={faultInjected ? DANGER : WARNING}
              strokeWidth={faultInjected ? 2 : 1.5}
            />
            <rect
              x="632"
              y="86"
              width="240"
              height="36"
              rx="10"
              fill={faultInjected ? DANGER : WARNING}
              fillOpacity="0.12"
            />
            <rect
              x="632"
              y="112"
              width="240"
              height="10"
              fill={faultInjected ? DANGER : WARNING}
              fillOpacity="0.12"
            />
            <text
              x="752"
              y="110"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={faultInjected ? DANGER : WARNING}
            >
              SQL + 参数
            </text>
            <text x="650" y="151" fontSize="11" fontFamily="monospace" fill={T.primary}>
              WHERE status = $1
            </text>
            <text x="650" y="174" fontSize="11" fontFamily="monospace" fill={T.primary}>
              AND total &gt;= $2
            </text>
            <text x="650" y="197" fontSize="11" fontFamily="monospace" fill={T.secondary}>
              params: ["paid", 100]
            </text>
            <line x1="650" y1="216" x2="854" y2="216" stroke={T.border} />
            {faultInjected ? (
              <>
                <text x="650" y="242" fontSize="11" fill={DANGER}>
                  拼接用户值：边界失守
                </text>
                <text x="650" y="266" fontSize="11" fill={DANGER}>
                  应在 QueryObject 前拒绝
                </text>
                <line
                  x1="850"
                  y1="275"
                  x2="790"
                  y2="275"
                  stroke={DANGER}
                  strokeWidth="1.5"
                  markerEnd={`url(#${faultMarkerId})`}
                />
              </>
            ) : (
              <>
                <text x="650" y="242" fontSize="11" fill={SUCCESS}>
                  参数化通过
                </text>
                <text x="650" y="266" fontSize="11" fill={T.secondary}>
                  rows → Order 结果映射
                </text>
              </>
            )}
            <text x="650" y="291" fontSize="11" fill={T.secondary}>
              方言只改变执行语法
            </text>
          </g>

          <rect
            x="28"
            y="348"
            width="844"
            height="96"
            rx="10"
            fill={T.primary}
            fillOpacity="0.03"
            stroke={faultInjected ? DANGER : current.color}
            strokeWidth="1.2"
          />
          <text x="48" y="375" fontSize="12" fontWeight="700" fill={faultInjected ? DANGER : current.color}>
            步骤 {visibleStep} · {current.label} · {current.title}
          </text>
          <text x="48" y="399" fontSize="11" fill={T.secondary}>
            {faultInjected ? "故障证据：直接拼接值绕过参数边界；不要用一次成功返回掩盖风险。" : current.note}
          </text>
          <text x="48" y="423" fontSize="11" fill={faultInjected ? DANGER : T.secondary}>
            {faultInjected ? "验收：拒绝故障、保留原条件树，再点击上方开关或下方重置恢复基线。" : "验收：同一条件树应产生可检查的 SQL 文本、参数数组和结果映射边界。"}
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={490}
            text="查询对象保存结构；翻译器负责方言，驱动负责参数，映射器负责领域结果"
          />
        </svg>

        {interactive && (
          <>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setActiveStep((value) => (value === 1 ? 1 : (value - 1) as Poeaa24Pattern23QueryObjectStep))}
                disabled={activeStep === 1}
                className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                上一阶段
              </button>
              <button
                type="button"
                onClick={() => setActiveStep((value) => (value === 3 ? 3 : (value + 1) as Poeaa24Pattern23QueryObjectStep))}
                disabled={activeStep === 3}
                className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                下一阶段
              </button>
              <button
                type="button"
                onClick={reset}
                className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
              >
                重置图示
              </button>
            </div>
            <output role="status" className="mt-2 block text-center text-xs text-secondary">
              第 {activeStep} / 3 阶段 · {faultInjected ? "故障已注入" : "基线正常"}
            </output>
          </>
        )}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        查询对象将领域意图保存为可组合结构，再由方言适配生成参数化查询；故障开关展示直接拼接值会在哪里失守。
      </figcaption>
    </figure>
  );
}

/** 保留现有章节注册名；Diagram 成员让 MDX 审计和 Stepper 明确看到专属图。 */
export function Poeaa24Pattern23QueryObject(
  props: Poeaa24Pattern23QueryObjectProps,
) {
  return <Poeaa24Pattern23QueryObjectDiagram {...props} />;
}

export namespace Poeaa24Pattern23QueryObject {
  export const Diagram = Poeaa24Pattern23QueryObjectDiagram;
}
