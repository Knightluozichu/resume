"use client";

export function MspInterServiceCommDiagram() {
  return (
    <svg viewBox="0 0 800 540" className="w-full h-auto" role="img" aria-label="服务间通信模式谱系">
      <defs>
        <linearGradient id="msp-comm-sync" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="msp-comm-async" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="msp-comm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">进程间通信模式谱系</text>

      {/* 同步通信 */}
      <rect x="40" y="55" width="340" height="200" rx="12" fill="url(#msp-comm-sync)" opacity="0.95" />
      <text x="210" y="80" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">同步通信（请求-响应）</text>
      <line x1="60" y1="90" x2="360" y2="90" stroke="#fff" strokeWidth="1" opacity="0.4" />

      <rect x="60" y="105" width="100" height="50" rx="6" fill="#1e40af" />
      <text x="110" y="135" textAnchor="middle" fontSize="12" fill="#fff">调用方</text>

      <path d="M165 125 L255 125" stroke="#93c5fd" strokeWidth="2" markerEnd="url(#msp-comm-arrow)" />
      <text x="210" y="118" textAnchor="middle" fontSize="11" fill="#bfdbfe">请求</text>
      <path d="M255 145 L165 145" stroke="#93c5fd" strokeWidth="2" markerEnd="url(#msp-comm-arrow)" />
      <text x="210" y="160" textAnchor="middle" fontSize="11" fill="#bfdbfe">响应</text>

      <rect x="260" y="105" width="100" height="50" rx="6" fill="#1e40af" />
      <text x="310" y="135" textAnchor="middle" fontSize="12" fill="#fff">被调方</text>

      <text x="210" y="180" textAnchor="middle" fontSize="12" fill="#bfdbfe">REST（HTTP）/ gRPC（Protobuf）</text>
      <text x="210" y="200" textAnchor="middle" fontSize="11" fill="#93c5fd">即时返回 / 需知被调方地址</text>
      <text x="210" y="220" textAnchor="middle" fontSize="11" fill="#93c5fd">被调方宕机则调用方失败</text>
      <text x="210" y="240" textAnchor="middle" fontSize="11" fill="#60a5fa">适合：需要即时结果的场景</text>

      {/* 异步通信 */}
      <rect x="420" y="55" width="340" height="200" rx="12" fill="url(#msp-comm-async)" opacity="0.95" />
      <text x="590" y="80" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">异步通信（消息驱动）</text>
      <line x1="440" y1="90" x2="740" y2="90" stroke="#fff" strokeWidth="1" opacity="0.4" />

      <rect x="440" y="105" width="80" height="50" rx="6" fill="#5b21b6" />
      <text x="480" y="135" textAnchor="middle" fontSize="12" fill="#fff">生产者</text>

      <path d="M525 125 L565 125" stroke="#c4b5fd" strokeWidth="2" markerEnd="url(#msp-comm-arrow)" />
      <text x="545" y="118" textAnchor="middle" fontSize="11" fill="#ddd6fe">发布</text>

      <rect x="570" y="105" width="100" height="50" rx="6" fill="#5b21b6" />
      <text x="620" y="128" textAnchor="middle" fontSize="11" fill="#fff">消息Broker</text>
      <text x="620" y="145" textAnchor="middle" fontSize="11" fill="#ddd6fe">Kafka/RabbitMQ</text>

      <path d="M675 125 L715 125" stroke="#c4b5fd" strokeWidth="2" markerEnd="url(#msp-comm-arrow)" />
      <text x="695" y="118" textAnchor="middle" fontSize="11" fill="#ddd6fe">推送</text>

      <rect x="720" y="105" width="30" height="50" rx="6" fill="#5b21b6" />
      <text x="735" y="135" textAnchor="middle" fontSize="11" fill="#fff">消费者</text>

      <text x="590" y="180" textAnchor="middle" fontSize="12" fill="#ddd6fe">AMQP / Kafka</text>
      <text x="590" y="200" textAnchor="middle" fontSize="11" fill="#c4b5fd">发布即返回 / 通过Broker解耦</text>
      <text x="590" y="220" textAnchor="middle" fontSize="11" fill="#c4b5fd">被调方宕机时消息缓存</text>
      <text x="590" y="240" textAnchor="middle" fontSize="11" fill="#a78bfa">适合：可异步处理 / 削峰填谷</text>

      {/* 容错韧性模式 */}
      <text x="400" y="285" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">容错与韧性模式（韧性四件套）</text>

      <rect x="40" y="300" width="170" height="100" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="125" y="325" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1d4ed8">超时</text>
      <text x="125" y="348" textAnchor="middle" fontSize="11" fill="#1e40af">防止永久等待</text>
      <text x="125" y="368" textAnchor="middle" fontSize="11" fill="#1e40af">耗尽线程池</text>
      <text x="125" y="388" textAnchor="middle" fontSize="11" fill="#1d4ed8">连接超时 + 读超时</text>

      <rect x="225" y="300" width="170" height="100" rx="10" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="310" y="325" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0e7490">重试</text>
      <text x="310" y="348" textAnchor="middle" fontSize="11" fill="#155e75">恢复瞬时故障</text>
      <text x="310" y="368" textAnchor="middle" fontSize="11" fill="#155e75">指数退避</text>
      <text x="310" y="388" textAnchor="middle" fontSize="11" fill="#0e7490">只重试幂等操作</text>

      <rect x="410" y="300" width="170" height="100" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="495" y="325" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">熔断</text>
      <text x="495" y="348" textAnchor="middle" fontSize="11" fill="#78350f">防级联故障</text>
      <text x="495" y="368" textAnchor="middle" fontSize="11" fill="#78350f">Closed→Open→Half-Open</text>
      <text x="495" y="388" textAnchor="middle" fontSize="11" fill="#92400e">快速失败保留资源</text>

      <rect x="595" y="300" width="165" height="100" rx="10" fill="#fce7f3" stroke="#ec4899" strokeWidth="1.5" />
      <text x="677" y="325" textAnchor="middle" fontSize="12" fontWeight="700" fill="#db2777">降级</text>
      <text x="677" y="348" textAnchor="middle" fontSize="11" fill="#9d174d">保核心功能</text>
      <text x="677" y="368" textAnchor="middle" fontSize="11" fill="#9d174d">非核心兜底</text>
      <text x="677" y="388" textAnchor="middle" fontSize="11" fill="#db2777">返回缓存/默认值</text>

      {/* 熔断器状态机 */}
      <rect x="40" y="420" width="720" height="100" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="445" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">熔断器状态机：故障时快速失败，防级联雪崩</text>

      <rect x="70" y="460" width="130" height="45" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
      <text x="135" y="478" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">Closed</text>
      <text x="135" y="495" textAnchor="middle" fontSize="11" fill="#047857">正常调用 / 统计失败</text>

      <path d="M205 480 L295 480" stroke="#64748b" strokeWidth="2" markerEnd="url(#msp-comm-arrow)" />
      <text x="250" y="472" textAnchor="middle" fontSize="11" fill="#64748b">失败率超阈值</text>

      <rect x="300" y="460" width="130" height="45" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="365" y="478" textAnchor="middle" fontSize="12" fontWeight="700" fill="#991b1b">Open</text>
      <text x="365" y="495" textAnchor="middle" fontSize="11" fill="#b91c1c">快速失败 / 不发请求</text>

      <path d="M435 480 L525 480" stroke="#64748b" strokeWidth="2" markerEnd="url(#msp-comm-arrow)" />
      <text x="480" y="472" textAnchor="middle" fontSize="11" fill="#64748b">冷却时间后</text>

      <rect x="530" y="460" width="130" height="45" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="595" y="478" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">Half-Open</text>
      <text x="595" y="495" textAnchor="middle" fontSize="11" fill="#78350f">限量试探 / 探测恢复</text>

      <path d="M595 458 L595 430 L135 430 L135 458" stroke="#64748b" strokeWidth="2" fill="none" strokeDasharray="4,3" markerEnd="url(#msp-comm-arrow)" />
      <text x="365" y="420" textAnchor="middle" fontSize="11" fill="#64748b">探测成功 → 恢复Closed</text>
    </svg>
  );
}
