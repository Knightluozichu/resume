/**
 * <UcnRealtimeSyncDiagram>：实时同步与插值预测——状态同步流程图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function UcnRealtimeSyncDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="实时同步与插值预测——状态同步与预测校正图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            实时同步：客户端预测 + 服务器校正 + 插值平滑
          </text>

          {/* 上半：预测与校正流程 */}
          <rect x="30" y="50" width="680" height="200" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="74" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">预测-校正循环（本地玩家）</text>

          {/* 客户端预测 */}
          <rect x="50" y="90" width="140" height="55" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="120" y="110" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">客户端预测</text>
          <text x="120" y="125" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">按键即移动</text>
          <text x="120" y="138" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">不等服务器</text>

          <text x="205" y="120" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          {/* 发送请求 */}
          <rect x="225" y="90" width="140" height="55" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="295" y="110" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">发送移动请求</text>
          <text x="295" y="125" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">MoveReq(pos, dir)</text>
          <text x="295" y="138" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">带序列号 seq</text>

          <text x="380" y="120" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          {/* 服务器校正 */}
          <rect x="400" y="90" width="140" height="55" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="470" y="110" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">服务器校正</text>
          <text x="470" y="125" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">校验合法性</text>
          <text x="470" y="138" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">广播权威位置</text>

          <text x="555" y="120" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          {/* 客户端修正 */}
          <rect x="575" y="90" width="115" height="55" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="632" y="110" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">客户端修正</text>
          <text x="632" y="125" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">偏差小 → 插值</text>
          <text x="632" y="138" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">偏差大 → 瞬移</text>

          {/* 修正细节 */}
          <text x="370" y="172" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">偏差 &lt; 0.5 米：平滑插值到服务器位置（lerp），玩家几乎无感</text>
          <text x="370" y="190" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">偏差 &gt; 2 米：直接瞬移（可能是卡墙/作弊/严重丢包）</text>
          <text x="370" y="208" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">0.5-2 米：根据移动速度做快速修正，避免穿墙</text>
          <text x="370" y="226" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">关键：预测时做本地碰撞检测，保证服务器校正时不穿墙</text>

          {/* 下半：远程玩家插值 */}
          <rect x="30" y="265" width="330" height="170" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="288" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">远程玩家：插值渲染</text>

          <text x="50" y="312" fontSize="10" fill="var(--text-secondary)">服务器 15Hz 广播位置快照</text>
          <text x="50" y="330" fontSize="10" fill="var(--text-secondary)">客户端 60Hz 渲染</text>
          <text x="50" y="348" fontSize="10" fill="var(--text-secondary)">→ 帧率不匹配，需插值</text>

          <text x="50" y="376" fontSize="10" fill="var(--text-tertiary)">快照时间戳 t1, t2（已知）</text>
          <text x="50" y="394" fontSize="10" fill="var(--text-tertiary)">当前渲染时间 = now - 100ms 延迟缓冲</text>
          <text x="50" y="412" fontSize="10" fill="var(--text-tertiary)">在 t1 和 t2 之间做线性插值（lerp）</text>
          <text x="50" y="430" fontSize="10" fill="var(--text-tertiary)">100ms 缓冲 = 容忍丢包和抖动</text>

          {/* 下半右：Entity Interpolation 时间线 */}
          <rect x="380" y="265" width="330" height="170" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="288" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">时间线：插值延迟缓冲</text>

          <line x1="400" y1="330" x2="690" y2="330" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="400" y="322" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">t1</text>
          <text x="500" y="322" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">t2</text>
          <text x="690" y="322" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">now</text>

          <circle cx="400" cy="330" r="4" fill="var(--warning)" />
          <circle cx="500" cy="330" r="4" fill="var(--warning)" />
          <circle cx="690" cy="330" r="4" fill="var(--text-primary)" />

          <rect x="450" y="338" width="70" height="22" rx="3" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="0.8" />
          <text x="485" y="353" textAnchor="middle" fontSize="8" fill="var(--success)">渲染点</text>

          <line x1="590" y1="320" x2="590" y2="340" stroke="var(--text-primary)" strokeWidth="1" strokeDasharray="3,2" />
          <text x="640" y="315" textAnchor="middle" fontSize="8" fill="var(--text-primary)">服务器时间</text>

          <text x="545" y="382" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">渲染点始终在 t1-t2 之间</text>
          <text x="545" y="398" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">比服务器真实时间晚 ~100ms</text>
          <text x="545" y="414" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">丢包导致 t2 缺失时做外推（extrapolate）</text>
          <text x="545" y="430" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">外推超过 200ms 停止，等新快照</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        实时同步——本地玩家预测校正消除操作延迟，远程玩家插值渲染平滑画面
      </figcaption>
    </figure>
  );
}
