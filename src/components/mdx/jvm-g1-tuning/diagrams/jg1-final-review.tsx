/**
 * <Jg1FinalReviewDiagram>：全书复习——三种GC回收路径对比与知识闭环图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 540;

export function Jg1FinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="全书复习——三种GC回收路径对比与知识闭环图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            G1 三种回收路径对比与知识闭环
          </text>

          {/* 三种GC对比表 */}
          <text x="40" y="58" fontSize="13" fontWeight="600" fill="var(--accent)">三种回收路径对比</text>

          {/* 表头 */}
          <rect x="40" y="72" width="670" height="28" rx="4" fill="var(--text-primary)" fillOpacity="0.10" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="80" y="90" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">维度</text>
          <text x="230" y="90" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">Young GC</text>
          <text x="420" y="90" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">Mixed GC</text>
          <text x="600" y="90" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">Full GC</text>

          {/* 行数据 */}
          {[
            { y: 104, dim: "CSet", yg: "Eden+Survivor", mg: "Eden+Surv+部分Old", fg: "整个堆" },
            { y: 128, dim: "算法", yg: "复制式 evacuation", mg: "复制式 evacuation", fg: "标记-整理" },
            { y: 152, dim: "并行度", yg: "多线程并行", mg: "多线程并行", fg: "单线程(JDK10前)" },
            { y: 176, dim: "STW", yg: "全程 STW", mg: "全程 STW", fg: "全程 STW" },
            { y: 200, dim: "停顿时间", yg: "<50ms", mg: "100-300ms", fg: "秒级~数十秒" },
            { y: 224, dim: "并发标记", yg: "无", mg: "有（前驱阶段）", fg: "无" },
            { y: 248, dim: "RSet使用", yg: "扫描 Old→Young", mg: "扫描跨 Region", fg: "全堆扫描(不用RSet)" },
          ].map((r, i) => (
            <g key={i}>
              <rect x="40" y={r.y} width="670" height="22" rx="2" fill={i % 2 === 0 ? "var(--bg-elevated)" : "var(--text-primary)"} fillOpacity={i % 2 === 0 ? 1 : 0.03} />
              <text x="80" y={r.y + 15} textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">{r.dim}</text>
              <text x="230" y={r.y + 15} textAnchor="middle" fontSize="10" fill="var(--warning)">{r.yg}</text>
              <text x="420" y={r.y + 15} textAnchor="middle" fontSize="10" fill="var(--accent)">{r.mg}</text>
              <text x="600" y={r.y + 15} textAnchor="middle" fontSize="10" fill="var(--danger)">{r.fg}</text>
            </g>
          ))}

          {/* 知识闭环 */}
          <text x="40" y="296" fontSize="13" fontWeight="600" fill="var(--accent)">知识闭环——从内存模型到调优实践</text>

          <defs>
            <marker id="arrFr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="var(--text-tertiary)" />
            </marker>
          </defs>

          {/* 闭环节点 */}
          <rect x="40" y="312" width="150" height="56" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="115" y="334" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">内存模型</text>
          <text x="115" y="350" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Region/RSet/卡表</text>
          <text x="115" y="362" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Write Barrier</text>

          <line x1="190" y1="340" x2="208" y2="340" stroke="var(--text-tertiary)" strokeWidth="1.5" markerEnd="url(#arrFr)" />

          <rect x="210" y="312" width="150" height="56" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="285" y="334" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">GC 周期</text>
          <text x="285" y="350" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">并发标记五阶段</text>
          <text x="285" y="362" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">IHOP/CSet选择</text>

          <line x1="360" y1="340" x2="378" y2="340" stroke="var(--text-tertiary)" strokeWidth="1.5" markerEnd="url(#arrFr)" />

          <rect x="380" y="312" width="150" height="56" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.5" />
          <text x="455" y="334" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">源码分析</text>
          <text x="455" y="350" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Young/Mixed/Full</text>
          <text x="455" y="362" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">evacuation/退化</text>

          <line x1="530" y1="340" x2="548" y2="340" stroke="var(--text-tertiary)" strokeWidth="1.5" markerEnd="url(#arrFr)" />

          <rect x="550" y="312" width="150" height="56" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.5" />
          <text x="625" y="334" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">调优实践</text>
          <text x="625" y="350" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">参数/GC日志</text>
          <text x="625" y="362" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Full GC 排查</text>

          {/* 回环箭头 */}
          <path d="M 625 368 Q 625 400 370 400 Q 115 400 115 368" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arrFr)" />
          <text x="370" y="416" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">调优结果反馈到内存模型 → 验证理解 → 深化源码认知</text>

          {/* 核心理念 */}
          <rect x="40" y="436" width="670" height="80" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="55" y="458" fontSize="12" fontWeight="600" fill="var(--accent)">核心理念</text>
          <text x="55" y="476" fontSize="11" fill="var(--text-secondary)">内存模型是基础（Region/RSet 决定回收粒度）→ GC周期决定回收时机（IHOP/CSet 平衡停顿与回收）</text>
          <text x="55" y="492" fontSize="11" fill="var(--text-secondary)">→ 源码分析定位根因（evacuation/退化/自适应策略）→ 调优实践给出方案（参数/GC日志/监控告警）</text>
          <text x="55" y="508" fontSize="11" fill="var(--text-secondary)">G1调优的终极目标：通过合理的 Young/Mixed GC 配置使 Full GC 频率趋近于 0</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        G1全书复习——三种GC回收路径七维度对比、内存模型→GC周期→源码分析→调优实践知识闭环
      </figcaption>
    </figure>
  );
}
