/**
 * <UmmCharacterSystemDiagram>：角色系统架构图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 420;

export function UmmCharacterSystemDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="角色系统架构图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Unity MMO 角色系统架构
          </text>
          <text x={VIEW_W / 2} y="50" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            从角色创建到属性计算的组件分层
          </text>

          {/* 顶层：角色实体 */}
          <rect x="270" y="72" width="200" height="48" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="370" y="93" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">CharacterEntity</text>
          <text x="370" y="109" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">角色根节点（网络对象）</text>

          {/* 连接线到三个子系统 */}
          <line x1="370" y1="120" x2="150" y2="150" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <line x1="370" y1="120" x2="370" y2="150" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <line x1="370" y1="120" x2="590" y2="150" stroke="var(--text-tertiary)" strokeWidth="1.5" />

          {/* 左：外观系统 */}
          <rect x="40" y="150" width="220" height="180" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="150" y="174" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">外观系统</text>

          <rect x="55" y="186" width="190" height="32" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="150" y="206" textAnchor="middle" fontSize="11" fill="var(--success)">角色创建（捏脸/选职业）</text>

          <rect x="55" y="226" width="190" height="32" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="150" y="246" textAnchor="middle" fontSize="11" fill="var(--success)">Prefab + 换装系统</text>

          <rect x="55" y="266" width="190" height="32" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="150" y="286" textAnchor="middle" fontSize="11" fill="var(--success)">骨骼绑定 / Animator</text>

          <rect x="55" y="306" width="190" height="20" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="150" y="320" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">SkinnedMeshRenderer</text>

          {/* 中：属性系统 */}
          <rect x="260" y="150" width="220" height="180" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="370" y="174" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">属性系统</text>

          <rect x="275" y="186" width="190" height="32" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="370" y="206" textAnchor="middle" fontSize="11" fill="var(--warning)">基础属性（HP/MP/ATK）</text>

          <rect x="275" y="226" width="190" height="32" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="370" y="246" textAnchor="middle" fontSize="11" fill="var(--warning)">装备加成 / Buff 修饰</text>

          <rect x="275" y="266" width="190" height="32" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="370" y="286" textAnchor="middle" fontSize="11" fill="var(--warning)">属性计算管线</text>

          <rect x="275" y="306" width="190" height="20" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="370" y="320" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">final = base + equip + buff</text>

          {/* 右：装备系统 */}
          <rect x="480" y="150" width="220" height="180" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="590" y="174" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">装备系统</text>

          <rect x="495" y="186" width="190" height="32" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="590" y="206" textAnchor="middle" fontSize="11" fill="var(--accent)">装备槽位（头/身/武/饰）</text>

          <rect x="495" y="226" width="190" height="32" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="590" y="246" textAnchor="middle" fontSize="11" fill="var(--accent)">穿戴/卸下/替换</text>

          <rect x="495" y="266" width="190" height="32" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="590" y="286" textAnchor="middle" fontSize="11" fill="var(--accent)">套装效果 / 宝石镶嵌</text>

          <rect x="495" y="306" width="190" height="20" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="590" y="320" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">触发属性重算</text>

          {/* 底部：数据流 */}
          <text x="150" y="358" textAnchor="middle" fontSize="10" fill="var(--success)">外观变化</text>
          <line x1="150" y1="330" x2="150" y2="345" stroke="var(--success)" strokeWidth="1" strokeDasharray="3 2" />

          <text x="370" y="358" textAnchor="middle" fontSize="10" fill="var(--warning)">属性同步</text>
          <line x1="370" y1="330" x2="370" y2="345" stroke="var(--warning)" strokeWidth="1" strokeDasharray="3 2" />

          <text x="590" y="358" textAnchor="middle" fontSize="10" fill="var(--accent)">装备校验</text>
          <line x1="590" y1="330" x2="590" y2="345" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 2" />

          <rect x="100" y="370" width="540" height="36" rx="8" fill="var(--text-tertiary)" fillOpacity="0.08" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x={VIEW_W / 2} y="393" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            服务器权威：所有属性变更经服务器验证后广播，客户端只做表现层渲染
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        角色系统架构——外观、属性、装备三大子系统的分层与协作
      </figcaption>
    </figure>
  );
}
