/**
 * <CseConnectionMgmtDiagram>：连接生命周期管理图。
 *
 * 展示一个 TCP 连接从建立到关闭的完整生命周期：
 *   listen → accept → read/write 循环 → close。
 * 左侧为状态机，右侧为连接对象的管理（Connection 对象池、fd 映射表）。
 * 底部标注连接管理的三个关键问题：半关闭、超时、资源泄漏。
 *
 * 纯静态展示，无交互。Server Component。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const STATES = [
  { label: "LISTEN", desc: "等待连接", color: "var(--accent)", y: 110 },
  { label: "ACCEPT", desc: "取出连接", color: "var(--accent)", y: 162 },
  { label: "ESTABLISHED", desc: "读写循环", color: "var(--success)", y: 214 },
  { label: "CLOSE_WAIT", desc: "对端关闭", color: "var(--warning)", y: 266 },
  { label: "CLOSED", desc: "释放资源", color: "var(--danger)", y: 318 },
];

export function CseConnectionMgmtDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="连接生命周期管理图。左侧状态机展示 TCP 连接从 LISTEN 到 ACCEPT 到 ESTABLISHED 到 CLOSE_WAIT 到 CLOSED 的状态流转。右侧展示连接对象池与文件描述符映射表。底部标注半关闭、超时、资源泄漏三个关键问题。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            连接生命周期管理
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            从 accept 到 close，每个状态都要正确处理
          </text>

          {/* 左侧：状态机 */}
          <text x="160" y="84" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">连接状态机</text>

          {STATES.map((s, i) => (
            <g key={s.label}>
              {/* 状态盒子 */}
              <rect x="60" y={s.y} width="200" height="36" rx="8" fill={s.color} fillOpacity="0.08" stroke={s.color} strokeWidth="1.2" />
              <text x="100" y={s.y + 23} textAnchor="middle" fontSize="12" fontWeight="700" fill={s.color}>{s.label}</text>
              <text x="195" y={s.y + 23} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{s.desc}</text>

              {/* 状态间箭头 */}
              {i < STATES.length - 1 && (
                <line x1="160" y1={s.y + 36} x2="160" y2={STATES[i + 1].y - 2} stroke="var(--text-secondary)" strokeWidth="1.2" markerEnd="url(#cm-arrow)" />
              )}
            </g>
          ))}

          {/* 箭头标记 */}
          <defs>
            <marker id="cm-arrow" markerWidth="8" markerHeight="8" refX="4" refY="6" orient="auto">
              <path d="M1,1 L4,6 L7,1" fill="none" stroke="var(--text-secondary)" strokeWidth="1.2" />
            </marker>
          </defs>

          {/* 右侧：连接对象管理 */}
          <text x="520" y="84" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">连接对象管理</text>

          {/* fd → Connection 映射表 */}
          <rect x="380" y="100" width="280" height="120" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="520" y="122" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">fd → Connection 映射表</text>
          <line x1="392" y1="130" x2="648" y2="130" stroke="var(--accent)" strokeWidth="0.6" strokeOpacity="0.3" />

          {[
            { fd: "fd 5", conn: "Connection{ ip, port, buf }", status: "active" },
            { fd: "fd 6", conn: "Connection{ ip, port, buf }", status: "active" },
            { fd: "fd 7", conn: "Connection{ ip, port, buf }", status: "idle" },
          ].map((row, i) => (
            <g key={row.fd}>
              <text x="400" y={150 + i * 22} fontSize="11" fill="var(--text-primary)" fontWeight="600">{row.fd}</text>
              <text x="448" y={150 + i * 22} fontSize="11" fill="var(--text-secondary)">{row.conn}</text>
            </g>
          ))}

          {/* 对象池 */}
          <rect x="380" y="236" width="280" height="90" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="520" y="258" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">连接对象池</text>
          <text x="395" y="280" fontSize="11" fill="var(--text-secondary)">新建连接 → 从池取 Connection 对象</text>
          <text x="395" y="298" fontSize="11" fill="var(--text-secondary)">连接关闭 → 归还到池（避免频繁 new/delete）</text>
          <text x="395" y="316" fontSize="11" fill="var(--text-secondary)">对象池大小 = 预估峰值连接数</text>

          {/* 底部：三个关键问题 */}
          <rect x="60" y="348" width={VIEW_W - 120} height="52" rx="10" fill="var(--danger)" fillOpacity="0.05" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="368" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">连接管理三大陷阱</text>
          <text x="160" y="388" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">半关闭：对端 close 后仍要读完残余数据</text>
          <text x="430" y="388" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">超时：空闲连接要设超时踢除</text>
          <text x="610" y="388" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">泄漏：fd 不够用</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        连接管理的核心是状态机正确流转。用 fd→Connection 映射表管理所有活跃连接，用对象池避免频繁分配。三个必踩的坑：半关闭残留、空闲连接超时、fd 泄漏。
      </figcaption>
    </figure>
  );
}
