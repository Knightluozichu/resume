"use client";

export function K8sSecurityOpsDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="RBAC权限控制、NetworkPolicy与运维体系">
      <defs>
        <linearGradient id="k8s-ops-rbac" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="k8s-ops-net" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="k8s-ops-obs" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">K8s 安全与运维体系</text>

      {/* RBAC */}
      <rect x="20" y="50" width="370" height="200" rx="12" fill="url(#k8s-ops-rbac)" opacity="0.92" />
      <text x="205" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">RBAC 权限控制</text>
      <line x1="40" y1="85" x2="370" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="35" y="108" fontSize="10" fill="#bfdbfe">Role: 命名空间级权限定义</text>
      <text x="35" y="126" fontSize="10" fill="#bfdbfe">ClusterRole: 集群级权限定义</text>
      <text x="35" y="144" fontSize="10" fill="#bfdbfe">RoleBinding: Role → ServiceAccount</text>
      <text x="35" y="162" fontSize="10" fill="#bfdbfe">ClusterRoleBinding: ClusterRole → SA</text>
      <text x="35" y="188" fontSize="10" fontWeight="600" fill="#93c5fd">verbs: get/list/watch/create/update/delete</text>
      <text x="35" y="210" fontSize="10" fill="#bfdbfe">ServiceAccount: Pod在K8s中的身份</text>
      <text x="35" y="228" fontSize="9" fill="#93c5fd">每应用独立SA, 不用default, 最小权限</text>
      <text x="35" y="246" fontSize="9" fill="#60a5fa">SecurityContext: runAsNonRoot + readOnlyFS</text>

      {/* NetworkPolicy */}
      <rect x="400" y="50" width="380" height="200" rx="12" fill="url(#k8s-ops-net)" opacity="0.92" />
      <text x="590" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">NetworkPolicy 网络隔离</text>
      <line x1="420" y1="85" x2="760" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="415" y="108" fontSize="10" fill="#cffafe">默认: 所有Pod可互访(无隔离)</text>
      <text x="415" y="126" fontSize="10" fill="#cffafe">选中Pod + Ingress策略 → 默认拒绝</text>
      <text x="415" y="144" fontSize="10" fill="#a5f3fc">只有规则允许的流量可入/出</text>
      <text x="415" y="168" fontSize="10" fontWeight="600" fill="#67e8f9">零信任示例:</text>
      <text x="415" y="186" fontSize="9" fill="#a5f3fc">postgres Pod: 只允许 app=backend 访问5432</text>
      <text x="415" y="204" fontSize="9" fill="#a5f3fc">frontend Pod: 只允许 ingress-nginx 访问80</text>
      <text x="415" y="228" fontSize="10" fontWeight="600" fill="#67e8f9">需要CNI支持:</text>
      <text x="415" y="246" fontSize="9" fill="#a5f3fc">Calico / Cilium / Weave Net (Flannel不支持)</text>

      {/* 可观测性 */}
      <rect x="20" y="265" width="370" height="130" rx="10" fill="url(#k8s-ops-obs)" opacity="0.9" />
      <text x="205" y="288" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">可观测性三大支柱</text>
      <text x="205" y="308" textAnchor="middle" fontSize="10" fill="#fef3c7">Metrics: Prometheus + Grafana (指标)</text>
      <text x="205" y="326" textAnchor="middle" fontSize="10" fill="#fde68a">Logs: Fluent Bit + ELK (日志聚合)</text>
      <text x="205" y="344" textAnchor="middle" fontSize="10" fill="#fde68a">Traces: Jaeger / OpenTelemetry (追踪)</text>
      <text x="205" y="362" textAnchor="middle" fontSize="10" fill="#fde68a">告警: AlertManager (CPU&gt;80%/Pod Failed)</text>
      <text x="205" y="380" textAnchor="middle" fontSize="10" fill="#fcd34d">优雅终止: preStop + gracePeriod 30s</text>

      {/* 运维实践 */}
      <rect x="400" y="265" width="380" height="130" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="590" y="288" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">生产运维最佳实践</text>
      <text x="590" y="310" textAnchor="middle" fontSize="10" fill="#475569">① 健康检查: liveness+readiness+startup</text>
      <text x="590" y="328" textAnchor="middle" fontSize="10" fill="#475569">② 资源管理: requests(P95) + limits(2x)</text>
      <text x="590" y="346" textAnchor="middle" fontSize="10" fill="#475569">③ 安全: RBAC + SecurityContext + NetPolicy</text>
      <text x="590" y="364" textAnchor="middle" fontSize="10" fill="#475569">④ PDB: 保证最少可用副本(维护期间)</text>
      <text x="590" y="384" textAnchor="middle" fontSize="10" fontWeight="600" fill="#64748b">⑤ GitOps: ArgoCD/Flux 声明式 + 滚动+金丝雀</text>

      {/* YAML 示例 */}
      <rect x="20" y="410" width="760" height="135" rx="10" fill="#0f172a" opacity="0.88" />
      <text x="400" y="432" textAnchor="middle" fontSize="11" fontWeight="600" fill="#94a3b8"># RBAC + NetworkPolicy 定义</text>
      <text x="35" y="452" fontSize="9" fill="#4ade80">kind: Role</text>
      <text x="35" y="466" fontSize="9" fill="#cbd5e1">rules:</text>
      <text x="35" y="480" fontSize="9" fill="#cbd5e1">- apiGroups: [""]</text>
      <text x="35" y="494" fontSize="9" fill="#cbd5e1">  resources: ["pods","pods/log"]</text>
      <text x="35" y="508" fontSize="9" fill="#cbd5e1">  verbs: ["get","list","watch"]</text>
      <text x="35" y="522" fontSize="9" fill="#4ade80">kind: RoleBinding</text>
      <text x="35" y="536" fontSize="9" fill="#cbd5e1">subjects: [&#123;kind:ServiceAccount, name:app-sa&#125;]</text>
      <text x="400" y="452" fontSize="9" fill="#4ade80">kind: NetworkPolicy</text>
      <text x="400" y="466" fontSize="9" fill="#cbd5e1">spec:</text>
      <text x="400" y="480" fontSize="9" fill="#cbd5e1">  podSelector:</text>
      <text x="400" y="494" fontSize="9" fill="#cbd5e1">    matchLabels: &#123; app: postgres &#125;</text>
      <text x="400" y="508" fontSize="9" fill="#cbd5e1">  policyTypes: [Ingress]</text>
      <text x="400" y="522" fontSize="9" fill="#cbd5e1">  ingress:</text>
      <text x="400" y="536" fontSize="9" fill="#cbd5e1">  - from: [&#123;podSelector:&#123;matchLabels:&#123;app:backend&#125;&#125;&#125;]</text>
    </svg>
  );
}
