/**
 * <MosDeadlockDiagram>：死锁四条件 + 资源分配图环 + 四解法谱系图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 470;

export function MosDeadlockDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="死锁四条件与资源分配图环图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            死锁四条件、资源分配图环与四解法谱系
          </text>

          {/* 左侧：四条件 */}
          <text x="170" y="58" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">四个必要条件（缺一不可）</text>

          <rect x="40" y="72" width="260" height="38" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="170" y="96" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">① 互斥：资源一次一人用</text>

          <rect x="40" y="116" width="260" height="38" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="170" y="140" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">② 占有等待：持资源等更多</text>

          <rect x="40" y="160" width="260" height="38" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="170" y="184" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">③ 不剥夺：不能强行夺走</text>

          <rect x="40" y="204" width="260" height="38" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="170" y="228" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">④ 循环等待：P0→P1→...→P0</text>

          <text x="170" y="262" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">打破任一条件即可预防死锁</text>

          {/* 右侧：资源分配图环 */}
          <text x="540" y="58" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">资源分配图（有环 = 可能死锁）</text>

          {/* 资源节点（方形）和进程节点（圆形）交替成环 */}
          <rect x="500" y="90" width="30" height="30" rx="3" fill="var(--accent)" fillOpacity="0.25" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="515" y="109" textAnchor="middle" fontSize="9" fill="var(--accent)">R1</text>

          <circle cx="620" cy="105" r="16" fill="var(--danger)" fillOpacity="0.18" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="620" y="109" textAnchor="middle" fontSize="9" fill="var(--danger)">P1</text>

          <rect x="560" y="200" width="30" height="30" rx="3" fill="var(--accent)" fillOpacity="0.25" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="575" y="219" textAnchor="middle" fontSize="9" fill="var(--accent)">R2</text>

          <circle cx="460" cy="215" r="16" fill="var(--danger)" fillOpacity="0.18" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="460" y="219" textAnchor="middle" fontSize="9" fill="var(--danger)">P2</text>

          {/* 箭头：分配边（实线）+ 申请边（虚线）成环 */}
          <line x1="530" y1="105" x2="604" y2="105" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="567" y="98" textAnchor="middle" fontSize="8" fill="var(--accent)">分配</text>
          <line x1="620" y1="121" x2="575" y2="200" stroke="var(--danger)" strokeWidth="1.4" strokeDasharray="3 2" />
          <text x="610" y="165" fontSize="8" fill="var(--danger)">申请</text>
          <line x1="560" y1="215" x2="476" y2="215" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="518" y="208" textAnchor="middle" fontSize="8" fill="var(--accent)">分配</text>
          <line x1="460" y1="199" x2="515" y2="120" stroke="var(--danger)" strokeWidth="1.4" strokeDasharray="3 2" />
          <text x="470" y="165" fontSize="8" fill="var(--danger)">申请</text>

          <text x="540" y="260" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">单实例有环 = 必死锁；多实例有环 = 可能死锁</text>

          {/* 底部：四解法谱系 */}
          <rect x="40" y="290" width="660" height="160" rx="10" fill="var(--text-primary)" fillOpacity="0.03" stroke="var(--border)" strokeWidth="1" />
          <text x="60" y="312" fontSize="13" fontWeight="600" fill="var(--text-primary)">死锁四解法谱系：从「不让发生」到「发生了再处理」</text>

          <rect x="60" y="326" width="150" height="52" rx="6" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="135" y="346" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">预防 Prevention</text>
          <text x="135" y="362" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">破坏四条件之一</text>
          <text x="135" y="374" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">源头杜绝/利用率低</text>

          <rect x="225" y="326" width="150" height="52" rx="6" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="300" y="346" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">避免 Avoidance</text>
          <text x="300" y="362" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">银行家算法</text>
          <text x="300" y="374" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">保守/需预知 Max</text>

          <rect x="390" y="326" width="150" height="52" rx="6" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="465" y="346" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">检测 Detection</text>
          <text x="465" y="362" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">允许发生/定期查</text>
          <text x="465" y="374" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">杀进程恢复</text>

          <rect x="555" y="326" width="130" height="52" rx="6" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1" />
          <text x="620" y="346" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">忽略 Ignore</text>
          <text x="620" y="362" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">鸵鸟策略</text>
          <text x="620" y="374" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">通用 OS 常用</text>

          <text x="60" y="404" fontSize="10" fill="var(--text-secondary)">银行家安全状态：存在安全序列能让所有进程完成 → 分配前模拟</text>
          <text x="60" y="422" fontSize="10" fill="var(--text-tertiary)">不安全 ≠ 已死锁（只是有风险），银行家保守拒绝 → 宁误拒不冒险</text>
          <text x="60" y="440" fontSize="10" fill="var(--text-tertiary)">保守 → 激进：预防 &gt; 避免 &gt; 检测 &gt; 忽略，安全性与代价此消彼长</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        死锁四个必要条件、资源分配图环（有环=可能死锁）与预防/避免/检测/忽略四解法谱系
      </figcaption>
    </figure>
  );
}
