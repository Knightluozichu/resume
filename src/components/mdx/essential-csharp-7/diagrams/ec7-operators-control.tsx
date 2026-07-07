/**
 * <Ec7OperatorsControlDiagram>：运算符优先级与控制流。
 *
 * 上半部分：运算符优先级阶梯（从高到低）：
 *   一元 → 乘除 → 加减 → 关系 → 逻辑 → 赋值
 * 下半部分：控制流分支图（if-else / switch / 循环）
 *
 * 纯静态展示，无交互。Server Component。
 * viewBox 720×420，四周留白 ≥32，字号 ≥11。
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

const PRECEDENCE: { level: string; ops: string; color: string }[] = [
  { level: "一元", ops: "++  --  !  ~  (T)x", color: accent },
  { level: "乘除取模", ops: "*  /  %", color: accent },
  { level: "加减", ops: "+  -", color: success },
  { level: "关系", ops: "<  >  <=  >=  is  as", color: success },
  { level: "相等", ops: "==  !=", color: warning },
  { level: "逻辑", ops: "&  ^  |  &&  ||", color: warning },
  { level: "赋值", ops: "=  +=  -=  ??=", color: danger },
];

const PREC_Y = (i: number) => 82 + i * 36;
const PREC_X = 40;
const PREC_W = 300;

const FLOW_X = 380;
const FLOW_W = 300;

export function Ec7OperatorsControlDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="运算符优先级与控制流。左半部分是运算符优先级阶梯从高到低：一元、乘除取模、加减、关系、相等、逻辑、赋值。右半部分是控制流分支：if-else 二选一、switch 多路分支、for/while 循环。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            运算符优先级与控制流
          </text>
          <text x={VIEW_W / 2} y={50} textAnchor="middle" fontSize="11" fill={secondary}>
            优先级决定求值顺序 · 控制流决定执行路径
          </text>

          {/* 左半：优先级阶梯 */}
          <text x={PREC_X + PREC_W / 2} y={72} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent}>
            运算符优先级（高 → 低）
          </text>
          {PRECEDENCE.map((p, i) => {
            const y = PREC_Y(i + 1);
            return (
              <g key={p.level}>
                <rect x={PREC_X} y={y} width={PREC_W} height={28} rx="6" fill={p.color} fillOpacity="0.08" stroke={p.color} strokeWidth="1.2" strokeOpacity="0.5" />
                <text x={PREC_X + 12} y={y + 19} fontSize="11" fontWeight="600" fill={p.color}>
                  {p.level}
                </text>
                <text x={PREC_X + PREC_W - 12} y={y + 19} textAnchor="end" fontSize="11" fontFamily="monospace" fill={primary}>
                  {p.ops}
                </text>
              </g>
            );
          })}
          {/* 阶梯箭头 */}
          <line x1={PREC_X - 6} y1={PREC_Y(1) + 14} x2={PREC_X - 6} y2={PREC_Y(7) + 14} stroke={secondary} strokeWidth="1.4" markerEnd="url(#ec7-op-arrow)" />
          <defs>
            <marker id="ec7-op-arrow" markerWidth="8" markerHeight="8" refX="4" refY="6" orient="auto">
              <path d="M0 0 L4 6 L8 0 z" fill={secondary} />
            </marker>
          </defs>

          {/* 右半：控制流 */}
          <text x={FLOW_X + FLOW_W / 2} y={72} textAnchor="middle" fontSize="12" fontWeight="700" fill={success}>
            控制流分支
          </text>

          {/* if-else */}
          <g>
            <rect x={FLOW_X} y={88} width={FLOW_W} height={78} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
            <text x={FLOW_X + 12} y={108} fontSize="11.5" fontWeight="700" fill={success}>if-else</text>
            <text x={FLOW_X + 12} y={128} fontSize="11" fontFamily="monospace" fill={primary}>{"if (cond) { ... }"}</text>
            <text x={FLOW_X + 12} y={146} fontSize="11" fontFamily="monospace" fill={primary}>{"else { ... }"}</text>
            <text x={FLOW_X + FLOW_W - 12} y={108} textAnchor="end" fontSize="10" fill={secondary}>二选一</text>
          </g>

          {/* switch */}
          <g>
            <rect x={FLOW_X} y={178} width={FLOW_W} height={78} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.4" strokeOpacity="0.5" />
            <text x={FLOW_X + 12} y={198} fontSize="11.5" fontWeight="700" fill={warning}>switch + 模式匹配</text>
            <text x={FLOW_X + 12} y={218} fontSize="11" fontFamily="monospace" fill={primary}>case pattern =&gt; result;</text>
            <text x={FLOW_X + 12} y={236} fontSize="11" fontFamily="monospace" fill={primary}>default =&gt; fallback;</text>
            <text x={FLOW_X + FLOW_W - 12} y={198} textAnchor="end" fontSize="10" fill={secondary}>多路分支</text>
          </g>

          {/* 循环 */}
          <g>
            <rect x={FLOW_X} y={268} width={FLOW_W} height={78} rx="8" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1.4" strokeOpacity="0.5" />
            <text x={FLOW_X + 12} y={288} fontSize="11.5" fontWeight="700" fill={danger}>循环 for / while / foreach</text>
            <text x={FLOW_X + 12} y={308} fontSize="11" fontFamily="monospace" fill={primary}>for / while / do-while</text>
            <text x={FLOW_X + 12} y={326} fontSize="11" fontFamily="monospace" fill={primary}>foreach (var x in col)</text>
            <text x={FLOW_X + FLOW_W - 12} y={288} textAnchor="end" fontSize="10" fill={secondary}>重复执行</text>
          </g>

          {/* 底部说明 */}
          <line x1={32} y1={376} x2={VIEW_W - 32} y2={376} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={400} textAnchor="middle" fontSize="11.5" fill={secondary}>
            优先级高的先算 · break 跳出 · continue 跳过 · ?? 空合并运算符
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        运算符优先级从一元到赋值递减；控制流通过 if-else、switch 模式匹配、循环控制执行路径。
      </figcaption>
    </figure>
  );
}
