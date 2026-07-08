/**
 * <MgpFlowControlDiagram>：流量控制与拥塞避免图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function MgpFlowControlDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="流量控制与拥塞避免图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            流量控制与 AIMD 拥塞控制
          </text>

          {/* 左侧：流量控制 vs 拥塞控制 */}
          <rect x="30" y="48" width="335" height="110" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="197" y="68" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">两种控制机制</text>

          <text x="50" y="88" fontSize="10" fontWeight="600" fill="var(--success)">流量控制：</text>
          <text x="50" y="102" fontSize="9" fill="var(--text-secondary)">保护接收方</text>
          <text x="50" y="116" fontSize="9" fill="var(--text-secondary)">滑动窗口限制发送速率</text>
          <text x="50" y="130" fontSize="9" fill="var(--text-secondary)">recvWindow = 接收方缓冲能力</text>
          <text x="50" y="148" fontSize="9" fill="var(--text-tertiary)">有效窗口 = min(recv, cwnd)</text>

          <text x="200" y="88" fontSize="10" fontWeight="600" fill="var(--warning)">拥塞控制：</text>
          <text x="200" y="102" fontSize="9" fill="var(--text-secondary)">保护网络</text>
          <text x="200" y="116" fontSize="9" fill="var(--text-secondary)">AIMD 调节拥塞窗口</text>
          <text x="200" y="130" fontSize="9" fill="var(--text-secondary)">cwnd = 网络链路容量估计</text>

          {/* 右侧：AIMD 图形化 */}
          <rect x="385" y="48" width="325" height="110" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="547" y="68" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">AIMD 拥塞窗口变化</text>

          {/* 锯齿图 */}
          <line x1="400" y1="148" x2="700" y2="148" stroke="var(--text-tertiary)" strokeWidth="0.5" />
          <text x="395" y="152" textAnchor="end" fontSize="8" fill="var(--text-tertiary)">t</text>

          {/* 上升（加性增）*/}
          <polyline points="400,140 450,130 500,120 550,110" fill="none" stroke="var(--success)" strokeWidth="1.5" />
          <text x="475" y="124" textAnchor="middle" fontSize="8" fill="var(--success)">+1/RTT</text>

          {/* 下降（乘性减）*/}
          <line x1="550" y1="110" x2="555" y2="135" stroke="var(--danger)" strokeWidth="1.5" />
          <text x="568" y="125" textAnchor="middle" fontSize="8" fill="var(--danger)">x0.5</text>

          {/* 再上升 */}
          <polyline points="555,135 605,125 655,115 700,108" fill="none" stroke="var(--success)" strokeWidth="1.5" />

          <text x="547" y="92" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">cwnd</text>
          <text x="475" y="158" textAnchor="middle" fontSize="7" fill="var(--success)">加性增（线性）</text>
          <text x="568" y="158" textAnchor="middle" fontSize="7" fill="var(--danger)">乘性减（丢包）</text>

          {/* 下方：滑动窗口 */}
          <rect x="30" y="174" width="335" height="120" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <text x="197" y="194" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">滑动窗口机制</text>

          <text x="50" y="214" fontSize="9" fill="var(--text-secondary)">已确认 |  在途（窗口内）  | 未发送</text>

          <rect x="50" y="222" width="60" height="24" rx="3" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="0.8" />
          <text x="80" y="238" textAnchor="middle" fontSize="8" fill="var(--success)">已确认</text>

          <rect x="110" y="222" width="120" height="24" rx="3" fill="var(--warning)" fillOpacity="0.15" stroke="var(--warning)" strokeWidth="1" />
          <text x="170" y="238" textAnchor="middle" fontSize="8" fill="var(--warning)">在途 (bytesInFlight)</text>

          <rect x="230" y="222" width="120" height="24" rx="3" fill="var(--text-tertiary)" fillOpacity="0.08" stroke="var(--text-tertiary)" strokeWidth="0.8" strokeDasharray="3" />
          <text x="290" y="238" textAnchor="middle" fontSize="8" fill="var(--text-tertiary)">未发送</text>

          <text x="197" y="262" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">CanSend = bytesInFlight + new &lt;= windowSize</text>
          <text x="197" y="278" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">ACK 到达 &rarr; 窗口前滑 &rarr; 可发更多</text>

          {/* 右下：带宽估计 */}
          <rect x="385" y="174" width="325" height="120" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="547" y="194" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">带宽估计</text>

          <text x="405" y="214" fontSize="9" fill="var(--text-secondary)">基于 ACK 的速率估计：</text>
          <text x="405" y="230" fontSize="9" fill="var(--text-secondary)">rate = bytesAcked / elapsedTime</text>
          <text x="405" y="246" fontSize="9" fill="var(--text-secondary)">指数平滑: est = est*0.9 + rate*0.1</text>
          <text x="405" y="262" fontSize="9" fill="var(--text-tertiary)">理想窗口 = 带宽 x RTT (BDP)</text>
          <text x="405" y="278" fontSize="9" fill="var(--text-tertiary)">刚好填满网络管道</text>

          {/* 底部提示 */}
          <text x={VIEW_W / 2} y="324" textAnchor="middle" fontSize="11" fill="var(--text-primary)">
            不做拥塞控制 &rarr; 丢包重传风暴 &rarr; 拥塞崩溃
          </text>
          <text x={VIEW_W / 2} y="344" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            AIMD 让多连接公平收敛：加性增探测带宽，乘性减释放带宽
          </text>
          <text x={VIEW_W / 2} y="364" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            有效发送窗口 = min(接收窗口, 拥塞窗口) — 同时保护接收方和网络
          </text>
          <text x={VIEW_W / 2} y="392" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：即使游戏数据量小，也必须做拥塞控制，否则多连接共享网络时崩溃
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        流量控制与拥塞避免——滑动窗口、AIMD 锯齿与带宽估计
      </figcaption>
    </figure>
  );
}
