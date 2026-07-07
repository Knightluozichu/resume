/**
 * <McdSmartPtrDesignDiagram>：Loki SmartPtr 的四个策略维度。
 *
 * 四列展示 SmartPtr 的策略参数：Ownership（所有权）、Conversion（转换）、
 * Checking（检查）、Storage（存储），底部组合成 SmartPtr 模板。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×500，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 500;

const COL_W = 150;
const COL_GAP = 16;
const COL_MARGIN = 30;
const colX = (i: number) => COL_MARGIN + i * (COL_W + COL_GAP);

interface Strategy {
  title: string;
  color: string;
  options: string[];
}

const STRATEGIES: readonly Strategy[] = [
  { title: "Ownership", color: "var(--accent)", options: ["DeepCopy", "RefCounted", "RefLinked", "NoCopy"] },
  { title: "Conversion", color: "var(--success)", options: ["Disallow", "Allow"] },
  { title: "Checking", color: "var(--warning)", options: ["AssertCheck", "RejectNull", "NoCheck"] },
  { title: "Storage", color: "var(--accent)", options: ["DefaultSP", "ArrayStorage", "LockedStorage"] },
];

const HEAD_Y = 80;
const HEAD_H = 30;
const OPT_START_Y = 124;
const OPT_H = 38;
const OPT_GAP = 8;
const optY = (i: number) => OPT_START_Y + i * (OPT_H + OPT_GAP);

const COMBO_Y = 348;
const COMBO_H = 70;

export function McdSmartPtrDesignDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Loki SmartPtr 的四个策略维度。四列：Ownership 所有权（紫色，DeepCopy、RefCounted、RefLinked、NoCopy）；Conversion 转换（绿色，Disallow、Allow）；Checking 检查（暖色，AssertCheck、RejectNull、NoCheck）；Storage 存储（紫色，DefaultSP、ArrayStorage、LockedStorage）。底部组合成 SmartPtr 模板。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={32} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Loki SmartPtr：四维策略组合
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            所有权 · 转换 · 检查 · 存储——一指针四维度编译时定制
          </text>

          {/* 列头 + 选项 */}
          {STRATEGIES.map((s, ci) => {
            const cx = colX(ci);
            return (
              <g key={s.title}>
                <rect x={cx} y={HEAD_Y} width={COL_W} height={HEAD_H} rx="6" fill={s.color} fillOpacity="0.14" stroke={s.color} strokeWidth="1.5" />
                <text x={cx + COL_W / 2} y={HEAD_Y + 20} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={s.color} fontFamily="monospace">
                  {s.title}
                </text>
                {s.options.map((opt, oi) => {
                  const y = optY(oi);
                  return (
                    <g key={opt}>
                      <rect x={cx} y={y} width={COL_W} height={OPT_H} rx="7" fill={s.color} fillOpacity="0.06" stroke={s.color} strokeWidth="1.2" strokeOpacity="0.5" />
                      <text x={cx + COL_W / 2} y={y + OPT_H / 2 + 4} textAnchor="middle" fontSize="11.5" fontWeight="600" fill="var(--text-primary)" fontFamily="monospace">
                        {opt}
                      </text>
                    </g>
                  );
                })}
                {/* 列向下汇入组合框的虚线 */}
                <line x1={cx + COL_W / 2} y1={optY(s.options.length - 1) + OPT_H} x2={cx + COL_W / 2} y2={COMBO_Y} stroke="var(--text-secondary)" strokeWidth="1.2" strokeOpacity="0.5" strokeDasharray="3 3" />
              </g>
            );
          })}

          {/* 组合框 */}
          <rect x={30} y={COMBO_Y} width={VIEW_W - 60} height={COMBO_H} rx="10" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x={VIEW_W / 2} y={COMBO_Y + 30} textAnchor="middle" fontSize="13.5" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">
            {"SmartPtr<T, Ownership, Conversion, Checking, Storage>"}
          </text>
          <text x={VIEW_W / 2} y={COMBO_Y + 54} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            四个策略各取其一，编译时生成定制智能指针 · 取代手写多个指针类
          </text>

          {/* 底部说明 */}
          <text x={VIEW_W / 2} y={452} textAnchor="middle" fontSize="11.5" fill="var(--text-secondary)">
            默认 RefCounted + Disallow + AssertCheck + DefaultSP，按需替换维度
          </text>
          <text x={VIEW_W / 2} y={472} textAnchor="middle" fontSize="10.5" fill="var(--text-secondary)" fontFamily="monospace">
            一套模板 = N x M x K x L 种指针，零虚函数开销
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        SmartPtr 用四个策略维度（所有权、转换、检查、存储）编译时组合，一套模板顶多个手写指针类。
      </figcaption>
    </figure>
  );
}
