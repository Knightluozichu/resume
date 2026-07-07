/**
 * <EppClassesObjectsDiagram>：C++ 类解剖图（cpp-primer-plus 类与对象章）。
 *
 * 左侧大卡片展示类的访问控制结构（public/private + 数据成员 + 成员函数）；
 * 右侧三张小卡片讲构造函数、this 指针、友元三个配套概念。
 * 底部总结栏点出「类 = 数据 + 行为 + 访问控制」的封装本质。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×470、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层（标题 / 主从卡片 / 底部总结）。
 */

const VIEW_W = 720;
const VIEW_H = 470;

const LEFT_X = 32;
const LEFT_W = 320;
const RIGHT_X = 368;
const RIGHT_W = 320;
const TOP = 108;

const RIGHT_CARDS: readonly { name: string; color: string; syntax: string; point: string }[] = [
  { name: "构造函数", color: "var(--accent)", syntax: "Stock(int n): shares(n) {}", point: "对象诞生时初始化成员，可用初始化列表" },
  { name: "this 指针", color: "var(--success)", syntax: "return *this;", point: "指向调用对象自身的指针，支持链式调用" },
  { name: "友元 friend", color: "var(--warning)", syntax: "friend void f(Stock&);", point: "授权外部函数/类访问私有成员" },
];

export function EppClassesObjectsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C++ 类解剖图。左侧展示类定义结构：public 区放成员函数接口，private 区放数据成员，体现封装。右侧三张卡片：构造函数（对象诞生时初始化成员，可用初始化列表）、this 指针（指向调用对象自身，支持链式调用）、友元 friend（授权外部函数或类访问私有成员）。底部总结：类 = 数据 + 行为 + 访问控制。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            C++ 类解剖
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            数据 + 行为 + 访问控制，构造/this/友元是三块配套拼图
          </text>

          {/* ===== 左侧类定义大卡 ===== */}
          <rect x={LEFT_X} y={TOP} width={LEFT_W} height="300" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <rect x={LEFT_X} y={TOP} width={LEFT_W} height="28" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x={LEFT_X + 16} y={TOP + 19} fontSize="14" fontWeight="700" fill="var(--accent)">class Stock {`{ ... }`}</text>

          {/* private 区 */}
          <text x={LEFT_X + 16} y={TOP + 54} fontSize="12" fontFamily="monospace" fontWeight="700" fill="var(--danger)">private:</text>
          <text x={LEFT_X + 32} y={TOP + 76} fontSize="12" fontFamily="monospace" fill="var(--text-primary)">int shares;</text>
          <text x={LEFT_X + 32} y={TOP + 96} fontSize="12" fontFamily="monospace" fill="var(--text-primary)">double price;</text>
          <line x1={LEFT_X + 16} y1={TOP + 112} x2={LEFT_X + LEFT_W - 16} y2={TOP + 112} stroke="var(--border)" strokeWidth="1" />
          <text x={LEFT_X + 16} y={TOP + 132} fontSize="11" fill="var(--text-secondary)">数据成员藏起来，外部不可直接访问</text>

          {/* public 区 */}
          <text x={LEFT_X + 16} y={TOP + 160} fontSize="12" fontFamily="monospace" fontWeight="700" fill="var(--success)">public:</text>
          <text x={LEFT_X + 32} y={TOP + 182} fontSize="12" fontFamily="monospace" fill="var(--text-primary)">Stock(int n);</text>
          <text x={LEFT_X + 32} y={TOP + 202} fontSize="12" fontFamily="monospace" fill="var(--text-primary)">void buy(int n);</text>
          <text x={LEFT_X + 32} y={TOP + 222} fontSize="12" fontFamily="monospace" fill="var(--text-primary)">void show() const;</text>
          <line x1={LEFT_X + 16} y1={TOP + 238} x2={LEFT_X + LEFT_W - 16} y2={TOP + 238} stroke="var(--border)" strokeWidth="1" />
          <text x={LEFT_X + 16} y={TOP + 258} fontSize="11" fill="var(--text-secondary)">成员函数暴露出去，构成对象接口</text>
          <text x={LEFT_X + 16} y={TOP + 278} fontSize="11" fill="var(--text-secondary)">const 成员承诺不修改对象状态</text>

          {/* ===== 右侧三张小卡 ===== */}
          {RIGHT_CARDS.map((c, i) => {
            const y = TOP + i * 104;
            return (
              <g key={c.name}>
                <rect x={RIGHT_X} y={y} width={RIGHT_W} height="92" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
                <rect x={RIGHT_X} y={y} width={RIGHT_W} height="26" rx="8" fill={c.color} fillOpacity="0.12" stroke={c.color} strokeWidth="1.2" />
                <text x={RIGHT_X + 16} y={y + 18} fontSize="13" fontWeight="700" fill={c.color}>{c.name}</text>
                <text x={RIGHT_X + 16} y={y + 46} fontSize="11" fontFamily="monospace" fill="var(--text-primary)">{c.syntax}</text>
                <text x={RIGHT_X + 16} y={y + 68} fontSize="11" fill="var(--text-secondary)">{c.point}</text>
              </g>
            );
          })}

          {/* ===== 底部总结栏 ===== */}
          <rect x="60" y={VIEW_H - 44} width={VIEW_W - 120} height="28" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={VIEW_H - 26} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            类 = 数据 + 行为 + 访问控制：private 藏数据、public 暴接口、构造初始化、this 指自身、友元开后门
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        C++ 类用 private 藏数据成员、public 暴露成员函数接口，实现封装。构造函数在对象诞生时初始化成员，this 指针指向调用对象自身支持链式调用，友元授权外部访问私有成员。三者共同支撑类的完整生命周期。
      </figcaption>
    </figure>
  );
}
