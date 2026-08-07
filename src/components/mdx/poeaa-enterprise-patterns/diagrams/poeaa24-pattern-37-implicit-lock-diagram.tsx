"use client";

import { useId, useRef, useState } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";
import { DiagramCaption, DiagramTitle, T } from "../poeaa-svg-primitives";

/**
 * <Poeaa24Pattern37ImplicitLockDiagram>：隐含锁的专属教学图。
 *
 * 图中固定追踪同一张订单的三段证据：两个客服先读快照，共同提交层
 * 隐式取得保护，最后由版本与锁结果裁决。错误开关展示底层仓储被公开后，
 * “业务代码没有 lock()”并不能证明所有修改入口都受保护。
 */

const VIEW_W = 960;
const VIEW_H = 520;

type Stage = 1 | 2 | 3;

const STEPS: readonly TeachingStep[] = [
  { label: "read", caption: "A 与 B 读取同一份版本 7 快照" },
  { label: "intercept", caption: "共同提交层取得保护并检查版本" },
  { label: "decide", caption: "一个提交成功，另一个冲突后释放" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY: Readonly<
  Record<Stage, { title: string; detail: string; status: string }>
> = {
  1: {
    title: "读取快照",
    detail: "A、B 都拿到 order#42 / version 7",
    status: "暂时没有唯一写入者",
  },
  2: {
    title: "隐式取得保护",
    detail: "UnitOfWork 接管 commit()，检查版本",
    status: "共同层成为唯一裁决点",
  },
  3: {
    title: "提交与释放",
    detail: "A 推进到 8，B 得到冲突并重读",
    status: "结果可重放，保护随后释放",
  },
};

export type Poeaa24Pattern37ImplicitLockDiagramProps = {
  /** Stepper 使用的确定性阶段快照；主图省略时由时间线控制。 */
  step?: Stage;
  /** false 时隐藏时间线和故障按钮，固定显示指定阶段。 */
  interactive?: boolean;
};

export function Poeaa24Pattern37ImplicitLockDiagram({
  step = 1,
  interactive = true,
}: Poeaa24Pattern37ImplicitLockDiagramProps) {
  const phaseRefs = useRef<Record<string, SVGGElement | null>>({});
  const [faultInjected, setFaultInjected] = useState(false);
  const rawId = useId().replace(/:/g, "");
  const directPathId = `poeaa-pattern37-direct-${rawId}`;
  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((teachingStep, index) => {
        const start = TEACHING_BEAT_MS * index;
        const element = phaseRefs.current[teachingStep.label];
        if (interactive && element) {
          tl.add(
            element,
            {
              opacity: [0.16, 1],
              translateY: [8, 0],
              duration: TEACHING_BEAT_MS * 0.8,
              ease: "out(3)",
            },
            start,
          );
        }
        // 每个标签落在该步动画的起始时刻，单步时字幕与图形同步。
        tl.label(teachingStep.label, start);
      });
    },
  });

  const activeStage = interactive
    ? (Math.min(3, timeline.currentStep + 1) as Stage)
    : step;
  const copy = STAGE_COPY[activeStage];

  const resetAll = () => {
    setFaultInjected(false);
    timeline.goToStep(0);
  };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="poeaa-pattern37-implicit-lock"
        className="rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
              <span aria-hidden="true">◇</span>
              隐含锁证据图
            </span>
            <span className="text-xs text-secondary">{copy.status}</span>
          </div>
          {interactive && (
            <div className="flex flex-wrap gap-2">
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
                {faultInjected ? "收回绕过入口" : "注入绕过入口"}
              </button>
            </div>
          )}
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`隐含锁三步教学图。当前阶段是${copy.title}：${copy.detail}。可以播放、暂停、单步和拖动进度，并注入底层仓储绕过共同提交层的错误。${faultInjected ? "错误模式已开启，绕过入口可能覆盖旧快照。" : "当前所有修改都应经过共同提交层。"}`}
          className="mx-auto block h-auto w-full max-w-[960px]"
        >
          <defs>
            <marker
              id={directPathId}
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L9 5 L0 10 Z" fill={faultInjected ? T.danger : T.accent} />
            </marker>
          </defs>

          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="Implicit Lock：共同提交层隐藏保护责任"
          />
          <text
            x={VIEW_W / 2}
            y={56}
            textAnchor="middle"
            fontSize="12"
            fill={T.secondary}
          >
            {copy.title} · {copy.detail}
          </text>

          {(
            [
              [1, "读取快照", "A / B 各自持有 version 7"],
              [2, "共同提交层", "uow.commit() 自动取得保护"],
              [3, "裁决结果", "saved(version 8) / conflict"],
            ] as const
          ).map(([stage, title, detail], index) => {
            const current = stage === activeStage;
            const x = 28 + index * 308;
            return (
              <g key={`stage-card-${stage}`} opacity={current ? 1 : 0.52}>
                <rect
                  x={x}
                  y="74"
                  width="276"
                  height="64"
                  rx="9"
                  fill={current ? T.accent : T.secondary}
                  fillOpacity="0.1"
                  stroke={current ? T.accent : T.border}
                  strokeWidth={current ? "1.8" : "1"}
                />
                <text x={x + 16} y="99" fontSize="12" fontWeight="700" fill={current ? T.accent : T.primary}>
                  {stage}. {title}
                </text>
                <text x={x + 16} y="120" fontSize="11" fill={T.secondary}>
                  {detail}
                </text>
              </g>
            );
          })}

          <line x1="304" y1="106" x2="332" y2="106" stroke={T.accent} strokeWidth="1.5" markerEnd={`url(#${directPathId})`} />
          <line x1="612" y1="106" x2="640" y2="106" stroke={T.accent} strokeWidth="1.5" markerEnd={`url(#${directPathId})`} />

          <rect x="28" y="166" width="332" height="184" rx="10" fill={T.primary} fillOpacity="0.03" stroke={T.border} />
          <text x="48" y="192" fontSize="12" fontWeight="700" fill={T.primary}>
            业务入口 · 没有显式 lock()
          </text>
          <text x="48" y="222" fontSize="11" fontFamily="monospace" fill={T.primary}>
            A: order.setTotal(597)
          </text>
          <text x="48" y="248" fontSize="11" fontFamily="monospace" fill={T.primary}>
            B: order.setTotal(620)
          </text>
          <text x="48" y="284" fontSize="11" fill={T.secondary}>
            两份快照都写着 version = 7
          </text>
          <text x="48" y="314" fontSize="11" fill={T.secondary}>
            责任被委托给共同提交层
          </text>

          <rect x="388" y="166" width="544" height="184" rx="10" fill={T.primary} fillOpacity="0.03" stroke={faultInjected ? T.danger : T.accent} strokeWidth={faultInjected ? "1.8" : "1.4"} />
          <text x="412" y="192" fontSize="12" fontWeight="700" fill={faultInjected ? T.danger : T.accent}>
            {faultInjected ? "共同层被绕过 · 保护承诺失效" : "共同提交层 · 唯一裁决点"}
          </text>
          <text x="412" y="222" fontSize="11" fontFamily="monospace" fill={T.primary}>
            lock: order#42 · owner: A → B
          </text>
          <text x="412" y="248" fontSize="11" fontFamily="monospace" fill={T.primary}>
            expected: 7 · current: {activeStage === 1 ? "7" : "8"}
          </text>
          <text x="412" y="274" fontSize="11" fontFamily="monospace" fill={T.primary}>
            {faultInjected ? "rawRepo.save(order) → 未经保护" : "uow.commit() → 检查版本 → 保存"}
          </text>
          <text x="412" y="306" fontSize="11" fill={faultInjected ? T.danger : T.secondary}>
            {faultInjected ? "风险：旧快照可能覆盖 A 的新版本" : "证据：锁、版本、裁决、释放都可被重放"}
          </text>
          <text x="412" y="330" fontSize="11" fill={T.secondary}>
            {copy.status}
          </text>

          <g
            ref={(element) => {
              phaseRefs.current.read = element;
            }}
            opacity={interactive ? undefined : activeStage === 1 ? 1 : 0.2}
          >
            <circle cx="76" cy="390" r="7" fill={T.accent} />
            <text x="94" y="395" fontSize="11" fill={T.primary}>
              ① 读取：A / B 快照版本相同
            </text>
          </g>
          <g
            ref={(element) => {
              phaseRefs.current.intercept = element;
            }}
            opacity={interactive ? undefined : activeStage === 2 ? 1 : 0.2}
          >
            <circle cx="76" cy="420" r="7" fill={T.accent} />
            <text x="94" y="425" fontSize="11" fill={T.primary}>
              ② 保护：共同层取得锁并重读版本
            </text>
          </g>
          <g
            ref={(element) => {
              phaseRefs.current.decide = element;
            }}
            opacity={interactive ? undefined : activeStage === 3 ? 1 : 0.2}
          >
            <circle cx="76" cy="450" r="7" fill={faultInjected ? T.danger : T.success} />
            <text x="94" y="455" fontSize="11" fill={faultInjected ? T.danger : T.primary}>
              ③ 裁决：成功推进或返回冲突后释放
            </text>
          </g>

          {faultInjected && (
            <path
              d="M360 258 C380 258 376 314 388 314"
              fill="none"
              stroke={T.danger}
              strokeWidth="1.8"
              strokeDasharray="6 4"
              markerEnd={`url(#${directPathId})`}
            />
          )}

          <rect x="388" y="382" width="544" height="84" rx="9" fill={faultInjected ? T.danger : T.accent} fillOpacity="0.08" stroke={faultInjected ? T.danger : T.border} />
          <text x="412" y="408" fontSize="12" fontWeight="700" fill={faultInjected ? T.danger : T.accent}>
            {faultInjected ? "拒绝信号：存在可直写的隐藏入口" : "验收信号：所有修改入口都能回到同一裁决点"}
          </text>
          <text x="412" y="435" fontSize="11" fill={T.secondary}>
            {faultInjected ? "修法：收紧仓储写接口，并为批处理与恢复任务补并发测试。" : "选择信号：业务代码保持简单，但锁事件与版本裁决完整可见。"}
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 12}
            text="隐含锁隐藏调用细节，但不能隐藏保护覆盖与失败证据"
          />
        </svg>

        {interactive && (
          <TimelineControls
            timeline={timeline}
            labelText={LABEL_TEXT}
            caption="按步骤验证：读取不等于占有，提交层才是保护与裁决的共同边界。"
            reset={{
              label: "重置演示",
              ariaLabel: "重置隐含锁演示",
              onClick: resetAll,
            }}
          />
        )}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        切换三步时序并注入绕过入口；重置后回到两个客服读取版本 7 的状态。
      </figcaption>
    </figure>
  );
}
