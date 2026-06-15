/**
 * <GameObjectToEcsDiagram>：GameObject → ECS 迁移思路——三步渐进式转换策略。
 */

export function GameObjectToEcsDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 340"
          role="img"
          aria-label="GameObject 到 ECS 迁移：混合模式 · 渐进替换 · 按需转换——不是全盘重写而是逐系统替换"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <text
            x="320"
            y="24"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            GameObject → ECS 渐进迁移
          </text>

          {/* Three steps */}
          {/* Step 1 */}
          <rect x="24" y="42" width="184" height="84" rx="8" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1" />
          <text x="116" y="62" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">
            ① 找热点 System
          </text>
          <text x="116" y="80" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
            用 Profiler 定位最耗 CPU
          </text>
          <text x="116" y="96" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
            的系统（粒子 · 寻路 · AI）
          </text>
          <text x="116" y="114" textAnchor="middle" fontSize="8" fill="var(--warning)">
            瓶颈在哪，优先搬哪
          </text>

          {/* Arrow */}
          <text x="226" y="90" textAnchor="middle" fontSize="14" fill="var(--text-secondary)">→</text>

          {/* Step 2 */}
          <rect x="248" y="42" width="184" height="84" rx="8" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1" />
          <text x="340" y="62" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">
            ② 混合模式运行
          </text>
          <text x="340" y="80" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
            GameObject ↔ Entity
          </text>
          <text x="340" y="96" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
            ConvertToEntity 桥梁
          </text>
          <text x="340" y="114" textAnchor="middle" fontSize="8" fill="var(--warning)">
            新旧共存、逐步替换
          </text>

          {/* Arrow */}
          <text x="450" y="90" textAnchor="middle" fontSize="14" fill="var(--text-secondary)">→</text>

          {/* Step 3 */}
          <rect x="472" y="42" width="144" height="84" rx="8" fill="var(--bg)" stroke="var(--success)" strokeWidth="1.5" />
          <text x="544" y="62" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">
            ③ 全量 Entity
          </text>
          <text x="544" y="80" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
            纯 ECS 场景
          </text>
          <text x="544" y="96" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">
            Burst + Job 全并行
          </text>
          <text x="544" y="114" textAnchor="middle" fontSize="8" fill="var(--success)">
            CPU 利用率拉满
          </text>

          {/* ---- Middle: How to convert ---- */}
          <text x="320" y="150" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">
            怎么把 MonoBehaviour 拆成 Component？
          </text>

          {/* Example conversion */}
          <rect x="24" y="164" width="280" height="90" rx="8" fill="var(--bg)" stroke="var(--danger)" strokeWidth="1" opacity="0.7" />
          <text x="164" y="182" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">
            GameObject 写法
          </text>
          <rect x="40" y="190" width="248" height="52" rx="4" fill="var(--bg-elevated)" stroke="var(--border)" />
          <text x="52" y="206" fontSize="9" fill="var(--text-secondary)" fontFamily="monospace">
            class Enemy : MonoBehaviour
          </text>
          <text x="52" y="220" fontSize="9" fill="var(--text-secondary)" fontFamily="monospace">
            {"{"} float hp; Vector3 pos; {"}"}
          </text>
          <text x="52" y="234" fontSize="8" fill="var(--danger)">
            Transform · 虚调用 · 散内存
          </text>

          {/* Arrow */}
          <text x="320" y="214" textAnchor="middle" fontSize="16" fill="var(--accent)">→</text>

          {/* ECS conversion */}
          <rect x="336" y="164" width="280" height="90" rx="8" fill="var(--bg)" stroke="var(--success)" strokeWidth="1.5" />
          <text x="476" y="182" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">
            ECS 写法
          </text>
          <rect x="352" y="190" width="248" height="52" rx="4" fill="var(--bg-elevated)" stroke="var(--success)" strokeWidth="1" />
          <text x="364" y="206" fontSize="9" fill="var(--success)" fontFamily="monospace">
            struct Health : IComponentData
          </text>
          <text x="364" y="220" fontSize="9" fill="var(--success)" fontFamily="monospace">
            struct Translation : IComp...
          </text>
          <text x="364" y="234" fontSize="8" fill="var(--success)">
            纯数据 · 连续内存 · Burst 友好
          </text>

          {/* Bottom guidance */}
          <text x="320" y="280" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">
            不用全盘重写，逐系统替换即可
          </text>

          <rect x="60" y="294" width="120" height="18" rx="4" fill="var(--bg-elevated)" stroke="var(--border)" />
          <text x="120" y="307" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">
            瓶颈在哪，先转哪
          </text>

          <rect x="200" y="294" width="120" height="18" rx="4" fill="var(--bg-elevated)" stroke="var(--border)" />
          <text x="260" y="307" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">
            每章一个 System
          </text>

          <rect x="340" y="294" width="120" height="18" rx="4" fill="var(--bg-elevated)" stroke="var(--border)" />
          <text x="400" y="307" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">
            新旧可以共存
          </text>

          <rect x="480" y="294" width="100" height="18" rx="4" fill="var(--bg-elevated)" stroke="var(--border)" />
          <text x="530" y="307" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">
            测一项交一项
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        GameObject → ECS 不是全盘重写：先 Profiler 找热点 System → 拆 Component 结构体 → 写 System 逻辑 → 混合模式共存逐步替换。每章一个 System，新旧并行。
      </figcaption>
    </figure>
  );
}
