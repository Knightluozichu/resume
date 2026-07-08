/**
 * <UmmCombatSystemDiagram>：战斗系统架构图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function UmmCombatSystemDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="战斗系统架构图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Unity MMO 战斗系统流程
          </text>
          <text x={VIEW_W / 2} y="50" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            从技能释放到伤害结算的完整管线
          </text>

          {/* 技能释放 */}
          <rect x="250" y="70" width="240" height="44" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="370" y="90" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">客户端：技能释放请求</text>
          <text x="370" y="106" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">CastSkillReq(skillId, targetId)</text>

          <text x="370" y="132" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 服务器校验 */}
          <rect x="100" y="144" width="540" height="100" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="370" y="166" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">服务器：技能校验与执行</text>

          <rect x="120" y="178" width="150" height="28" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="195" y="196" textAnchor="middle" fontSize="10" fill="var(--warning)">CD / 蓝量检查</text>

          <rect x="285" y="178" width="150" height="28" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="360" y="196" textAnchor="middle" fontSize="10" fill="var(--warning)">射程 / 视野检查</text>

          <rect x="450" y="178" width="170" height="28" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="535" y="196" textAnchor="middle" fontSize="10" fill="var(--warning)">状态/沉默/眩晕检查</text>

          <rect x="120" y="214" width="500" height="24" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="370" y="230" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">通过校验 → 执行技能逻辑：生成弹道/范围/Buff</text>

          <text x="370" y="262" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          {/* 范围检测 */}
          <rect x="50" y="274" width="210" height="80" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="155" y="296" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">范围检测</text>
          <text x="155" y="314" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">球形：Physics.OverlapSphere</text>
          <text x="155" y="330" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">扇形：角度 + 距离判定</text>
          <text x="155" y="346" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">矩形：Bounds.Intersects</text>

          {/* 伤害计算 */}
          <rect x="265" y="274" width="210" height="80" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="370" y="296" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">伤害计算</text>
          <text x="370" y="314" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">dmg = atk * skillRatio</text>
          <text x="370" y="330" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">- def * defFactor</text>
          <text x="370" y="346" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">* critMult * resistMult</text>

          {/* 广播结果 */}
          <rect x="480" y="274" width="210" height="80" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="585" y="296" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">广播结果</text>
          <text x="585" y="314" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">DamageNotify(target, dmg)</text>
          <text x="585" y="330" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">BuffSync(target, buffList)</text>
          <text x="585" y="346" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">客户端播放受击特效</text>

          {/* 底部总结 */}
          <rect x="50" y="372" width="640" height="48" rx="8" fill="var(--text-tertiary)" fillOpacity="0.08" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x={VIEW_W / 2} y="392" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：服务器是唯一伤害仲裁者——客户端发请求、收结果、播表现，绝不在本地算伤害
          </text>
          <text x={VIEW_W / 2} y="410" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            范围检测在服务器侧用空间分区加速，避免对全服实体做 O(n) 遍历
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        战斗系统流程——技能校验、范围检测、伤害计算、结果广播的完整管线
      </figcaption>
    </figure>
  );
}
