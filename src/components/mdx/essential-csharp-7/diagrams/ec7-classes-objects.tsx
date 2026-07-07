/**
 * <Ec7ClassesObjectsDiagram>：类的解剖——字段、属性、方法、构造函数。
 *
 * 中央是一个类的 UML 简化图，四周标注各成员类型：
 *   - 字段（private）：私有数据存储
 *   - 属性（public）：带 get/set 的受控访问
 *   - 方法（public）：行为与逻辑
 *   - 构造函数：初始化对象状态
 * 底部标注访问修饰符 public / private / protected。
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

export function Ec7ClassesObjectsDiagram() {
  const cx = VIEW_W / 2;
  const boxX = cx - 130;
  const boxY = 80;
  const boxW = 260;
  const boxH = 230;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="类的解剖图。中央是一个类的 UML 简化图，从上到下：类名 Employee、私有字段 _name、公共属性 Name、公共方法 Work、构造函数 Employee。左侧标注字段和构造函数，右侧标注属性和方法。底部标注访问修饰符 public、private、protected。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={cx} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            类的解剖：字段 · 属性 · 方法 · 构造函数
          </text>
          <text x={cx} y={50} textAnchor="middle" fontSize="11" fill={secondary}>
            封装 = 私有数据 + 公开接口
          </text>

          {/* 左侧标签：字段 */}
          <g>
            <rect x={36} y={108} width={140} height={42} rx="8" fill={danger} fillOpacity="0.08" stroke={danger} strokeWidth="1.4" strokeOpacity="0.5" />
            <text x={106} y={127} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={danger}>字段 field</text>
            <text x={106} y={142} textAnchor="middle" fontSize="10" fill={secondary}>private 存储</text>
            <line x1={176} y1={129} x2={boxX} y2={129} stroke={danger} strokeWidth="1.4" strokeDasharray="4 3" strokeOpacity="0.5" />
          </g>

          {/* 左侧标签：构造函数 */}
          <g>
            <rect x={36} y={232} width={140} height={42} rx="8" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1.4" strokeOpacity="0.5" />
            <text x={106} y={251} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={warning}>构造函数</text>
            <text x={106} y={266} textAnchor="middle" fontSize="10" fill={secondary}>初始化状态</text>
            <line x1={176} y1={253} x2={boxX} y2={253} stroke={warning} strokeWidth="1.4" strokeDasharray="4 3" strokeOpacity="0.5" />
          </g>

          {/* 右侧标签：属性 */}
          <g>
            <rect x={544} y={108} width={140} height={42} rx="8" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.4" strokeOpacity="0.5" />
            <text x={614} y={127} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={accent}>属性 property</text>
            <text x={614} y={142} textAnchor="middle" fontSize="10" fill={secondary}>get / set 受控</text>
            <line x1={boxX + boxW} y1={129} x2={544} y2={129} stroke={accent} strokeWidth="1.4" strokeDasharray="4 3" strokeOpacity="0.5" />
          </g>

          {/* 右侧标签：方法 */}
          <g>
            <rect x={544} y={232} width={140} height={42} rx="8" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1.4" strokeOpacity="0.5" />
            <text x={614} y={251} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={success}>方法 method</text>
            <text x={614} y={266} textAnchor="middle" fontSize="10" fill={secondary}>行为与逻辑</text>
            <line x1={boxX + boxW} y1={253} x2={544} y2={253} stroke={success} strokeWidth="1.4" strokeDasharray="4 3" strokeOpacity="0.5" />
          </g>

          {/* 中央类框 */}
          <rect x={boxX} y={boxY} width={boxW} height={boxH} rx="10" fill={elevated} stroke={primary} strokeWidth="2" />
          {/* 类名头 */}
          <rect x={boxX} y={boxY} width={boxW} height={36} rx="10" fill={primary} fillOpacity="0.08" />
          <rect x={boxX} y={boxY + 18} width={boxW} height={18} fill={primary} fillOpacity="0.08" />
          <text x={cx} y={boxY + 24} textAnchor="middle" fontSize="13" fontWeight="700" fill={primary}>class Employee</text>
          <line x1={boxX + 10} y1={boxY + 36} x2={boxX + boxW - 10} y2={boxY + 36} stroke={border} strokeWidth="1" />

          {/* 成员列表 */}
          <text x={boxX + 16} y={boxY + 60} fontSize="11" fontFamily="monospace" fill={danger}>- _name : string</text>
          <text x={boxX + 16} y={boxY + 80} fontSize="11" fontFamily="monospace" fill={danger}>- _salary : decimal</text>
          <line x1={boxX + 10} y1={boxY + 92} x2={boxX + boxW - 10} y2={boxY + 92} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          <text x={boxX + 16} y={boxY + 112} fontSize="11" fontFamily="monospace" fill={accent}>+ Name : string {"{ get; set; }"}</text>
          <text x={boxX + 16} y={boxY + 132} fontSize="11" fontFamily="monospace" fill={success}>+ Work() : void</text>
          <text x={boxX + 16} y={boxY + 152} fontSize="11" fontFamily="monospace" fill={success}>+ Raise(pct) : void</text>
          <line x1={boxX + 10} y1={boxY + 164} x2={boxX + boxW - 10} y2={boxY + 164} stroke={border} strokeWidth="1" strokeDasharray="3 2" />
          <text x={boxX + 16} y={boxY + 184} fontSize="11" fontFamily="monospace" fill={warning}>+ Employee(name, salary)</text>
          <text x={boxX + 16} y={boxY + 204} fontSize="11" fontFamily="monospace" fill={warning}>+ Employee()  // 默认</text>

          {/* 底部访问修饰符 */}
          <line x1={32} y1={350} x2={VIEW_W - 32} y2={350} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={cx} y={370} textAnchor="middle" fontSize="11.5" fill={secondary}>
            <tspan fill={success} fontWeight="600">public</tspan> 外部可访问 ·{" "}
            <tspan fill={danger} fontWeight="600">private</tspan> 仅类内 ·{" "}
            <tspan fill={warning} fontWeight="600">protected</tspan> 类与派生类
          </text>
          <text x={cx} y={395} textAnchor="middle" fontSize="11" fill={secondary}>
            属性 = 字段的安全代理 · 构造函数 = 对象的出生证明 · this 指向当前实例
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        类用 private 字段存储数据、public 属性提供受控访问、public 方法暴露行为、构造函数初始化对象状态。
      </figcaption>
    </figure>
  );
}
