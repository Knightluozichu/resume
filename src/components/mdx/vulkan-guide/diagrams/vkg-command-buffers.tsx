/**
 * <VkgCommandBuffersDiagram>：命令缓冲录制与提交流程
 *
 * 纯静态 SVG 展示，无交互。Server Component（无 "use client"）。
 */

export function VkgCommandBuffersDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="命令缓冲录制与提交流程" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">命令缓冲生命周期与多帧并行</text>

          {/* CPU side */}
          <rect x="20" y="50" width="320" height="300" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeDasharray="4,3" />
          <text x="180" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">CPU 端</text>

          {/* Command Pool */}
          <rect x="40" y="85" width="280" height="40" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1.2" />
          <text x="180" y="102" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">VkCommandPool</text>
          <text x="180" y="118" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">队列族绑定 · 分配器</text>

          {/* Frame 0 buffer */}
          <rect x="40" y="140" width="130" height="80" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="105" y="160" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--accent)">CmdBuffer[0]</text>
          <text x="105" y="178" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">vkBegin → 录制</text>
          <text x="105" y="192" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">vkCmdDraw × N</text>
          <text x="105" y="206" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">vkEnd</text>

          {/* Frame 1 buffer */}
          <rect x="190" y="140" width="130" height="80" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="255" y="160" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="var(--accent)">CmdBuffer[1]</text>
          <text x="255" y="178" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">vkBegin → 录制</text>
          <text x="255" y="192" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">vkCmdDraw × N</text>
          <text x="255" y="206" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">vkEnd</text>

          {/* Submit info */}
          <rect x="40" y="235" width="280" height="50" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="180" y="253" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--success)">VkSubmitInfo</text>
          <text x="180" y="270" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">waitSem + cmdBuf + signalSem + fence</text>

          {/* vkWaitForFences */}
          <rect x="40" y="300" width="280" height="35" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="180" y="322" textAnchor="middle" fontSize="10" fill="var(--warning)">vkWaitForFences → vkResetCommandBuffer</text>

          {/* Arrow CPU → GPU */}
          <line x1="340" y1="260" x2="370" y2="260" stroke="var(--success)" strokeWidth="2" markerEnd="url(#aCB)" />
          <defs>
            <marker id="aCB" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L6,4 L0,8 Z" fill="var(--success)" />
            </marker>
          </defs>
          <text x="355" y="252" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">vkQueueSubmit</text>

          {/* GPU side */}
          <rect x="370" y="50" width="330" height="300" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1" strokeDasharray="4,3" />
          <text x="535" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">GPU 端（队列）</text>

          {/* Timeline */}
          <line x1="400" y1="260" x2="680" y2="260" stroke="var(--border)" strokeWidth="1.5" />
          <text x="400" y="280" fontSize="9" fill="var(--text-secondary)">时间→</text>

          {/* Frame N executing */}
          <rect x="400" y="100" width="130" height="50" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="465" y="120" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">帧 N 执行中</text>
          <text x="465" y="135" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">信号量/fence 待触发</text>
          <line x1="465" y1="150" x2="465" y2="260" stroke="var(--success)" strokeWidth="1" strokeDasharray="2,2" strokeOpacity="0.5" />

          {/* Frame N+1 waiting */}
          <rect x="545" y="100" width="130" height="50" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" strokeDasharray="3,2" />
          <text x="610" y="120" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-secondary)">帧 N+1 等待</text>
          <text x="610" y="135" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">等 fence[N] 完成</text>
          <line x1="610" y1="150" x2="610" y2="260" stroke="var(--text-secondary)" strokeWidth="1" strokeDasharray="2,2" strokeOpacity="0.4" />

          {/* Semaphore flow */}
          <text x="535" y="200" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-primary)">信号量同步</text>
          <rect x="400" y="210" width="140" height="28" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="470" y="228" textAnchor="middle" fontSize="9" fill="var(--text-primary)">imageAvailable → 渲染</text>
          <rect x="550" y="210" width="140" height="28" rx="6" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="620" y="228" textAnchor="middle" fontSize="9" fill="var(--text-primary)">渲染 → renderFinished</text>

          {/* MAX_FRAMES_IN_FLIGHT note */}
          <rect x="390" y="295" width="290" height="40" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" />
          <text x="535" y="312" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">MAX_FRAMES_IN_FLIGHT = 2</text>
          <text x="535" y="327" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">CPU 录制帧 N+1 时 GPU 执行帧 N</text>

          <text x="360" y="378" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">录制（CPU）→ 提交 → 执行（GPU）→ fence 通知 → 重置 → 重新录制</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">命令缓冲的录制、提交、执行与多帧并行同步</figcaption>
    </figure>
  );
}
