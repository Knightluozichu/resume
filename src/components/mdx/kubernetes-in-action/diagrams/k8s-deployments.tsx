"use client";

export function K8sDeploymentsDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="Deployment与ReplicaSet和滚动更新机制">
      <defs>
        <linearGradient id="k8s-dep-dp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="k8s-dep-roll" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="k8s-dep-hpa" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="k8s-dep-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#475569" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Deployment 副本管理与滚动更新</text>

      {/* 层级关系 */}
      <rect x="20" y="50" width="370" height="200" rx="12" fill="url(#k8s-dep-dp)" opacity="0.92" />
      <text x="205" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Deployment → ReplicaSet → Pod</text>
      <line x1="40" y1="85" x2="370" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <rect x="60" y="95" width="290" height="40" rx="6" fill="#fff" opacity="0.15" />
      <text x="205" y="120" textAnchor="middle" fontSize="11" fontWeight="600" fill="#93c5fd">Deployment (replicas:3, image:v2)</text>
      <path d="M205 135 L205 145" stroke="#fff" strokeWidth="1.5" opacity="0.5" />
      <rect x="80" y="145" width="250" height="40" rx="6" fill="#fff" opacity="0.12" />
      <text x="205" y="170" textAnchor="middle" fontSize="11" fontWeight="600" fill="#bfdbfe">ReplicaSet (v2, 维持3副本)</text>
      <path d="M150 185 L120 195" stroke="#fff" strokeWidth="1.5" opacity="0.5" />
      <path d="M205 185 L205 195" stroke="#fff" strokeWidth="1.5" opacity="0.5" />
      <path d="M260 185 L290 195" stroke="#fff" strokeWidth="1.5" opacity="0.5" />
      <rect x="80" y="195" width="70" height="40" rx="5" fill="#fff" opacity="0.1" />
      <text x="115" y="220" textAnchor="middle" fontSize="9" fill="#bfdbfe">Pod-1 (v2)</text>
      <rect x="170" y="195" width="70" height="40" rx="5" fill="#fff" opacity="0.1" />
      <text x="205" y="220" textAnchor="middle" fontSize="9" fill="#bfdbfe">Pod-2 (v2)</text>
      <rect x="260" y="195" width="70" height="40" rx="5" fill="#fff" opacity="0.1" />
      <text x="295" y="220" textAnchor="middle" fontSize="9" fill="#bfdbfe">Pod-3 (v2)</text>
      <text x="205" y="240" textAnchor="middle" fontSize="10" fontWeight="600" fill="#60a5fa">image变更 → 新RS → 滚动更新</text>

      {/* 滚动更新 */}
      <rect x="400" y="50" width="380" height="200" rx="12" fill="url(#k8s-dep-roll)" opacity="0.92" />
      <text x="590" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">滚动更新策略</text>
      <line x1="420" y1="85" x2="760" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="590" y="105" textAnchor="middle" fontSize="10" fill="#cffafe">maxSurge=1: 最多多出1个Pod</text>
      <text x="590" y="123" textAnchor="middle" fontSize="10" fill="#cffafe">maxUnavailable=0: 不允许不可用</text>
      <text x="590" y="148" textAnchor="middle" fontSize="10" fontWeight="600" fill="#67e8f9">→ 零停机更新流程:</text>
      <text x="590" y="168" textAnchor="middle" fontSize="9" fill="#a5f3fc">①建新Pod(maxSurge) → ②新Pod就绪</text>
      <text x="590" y="183" textAnchor="middle" fontSize="9" fill="#a5f3fc">→ ③删旧Pod(maxUnavailable=0)</text>
      <text x="590" y="198" textAnchor="middle" fontSize="9" fill="#a5f3fc">→ ④重复直到全部替换</text>
      <text x="590" y="220" textAnchor="middle" fontSize="10" fontWeight="600" fill="#67e8f9">关键: readinessProbe + maxUnavailable=0</text>
      <text x="590" y="238" textAnchor="middle" fontSize="10" fill="#a5f3fc">回滚: kubectl rollout undo --to-revision=N</text>

      {/* HPA */}
      <rect x="20" y="265" width="370" height="130" rx="10" fill="url(#k8s-dep-hpa)" opacity="0.9" />
      <text x="205" y="288" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">HPA 水平自动扩缩</text>
      <text x="205" y="308" textAnchor="middle" fontSize="10" fill="#fef3c7">CPU使用率 &gt; 70% → 扩容(加副本)</text>
      <text x="205" y="326" textAnchor="middle" fontSize="10" fill="#fef3c7">CPU使用率 &lt; 70% → 缩容(减副本)</text>
      <text x="205" y="344" textAnchor="middle" fontSize="10" fill="#fde68a">minReplicas=2, maxReplicas=10</text>
      <text x="205" y="362" textAnchor="middle" fontSize="10" fill="#fde68a">依赖: metrics-server + resources.requests.cpu</text>
      <text x="205" y="380" textAnchor="middle" fontSize="10" fill="#fcd34d">自定义指标: Prometheus Adapter</text>

      {/* 工作负载对比 */}
      <rect x="400" y="265" width="380" height="130" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="590" y="288" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">工作负载类型对比</text>
      <text x="590" y="310" textAnchor="middle" fontSize="10" fill="#475569">Deployment → 无状态服务 (Web/API)</text>
      <text x="590" y="328" textAnchor="middle" fontSize="10" fill="#475569">StatefulSet → 有状态服务 (数据库)</text>
      <text x="590" y="346" textAnchor="middle" fontSize="10" fill="#475569">DaemonSet → 每节点一个 (日志/监控)</text>
      <text x="590" y="364" textAnchor="middle" fontSize="10" fill="#475569">Job → 一次性任务</text>
      <text x="590" y="382" textAnchor="middle" fontSize="10" fontWeight="600" fill="#64748b">生产环境始终用Deployment,不直接创建Pod/RS</text>

      {/* YAML 示例 */}
      <rect x="20" y="410" width="760" height="135" rx="10" fill="#0f172a" opacity="0.88" />
      <text x="400" y="432" textAnchor="middle" fontSize="11" fontWeight="600" fill="#94a3b8"># Deployment 定义（滚动更新 + 零停机）</text>
      <text x="35" y="452" fontSize="9" fill="#4ade80">apiVersion: apps/v1</text>
      <text x="35" y="466" fontSize="9" fill="#4ade80">kind: Deployment</text>
      <text x="35" y="480" fontSize="9" fill="#cbd5e1">spec:</text>
      <text x="35" y="494" fontSize="9" fill="#cbd5e1">  replicas: 3</text>
      <text x="35" y="508" fontSize="9" fill="#cbd5e1">  strategy:</text>
      <text x="35" y="522" fontSize="9" fill="#cbd5e1">    type: RollingUpdate</text>
      <text x="35" y="536" fontSize="9" fill="#cbd5e1">    rollingUpdate: &#123; maxSurge: 1, maxUnavailable: 0 &#125;</text>
      <text x="400" y="452" fontSize="9" fill="#4ade80"># HPA 定义</text>
      <text x="400" y="466" fontSize="9" fill="#4ade80">apiVersion: autoscaling/v2</text>
      <text x="400" y="480" fontSize="9" fill="#4ade80">kind: HorizontalPodAutoscaler</text>
      <text x="400" y="494" fontSize="9" fill="#cbd5e1">spec:</text>
      <text x="400" y="508" fontSize="9" fill="#cbd5e1">  minReplicas: 2</text>
      <text x="400" y="522" fontSize="9" fill="#cbd5e1">  maxReplicas: 10</text>
      <text x="400" y="536" fontSize="9" fill="#cbd5e1">  metrics: [&#123;type:Resource, resource:&#123;name:cpu, target:70&#125;&#125;]</text>
    </svg>
  );
}
