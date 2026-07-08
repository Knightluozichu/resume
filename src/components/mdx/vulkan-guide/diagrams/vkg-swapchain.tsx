/**
 * <VkgSwapchainDiagram>：交换链与呈现模式
 *
 * 纯静态 SVG 展示，无交互。Server Component（无 "use client"）。
 */

export function VkgSwapchainDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg viewBox="0 0 720 400" role="img" aria-label="交换链与呈现模式对比" className="mx-auto block h-auto w-full max-w-[720px]">
          <text x="360" y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">交换链呈现模式对比</text>

          {/* FIFO Mode */}
          <rect x="30" y="50" width="200" height="155" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="130" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">FIFO（默认）</text>
          <text x="130" y="88" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">VSync 开启，队列等待</text>

          <rect x="50" y="100" width="80" height="28" rx="4" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="90" y="118" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">帧 A（等待）</text>
          <rect x="50" y="135" width="80" height="28" rx="4" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="90" y="153" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">帧 B（队列）</text>
          <rect x="140" y="118" width="70" height="28" rx="4" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="175" y="136" textAnchor="middle" fontSize="9.5" fill="var(--success)">显示器</text>
          <text x="130" y="185" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">无撕裂，延迟高</text>

          {/* Mailbox Mode */}
          <rect x="260" y="50" width="200" height="155" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="360" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">Mailbox</text>
          <text x="360" y="88" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">丢弃旧帧，只留最新</text>

          <rect x="280" y="100" width="80" height="28" rx="4" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="320" y="118" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)" textDecoration="line-through">帧 A（丢弃）</text>
          <rect x="280" y="135" width="80" height="28" rx="4" fill="var(--bg)" stroke="var(--warning)" strokeWidth="1.5" />
          <text x="320" y="153" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">帧 B（最新）</text>
          <rect x="370" y="118" width="70" height="28" rx="4" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="405" y="136" textAnchor="middle" fontSize="9.5" fill="var(--success)">显示器</text>
          <text x="360" y="185" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">低延迟，功耗高</text>

          {/* Immediate Mode */}
          <rect x="490" y="50" width="200" height="155" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="590" y="72" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--danger)">Immediate</text>
          <text x="590" y="88" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">无同步，立即呈现</text>

          <rect x="510" y="100" width="80" height="28" rx="4" fill="var(--bg)" stroke="var(--danger)" strokeWidth="1" />
          <text x="550" y="118" textAnchor="middle" fontSize="9.5" fill="var(--text-primary)">帧 B</text>
          <rect x="510" y="135" width="80" height="28" rx="4" fill="var(--bg)" stroke="var(--danger)" strokeWidth="1" strokeDasharray="3,2" />
          <text x="550" y="153" textAnchor="middle" fontSize="9.5" fill="var(--danger)">撕裂!</text>
          <rect x="600" y="118" width="70" height="28" rx="4" fill="var(--success)" fillOpacity="0.15" stroke="var(--success)" strokeWidth="1" />
          <text x="635" y="136" textAnchor="middle" fontSize="9.5" fill="var(--success)">显示器</text>
          <text x="590" y="185" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">最低延迟，可能撕裂</text>

          {/* Swapchain flow */}
          <text x="360" y="240" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">交换链渲染循环</text>

          <rect x="30" y="260" width="120" height="50" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="90" y="280" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">1. AcquireImage</text>
          <text x="90" y="298" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">等 imageAvailable</text>

          <line x1="150" y1="285" x2="175" y2="285" stroke="var(--accent)" strokeWidth="1.3" markerEnd="url(#arrS)" />
          <defs>
            <marker id="arrS" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <path d="M0,0 L5,3.5 L0,7 Z" fill="var(--accent)" />
            </marker>
          </defs>

          <rect x="175" y="260" width="120" height="50" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="235" y="280" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">2. 渲染命令</text>
          <text x="235" y="298" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">提交到队列</text>

          <line x1="295" y1="285" x2="320" y2="285" stroke="var(--accent)" strokeWidth="1.3" markerEnd="url(#arrS)" />

          <rect x="320" y="260" width="120" height="50" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="380" y="280" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">3. 渲染完成</text>
          <text x="380" y="298" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">等 renderFinished</text>

          <line x1="440" y1="285" x2="465" y2="285" stroke="var(--accent)" strokeWidth="1.3" markerEnd="url(#arrS)" />

          <rect x="465" y="260" width="120" height="50" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="525" y="280" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">4. Present</text>
          <text x="525" y="298" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">vkQueuePresentKHR</text>

          <rect x="595" y="260" width="100" height="50" rx="8" fill="var(--bg)" stroke="var(--border)" strokeWidth="1" />
          <text x="645" y="280" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">显示器</text>
          <text x="645" y="298" textAnchor="middle" fontSize="9.5" fill="var(--text-secondary)">观众看到画面</text>

          <text x="360" y="355" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Acquire → Render → Signal → Present：每帧的标准流程</text>
          <text x="360" y="378" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">信号量确保 GPU 在图像就绪后渲染，在渲染完成后才呈现</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">三种呈现模式对比与交换链渲染循环流程</figcaption>
    </figure>
  );
}
