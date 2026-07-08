/**
 * <GsaDbShardingDiagram>：数据库分库分表图解。
 * 纯静态展示，无交互。Server Component。DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function GsaDbShardingDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="数据库分库分表图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            分库分表：按分片键把数据拆到多库
          </text>

          {/* 单库瓶颈 */}
          <rect x="30" y="50" width="200" height="80" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="130" y="72" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">单库单表（瓶颈）</text>
          <text x="130" y="90" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">连接数上限</text>
          <text x="130" y="104" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">写入吞吐有限</text>
          <text x="130" y="118" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">单表数据量过大</text>

          <text x="250" y="95" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          {/* 分库分表 */}
          <rect x="280" y="50" width="430" height="80" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="495" y="72" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">分库分表（横向扩展）</text>
          <text x="495" y="90" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">连接数分散到 N 库</text>
          <text x="495" y="104" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">写入吞吐 × N</text>
          <text x="495" y="118" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">单表数据量 ÷ N</text>

          {/* 三种分片策略 */}
          <rect x="30" y="150" width="210" height="150" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="135" y="172" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">哈希分片</text>
          <text x="135" y="192" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">uid % N</text>
          <text x="135" y="210" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">数据均匀分布</text>
          <text x="135" y="226" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">查询精确定位单分片</text>
          <text x="135" y="246" textAnchor="middle" fontSize="9" fill="var(--danger)">加减库全量 rehash</text>
          <text x="135" y="270" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">适合：分片数固定</text>
          <text x="135" y="286" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">如玩家数据按 uid</text>

          <rect x="265" y="150" width="210" height="150" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="172" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">范围分片</text>
          <text x="370" y="192" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">按区间划分</text>
          <text x="370" y="210" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">加减库只动边界</text>
          <text x="370" y="226" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">范围查询友好</text>
          <text x="370" y="246" textAnchor="middle" fontSize="9" fill="var(--danger)">易热点（新区挤一个库）</text>
          <text x="370" y="270" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">适合：时间序列</text>
          <text x="370" y="286" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">如日志/交易流水</text>

          <rect x="500" y="150" width="210" height="150" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.4" />
          <text x="605" y="172" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">一致性哈希（推荐）</text>
          <text x="605" y="192" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">哈希环 + 顺时针</text>
          <text x="605" y="210" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">加减库迁移量最小</text>
          <text x="605" y="226" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">扩容频繁场景首选</text>
          <text x="605" y="246" textAnchor="middle" fontSize="9" fill="var(--warning)">需虚拟节点均分</text>
          <text x="605" y="270" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">适合：游戏服务器</text>
          <text x="605" y="286" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">扩容频繁</text>

          {/* 分片键选择 */}
          <rect x="30" y="320" width="340" height="100" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="200" y="342" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">好分片键：uid</text>
          <text x="200" y="362" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">查「我的背包」单分片命中</text>
          <text x="200" y="378" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">查「我的任务」单分片命中</text>
          <text x="200" y="398" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">90%+ 查询单分片，无需归并</text>

          <rect x="390" y="320" width="320" height="100" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="550" y="342" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">坏分片键：自增 id / 时间</text>
          <text x="550" y="362" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">自增 id：新增全落最后一个库</text>
          <text x="550" y="378" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">时间：近期热点，历史闲置</text>
          <text x="550" y="398" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">跨分片归并昂贵</text>

          <text x={VIEW_W / 2} y="440" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            实践：玩家表按 uid 分片，公会表按 guild_id 分片（双写冗余换查询效率）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        分库分表——按分片键拆分数据，一致性哈希扩容迁移最小，分片键决定查询效率
      </figcaption>
    </figure>
  );
}
