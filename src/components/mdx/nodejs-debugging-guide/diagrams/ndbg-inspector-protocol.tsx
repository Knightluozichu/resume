/**
 * <NdbgInspectorProtocolDiagram>：Inspector Protocol 三层通信架构图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 420;

export function NdbgInspectorProtocolDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Inspector Protocol 三层通信架构图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Inspector Protocol 三层通信架构
          </text>

          {/* 第一层：HTTP 发现 */}
          <rect x="40" y="50" width="660" height="80" rx="10" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="60" y="72" fontSize="13" fontWeight="600" fill="var(--success)">第一层：HTTP 发现</text>
          <rect x="60" y="82" width="200" height="36" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="160" y="98" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">GET /json</text>
          <text x="160" y="112" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">返回 WebSocket URL + 元信息</text>
          <rect x="280" y="82" width="200" height="36" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="380" y="98" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">GET /json/version</text>
          <text x="380" y="112" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">返回 V8/Node 版本</text>
          <rect x="500" y="82" width="180" height="36" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="590" y="98" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">chrome://inspect</text>
          <text x="590" y="112" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">自动轮询发现目标</text>

          {/* 连接箭头 */}
          <line x1="370" y1="134" x2="370" y2="162" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <polygon points="365,158 375,158 370,168" fill="var(--text-tertiary)" />
          <text x="390" y="152" fontSize="10" fill="var(--text-tertiary)">拿到 ws:// URL</text>

          {/* 第二层：WebSocket 通道 */}
          <rect x="40" y="172" width="660" height="72" rx="10" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="60" y="194" fontSize="13" fontWeight="600" fill="var(--accent)">第二层：WebSocket 通道</text>
          <rect x="100" y="204" width="240" height="30" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="220" y="223" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">DevTools / 调试器</text>
          <rect x="400" y="204" width="240" height="30" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="520" y="223" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Node.js 进程</text>
          <line x1="340" y1="219" x2="400" y2="219" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="4 3" />
          <polygon points="396,215 404,219 396,223" fill="var(--accent)" />
          <polygon points="344,215 336,219 344,223" fill="var(--accent)" />
          <text x="370" y="214" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">JSON-RPC 双向</text>

          {/* 连接箭头 */}
          <line x1="370" y1="248" x2="370" y2="276" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <polygon points="365,272 375,272 370,282" fill="var(--text-tertiary)" />
          <text x="390" y="266" fontSize="10" fill="var(--text-tertiary)">消息按域组织</text>

          {/* 第三层：V8 Inspector 域 */}
          <rect x="40" y="286" width="660" height="100" rx="10" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="60" y="308" fontSize="13" fontWeight="600" fill="var(--warning)">第三层：V8 Inspector 域</text>

          <rect x="60" y="318" width="140" height="56" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="130" y="336" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">Runtime</text>
          <text x="130" y="352" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">evaluate</text>
          <text x="130" y="364" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">getProperties</text>

          <rect x="215" y="318" width="140" height="56" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="285" y="336" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">Debugger</text>
          <text x="285" y="352" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">setBreakpoint</text>
          <text x="285" y="364" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">pause/resume</text>

          <rect x="370" y="318" width="140" height="56" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="440" y="336" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">Profiler</text>
          <text x="440" y="352" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">start/stop</text>
          <text x="440" y="364" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">CPU 采样</text>

          <rect x="525" y="318" width="155" height="56" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="602" y="336" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">HeapProfiler</text>
          <text x="602" y="352" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">takeHeapSnapshot</text>
          <text x="602" y="364" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">堆快照</text>

          <text x={VIEW_W / 2} y="408" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：HTTP 发现 WebSocket URL → WebSocket 传 JSON-RPC → 按域分发命令
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Inspector Protocol 三层架构——HTTP 发现、WebSocket 通道、V8 Inspector 域
      </figcaption>
    </figure>
  );
}
