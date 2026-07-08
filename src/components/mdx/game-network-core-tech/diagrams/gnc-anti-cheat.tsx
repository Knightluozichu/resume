/**
 * <GncAntiCheatDiagram>：反作弊系统设计——四层纵深防御架构图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function GncAntiCheatDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="反作弊系统四层纵深防御图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            反作弊系统：四层纵深防御
          </text>

          {/* 第一层：服务器权威 */}
          <rect x="20" y="48" width="700" height="74" rx="10" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.5" />
          <text x="40" y="70" fontSize="13" fontWeight="700" fill="var(--danger)">第一层：服务器权威</text>
          <text x="40" y="88" fontSize="10" fill="var(--text-secondary)">所有关键逻辑（位置/伤害/经济）由服务器计算</text>
          <text x="40" y="104" fontSize="10" fill="var(--text-secondary)">客户端输入只是「请求」而非「指令」→ 防状态伪造（瞬移/穿墙）</text>
          <rect x="560" y="60" width="140" height="22" rx="5" fill="var(--danger)" fillOpacity="0.15" stroke="var(--danger)" strokeWidth="1" />
          <text x="630" y="75" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--danger)">基石：最核心防线</text>
          <text x="630" y="106" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">不信任客户端发来的状态</text>

          {/* 第二层：输入校验 */}
          <rect x="20" y="132" width="700" height="74" rx="10" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="40" y="154" fontSize="13" fontWeight="700" fill="var(--warning)">第二层：输入合理性校验</text>
          <text x="40" y="172" fontSize="10" fill="var(--text-secondary)">速度校验（移动不超限） | 射线校验（命中一致） | 范围校验 | 频率校验</text>
          <text x="40" y="188" fontSize="10" fill="var(--text-secondary)">不是防住所有作弊，而是让每次作弊都可能触发标记 → 累积到阈值封号</text>
          <rect x="560" y="144" width="140" height="22" rx="5" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1" />
          <text x="630" y="159" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--warning)">提高作弊成本</text>
          <text x="630" y="190" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">防超速/谎报命中/超频</text>

          {/* 第三层：行为检测 */}
          <rect x="20" y="216" width="700" height="74" rx="10" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="40" y="238" fontSize="13" fontWeight="700" fill="var(--accent)">第三层：行为检测</text>
          <text x="40" y="256" fontSize="10" fill="var(--text-secondary)">命中率异常高 | 反应时间异常短 | 准星轨迹过于规则 → 统计分析找 Aimbot</text>
          <text x="40" y="272" fontSize="10" fill="var(--text-secondary)">累积可疑分数 + 结合举报/多账号关联 → 不直接封号，交叉验证降低误判</text>
          <rect x="560" y="228" width="140" height="22" rx="5" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1" />
          <text x="630" y="243" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--accent)">概率信号</text>
          <text x="630" y="274" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">机器学习日益重要</text>

          {/* 第四层：客户端反篡改 */}
          <rect x="20" y="300" width="700" height="74" rx="10" fill="var(--text-tertiary)" fillOpacity="0.08" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <text x="40" y="322" fontSize="13" fontWeight="700" fill="var(--text-tertiary)">第四层：客户端反篡改（辅助）</text>
          <text x="40" y="340" fontSize="10" fill="var(--text-secondary)">代码完整性校验 | 内存反扫描 | 调试器检测 → 提高逆向门槛</text>
          <text x="40" y="356" fontSize="10" fill="var(--text-secondary)">客户端在玩家手里，理论上可被绕过 → 只能作为辅助手段，核心防线在服务器端</text>
          <rect x="560" y="312" width="140" height="22" rx="5" fill="var(--text-tertiary)" fillOpacity="0.15" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="630" y="327" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--text-tertiary)">最弱防线</text>
          <text x="630" y="358" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">只上报信号不直接封号</text>

          {/* 总结 */}
          <rect x="20" y="386" width="700" height="40" rx="8" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="370" y="404" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">
            没有银弹：每种作弊都有对应检测层，多信号交叉验证降低误判
          </text>
          <text x="370" y="420" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            作弊者要同时绕过所有层才成功 → 成本急剧上升
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        反作弊系统设计——服务器权威、输入校验、行为检测、客户端反篡改四层纵深防御
      </figcaption>
    </figure>
  );
}
