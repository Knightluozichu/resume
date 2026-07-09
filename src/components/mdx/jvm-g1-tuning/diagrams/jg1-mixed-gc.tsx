/**
 * <Jg1MixedGcDiagram>：Mixed GC源码分析——CSet选择与老年代增量回收图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function Jg1MixedGcDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Mixed GC源码分析——CSet选择与老年代增量回收图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            G1 Mixed GC——老年代增量回收
          </text>

          {/* CSet组成对比 */}
          <text x="40" y="58" fontSize="13" fontWeight="600" fill="var(--accent)">CSet 组成对比</text>

          {/* Young GC CSet */}
          <rect x="40" y="72" width="320" height="80" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="200" y="92" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">Young GC CSet</text>
          <rect x="60" y="102" width="60" height="24" rx="3" fill="var(--warning)" fillOpacity="0.2" stroke="var(--warning)" strokeWidth="1" />
          <text x="90" y="118" textAnchor="middle" fontSize="9" fill="var(--warning)">Eden</text>
          <rect x="130" y="102" width="60" height="24" rx="3" fill="var(--success)" fillOpacity="0.2" stroke="var(--success)" strokeWidth="1" />
          <text x="160" y="118" textAnchor="middle" fontSize="9" fill="var(--success)">Survivor</text>
          <text x="200" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">仅新生代 Region</text>

          {/* Mixed GC CSet */}
          <rect x="380" y="72" width="320" height="80" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="540" y="92" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">Mixed GC CSet</text>
          <rect x="400" y="102" width="50" height="24" rx="3" fill="var(--warning)" fillOpacity="0.2" stroke="var(--warning)" strokeWidth="1" />
          <text x="425" y="118" textAnchor="middle" fontSize="9" fill="var(--warning)">Eden</text>
          <rect x="458" y="102" width="50" height="24" rx="3" fill="var(--success)" fillOpacity="0.2" stroke="var(--success)" strokeWidth="1" />
          <text x="483" y="118" textAnchor="middle" fontSize="9" fill="var(--success)">Surv</text>
          <rect x="516" y="102" width="50" height="24" rx="3" fill="var(--accent)" fillOpacity="0.3" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="541" y="118" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--accent)">Old</text>
          <rect x="574" y="102" width="50" height="24" rx="3" fill="var(--accent)" fillOpacity="0.3" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="599" y="118" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--accent)">Old</text>
          <text x="540" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">新生代 + 部分老年代 Region</text>

          {/* Mixed GC分批回收时间线 */}
          <text x="40" y="182" fontSize="13" fontWeight="600" fill="var(--accent)">Mixed GC 分批回收时间线</text>

          <defs>
            <marker id="arrMg" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="var(--text-tertiary)" />
            </marker>
          </defs>

          {/* 并发标记周期 */}
          <rect x="40" y="196" width="120" height="44" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="100" y="216" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">并发标记</text>
          <text x="100" y="232" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">识别垃圾Old Region</text>

          <line x1="160" y1="218" x2="178" y2="218" stroke="var(--text-tertiary)" strokeWidth="1.5" markerEnd="url(#arrMg)" />

          {/* Mixed GC 1 */}
          <rect x="180" y="196" width="80" height="44" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="220" y="216" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">Mixed GC 1</text>
          <text x="220" y="232" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">回收 1/8</text>

          <line x1="260" y1="218" x2="278" y2="218" stroke="var(--text-tertiary)" strokeWidth="1.5" markerEnd="url(#arrMg)" />

          {/* Mixed GC 2-7 */}
          <rect x="280" y="196" width="160" height="44" rx="6" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="360" y="216" textAnchor="middle" fontSize="10" fill="var(--accent)">Mixed GC 2~7</text>
          <text x="360" y="232" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">每次回收 1/8</text>

          <line x1="440" y1="218" x2="458" y2="218" stroke="var(--text-tertiary)" strokeWidth="1.5" markerEnd="url(#arrMg)" />

          {/* Mixed GC 8 */}
          <rect x="460" y="196" width="80" height="44" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="500" y="216" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">Mixed GC 8</text>
          <text x="500" y="232" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">回收完</text>

          <line x1="540" y1="218" x2="558" y2="218" stroke="var(--text-tertiary)" strokeWidth="1.5" markerEnd="url(#arrMg)" />

          {/* 周期结束 */}
          <rect x="560" y="196" width="130" height="44" rx="6" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" />
          <text x="625" y="216" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-primary)">周期结束</text>
          <text x="625" y="232" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">等待下次 IHOP 触发</text>

          {/* 终止条件 */}
          <text x="40" y="272" fontSize="13" fontWeight="600" fill="var(--danger)">Mixed GC 终止条件</text>

          <rect x="40" y="286" width="210" height="60" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="145" y="306" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">① 时间预算耗尽</text>
          <text x="145" y="322" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">预估超 MaxGCPauseMillis</text>
          <text x="145" y="338" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">→ 留浮动垃圾下轮回收</text>

          <rect x="270" y="286" width="210" height="60" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="375" y="306" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">② 候选列表耗尽</text>
          <text x="375" y="322" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">所有 Old Region 回收完</text>
          <text x="375" y="338" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">→ 并发标记周期结束</text>

          <rect x="500" y="286" width="210" height="60" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="605" y="306" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">③ 存活率过高</text>
          <text x="605" y="322" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">存活率 &gt; 85%</text>
          <text x="605" y="338" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">→ 回收性价比太低</text>

          {/* evacuation差异 */}
          <rect x="40" y="370" width="670" height="56" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="55" y="392" fontSize="12" fontWeight="600" fill="var(--accent)">evacuation 差异（vs Young GC）</text>
          <text x="55" y="410" fontSize="11" fill="var(--text-secondary)">CSet 更大 → 复制更多存活对象 | RSet 扫描量更大 | Old Region 存活对象 → 只能复制到新 Old Region（不能回 Survivor）</text>

          {/* 关键参数 */}
          <rect x="40" y="442" width="670" height="40" rx="8" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="55" y="462" fontSize="12" fontWeight="600" fill="var(--text-primary)">关键参数</text>
          <text x="55" y="476" fontSize="11" fill="var(--text-secondary)">G1MixedGCCountTarget=8（分批次数）| G1MixedGCLiveThresholdPercent=85%（存活率上限）| MaxGCPauseMillis=200（时间预算）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        G1 Mixed GC——CSet组成对比、分批回收时间线、三种终止条件、evacuation差异
      </figcaption>
    </figure>
  );
}
