/**
 * <GsaCiCdDiagram>：持续集成与灰度发布图解。
 * 纯静态展示，无交互。Server Component。DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function GsaCiCdDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="持续集成与灰度发布图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            CI/CD 流水线 + 金丝雀灰度发布
          </text>

          {/* CI/CD 流水线 */}
          <rect x="30" y="50" width="680" height="70" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x={VIEW_W / 2} y="72" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">CI/CD 流水线</text>

          <rect x="50" y="84" width="110" height="28" rx="4" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="105" y="102" textAnchor="middle" fontSize="9" fill="var(--success)">构建镜像</text>

          <text x="170" y="102" fontSize="12" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="185" y="84" width="110" height="28" rx="4" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="240" y="102" textAnchor="middle" fontSize="9" fill="var(--success)">自动化测试</text>

          <text x="305" y="102" fontSize="12" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="320" y="84" width="110" height="28" rx="4" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="375" y="102" textAnchor="middle" fontSize="9" fill="var(--success)">压测回归</text>

          <text x="440" y="102" fontSize="12" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="455" y="84" width="110" height="28" rx="4" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="510" y="102" textAnchor="middle" fontSize="9" fill="var(--success)">镜像入库</text>

          <text x="575" y="102" fontSize="12" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="590" y="84" width="100" height="28" rx="4" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1" />
          <text x="640" y="102" textAnchor="middle" fontSize="9" fill="var(--warning)">灰度部署</text>

          {/* 金丝雀灰度 */}
          <rect x="30" y="140" width="680" height="120" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x={VIEW_W / 2} y="162" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">金丝雀灰度（玩家维度）</text>

          <rect x="50" y="176" width="110" height="70" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1" />
          <text x="105" y="196" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">1%</text>
          <text x="105" y="214" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">小流量验证</text>
          <text x="105" y="228" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">观察 30 分钟</text>
          <text x="105" y="240" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">P99 &lt; 100ms</text>

          <text x="170" y="212" fontSize="12" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="185" y="176" width="110" height="70" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="240" y="196" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">5%</text>
          <text x="240" y="214" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">扩大流量</text>
          <text x="240" y="228" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">观察 1 小时</text>
          <text x="240" y="240" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">错误率 &lt; 0.1%</text>

          <text x="305" y="212" fontSize="12" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="320" y="176" width="110" height="70" rx="6" fill="var(--warning)" fillOpacity="0.16" stroke="var(--warning)" strokeWidth="1" />
          <text x="375" y="196" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">20%</text>
          <text x="375" y="214" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">持续扩大</text>
          <text x="375" y="228" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">观察 2 小时</text>
          <text x="375" y="240" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">业务指标正常</text>

          <text x="440" y="212" fontSize="12" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="455" y="176" width="110" height="70" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="510" y="196" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">100%</text>
          <text x="510" y="214" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">全量发布</text>
          <text x="510" y="228" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">下线旧实例</text>
          <text x="510" y="240" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">清理旧字段</text>

          {/* 回滚 */}
          <rect x="585" y="176" width="105" height="70" rx="6" fill="var(--danger)" fillOpacity="0.16" stroke="var(--danger)" strokeWidth="1.2" strokeDasharray="4 3" />
          <text x="637" y="196" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">异常回滚</text>
          <text x="637" y="214" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">秒级切回旧版</text>
          <text x="637" y="228" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">关闭 feature flag</text>
          <text x="637" y="240" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">无需重新部署</text>

          <line x1="637" y1="176" x2="375" y2="176" stroke="var(--danger)" strokeWidth="1.2" strokeDasharray="4 3" />
          <polygon points="377,172 369,176 377,180" fill="var(--danger)" />
          <text x="500" y="170" textAnchor="middle" fontSize="9" fill="var(--danger)">回滚</text>

          {/* 协议兼容铁律 */}
          <rect x="30" y="280" width="680" height="120" rx="8" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x={VIEW_W / 2} y="302" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">协议兼容铁律（不停服更新前提）</text>

          <rect x="50" y="316" width="150" height="70" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="125" y="336" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">只加字段</text>
          <text x="125" y="354" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">不删字段</text>
          <text x="125" y="370" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">删要分两步</text>

          <rect x="215" y="316" width="150" height="70" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="290" y="336" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">字段编号</text>
          <text x="290" y="354" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">只增不改</text>
          <text x="290" y="370" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">改编号=改协议</text>

          <rect x="380" y="316" width="150" height="70" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="455" y="336" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">枚举值</text>
          <text x="455" y="354" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">只加不改</text>
          <text x="455" y="370" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">未知值要能忽略</text>

          <rect x="545" y="316" width="145" height="70" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="617" y="336" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">feature flag</text>
          <text x="617" y="354" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">新逻辑按玩家开关</text>
          <text x="617" y="370" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">先部署后开启</text>

          <text x={VIEW_W / 2} y="424" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            玩家维度灰度 &gt; 服务器维度灰度：能在小流量阶段暴露玩家相关 bug
          </text>
          <text x={VIEW_W / 2} y="444" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            蓝绿=双环境秒切但资源翻倍；滚动=逐个替换资源省但回滚慢
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        CI/CD + 金丝雀灰度——小流量验证→逐步扩大→秒级回滚，协议兼容是不停服前提
      </figcaption>
    </figure>
  );
}
