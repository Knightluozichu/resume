"use client";

import { useState } from "react";

import { T, DiagramCaption, DiagramTitle } from "../poeaa-svg-primitives";

/**
 * <Poeaa24Pattern22MetadataMapping.Diagram step={1|2|3}>：元数据映射的专属教学图。
 *
 * 三个阶段沿着同一条可审计的证据链推进：
 *   1. 校验映射规范，先拒绝无法解释的元数据；
 *   2. 通用映射器用同一份规范读出对象；
 *   3. 工作单元用同一份规范写回对象，并把失败封在事务边界内。
 *
 * 章节注册表继续使用 Poeaa24Pattern22MetadataMapping 导出名；.Diagram
 * 成员供 MDX 的 Stepper 和质量审计识别专属视觉组件。
 */

const VIEW_W = 900;
const VIEW_H = 510;

type Step = 1 | 2 | 3;

const STEP_COPY: Record<
  Step,
  { label: string; subtitle: string; status: string; note: string }
> = {
  1: {
    label: "校验",
    subtitle: "先把映射规则当作输入，检查它能否解释真实表结构",
    status: "元数据可被接受",
    note: "映射规范同时声明对象、表、字段和类型；任何一个名字对不上，都应在创建通用引擎前失败。",
  },
  2: {
    label: "装载",
    subtitle: "通用映射器读取同一份规范，把行恢复为 Order 对象",
    status: "规则驱动对象恢复",
    note: "引擎只解释规范，不为 Order 单独硬编码一套读取分支；新增类可以新增规范并复用机制。",
  },
  3: {
    label: "写回",
    subtitle: "同一份规范驱动保存，并由工作单元封住部分失败",
    status: "读写合同闭合",
    note: "对象字段、外键和数据库列必须在同一事务语义下对齐；写回失败时不能留下半个聚合。",
  },
};

export type Poeaa24Pattern22MetadataMappingDiagramProps = {
  /** Stepper 使用的确定性阶段快照。 */
  step?: Step;
  /** 主图开启阶段切换、故障注入和重置；Stepper 快照应关闭它。 */
  interactive?: boolean;
};

function stageOpacity(stage: Step, active: Step) {
  if (stage === active) return 1;
  return stage < active ? 0.72 : 0.32;
}

export function Poeaa24Pattern22MetadataMappingDiagram({
  step = 1,
  interactive = true,
}: Poeaa24Pattern22MetadataMappingDiagramProps) {
  const [selectedStep, setSelectedStep] = useState<Step>(step);
  const [faultInjected, setFaultInjected] = useState(false);
  const activeStep = interactive ? selectedStep : step;
  const copy = STEP_COPY[activeStep];
  const markerId = `poeaa24-metadata-mapping-arrow-${interactive ? "interactive" : `snapshot-${activeStep}`}`;
  const faultMarkerId = `${markerId}-fault`;
  const metadataStroke = faultInjected ? T.danger : T.warning;

  const reset = () => {
    setSelectedStep(1);
    setFaultInjected(false);
  };

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div
        data-visual-kind="poeaa-pattern22-metadata-mapping"
        className="rounded-card border border-border bg-elevated p-5"
      >
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            专属元数据映射图 · {copy.status}
          </span>
          {interactive && (
            <button
              type="button"
              onClick={reset}
              className="rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary"
            >
              重置图示
            </button>
          )}
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`元数据映射第${activeStep}步：${copy.subtitle}。左侧是映射规范，中间是元数据校验与通用映射器，右侧是 Order 对象和 orders 表。${faultInjected ? "已注入错误：规范把 total 映射到不存在的 total_cents 列，校验应拒绝它。" : copy.note}`}
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
              <path d="M0 0 L9 5 L0 10 Z" fill={T.danger} />
            </marker>
          </defs>

          <DiagramTitle
            x={VIEW_W / 2}
            y={31}
            text="Metadata Mapping：规则是数据，映射器是引擎"
          />
          <text
            x={VIEW_W / 2}
            y="55"
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            {copy.subtitle}
          </text>

          {[1, 2, 3].map((value) => {
            const phase = value as Step;
            const active = phase === activeStep;
            const x = 32 + (phase - 1) * 282;
            return (
              <g
                key={`phase-${phase}`}
                opacity={stageOpacity(phase, activeStep)}
              >
                <rect
                  x={x}
                  y="72"
                  width="250"
                  height="30"
                  rx="8"
                  fill={active ? T.accent : T.secondary}
                  fillOpacity="0.1"
                  stroke={active ? T.accent : T.border}
                  strokeWidth="1.2"
                />
                <text
                  x={x + 125}
                  y="92"
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={active ? T.accent : T.secondary}
                >
                  {phase}. {STEP_COPY[phase].label}
                </text>
              </g>
            );
          })}

          <g opacity={stageOpacity(1, activeStep)}>
            <rect
              x="28"
              y="124"
              width="214"
              height="190"
              rx="10"
              fill={T.bg}
              stroke={metadataStroke}
              strokeWidth={faultInjected ? "2" : "1.5"}
            />
            <rect
              x="28"
              y="124"
              width="214"
              height="34"
              rx="10"
              fill={T.warning}
              fillOpacity="0.12"
            />
            <rect
              x="28"
              y="148"
              width="214"
              height="10"
              fill={T.warning}
              fillOpacity="0.12"
            />
            <text
              x="135"
              y="147"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={T.warning}
            >
              映射规范（MappingSpec）
            </text>
            <text
              x="46"
              y="180"
              fontSize="11"
              fontFamily="monospace"
              fill={T.primary}
            >
              class: Order
            </text>
            <text
              x="46"
              y="200"
              fontSize="11"
              fontFamily="monospace"
              fill={T.primary}
            >
              table: orders
            </text>
            <text
              x="46"
              y="220"
              fontSize="11"
              fontFamily="monospace"
              fill={T.primary}
            >
              id → order_id
            </text>
            <text
              x="46"
              y="240"
              fontSize="11"
              fontFamily="monospace"
              fill={faultInjected ? T.danger : T.primary}
            >
              total → {faultInjected ? "total_cents" : "amount_cents"}
            </text>
            <text
              x="46"
              y="260"
              fontSize="11"
              fontFamily="monospace"
              fill={T.primary}
            >
              customer → customer_id
            </text>
            <text
              x="46"
              y="288"
              fontSize="11"
              fill={faultInjected ? T.danger : T.secondary}
            >
              {faultInjected
                ? "列名不在 schema：先拒绝"
                : "字段、关系、类型都可检查"}
            </text>
          </g>

          <line
            x1="244"
            y1="220"
            x2="278"
            y2="220"
            stroke={faultInjected ? T.danger : T.accent}
            strokeWidth="1.8"
            markerEnd={`url(#${faultInjected ? faultMarkerId : markerId})`}
          />
          <text
            x="261"
            y="207"
            textAnchor="middle"
            fontSize="11"
            fill={faultInjected ? T.danger : T.accent}
          >
            读规范
          </text>

          <g opacity={stageOpacity(1, activeStep)}>
            <rect
              x="280"
              y="124"
              width="176"
              height="190"
              rx="10"
              fill={T.bg}
              stroke={faultInjected ? T.danger : T.accent}
              strokeWidth={faultInjected ? "2" : "1.5"}
            />
            <rect
              x="280"
              y="124"
              width="176"
              height="34"
              rx="10"
              fill={T.accent}
              fillOpacity="0.12"
            />
            <rect
              x="280"
              y="148"
              width="176"
              height="10"
              fill={T.accent}
              fillOpacity="0.12"
            />
            <text
              x="368"
              y="147"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={T.accent}
            >
              元数据校验
            </text>
            <text
              x="298"
              y="184"
              fontSize="11"
              fontFamily="monospace"
              fill={T.primary}
            >
              class ✓
            </text>
            <text
              x="298"
              y="206"
              fontSize="11"
              fontFamily="monospace"
              fill={faultInjected ? T.danger : T.primary}
            >
              columns {faultInjected ? "✕" : "✓"}
            </text>
            <text
              x="298"
              y="228"
              fontSize="11"
              fontFamily="monospace"
              fill={T.primary}
            >
              relations ✓
            </text>
            <text
              x="298"
              y="250"
              fontSize="11"
              fontFamily="monospace"
              fill={T.primary}
            >
              types ✓
            </text>
            <rect
              x="298"
              y="266"
              width="140"
              height="28"
              rx="6"
              fill={faultInjected ? T.danger : T.success}
              fillOpacity="0.1"
              stroke={faultInjected ? T.danger : T.success}
              strokeWidth="1"
            />
            <text
              x="368"
              y="285"
              textAnchor="middle"
              fontSize="11"
              fill={faultInjected ? T.danger : T.success}
            >
              {faultInjected ? "reject spec" : "accept spec"}
            </text>
          </g>

          <line
            x1="458"
            y1="220"
            x2="492"
            y2="220"
            stroke={faultInjected ? T.danger : T.accent}
            strokeWidth="1.8"
            markerEnd={`url(#${faultInjected ? faultMarkerId : markerId})`}
          />
          <text
            x="475"
            y="207"
            textAnchor="middle"
            fontSize="11"
            fill={faultInjected ? T.danger : T.accent}
          >
            {faultInjected ? "停止" : "驱动"}
          </text>

          <g opacity={stageOpacity(2, activeStep)}>
            <rect
              x="494"
              y="124"
              width="176"
              height="190"
              rx="10"
              fill={T.bg}
              stroke={T.success}
              strokeWidth="1.5"
            />
            <rect
              x="494"
              y="124"
              width="176"
              height="34"
              rx="10"
              fill={T.success}
              fillOpacity="0.12"
            />
            <rect
              x="494"
              y="148"
              width="176"
              height="10"
              fill={T.success}
              fillOpacity="0.12"
            />
            <text
              x="582"
              y="147"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={T.success}
            >
              通用映射器
            </text>
            <text
              x="512"
              y="184"
              fontSize="11"
              fontFamily="monospace"
              fill={T.primary}
            >
              load(spec, row)
            </text>
            <text
              x="512"
              y="207"
              fontSize="11"
              fontFamily="monospace"
              fill={T.primary}
            >
              save(spec, object)
            </text>
            <text
              x="512"
              y="230"
              fontSize="11"
              fontFamily="monospace"
              fill={T.primary}
            >
              convert types
            </text>
            <text
              x="512"
              y="253"
              fontSize="11"
              fontFamily="monospace"
              fill={T.primary}
            >
              resolve relation
            </text>
            <text x="512" y="286" fontSize="11" fill={T.secondary}>
              一套机制，多种对象
            </text>
          </g>

          <line
            x1="672"
            y1="220"
            x2="706"
            y2="220"
            stroke={faultInjected ? T.danger : T.accent}
            strokeWidth="1.8"
            markerEnd={`url(#${faultInjected ? faultMarkerId : markerId})`}
          />
          <text
            x="689"
            y="207"
            textAnchor="middle"
            fontSize="11"
            fill={faultInjected ? T.danger : T.accent}
          >
            {activeStep === 3 ? "事务写回" : "恢复"}
          </text>

          <g opacity={stageOpacity(3, activeStep)}>
            <rect
              x="708"
              y="124"
              width="164"
              height="190"
              rx="10"
              fill={T.bg}
              stroke={faultInjected ? T.danger : T.warning}
              strokeWidth={faultInjected ? "2" : "1.5"}
            />
            <rect
              x="708"
              y="124"
              width="164"
              height="34"
              rx="10"
              fill={T.warning}
              fillOpacity="0.12"
            />
            <rect
              x="708"
              y="148"
              width="164"
              height="10"
              fill={T.warning}
              fillOpacity="0.12"
            />
            <text
              x="790"
              y="147"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={T.warning}
            >
              对象 ↔ 表
            </text>
            <text
              x="724"
              y="184"
              fontSize="11"
              fontFamily="monospace"
              fill={T.success}
            >
              Order {"{ id, total }"}
            </text>
            <text
              x="724"
              y="207"
              fontSize="11"
              fontFamily="monospace"
              fill={T.warning}
            >
              orders
            </text>
            <text
              x="724"
              y="230"
              fontSize="11"
              fontFamily="monospace"
              fill={T.primary}
            >
              order_id · amount_cents
            </text>
            <text
              x="724"
              y="253"
              fontSize="11"
              fontFamily="monospace"
              fill={T.primary}
            >
              customer_id
            </text>
            <text
              x="724"
              y="286"
              fontSize="11"
              fill={faultInjected ? T.danger : T.secondary}
            >
              {faultInjected ? "未执行：规范被拒" : "同一规范读 / 写"}
            </text>
          </g>

          {faultInjected && (
            <line
              x1="792"
              y1="240"
              x2="420"
              y2="240"
              stroke={T.danger}
              strokeWidth="1.4"
              strokeDasharray="6 4"
              markerEnd={`url(#${faultMarkerId})`}
            />
          )}

          <rect
            x="28"
            y="342"
            width="844"
            height="112"
            rx="10"
            fill={T.primary}
            fillOpacity="0.03"
            stroke={faultInjected ? T.danger : T.border}
            strokeWidth="1"
          />
          <text
            x="50"
            y="370"
            fontSize="12"
            fontWeight="700"
            fill={faultInjected ? T.danger : T.accent}
          >
            阶段 {activeStep} · {copy.status}
          </text>
          <text x="50" y="396" fontSize="11" fill={T.secondary}>
            {faultInjected
              ? "故障证据：MappingSpec 把 total 指向 total_cents，但 orders 只有 amount_cents；校验在对象创建前拒绝。"
              : copy.note}
          </text>
          <text
            x="50"
            y="422"
            fontSize="11"
            fill={faultInjected ? T.danger : T.secondary}
          >
            {faultInjected
              ? "修法：修正规范或迁移 schema，再用同一份校验测试重放；不能让通用映射器猜列名。"
              : "验收问题：若换 ORM 或数据库，是否仍能用这份映射规范回答同样的责任、类型和失败问题？"}
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={488}
            text="元数据映射的边界：规则可替换，校验与事务责任不可隐身"
          />
        </svg>

        {interactive && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {[1, 2, 3].map((value) => {
              const phase = value as Step;
              const active = phase === activeStep;
              return (
                <button
                  key={`control-${phase}`}
                  type="button"
                  onClick={() => setSelectedStep(phase)}
                  aria-pressed={active}
                  className={`rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                    active
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border text-secondary hover:border-accent hover:text-primary"
                  }`}
                >
                  {phase}. {STEP_COPY[phase].label}
                </button>
              );
            })}
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
              {faultInjected ? "关闭错误元数据" : "注入错误元数据"}
            </button>
          </div>
        )}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        元数据映射把对象、字段、关系和类型转换保存为可校验的规则，由通用映射器解释；它不替团队决定事务、身份和迁移边界。
      </figcaption>
    </figure>
  );
}

export function Poeaa24Pattern22MetadataMapping(
  props: Poeaa24Pattern22MetadataMappingDiagramProps,
) {
  return <Poeaa24Pattern22MetadataMappingDiagram {...props} />;
}

Object.assign(Poeaa24Pattern22MetadataMapping, {
  Diagram: Poeaa24Pattern22MetadataMappingDiagram,
});
