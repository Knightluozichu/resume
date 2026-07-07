/**
 * <CtrDesignTestDiagram>：面试高频设计模式三件套（单例/工厂/观察者）。
 *
 * 三列面板各展示一个模式的结构与关键机制：
 *   - 单例（accent 紫）：Meyers static / call_once，单一实例
 *   - 工厂方法（success 绿）：Creator 抽象 → ConcreteCreator → Product
 *   - 观察者（warning 暖）：Subject 持 weak_ptr<Observer> 列表，notify 用 lock 提升防悬空
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×500，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 500;

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

const PANEL_W = 208;
const PANEL_GAP = 16;
const PANEL_MARGIN = 36;
const panelX = (i: number) => PANEL_MARGIN + i * (PANEL_W + PANEL_GAP);

export function CtrDesignTestDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="面试高频设计模式三件套。三列面板：第 1 列单例（紫色，Meyers static 与 call_once，单一实例全局访问）；第 2 列工厂方法（绿色，Creator 抽象派生 ConcreteCreator 创建 ConcreteProduct，解耦创建与使用）；第 3 列观察者（暖色，Subject 持 weak_ptr 观察者列表，notify 用 lock 提升防悬空）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            面试高频设计模式三件套
          </text>
          <text x={VIEW_W / 2} y={56} textAnchor="middle" fontSize="11" fill={secondary}>
            单例 · 工厂方法 · 观察者——创建与行为解耦
          </text>

          {/* 面板 1：单例 */}
          <g>
            <rect x={panelX(0)} y={84} width={PANEL_W} height={330} rx="10" fill={elevated} stroke="var(--accent)" strokeWidth="1.6" strokeOpacity="0.5" />
            <rect x={panelX(0)} y={84} width={PANEL_W} height={34} rx="10" fill="var(--accent)" fillOpacity="0.14" />
            <rect x={panelX(0)} y={108} width={PANEL_W} height={10} fill="var(--accent)" fillOpacity="0.14" />
            <text x={panelX(0) + PANEL_W / 2} y={106} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">单例 Singleton</text>

            {/* 唯一实例框 */}
            <rect x={panelX(0) + 24} y={136} width={PANEL_W - 48} height={56} rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.4" />
            <text x={panelX(0) + PANEL_W / 2} y={160} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary} fontFamily="monospace">唯一实例</text>
            <text x={panelX(0) + PANEL_W / 2} y={180} textAnchor="middle" fontSize="11" fill={secondary}>instance() 全局访问</text>

            <text x={panelX(0) + 18} y={216} textAnchor="start" fontSize="12" fontWeight="700" fill={primary}>C++ 实现</text>
            {["Meyers: 函数内 static", "call_once 显式控制", "DCLP 旧有 bug"].map((t, i) => (
              <text key={t} x={panelX(0) + 18} y={238 + i * 24} textAnchor="start" fontSize="11" fill={secondary}>{t}</text>
            ))}
            <text x={panelX(0) + PANEL_W / 2} y={336} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">C++11 起线程安全</text>
            <text x={panelX(0) + PANEL_W / 2} y={356} textAnchor="middle" fontSize="11" fill={secondary}>优先依赖注入</text>
          </g>

          {/* 面板 2：工厂方法 */}
          <g>
            <rect x={panelX(1)} y={84} width={PANEL_W} height={330} rx="10" fill={elevated} stroke="var(--success)" strokeWidth="1.6" strokeOpacity="0.5" />
            <rect x={panelX(1)} y={84} width={PANEL_W} height={34} rx="10" fill="var(--success)" fillOpacity="0.14" />
            <rect x={panelX(1)} y={108} width={PANEL_W} height={10} fill="var(--success)" fillOpacity="0.14" />
            <text x={panelX(1) + PANEL_W / 2} y={106} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">工厂方法 Factory</text>

            {/* Creator 抽象 */}
            <rect x={panelX(1) + 34} y={136} width={PANEL_W - 68} height={44} rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.4" />
            <text x={panelX(1) + PANEL_W / 2} y={163} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary} fontFamily="monospace">Creator</text>

            {/* 继承箭头 */}
            <line x1={panelX(1) + PANEL_W / 2} y1={180} x2={panelX(1) + PANEL_W / 2} y2={196} stroke={secondary} strokeWidth="1.6" markerEnd="url(#ctr-dsgn-arr)" />

            {/* ConcreteCreator */}
            <rect x={panelX(1) + 34} y={196} width={PANEL_W - 68} height={44} rx="8" fill={elevated} stroke="var(--success)" strokeWidth="1.4" />
            <text x={panelX(1) + PANEL_W / 2} y={223} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary} fontFamily="monospace">ConcreteCreator</text>

            <text x={panelX(1) + 18} y={262} textAnchor="start" fontSize="12" fontWeight="700" fill={primary}>要点</text>
            {["create() 返回 Product", "子类决定具体类型", "开闭原则易扩展"].map((t, i) => (
              <text key={t} x={panelX(1) + 18} y={284 + i * 24} textAnchor="start" fontSize="11" fill={secondary}>{t}</text>
            ))}
            <text x={panelX(1) + PANEL_W / 2} y={376} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">升级为抽象工厂</text>
            <text x={panelX(1) + PANEL_W / 2} y={396} textAnchor="middle" fontSize="11" fill={secondary}>当需产品族配套</text>
          </g>

          {/* 面板 3：观察者 */}
          <g>
            <rect x={panelX(2)} y={84} width={PANEL_W} height={330} rx="10" fill={elevated} stroke="var(--warning)" strokeWidth="1.6" strokeOpacity="0.5" />
            <rect x={panelX(2)} y={84} width={PANEL_W} height={34} rx="10" fill="var(--warning)" fillOpacity="0.14" />
            <rect x={panelX(2)} y={108} width={PANEL_W} height={10} fill="var(--warning)" fillOpacity="0.14" />
            <text x={panelX(2) + PANEL_W / 2} y={106} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">观察者 Observer</text>

            {/* Subject */}
            <rect x={panelX(2) + 34} y={136} width={PANEL_W - 68} height={44} rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.4" />
            <text x={panelX(2) + PANEL_W / 2} y={163} textAnchor="middle" fontSize="12" fontWeight="700" fill={primary} fontFamily="monospace">Subject</text>

            {/* weak_ptr 列表 */}
            <rect x={panelX(2) + 20} y={194} width={PANEL_W - 40} height={40} rx="8" fill={elevated} stroke="var(--warning)" strokeWidth="1.3" strokeDasharray="4 3" />
            <text x={panelX(2) + PANEL_W / 2} y={219} textAnchor="middle" fontSize="11" fill={secondary} fontFamily="monospace">vector&lt;weak_ptr&gt;</text>

            <text x={panelX(2) + 18} y={254} textAnchor="start" fontSize="12" fontWeight="700" fill={primary}>notify 机制</text>
            {["lock() 提升检测存活", "失效项惰性清理", "不延长观察者寿命"].map((t, i) => (
              <text key={t} x={panelX(2) + 18} y={276 + i * 24} textAnchor="start" fontSize="11" fill={secondary}>{t}</text>
            ))}
            <text x={panelX(2) + PANEL_W / 2} y={376} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">weak_ptr 防悬空</text>
            <text x={panelX(2) + PANEL_W / 2} y={396} textAnchor="middle" fontSize="11" fill={secondary}>打破循环引用</text>
          </g>

          <defs>
            <marker id="ctr-dsgn-arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill={secondary} />
            </marker>
          </defs>

          {/* 底部总结 */}
          <line x1={32} y1={438} x2={VIEW_W - 32} y2={438} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={462} textAnchor="middle" fontSize="12" fill={secondary}>
            单例保证唯一 · 工厂解耦创建 · 观察者松耦合广播
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        单例（Meyers/call_once 线程安全）、工厂方法（子类决定产品类型）、观察者（weak_ptr 列表防悬空打破循环）。
      </figcaption>
    </figure>
  );
}
