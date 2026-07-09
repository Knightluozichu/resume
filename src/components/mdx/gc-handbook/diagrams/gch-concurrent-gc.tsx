/**
 * <GchConcurrentGcDiagram>：并发回收——三色不变式与读写屏障。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 */

const VIEW_W = 740;
const VIEW_H = 500;

export function GchConcurrentGcDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="并发回收三色不变式与读写屏障SATB增量回收"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="26" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">
            并发回收：与mutator同时运行的GC
          </text>

          {/* 时间线对比 */}
          <text x="185" y="54" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">STW 回收（全程暂停）</text>
          <rect x="40" y="64" width="290" height="60" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" />
          <rect x="50" y="76" width="60" height="36" fill="var(--success)" fillOpacity="0.2" stroke="var(--success)" strokeWidth="0.8" />
          <text x="80" y="98" textAnchor="middle" fontSize="8" fill="var(--success)">mutator</text>
          <rect x="115" y="76" width="170" height="36" fill="var(--danger)" fillOpacity="0.3" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="200" y="98" textAnchor="middle" fontSize="9" fill="var(--danger)">STW GC（长停顿）</text>
          <rect x="290" y="76" width="30" height="36" fill="var(--success)" fillOpacity="0.2" stroke="var(--success)" strokeWidth="0.8" />
          <text x="305" y="98" textAnchor="middle" fontSize="8" fill="var(--success)">m</text>

          <text x="185" y="140" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">停顿时间长，吞吐好，延迟差</text>

          {/* 分割 */}
          <line x1="370" y1="40" x2="370" y2="160" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />

          <text x="555" y="54" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">并发回收（短停顿+并发）</text>
          <rect x="410" y="64" width="290" height="60" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" />
          <rect x="420" y="76" width="30" height="36" fill="var(--success)" fillOpacity="0.2" stroke="var(--success)" strokeWidth="0.8" />
          <text x="435" y="98" textAnchor="middle" fontSize="8" fill="var(--success)">m</text>
          <rect x="455" y="76" width="40" height="36" fill="var(--danger)" fillOpacity="0.4" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="475" y="98" textAnchor="middle" fontSize="7" fill="var(--danger)">初始STW</text>
          <rect x="500" y="76" width="100" height="36" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="550" y="92" textAnchor="middle" fontSize="8" fill="var(--accent)">并发标记</text>
          <text x="550" y="104" textAnchor="middle" fontSize="7" fill="var(--accent)">mutator+GC</text>
          <rect x="605" y="76" width="40" height="36" fill="var(--danger)" fillOpacity="0.4" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="625" y="98" textAnchor="middle" fontSize="7" fill="var(--danger)">再标记STW</text>
          <rect x="650" y="76" width="40" height="36" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="670" y="98" textAnchor="middle" fontSize="7" fill="var(--accent)">并发清除</text>

          <text x="555" y="140" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">停顿短，延迟好，需屏障开销</text>

          {/* 问题描述 */}
          <line x1="30" y1="165" x2="710" y2="165" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
          <text x={VIEW_W / 2} y="187" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">并发问题：mutator修改引用导致漏标/多标</text>

          {/* 问题1：漏标 */}
          <rect x="40" y="200" width="320" height="120" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1" />
          <text x="200" y="220" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">问题：漏标（丢失存活对象）</text>

          <text x="55" y="240" fontSize="9" fill="var(--text-secondary)">① 黑色B指向白色D（新引用）</text>
          <text x="55" y="254" fontSize="9" fill="var(--text-secondary)">② 灰色A→D的旧引用被删除</text>
          <text x="55" y="268" fontSize="9" fill="var(--text-secondary)">③ GC未看到B→D，D被误回收!</text>

          <circle cx="80" cy="292" r="8" fill="var(--success)" fillOpacity="0.4" stroke="var(--success)" strokeWidth="1" />
          <text x="80" y="295" textAnchor="middle" fontSize="8" fill="var(--text-primary)">B</text>
          <text x="80" y="312" textAnchor="middle" fontSize="7" fill="var(--success)">黑</text>

          <text x="98" y="295" fontSize="9" fill="var(--danger)">{`--new-->`}</text>

          <circle cx="150" cy="292" r="8" fill="none" stroke="var(--text-secondary)" strokeWidth="1" />
          <text x="150" y="295" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">D</text>
          <text x="150" y="312" textAnchor="middle" fontSize="7" fill="var(--text-secondary)">白</text>

          <text x="55" y="330" fontSize="9" fill="var(--danger)">D实际存活但被误回收 → 程序崩溃</text>

          {/* 问题2：浮动垃圾 */}
          <rect x="380" y="200" width="320" height="120" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" />
          <text x="540" y="220" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">问题：浮动垃圾（多标）</text>

          <text x="395" y="240" fontSize="9" fill="var(--text-secondary)">① 对象已被标记为黑色（存活）</text>
          <text x="395" y="254" fontSize="9" fill="var(--text-secondary)">② mutator随后删除所有引用</text>
          <text x="395" y="268" fontSize="9" fill="var(--text-secondary)">③ GC本轮不会回收它</text>

          <circle cx="440" cy="292" r="8" fill="var(--success)" fillOpacity="0.4" stroke="var(--success)" strokeWidth="1" />
          <text x="440" y="295" textAnchor="middle" fontSize="8" fill="var(--text-primary)">X</text>
          <text x="440" y="312" textAnchor="middle" fontSize="7" fill="var(--success)">黑</text>

          <text x="458" y="295" fontSize="9" fill="var(--warning)">{`--del--> 垃圾`}</text>

          <text x="395" y="330" fontSize="9" fill="var(--warning)">X实际已死但本轮不回收 → 下轮再说</text>

          {/* 解决方案：屏障 */}
          <line x1="30" y1="340" x2="710" y2="340" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
          <text x={VIEW_W / 2} y="362" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">屏障方案：SATB vs INC（增量更新）</text>

          {/* SATB */}
          <rect x="40" y="376" width="320" height="108" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" />
          <text x="200" y="396" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">SATB（Snapshot At Beginning）</text>
          <text x="55" y="416" fontSize="9" fill="var(--text-secondary)">开始时快照所有引用关系</text>
          <text x="55" y="430" fontSize="9" fill="var(--text-secondary)">写屏障拦截删除引用：</text>
          <text x="55" y="444" fontSize="9" fill="var(--accent)">{`  旧引用指向的白色对象 → 灰`}</text>
          <text x="55" y="458" fontSize="9" fill="var(--text-secondary)">保证不漏标（可能多标）</text>
          <text x="55" y="474" fontSize="9" fill="var(--text-tertiary)">G1/CMS 使用 SATB 或类似策略</text>

          {/* INC */}
          <rect x="380" y="376" width="320" height="108" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" />
          <text x="540" y="396" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">INC（Incremental Update）</text>
          <text x="395" y="416" fontSize="9" fill="var(--text-secondary)">只记录新增引用</text>
          <text x="395" y="430" fontSize="9" fill="var(--text-secondary)">写屏障拦截新增引用：</text>
          <text x="395" y="444" fontSize="9" fill="var(--success)">{`  黑→白的新引用 → 黑变灰`}</text>
          <text x="395" y="458" fontSize="9" fill="var(--text-secondary)">重新扫描灰色对象</text>
          <text x="395" y="474" fontSize="9" fill="var(--text-tertiary)">CMS/G1 使用 INC 或混合策略</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        并发回收通过短STW+并发标记减少停顿，用SATB快照或INC增量更新两种写屏障策略解决并发标记中的漏标和浮动垃圾问题
      </figcaption>
    </figure>
  );
}
