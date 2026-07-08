/**
 * <GsaMemoryPoolDiagram>：内存池与对象池优化图解。
 * 纯静态展示，无交互。Server Component。DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function GsaMemoryPoolDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="内存池与对象池优化图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            内存池：预分配 + 空闲链表 = O(1) 复用
          </text>

          {/* 痛点：频繁 malloc */}
          <rect x="30" y="50" width="340" height="120" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="200" y="72" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">痛点：频繁 malloc/free</text>

          <rect x="50" y="86" width="300" height="20" rx="4" fill="var(--danger)" fillOpacity="0.15" />
          <text x="200" y="100" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">① 分配开销：查表 + 加锁 + 系统调用</text>

          <rect x="50" y="112" width="300" height="20" rx="4" fill="var(--danger)" fillOpacity="0.15" />
          <text x="200" y="126" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">② 内存碎片：堆布满空洞</text>

          <rect x="50" y="138" width="300" height="20" rx="4" fill="var(--danger)" fillOpacity="0.15" />
          <text x="200" y="152" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">③ 缓存不友好：散落各处</text>

          {/* 对象池方案 */}
          <rect x="390" y="50" width="320" height="120" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="550" y="72" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">方案：对象池复用</text>

          <rect x="410" y="86" width="280" height="20" rx="4" fill="var(--success)" fillOpacity="0.15" />
          <text x="550" y="100" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">预分配大块连续内存（无碎片）</text>

          <rect x="410" y="112" width="280" height="20" rx="4" fill="var(--success)" fillOpacity="0.15" />
          <text x="550" y="126" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">空闲链表 O(1) 分配回收（无锁）</text>

          <rect x="410" y="138" width="280" height="20" rx="4" fill="var(--success)" fillOpacity="0.15" />
          <text x="550" y="152" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">同规格紧凑排布（cache 友好）</text>

          {/* 池结构图 */}
          <rect x="30" y="190" width="680" height="180" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" />
          <text x={VIEW_W / 2} y="212" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">对象池结构</text>

          {/* 空闲链表 */}
          <text x="60" y="236" fontSize="11" fontWeight="600" fill="var(--text-secondary)">空闲链表（栈）：</text>

          <rect x="60" y="244" width="50" height="30" rx="4" fill="var(--success)" fillOpacity="0.2" stroke="var(--success)" strokeWidth="1" />
          <text x="85" y="263" textAnchor="middle" fontSize="9" fill="var(--success)">空闲</text>

          <rect x="120" y="244" width="50" height="30" rx="4" fill="var(--success)" fillOpacity="0.2" stroke="var(--success)" strokeWidth="1" />
          <text x="145" y="263" textAnchor="middle" fontSize="9" fill="var(--success)">空闲</text>

          <rect x="180" y="244" width="50" height="30" rx="4" fill="var(--success)" fillOpacity="0.2" stroke="var(--success)" strokeWidth="1" />
          <text x="205" y="263" textAnchor="middle" fontSize="9" fill="var(--success)">空闲</text>

          <rect x="240" y="244" width="50" height="30" rx="4" fill="var(--warning)" fillOpacity="0.2" stroke="var(--warning)" strokeWidth="1" />
          <text x="265" y="263" textAnchor="middle" fontSize="9" fill="var(--warning)">借出</text>

          <rect x="300" y="244" width="50" height="30" rx="4" fill="var(--success)" fillOpacity="0.2" stroke="var(--success)" strokeWidth="1" />
          <text x="325" y="263" textAnchor="middle" fontSize="9" fill="var(--success)">空闲</text>

          <rect x="360" y="244" width="50" height="30" rx="4" fill="var(--warning)" fillOpacity="0.2" stroke="var(--warning)" strokeWidth="1" />
          <text x="385" y="263" textAnchor="middle" fontSize="9" fill="var(--warning)">借出</text>

          <rect x="420" y="244" width="50" height="30" rx="4" fill="var(--success)" fillOpacity="0.2" stroke="var(--success)" strokeWidth="1" />
          <text x="445" y="263" textAnchor="middle" fontSize="9" fill="var(--success)">空闲</text>

          <text x="500" y="263" fontSize="9" fill="var(--text-tertiary)">... 共 1024 块</text>

          {/* Acquire/Release 流程 */}
          <text x="60" y="296" fontSize="11" fontWeight="600" fill="var(--text-secondary)">复用流程：</text>

          <rect x="60" y="304" width="130" height="50" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="125" y="322" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">Acquire()</text>
          <text x="125" y="338" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">placement new</text>
          <text x="125" y="350" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">栈顶取一块</text>

          <text x="200" y="332" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="220" y="304" width="130" height="50" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="285" y="322" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">使用对象</text>
          <text x="285" y="338" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">填充数据</text>
          <text x="285" y="350" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">零 malloc</text>

          <text x="360" y="332" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="380" y="304" width="130" height="50" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="445" y="322" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">Release()</text>
          <text x="445" y="338" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">显式析构</text>
          <text x="445" y="350" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">插回栈顶</text>

          <text x="520" y="332" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="540" y="304" width="130" height="50" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="605" y="322" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">复用</text>
          <text x="605" y="338" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">下次 Acquire</text>
          <text x="605" y="350" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">内存常驻池中</text>

          {/* 适用边界 */}
          <text x={VIEW_W / 2} y="396" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            适合：消息 / 子弹 / Buff（高频、固定大小、短生命周期）
          </text>
          <text x={VIEW_W / 2} y="416" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            不适合：玩家档 / 配置表（低频长生命周期）、不定长字符串、极小对象
          </text>
          <text x={VIEW_W / 2} y="440" textAnchor="middle" fontSize="10" fill="var(--danger)">
            判断标准：创建频率万次/秒级才池化，几次/秒用普通 new
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        内存池/对象池——预分配 + 空闲链表 + placement new，高频对象零 malloc 复用
      </figcaption>
    </figure>
  );
}
