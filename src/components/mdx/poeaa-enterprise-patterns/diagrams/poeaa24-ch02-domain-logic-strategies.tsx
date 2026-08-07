/**
 * <Poeaa24Ch02DomainLogicStrategies>：领域逻辑三种组织策略对比图（POEAA 第2章）。
 *
 * 并排展示 Transaction Script / Domain Model / Table Module 三种策略：
 *   - 各自的核心思想、适用场景、代价
 *   - 底部标注复杂度增长时的迁移方向
 *
 * 纯静态展示，无交互。Server Component。
 */

import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 460;

const PANEL_W = 208;
const PANEL_H = 300;
const PANEL_Y = 72;
const GAP = 16;
const START_X = 32;

const STRATEGIES = [
  {
    title: "事务脚本",
    en: "Transaction Script",
    color: "#3FB97F",
    idea: "一个用例 = 一个过程",
    structure: "线性步骤序列",
    fit: "规则少、分支少",
    cost: "规则增长后重复爆炸",
    example: "if/else 流程式处理",
  },
  {
    title: "领域模型",
    en: "Domain Model",
    color: T.accent,
    idea: "业务规则 = 对象协作",
    structure: "对象网络 + 多态",
    fit: "规则复杂、频繁变化",
    cost: "学习曲线 + 映射开销",
    example: "Order.calculateTotal()",
  },
  {
    title: "表模块",
    en: "Table Module",
    color: "#E5B567",
    idea: "一个类管一张表的所有行",
    structure: "面向记录集的方法",
    fit: "结构化查询为主",
    cost: "复杂规则难以表达",
    example: "OrderTable.findByStatus()",
  },
] as const;

export function Poeaa24Ch02DomainLogicStrategiesDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="领域逻辑三种组织策略对比。覆盖第2章 组织领域逻辑、2.1 抉择、2.2 服务层。左：事务脚本，一个用例等于一个过程，适合规则少的场景，代价是规则增长后重复爆炸。中：领域模型，业务规则通过对象协作表达，适合规则复杂且频繁变化的场景，代价是学习曲线和映射开销。右：表模块，一个类管理一张表的所有行，适合结构化查询为主的场景，代价是复杂规则难以表达。底部标注迁移方向：规则增长时从事务脚本向领域模型迁移。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle x={VIEW_W / 2} y={40} text="组织领域逻辑的三种策略" />

          {STRATEGIES.map((s, i) => {
            const px = START_X + i * (PANEL_W + GAP);
            return (
              <g key={s.title}>
                {/* 面板 */}
                <rect
                  x={px}
                  y={PANEL_Y}
                  width={PANEL_W}
                  height={PANEL_H}
                  rx="10"
                  fill={s.color}
                  fillOpacity="0.04"
                  stroke={s.color}
                  strokeWidth="1.5"
                />
                {/* 标题 */}
                <text
                  x={px + PANEL_W / 2}
                  y={PANEL_Y + 24}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fill={s.color}
                >
                  {s.title}
                </text>
                <text
                  x={px + PANEL_W / 2}
                  y={PANEL_Y + 42}
                  textAnchor="middle"
                  fontSize="11"
                  fill={T.secondary}
                >
                  {s.en}
                </text>
                <line
                  x1={px}
                  y1={PANEL_Y + 52}
                  x2={px + PANEL_W}
                  y2={PANEL_Y + 52}
                  stroke={s.color}
                  strokeWidth="0.8"
                  strokeOpacity="0.4"
                />
                {/* 核心思想 */}
                <text
                  x={px + 14}
                  y={PANEL_Y + 74}
                  fontSize="11"
                  fontWeight="600"
                  fill={T.primary}
                >
                  核心思想
                </text>
                <text
                  x={px + 14}
                  y={PANEL_Y + 92}
                  fontSize="11"
                  fill={T.secondary}
                >
                  {s.idea}
                </text>
                {/* 结构 */}
                <text
                  x={px + 14}
                  y={PANEL_Y + 118}
                  fontSize="11"
                  fontWeight="600"
                  fill={T.primary}
                >
                  代码结构
                </text>
                <text
                  x={px + 14}
                  y={PANEL_Y + 136}
                  fontSize="11"
                  fill={T.secondary}
                >
                  {s.structure}
                </text>
                {/* 适用 */}
                <text
                  x={px + 14}
                  y={PANEL_Y + 162}
                  fontSize="11"
                  fontWeight="600"
                  fill={T.primary}
                >
                  适用场景
                </text>
                <text
                  x={px + 14}
                  y={PANEL_Y + 180}
                  fontSize="11"
                  fill={T.secondary}
                >
                  {s.fit}
                </text>
                {/* 代价 */}
                <text
                  x={px + 14}
                  y={PANEL_Y + 206}
                  fontSize="11"
                  fontWeight="600"
                  fill={T.primary}
                >
                  代价
                </text>
                <text
                  x={px + 14}
                  y={PANEL_Y + 224}
                  fontSize="11"
                  fill={T.danger}
                >
                  {s.cost}
                </text>
                {/* 示例 */}
                <text
                  x={px + 14}
                  y={PANEL_Y + 254}
                  fontSize="11"
                  fontWeight="600"
                  fill={T.primary}
                >
                  典型代码
                </text>
                <text
                  x={px + 14}
                  y={PANEL_Y + 274}
                  fontSize="11"
                  fill={s.color}
                  fontFamily="monospace"
                >
                  {s.example}
                </text>
              </g>
            );
          })}

          {/* 底部迁移方向 */}
          <line
            x1={32}
            y1={PANEL_Y + PANEL_H + 24}
            x2={688}
            y2={PANEL_Y + PANEL_H + 24}
            stroke={T.border}
            strokeWidth="1"
          />
          <text
            x={VIEW_W / 2}
            y={PANEL_Y + PANEL_H + 48}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill={T.primary}
          >
            迁移方向：规则增长 → 从事务脚本向领域模型演进
          </text>

          {/* 复杂度轴 */}
          <defs>
            <marker
              id="ch02-axis"
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
            >
              <path d="M0 0 L7 4 L0 8 z" fill={T.secondary} />
            </marker>
          </defs>
          <line
            x1={80}
            y1={PANEL_Y + PANEL_H + 68}
            x2={640}
            y2={PANEL_Y + PANEL_H + 68}
            stroke={T.secondary}
            strokeWidth="1.2"
            markerEnd="url(#ch02-axis)"
          />
          <text
            x={80}
            y={PANEL_Y + PANEL_H + 84}
            fontSize="11"
            fill={T.secondary}
          >
            简单
          </text>
          <text
            x={620}
            y={PANEL_Y + PANEL_H + 84}
            fontSize="11"
            fill={T.secondary}
          >
            复杂
          </text>
          {/* 区间标注 */}
          <text
            x={160}
            y={PANEL_Y + PANEL_H + 64}
            textAnchor="middle"
            fontSize="11"
            fill="#3FB97F"
          >
            事务脚本
          </text>
          <text
            x={360}
            y={PANEL_Y + PANEL_H + 64}
            textAnchor="middle"
            fontSize="11"
            fill="#E5B567"
          >
            表模块
          </text>
          <text
            x={560}
            y={PANEL_Y + PANEL_H + 64}
            textAnchor="middle"
            fontSize="11"
            fill={T.accent}
          >
            领域模型
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 12}
            text="没有最好的策略，只有最匹配当前复杂度的策略——关键是知道何时该迁移"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        事务脚本适合简单用例，领域模型适合复杂规则，表模块适合结构化查询。
        随着业务规则增长，代码会自然从事务脚本向领域模型迁移。
      </figcaption>
    </figure>
  );
}
