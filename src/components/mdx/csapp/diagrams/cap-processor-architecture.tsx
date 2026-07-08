/**
 * <CapProcessorArchitectureDiagram>：处理器体系结构图解（五阶段流水线/冒险/分支预测）。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 470;

export function CapProcessorArchitectureDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="处理器体系结构图解：五阶段流水线、冒险处理、分支预测"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            处理器体系结构
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            指令周期五阶段 · 流水线并行 · 冒险处理 · 分支预测
          </text>

          {/* 五阶段流水线 */}
          <text x={VIEW_W / 2} y="76" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">流水线五阶段（每周期一条指令推进）</text>
          <rect x="40" y="88" width="120" height="44" rx="6" fill="var(--success)" fillOpacity="0.18" stroke="var(--success)" strokeWidth="1.2" />
          <text x="100" y="108" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">IF</text>
          <text x="100" y="124" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">取指</text>
          <rect x="170" y="88" width="120" height="44" rx="6" fill="var(--warning)" fillOpacity="0.18" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="230" y="108" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">ID</text>
          <text x="230" y="124" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">译码</text>
          <rect x="300" y="88" width="120" height="44" rx="6" fill="var(--danger)" fillOpacity="0.18" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="360" y="108" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">EX</text>
          <text x="360" y="124" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">执行</text>
          <rect x="430" y="88" width="120" height="44" rx="6" fill="var(--accent)" fillOpacity="0.18" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="490" y="108" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">MEM</text>
          <text x="490" y="124" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">访存</text>
          <rect x="560" y="88" width="140" height="44" rx="6" fill="var(--success)" fillOpacity="0.18" stroke="var(--success)" strokeWidth="1.2" />
          <text x="630" y="108" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">WB</text>
          <text x="630" y="124" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">写回</text>
          <text x="160" y="150" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="290" y="150" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="420" y="150" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="550" y="150" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x={VIEW_W / 2} y="166" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">理想 k 级流水线加速比 ≈ k，CPI = 理想 CPI + 停顿周期</text>

          {/* 三类冒险 */}
          <rect x="30" y="182" width="218" height="160" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="139" y="204" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">结构冒险</text>
          <text x="139" y="226" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">同周期争用硬件资源</text>
          <text x="139" y="244" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">（如两条都访存）</text>
          <rect x="48" y="258" width="182" height="24" rx="4" fill="var(--success)" fillOpacity="0.16" stroke="var(--success)" strokeWidth="1" />
          <text x="139" y="274" textAnchor="middle" fontSize="10" fill="var(--success)">处理：资源重复</text>
          <text x="139" y="298" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">分离指令/数据缓存</text>
          <text x="139" y="314" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">（哈佛结构）</text>
          <text x="139" y="330" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">重复 ALU 单元</text>

          <rect x="261" y="182" width="218" height="160" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="370" y="204" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">数据冒险</text>
          <text x="370" y="226" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">后续依赖前一条结果</text>
          <text x="370" y="244" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">尚未写回</text>
          <rect x="280" y="258" width="180" height="24" rx="4" fill="var(--success)" fillOpacity="0.16" stroke="var(--success)" strokeWidth="1" />
          <text x="370" y="274" textAnchor="middle" fontSize="10" fill="var(--success)">处理：转发 / 停顿</text>
          <text x="370" y="298" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">转发：EX 结果旁路到 ID</text>
          <text x="370" y="314" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">load-use：插一个 bubble</text>
          <text x="370" y="330" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">编译器调度拉开距离</text>

          <rect x="492" y="182" width="218" height="160" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="601" y="204" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">控制冒险</text>
          <text x="601" y="226" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">分支结果未决</text>
          <text x="601" y="244" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">下一条取哪条未知</text>
          <rect x="511" y="258" width="180" height="24" rx="4" fill="var(--success)" fillOpacity="0.16" stroke="var(--success)" strokeWidth="1" />
          <text x="601" y="274" textAnchor="middle" fontSize="10" fill="var(--success)">处理：分支预测</text>
          <text x="601" y="298" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">推测执行提前跑</text>
          <text x="601" y="314" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">预测失败冲刷流水线</text>
          <text x="601" y="330" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">代价 = 流水线深度 k</text>

          {/* 分支预测性能 */}
          <rect x="30" y="356" width="680" height="76" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="378" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">分支预测：现代 CPU 性能命脉</text>
          <text x={VIEW_W / 2} y="398" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">动态预测（BHT/BTB 记历史）准确率超 95% · 预测成功流水线不停顿</text>
          <text x={VIEW_W / 2} y="414" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">深流水线（20级）预测失败冲刷20周期 · Spectre 漏洞滥用推测执行读越权数据</text>
          <text x={VIEW_W / 2} y="460" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：流水线越深主频越高，但预测失败代价也越大——级数是主频与 IPC 的平衡
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        处理器体系结构——五阶段流水线、三类冒险处理、分支预测与推测执行
      </figcaption>
    </figure>
  );
}
