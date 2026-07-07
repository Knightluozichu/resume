/**
 * <Ec7InheritanceInterfacesDiagram>：继承与接口——类层次图。
 *
 * 上层：抽象基类 Animal（含虚方法 Speak）
 * 中层：Dog / Cat 继承 Animal，override Speak
 * 侧边：接口 IMovable / IComparable 由 Dog 实现
 * 底部标注 virtual/override/abstract 和接口契约。
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

export function Ec7InheritanceInterfacesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="继承与接口类层次图。顶部是抽象基类 Animal（含虚方法 Speak），中间左右两侧分别是 Dog 和 Cat 继承 Animal 并 override Speak，左侧 Dog 还实现了接口 IMovable 和 IComparable。底部标注 virtual、override、abstract 关键字和接口契约的含义。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            继承与接口：类层次与多态
          </text>
          <text x={VIEW_W / 2} y={50} textAnchor="middle" fontSize="11" fill={secondary}>
            is-a 继承 · can-do 接口 · virtual/override 多态
          </text>

          {/* 接口节点（左侧） */}
          <g>
            <rect x={36} y={80} width={130} height={36} rx="8" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.6" />
            <text x={101} y={103} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={accent}>{"interface IMovable"}</text>
            <rect x={36} y={124} width={130} height={36} rx="8" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1.6" />
            <text x={101} y={147} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={accent}>{"interface IComparable"}</text>
            {/* 接口实现虚线箭头 */}
            <line x1={166} y1={98} x2={210} y2={210} stroke={accent} strokeWidth="1.4" strokeDasharray="5 3" strokeOpacity="0.6" />
            <line x1={166} y1={142} x2={210} y2={220} stroke={accent} strokeWidth="1.4" strokeDasharray="5 3" strokeOpacity="0.6" />
          </g>

          {/* 抽象基类（顶部中央） */}
          <g>
            <rect x={270} y={74} width={180} height={68} rx="10" fill={danger} fillOpacity="0.08" stroke={danger} strokeWidth="2" />
            <text x={360} y={96} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={danger}>{"abstract class Animal"}</text>
            <text x={360} y={114} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={primary}>+ Name : string</text>
            <text x={360} y={132} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={primary}>+ abstract Speak() : void</text>
          </g>

          {/* 继承箭头 */}
          <line x1={300} y1={210} x2={345} y2={142} stroke={success} strokeWidth="1.8" markerEnd="url(#ec7-inh-arrow)" />
          <line x1={420} y1={210} x2={375} y2={142} stroke={warning} strokeWidth="1.8" markerEnd="url(#ec7-inh-arrow)" />
          <defs>
            <marker id="ec7-inh-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
              <path d="M0 0 L8 3 L0 6 z" fill={secondary} />
            </marker>
          </defs>

          {/* Dog 类（左下） */}
          <g>
            <rect x={210} y={210} width={180} height={80} rx="10" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.6" />
            <text x={300} y={232} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={success}>class Dog : Animal</text>
            <text x={300} y={252} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={primary}>+ override Speak()</text>
            <text x={300} y={270} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={primary}>+ Fetch() : void</text>
            <text x={300} y={284} textAnchor="middle" fontSize="10" fill={secondary}>IMovable, IComparable</text>
          </g>

          {/* Cat 类（右下） */}
          <g>
            <rect x={430} y={210} width={180} height={80} rx="10" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.6" />
            <text x={520} y={232} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={warning}>class Cat : Animal</text>
            <text x={520} y={252} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={primary}>+ override Speak()</text>
            <text x={520} y={270} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={primary}>+ Purr() : void</text>
            <text x={520} y={284} textAnchor="middle" fontSize="10" fill={secondary}>仅继承 Animal</text>
          </g>

          {/* 多态调用示意 */}
          <g>
            <rect x={210} y={316} width={400} height={34} rx="8" fill={elevated} stroke={border} strokeWidth="1.2" />
            <text x={410} y={338} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={primary}>
              {"Animal a = new Dog(); a.Speak(); // 输出 Woof"}
            </text>
          </g>

          {/* 底部说明 */}
          <line x1={32} y1={364} x2={VIEW_W - 32} y2={364} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={386} textAnchor="middle" fontSize="11" fill={secondary}>
            <tspan fill={danger} fontWeight="600">virtual/abstract</tspan> 定义可覆写点 ·{" "}
            <tspan fill={success} fontWeight="600">override</tspan> 实现多态 ·{" "}
            <tspan fill={accent} fontWeight="600">interface</tspan> 定义能力契约
          </text>
          <text x={VIEW_W / 2} y={405} textAnchor="middle" fontSize="11" fill={secondary}>
            继承是 is-a（单继承）· 接口是 can-do（多实现）· 运行时按实际类型分派
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        抽象基类 Animal 定义虚方法 Speak，Dog 和 Cat 继承并 override；Dog 额外实现 IMovable 和 IComparable 接口。
      </figcaption>
    </figure>
  );
}
