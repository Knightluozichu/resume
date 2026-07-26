/**
 * <DujMemoryModelDiagram>：Java内存模型与happens-before关系图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function DujMemoryModelDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Java内存模型与happens-before关系图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Java内存模型（JMM）：主内存与工作内存
          </text>

          {/* 主内存 */}
          <rect x="30" y="50" width="200" height="180" rx="10" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="130" y="72" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">主内存（Main Memory）</text>

          <rect x="50" y="84" width="160" height="36" rx="4" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="130" y="106" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">共享变量 A</text>

          <rect x="50" y="128" width="160" height="36" rx="4" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="130" y="150" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">共享变量 B</text>

          <rect x="50" y="172" width="160" height="36" rx="4" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1" />
          <text x="130" y="194" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">共享变量 C</text>

          <text x="130" y="222" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">所有线程共享</text>

          {/* 线程1工作内存 */}
          <rect x="280" y="50" width="200" height="180" rx="10" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="380" y="72" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">线程1 工作内存</text>

          <rect x="300" y="84" width="160" height="36" rx="4" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="380" y="106" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">A 的副本</text>

          <rect x="300" y="128" width="160" height="36" rx="4" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="380" y="150" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">B 的副本</text>

          <rect x="300" y="172" width="160" height="36" rx="4" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1" />
          <text x="380" y="194" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">执行引擎</text>

          <text x="380" y="222" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">线程私有缓存</text>

          {/* 线程2工作内存 */}
          <rect x="530" y="50" width="180" height="180" rx="10" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="620" y="72" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">线程2 工作内存</text>

          <rect x="550" y="84" width="140" height="36" rx="4" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="620" y="106" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">A 的副本</text>

          <rect x="550" y="128" width="140" height="36" rx="4" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="620" y="150" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">B 的副本</text>

          <rect x="550" y="172" width="140" height="36" rx="4" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1" />
          <text x="620" y="194" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">执行引擎</text>

          <text x="620" y="222" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">线程私有缓存</text>

          {/* 数据流箭头 */}
          <text x="245" y="140" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">read</text>
          <text x="245" y="155" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&harr;</text>
          <text x="245" y="170" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">write</text>

          <text x="500" y="140" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">read</text>
          <text x="500" y="155" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&harr;</text>
          <text x="500" y="170" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">write</text>

          {/* happens-before */}
          <text x={VIEW_W / 2} y="262" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--accent)">happens-before 八大规则</text>
          <text x={VIEW_W / 2} y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">前一个操作的结果对后一个操作可见，且前一个操作排在后一个操作之前</text>

          <rect x="30" y="292" width="215" height="40" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="137" y="316" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">1. 程序顺序规则</text>

          <rect x="262" y="292" width="215" height="40" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="369" y="316" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">2. volatile 变量规则</text>

          <rect x="494" y="292" width="215" height="40" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="601" y="316" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">3. 锁规则（monitor）</text>

          <rect x="30" y="342" width="215" height="40" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="137" y="366" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">4. 线程启动规则</text>

          <rect x="262" y="342" width="215" height="40" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="369" y="366" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">5. 线程终止规则</text>

          <rect x="494" y="342" width="215" height="40" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="601" y="366" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">6. 线程中断规则</text>

          <rect x="120" y="392" width="215" height="40" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="227" y="416" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">7. 对象终结规则</text>

          <rect x="395" y="392" width="215" height="40" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="502" y="416" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">8. 传递性</text>

          {/* volatile 语义 */}
          <rect x="30" y="448" width="680" height="24" rx="4" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.3" />
          <text x="370" y="464" textAnchor="middle" fontSize="11" fill="var(--success)">volatile：写操作 happens-before 读操作；禁止指令重排序；内存屏障保证可见性</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Java内存模型——主内存与工作内存交互，happens-before八大规则保证跨线程内存可见性
      </figcaption>
    </figure>
  );
}
