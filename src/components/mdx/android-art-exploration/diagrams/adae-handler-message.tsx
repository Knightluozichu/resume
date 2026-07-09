/**
 * <AdaeHandlerMessageDiagram>：Handler消息机制图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 510;

export function AdaeHandlerMessageDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Handler消息机制图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Handler 消息机制
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            Handler / Message / MessageQueue / Looper 四要素
          </text>

          {/* 左：工作线程发送 */}
          <rect x="30" y="62" width="200" height="420" rx="12" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="130" y="86" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--warning)">工作线程</text>

          <rect x="50" y="100" width="160" height="62" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.1" />
          <text x="130" y="122" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">Handler</text>
          <text x="60" y="142" fontSize="11" fill="var(--text-secondary)">持 Looper/Callback</text>
          <text x="60" y="158" fontSize="11" fill="var(--text-secondary)">post/sendMessage</text>

          <text x="130" y="186" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">&darr; 封装 Message</text>

          <rect x="50" y="196" width="160" height="62" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.1" />
          <text x="130" y="218" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">Message</text>
          <text x="60" y="238" fontSize="11" fill="var(--text-secondary)">what/arg1/obj</text>
          <text x="60" y="254" fontSize="11" fill="var(--text-secondary)">target = 该 Handler</text>

          <text x="130" y="282" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">&darr; enqueueMessage</text>

          <rect x="50" y="292" width="160" height="62" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.1" />
          <text x="130" y="314" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">MessageQueue</text>
          <text x="60" y="334" fontSize="11" fill="var(--text-secondary)">按 when 排序的单链表</text>
          <text x="60" y="350" fontSize="11" fill="var(--text-secondary)">next 指针串起</text>

          <text x="130" y="378" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">&darr; 唤醒目标 Looper</text>

          <rect x="50" y="388" width="160" height="74" rx="8" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.1" strokeOpacity="0.4" />
          <text x="130" y="410" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">ThreadLocal</text>
          <text x="60" y="430" fontSize="11" fill="var(--text-secondary)">每线程独享 Looper</text>
          <text x="60" y="448" fontSize="11" fill="var(--text-secondary)">隔离线程消息</text>

          {/* 右：主线程消费 */}
          <rect x="250" y="62" width="460" height="420" rx="12" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="480" y="86" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--success)">主线程（UI 线程）Looper 循环</text>

          <rect x="270" y="100" width="420" height="92" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.1" />
          <text x="480" y="122" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">Looper.loop() 死循环</text>
          <text x="280" y="144" fontSize="11" fill="var(--text-secondary)">1. queue.next() 取下一条 Message（无消息则 native 阻塞）</text>
          <text x="280" y="162" fontSize="11" fill="var(--text-secondary)">2. msg.target.dispatchMessage(msg)  分发回 Handler</text>
          <text x="280" y="180" fontSize="11" fill="var(--text-secondary)">3. msg 回收进池  recycleUnchecked</text>

          <text x="480" y="212" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">&darr; dispatchMessage 分发顺序</text>

          <rect x="270" y="222" width="420" height="92" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.1" />
          <text x="480" y="244" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Handler.handleMessage</text>
          <text x="280" y="266" fontSize="11" fill="var(--text-secondary)">① msg.callback != null → Runnable.run()</text>
          <text x="280" y="284" fontSize="11" fill="var(--text-secondary)">② mCallback != null → Callback.handleMessage</text>
          <text x="280" y="302" fontSize="11" fill="var(--text-secondary)">③ 否则 → 重写的 handleMessage(msg)</text>

          <rect x="270" y="330" width="420" height="68" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.1" />
          <text x="480" y="352" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">主线程准备</text>
          <text x="280" y="374" fontSize="11" fill="var(--text-secondary)">ActivityThread.main → Looper.prepareMainLooper</text>
          <text x="280" y="392" fontSize="11" fill="var(--text-secondary)">→ Looper.loop()  （整个 App 的心跳）</text>

          <rect x="270" y="412" width="420" height="50" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.1" />
          <text x="480" y="434" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">关键：子线程不能直接更新 UI，必须经 Handler 切到主线程</text>
          <text x="480" y="452" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">子线程需手动 prepare()+loop()，用完 quit 释放</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Handler消息机制四要素——工作线程sendMessage入队、MessageQueue按when排序、Looper循环取消息、Handler.dispatchMessage回主线程
      </figcaption>
    </figure>
  );
}
