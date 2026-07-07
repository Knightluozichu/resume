/**
 * <EcsPropertyPreferDiagram>：属性优先于公共数据字段（条款 1）。
 *
 * 左：public 字段——外部直接读写，无校验、无法变更通知、无法虚拟化
 * 右：属性（get/set）——封装校验、可虚拟、可只读、可参与接口
 * 下方：属性带来的能力清单（数据绑定 / 懒求值 / 接口契约 / 虚成员）
 *
 * 纯静态展示，无交互。Server Component。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const danger = "var(--danger)";
const success = "var(--success)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";

const BENEFITS: { label: string; desc: string }[] = [
  { label: "封装校验", desc: "set 中拦截非法值" },
  { label: "数据绑定", desc: "UI 框架依赖属性" },
  { label: "接口契约", desc: "接口只能含属性" },
  { label: "虚成员", desc: "派生类可 override" },
];

export function EcsPropertyPreferDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="属性优先于字段对比。左：public 字段，外部直接读写、无校验、无法虚拟化；右：属性 get/set，封装校验、可虚拟、可只读、可参与接口。下方列出属性四大能力：封装校验、数据绑定、接口契约、虚成员。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="ecs-prop-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={secondary} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            属性 vs 公共字段
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            字段暴露实现细节 · 属性封装访问边界
          </text>

          {/* 左：public 字段 */}
          <g>
            <rect x={40} y={78} width={290} height={180} rx="12" fill={danger} fillOpacity="0.05" stroke={danger} strokeWidth="1.6" />
            <text x={185} y={100} textAnchor="middle" fontSize="13" fontWeight="700" fill={danger}>
              public 字段（反模式）
            </text>
            <line x1={52} y1={110} x2={318} y2={110} stroke={border} strokeWidth="1" />
            <text x={60} y={132} fontSize="11.5" fontFamily="monospace" fill={primary}>{"public int Age;"}</text>
            <text x={60} y={154} fontSize="11" fill={secondary}>外部可写任意值，无校验</text>
            <text x={60} y={178} fontSize="11.5" fontFamily="monospace" fill={primary}>{"obj.Age = -5;  // 通过"}</text>
            <text x={60} y={200} fontSize="11" fill={secondary}>改字段名 = 破坏二进制兼容</text>
            <text x={60} y={224} fontSize="11" fill={secondary}>无法虚拟化 / 无法数据绑定</text>
            <text x={60} y={246} fontSize="11" fill={secondary}>无法表达只读意图</text>
          </g>

          {/* 中间箭头 */}
          <line x1={334} y1={168} x2={392} y2={168} stroke={secondary} strokeWidth="1.6" markerEnd="url(#ecs-prop-arrow)" />
          <text x={363} y={160} textAnchor="middle" fontSize="10" fill={secondary}>改写</text>

          {/* 右：属性 */}
          <g>
            <rect x={396} y={78} width={284} height={180} rx="12" fill={success} fillOpacity="0.05" stroke={success} strokeWidth="1.6" />
            <text x={538} y={100} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>
              属性（推荐）
            </text>
            <line x1={408} y1={110} x2={668} y2={110} stroke={border} strokeWidth="1" />
            <text x={406} y={132} fontSize="11" fontFamily="monospace" fill={primary}>{"public int Age"}</text>
            <text x={406} y={148} fontSize="11" fontFamily="monospace" fill={primary}>{"{"}</text>
            <text x={414} y={164} fontSize="11" fontFamily="monospace" fill={primary}>{"get => _age;"}</text>
            <text x={414} y={180} fontSize="11" fontFamily="monospace" fill={primary}>{"set => _age = value >= 0"}</text>
            <text x={422} y={196} fontSize="11" fontFamily="monospace" fill={primary}>{"? value : throw;"}</text>
            <text x={406} y={212} fontSize="11" fontFamily="monospace" fill={primary}>{"}"}</text>
            <text x={406} y={234} fontSize="11" fill={secondary}>校验拦截非法值</text>
            <text x={406} y={250} fontSize="11" fill={secondary}>改实现 = 不破坏 ABI</text>
          </g>

          {/* 下方：属性能力清单 */}
          <text x={VIEW_W / 2} y={286} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>
            属性带来的四项能力
          </text>
          {BENEFITS.map((b, i) => {
            const bx = 40 + i * 162;
            return (
              <g key={b.label}>
                <rect x={bx} y={300} width={150} height={56} rx="8" fill={accent} fillOpacity="0.07" stroke={accent} strokeWidth="1.4" strokeOpacity="0.5" />
                <text x={bx + 75} y={324} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>
                  {b.label}
                </text>
                <text x={bx + 75} y={344} textAnchor="middle" fontSize="11" fill={secondary}>
                  {b.desc}
                </text>
              </g>
            );
          })}

          {/* 底部说明 */}
          <text x={VIEW_W / 2} y={392} textAnchor="middle" fontSize="11" fill={secondary}>
            字段暴露存储 · 属性暴露契约——先用属性，字段永远是 private
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        public 字段把存储细节暴露给外部，一旦发布就无法收回控制；属性封装 get/set 边界，可校验、可虚拟、可参与接口与数据绑定。
      </figcaption>
    </figure>
  );
}
