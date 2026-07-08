/**
 * <MgpPredictionReconciliationDiagram>：客户端预测与服务器校正图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function MgpPredictionReconciliationDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="客户端预测与服务器校正图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            客户端预测与服务器校正
          </text>

          {/* 上方：无预测 vs 有预测 */}
          <rect x="30" y="48" width="335" height="100" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="197" y="68" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">无预测：等服务器确认</text>
          <text x="50" y="88" fontSize="9" fill="var(--text-secondary)">按键 &rarr; 发送 &rarr; [RTT] &rarr; 服务器处理</text>
          <text x="50" y="102" fontSize="9" fill="var(--text-secondary)">&rarr; [RTT] &rarr; 客户端移动</text>
          <text x="50" y="120" fontSize="10" fontWeight="600" fill="var(--danger)">总延迟 = 2 x RTT (100-400ms)</text>
          <text x="50" y="136" fontSize="9" fill="var(--text-tertiary)">玩家感觉明显卡顿</text>

          <rect x="385" y="48" width="325" height="100" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="547" y="68" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">有预测：立即本地模拟</text>
          <text x="405" y="88" fontSize="9" fill="var(--text-secondary)">按键 &rarr; 客户端立即移动</text>
          <text x="405" y="102" fontSize="9" fill="var(--text-secondary)">同时发送 &rarr; 服务器处理 &rarr; 校正</text>
          <text x="405" y="120" fontSize="10" fontWeight="600" fill="var(--success)">感知延迟 &asymp; 0ms</text>
          <text x="405" y="136" fontSize="9" fill="var(--text-tertiary)">校正异步进行，通常无感</text>

          {/* 中间：校正流程 */}
          <rect x="30" y="164" width="680" height="220" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="184" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">服务器校正流程</text>

          {/* 客户端时间线 */}
          <text x="100" y="204" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-primary)">客户端</text>
          <line x1="100" y1="210" x2="100" y2="370" stroke="var(--text-tertiary)" strokeWidth="1" />

          {/* 服务器时间线 */}
          <text x="640" y="204" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-primary)">服务器</text>
          <line x1="640" y1="210" x2="640" y2="370" stroke="var(--text-tertiary)" strokeWidth="1" />

          {/* 步骤1: 输入 + 预测 */}
          <line x1="102" y1="224" x2="638" y2="224" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="220" textAnchor="middle" fontSize="9" fill="var(--success)">1. 输入(seq=N) &rarr; 立即预测移动 + 发送服务器</text>

          {/* 步骤2: 服务器处理 */}
          <rect x="590" y="238" width="100" height="20" rx="3" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="640" y="252" textAnchor="middle" fontSize="8" fill="var(--warning)">处理输入 seq=N</text>

          {/* 步骤3: 回传权威状态 */}
          <line x1="638" y1="272" x2="102" y2="272" stroke="var(--accent)" strokeWidth="1.2" strokeDasharray="3" />
          <text x="370" y="268" textAnchor="middle" fontSize="9" fill="var(--accent)">2. 服务器回传: state + lastProcessedSeq=N</text>

          {/* 步骤3: 回退到服务器状态 */}
          <rect x="50" y="286" width="100" height="20" rx="3" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="100" y="300" textAnchor="middle" fontSize="8" fill="var(--danger)">回退到服务器状态</text>

          {/* 步骤4: 重放未确认输入 */}
          <rect x="50" y="314" width="100" height="20" rx="3" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="100" y="328" textAnchor="middle" fontSize="8" fill="var(--warning)">重放未确认输入</text>

          {/* 步骤5: 得到最终状态 */}
          <rect x="50" y="342" width="100" height="20" rx="3" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="0.8" />
          <text x="100" y="356" textAnchor="middle" fontSize="8" fill="var(--success)">最终预测状态</text>

          <text x="170" y="300" fontSize="8" fill="var(--text-tertiary)">3. 回退到权威</text>
          <text x="170" y="328" fontSize="8" fill="var(--text-tertiary)">4. 重放 seq &gt; N 的输入</text>
          <text x="170" y="356" fontSize="8" fill="var(--text-tertiary)">5. = 服务器权威 + 本地未确认</text>

          {/* 右侧说明 */}
          <text x="450" y="300" fontSize="9" fill="var(--text-secondary)">偏差 &lt; 0.1m: 忽略</text>
          <text x="450" y="316" fontSize="9" fill="var(--text-secondary)">偏差 0.1-2m: 平滑插值</text>
          <text x="450" y="332" fontSize="9" fill="var(--text-secondary)">偏差 &gt; 2m: 直接跳转</text>
          <text x="450" y="352" fontSize="8" fill="var(--text-tertiary)">预测不一致是正常现象</text>
          <text x="450" y="366" fontSize="8" fill="var(--text-tertiary)">校正机制为此而生</text>

          {/* 底部提示 */}
          <text x={VIEW_W / 2} y="410" textAnchor="middle" fontSize="11" fill="var(--text-primary)">
            输入序号是校正的关键：服务器回带 lastProcessedSeq，客户端据此回退 + 重放
          </text>
          <text x={VIEW_W / 2} y="430" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            重放确保校正后状态 = 服务器权威 + 最新输入效果，不会丢失输入
          </text>
          <text x={VIEW_W / 2} y="450" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：预测消除感知延迟，校正保证长期一致性——预测在先，权威兜底
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        客户端预测与服务器校正——无预测 vs 有预测延迟对比与校正回退重放流程
      </figcaption>
    </figure>
  );
}
