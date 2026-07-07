/**
 * <CseTimerWheelDiagram>：时间轮定时器原理图。
 *
 * 左侧展示时间轮的结构：一个环形数组，每个槽位（slot）挂一个定时器链表，
 * 指针每 tick 旋转一格，转到哪个槽就执行该槽的所有定时器。
 * 右侧对比三种定时器方案的复杂度：红黑树、最小堆、时间轮。
 *
 * 纯静态展示，无交互。Server Component。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const SLOTS = 8;
const CENTER_X = 150;
const CENTER_Y = 200;
const RADIUS = 80;

const slotAngle = (i: number) => (i * 2 * Math.PI) / SLOTS - Math.PI / 2;
const slotX = (i: number) => CENTER_X + RADIUS * Math.cos(slotAngle(i));
const slotY = (i: number) => CENTER_Y + RADIUS * Math.sin(slotAngle(i));

export function CseTimerWheelDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="时间轮定时器原理图。左侧展示一个 8 槽的时间轮，指针每 tick 旋转一格，槽位上挂定时器链表。右侧对比红黑树、最小堆、时间轮三种方案的添加、删除、到期复杂度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            时间轮：O(1) 定时器
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            指针转一圈，过期定时器自然浮现
          </text>

          {/* ===== 左侧：时间轮 ===== */}
          <text x={CENTER_X} y="88" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">时间轮结构</text>

          {/* 外圆 */}
          <circle cx={CENTER_X} cy={CENTER_Y} r={RADIUS + 16} fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />

          {/* 槽位 */}
          {Array.from({ length: SLOTS }).map((_, i) => {
            const x = slotX(i);
            const y = slotY(i);
            const isCurrent = i === 0;
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="16" fill={isCurrent ? "var(--accent)" : "var(--bg)"} fillOpacity={isCurrent ? "0.15" : "1"} stroke={isCurrent ? "var(--accent)" : "var(--border)"} strokeWidth="1.2" />
                <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fontWeight={isCurrent ? "700" : "400"} fill={isCurrent ? "var(--accent)" : "var(--text-secondary)"}>{i}</text>
                {/* 链表示意：槽 2 有 2 个定时器 */}
                {i === 2 && (
                  <g>
                    <rect x={x + 18} y={y - 12} width="28" height="18" rx="4" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
                    <text x={x + 32} y={y} textAnchor="middle" fontSize="10" fill="var(--success)">T1</text>
                    <rect x={x + 48} y={y - 12} width="28" height="18" rx="4" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
                    <text x={x + 62} y={y} textAnchor="middle" fontSize="10" fill="var(--success)">T2</text>
                    <line x1={x + 16} y1={y} x2={x + 18} y2={y} stroke="var(--text-secondary)" strokeWidth="1" />
                    <line x1={x + 46} y1={y} x2={x + 48} y2={y} stroke="var(--text-secondary)" strokeWidth="1" />
                  </g>
                )}
              </g>
            );
          })}

          {/* 中心指针 */}
          <line x1={CENTER_X} y1={CENTER_Y} x2={slotX(0)} y2={slotY(0)} stroke="var(--accent)" strokeWidth="2" />
          <circle cx={CENTER_X} cy={CENTER_Y} r="6" fill="var(--accent)" />
          <text x={CENTER_X} y={CENTER_Y + 4} textAnchor="middle" fontSize="10" fill="var(--bg)" fontWeight="700">→</text>

          {/* tick 标注 */}
          <text x={CENTER_X} y={CENTER_Y + RADIUS + 40} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">每 tick 旋转一格（顺时针）</text>

          {/* ===== 右侧：复杂度对比 ===== */}
          <text x="500" y="88" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">三种方案复杂度对比</text>

          {/* 表头 */}
          <rect x="350" y="100" width="320" height="28" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="420" y="119" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">方案</text>
          <text x="520" y="119" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">添加</text>
          <text x="600" y="119" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">删除</text>
          <text x="650" y="119" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">到期</text>

          {/* 红黑树 */}
          <rect x="350" y="134" width="320" height="28" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="0.8" />
          <text x="420" y="153" textAnchor="middle" fontSize="11" fill="var(--danger)">红黑树</text>
          <text x="520" y="153" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">O(log n)</text>
          <text x="600" y="153" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">O(log n)</text>
          <text x="650" y="153" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">O(1)</text>

          {/* 最小堆 */}
          <rect x="350" y="166" width="320" height="28" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="0.8" />
          <text x="420" y="185" textAnchor="middle" fontSize="11" fill="var(--warning)">最小堆</text>
          <text x="520" y="185" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">O(log n)</text>
          <text x="600" y="185" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">O(log n)</text>
          <text x="650" y="185" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">O(1)</text>

          {/* 时间轮 */}
          <rect x="350" y="198" width="320" height="28" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="420" y="217" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">时间轮</text>
          <text x="520" y="217" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">O(1)</text>
          <text x="600" y="217" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">O(1)</text>
          <text x="650" y="217" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">O(1)</text>

          {/* 说明 */}
          <rect x="350" y="240" width="320" height="80" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="360" y="258" fontSize="11" fill="var(--text-secondary)">原理：定时器超时时间 = 轮次 × N × tick + 槽位</text>
          <text x="360" y="274" fontSize="11" fill="var(--text-secondary)">- 添加：算槽位，挂到链表头 → O(1)</text>
          <text x="360" y="290" fontSize="11" fill="var(--text-secondary)">- 删除：从链表摘除 → O(1)（双向链表）</text>
          <text x="360" y="306" fontSize="11" fill="var(--text-secondary)">- 到期：指针转到，遍历链表 → O(1) 均摊</text>

          {/* 底部总结 */}
          <rect x="60" y="344" width={VIEW_W - 120} height="48" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="364" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">适用场景</text>
          <text x={VIEW_W / 2} y="382" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">海量短连接超时管理（如 TCP keepalive、心跳检测），定时器增删极频繁，时间轮的 O(1) 优势巨大</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        时间轮用环形数组 + 链表实现 O(1) 添加/删除/到期检测。指针每 tick 旋转一格，转到哪个槽就处理哪个槽的定时器。适合海量定时器场景。
      </figcaption>
    </figure>
  );
}
