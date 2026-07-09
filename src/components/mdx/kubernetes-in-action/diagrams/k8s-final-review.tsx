"use client";

export function K8sFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="Kubernetes全书知识图谱串联与四主线交汇">
      <defs>
        <linearGradient id="k8s-fr-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="k8s-fr-work" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="k8s-fr-net" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="k8s-fr-ops" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="k8s-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">K8s 全书知识图谱串联</text>

      {/* 四部分回顾 */}
      <rect x="20" y="50" width="185" height="160" rx="12" fill="url(#k8s-fr-base)" opacity="0.95" />
      <text x="112" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">基础入门</text>
      <line x1="35" y1="85" x2="190" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="112" y="107" textAnchor="middle" fontSize="10" fill="#bfdbfe">容器编排定义</text>
      <text x="112" y="125" textAnchor="middle" fontSize="10" fill="#bfdbfe">K8s 架构(控制面/数据面)</text>
      <text x="112" y="143" textAnchor="middle" fontSize="10" fill="#bfdbfe">声明式 API</text>
      <text x="112" y="161" textAnchor="middle" fontSize="10" fill="#bfdbfe">Reconcile 循环</text>
      <text x="112" y="190" textAnchor="middle" fontSize="10" fill="#60a5fa">为什么需要 K8s</text>

      <rect x="215" y="50" width="185" height="160" rx="12" fill="url(#k8s-fr-work)" opacity="0.95" />
      <text x="307" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">工作负载</text>
      <line x1="230" y1="85" x2="385" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="307" y="107" textAnchor="middle" fontSize="10" fill="#cffafe">Pod / 容器共享</text>
      <text x="307" y="125" textAnchor="middle" fontSize="10" fill="#cffafe">探针(liveness/readiness)</text>
      <text x="307" y="143" textAnchor="middle" fontSize="10" fill="#cffafe">Deployment 滚动更新</text>
      <text x="307" y="161" textAnchor="middle" fontSize="10" fill="#cffafe">HPA 自动扩缩</text>
      <text x="307" y="190" textAnchor="middle" fontSize="10" fill="#67e8f9">应用怎么跑</text>

      <rect x="410" y="50" width="185" height="160" rx="12" fill="url(#k8s-fr-net)" opacity="0.95" />
      <text x="502" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">网络与存储</text>
      <line x1="425" y1="85" x2="580" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="502" y="107" textAnchor="middle" fontSize="10" fill="#fef3c7">Service / Endpoints</text>
      <text x="502" y="125" textAnchor="middle" fontSize="10" fill="#fef3c7">Ingress / CoreDNS</text>
      <text x="502" y="143" textAnchor="middle" fontSize="10" fill="#fef3c7">PV/PVC/StorageClass</text>
      <text x="502" y="161" textAnchor="middle" fontSize="10" fill="#fef3c7">ConfigMap / Secret</text>
      <text x="502" y="190" textAnchor="middle" fontSize="10" fill="#fcd34d">怎么通信持久化</text>

      <rect x="605" y="50" width="175" height="160" rx="12" fill="url(#k8s-fr-ops)" opacity="0.95" />
      <text x="692" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">调度与运维</text>
      <line x1="620" y1="85" x2="765" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="692" y="107" textAnchor="middle" fontSize="10" fill="#ede9fe">亲和性 / 污点容忍</text>
      <text x="692" y="125" textAnchor="middle" fontSize="10" fill="#ede9fe">RBAC / NetworkPolicy</text>
      <text x="692" y="143" textAnchor="middle" fontSize="10" fill="#ede9fe">SecurityContext</text>
      <text x="692" y="161" textAnchor="middle" fontSize="10" fill="#ede9fe">监控 / 日志 / 追踪</text>
      <text x="692" y="190" textAnchor="middle" fontSize="10" fill="#c4b5fd">怎么调度运维</text>

      {/* 四个交汇点 */}
      <text x="400" y="240" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">四主线交汇点</text>

      <rect x="20" y="255" width="185" height="95" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="112" y="278" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1d4ed8">Pod-Service-Endpoints</text>
      <text x="112" y="298" textAnchor="middle" fontSize="9" fill="#1e40af">工作负载 ↔ 网络通信</text>
      <text x="112" y="316" textAnchor="middle" fontSize="9" fill="#1e40af">Pod由标签被Service选中</text>
      <text x="112" y="334" textAnchor="middle" fontSize="9" fill="#1e40af">readinessProbe控制EP</text>
      <text x="112" y="346" textAnchor="middle" fontSize="9" fill="#1d4ed8">服务发现枢纽</text>

      <rect x="215" y="255" width="185" height="95" rx="10" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="307" y="278" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0e7490">Pod-Volume-PVC</text>
      <text x="307" y="298" textAnchor="middle" fontSize="9" fill="#155e75">工作负载 ↔ 存储配置</text>
      <text x="307" y="316" textAnchor="middle" fontSize="9" fill="#155e75">Pod通过PVC挂载PV</text>
      <text x="307" y="334" textAnchor="middle" fontSize="9" fill="#155e75">StatefulSet独立PVC</text>
      <text x="307" y="346" textAnchor="middle" fontSize="9" fill="#0e7490">数据持久化路径</text>

      <rect x="410" y="255" width="185" height="95" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="502" y="278" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400e">Deploy-Sched-Node</text>
      <text x="502" y="298" textAnchor="middle" fontSize="9" fill="#78350f">工作负载 ↔ 调度运维</text>
      <text x="502" y="316" textAnchor="middle" fontSize="9" fill="#78350f">Deployment创建Pod</text>
      <text x="502" y="334" textAnchor="middle" fontSize="9" fill="#78350f">Scheduler分配节点</text>
      <text x="502" y="346" textAnchor="middle" fontSize="9" fill="#92400e">调度决策链路</text>

      <rect x="605" y="255" width="175" height="95" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="692" y="278" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6d28d9">Secret-RBAC-NetPol</text>
      <text x="692" y="298" textAnchor="middle" fontSize="9" fill="#5b21b6">存储配置 ↔ 调度运维</text>
      <text x="692" y="316" textAnchor="middle" fontSize="9" fill="#5b21b6">Secret管敏感数据</text>
      <text x="692" y="334" textAnchor="middle" fontSize="9" fill="#5b21b6">RBAC+NetPolicy隔离</text>
      <text x="692" y="346" textAnchor="middle" fontSize="9" fill="#6d28d9">安全治理体系</text>

      {/* 全链路 */}
      <rect x="20" y="365" width="760" height="200" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="388" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">全链路：从 kubectl apply 到 Pod 可访问</text>
      <text x="400" y="411" textAnchor="middle" fontSize="10" fill="#475569">kubectl apply → API Server(认证/授权/准入) → etcd</text>
      <text x="400" y="429" textAnchor="middle" fontSize="10" fill="#475569">→ Deployment Controller → ReplicaSet → Pod(nodeName空)</text>
      <text x="400" y="447" textAnchor="middle" fontSize="10" fill="#475569">→ Scheduler(Filter+Score) → 绑定节点 → kubelet</text>
      <text x="400" y="465" textAnchor="middle" fontSize="10" fill="#475569">→ CRI启动容器 + CNI配置网络 + CSI挂载存储</text>
      <text x="400" y="483" textAnchor="middle" fontSize="10" fill="#475569">→ readinessProbe通过 → Endpoints加入 → kube-proxy更新</text>
      <text x="400" y="501" textAnchor="middle" fontSize="10" fill="#475569">→ Client → CoreDNS解析 → ClusterIP → iptables DNAT → Pod</text>
      <text x="400" y="528" textAnchor="middle" fontSize="11" fontWeight="600" fill="#64748b">K8s = 声明式API + 控制器Reconcile + Pod调度 + Service发现 + 多模式存储 + RBAC安全</text>
      <text x="400" y="550" textAnchor="middle" fontSize="11" fill="#64748b">设计哲学：以声明式API为核心，控制器收敛实际状态，分层架构实现可扩展编排</text>
    </svg>
  );
}
