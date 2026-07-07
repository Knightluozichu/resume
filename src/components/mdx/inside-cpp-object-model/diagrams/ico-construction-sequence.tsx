/**
 * <IcoConstructionSequenceDiagram>：派生类对象构造序列（构造语义章）。
 *
 * 自上而下展示派生类对象构造的完整序列：
 *   ① 设置 vptr 指向基类虚表
 *   ② 调用基类构造函数
 *   ③ 按声明顺序初始化成员变量
 *   ④ 执行派生类构造体
 *   ⑤ 重设 vptr 指向派生类虚表
 * 右侧标注：构造期间虚函数退化为基类版本（vptr 尚未指向派生类虚表）。
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×500（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 500;

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const border = "var(--border)";

interface Step {
  n: string;
  title: string;
  code: string;
  color: string;
}

const STEPS: readonly Step[] = [
  { n: "①", title: "设置 vptr → 基类虚表", code: "vptr = &Base::vtable", color: accent },
  { n: "②", title: "调用基类构造函数", code: "Base::Base()", color: accent },
  { n: "③", title: "按声明顺序初始化成员", code: "成员 m1, m2 依次构造", color: success },
  { n: "④", title: "执行派生类构造体", code: "Derived::Derived() 函数体", color: warning },
  { n: "⑤", title: "重设 vptr → 派生类虚表", code: "vptr = &Derived::vtable", color: warning },
];

export function IcoConstructionSequenceDiagram() {
  const STEP_H = 54;
  const STEP_GAP = 14;
  const STEP_Y0 = 92;
  const stepY = (i: number) => STEP_Y0 + i * (STEP_H + STEP_GAP);
  const boxX = 96;
  const boxW = 320;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="派生类对象构造序列图。自上而下五步：设置 vptr 指向基类虚表、调用基类构造函数、按声明顺序初始化成员、执行派生类构造体、重设 vptr 指向派生类虚表。右侧标注构造期间虚函数退化为基类版本。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="ico-cs-down" markerWidth="9" markerHeight="9" refX="4.5" refY="8" orient="auto">
              <path d="M0 0 L4.5 8 L9 0 z" fill={secondary} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            派生类对象构造序列
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            vptr 在构造过程中被两次设置——这正是「构造期虚函数退化为基类版本」的根源
          </text>

          {/* 步骤序列 */}
          {STEPS.map((s, i) => {
            const y = stepY(i);
            return (
              <g key={s.n}>
                <rect x={boxX} y={y} width={boxW} height={STEP_H} rx="8" fill={s.color} fillOpacity="0.07" stroke={s.color} strokeWidth="1.6" />
                <text x={boxX + 18} y={y + 24} fontSize="13" fontWeight="700" fill={s.color}>
                  {s.n} {s.title}
                </text>
                <text x={boxX + 18} y={y + 44} fontSize="11" fontFamily="monospace" fill={secondary}>
                  {s.code}
                </text>
                {i < STEPS.length - 1 && (
                  <line x1={boxX + boxW / 2} y1={y + STEP_H} x2={boxX + boxW / 2} y2={y + STEP_H + STEP_GAP} stroke={secondary} strokeWidth="1.8" markerEnd="url(#ico-cs-down)" />
                )}
              </g>
            );
          })}

          {/* 右侧说明区 */}
          <rect x={460} y={92} width={228} height={196} rx="8" fill={danger} fillOpacity="0.05" stroke={danger} strokeWidth="1.2" />
          <text x={574} y={116} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={danger}>
            构造期 vptr 行为
          </text>
          <text x={574} y={140} textAnchor="middle" fontSize="11" fill={secondary}>
            步骤 ① 设 vptr 指向基类虚表，
          </text>
          <text x={574} y={158} textAnchor="middle" fontSize="11" fill={secondary}>
            此刻调虚函数会命中基类版本；
          </text>
          <text x={574} y={176} textAnchor="middle" fontSize="11" fill={secondary}>
            步骤 ⑤ 才把 vptr 改派生类虚表。
          </text>
          <text x={574} y={202} textAnchor="middle" fontSize="11" fill={secondary}>
            因而在基类构造函数里调用
          </text>
          <text x={574} y={220} textAnchor="middle" fontSize="11" fill={secondary}>
            虚函数，派生类覆写不会被调用，
          </text>
          <text x={574} y={238} textAnchor="middle" fontSize="11" fill={secondary}>
            多态尚未生效。
          </text>
          <text x={574} y={264} textAnchor="middle" fontSize="11" fontWeight="600" fill={danger}>
            析构期同理，方向相反。
          </text>

          {/* 底部总结 */}
          <line x1={32} y1={432} x2={VIEW_W - 32} y2={432} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={456} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>
            构造 = 先立基类骨架，再填成员，最后改虚表为派生类版本
          </text>
          <text x={VIEW_W / 2} y={476} textAnchor="middle" fontSize="11" fill={secondary}>
            成员初始化顺序由声明顺序决定，与初始化列表书写顺序无关
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        派生类构造时 vptr 先指向基类虚表、最后才改指向派生类虚表；构造期间调虚函数不会触发派生类覆写。析构期严格反向。
      </figcaption>
    </figure>
  );
}
