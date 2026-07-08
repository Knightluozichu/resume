/**
 * <GmpCppFoundationDiagram>：C++ 基础与内存管理图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GmpCppFoundationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="C++ 基础与内存管理图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            C++ 内存模型与 RAII
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            栈（快小自动） vs 堆（大慢手动） · 智能指针桥接两者
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <rect x="70" y="100" width="280" height="90" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="210" y="124" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">栈内存 Stack</text>
          <text x="210" y="142" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">分配：移动指针（纳秒级）</text>
          <text x="210" y="158" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">大小：1-8MB（有限）</text>
          <text x="210" y="174" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">局部变量/函数参数</text>

          <rect x="370" y="100" width="280" height="90" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="510" y="124" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">堆内存 Heap</text>
          <text x="510" y="142" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">分配：搜索空闲块（百纳秒）</text>
          <text x="510" y="158" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">大小：GB 级（大）</text>
          <text x="510" y="174" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">new/malloc 动态分配</text>

          <text x={VIEW_W / 2} y="216" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            智能指针（RAII 实践）
          </text>

          <rect x="70" y="228" width="180" height="60" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="160" y="250" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">unique_ptr</text>
          <text x="160" y="266" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">独占所有权</text>
          <text x="160" y="280" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">零开销 · 默认选择</text>

          <rect x="265" y="228" width="180" height="60" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" />
          <text x="355" y="250" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">shared_ptr</text>
          <text x="355" y="266" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">共享所有权</text>
          <text x="355" y="280" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">引用计数 · 需共享时用</text>

          <rect x="460" y="228" width="180" height="60" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="550" y="250" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">weak_ptr</text>
          <text x="550" y="266" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">弱引用</text>
          <text x="550" y="280" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">打破循环引用</text>

          <text x={VIEW_W / 2} y="314" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            RAII：构造获取资源 → 析构释放资源 → 离开作用域自动回收
          </text>
          <text x={VIEW_W / 2} y="332" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            游戏每帧大量分配 → 对象池/栈/线性分配器 优先于 new/delete
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        C++ 内存模型——栈与堆的取舍及 RAII 智能指针管理
      </figcaption>
    </figure>
  );
}
