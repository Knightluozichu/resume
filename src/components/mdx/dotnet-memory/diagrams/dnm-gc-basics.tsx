/**
 * <DnmGcBasicsDiagram>：GC 基础——分代回收与回收流程。
 *
 * 上半：三代堆（Gen0/Gen1/Gen2）的分配与晋升。
 * 下半：一次 GC 的标记-清除-压缩三阶段流程。
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

export function DnmGcBasicsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="GC 分代回收与回收流程。上半展示三代堆 Gen0/Gen1/Gen2 的对象分配与晋升。下半展示一次 GC 的标记、清除、压缩三阶段。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            GC 分代回收与回收流程
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            新对象进 Gen0 · 存活晋升 · 分代假设降低全堆扫描
          </text>

          {/* 上半：三代堆 */}
          <rect x={50} y={76} width={150} height={70} rx="6" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={125} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent} fontFamily="monospace">Gen 0</text>
          <text x={125} y={114} textAnchor="middle" fontSize="10" fill={secondary}>新对象分配区</text>
          <text x={125} y={130} textAnchor="middle" fontSize="10" fill={secondary}>预算最小 · 回收最快</text>

          <line x1={200} y1={111} x2={230} y2={111} stroke={accent} strokeWidth="1.4" markerEnd="url(#dnm-gc-a1)" />
          <text x={215} y={103} textAnchor="middle" fontSize="10" fill={secondary}>存活</text>

          <rect x={230} y={76} width={150} height={70} rx="6" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={305} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={success} fontFamily="monospace">Gen 1</text>
          <text x={305} y={114} textAnchor="middle" fontSize="10" fill={secondary}>中间缓冲区</text>
          <text x={305} y={130} textAnchor="middle" fontSize="10" fill={secondary}>回收较慢</text>

          <line x1={380} y1={111} x2={410} y2={111} stroke={success} strokeWidth="1.4" markerEnd="url(#dnm-gc-a2)" />
          <text x={395} y={103} textAnchor="middle" fontSize="10" fill={secondary}>存活</text>

          <rect x={410} y={76} width={150} height={70} rx="6" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={485} y={96} textAnchor="middle" fontSize="12" fontWeight="700" fill={warning} fontFamily="monospace">Gen 2</text>
          <text x={485} y={114} textAnchor="middle" fontSize="10" fill={secondary}>长生命周期对象</text>
          <text x={485} y={130} textAnchor="middle" fontSize="10" fill={secondary}>Full GC 才回收</text>

          {/* 分隔线 */}
          <line x1={32} y1={166} x2={VIEW_W - 32} y2={166} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 下半：GC 回收三阶段 */}
          <text x={VIEW_W / 2} y={188} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            一次 GC 回收的三阶段流程
          </text>

          {/* 阶段1：标记 */}
          <rect x={50} y={206} width={180} height={150} rx="8" fill={elevated} stroke={accent} strokeWidth="1.2" />
          <text x={140} y={226} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>1. 标记 Mark</text>
          <text x={140} y={248} textAnchor="middle" fontSize="10" fill={secondary}>从根（栈/静态/寄存器）出发</text>
          <text x={140} y={264} textAnchor="middle" fontSize="10" fill={secondary}>遍历引用图</text>
          <text x={140} y={280} textAnchor="middle" fontSize="10" fill={secondary}>标记所有可达对象</text>
          <text x={140} y={306} textAnchor="middle" fontSize="10" fontWeight="600" fill={accent}>可达 = 存活</text>
          <text x={140} y={322} textAnchor="middle" fontSize="10" fill={secondary}>不可达 = 垃圾</text>

          <line x1={230} y1={281} x2={260} y2={281} stroke={accent} strokeWidth="1.2" markerEnd="url(#dnm-gc-a1)" />

          {/* 阶段2：清除 */}
          <rect x={260} y={206} width={180} height={150} rx="8" fill={elevated} stroke={success} strokeWidth="1.2" />
          <text x={350} y={226} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>2. 清除 Sweep</text>
          <text x={350} y={248} textAnchor="middle" fontSize="10" fill={secondary}>遍历堆中所有对象</text>
          <text x={350} y={264} textAnchor="middle" fontSize="10" fill={secondary}>未标记的对象视为垃圾</text>
          <text x={350} y={280} textAnchor="middle" fontSize="10" fill={secondary}>释放其占用的内存</text>
          <text x={350} y={306} textAnchor="middle" fontSize="10" fontWeight="600" fill={success}>内存变为空闲</text>
          <text x={350} y={322} textAnchor="middle" fontSize="10" fill={secondary}>但可能产生碎片</text>

          <line x1={440} y1={281} x2={470} y2={281} stroke={success} strokeWidth="1.2" markerEnd="url(#dnm-gc-a2)" />

          {/* 阶段3：压缩 */}
          <rect x={470} y={206} width={200} height={150} rx="8" fill={elevated} stroke={warning} strokeWidth="1.2" />
          <text x={570} y={226} textAnchor="middle" fontSize="12" fontWeight="700" fill={warning}>3. 压缩 Compact</text>
          <text x={570} y={248} textAnchor="middle" fontSize="10" fill={secondary}>将存活对象向一端移动</text>
          <text x={570} y={264} textAnchor="middle" fontSize="10" fill={secondary}>消除内存碎片</text>
          <text x={570} y={280} textAnchor="middle" fontSize="10" fill={secondary}>更新所有引用地址</text>
          <text x={570} y={306} textAnchor="middle" fontSize="10" fontWeight="600" fill={warning}>Gen0/Gen1 总是压缩</text>
          <text x={570} y={322} textAnchor="middle" fontSize="10" fill={secondary}>Gen2/LOH 不一定压缩</text>

          <defs>
            <marker id="dnm-gc-a1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={accent} />
            </marker>
            <marker id="dnm-gc-a2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={success} />
            </marker>
          </defs>

          {/* 底部注释 */}
          <line x1={32} y1={374} x2={VIEW_W - 32} y2={374} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={392} textAnchor="middle" fontSize="11" fill={secondary}>
            分代假设：新对象死得快 → 先回收 Gen0，避免扫描全堆
          </text>
          <text x={VIEW_W / 2} y={408} textAnchor="middle" fontSize="11" fill={secondary}>
            压缩移动对象成本高 → Gen2 和 LOH 默认不压缩
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        GC 分代回收：新对象分配在 Gen0，存活后逐代晋升；每次回收经历标记-清除-压缩三阶段。
      </figcaption>
    </figure>
  );
}
