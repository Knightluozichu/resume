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

const VIEW_W = 900;
const VIEW_H = 430;

type Focus = "object" | "columns" | "round-trip";

const STEPS: readonly TeachingStep[] = [
  {
    label: "object",
    caption: "① 对象侧：Address 是一个完整值，没有独立表或主键",
  },
  {
    label: "columns",
    caption: "② 写出侧：映射器把 Address 的字段展开到 orders 的列",
  },
  {
    label: "round-trip",
    caption: "③ 读入侧：三列重新构造成 Address，整体通过校验",
  },
  {
    label: "fault",
    caption: "④ 故障模式：部分空值不能被当成合法的 Address",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const PHASE_IDS = ["object", "columns", "round-trip", "fault"] as const;

export function Poeaa24Pattern16EmbeddedValue({
  focus = "object",
  interactive = true,
}: {
  focus?: Focus;
  interactive?: boolean;
}) {
  const [faultInjected, setFaultInjected] = useState(false);
  const phaseRefs = useRef<Record<string, SVGGElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      PHASE_IDS.forEach((id, index) => {
        const element = phaseRefs.current[id];
        const start = TEACHING_BEAT_MS * index;
        const lit = TEACHING_BEAT_MS * (index + 1);
        if (element) {
          tl.add(
            element,
            {
              opacity: [0.2, 1],
              translateY: [8, 0],
              duration: TEACHING_BEAT_MS,
              ease: "out(3)",
            },
            start,
          );
        }
        // Each label lands at the end of the animation that introduces its phase.
        tl.label(id, lit);
      });
    },
  });

  const reset = () => {
    timeline.seek(0);
    setFaultInjected(false);
  };

  const focusText =
    focus === "object"
      ? "对象语义"
      : focus === "columns"
        ? "列展开"
        : "往返校验";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind={interactive ? "poeaa-embedded-value" : undefined}
        className="rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            专属交互图 · 当前关注：{focusText}
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
              {faultInjected ? "关闭部分空故障" : "注入部分空故障"}
            </button>
          )}
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="嵌入值的四步教学图。对象侧保留 Address 值对象，映射器把 city、street、postalCode 展开到 orders 表；读取时三列重建 Address。打开部分空故障后，图示强调只有一列为空是非法组合。支持播放、暂停、单步、拖动进度和重置。"
          className="mx-auto block h-auto w-full max-w-[900px]"
        >
          <defs>
            <marker
              id="poeaa-embedded-value-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L9 5 L0 10 z" fill={T.accent} />
            </marker>
            <marker
              id="poeaa-embedded-value-warning"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="5"
              orient="auto"
            >
              <path d="M0 0 L9 5 L0 10 z" fill="var(--danger)" />
            </marker>
          </defs>

          <DiagramTitle
            x={VIEW_W / 2}
            y={32}
            text="Embedded Value：对象字段 ↔ 所有者表列"
          />

          <g
            ref={(element) => {
              phaseRefs.current.object = element;
            }}
            opacity="0.2"
          >
            <rect
              x="30"
              y="64"
              width="260"
              height="246"
              rx="10"
              fill={T.elevated}
              stroke={T.success}
              strokeWidth="1.5"
            />
            <rect
              x="30"
              y="64"
              width="260"
              height="34"
              rx="10"
              fill={T.success}
              fillOpacity="0.12"
            />
            <rect
              x="30"
              y="88"
              width="260"
              height="10"
              fill={T.success}
              fillOpacity="0.12"
            />
            <text
              x="160"
              y="87"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={T.success}
            >
              Order 对象
            </text>
            <text
              x="50"
              y="126"
              fontSize="12"
              fontFamily="monospace"
              fill={T.primary}
            >
              id: "o-204"
            </text>
            <text
              x="50"
              y="150"
              fontSize="12"
              fontFamily="monospace"
              fill={T.primary}
            >
              total: 299.00
            </text>
            <rect
              x="48"
              y="172"
              width="224"
              height="112"
              rx="8"
              fill={T.warning}
              fillOpacity="0.08"
              stroke={T.warning}
              strokeWidth="1.2"
              strokeDasharray="6 3"
            />
            <text
              x="62"
              y="198"
              fontSize="12"
              fontWeight="700"
              fill={T.warning}
            >
              shippingAddress: Address
            </text>
            <text
              x="62"
              y="224"
              fontSize="12"
              fontFamily="monospace"
              fill={T.primary}
            >
              city: "上海"
            </text>
            <text
              x="62"
              y="248"
              fontSize="12"
              fontFamily="monospace"
              fill={T.primary}
            >
              street: "南京路"
            </text>
            <text
              x="62"
              y="272"
              fontSize="12"
              fontFamily="monospace"
              fill={T.primary}
            >
              postalCode: "200001"
            </text>
          </g>

          <g
            ref={(element) => {
              phaseRefs.current.columns = element;
            }}
            opacity="0.2"
          >
            <rect
              x="324"
              y="112"
              width="252"
              height="144"
              rx="10"
              fill={T.accent}
              fillOpacity="0.06"
              stroke={T.accent}
              strokeWidth="1.5"
            />
            <text
              x="450"
              y="140"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={T.accent}
            >
              AddressMapper
            </text>
            <text
              x="344"
              y="170"
              fontSize="12"
              fontFamily="monospace"
              fill={T.primary}
            >
              flatten(Address)
            </text>
            <text
              x="344"
              y="194"
              fontSize="12"
              fontFamily="monospace"
              fill={T.primary}
            >
              → orders.shipping_*
            </text>
            <text
              x="344"
              y="224"
              fontSize="12"
              fontFamily="monospace"
              fill={T.secondary}
            >
              no id · no JOIN · one transaction
            </text>
            <line
              x1="290"
              y1="180"
              x2="324"
              y2="180"
              stroke={T.accent}
              strokeWidth="1.5"
              markerEnd="url(#poeaa-embedded-value-arrow)"
            />
            <line
              x1="576"
              y1="180"
              x2="608"
              y2="180"
              stroke={T.accent}
              strokeWidth="1.5"
              markerEnd="url(#poeaa-embedded-value-arrow)"
            />
          </g>

          <g
            ref={(element) => {
              phaseRefs.current["round-trip"] = element;
            }}
            opacity="0.2"
          >
            <rect
              x="608"
              y="64"
              width="262"
              height="246"
              rx="10"
              fill={T.elevated}
              stroke={T.warning}
              strokeWidth="1.5"
            />
            <rect
              x="608"
              y="64"
              width="262"
              height="34"
              rx="10"
              fill={T.warning}
              fillOpacity="0.12"
            />
            <rect
              x="608"
              y="88"
              width="262"
              height="10"
              fill={T.warning}
              fillOpacity="0.12"
            />
            <text
              x="739"
              y="87"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={T.warning}
            >
              orders 表
            </text>
            <text
              x="628"
              y="126"
              fontSize="12"
              fontFamily="monospace"
              fill={T.primary}
            >
              id: "o-204"
            </text>
            <text
              x="628"
              y="154"
              fontSize="12"
              fontFamily="monospace"
              fill={T.warning}
            >
              shipping_city: "上海"
            </text>
            <text
              x="628"
              y="182"
              fontSize="12"
              fontFamily="monospace"
              fill={T.warning}
            >
              shipping_street: "南京路"
            </text>
            <text
              x="628"
              y="210"
              fontSize="12"
              fontFamily="monospace"
              fill={T.warning}
            >
              shipping_postal: "200001"
            </text>
            <text x="628" y="252" fontSize="12" fill={T.secondary}>
              读取：三列 → Address
            </text>
            <text x="628" y="276" fontSize="12" fill={T.secondary}>
              写入：Address → 三列
            </text>
            <path
              d="M608 294 C520 350 382 350 290 294"
              fill="none"
              stroke={T.accent}
              strokeWidth="1.5"
              strokeDasharray="6 3"
              markerEnd="url(#poeaa-embedded-value-arrow)"
            />
            <text
              x="450"
              y="372"
              textAnchor="middle"
              fontSize="12"
              fill={T.accent}
            >
              读写都以完整值为单位
            </text>
          </g>

          <g
            ref={(element) => {
              phaseRefs.current.fault = element;
            }}
            opacity="0.2"
          >
            {faultInjected && (
              <>
                <rect
                  x="618"
                  y="142"
                  width="242"
                  height="78"
                  rx="8"
                  fill="var(--danger)"
                  fillOpacity="0.08"
                  stroke="var(--danger)"
                  strokeWidth="1.5"
                />
                <text
                  x="632"
                  y="168"
                  fontSize="12"
                  fontWeight="700"
                  fill="var(--danger)"
                >
                  部分空故障
                </text>
                <text x="632" y="192" fontSize="12" fill="var(--danger)">
                  street = null，组合非法
                </text>
                <text x="632" y="214" fontSize="12" fill="var(--danger)">
                  映射边界应拒绝写入
                </text>
                <line
                  x1="610"
                  y1="180"
                  x2="576"
                  y2="180"
                  stroke="var(--danger)"
                  strokeWidth="1.5"
                  markerEnd="url(#poeaa-embedded-value-warning)"
                />
              </>
            )}
          </g>

          <rect
            x="30"
            y="390"
            width="840"
            height="26"
            rx="8"
            fill={T.primary}
            fillOpacity="0.03"
            stroke={T.border}
            strokeWidth="1"
          />
          <text x="48" y="408" fontSize="12" fill={T.secondary}>
            核心约束：值对象无独立身份；所有列必须作为一个值被校验、写入和重建
          </text>
          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 2}
            text="可播放、单步、拖动进度；打开故障模式，再点重置回到对象起点"
          />
        </svg>

        {interactive && (
          <>
            <TimelineControls
              timeline={timeline}
              labelText={LABEL_TEXT}
              caption="先看对象，再看列，最后看往返和拒绝条件。"
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
        嵌入值把 Address 的字段展开到订单表；没有独立表和
        JOIN，但必须把空值组合和整体更新规则写清楚。
      </figcaption>
    </figure>
  );
}
