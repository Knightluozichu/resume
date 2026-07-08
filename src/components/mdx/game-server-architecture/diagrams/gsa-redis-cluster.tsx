/**
 * <GsaRedisClusterDiagram>：Redis 集群与数据一致性图解。
 * 纯静态展示，无交互。Server Component。DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function GsaRedisClusterDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Redis 集群与数据一致性图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Redis 集群：16384 哈希槽 + 主从故障转移
          </text>

          {/* 哈希槽分片 */}
          <rect x="30" y="50" width="680" height="110" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x={VIEW_W / 2} y="72" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">哈希槽分片：CRC16(key) % 16384</text>

          <rect x="50" y="86" width="200" height="60" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="150" y="106" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">主节点 A</text>
          <text x="150" y="122" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">槽 0 - 5460</text>
          <text x="150" y="136" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">从节点 A&apos; 备份</text>

          <rect x="270" y="86" width="200" height="60" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="370" y="106" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">主节点 B</text>
          <text x="370" y="122" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">槽 5461 - 10922</text>
          <text x="370" y="136" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">从节点 B&apos; 备份</text>

          <rect x="490" y="86" width="200" height="60" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="590" y="106" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">主节点 C</text>
          <text x="590" y="122" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">槽 10923 - 16383</text>
          <text x="590" y="136" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">从节点 C&apos; 备份</text>

          {/* 三大缓存风险 */}
          <rect x="30" y="180" width="220" height="120" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="140" y="202" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">缓存穿透</text>
          <text x="140" y="222" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">查不存在的 key</text>
          <text x="140" y="238" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">请求直达 DB</text>
          <text x="140" y="258" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">对策：</text>
          <text x="140" y="272" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">缓存空值（短 TTL）</text>
          <text x="140" y="286" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">布隆过滤器</text>

          <rect x="260" y="180" width="220" height="120" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="202" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">缓存击穿</text>
          <text x="370" y="222" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">单热 key 过期</text>
          <text x="370" y="238" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">海量并发打 DB</text>
          <text x="370" y="258" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">对策：</text>
          <text x="370" y="272" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">互斥锁回填</text>
          <text x="370" y="286" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">热 key 永不过期</text>

          <rect x="490" y="180" width="220" height="120" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="600" y="202" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">缓存雪崩</text>
          <text x="600" y="222" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">大量 key 同时过期</text>
          <text x="600" y="238" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">DB 被压垮</text>
          <text x="600" y="258" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">对策：</text>
          <text x="600" y="272" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">TTL 随机抖动</text>
          <text x="600" y="286" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">多级缓存 + 熔断</text>

          {/* Cache-Aside 一致性 */}
          <rect x="30" y="320" width="680" height="100" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x={VIEW_W / 2} y="342" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">Cache-Aside：先更新 DB，再删缓存</text>

          <rect x="50" y="358" width="150" height="50" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="125" y="378" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">读</text>
          <text x="125" y="394" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">查缓存→未命中查 DB</text>
          <text x="125" y="404" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">回填缓存</text>

          <rect x="220" y="358" width="150" height="50" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="295" y="378" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">写（正确）</text>
          <text x="295" y="394" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">先更新 DB</text>
          <text x="295" y="404" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">再删缓存</text>

          <rect x="390" y="358" width="150" height="50" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="465" y="378" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">写（错误）</text>
          <text x="465" y="394" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">先更新缓存</text>
          <text x="465" y="404" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">并发覆盖脏数据</text>

          <rect x="560" y="358" width="130" height="50" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="625" y="378" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">强一致</text>
          <text x="625" y="394" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">延迟双删</text>
          <text x="625" y="404" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">或分布式锁</text>

          <text x={VIEW_W / 2} y="442" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            为什么删不更新：删除避免并发覆盖，下次读自动从 DB 重载最新值
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Redis 集群——哈希槽分片 + 主从转移，Cache-Aside 删除策略保证一致性
      </figcaption>
    </figure>
  );
}
