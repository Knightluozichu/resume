/**
 * <EcpInheritanceDiagram>：C++ 继承与多态示意图（easy-cpp-5e 继承与多态章）。
 *
 * 上方展示类继承层次：Animal 基类 → Dog / Cat 派生类。
 * 下方对比静态绑定（无 virtual）与动态绑定（有 virtual）：
 *   基类指针指向派生类对象时调用哪个版本。
 * 底部总结虚函数、override、虚析构的要点。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×460、四周留白 ≥32、字号 ≥11、间距用 4 的倍数。
 */

const VIEW_W = 720;
const VIEW_H = 460;

export function EcpInheritanceDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C++ 继承与多态示意图。上方展示类继承层次：Animal 基类（含 virtual speak）派生出 Dog 和 Cat 两个子类（各自覆盖 speak）。下方对比静态绑定（无 virtual，基类指针调用 Animal 版本）与动态绑定（有 virtual，基类指针调用派生类版本）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            C++ 继承与多态
          </text>
          <text x={VIEW_W / 2} y="58" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            上：类继承层次 · 下：静态绑定 vs 动态绑定
          </text>

          {/* ===== 继承层次 ===== */}
          {/* 基类 Animal */}
          <rect x="270" y="76" width="180" height="60" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="360" y="98" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">class Animal</text>
          <text x="360" y="116" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">virtual void speak()</text>
          <text x="360" y="130" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">基类 · 虚函数</text>

          {/* 继承箭头 */}
          <line x1="310" y1="136" x2="220" y2="168" stroke="var(--success)" strokeWidth="1.4" strokeOpacity="0.6" />
          <polygon points="224,164 218,170 226,172" fill="var(--success)" fillOpacity="0.6" />
          <line x1="410" y1="136" x2="500" y2="168" stroke="var(--warning)" strokeWidth="1.4" strokeOpacity="0.6" />
          <polygon points="496,164 502,170 494,172" fill="var(--warning)" fillOpacity="0.6" />

          {/* 派生类 Dog */}
          <rect x="120" y="168" width="180" height="60" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="210" y="190" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">class Dog</text>
          <text x="210" y="208" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">void speak() override</text>
          <text x="210" y="222" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">输出「汪汪汪」</text>

          {/* 派生类 Cat */}
          <rect x="420" y="168" width="180" height="60" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="510" y="190" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">class Cat</text>
          <text x="510" y="208" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">void speak() override</text>
          <text x="510" y="222" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">输出「喵喵喵」</text>

          {/* ===== 下方：绑定对比 ===== */}
          <text x={VIEW_W / 2} y="256" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-secondary)">
            Animal* p = new Dog();  p-&gt;speak();
          </text>

          {/* 静态绑定 */}
          <rect x="40" y="272" width="310" height="84" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="56" y="292" fontSize="12" fontWeight="700" fill="var(--danger)">无 virtual（静态绑定）</text>
          <text x="56" y="312" fontSize="11" fill="var(--text-primary)">按指针类型 Animal* 决定</text>
          <text x="56" y="330" fontSize="11" fontFamily="monospace" fill="var(--danger)">→ 调用 Animal::speak()</text>
          <text x="56" y="348" fontSize="10" fill="var(--text-secondary)">无法发挥多态</text>

          {/* 动态绑定 */}
          <rect x="370" y="272" width="310" height="84" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="386" y="292" fontSize="12" fontWeight="700" fill="var(--success)">有 virtual（动态绑定）</text>
          <text x="386" y="312" fontSize="11" fill="var(--text-primary)">按对象实际类型 Dog 决定</text>
          <text x="386" y="330" fontSize="11" fontFamily="monospace" fill="var(--success)">→ 调用 Dog::speak() ✓</text>
          <text x="386" y="348" fontSize="10" fill="var(--text-secondary)">通过 vtable 实现多态</text>

          {/* ===== 底部总结栏 ===== */}
          <rect x="40" y="380" width={VIEW_W - 80} height="56" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={VIEW_W / 2} y="400" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">
            virtual 声明虚函数 · override 确保覆盖 · 基类析构必须 virtual
          </text>
          <text x={VIEW_W / 2} y="418" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            多态价值：基类指针统一管理不同派生类，新增子类不改调用代码
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        继承表达 is-a 关系，虚函数实现多态。无 virtual 时静态绑定按指针类型调用，有 virtual 时动态绑定按对象实际类型调用。基类析构函数声明 virtual 确保正确释放。
      </figcaption>
    </figure>
  );
}
