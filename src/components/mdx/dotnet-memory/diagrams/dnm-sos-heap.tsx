/**
 * <DnmSosHeapDiagram>：SOS 堆分析——!dumpheap 输出解读。
 *
 * 展示 !dumpheap -stat 输出的典型结构与分析方法。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×420，四周留白 >=32，字号 >=11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function DnmSosHeapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="SOS 堆分析。展示 !dumpheap -stat 命令输出的统计结构，以及如何通过类型数量和大小定位内存问题。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            SOS 堆分析：!dumpheap -stat 输出解读
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            按类型统计对象数量与大小 · 排序定位内存热点
          </text>

          {/* 终端输出模拟 */}
          <rect x={50} y={72} width={400} height={240} rx="8" fill={elevated} stroke={border} strokeWidth="1.2" />
          <text x={60} y={92} fontSize="11" fill={secondary} fontFamily="monospace">0:003&gt; !dumpheap -stat</text>

          {/* 表头 */}
          <text x={60} y={112} fontSize="10" fill={accent} fontFamily="monospace" fontWeight="700">MT        Count    TotalSize  Class Name</text>
          <line x1={60} y1={118} x2={440} y2={118} stroke={border} strokeWidth="1" />

          {/* 数据行 */}
          <text x={60} y={134} fontSize="10" fill={secondary} fontFamily="monospace">7256a8c0   1        24         System.Object</text>
          <text x={60} y={150} fontSize="10" fill={secondary} fontFamily="monospace">7256a848   3        72         System.String</text>
          <text x={60} y={166} fontSize="10" fill={warning} fontFamily="monospace">6e4a3b00   152      7296       MyApp.CacheItem</text>
          <text x={60} y={182} fontSize="10" fill={warning} fontFamily="monospace">6e4a3c10   89       4272       MyApp.Request</text>
          <text x={60} y={198} fontSize="10" fill={danger} fontFamily="monospace">6e4a3d20   12       1048576    MyApp.LargeBuffer</text>
          <text x={60} y={214} fontSize="10" fill={secondary} fontFamily="monospace">6e4a3e30   5        1200       System.Byte[]</text>
          <text x={60} y={230} fontSize="10" fill={secondary} fontFamily="monospace">...</text>
          <text x={60} y={252} fontSize="10" fill={accent} fontFamily="monospace">Statistics:</text>
          <text x={60} y={268} fontSize="10" fill={secondary} fontFamily="monospace">  Total 312 objects</text>
          <text x={60} y={284} fontSize="10" fill={secondary} fontFamily="monospace">  Total size ~1.1 MB</text>

          {/* 右侧：分析方法 */}
          <rect x={470} y={72} width={200} height={240} rx="8" fill={elevated} stroke={accent} strokeWidth="1.2" />
          <text x={570} y={92} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>分析步骤</text>

          <rect x={485} y={104} width={170} height={28} rx="4" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1" />
          <text x={570} y={122} textAnchor="middle" fontSize="10" fill={primary}>1. 按 TotalSize 排序</text>

          <rect x={485} y={140} width={170} height={28} rx="4" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1" />
          <text x={570} y={158} textAnchor="middle" fontSize="10" fill={primary}>2. 找异常多的类型</text>

          <rect x={485} y={176} width={170} height={28} rx="4" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1" />
          <text x={570} y={194} textAnchor="middle" fontSize="10" fill={primary}>3. 查看对象详情</text>

          <rect x={485} y={212} width={170} height={28} rx="4" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1" />
          <text x={570} y={230} textAnchor="middle" fontSize="10" fill={primary}>4. !gcroot 追根</text>

          <rect x={485} y={248} width={170} height={44} rx="4" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1" strokeDasharray="3 2" />
          <text x={570} y={266} textAnchor="middle" fontSize="10" fontWeight="700" fill={danger}>5. 定位泄漏源</text>
          <text x={570} y={282} textAnchor="middle" fontSize="10" fill={secondary}>静态字段/事件订阅</text>

          {/* 底部：关键发现 */}
          <line x1={32} y1={328} x2={VIEW_W - 32} y2={328} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <rect x={50} y={340} width={620} height={56} rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.2" />
          <text x={VIEW_W / 2} y={360} textAnchor="middle" fontSize="12" fontWeight="700" fill={danger}>
            关键发现
          </text>
          <text x={VIEW_W / 2} y={380} textAnchor="middle" fontSize="10" fill={secondary}>
            LargeBuffer 12 个对象占 1MB（LOH）· CacheItem 152 个（疑似缓存泄漏）· Request 89 个（疑似未释放）
          </text>

          <defs />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        !dumpheap -stat 按类型统计堆内对象，通过排序和数量对比定位内存热点类型。
      </figcaption>
    </figure>
  );
}
