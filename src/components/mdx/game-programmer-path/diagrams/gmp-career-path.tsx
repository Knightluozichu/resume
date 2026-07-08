/**
 * <GmpCareerPathDiagram>：游戏程序员职业路径图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function GmpCareerPathDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="游戏程序员职业路径图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            游戏程序员岗位分工与职业阶梯
          </text>
          <text x={VIEW_W / 2} y="54" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            客户端 · 引擎 · 服务端 → 初级 → 中级 → 高级 → 专家
          </text>

          <rect x="40" y="78" width="640" height="290" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />

          <text x={VIEW_W / 2} y="100" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">三大技术方向</text>

          <rect x="70" y="112" width="180" height="80" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.2" />
          <text x="160" y="134" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">客户端</text>
          <text x="160" y="150" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">玩法/图形/UI</text>
          <text x="160" y="166" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">状态机/渲染/交互</text>
          <text x="160" y="180" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">最常见</text>

          <rect x="270" y="112" width="180" height="80" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="360" y="134" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">引擎</text>
          <text x="360" y="150" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">渲染/物理/内存</text>
          <text x="360" y="166" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">管线/分配器/工具</text>
          <text x="360" y="180" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">门槛最高</text>

          <rect x="470" y="112" width="180" height="80" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="560" y="134" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">服务端</text>
          <text x="560" y="150" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">网络/数据库/并发</text>
          <text x="560" y="166" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">通信/存储/反作弊</text>
          <text x="560" y="180" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">需求稳定</text>

          <text x={VIEW_W / 2} y="218" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">职业阶梯</text>

          <rect x="80" y="230" width="130" height="44" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="0.8" />
          <text x="145" y="248" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">初级 0-3年</text>
          <text x="145" y="264" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">实现功能</text>

          <rect x="225" y="230" width="130" height="44" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="290" y="248" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">中级 3-5年</text>
          <text x="290" y="264" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">设计系统</text>

          <rect x="370" y="230" width="130" height="44" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="435" y="248" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">高级 5-8年</text>
          <text x="435" y="264" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">架构决策</text>

          <rect x="515" y="230" width="130" height="44" rx="6" fill="var(--text-tertiary)" fillOpacity="0.10" stroke="var(--text-tertiary)" strokeWidth="0.8" />
          <text x="580" y="248" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">专家 8年+</text>
          <text x="580" y="264" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">方向把控</text>

          <text x={VIEW_W / 2} y="302" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            T 型人才：一个方向深（面试敲门砖）+ 多方向广（协作基础）
          </text>
          <text x={VIEW_W / 2} y="320" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            深度决定能不能进 · 广度决定能不能往上走
          </text>
          <text x={VIEW_W / 2} y="338" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            兴趣驱动选择方向，坚持到精通
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        游戏程序员职业路径——三大方向与四级阶梯
      </figcaption>
    </figure>
  );
}
