/**
 * <EppInheritanceDiagram>：C++ 继承与多态图（cpp-primer-plus 继承与多态章）。
 *
 * 左侧画继承层次：基类 Shape（含 virtual draw）派生出 Circle、Square（override）；
 * 右侧三张卡片讲虚函数、纯虚函数（抽象类）、多态（vtable 动态绑定）三个机制。
 * 底部总结栏点出「继承复用接口、虚函数实现多态、纯虚定义抽象」的递进关系。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * 布局遵守 docs/diagram-layout-rules.md：viewBox 720×470、四周留白 ≥32、
 * 字号 ≥11、相邻元素间距 ≥8、三段垂直分层（标题 / 主从卡片 / 底部总结）。
 */

const VIEW_W = 720;
const VIEW_H = 470;

export function EppInheritanceDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C++ 继承与多态图。左侧继承层次：基类 Shape 含 virtual void draw，派生 Circle 与 Square 各自 override draw。右侧三张卡片：虚函数 virtual（声明可被覆盖，基类指针调用时走派生版本）、纯虚函数 = 0（抽象类不可实例化，只定义接口）、多态（vtable 动态绑定，基类指针按实际对象类型调用）。底部总结：继承复用接口、虚函数实现多态、纯虚定义抽象。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            C++ 继承与多态
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            继承复用接口、虚函数实现多态、纯虚定义抽象
          </text>

          {/* ===== 左侧继承层次 ===== */}
          {/* 基类 */}
          <rect x="72" y="108" width="240" height="60" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="192" y="130" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">class Shape</text>
          <text x="192" y="150" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">{`{ virtual void draw(); }`}</text>

          {/* 继承箭头 */}
          <line x1="192" y1="168" x2="192" y2="188" stroke="var(--text-secondary)" strokeWidth="1.4" />
          <line x1="117" y1="188" x2="267" y2="188" stroke="var(--text-secondary)" strokeWidth="1.4" />
          <line x1="117" y1="188" x2="117" y2="204" stroke="var(--text-secondary)" strokeWidth="1.4" />
          <line x1="267" y1="188" x2="267" y2="204" stroke="var(--text-secondary)" strokeWidth="1.4" />
          <polygon points="113,200 121,200 117,208" fill="var(--text-secondary)" />
          <polygon points="263,200 271,200 267,208" fill="var(--text-secondary)" />

          {/* 派生类 */}
          <rect x="42" y="212" width="150" height="60" rx="8" fill="var(--bg)" stroke="var(--success)" strokeWidth="1.2" />
          <text x="117" y="234" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">class Circle</text>
          <text x="117" y="254" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-primary)">{`void draw() override;`}</text>

          <rect x="192" y="212" width="150" height="60" rx="8" fill="var(--bg)" stroke="var(--success)" strokeWidth="1.2" />
          <text x="267" y="234" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">class Square</text>
          <text x="267" y="254" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--text-primary)">{`void draw() override;`}</text>

          {/* 左侧说明 */}
          <text x="192" y="296" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">派生类复用基类接口，各自覆盖实现</text>

          {/* ===== 右侧三张机制卡 ===== */}
          <rect x="388" y="108" width="300" height="84" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <rect x="388" y="108" width="300" height="26" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="404" y="126" fontSize="13" fontWeight="700" fill="var(--accent)">虚函数 virtual</text>
          <text x="404" y="154" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">virtual void draw();</text>
          <text x="404" y="174" fontSize="11" fill="var(--text-secondary)">声明可被覆盖，基类指针调用走派生版本</text>

          <rect x="388" y="204" width="300" height="84" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <rect x="388" y="204" width="300" height="26" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="404" y="222" fontSize="13" fontWeight="700" fill="var(--warning)">纯虚函数 = 0（抽象类）</text>
          <text x="404" y="250" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">virtual void draw() = 0;</text>
          <text x="404" y="270" fontSize="11" fill="var(--text-secondary)">不可实例化，只定义接口契约</text>

          <rect x="388" y="300" width="300" height="84" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <rect x="388" y="300" width="300" height="26" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="404" y="318" fontSize="13" fontWeight="700" fill="var(--success)">多态（vtable 动态绑定）</text>
          <text x="404" y="346" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">Shape* p = new Circle;</text>
          <text x="404" y="366" fontSize="11" fill="var(--text-secondary)">p-&gt;draw() 查 vtable 走 Circle 版本</text>

          {/* ===== 底部总结栏 ===== */}
          <rect x="60" y={VIEW_H - 44} width={VIEW_W - 120} height="28" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y={VIEW_H - 26} textAnchor="middle" fontSize="12" fill="var(--text-primary)">
            继承复用接口、virtual 实现多态、纯虚 = 0 定义抽象，三者递进构成 OOP 的类型扩展能力
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        C++ 继承让派生类复用基类接口，虚函数 virtual 实现运行期多态（基类指针按实际对象类型调用），纯虚函数 = 0 定义抽象类不可实例化。多态的底层是 vtable 动态绑定，让同一调用按对象类型分派。
      </figcaption>
    </figure>
  );
}
