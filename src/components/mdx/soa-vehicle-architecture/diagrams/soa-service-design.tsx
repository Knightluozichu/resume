"use client";

export function SoaServiceDesignDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="服务设计与接口定义图">
      <defs>
        <linearGradient id="soa-sd-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="soa-sd-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="soa-sd-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <marker id="soa-sd-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">服务设计与接口定义</text>

      {/* 上部：服务接口四要素 */}
      <text x="400" y="64" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">服务接口四要素</text>

      <rect x="40" y="78" width="170" height="70" rx="8" fill="url(#soa-sd-1)" opacity="0.9" />
      <text x="125" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">方法 Method</text>
      <text x="125" y="120" textAnchor="middle" fontSize="9" fill="#e0f2fe">请求/响应 (RR)</text>
      <text x="125" y="136" textAnchor="middle" fontSize="9" fill="#e0f2fe">类似函数调用</text>

      <rect x="225" y="78" width="170" height="70" rx="8" fill="url(#soa-sd-2)" opacity="0.9" />
      <text x="310" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">事件 Event</text>
      <text x="310" y="120" textAnchor="middle" fontSize="9" fill="#dcfce7">发布/订阅 (PubSub)</text>
      <text x="310" y="136" textAnchor="middle" fontSize="9" fill="#dcfce7">异步通知</text>

      <rect x="410" y="78" width="170" height="70" rx="8" fill="url(#soa-sd-3)" opacity="0.9" />
      <text x="495" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">字段 Field</text>
      <text x="495" y="120" textAnchor="middle" fontSize="9" fill="#f3e8ff">Getter / Setter</text>
      <text x="495" y="136" textAnchor="middle" fontSize="9" fill="#f3e8ff">属性读写</text>

      <rect x="595" y="78" width="165" height="70" rx="8" fill="#ca8a04" opacity="0.9" />
      <text x="677" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">广播 Broadcast</text>
      <text x="677" y="120" textAnchor="middle" fontSize="9" fill="#fef9c3">Fire and Forget</text>
      <text x="677" y="136" textAnchor="middle" fontSize="9" fill="#fef9c3">无响应通知</text>

      {/* 中部：服务定义示例 */}
      <text x="400" y="180" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">服务定义示例：车速服务</text>

      <rect x="100" y="194" width="600" height="140" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="214" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">service VehicleSpeedService</text>
      <line x1="120" y1="222" x2="680" y2="222" stroke="#cbd5e1" strokeWidth="1" />

      <text x="120" y="240" fontSize="9" fill="#475569">method getSpeed() returns uint16</text>
      <text x="120" y="256" fontSize="8" fill="#64748b">- 消费方调用，返回当前车速 km/h</text>

      <text x="120" y="276" fontSize="9" fill="#475569">event speedExceeded(uint16 threshold)</text>
      <text x="120" y="292" fontSize="8" fill="#64748b">- 车速超阈值时发布，订阅方异步收到</text>

      <text x="120" y="312" fontSize="9" fill="#475569">field currentSpeed uint16</text>
      <text x="120" y="328" fontSize="8" fill="#64748b">- 可读可写的属性，Getter返回值/Setter设值</text>

      {/* 下部：提供方与消费方 */}
      <text x="400" y="362" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">服务提供方与消费方</text>

      <rect x="40" y="376" width="280" height="80" rx="8" fill="url(#soa-sd-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="180" y="398" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369a1">服务提供方 Provider</text>
      <text x="60" y="418" fontSize="9" fill="#475569">- 实现接口逻辑</text>
      <text x="60" y="434" fontSize="9" fill="#475569">- 注册到服务发现</text>
      <text x="60" y="450" fontSize="9" fill="#475569">- 等待消费方调用</text>

      <rect x="340" y="376" width="120" height="80" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x="400" y="400" textAnchor="middle" fontSize="9" fontWeight="600" fill="#475569">SOME/IP</text>
      <text x="400" y="416" textAnchor="middle" fontSize="9" fontWeight="600" fill="#475569">传输层</text>
      <text x="400" y="440" textAnchor="middle" fontSize="8" fill="#64748b">序列化/路由</text>

      <rect x="480" y="376" width="280" height="80" rx="8" fill="url(#soa-sd-3)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="620" y="398" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7e22ce">服务消费方 Consumer</text>
      <text x="500" y="418" fontSize="9" fill="#475569">- 查找所需服务</text>
      <text x="500" y="434" fontSize="9" fill="#475569">- 订阅/调用接口</text>
      <text x="500" y="450" fontSize="9" fill="#475569">- 解耦提供方实现</text>

      <path d="M320 416 L340 416" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-sd-arrow)" />
      <path d="M460 416 L480 416" stroke="#64748b" strokeWidth="2" markerEnd="url(#soa-sd-arrow)" />

      {/* 底部：IDL */}
      <rect x="40" y="472" width="720" height="42" rx="8" fill="url(#soa-sd-2)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="400" y="490" textAnchor="middle" fontSize="10" fontWeight="600" fill="#15803d">IDL 接口定义语言</text>
      <text x="400" y="506" textAnchor="middle" fontSize="9" fill="#475569">Franca IDL / AUTOSAR ARXML / Protobuf — 声明式描述服务接口，生成多语言桩代码</text>

      {/* 底部总结 */}
      <rect x="40" y="528" width="720" height="40" rx="8" fill="url(#soa-sd-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="546" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369a1">服务设计核心</text>
      <text x="400" y="562" textAnchor="middle" fontSize="9" fill="#475569">接口 = 契约 / 方法+事件+字段 = 交互模式 / 提供方实现+消费方调用 = 松耦合</text>
    </svg>
  );
}
