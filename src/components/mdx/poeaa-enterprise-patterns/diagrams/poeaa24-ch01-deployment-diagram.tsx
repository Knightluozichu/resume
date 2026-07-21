/**
 * <Poeaa24Ch01DeploymentDiagram>：层到部署位置的映射图（POEAA 第1章）。
 *
 * 展示三层架构如何映射到物理部署节点：
 *   - 表示层 → 浏览器 / 移动客户端
 *   - 领域层 → 应用服务器
 *   - 数据源层 → 数据库服务器
 * 标注层间通信协议和可能的合并/拆分选择。
 *
 * 纯静态展示，无交互。Server Component。
 */

import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 400;

// 三个部署节点
const NODE_W = 180;
const NODE_H = 120;
const NODE_Y = 100;
const NODES = [
  {
    x: 48,
    label: "客户端",
    en: "Browser / Mobile",
    color: T.accent,
    layer: "表示层",
    items: ["HTML/CSS/JS", "视图渲染", "用户输入"],
  },
  {
    x: 270,
    label: "应用服务器",
    en: "App Server",
    color: "#3FB97F",
    layer: "领域层 + 部分表示层",
    items: ["业务规则", "请求路由", "会话管理"],
  },
  {
    x: 492,
    label: "数据库服务器",
    en: "DB Server",
    color: "#E5B567",
    layer: "数据源层",
    items: ["SQL 执行", "事务管理", "持久存储"],
  },
] as const;

export function Poeaa24Ch01DeploymentDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="层到部署位置的映射图。左侧客户端承载表示层，中间应用服务器承载领域层和部分表示层（控制器），右侧数据库服务器承载数据源层。层间通过 HTTP 和 SQL/JDBC 通信。标注了可能的合并选择：小规模应用可将领域层和数据源层合并到同一进程。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle x={VIEW_W / 2} y={40} text="层 → 部署位置映射" />
          <text
            x={VIEW_W / 2}
            y={60}
            textAnchor="middle"
            fontSize="11"
            fill={T.secondary}
          >
            逻辑分层不等于物理分离——小规模可合并，大规模可进一步拆分
          </text>

          {/* 部署节点 */}
          {NODES.map((node) => (
            <g key={node.label}>
              {/* 节点框 */}
              <rect
                x={node.x}
                y={NODE_Y}
                width={NODE_W}
                height={NODE_H}
                rx="10"
                fill={node.color}
                fillOpacity="0.05"
                stroke={node.color}
                strokeWidth="1.8"
              />
              {/* 节点标题 */}
              <text
                x={node.x + NODE_W / 2}
                y={NODE_Y + 24}
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
                fill={node.color}
              >
                {node.label}
              </text>
              <text
                x={node.x + NODE_W / 2}
                y={NODE_Y + 40}
                textAnchor="middle"
                fontSize="10"
                fill={T.secondary}
              >
                {node.en}
              </text>
              {/* 承载的层 */}
              <rect
                x={node.x + 12}
                y={NODE_Y + 50}
                width={NODE_W - 24}
                height={20}
                rx="4"
                fill={node.color}
                fillOpacity="0.12"
              />
              <text
                x={node.x + NODE_W / 2}
                y={NODE_Y + 64}
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fill={node.color}
              >
                {node.layer}
              </text>
              {/* 内容项 */}
              {node.items.map((item, j) => (
                <text
                  key={item}
                  x={node.x + 16}
                  y={NODE_Y + 84 + j * 14}
                  fontSize="10"
                  fill={T.secondary}
                >
                  · {item}
                </text>
              ))}
            </g>
          ))}

          {/* 连接线 + 协议标注 */}
          <defs>
            <marker
              id="ch01-dep-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
            >
              <path d="M0 0 L7 4 L0 8 z" fill={T.secondary} />
            </marker>
          </defs>

          {/* 客户端 → 应用服务器 */}
          <line
            x1={48 + NODE_W}
            y1={NODE_Y + NODE_H / 2}
            x2={270}
            y2={NODE_Y + NODE_H / 2}
            stroke={T.secondary}
            strokeWidth="1.5"
            markerEnd="url(#ch01-dep-arrow)"
          />
          <text
            x={(48 + NODE_W + 270) / 2}
            y={NODE_Y + NODE_H / 2 - 10}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={T.primary}
          >
            HTTP / HTTPS
          </text>

          {/* 应用服务器 → 数据库 */}
          <line
            x1={270 + NODE_W}
            y1={NODE_Y + NODE_H / 2}
            x2={492}
            y2={NODE_Y + NODE_H / 2}
            stroke={T.secondary}
            strokeWidth="1.5"
            markerEnd="url(#ch01-dep-arrow)"
          />
          <text
            x={(270 + NODE_W + 492) / 2}
            y={NODE_Y + NODE_H / 2 - 10}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={T.primary}
          >
            SQL / JDBC
          </text>

          {/* 底部选择说明 */}
          <line
            x1={48}
            y1={280}
            x2={672}
            y2={280}
            stroke={T.border}
            strokeWidth="1"
          />

          {/* 合并选择 */}
          <text
            x={48}
            y={304}
            fontSize="12"
            fontWeight="600"
            fill={T.primary}
          >
            部署选择轴：
          </text>
          <text x={48} y={326} fontSize="11" fill={T.secondary}>
            · 单体：三层同进程（开发简单，适合小团队）
          </text>
          <text x={48} y={346} fontSize="11" fill={T.secondary}>
            · 经典：表示+领域在应用服务器，数据源独立（最常见）
          </text>
          <text x={48} y={366} fontSize="11" fill={T.secondary}>
            · 微服务：领域层按业务拆分多个服务，各自带数据源（复杂度最高）
          </text>

          <DiagramCaption
            x={VIEW_W / 2}
            y={VIEW_H - 12}
            text="逻辑分层是设计决策，物理部署是运维决策——两者独立但相互约束"
          />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        逻辑层到物理节点的映射不是固定的。单体应用三层同进程；经典部署把表示+领域放在应用服务器；
        微服务则进一步拆分领域层。选择取决于团队规模、流量和运维能力。
      </figcaption>
    </figure>
  );
}
