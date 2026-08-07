"use client";

import { useRef, useState } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";
import { T, DiagramCaption, DiagramTitle } from "../poeaa-svg-primitives";

/**
 * <Poeaa24Pattern18SingleTableInheritanceDiagram>：单表继承的专属映射图。
 *
 * 三个关键帧沿同一条证据链推进：
 *   1. 领域对象保留 Employee → Engineer / Manager 的多态结构；
 *   2. 映射器用 discriminator 把对象路由到同一张 employees 表；
 *   3. 表级约束检查类型与字段是否匹配，并把宽表/NULL 代价暴露为拒绝信号。
 *
 * 章节正文的 Stepper 使用 interactive={false} 渲染三张确定性的阶段快照；
 * 主图则提供可播放、可单步、可拖动和可重置的时间线，并可注入错误类型。
 */

const VIEW_W = 860;
const VIEW_H = 500;
const SUCCESS = "var(--success)";
const WARNING = "var(--warning)";
const DANGER = "var(--danger)";

type Phase = "object" | "mapping" | "boundary";

const PHASE_IDS: readonly Phase[] = ["object", "mapping", "boundary"];

const STEPS: readonly TeachingStep[] = [
  {
    label: "object",
    caption: "① 对象侧：同一 Employee 入口保留 Engineer / Manager 多态",
  },
  {
    label: "mapping",
    caption: "② 映射侧：discriminator 把具体类型路由到一张表",
  },
  {
    label: "boundary",
    caption: "③ 约束侧：类型字段一致，宽表与 NULL 代价可被拒绝",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STEP_TEXT = {
  1: {
    subtitle: "先保留对象多态：调用方只依赖 Employee 契约",
    status: "对象结构已明确",
    statusColor: SUCCESS,
    note: "Engineer 与 Manager 共享 id、name 等基础字段；具体字段仍属于各自子类，不能靠 NULL 猜类型。",
  },
  2: {
    subtitle: "写入一张 employees 表：kind 决定恢复哪一种具体对象",
    status: "鉴别器路由已建立",
    statusColor: T.accent,
    note: "加载先读取 kind，再选择对应构造器；未知 kind 必须拒绝，不能静默降级成 Employee。",
  },
  3: {
    subtitle: "最后验证约束：可空列是表示手段，不是业务规则",
    status: "约束与拒绝边界",
    statusColor: DANGER,
    note: "CHECK、唯一索引和迁移脚本共同守住类型字段；列爆炸、NULL 泛滥或频繁子类变化提示改用别的继承策略。",
  },
} as const;

export type Poeaa24Pattern18SingleTableInheritanceDiagramProps = {
  /** 关闭交互时固定显示哪一个阶段，供 Stepper 的三张证据快照使用。 */
  step?: 1 | 2 | 3;
  interactive?: boolean;
};

export function Poeaa24Pattern18SingleTableInheritanceDiagram({
  step = 1,
  interactive = true,
}: Poeaa24Pattern18SingleTableInheritanceDiagramProps) {
  const [faultInjected, setFaultInjected] = useState(false);
  const phaseRefs = useRef<Record<Phase, SVGGElement | null>>({
    object: null,
    mapping: null,
    boundary: null,
  });

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      if (!interactive) return;

      PHASE_IDS.forEach((phase, index) => {
        const element = phaseRefs.current[phase];
        const start = TEACHING_BEAT_MS * index;
        if (element) {
          tl.add(
            element,
            {
              opacity: [0.22, 1],
              duration: TEACHING_BEAT_MS,
              ease: "out(3)",
            },
            start,
          );
        }
        // 每个 label 锚在该步动画的起始时刻，避免字幕落后一个关键帧。
        tl.label(phase, start);
      });
    },
  });

  const activeStep = interactive ? (timeline.currentStep + 1) as 1 | 2 | 3 : step;
  const current = STEP_TEXT[activeStep];
  const markerId = `poeaa24-pattern18-arrow-${interactive ? "interactive" : step}`;
  const warningMarkerId = `${markerId}-warning`;

  const reset = () => {
    timeline.seek(0);
    setFaultInjected(false);
  };

  const phaseOpacity = (phase: Phase) => {
    if (interactive) return undefined;
    const phaseIndex = PHASE_IDS.indexOf(phase) + 1;
    return phaseIndex <= step ? 1 : 0.22;
  };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="poeaa-pattern18-single-table-inheritance"
        className="rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            专属映射图 · 当前阶段：{current.status}
          </span>
          {interactive && (
            <button
              type="button"
              onClick={() => setFaultInjected((value) => !value)}
              aria-pressed={faultInjected}
              className={`rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                faultInjected
                  ? "border-danger text-danger"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              {faultInjected ? "关闭错误类型" : "注入错误类型"}
            </button>
          )}
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`单表继承第${activeStep}步：${current.subtitle}。左侧是 Employee、Engineer、Manager 的对象继承树，中间是使用 kind 鉴别器的映射器，右侧是 employees 单表。${faultInjected ? "当前注入了错误数据：kind=engineer 却填入 manager_budget，约束应拒绝该行。" : current.note}`}
          className="mx-auto block h-auto w-full max-w-[860px]"
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
              id={warningMarkerId}
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
            text="Single Table Inheritance：对象树 → 鉴别器 → 一张表"
          />
          <text
            x={VIEW_W / 2}
            y="54"
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            {current.subtitle}
          </text>

          <g
            ref={(element) => {
              phaseRefs.current.object = element;
            }}
            opacity={phaseOpacity("object")}
          >
            <rect
              x="30"
              y="78"
              width="250"
              height="214"
              rx="10"
              fill={T.bg}
              stroke={SUCCESS}
              strokeWidth="1.5"
            />
            <rect
              x="30"
              y="78"
              width="250"
              height="34"
              rx="10"
              fill={SUCCESS}
              fillOpacity="0.12"
            />
            <rect
              x="30"
              y="102"
              width="250"
              height="10"
              fill={SUCCESS}
              fillOpacity="0.12"
            />
            <text
              x="155"
              y="101"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={SUCCESS}
            >
              Employee（对象入口）
            </text>
            <line x1="155" y1="112" x2="155" y2="138" stroke={T.border} strokeWidth="1.2" />
            <line x1="155" y1="138" x2="95" y2="160" stroke={T.border} strokeWidth="1.2" />
            <line x1="155" y1="138" x2="215" y2="160" stroke={T.border} strokeWidth="1.2" />
            <rect x="62" y="160" width="112" height="76" rx="8" fill={T.elevated} stroke={WARNING} strokeWidth="1.3" />
            <text x="118" y="184" textAnchor="middle" fontSize="12" fontWeight="700" fill={WARNING}>Engineer</text>
            <text x="76" y="207" fontSize="11" fontFamily="monospace" fill={T.primary}>skill: Go</text>
            <text x="76" y="225" fontSize="11" fill={T.secondary}>共享 id / name</text>
            <rect x="136" y="160" width="112" height="76" rx="8" fill={T.elevated} stroke={T.accent} strokeWidth="1.3" />
            <text x="192" y="184" textAnchor="middle" fontSize="12" fontWeight="700" fill={T.accent}>Manager</text>
            <text x="150" y="207" fontSize="11" fontFamily="monospace" fill={T.primary}>budget: 50k</text>
            <text x="150" y="225" fontSize="11" fill={T.secondary}>共享 id / name</text>
            <text x="48" y="268" fontSize="11" fill={T.secondary}>具体字段随类型变化，不靠 NULL 猜类型</text>
          </g>

          <line
            x1="280"
            y1="178"
            x2="330"
            y2="178"
            stroke={T.accent}
            strokeWidth="1.8"
            markerEnd={`url(#${markerId})`}
          />
          <text x="305" y="166" textAnchor="middle" fontSize="11" fill={T.accent}>
            交给 Mapper
          </text>

          <g
            ref={(element) => {
              phaseRefs.current.mapping = element;
            }}
            opacity={phaseOpacity("mapping")}
          >
            <rect
              x="330"
              y="106"
              width="180"
              height="146"
              rx="10"
              fill={T.bg}
              stroke={T.accent}
              strokeWidth="1.5"
            />
            <rect
              x="330"
              y="106"
              width="180"
              height="34"
              rx="10"
              fill={T.accent}
              fillOpacity="0.12"
            />
            <rect
              x="330"
              y="130"
              width="180"
              height="10"
              fill={T.accent}
              fillOpacity="0.12"
            />
            <text x="420" y="129" textAnchor="middle" fontSize="13" fontWeight="700" fill={T.accent}>EmployeeMapper</text>
            <text x="348" y="164" fontSize="11" fontFamily="monospace" fill={T.primary}>read kind</text>
            <text x="348" y="184" fontSize="11" fontFamily="monospace" fill={T.primary}>kind → constructor</text>
            <text x="348" y="204" fontSize="11" fontFamily="monospace" fill={T.primary}>write common + subtype</text>
            <rect x="348" y="218" width="144" height="22" rx="6" fill={T.accent} fillOpacity="0.08" stroke={T.accent} strokeWidth="1" />
            <text x="420" y="233" textAnchor="middle" fontSize="11" fill={T.accent}>unknown kind → reject</text>
          </g>

          <line
            x1="510"
            y1="178"
            x2="550"
            y2="178"
            stroke={T.accent}
            strokeWidth="1.8"
            markerEnd={`url(#${markerId})`}
          />
          <text x="530" y="166" textAnchor="middle" fontSize="11" fill={T.accent}>
            单表写回
          </text>

          <g
            ref={(element) => {
              phaseRefs.current.boundary = element;
            }}
            opacity={phaseOpacity("boundary")}
          >
            <rect
              x="550"
              y="78"
              width="280"
              height="214"
              rx="10"
              fill={T.bg}
              stroke={faultInjected ? DANGER : WARNING}
              strokeWidth={faultInjected ? 2 : 1.5}
            />
            <rect
              x="550"
              y="78"
              width="280"
              height="34"
              rx="10"
              fill={WARNING}
              fillOpacity="0.12"
            />
            <rect
              x="550"
              y="102"
              width="280"
              height="10"
              fill={WARNING}
              fillOpacity="0.12"
            />
            <text x="690" y="101" textAnchor="middle" fontSize="13" fontWeight="700" fill={WARNING}>employees（唯一表）</text>
            <text x="568" y="132" fontSize="11" fontFamily="monospace" fill={T.primary}>id | name | kind</text>
            <text x="568" y="151" fontSize="11" fontFamily="monospace" fill={WARNING}>skill       (nullable)</text>
            <text x="568" y="170" fontSize="11" fontFamily="monospace" fill={T.accent}>budget_limit (nullable)</text>
            <line x1="568" y1="183" x2="812" y2="183" stroke={T.border} strokeWidth="0.8" />
            <text x="568" y="204" fontSize="11" fontFamily="monospace" fill={T.secondary}>42 | Alice | engineer</text>
            <text x="568" y="223" fontSize="11" fontFamily="monospace" fill={faultInjected ? DANGER : T.secondary}>
              {faultInjected ? "43 | Bob | engineer  budget=50k" : "43 | Bob   | manager  budget=50k"}
            </text>
            <text x="568" y="242" fontSize="11" fontFamily="monospace" fill={T.secondary}>44 | Chen  | engineer</text>
            <text x="568" y="272" fontSize="11" fill={faultInjected ? DANGER : T.secondary}>
              {faultInjected ? "CHECK 失败：engineer 不得填 budget_limit" : "kind 决定哪些可空列必须有值"}
            </text>
          </g>

          {faultInjected && (
            <line
              x1="810"
              y1="222"
              x2="744"
              y2="222"
              stroke={DANGER}
              strokeWidth="1.5"
              markerEnd={`url(#${warningMarkerId})`}
            />
          )}

          <rect
            x="30"
            y="326"
            width="800"
            height="98"
            rx="10"
            fill={T.primary}
            fillOpacity="0.03"
            stroke={faultInjected ? DANGER : T.border}
            strokeWidth="1"
          />
          <text x="50" y="352" fontSize="12" fontWeight="700" fill={current.statusColor}>
            步骤 {activeStep} · {current.status}
          </text>
          <text x="50" y="375" fontSize="11" fill={T.secondary}>{current.note}</text>
          <text x="50" y="398" fontSize="11" fill={faultInjected ? DANGER : T.secondary}>
            {faultInjected
              ? "错误路径：不能用一个看似完整的对象覆盖冲突字段；先让数据库约束拒绝，再修正 kind 或字段。"
              : "验收问题：给定一行 employees 数据，能否只凭 kind 恢复正确子类，并证明不相关字段为空是合法的？"}
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={468}
            text="单表继承的优势是简单查询；单表约束与宽表代价必须同样可见"
          />
        </svg>

        {interactive && (
          <>
            <TimelineControls
              timeline={timeline}
              labelText={LABEL_TEXT}
              caption="先看对象，再看鉴别器，最后注入错误检查字段约束。"
            />
            <button
              type="button"
              onClick={reset}
              className="mx-auto mt-3 block rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
            >
              重置图示
            </button>
          </>
        )}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        单表继承把公共字段与所有子类字段放在一张表中，用 kind 鉴别器恢复具体对象；可空列只是布局结果，不能代替类型约束。
      </figcaption>
    </figure>
  );
}

// 保留章节注册表使用的旧导出名；正文通过已登记名称的 Diagram 属性复用专属实现。
export function Poeaa24Pattern18SingleTableInheritance(
  props: Poeaa24Pattern18SingleTableInheritanceDiagramProps,
) {
  return <Poeaa24Pattern18SingleTableInheritanceDiagram {...props} />;
}

export namespace Poeaa24Pattern18SingleTableInheritance {
  export const Diagram = Poeaa24Pattern18SingleTableInheritanceDiagram;
}
