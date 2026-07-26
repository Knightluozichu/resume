/**
 * <Jg1YoungGcDiagram>：Young GC源码分析——执行流程与evacuation图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 540;

export function Jg1YoungGcDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Young GC源码分析——执行流程与evacuation图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            G1 Young GC 执行流程
          </text>

          <defs>
            <marker id="arrYg" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="var(--text-tertiary)" />
            </marker>
          </defs>

          {/* 流程步骤 */}
          {[
            { y: 56, label: "① 安全点暂停", desc: "Mutator 线程进入 STW", color: "var(--danger)" },
            { y: 116, label: "② 根扫描", desc: "GC Roots: 线程栈/静态字段/JNI", color: "var(--warning)" },
            { y: 176, label: "③ RSet 扫描", desc: "扫描 Old→Young 跨代引用 Card", color: "var(--accent)" },
            { y: 236, label: "④ 更新 RSets", desc: "处理 DCQ 中积压的 dirty Card", color: "var(--accent)" },
            { y: 296, label: "⑤ 对象复制（evacuation）", desc: "Eden/Survivor 存活对象 → 新 Region", color: "var(--success)" },
            { y: 356, label: "⑥ 引用处理", desc: "Soft/Weak/Phantom Reference", color: "var(--warning)" },
            { y: 416, label: "⑦ 重置与统计", desc: "清空 Eden Region → Free List", color: "var(--danger)" },
          ].map((s, i) => (
            <g key={i}>
              <rect x="40" y={s.y} width="660" height="48" rx="6" fill={s.color} fillOpacity="0.10" stroke={s.color} strokeWidth="1.2" />
              <text x="60" y={s.y + 22} fontSize="12" fontWeight="600" fill={s.color}>{s.label}</text>
              <text x="60" y={s.y + 38} fontSize="11" fill="var(--text-secondary)">{s.desc}</text>
              {i < 6 && <line x1="370" y1={s.y + 48} x2="370" y2={s.y + 56} stroke="var(--text-tertiary)" strokeWidth="1.5" markerEnd="url(#arrYg)" />}
            </g>
          ))}

          {/* evacuation详细图解 */}
          <text x="40" y="488" fontSize="13" fontWeight="600" fill="var(--success)">evacuation 对象复制决策</text>
          <rect x="40" y="500" width="660" height="30" rx="4" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="55" y="520" fontSize="11" fill="var(--text-secondary)">存活对象 → 年龄 &lt; MaxTenuringThreshold 且 Survivor 有空间 → 复制到 Survivor Region | 否则 → 晋升到 Old Region</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        G1 Young GC执行流程——安全点暂停、根扫描、RSet扫描、DCQ处理、evacuation对象复制、引用处理、重置七步
      </figcaption>
    </figure>
  );
}
