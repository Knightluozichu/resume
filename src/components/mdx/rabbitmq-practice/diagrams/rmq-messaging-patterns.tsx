"use client";

export function RmqMessagingPatternsDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="RabbitMQ消息模式与Exchange类型">
      <defs>
        <linearGradient id="rmq-mp-direct" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="rmq-mp-fanout" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="rmq-mp-topic" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="rmq-mp-adv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="rmq-mp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#475569" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Exchange 四种类型与消息路由模式</text>

      {/* Direct */}
      <rect x="20" y="50" width="180" height="200" rx="12" fill="url(#rmq-mp-direct)" opacity="0.95" />
      <text x="110" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">direct</text>
      <line x1="35" y1="85" x2="185" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="110" y="108" textAnchor="middle" fontSize="10" fill="#bfdbfe">精确匹配 Routing Key</text>
      <text x="110" y="130" textAnchor="middle" fontSize="9" fill="#93c5fd">RK = "info" → Q1</text>
      <text x="110" y="148" textAnchor="middle" fontSize="9" fill="#93c5fd">RK = "error" → Q2</text>
      <text x="110" y="175" textAnchor="middle" fontSize="9" fill="#60a5fa">适用：点对点路由</text>
      <text x="110" y="195" textAnchor="middle" fontSize="9" fill="#60a5fa">日志按级别分发</text>
      <text x="110" y="225" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">1:1 精确路由</text>

      {/* Fanout */}
      <rect x="210" y="50" width="180" height="200" rx="12" fill="url(#rmq-mp-fanout)" opacity="0.95" />
      <text x="300" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">fanout</text>
      <line x1="225" y1="85" x2="375" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="300" y="108" textAnchor="middle" fontSize="10" fill="#cffafe">忽略 Routing Key</text>
      <text x="300" y="130" textAnchor="middle" fontSize="9" fill="#a5f3fc">消息 → 所有绑定队列</text>
      <text x="300" y="148" textAnchor="middle" fontSize="9" fill="#a5f3fc">Q1, Q2, Q3 全收</text>
      <text x="300" y="175" textAnchor="middle" fontSize="9" fill="#67e8f9">适用：广播通知</text>
      <text x="300" y="195" textAnchor="middle" fontSize="9" fill="#67e8f9">配置推送 / 事件分发</text>
      <text x="300" y="225" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">1:N 广播模式</text>

      {/* Topic */}
      <rect x="400" y="50" width="180" height="200" rx="12" fill="url(#rmq-mp-topic)" opacity="0.95" />
      <text x="490" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">topic</text>
      <line x1="415" y1="85" x2="565" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="490" y="108" textAnchor="middle" fontSize="10" fill="#fef3c7">模式匹配 Routing Key</text>
      <text x="490" y="130" textAnchor="middle" fontSize="9" fill="#fde68a">* = 一个单词</text>
      <text x="490" y="148" textAnchor="middle" fontSize="9" fill="#fde68a"># = 零或多个单词</text>
      <text x="490" y="175" textAnchor="middle" fontSize="9" fill="#fcd34d">适用：订阅过滤</text>
      <text x="490" y="195" textAnchor="middle" fontSize="9" fill="#fcd34d">kern.* / *.critical</text>
      <text x="490" y="225" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">1:N 模式路由</text>

      {/* Headers */}
      <rect x="590" y="50" width="190" height="200" rx="12" fill="url(#rmq-mp-adv)" opacity="0.95" />
      <text x="685" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">headers</text>
      <line x1="605" y1="85" x2="765" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="685" y="108" textAnchor="middle" fontSize="10" fill="#ede9fe">匹配消息头属性</text>
      <text x="685" y="130" textAnchor="middle" fontSize="9" fill="#ddd6fe">x-match: all / any</text>
      <text x="685" y="148" textAnchor="middle" fontSize="9" fill="#ddd6fe">忽略 Routing Key</text>
      <text x="685" y="175" textAnchor="middle" fontSize="9" fill="#c4b5fd">适用：多条件路由</text>
      <text x="685" y="195" textAnchor="middle" fontSize="9" fill="#c4b5fd">非 Routing Key 场景</text>
      <text x="685" y="225" textAnchor="middle" fontSize="10" fontWeight="600" fill="#fff">header 匹配路由</text>

      {/* 高级消息模式 */}
      <text x="400" y="280" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">高级消息模式</text>

      <rect x="20" y="295" width="240" height="100" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="140" y="318" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1d4ed8">死信队列（DLX）</text>
      <text x="140" y="338" textAnchor="middle" fontSize="10" fill="#1e40af">消息被 reject/nack + requeue=false</text>
      <text x="140" y="356" textAnchor="middle" fontSize="10" fill="#1e40af">消息 TTL 过期</text>
      <text x="140" y="374" textAnchor="middle" fontSize="10" fill="#1e40af">队列达到最大长度</text>
      <text x="140" y="388" textAnchor="middle" fontSize="10" fill="#1d4ed8">→ 转发到 Dead Letter Exchange</text>

      <rect x="280" y="295" width="240" height="100" rx="10" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="400" y="318" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0e7490">延迟队列</text>
      <text x="400" y="338" textAnchor="middle" fontSize="10" fill="#155e75">TTL 队列 + DLX 转发</text>
      <text x="400" y="356" textAnchor="middle" fontSize="10" fill="#155e75">rabbitmq_delayed_message 插件</text>
      <text x="400" y="374" textAnchor="middle" fontSize="10" fill="#155e75">定时任务 / 延迟回调</text>
      <text x="400" y="388" textAnchor="middle" fontSize="10" fill="#0e7490">→ 消息延迟 N 秒后到达</text>

      <rect x="540" y="295" width="240" height="100" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="660" y="318" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">优先级队列</text>
      <text x="660" y="338" textAnchor="middle" fontSize="10" fill="#78350f">x-max-priority 设置</text>
      <text x="660" y="356" textAnchor="middle" fontSize="10" fill="#78350f">高优先级消息先消费</text>
      <text x="660" y="374" textAnchor="middle" fontSize="10" fill="#78350f">0-255 优先级值</text>
      <text x="660" y="388" textAnchor="middle" fontSize="10" fill="#92400e">→ 紧急消息插队处理</text>

      {/* 模式选择决策 */}
      <rect x="20" y="410" width="760" height="130" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="435" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">Exchange 类型选择决策</text>
      <text x="400" y="460" textAnchor="middle" fontSize="11" fill="#475569">需要精确点对点？→ direct（Routing Key 精确匹配，一个 RK 绑一个 Queue）</text>
      <text x="400" y="480" textAnchor="middle" fontSize="11" fill="#475569">需要广播到所有消费者？→ fanout（忽略 RK，所有绑定 Queue 全收）</text>
      <text x="400" y="500" textAnchor="middle" fontSize="11" fill="#475569">需要按模式订阅过滤？→ topic（* 和 # 通配符匹配，最灵活的路由方式）</text>
      <text x="400" y="520" textAnchor="middle" fontSize="11" fill="#475569">需要按多属性匹配？→ headers（x-match: all/any，不看 Routing Key）</text>
    </svg>
  );
}
