/**
 * <DakHandlerThreadDiagram>：Handler消息循环机制图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function DakHandlerThreadDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Handler消息循环机制图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Handler消息循环机制——Looper / MessageQueue / Handler
          </text>

          {/* 左侧：Handler 发送消息 */}
          <rect x="40" y="60" width="180" height="200" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="130" y="82" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Handler</text>
          <rect x="55" y="92" width="150" height="28" rx="4" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="130" y="110" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">sendMessage(msg)</text>
          <rect x="55" y="128" width="150" height="28" rx="4" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="130" y="146" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">post(Runnable)</text>
          <text x="130" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">发送 Message</text>
          <text x="130" y="196" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">msg.target = this</text>
          <text x="130" y="222" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">enqueueMessage</text>
          <text x="130" y="240" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">按 when 排序入队</text>

          {/* 中间：MessageQueue */}
          <rect x="280" y="60" width="180" height="200" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="82" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">MessageQueue</text>
          <text x="370" y="108" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">消息链表（按时间排序）</text>
          <rect x="300" y="118" width="140" height="24" rx="4" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="370" y="134" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Message(t=0)</text>
          <rect x="300" y="146" width="140" height="24" rx="4" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="370" y="162" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Message(t=100)</text>
          <rect x="300" y="174" width="140" height="24" rx="4" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="370" y="190" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Message(t=500)</text>
          <text x="370" y="224" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">next() 取出到期消息</text>
          <text x="370" y="242" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">无消息时阻塞（epoll）</text>

          {/* 右侧：Looper 循环 */}
          <rect x="520" y="60" width="180" height="200" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="610" y="82" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">Looper</text>
          <text x="610" y="108" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">loop() 死循环</text>
          <rect x="535" y="118" width="150" height="28" rx="4" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="610" y="136" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">msg = queue.next()</text>
          <rect x="535" y="154" width="150" height="28" rx="4" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="610" y="172" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">target.dispatchMessage</text>
          <text x="610" y="204" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">回调 handleMessage</text>
          <text x="610" y="222" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">回收 Message 对象</text>
          <text x="610" y="240" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">循环往复</text>

          {/* 箭头 */}
          <line x1="220" y1="160" x2="280" y2="160" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#ha-arr)" />
          <line x1="460" y1="160" x2="520" y2="160" stroke="var(--text-secondary)" strokeWidth="1.5" markerEnd="url(#ha-arr)" />
          <line x1="610" y1="195" x2="610" y2="135" stroke="var(--danger)" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#ha-arr-r)" />

          <defs>
            <marker id="ha-arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="var(--text-secondary)" />
            </marker>
            <marker id="ha-arr-r" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 z" fill="var(--danger)" />
            </marker>
          </defs>

          {/* 底部：线程模型说明 */}
          <rect x="40" y="290" width="660" height="160" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.2" />
          <text x="370" y="312" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">线程模型与 ANR</text>

          <rect x="60" y="326" width="200" height="50" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="0.8" />
          <text x="160" y="346" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">主线程（UI线程）</text>
          <text x="160" y="364" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">prepareMainLooper + loop</text>

          <rect x="270" y="326" width="200" height="50" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="370" y="346" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">子线程（工作线程）</text>
          <text x="370" y="364" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">HandlerThread + Looper</text>

          <rect x="480" y="326" width="200" height="50" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="580" y="346" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">ANR 触发</text>
          <text x="580" y="364" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">主线程消息超时 5s</text>

          <text x="370" y="400" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">子线程通过 Handler 向主线程 MessageQueue 发送 Message，主线程 loop 取出后回调 handleMessage</text>
          <text x="370" y="418" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">所有 UI 操作必须在主线程执行，主线程阻塞 &gt; 5s 导致 ANR（Activity Not Responding）</text>
          <text x="370" y="436" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Message 复用池（sPool）避免频繁创建对象，最多缓存 50 个</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Handler消息循环——Handler发送、MessageQueue排队、Looper循环分发，线程间通信与ANR机制
      </figcaption>
    </figure>
  );
}
