"use client";

export function K8sContainerOrchestrationDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="Kubernetes架构与控制面数据面组件">
      <defs>
        <linearGradient id="k8s-co-cp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="k8s-co-dp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="k8s-co-flow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="k8s-co-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#475569" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Kubernetes 架构全景</text>

      {/* 控制面 */}
      <rect x="20" y="50" width="370" height="230" rx="12" fill="url(#k8s-co-cp)" opacity="0.92" />
      <text x="205" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">控制面 (Control Plane)</text>
      <line x1="40" y1="85" x2="370" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="35" y="108" fontSize="10" fill="#bfdbfe">API Server: 唯一入口, RESTful API</text>
      <text x="35" y="128" fontSize="10" fill="#bfdbfe">  认证/授权/准入 → 写入 etcd</text>
      <text x="35" y="148" fontSize="10" fill="#bfdbfe">etcd: 分布式KV存储, Raft一致性</text>
      <text x="35" y="168" fontSize="10" fill="#bfdbfe">  集群状态的单一事实来源</text>
      <text x="35" y="188" fontSize="10" fill="#bfdbfe">Scheduler: Pod调度决策</text>
      <text x="35" y="208" fontSize="10" fill="#bfdbfe">  Filter(过滤) → Score(打分) → 绑定节点</text>
      <text x="35" y="228" fontSize="10" fill="#bfdbfe">Controller Manager: 运行所有控制器</text>
      <text x="35" y="248" fontSize="10" fill="#bfdbfe">  Deployment/ReplicaSet/Node Controller</text>
      <text x="205" y="272" textAnchor="middle" fontSize="10" fontWeight="600" fill="#93c5fd">Watch + Reconcile 循环</text>

      {/* 数据面 */}
      <rect x="400" y="50" width="380" height="230" rx="12" fill="url(#k8s-co-dp)" opacity="0.92" />
      <text x="590" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">数据面 (Worker Node)</text>
      <line x1="420" y1="85" x2="760" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="415" y="108" fontSize="10" fill="#cffafe">kubelet: Pod生命周期管理</text>
      <text x="415" y="128" fontSize="10" fill="#cffafe">  Watch API Server → 调用CRI启动容器</text>
      <text x="415" y="148" fontSize="10" fill="#cffafe">kube-proxy: 维护网络规则</text>
      <text x="415" y="168" fontSize="10" fill="#cffafe">  iptables/IPVS → Service负载均衡</text>
      <text x="415" y="188" fontSize="10" fill="#cffafe">容器运行时 (CRI):</text>
      <text x="415" y="208" fontSize="10" fill="#cffafe">  containerd / CRI-O / Docker</text>
      <text x="415" y="228" fontSize="10" fill="#cffafe">CNI: Flannel/Calico/Cilium</text>
      <text x="415" y="248" fontSize="10" fill="#cffafe">  Pod网络/网络策略</text>
      <text x="590" y="272" textAnchor="middle" fontSize="10" fontWeight="600" fill="#67e8f9">执行层 — 运行容器 + 维护网络</text>

      {/* 声明式流程 */}
      <rect x="20" y="295" width="370" height="100" rx="10" fill="url(#k8s-co-flow)" opacity="0.9" />
      <text x="205" y="318" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">声明式 API 工作流</text>
      <text x="205" y="338" textAnchor="middle" fontSize="10" fill="#fef3c7">用户: replicas: 3 (YAML)</text>
      <text x="205" y="356" textAnchor="middle" fontSize="10" fill="#fde68a">→ API Server → etcd → Controller Watch</text>
      <text x="205" y="374" textAnchor="middle" fontSize="10" fill="#fde68a">→ Reconcile(期望3 vs 实际1) → 创建Pod</text>
      <text x="205" y="388" textAnchor="middle" fontSize="10" fill="#fcd34d">Pod故障 → 自动重建 → 最终一致</text>

      {/* 资源对象 */}
      <rect x="400" y="295" width="380" height="100" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="590" y="318" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">核心资源对象</text>
      <text x="590" y="340" textAnchor="middle" fontSize="10" fill="#475569">Pod(最小调度) → Deployment(副本管理)</text>
      <text x="590" y="358" textAnchor="middle" fontSize="10" fill="#475569">→ Service(网络) → ConfigMap/Secret(配置)</text>
      <text x="590" y="376" textAnchor="middle" fontSize="10" fill="#475569">→ PV/PVC(存储) → Ingress(七层路由)</text>
      <text x="590" y="390" textAnchor="middle" fontSize="10" fontWeight="600" fill="#64748b">声明式YAML → 控制器Reconcile → 最终一致</text>

      {/* kubectl 命令 */}
      <rect x="20" y="410" width="760" height="135" rx="10" fill="#0f172a" opacity="0.88" />
      <text x="400" y="432" textAnchor="middle" fontSize="11" fontWeight="600" fill="#94a3b8"># kubectl 核心命令</text>
      <text x="35" y="452" fontSize="10" fill="#4ade80">kubectl apply -f deployment.yaml</text>
      <text x="35" y="468" fontSize="9" fill="#94a3b8"># 声明式创建/更新资源（幂等）</text>
      <text x="35" y="488" fontSize="10" fill="#4ade80">kubectl get pods -o wide</text>
      <text x="35" y="504" fontSize="9" fill="#94a3b8"># 查看 Pod（含节点和IP）</text>
      <text x="35" y="524" fontSize="10" fill="#4ade80">kubectl rollout undo deployment/web</text>
      <text x="35" y="538" fontSize="9" fill="#94a3b8"># 回滚到上一版本</text>
      <text x="400" y="452" fontSize="10" fill="#4ade80">kubectl describe pod nginx</text>
      <text x="400" y="468" fontSize="9" fill="#94a3b8"># 查看 Pod 详情（事件/探针/状态）</text>
      <text x="400" y="488" fontSize="10" fill="#4ade80">kubectl logs -f pod/web --tail=100</text>
      <text x="400" y="504" fontSize="9" fill="#94a3b8"># 实时查看日志</text>
      <text x="400" y="524" fontSize="10" fill="#4ade80">kubectl exec -it pod/web -- /bin/sh</text>
      <text x="400" y="538" fontSize="9" fill="#94a3b8"># 进入容器调试</text>
    </svg>
  );
}
