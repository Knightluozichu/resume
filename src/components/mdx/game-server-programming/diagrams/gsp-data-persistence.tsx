/**
 * <GspDataPersistenceDiagram>：数据持久化（MySQL/Redis）图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 420;

export function GspDataPersistenceDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="数据持久化MySQL与Redis读写流程图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            游戏数据持久化架构
          </text>

          {/* 逻辑层 */}
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            逻辑服务器
          </text>
          <rect x="260" y="66" width="220" height="40" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="90" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">读写请求</text>

          {/* 向下箭头 */}
          <text x="370" y="126" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          {/* Redis 缓存层 */}
          <text x={VIEW_W / 2} y="152" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">
            Redis 缓存层（热数据）
          </text>
          <rect x="120" y="160" width="500" height="56" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="250" y="182" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">玩家信息</text>
          <text x="250" y="198" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Hash / String</text>
          <text x="370" y="182" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">背包物品</text>
          <text x="370" y="198" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">List / ZSet</text>
          <text x="500" y="182" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">排行榜</text>
          <text x="500" y="198" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Sorted Set</text>

          {/* 向下箭头 */}
          <text x="370" y="238" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>
          <text x="430" y="236" fontSize="10" fill="var(--text-tertiary)">定时/脏标记写回</text>

          {/* MySQL 持久层 */}
          <text x={VIEW_W / 2} y="262" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">
            MySQL 持久层（全量数据）
          </text>
          <rect x="120" y="270" width="500" height="56" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="220" y="292" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">player 表</text>
          <text x="220" y="308" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">角色基础信息</text>
          <text x="370" y="292" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">inventory 表</text>
          <text x="370" y="308" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">背包/装备</text>
          <text x="530" y="292" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">quest 表</text>
          <text x="530" y="308" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">任务进度</text>

          {/* 读写策略 */}
          <text x={VIEW_W / 2} y="350" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">
            读写策略（Cache-Aside）
          </text>
          <rect x="50" y="360" width="320" height="44" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="210" y="378" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">读：先查 Redis → 未命中查 MySQL → 回填</text>
          <text x="210" y="394" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Cache Miss 时回源，命中率决定性能</text>

          <rect x="390" y="360" width="320" height="44" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" />
          <text x="550" y="378" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">写：更新 Redis → 标记脏 → 定时落库</text>
          <text x="550" y="394" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">减少 DB 压力，容忍短暂不一致</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        游戏数据持久化架构——Redis 承载热数据高速读写，MySQL 保证全量数据可靠存储
      </figcaption>
    </figure>
  );
}
