/**
 * <NdbgFinalReviewDiagram>：全书知识图谱与故障排查决策树图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function NdbgFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="全书知识图谱与故障排查决策树图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            全书总复习：故障排查决策树
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            症状 → 工具 → 根因 → 修复 | 先量化症状，再选工具
          </text>

          {/* 决策树根节点 */}
          <rect x="290" y="60" width="160" height="40" rx="8" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="370" y="78" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">症状类型？</text>
          <text x="370" y="92" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">从 APM 监控发现</text>

          {/* 五条分支 */}
          <line x1="370" y1="102" x2="100" y2="128" stroke="var(--text-tertiary)" strokeWidth="1" />
          <line x1="370" y1="102" x2="240" y2="128" stroke="var(--text-tertiary)" strokeWidth="1" />
          <line x1="370" y1="102" x2="370" y2="128" stroke="var(--text-tertiary)" strokeWidth="1" />
          <line x1="370" y1="102" x2="500" y2="128" stroke="var(--text-tertiary)" strokeWidth="1" />
          <line x1="370" y1="102" x2="640" y2="128" stroke="var(--text-tertiary)" strokeWidth="1" />

          {/* 分支1: OOM */}
          <rect x="30" y="128" width="140" height="56" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="100" y="146" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">OOM 崩溃</text>
          <text x="100" y="160" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">内存持续增长</text>
          <text x="100" y="172" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">→ Heap Snapshot</text>
          <text x="100" y="180" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">第4-5章</text>

          {/* 分支2: CPU 打满 */}
          <rect x="180" y="128" width="120" height="56" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="240" y="146" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">CPU 打满</text>
          <text x="240" y="160" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">单核 100%</text>
          <text x="240" y="172" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">→ Profiler + 火焰图</text>
          <text x="240" y="180" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">第6-7章</text>

          {/* 分支3: 延迟高 */}
          <rect x="310" y="128" width="120" height="56" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="146" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">延迟高</text>
          <text x="370" y="160" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">事件循环阻塞</text>
          <text x="370" y="172" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">→ AsyncHooks</text>
          <text x="370" y="180" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">第8章</text>

          {/* 分支4: 偶发崩溃 */}
          <rect x="440" y="128" width="120" height="56" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="500" y="146" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">偶发崩溃</text>
          <text x="500" y="160" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">未捕获异常</text>
          <text x="500" y="172" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">→ --report + llnode</text>
          <text x="500" y="180" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">第9章</text>

          {/* 分支5: 逻辑 bug */}
          <rect x="570" y="128" width="140" height="56" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="640" y="146" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">逻辑 bug</text>
          <text x="640" y="160" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">结果不符合预期</text>
          <text x="640" y="172" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">→ DevTools 断点</text>
          <text x="640" y="180" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">第2-3章</text>

          {/* 完整 OOM 排查旅程 */}
          <rect x="40" y="200" width="660" height="150" rx="8" fill="var(--bg-primary)" fillOpacity="0.3" stroke="var(--border)" strokeWidth="1" />
          <text x="60" y="220" fontSize="12" fontWeight="600" fill="var(--text-primary)">完整 OOM 排查旅程（串联全书）</text>

          <rect x="55" y="232" width="120" height="44" rx="5" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="115" y="248" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--danger)">① 发现症状</text>
          <text x="115" y="262" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">APM: heapUsed 涨</text>
          <text x="115" y="272" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">--report 确认</text>
          <text x="180" y="254" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="195" y="232" width="120" height="44" rx="5" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="255" y="248" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--accent)">② 建立通道</text>
          <text x="255" y="262" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">--inspect + SSH</text>
          <text x="255" y="272" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">隧道连接</text>
          <text x="320" y="254" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="335" y="232" width="120" height="44" rx="5" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="395" y="248" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--warning)">③ 三快照法</text>
          <text x="395" y="262" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">Comparison 找增量</text>
          <text x="395" y="272" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">Retainers 追溯</text>
          <text x="460" y="254" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="475" y="232" width="100" height="44" rx="5" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="0.8" />
          <text x="525" y="248" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--success)">④ 修复</text>
          <text x="525" y="262" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">LRU 淘汰</text>
          <text x="525" y="272" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">cache 限制</text>
          <text x="580" y="254" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="595" y="232" width="90" height="44" rx="5" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="640" y="248" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--danger)">⑤ 验证</text>
          <text x="640" y="262" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">APM 监控</text>
          <text x="640" y="272" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">heapUsed 稳定</text>

          {/* 黄金法则 */}
          <text x="60" y="298" fontSize="11" fontWeight="600" fill="var(--text-primary)">事故排查黄金法则</text>
          <text x="60" y="316" fontSize="9" fill="var(--danger)">① 先量化——用监控数据确认问题类型，不凭感觉猜</text>
          <text x="60" y="330" fontSize="9" fill="var(--warning)">② 再定位——用对应工具精确定位，不盲目改代码</text>
          <text x="330" y="316" fontSize="9" fill="var(--success)">③ 后修复——改代码后用监控验证效果</text>
          <text x="330" y="330" fontSize="9" fill="var(--accent)">④ 防复发——加监控告警 + 压测回归</text>

          {/* 底部能力进阶 */}
          <rect x="40" y="362" width="660" height="68" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" />
          <text x="60" y="382" fontSize="11" fontWeight="600" fill="var(--accent)">从 console.log 到完整工具链：Node.js 工程师核心能力进阶</text>
          <text x="60" y="400" fontSize="9" fill="var(--text-secondary)">初级：只会 console.log → 遇到生产事故只能重启服务</text>
          <text x="60" y="414" fontSize="9" fill="var(--text-secondary)">高级：掌握工具链 → 能用工具定位根因并永久修复</text>
          <text x="60" y="426" fontSize="9" fill="var(--text-tertiary)">分水岭：内存泄漏看 Retained Size | CPU 热点看 Self Time | 异步断裂看 AsyncHooks | 生产崩溃看 --report</text>

          <text x={VIEW_W / 2} y="450" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：十章工具链组合起来才构成完整的故障排查能力 | 真正的高手知道什么问题该用什么工具
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书总复习——故障排查决策树、OOM 完整排查旅程与事故排查黄金法则
      </figcaption>
    </figure>
  );
}
