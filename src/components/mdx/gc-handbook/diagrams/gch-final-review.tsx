/**
 * <GchFinalReviewDiagram>：全书复习——知识图谱整合与算法选型矩阵。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function GchFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="全书复习知识图谱整合与算法选型矩阵"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">
            全书知识图谱与算法选型矩阵
          </text>

          {/* 知识图谱中心 */}
          <text x={VIEW_W / 2} y="52" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">GC 算法知识图谱</text>

          <circle cx="370" cy="140" r="36" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="370" y="136" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">GC核心</text>
          <text x="370" y="150" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">可达性分析</text>

          {/* 四大基础算法 */}
          <rect x="40" y="100" width="120" height="36" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="100" y="122" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">标记-清除</text>

          <rect x="40" y="144" width="120" height="36" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="100" y="166" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">复制式回收</text>

          <rect x="580" y="100" width="120" height="36" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="640" y="122" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">标记-压缩</text>

          <rect x="580" y="144" width="120" height="36" rx="6" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="640" y="166" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-primary)">分代回收</text>

          {/* 连线到中心 */}
          <line x1="160" y1="118" x2="334" y2="134" stroke="var(--warning)" strokeWidth="0.8" strokeOpacity="0.4" />
          <line x1="160" y1="162" x2="334" y2="146" stroke="var(--danger)" strokeWidth="0.8" strokeOpacity="0.4" />
          <line x1="580" y1="118" x2="406" y2="134" stroke="var(--success)" strokeWidth="0.8" strokeOpacity="0.4" />
          <line x1="580" y1="162" x2="406" y2="146" stroke="var(--text-primary)" strokeWidth="0.8" strokeOpacity="0.3" />

          {/* 高级策略 */}
          <rect x="220" y="200" width="130" height="36" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="285" y="222" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">并发回收</text>

          <rect x="390" y="200" width="130" height="36" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="455" y="222" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">实时GC</text>

          <line x1="350" y1="172" x2="285" y2="200" stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.3" />
          <line x1="390" y1="172" x2="455" y2="200" stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.3" />

          {/* 现代实现 */}
          <rect x="160" y="200" width="50" height="36" rx="4" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="0.6" />
          <text x="185" y="222" textAnchor="middle" fontSize="8" fill="var(--warning)">G1</text>

          <rect x="530" y="200" width="50" height="36" rx="4" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="0.6" />
          <text x="555" y="222" textAnchor="middle" fontSize="8" fill="var(--success)">ZGC</text>

          <line x1="210" y1="218" x2="220" y2="218" stroke="var(--text-tertiary)" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="520" y1="218" x2="530" y2="218" stroke="var(--text-tertiary)" strokeWidth="0.5" strokeDasharray="2 2" />

          {/* 算法选型矩阵 */}
          <line x1="30" y1="255" x2="710" y2="255" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
          <text x={VIEW_W / 2} y="277" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">算法选型决策矩阵</text>

          {/* 表头 */}
          <rect x="30" y="290" width="120" height="24" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="0.5" strokeOpacity="0.3" />
          <text x="90" y="306" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--text-primary)">场景</text>
          <rect x="150" y="290" width="120" height="24" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="0.5" strokeOpacity="0.3" />
          <text x="210" y="306" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--text-primary)">推荐算法</text>
          <rect x="270" y="290" width="130" height="24" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="0.5" strokeOpacity="0.3" />
          <text x="335" y="306" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--text-primary)">理由</text>
          <rect x="400" y="290" width="330" height="24" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="0.5" strokeOpacity="0.3" />
          <text x="565" y="306" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--text-primary)">实际实现</text>

          {/* 行1 */}
          <rect x="30" y="314" width="120" height="28" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="0.4" />
          <text x="90" y="332" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">小堆+高吞吐</text>
          <rect x="150" y="314" width="120" height="28" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="0.4" />
          <text x="210" y="332" textAnchor="middle" fontSize="9" fill="var(--warning)">复制式</text>
          <rect x="270" y="314" width="130" height="28" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="0.4" />
          <text x="335" y="332" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">无碎片+快速</text>
          <rect x="400" y="314" width="330" height="28" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="0.4" />
          <text x="565" y="332" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">Parallel Scavenge / Serial Copy</text>

          {/* 行2 */}
          <rect x="30" y="342" width="120" height="28" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="0.4" />
          <text x="90" y="360" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">大堆+低延迟</text>
          <rect x="150" y="342" width="120" height="28" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="0.4" />
          <text x="210" y="360" textAnchor="middle" fontSize="9" fill="var(--danger)">并发+分代</text>
          <rect x="270" y="342" width="130" height="28" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="0.4" />
          <text x="335" y="360" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">STW短+可扩展</text>
          <rect x="400" y="342" width="330" height="28" fill="var(--danger)" fillOpacity="0.04" stroke="var(--danger)" strokeWidth="0.4" />
          <text x="565" y="360" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">G1（Region+SATB+Mixed GC）</text>

          {/* 行3 */}
          <rect x="30" y="370" width="120" height="28" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="0.4" />
          <text x="90" y="388" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">超低延迟</text>
          <rect x="150" y="370" width="120" height="28" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="0.4" />
          <text x="210" y="388" textAnchor="middle" fontSize="9" fill="var(--success)">并发疏散</text>
          <rect x="270" y="370" width="130" height="28" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="0.4" />
          <text x="335" y="388" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">&lt;1ms停顿</text>
          <rect x="400" y="370" width="330" height="28" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="0.4" />
          <text x="565" y="388" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">ZGC（染色指针）/ Shenandoah（Brooks）</text>

          {/* 行4 */}
          <rect x="30" y="398" width="120" height="28" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="0.4" />
          <text x="90" y="416" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">实时系统</text>
          <rect x="150" y="398" width="120" height="28" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="0.4" />
          <text x="210" y="416" textAnchor="middle" fontSize="9" fill="var(--accent)">实时调度</text>
          <rect x="270" y="398" width="130" height="28" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="0.4" />
          <text x="335" y="416" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">截止时间保证</text>
          <rect x="400" y="398" width="330" height="28" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="0.4" />
          <text x="565" y="416" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">Metronome / Slack-based</text>

          {/* 行5 */}
          <rect x="30" y="426" width="120" height="28" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="0.4" strokeOpacity="0.2" />
          <text x="90" y="444" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">嵌入式/受限</text>
          <rect x="150" y="426" width="120" height="28" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="0.4" strokeOpacity="0.2" />
          <text x="210" y="444" textAnchor="middle" fontSize="9" fill="var(--text-primary)">标记-清除</text>
          <rect x="270" y="426" width="130" height="28" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="0.4" strokeOpacity="0.2" />
          <text x="335" y="444" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">低开销+无移动</text>
          <rect x="400" y="426" width="330" height="28" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="0.4" strokeOpacity="0.2" />
          <text x="565" y="444" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">Serial Mark-Sweep / 增量式</text>

          {/* 总结 */}
          <rect x="30" y="470" width="700" height="40" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 3" />
          <text x="380" y="488" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">全书核心闭环</text>
          <text x="380" y="504" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">算法（标记/复制/压缩/分代）→ 性能（吞吐/延迟/内存）→ 工程（并发/实时/现代实现）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        GC算法知识图谱：四大基础算法（标记清除/复制/标记压缩/分代）围绕可达性分析核心，发展为并发回收和实时GC，最终落地为G1/ZGC/Shenandoah等现代实现
      </figcaption>
    </figure>
  );
}
