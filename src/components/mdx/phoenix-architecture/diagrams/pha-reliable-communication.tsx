"use client";

export function PhaReliableCommunicationDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="可靠通信韧性模式全景">
      <defs>
        <marker id="pha-rc-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">可靠通信 · 韧性模式全景</text>

      {/* 流量入口 → 负载均衡 → 限流 → 熔断 → 服务 */}
      <rect x="20" y="50" width="130" height="45" rx="8" fill="#2563eb" opacity="0.9" />
      <text x="85" y="78" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">客户端请求</text>

      <rect x="180" y="50" width="130" height="45" rx="8" fill="#0891b2" opacity="0.9" />
      <text x="245" y="78" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">负载均衡</text>

      <rect x="340" y="50" width="130" height="45" rx="8" fill="#f59e0b" opacity="0.9" />
      <text x="405" y="78" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">限流</text>

      <rect x="500" y="50" width="130" height="45" rx="8" fill="#8b5cf6" opacity="0.9" />
      <text x="565" y="78" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">熔断/降级</text>

      <rect x="660" y="50" width="120" height="45" rx="8" fill="#ef4444" opacity="0.85" />
      <text x="720" y="78" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">后端服务</text>

      <path d="M150 72 L180 72" stroke="#64748b" strokeWidth="2" markerEnd="url(#pha-rc-arrow)" />
      <path d="M310 72 L340 72" stroke="#64748b" strokeWidth="2" markerEnd="url(#pha-rc-arrow)" />
      <path d="M470 72 L500 72" stroke="#64748b" strokeWidth="2" markerEnd="url(#pha-rc-arrow)" />
      <path d="M630 72 L660 72" stroke="#64748b" strokeWidth="2" markerEnd="url(#pha-rc-arrow)" />

      {/* 负载均衡策略 */}
      <rect x="20" y="120" width="240" height="170" rx="8" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="140" y="143" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0e7490">负载均衡策略</text>
      <text x="35" y="165" fontSize="10" fill="#155e75">轮询 / 加权轮询</text>
      <text x="35" y="183" fontSize="10" fill="#155e75">最少连接 / 最快响应</text>
      <text x="35" y="201" fontSize="10" fill="#155e75">一致性哈希（会话保持）</text>
      <text x="35" y="219" fontSize="10" fill="#155e75">随机 / IP哈希</text>
      <text x="35" y="245" fontSize="9" fill="#64748b">四层：LVS / Nginx（传输层）</text>
      <text x="35" y="263" fontSize="9" fill="#64748b">七层：Nginx / Envoy / Gateway</text>
      <text x="35" y="281" fontSize="9" fill="#64748b">客户端 / 服务端 / DNS 多级</text>

      {/* 限流策略 */}
      <rect x="280" y="120" width="240" height="170" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="400" y="143" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">限流算法</text>
      <text x="295" y="165" fontSize="10" fill="#78350f">计数器：简单但有临界突刺</text>
      <text x="295" y="183" fontSize="10" fill="#78350f">滑动窗口：平滑计数</text>
      <text x="295" y="201" fontSize="10" fill="#78350f">漏桶：恒定速率出水</text>
      <text x="295" y="219" fontSize="10" fill="#78350f">令牌桶：允许突发流量</text>
      <text x="295" y="245" fontSize="9" fill="#64748b">维度：单机 / 集群 / 接口 / 用户</text>
      <text x="295" y="263" fontSize="9" fill="#64748b">集群限流：Redis + Lua 原子操作</text>
      <text x="295" y="281" fontSize="9" fill="#64748b">降级策略：排队 / 拒绝 / 降级</text>

      {/* 熔断降级 */}
      <rect x="540" y="120" width="240" height="170" rx="8" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="660" y="143" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6d28d9">熔断器三态</text>
      <text x="555" y="165" fontSize="10" fill="#5b21b6">Closed（关闭）：正常放行</text>
      <text x="555" y="183" fontSize="10" fill="#5b21b6">Open（打开）：快速失败/降级</text>
      <text x="555" y="201" fontSize="10" fill="#5b21b6">Half-Open（半开）：试探恢复</text>
      <text x="555" y="227" fontSize="10" fill="#5b21b6">降级：返回默认值/缓存/兜底</text>
      <text x="555" y="252" fontSize="9" fill="#64748b">触发条件：错误率 / 慢调用比例</text>
      <text x="555" y="270" fontSize="9" fill="#64748b">恢复：等待 → 半开 → 成功率达标</text>
      <text x="555" y="284" fontSize="9" fill="#64748b">实现：Hystrix / Sentinel / Resilience4j</text>

      {/* 超时与重试 */}
      <rect x="20" y="310" width="370" height="110" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="205" y="333" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">超时与重试</text>
      <text x="35" y="355" fontSize="10" fill="#475569">超时：连接超时 + 读超时 + 写超时（分级设置）</text>
      <text x="35" y="375" fontSize="10" fill="#475569">重试：指数退避 + 抖动 + 最大次数限制</text>
      <text x="35" y="395" fontSize="10" fill="#475569">幂等：重试前提，相同请求结果一致</text>
      <text x="35" y="413" fontSize="9" fill="#dc2626">风险：重试风暴 → 雪崩（需配合熔断/限流）</text>

      {/* 幂等设计 */}
      <rect x="410" y="310" width="370" height="110" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="595" y="333" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">幂等性设计</text>
      <text x="425" y="355" fontSize="10" fill="#475569">唯一ID + 去重表：写入前查重</text>
      <text x="425" y="375" fontSize="10" fill="#475569">Token机制：先获取令牌，消费后失效</text>
      <text x="425" y="395" fontSize="10" fill="#475569">乐观锁：version/CAS 检测并发修改</text>
      <text x="425" y="413" fontSize="9" fill="#dc2626">状态机：只允许合法状态转换（防重复支付）</text>

      {/* 面向失败设计原则 */}
      <rect x="20" y="440" width="760" height="100" rx="10" fill="#1e293b" />
      <text x="400" y="465" textAnchor="middle" fontSize="13" fontWeight="700" fill="#f1f5f9">面向失败设计（Design for Failure）</text>
      <text x="400" y="490" textAnchor="middle" fontSize="11" fill="#94a3b8">假设一切都会失败：网络会断 / 服务会挂 / 依赖会慢 / 数据会丢 / 时钟会偏</text>
      <text x="400" y="512" textAnchor="middle" fontSize="11" fill="#94a3b8">韧性 = 限流（控制流量）+ 熔断（快速失败）+ 降级（保核心）+ 重试（恢复临时故障）+ 幂等（安全重试）+ 超时（防止资源耗尽）</text>
      <text x="400" y="532" textAnchor="middle" fontSize="11" fill="#fbbf24">目标：局部故障不扩散为全局雪崩，系统在降级中继续提供核心服务</text>
    </svg>
  );
}
