/**
 * <ApoStorageOptimizationDiagram>：存储优化对比图。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function ApoStorageOptimizationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Android存储优化对比图"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            存储方案对比——SP / DataStore / MMKV / SQLite / Room
          </text>

          {/* 对比表格 */}
          <rect x="30" y="50" width="680" height="280" rx="8" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          {/* 表头 */}
          <rect x="30" y="50" width="680" height="35" rx="8" fill="var(--accent)" fillOpacity="0.1" />
          <text x="80" y="72" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">方案</text>
          <text x="220" y="72" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">线程模型</text>
          <text x="370" y="72" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">读写速度</text>
          <text x="510" y="72" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">适用场景</text>
          <text x="640" y="72" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">推荐度</text>
          <line x1="30" y1="85" x2="710" y2="85" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />

          {/* SP */}
          <rect x="30" y="85" width="680" height="45" fill="var(--danger)" fillOpacity="0.04" />
          <text x="80" y="105" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">SharedPreferences</text>
          <text x="80" y="120" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">XML KV</text>
          <text x="220" y="105" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">commit同步</text>
          <text x="220" y="120" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">apply异步</text>
          <text x="370" y="105" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">全量写XML</text>
          <text x="370" y="120" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">慢</text>
          <text x="510" y="105" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">少量简单配置</text>
          <text x="510" y="120" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">（已过时）</text>
          <text x="640" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--danger)">&#9733;&#9733;</text>
          <line x1="30" y1="130" x2="710" y2="130" stroke="var(--border)" strokeWidth="0.5" />

          {/* DataStore */}
          <rect x="30" y="130" width="680" height="45" fill="var(--success)" fillOpacity="0.04" />
          <text x="80" y="150" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">DataStore</text>
          <text x="80" y="165" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Proto/Preferences</text>
          <text x="220" y="150" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">协程 Flow</text>
          <text x="220" y="165" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">非阻塞</text>
          <text x="370" y="150" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">增量写</text>
          <text x="370" y="165" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">中</text>
          <text x="510" y="150" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">KV 配置</text>
          <text x="510" y="165" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Jetpack 推荐</text>
          <text x="640" y="157" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--success)">&#9733;&#9733;&#9733;&#9733;</text>
          <line x1="30" y1="175" x2="710" y2="175" stroke="var(--border)" strokeWidth="0.5" />

          {/* MMKV */}
          <rect x="30" y="175" width="680" height="45" fill="var(--accent)" fillOpacity="0.04" />
          <text x="80" y="195" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">MMKV</text>
          <text x="80" y="210" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">mmap KV</text>
          <text x="220" y="195" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">mmap 直接写</text>
          <text x="220" y="210" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">跨进程</text>
          <text x="370" y="195" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">内存映射</text>
          <text x="370" y="210" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">极快</text>
          <text x="510" y="195" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">高频 KV</text>
          <text x="510" y="210" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">跨进程共享</text>
          <text x="640" y="202" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)">&#9733;&#9733;&#9733;&#9733;&#9733;</text>
          <line x1="30" y1="220" x2="710" y2="220" stroke="var(--border)" strokeWidth="0.5" />

          {/* SQLite */}
          <rect x="30" y="220" width="680" height="45" fill="var(--warning)" fillOpacity="0.04" />
          <text x="80" y="240" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">SQLite</text>
          <text x="80" y="255" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">原生 SQL</text>
          <text x="220" y="240" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">同步 API</text>
          <text x="220" y="255" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">手动线程管理</text>
          <text x="370" y="240" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">B+树索引</text>
          <text x="370" y="255" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">中</text>
          <text x="510" y="240" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">结构化数据</text>
          <text x="510" y="255" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">复杂查询</text>
          <text x="640" y="247" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--warning)">&#9733;&#9733;&#9733;</text>
          <line x1="30" y1="265" x2="710" y2="265" stroke="var(--border)" strokeWidth="0.5" />

          {/* Room */}
          <rect x="30" y="265" width="680" height="45" fill="var(--success)" fillOpacity="0.04" />
          <text x="80" y="285" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">Room</text>
          <text x="80" y="300" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">SQLite ORM</text>
          <text x="220" y="285" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">协程/RxJava</text>
          <text x="220" y="300" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">编译期检查</text>
          <text x="370" y="285" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">B+树索引</text>
          <text x="370" y="300" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">中</text>
          <text x="510" y="285" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">结构化数据</text>
          <text x="510" y="300" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Jetpack 推荐</text>
          <text x="640" y="292" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--success)">&#9733;&#9733;&#9733;&#9733;&#9733;</text>
          <line x1="30" y1="310" x2="710" y2="310" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />

          {/* 优化建议 */}
          <rect x="30" y="350" width="680" height="140" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.2" />
          <text x="370" y="372" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">存储 I/O 优化原则</text>

          <text x="50" y="395" fontSize="10" fill="var(--text-secondary)">1. 主线程禁止文件 IO/DB 操作（用 StrictMode 检测）</text>
          <text x="50" y="415" fontSize="10" fill="var(--text-secondary)">2. 批量写入——事务（Transaction）合并多次写操作，减少 fsync</text>
          <text x="50" y="435" fontSize="10" fill="var(--text-secondary)">3. WAL 模式——Write-Ahead Logging，读写并发不阻塞</text>
          <text x="50" y="455" fontSize="10" fill="var(--text-secondary)">4. 索引优化——为查询字段建索引，避免全表扫描</text>
          <text x="50" y="475" fontSize="10" fill="var(--text-secondary)">5. 分页加载——Limit/Offset 避免一次性加载大量数据</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        存储方案对比——SharedPreferences/DataStore/MMKV/SQLite/Room 五方案线程模型、速度、场景、推荐度
      </figcaption>
    </figure>
  );
}
