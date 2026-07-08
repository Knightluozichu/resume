/**
 * <DnjFinalReviewDiagram>：全书总复习知识图谱图解。
 * 纯静态展示，无交互。Server Component。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function DnjFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="深入浅出Node.js全书总复习知识图谱"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            深入浅出 Node.js 全书知识图谱
          </text>

          {/* 中心节点 */}
          <circle cx="370" cy="250" r="56" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="2" />
          <text x="370" y="246" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">Node.js</text>
          <text x="370" y="262" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">运行时内核</text>

          {/* 八个知识域 */}
          {(() => {
            const cx = 370;
            const cy = 250;
            const r = 160;
            const nodes = [
              { label: "V8 引擎", desc: "JIT/隐藏类/GC", color: "var(--danger)", angle: -90 },
              { label: "事件循环", desc: "六阶段/微任务", color: "var(--warning)", angle: -45 },
              { label: "异步编程", desc: "Promise/async", color: "var(--success)", angle: 0 },
              { label: "Stream", desc: "背压/管道", color: "var(--accent)", angle: 45 },
              { label: "TCP/HTTP", desc: "连接池/Keep-Alive", color: "var(--danger)", angle: 90 },
              { label: "WebSocket", desc: "握手/帧/全双工", color: "var(--warning)", angle: 135 },
              { label: "NPM 模块", desc: "semver/peer deps", color: "var(--success)", angle: 180 },
              { label: "测试部署", desc: "Jest/PM2/Docker", color: "var(--accent)", angle: 225 },
            ];
            return nodes.map((n, i) => {
              const rad = (n.angle * Math.PI) / 180;
              const x = cx + r * Math.cos(rad);
              const y = cy + r * Math.sin(rad);
              return (
                <g key={i}>
                  <line x1={cx + 56 * Math.cos(rad)} y1={cy + 56 * Math.sin(rad)} x2={x - 36 * Math.cos(rad)} y2={y - 36 * Math.sin(rad)} stroke={n.color} strokeWidth="1.2" strokeOpacity="0.4" strokeDasharray="3 2" />
                  <circle cx={x} cy={y} r="40" fill={n.color} fillOpacity="0.1" stroke={n.color} strokeWidth="1.5" />
                  <text x={x} y={y - 4} textAnchor="middle" fontSize="10" fontWeight="600" fill={n.color}>{n.label}</text>
                  <text x={x} y={y + 10} textAnchor="middle" fontSize="8" fill="var(--text-secondary)">{n.desc}</text>
                </g>
              );
            });
          })()}

          {/* 底部关键脉络 */}
          <rect x="40" y="420" width="660" height="44" rx="6" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="440" textAnchor="middle" fontSize="10" fill="var(--accent)">
            核心脉络：V8 编译执行 → 事件循环调度 → 异步编程范式 → 流式 I/O → 网络通信 → 模块生态 → 工程化部署
          </text>
          <text x={VIEW_W / 2} y="456" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            判断力：单线程不阻塞 / 背压防内存爆 / 连接复用降延迟 / 优雅关闭零停机
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        深入浅出 Node.js 全书总复习——八大知识域以运行时内核为中心的知识图谱
      </figcaption>
    </figure>
  );
}
