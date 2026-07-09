"use client";

export function K8sSchedulingDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="调度器两阶段与亲和性污点机制">
      <defs>
        <linearGradient id="k8s-sch-filter" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="k8s-sch-aff" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="k8s-sch-taint" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="k8s-sch-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#475569" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">K8s 调度器与亲和性机制</text>

      {/* 调度两阶段 */}
      <rect x="20" y="50" width="370" height="200" rx="12" fill="url(#k8s-sch-filter)" opacity="0.92" />
      <text x="205" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">调度器两阶段</text>
      <line x1="40" y1="85" x2="370" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="35" y="108" fontSize="10" fontWeight="600" fill="#bfdbfe">阶段一: Filter (过滤)</text>
      <text x="35" y="126" fontSize="9" fill="#93c5fd">  资源充足? 端口冲突? 污点容忍?</text>
      <text x="35" y="144" fontSize="9" fill="#93c5fd">  nodeSelector/Affinity匹配? Volume可用?</text>
      <text x="35" y="168" fontSize="10" fontWeight="600" fill="#bfdbfe">阶段二: Score (打分)</text>
      <text x="35" y="186" fontSize="9" fill="#93c5fd">  资源均衡度 + 亲和性权重</text>
      <text x="35" y="204" fontSize="9" fill="#93c5fd">  + 拓扑分布 + 优先级</text>
      <text x="35" y="228" fontSize="10" fontWeight="600" fill="#60a5fa">requests = 调度依据</text>
      <text x="35" y="246" fontSize="9" fill="#93c5fd">limits 不影响调度, 仅运行时限制</text>

      {/* 亲和性 */}
      <rect x="400" y="50" width="380" height="200" rx="12" fill="url(#k8s-sch-aff)" opacity="0.92" />
      <text x="590" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">亲和性 / 反亲和性</text>
      <line x1="420" y1="85" x2="760" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="415" y="108" fontSize="10" fill="#cffafe">nodeAffinity: Pod → 选什么样的节点</text>
      <text x="415" y="126" fontSize="9" fill="#a5f3fc">  required(硬:不满足Pending) / preferred(软)</text>
      <text x="415" y="148" fontSize="10" fill="#cffafe">podAffinity: Pod → 靠近什么Pod</text>
      <text x="415" y="166" fontSize="9" fill="#a5f3fc">  如: cache Pod 和 app Pod 同节点</text>
      <text x="415" y="188" fontSize="10" fill="#cffafe">podAntiAffinity: Pod → 远离什么Pod</text>
      <text x="415" y="206" fontSize="9" fill="#a5f3fc">  如: web Pod 跨可用区分散(高可用)</text>
      <text x="415" y="228" fontSize="10" fontWeight="600" fill="#67e8f9">topologySpreadConstraints:</text>
      <text x="415" y="246" fontSize="9" fill="#a5f3fc">  maxSkew=1, topologyKey=zone (严格均匀分布)</text>

      {/* Taint/Toleration */}
      <rect x="20" y="265" width="370" height="130" rx="10" fill="url(#k8s-sch-taint)" opacity="0.9" />
      <text x="205" y="288" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Taint / Toleration (污点容忍)</text>
      <text x="205" y="308" textAnchor="middle" fontSize="10" fill="#fef3c7">Taint: 节点标记排斥Pod</text>
      <text x="205" y="326" textAnchor="middle" fontSize="10" fill="#fde68a">Toleration: Pod容忍特定污点</text>
      <text x="205" y="344" textAnchor="middle" fontSize="10" fill="#fde68a">gpu=true:NoSchedule → 只有容忍者能调度</text>
      <text x="205" y="362" textAnchor="middle" fontSize="10" fill="#fde68a">NoExecute: 驱逐已有不容忍的Pod</text>
      <text x="205" y="380" textAnchor="middle" fontSize="10" fill="#fcd34d">场景: GPU专用 / 节点维护 / 故障隔离</text>

      {/* 调度组合 */}
      <rect x="400" y="265" width="380" height="130" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="590" y="288" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">生产环境调度组合</text>
      <text x="590" y="310" textAnchor="middle" fontSize="10" fill="#475569">GPU任务: Taint + Toleration + nodeAffinity</text>
      <text x="590" y="328" textAnchor="middle" fontSize="10" fill="#475569">高可用: podAntiAffinity + topologyKey=zone</text>
      <text x="590" y="346" textAnchor="middle" fontSize="10" fill="#475569">均匀分布: topologySpread maxSkew=1</text>
      <text x="590" y="364" textAnchor="middle" fontSize="10" fill="#475569">优先级: PriorityClass + 抢占</text>
      <text x="590" y="384" textAnchor="middle" fontSize="10" fontWeight="600" fill="#64748b">Filter排除不满足 → Score选最优 → 绑定</text>

      {/* YAML 示例 */}
      <rect x="20" y="410" width="760" height="135" rx="10" fill="#0f172a" opacity="0.88" />
      <text x="400" y="432" textAnchor="middle" fontSize="11" fontWeight="600" fill="#94a3b8"># 调度配置（亲和性 + 污点容忍 + 拓扑分布）</text>
      <text x="35" y="452" fontSize="9" fill="#4ade80">spec:</text>
      <text x="35" y="466" fontSize="9" fill="#cbd5e1">  affinity:</text>
      <text x="35" y="480" fontSize="9" fill="#cbd5e1">    nodeAffinity:</text>
      <text x="35" y="494" fontSize="9" fill="#cbd5e1">      requiredDuringScheduling:</text>
      <text x="35" y="508" fontSize="9" fill="#cbd5e1">        nodeSelectorTerms: [&#123;matchExpressions: ...&#125;]</text>
      <text x="35" y="522" fontSize="9" fill="#cbd5e1">    podAntiAffinity:</text>
      <text x="35" y="536" fontSize="9" fill="#cbd5e1">      preferred: [&#123;weight:100, podAffinityTerm:&#123;...&#125;&#125;]</text>
      <text x="400" y="452" fontSize="9" fill="#4ade80">  tolerations:</text>
      <text x="400" y="466" fontSize="9" fill="#cbd5e1">  - key: "gpu"</text>
      <text x="400" y="480" fontSize="9" fill="#cbd5e1">    operator: "Equal"</text>
      <text x="400" y="494" fontSize="9" fill="#cbd5e1">    value: "true"</text>
      <text x="400" y="508" fontSize="9" fill="#cbd5e1">    effect: "NoSchedule"</text>
      <text x="400" y="522" fontSize="9" fill="#4ade80">  topologySpreadConstraints:</text>
      <text x="400" y="536" fontSize="9" fill="#cbd5e1">  - &#123;maxSkew:1, topologyKey:zone, ...&#125;</text>
    </svg>
  );
}
