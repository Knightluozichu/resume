/**
 * <NdgFinalReviewDiagram>：全书总复习知识图谱图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function NdgFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Node.js权威指南全书总复习知识图谱图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Node.js权威指南全书知识图谱
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            从「一次 HTTP 请求」串联全书十个知识点
          </text>

          {/* 中心：一次 HTTP 请求 */}
          <ellipse cx="370" cy="260" rx="90" ry="40" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="2" />
          <text x="370" y="256" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">一次 HTTP 请求</text>
          <text x="370" y="274" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">req → 处理 → res</text>

          {/* 八个知识点环绕 */}
          {(() => {
            const cx = 370;
            const cy = 260;
            const r = 175;
            const nodes = [
              { name: "事件循环", desc: "六阶段调度", color: "var(--success)", angle: -90 },
              { name: "模块系统", desc: "require/ESM", color: "var(--warning)", angle: -45 },
              { name: "HTTP 服务器", desc: "req/res 流", color: "var(--accent)", angle: 0 },
              { name: "流与管道", desc: "Readable/Write", color: "var(--danger)", angle: 45 },
              { name: "Buffer/fs", desc: "二进制+文件", color: "var(--success)", angle: 90 },
              { name: "TCP/TLS", desc: "传输+加密", color: "var(--warning)", angle: 135 },
              { name: "集群/Worker", desc: "多进程/线程", color: "var(--accent)", angle: 180 },
              { name: "性能调试", desc: "Profile/Heap", color: "var(--danger)", angle: 225 },
            ];
            return nodes.map((n, i) => {
              const rad = (n.angle * Math.PI) / 180;
              const x = cx + r * Math.cos(rad);
              const y = cy + r * Math.sin(rad);
              return (
                <g key={i}>
                  <line x1={cx} y1={cy} x2={x} y2={y} stroke="var(--text-tertiary)" strokeWidth="1" strokeOpacity="0.3" />
                  <rect x={x - 65} y={y - 22} width="130" height="44" rx="8" fill={n.color} fillOpacity="0.12" stroke={n.color} strokeWidth="1.2" />
                  <text x={x} y={y - 4} textAnchor="middle" fontSize="10" fontWeight="600" fill={n.color}>{n.name}</text>
                  <text x={x} y={y + 12} textAnchor="middle" fontSize="8" fill="var(--text-secondary)">{n.desc}</text>
                </g>
              );
            });
          })()}

          {/* 底部：旅程说明 */}
          <rect x="30" y="420" width="680" height="44" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="440" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            ①模块加载 → ②事件循环调度 → ③TCP建立 → ④HTTP解析(req流) → ⑤Buffer读body → ⑥fs处理
          </text>
          <text x="370" y="456" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            ⑦流式res输出 → ⑧集群分发 → ⑨Profile监控 → 完整闭环
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书总复习知识图谱——以一次HTTP请求为主线串联事件循环、模块系统、流、Buffer、TCP/TLS、集群、性能调试
      </figcaption>
    </figure>
  );
}
