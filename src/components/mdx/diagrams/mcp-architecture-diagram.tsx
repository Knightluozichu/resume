/**
 * <McpArchitectureDiagram>：MCP 的 Host / Client / Server 三层架构（HEL-319，第 10 章）。
 *
 * 一张静态 SVG：左边一个大「Host（AI 应用）」框，框内含 3 个「MCP Client」小框；
 * 每个 client 各有一条箭头连到右边对应的一个「MCP Server」框，server 再连向它包住的
 * 外部能力（文件 / 数据库 / API）。标清谁是谁：Host 是你装的 AI 应用，client 内嵌在
 * Host 里、一个 client 连一个 server；server 在外部、把某个工具或数据源的能力暴露出来。
 *
 * 纯展示 Server 组件（无交互、无 three、reduced-motion 无关）。
 * 配色全部走 DESIGN token（无裸 hex）；几何常量均具名且为 4 的倍数（硬规则 5）。
 * 几何自检：Host 大框与 client 子框是父子嵌套（脚本已滤），client/server 行间零重叠、
 * 文字中心落在自己框内、四周留白 ≥ 14px、字号 ≥ 10px、单一 y 公式。
 */

// —— 整体画布。 ——
const VIEW_W = 720;
const VIEW_H = 360;

// —— 左侧 Host 大框 + 内嵌 3 个 client。 ——
const HOST_X = 24;
const HOST_Y = 64;
const HOST_W = 244;
const HOST_H = 272; // 底 = 64 + 272 = 336 → 距底 24
const HOST_CX = HOST_X + HOST_W / 2;

// client 子框（在 Host 内竖直堆叠；单一 y 公式）。
const CLIENT_W = 196;
const CLIENT_H = 56;
const CLIENT_X = HOST_X + (HOST_W - CLIENT_W) / 2; // Host 内水平居中
const CLIENT_Y0 = HOST_Y + 56; // 第 0 个 client 顶（给 Host 标题留位）
const CLIENT_GAP = 16;

/** 第 i 个 client 顶 y（单一公式；底 client 底 = 120 + 2*72 + 56 = 320 → 距 Host 底 16px）。 */
function clientY(i: number): number {
  return CLIENT_Y0 + i * (CLIENT_H + CLIENT_GAP);
}
function clientCY(i: number): number {
  return clientY(i) + CLIENT_H / 2;
}

// —— 右侧 3 个 MCP Server（与 client 行对齐）。 ——
const SERVER_W = 200;
const SERVER_H = 56;
const SERVER_X = VIEW_W - SERVER_W - 24; // 496，距右 24
const SERVER_CX = SERVER_X + SERVER_W / 2;

const ROWS: readonly { client: string; server: string; cap: string }[] = [
  { client: "MCP Client A", server: "MCP Server", cap: "📁 文件系统" },
  { client: "MCP Client B", server: "MCP Server", cap: "🗂️ 数据库" },
  { client: "MCP Client C", server: "MCP Server", cap: "🔌 第三方 API" },
];

export function McpArchitectureDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="MCP 的 Host、Client、Server 三层架构图。左边是一个大框，代表 Host，也就是你安装使用的 AI 应用，比如 Claude 桌面端或某个 IDE。这个 Host 框里内嵌了三个小框，分别是 MCP Client A、B、C，每个 client 是 Host 内部专门负责连接一个外部能力的连接器。右边竖排三个 MCP Server，每个 server 在外部，分别把一种能力暴露出来：第一个 server 暴露文件系统，第二个 server 暴露数据库，第三个 server 暴露第三方 API。每个 client 各有一条箭头连到右边对应的那个 server，构成一一对应：一个 client 连一个 server。核心结论：Host 是 AI 应用本身，它内嵌若干 MCP Client；每个 client 连到外部一个 MCP Server；server 负责把某个工具或数据源的能力按标准暴露出来。应用要用某个外部能力，就多挂一个 client 连上对应的 server，即插即用。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="mcp-arch-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* —— 标题行 —— */}
          <text
            x={HOST_CX}
            y={44}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Host = AI 应用（内嵌 client）
          </text>
          <text
            x={SERVER_CX}
            y={44}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            MCP Server（暴露外部能力）
          </text>

          {/* —— client → server 连线（先画，压在框下）—— */}
          {ROWS.map((_, i) => (
            <line
              key={`arch-line-${i}`}
              x1={CLIENT_X + CLIENT_W}
              y1={clientCY(i)}
              x2={SERVER_X - 4}
              y2={clientCY(i)}
              stroke="var(--accent)"
              strokeWidth="1.6"
              markerEnd="url(#mcp-arch-arrow)"
            />
          ))}

          {/* —— Host 大框 —— */}
          <rect
            x={HOST_X}
            y={HOST_Y}
            width={HOST_W}
            height={HOST_H}
            rx="14"
            fill="var(--accent-glow)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x={HOST_CX}
            y={HOST_Y + 30}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            🖥️ Host（如 Claude 桌面端 / IDE）
          </text>

          {/* —— Host 内的 3 个 client 子框 —— */}
          {ROWS.map((row, i) => (
            <g key={`client-${i}`}>
              <rect
                x={CLIENT_X}
                y={clientY(i)}
                width={CLIENT_W}
                height={CLIENT_H}
                rx="8"
                fill="var(--bg)"
                stroke="var(--accent)"
                strokeWidth="1.4"
              />
              <text
                x={CLIENT_X + CLIENT_W / 2}
                y={clientCY(i) - 4}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="var(--accent)"
              >
                {row.client}
              </text>
              <text
                x={CLIENT_X + CLIENT_W / 2}
                y={clientCY(i) + 16}
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                连一个 server 的连接器
              </text>
            </g>
          ))}

          {/* —— 右侧 3 个 server 框 —— */}
          {ROWS.map((row, i) => (
            <g key={`server-${i}`}>
              <rect
                x={SERVER_X}
                y={clientY(i)}
                width={SERVER_W}
                height={SERVER_H}
                rx="8"
                fill="var(--bg)"
                stroke="var(--border)"
                strokeWidth="1.4"
              />
              <text
                x={SERVER_CX}
                y={clientCY(i) - 4}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="var(--text-primary)"
              >
                {`${row.server} · ${row.cap}`}
              </text>
              <text
                x={SERVER_CX}
                y={clientCY(i) + 16}
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                把这个能力按标准暴露出来
              </text>
            </g>
          ))}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        MCP 三层：<strong>Host</strong> 是你用的 AI 应用，里面内嵌若干{" "}
        <strong>MCP Client</strong>；每个 client 连到一个外部的{" "}
        <strong>MCP Server</strong>，由 server
        把某个工具或数据源的能力按标准暴露出来。要多接一个能力，就多挂一对 client–server。
      </figcaption>
    </figure>
  );
}
