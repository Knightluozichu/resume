"use client";

export function K8sLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="Kubernetes in Action全书学习地图">
      <defs>
        <linearGradient id="k8s-lm-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="k8s-lm-work" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="k8s-lm-net" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="k8s-lm-ops" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <marker id="k8s-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Kubernetes in Action · 知识体系全景</text>

      {/* 第一部分：基础入门 */}
      <rect x="20" y="50" width="185" height="180" rx="12" fill="url(#k8s-lm-base)" opacity="0.95" />
      <text x="112" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">基础入门</text>
      <line x1="35" y1="85" x2="190" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="112" y="107" textAnchor="middle" fontSize="11" fill="#bfdbfe">容器编排 / K8s架构</text>
      <text x="112" y="127" textAnchor="middle" fontSize="11" fill="#bfdbfe">控制面 / 数据面</text>
      <text x="112" y="153" textAnchor="middle" fontSize="10" fill="#93c5fd">声明式 API</text>
      <text x="112" y="173" textAnchor="middle" fontSize="10" fill="#93c5fd">Reconcile 循环</text>
      <text x="112" y="205" textAnchor="middle" fontSize="10" fill="#60a5fa">入门 · 地基</text>

      {/* 第二部分：工作负载 */}
      <rect x="215" y="50" width="185" height="180" rx="12" fill="url(#k8s-lm-work)" opacity="0.95" />
      <text x="307" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">工作负载</text>
      <line x1="230" y1="85" x2="385" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="307" y="107" textAnchor="middle" fontSize="11" fill="#cffafe">Pod / 容器共享</text>
      <text x="307" y="127" textAnchor="middle" fontSize="11" fill="#cffafe">Deployment / ReplicaSet</text>
      <text x="307" y="153" textAnchor="middle" fontSize="10" fill="#a5f3fc">探针 / 滚动更新</text>
      <text x="307" y="173" textAnchor="middle" fontSize="10" fill="#a5f3fc">HPA 自动扩缩</text>
      <text x="307" y="205" textAnchor="middle" fontSize="10" fill="#67e8f9">基础 · 核心</text>

      {/* 第三部分：网络与存储 */}
      <rect x="410" y="50" width="185" height="180" rx="12" fill="url(#k8s-lm-net)" opacity="0.95" />
      <text x="502" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">网络与存储</text>
      <line x1="425" y1="85" x2="580" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="502" y="107" textAnchor="middle" fontSize="11" fill="#fef3c7">Service / Endpoints</text>
      <text x="502" y="127" textAnchor="middle" fontSize="11" fill="#fef3c7">Ingress / CoreDNS</text>
      <text x="502" y="153" textAnchor="middle" fontSize="10" fill="#fde68a">PV / PVC / StorageClass</text>
      <text x="502" y="173" textAnchor="middle" fontSize="10" fill="#fde68a">ConfigMap / Secret</text>
      <text x="502" y="205" textAnchor="middle" fontSize="10" fill="#fcd34d">中级 · 实战</text>

      {/* 第四部分：调度与运维 */}
      <rect x="605" y="50" width="175" height="180" rx="12" fill="url(#k8s-lm-ops)" opacity="0.95" />
      <text x="692" y="75" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">调度与运维</text>
      <line x1="620" y1="85" x2="765" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="692" y="107" textAnchor="middle" fontSize="11" fill="#ede9fe">亲和性 / 污点容忍</text>
      <text x="692" y="127" textAnchor="middle" fontSize="11" fill="#ede9fe">RBAC / NetworkPolicy</text>
      <text x="692" y="153" textAnchor="middle" fontSize="10" fill="#ddd6fe">监控 / 日志 / 追踪</text>
      <text x="692" y="173" textAnchor="middle" fontSize="10" fill="#ddd6fe">SecurityContext</text>
      <text x="692" y="205" textAnchor="middle" fontSize="10" fill="#c4b5fd">高级 · 生产级</text>

      {/* Arrows */}
      <path d="M205 140 L215 140" stroke="#64748b" strokeWidth="2" markerEnd="url(#k8s-lm-arrow)" />
      <path d="M400 140 L410 140" stroke="#64748b" strokeWidth="2" markerEnd="url(#k8s-lm-arrow)" />
      <path d="M595 140 L605 140" stroke="#64748b" strokeWidth="2" markerEnd="url(#k8s-lm-arrow)" />

      {/* 四条核心主线 */}
      <text x="400" y="265" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">四条核心主线</text>

      <rect x="20" y="280" width="185" height="100" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
      <text x="112" y="303" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1d4ed8">主线一：工作负载</text>
      <text x="112" y="323" textAnchor="middle" fontSize="10" fill="#1e40af">Pod → Deployment</text>
      <text x="112" y="343" textAnchor="middle" fontSize="10" fill="#1e40af">→ ReplicaSet → Job</text>
      <text x="112" y="367" textAnchor="middle" fontSize="10" fill="#1d4ed8">回答「应用怎么跑」</text>

      <rect x="215" y="280" width="185" height="100" rx="10" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
      <text x="307" y="303" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0e7490">主线二：网络通信</text>
      <text x="307" y="323" textAnchor="middle" fontSize="10" fill="#155e75">Service → Endpoints</text>
      <text x="307" y="343" textAnchor="middle" fontSize="10" fill="#155e75">→ DNS → Ingress</text>
      <text x="307" y="367" textAnchor="middle" fontSize="10" fill="#0e7490">回答「服务怎么发现」</text>

      <rect x="410" y="280" width="185" height="100" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="502" y="303" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400e">主线三：存储配置</text>
      <text x="502" y="323" textAnchor="middle" fontSize="10" fill="#78350f">Volume → PV → PVC</text>
      <text x="502" y="343" textAnchor="middle" fontSize="10" fill="#78350f">→ StorageClass</text>
      <text x="502" y="367" textAnchor="middle" fontSize="10" fill="#92400e">回答「数据怎么持久化」</text>

      <rect x="605" y="280" width="175" height="100" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="692" y="303" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6d28d9">主线四：调度运维</text>
      <text x="692" y="323" textAnchor="middle" fontSize="10" fill="#5b21b6">Scheduler → Affinity</text>
      <text x="692" y="343" textAnchor="middle" fontSize="10" fill="#5b21b6">→ RBAC → NetPolicy</text>
      <text x="692" y="367" textAnchor="middle" fontSize="10" fill="#6d28d9">回答「怎么调度运维」</text>

      {/* 学习路径 */}
      <rect x="20" y="395" width="760" height="170" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="418" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">推荐学习路径（从基础入门 → 工作负载 → 网络与存储 → 调度与运维 → 全书整合）</text>
      <text x="400" y="441" textAnchor="middle" fontSize="11" fill="#475569">① 基础入门（容器编排定义/K8s架构/控制面数据面）→ ② 工作负载（Pod/Deployment/探针/HPA）</text>
      <text x="400" y="461" textAnchor="middle" fontSize="11" fill="#475569">→ ③ 网络与存储（Service/Endpoints/Ingress/PV-PVC/ConfigMap-Secret）→ ④ 调度与运维（亲和性/污点/RBAC/NetworkPolicy）</text>
      <text x="400" y="481" textAnchor="middle" fontSize="11" fill="#475569">→ ⑤ 全书复习整合</text>
      <text x="400" y="510" textAnchor="middle" fontSize="11" fill="#64748b">四主线在「Pod-Service-Endpoints」（工作负载↔网络通信）与「Pod-Volume-PVC」（工作负载↔存储配置）处交汇</text>
      <text x="400" y="530" textAnchor="middle" fontSize="11" fill="#64748b">K8s = 声明式API + 控制器Reconcile + Pod调度 + Service发现 + 多模式存储 + RBAC安全</text>
      <text x="400" y="550" textAnchor="middle" fontSize="11" fill="#64748b">核心设计哲学：以声明式API为核心，通过控制器模式收敛实际状态，通过分层架构实现可扩展编排</text>
    </svg>
  );
}
