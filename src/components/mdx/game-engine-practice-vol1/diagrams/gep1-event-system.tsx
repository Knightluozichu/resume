/**
 * <Gep1EventSystemDiagram>：事件系统与消息分发图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 430;

export function Gep1EventSystemDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="事件系统与消息分发图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            事件系统：发布订阅 + 延迟分发
          </text>

          {/* 发布者 */}
          <rect x="30" y="72" width="160" height="50" rx="8" fill="var(--success)" fillOpacity="0.16" stroke="var(--success)" strokeWidth="1.2" />
          <text x="110" y="94" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">发布者</text>
          <text x="110" y="110" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">输入/玩法/物理</text>

          <text x="210" y="100" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <text x="210" y="114" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">emit</text>

          {/* 事件队列 */}
          <rect x="240" y="64" width="240" height="68" rx="10" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="360" y="84" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">事件队列 Event Queue</text>
          <rect x="256" y="96" width="60" height="26" rx="4" fill="var(--accent)" fillOpacity="0.3" />
          <text x="286" y="113" textAnchor="middle" fontSize="9" fill="var(--text-primary)">evt1</text>
          <rect x="322" y="96" width="60" height="26" rx="4" fill="var(--accent)" fillOpacity="0.22" />
          <text x="352" y="113" textAnchor="middle" fontSize="9" fill="var(--text-primary)">evt2</text>
          <rect x="388" y="96" width="60" height="26" rx="4" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="0.6" strokeDasharray="3 2" />
          <text x="418" y="113" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">evt3</text>

          <text x="360" y="152" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>
          <text x="360" y="166" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">dispatch（帧内统一处理）</text>

          {/* 订阅者 */}
          <rect x="500" y="72" width="190" height="50" rx="8" fill="var(--warning)" fillOpacity="0.16" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="595" y="94" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">订阅者</text>
          <text x="595" y="110" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">UI/音频/成就系统</text>

          <text x="490" y="100" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          {/* 三种分发模式 */}
          <text x={VIEW_W / 2} y="196" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">三种分发模式</text>

          <rect x="40" y="210" width="200" height="120" rx="10" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="140" y="232" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">立即分发</text>
          <text x="140" y="254" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">emit 即刻调用回调</text>
          <text x="140" y="272" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">同步阻塞</text>
          <text x="140" y="296" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">适用</text>
          <text x="140" y="314" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">输入响应（低延迟）</text>

          <rect x="260" y="210" width="200" height="120" rx="10" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="360" y="232" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">排队分发</text>
          <text x="360" y="254" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">入队，帧末统一处理</text>
          <text x="360" y="272" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">解耦发送与处理时机</text>
          <text x="360" y="296" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">适用</text>
          <text x="360" y="314" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">玩法逻辑（安全有序）</text>

          <rect x="480" y="210" width="200" height="120" rx="10" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="580" y="232" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">下一帧分发</text>
          <text x="580" y="254" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">延迟到下帧处理</text>
          <text x="580" y="272" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">避免迭代中修改集合</text>
          <text x="580" y="296" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">适用</text>
          <text x="580" y="314" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">销毁对象/场景切换</text>

          {/* 设计要点 */}
          <rect x="40" y="346" width="640" height="70" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="368" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">
            事件系统 = 观察者模式 + 队列
          </text>
          <text x="360" y="388" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            发布者不关心谁订阅；订阅者不关心谁发布 — 双向解耦
          </text>
          <text x="360" y="404" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            坑：回调中再 emit 可能无限递归 — 用队列把「触发」与「处理」分开
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        事件系统——发布者经事件队列分发给订阅者，三种分发模式适配不同延迟与安全性需求
      </figcaption>
    </figure>
  );
}
