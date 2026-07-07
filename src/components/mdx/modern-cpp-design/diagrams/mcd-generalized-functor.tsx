/**
 * <McdGeneralizedFunctorDiagram>：广义仿函数——统一可调用对象封装。
 *
 * 顶部三类可调用对象（函数指针、成员函数+对象、仿函数）封装进中间 Functor，
 * 底部以统一 operator() 调用，抹平调用形式差异。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×460，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 460;

interface Source {
  name: string;
  desc: string;
  color: string;
  x: number;
}
const SOURCES: readonly Source[] = [
  { name: "函数指针", desc: "void f(int)", color: "var(--accent)", x: 50 },
  { name: "成员函数 + 对象", desc: "obj, &C::f", color: "var(--success)", x: 260 },
  { name: "仿函数", desc: "operator()", color: "var(--warning)", x: 470 },
];
const SRC_W = 200;
const SRC_Y = 84;
const SRC_H = 58;

const FUNCTOR_X = 160;
const FUNCTOR_Y = 196;
const FUNCTOR_W = 400;
const FUNCTOR_H = 64;

const CALL_X = 210;
const CALL_Y = 322;
const CALL_W = 300;
const CALL_H = 56;

export function McdGeneralizedFunctorDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="广义仿函数示意。顶部三类可调用对象：函数指针（void f(int)，紫色）、成员函数加对象（obj 与类成员函数，绿色）、仿函数（operator()，暖色），三者封装进中间 Functor 对象，底部以统一 operator() 调用抹平调用形式差异。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="mcd-gf-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={32} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            广义仿函数：统一可调用对象封装
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            三种调用形式一个壳——Functor 统一存储、按值传递、统一调用
          </text>

          {/* 三个源 */}
          {SOURCES.map((s) => (
            <g key={s.name}>
              <rect x={s.x} y={SRC_Y} width={SRC_W} height={SRC_H} rx="8" fill={s.color} fillOpacity="0.10" stroke={s.color} strokeWidth="1.6" />
              <text x={s.x + SRC_W / 2} y={SRC_Y + 24} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={s.color}>
                {s.name}
              </text>
              <text x={s.x + SRC_W / 2} y={SRC_Y + 44} textAnchor="middle" fontSize="11" fill="var(--text-primary)" fontFamily="monospace">
                {s.desc}
              </text>
            </g>
          ))}

          {/* 源 → Functor 箭头 */}
          {SOURCES.map((s) => (
            <line key={`sa-${s.name}`} x1={s.x + SRC_W / 2} y1={SRC_Y + SRC_H} x2={VIEW_W / 2} y2={FUNCTOR_Y} stroke="var(--text-secondary)" strokeWidth="1.4" strokeOpacity="0.6" markerEnd="url(#mcd-gf-arrow)" />
          ))}

          {/* Functor 封装框 */}
          <rect x={FUNCTOR_X} y={FUNCTOR_Y} width={FUNCTOR_W} height={FUNCTOR_H} rx="10" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x={VIEW_W / 2} y={FUNCTOR_Y + 27} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">
            {"Functor<R, TL>"}
          </text>
          <text x={VIEW_W / 2} y={FUNCTOR_Y + 49} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            类型擦除存储任意可调用对象 · 支持参数绑定与组合
          </text>

          {/* Functor → Call 箭头 */}
          <line x1={VIEW_W / 2} y1={FUNCTOR_Y + FUNCTOR_H} x2={VIEW_W / 2} y2={CALL_Y} stroke="var(--text-secondary)" strokeWidth="1.6" markerEnd="url(#mcd-gf-arrow)" />

          {/* 统一调用框 */}
          <rect x={CALL_X} y={CALL_Y} width={CALL_W} height={CALL_H} rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.6" />
          <text x={VIEW_W / 2} y={CALL_Y + 25} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)" fontFamily="monospace">
            {"functor(args...)"}
          </text>
          <text x={VIEW_W / 2} y={CALL_Y + 44} textAnchor="middle" fontSize="11" fill="var(--text-primary)">
            统一 operator() 调用 · 抹平调用形式差异
          </text>

          {/* 底部说明 */}
          <line x1={32} y1={416} x2={VIEW_W - 32} y2={416} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={438} textAnchor="middle" fontSize="11.5" fill="var(--text-secondary)">
            把回调、命令、事件处理器统一成 Functor，按值传递、自由组合
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        广义仿函数用 Functor 类型擦除封装函数指针、成员函数与仿函数，统一 operator() 调用。
      </figcaption>
    </figure>
  );
}
