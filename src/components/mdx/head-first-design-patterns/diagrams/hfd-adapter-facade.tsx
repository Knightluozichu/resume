/**
 * <HfdAdapterFacadeDiagram>：适配器与外观模式对比（Head First 设计模式 · 适配器与外观章）。
 *
 * 左半：适配器模式——Target ← Adapter → Adaptee（把火鸡适配成鸭子）。
 * 右半：外观模式——Facade 简化子系统复杂调用（家庭影院一键看电影）。
 *
 * 纯静态展示，无交互。Server Component。
 * viewBox 720×420、四周留白 ≥32、字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

export function HfdAdapterFacadeDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="适配器与外观模式对比。左半：适配器模式。Client 面向 Duck 接口编程，TurkeyAdapter 实现 Duck 接口，内部持有 Turkey 引用，把 quack 调用适配为 turkey.gobble。右半：外观模式。HomeTheaterFacade 暴露 watchMovie 简化方法，内部协调 Amplifier、Projector、Screen、Light、Player 五个子系统。外观不封装子系统，只是提供简化入口。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* ===== 标题 ===== */}
          <text x={VIEW_W / 2} y="36" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            适配器模式 vs 外观模式
          </text>
          <text x={VIEW_W / 2} y="56" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            适配器转换接口让不兼容的类协作；外观提供简化入口屏蔽子系统复杂度
          </text>

          {/* ===== 左半：适配器模式 ===== */}
          <rect x="36" y="74" width="310" height="28" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="191" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">适配器模式</text>

          {/* Client */}
          <rect x="56" y="114" width="120" height="44" rx="6" fill="var(--bg)" stroke="var(--text-secondary)" strokeWidth="1" />
          <text x="116" y="132" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">Client</text>
          <text x="116" y="148" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">面向 Duck 编程</text>

          {/* Duck 接口 */}
          <rect x="56" y="172" width="120" height="50" rx="6" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.2" strokeDasharray="4 3" />
          <text x="116" y="190" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">«interface» Duck</text>
          <text x="116" y="210" textAnchor="middle" fontSize="11" fill="var(--text-primary)">quack() / fly()</text>

          {/* Client → Duck */}
          <line x1="116" y1="158" x2="116" y2="172" stroke="var(--text-secondary)" strokeWidth="1.2" />
          <polygon points="116,172 113,166 119,166" fill="var(--text-secondary)" />

          {/* TurkeyAdapter */}
          <rect x="200" y="172" width="126" height="60" rx="6" fill="var(--bg)" stroke="var(--success)" strokeWidth="1.2" />
          <text x="263" y="190" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">TurkeyAdapter</text>
          <text x="210" y="208" fontSize="11" fill="var(--text-primary)">quack() {`{`}</text>
          <text x="214" y="220" fontSize="11" fill="var(--text-secondary)">turkey.gobble()</text>

          {/* Adapter 实现 Duck */}
          <line x1="200" y1="197" x2="176" y2="197" stroke="var(--success)" strokeWidth="1.2" />
          <polygon points="176,197 182,194 182,200" fill="var(--success)" />

          {/* Turkey (Adaptee) */}
          <rect x="200" y="250" width="126" height="50" rx="6" fill="var(--bg)" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="263" y="268" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">Turkey（Adaptee）</text>
          <text x="263" y="288" textAnchor="middle" fontSize="11" fill="var(--text-primary)">gobble() / fly()</text>

          {/* Adapter 持有 Turkey */}
          <line x1="263" y1="232" x2="263" y2="250" stroke="var(--success)" strokeWidth="1.2" />
          <polygon points="263,250 260,244 266,244" fill="var(--success)" />
          <text x="285" y="244" fontSize="11" fill="var(--text-secondary)">持有</text>

          {/* ===== 右半：外观模式 ===== */}
          <rect x="374" y="74" width="310" height="28" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="529" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">外观模式</text>

          {/* Facade */}
          <rect x="394" y="114" width="270" height="56" rx="8" fill="var(--bg)" stroke="var(--success)" strokeWidth="1.4" />
          <rect x="394" y="114" width="270" height="24" rx="8" fill="var(--success)" fillOpacity="0.12" />
          <text x="529" y="131" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">HomeTheaterFacade</text>
          <text x="529" y="156" textAnchor="middle" fontSize="11" fill="var(--text-primary)">watchMovie() / endMovie()</text>

          {/* 子系统 */}
          <rect x="394" y="184" width="84" height="28" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="436" y="202" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Amplifier</text>

          <rect x="490" y="184" width="84" height="28" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="532" y="202" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Projector</text>

          <rect x="586" y="184" width="84" height="28" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="628" y="202" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Screen</text>

          <rect x="394" y="220" width="84" height="28" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="436" y="238" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Light</text>

          <rect x="490" y="220" width="84" height="28" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="532" y="238" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Player</text>

          <rect x="586" y="220" width="84" height="28" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="628" y="238" textAnchor="middle" fontSize="11" fill="var(--text-primary)">Popper</text>

          {/* Facade → 子系统 调用箭头 */}
          <line x1="436" y1="170" x2="436" y2="184" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.6" />
          <line x1="532" y1="170" x2="532" y2="184" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.6" />
          <line x1="628" y1="170" x2="628" y2="184" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.6" />
          <line x1="436" y1="170" x2="436" y2="220" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.6" />
          <line x1="532" y1="170" x2="532" y2="220" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.6" />

          {/* 子系统说明 */}
          <text x="529" y="268" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">watchMovie() 内部依次协调：</text>
          <text x="529" y="284" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">popper.on → light.dim → screen.down</text>
          <text x="529" y="298" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">→ projector.on → amp.on → play</text>

          {/* ===== 底部对比总结 ===== */}
          <rect x="36" y="320" width="324" height="74" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="198" y="340" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">适配器：转换接口</text>
          <text x="46" y="358" fontSize="11" fill="var(--text-primary)">让已有类（Adaptee）适配目标接口，</text>
          <text x="46" y="374" fontSize="11" fill="var(--text-primary)">一个适配器转一个接口。改变接口</text>
          <text x="46" y="388" fontSize="11" fill="var(--text-primary)">让不兼容的类协作。</text>

          <rect x="370" y="320" width="314" height="74" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="527" y="340" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">外观：简化入口</text>
          <text x="380" y="358" fontSize="11" fill="var(--text-primary)">提供统一简化接口屏蔽子系统复杂度，</text>
          <text x="380" y="374" fontSize="11" fill="var(--text-primary)">不封装子系统，仍可直接访问子系统。</text>
          <text x="380" y="388" fontSize="11" fill="var(--text-primary)">降低耦合不改变接口。</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        适配器把一个接口转换成另一个接口，让不兼容的类协作；外观提供一个更简化的接口屏蔽子系统的复杂调用。适配器是接口转换器，外观是复杂度屏蔽层，两者都让客户端更简单但机制不同。
      </figcaption>
    </figure>
  );
}
