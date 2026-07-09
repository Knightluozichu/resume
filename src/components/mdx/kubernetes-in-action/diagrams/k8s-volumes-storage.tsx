"use client";

export function K8sVolumesStorageDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="存储体系、PVPVC与StatefulSet">
      <defs>
        <linearGradient id="k8s-vol-vol" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="k8s-vol-pvc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="k8s-vol-sts" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="k8s-vol-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#475569" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">K8s 存储体系与 PV/PVC</text>

      {/* 存储三层 */}
      <rect x="20" y="50" width="370" height="200" rx="12" fill="url(#k8s-vol-vol)" opacity="0.92" />
      <text x="205" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">存储三层抽象</text>
      <line x1="40" y1="85" x2="370" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="35" y="108" fontSize="10" fill="#bfdbfe">Layer 1: Pod → Volume (直接挂载)</text>
      <text x="35" y="126" fontSize="9" fill="#93c5fd">  emptyDir(临时) / hostPath(节点) / configMap</text>
      <text x="35" y="148" fontSize="10" fill="#bfdbfe">Layer 2: Pod → PVC → PV (静态供给)</text>
      <text x="35" y="166" fontSize="9" fill="#93c5fd">  管理员预创建PV → PVC匹配绑定</text>
      <text x="35" y="188" fontSize="10" fill="#bfdbfe">Layer 3: Pod → PVC → StorageClass → PV</text>
      <text x="35" y="206" fontSize="9" fill="#93c5fd">  动态供给(按需创建PV)</text>
      <text x="35" y="230" fontSize="10" fontWeight="600" fill="#60a5fa">访问模式:</text>
      <text x="35" y="246" fontSize="9" fill="#93c5fd">  RWO(单节点读写) ROX(多节点只读) RWX(多节点读写)</text>

      {/* PV/PVC 生命周期 */}
      <rect x="400" y="50" width="380" height="200" rx="12" fill="url(#k8s-vol-pvc)" opacity="0.92" />
      <text x="590" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">PV/PVC 生命周期</text>
      <line x1="420" y1="85" x2="760" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="590" y="105" textAnchor="middle" fontSize="10" fill="#cffafe">PVC 创建 → 匹配 PV → 绑定(Bound)</text>
      <text x="590" y="125" textAnchor="middle" fontSize="10" fill="#a5f3fc">→ Pod 通过 PVC 挂载 → 使用</text>
      <text x="590" y="145" textAnchor="middle" fontSize="10" fill="#a5f3fc">→ Pod 删除 → PVC 删除 → PV 回收</text>
      <text x="590" y="170" textAnchor="middle" fontSize="10" fontWeight="600" fill="#67e8f9">回收策略:</text>
      <text x="590" y="188" textAnchor="middle" fontSize="9" fill="#a5f3fc">Retain: 保留数据(需手动清理)</text>
      <text x="590" y="206" textAnchor="middle" fontSize="9" fill="#a5f3fc">Delete: 自动删除PV和后端存储</text>
      <text x="590" y="228" textAnchor="middle" fontSize="10" fontWeight="600" fill="#67e8f9">StorageClass:</text>
      <text x="590" y="246" textAnchor="middle" fontSize="9" fill="#a5f3fc">provisioner自动创建PV + WaitForFirstConsumer</text>

      {/* StatefulSet */}
      <rect x="20" y="265" width="370" height="130" rx="10" fill="url(#k8s-vol-sts)" opacity="0.9" />
      <text x="205" y="288" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">StatefulSet 持久化存储</text>
      <text x="205" y="308" textAnchor="middle" fontSize="10" fill="#fef3c7">volumeClaimTemplates → 每Pod独立PVC</text>
      <text x="205" y="326" textAnchor="middle" fontSize="10" fill="#fde68a">db-0 → data-db-0 (PVC)</text>
      <text x="205" y="344" textAnchor="middle" fontSize="10" fill="#fde68a">db-1 → data-db-1 (PVC)</text>
      <text x="205" y="362" textAnchor="middle" fontSize="10" fill="#fde68a">Pod重建 → 绑定原PVC → 数据连续</text>
      <text x="205" y="380" textAnchor="middle" fontSize="10" fill="#fcd34d">有序名+稳定DNS+独立存储 = 有状态</text>

      {/* Volume 类型对比 */}
      <rect x="400" y="265" width="380" height="130" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="590" y="288" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">Volume 类型对比</text>
      <text x="590" y="310" textAnchor="middle" fontSize="10" fill="#475569">emptyDir: 随Pod销毁(临时共享)</text>
      <text x="590" y="328" textAnchor="middle" fontSize="10" fill="#475569">hostPath: 节点持久(不推荐生产)</text>
      <text x="590" y="346" textAnchor="middle" fontSize="10" fill="#475569">configMap/secret: 注入配置/敏感数据</text>
      <text x="590" y="364" textAnchor="middle" fontSize="10" fill="#475569">PVC: 持久化(独立于Pod)</text>
      <text x="590" y="384" textAnchor="middle" fontSize="10" fontWeight="600" fill="#64748b">CSI接口: K8s ←CSI→ AWS EBS/Ceph/NFS</text>

      {/* YAML 示例 */}
      <rect x="20" y="410" width="760" height="135" rx="10" fill="#0f172a" opacity="0.88" />
      <text x="400" y="432" textAnchor="middle" fontSize="11" fontWeight="600" fill="#94a3b8"># PVC + StatefulSet (动态供给)</text>
      <text x="35" y="452" fontSize="9" fill="#4ade80">apiVersion: v1</text>
      <text x="35" y="466" fontSize="9" fill="#4ade80">kind: PersistentVolumeClaim</text>
      <text x="35" y="480" fontSize="9" fill="#cbd5e1">spec:</text>
      <text x="35" y="494" fontSize="9" fill="#cbd5e1">  storageClassName: fast-ssd</text>
      <text x="35" y="508" fontSize="9" fill="#cbd5e1">  accessModes: [ReadWriteOnce]</text>
      <text x="35" y="522" fontSize="9" fill="#cbd5e1">  resources: &#123; requests: &#123; storage: 20Gi &#125; &#125;</text>
      <text x="35" y="536" fontSize="9" fill="#94a3b8"># StorageClass自动创建PV并绑定</text>
      <text x="400" y="452" fontSize="9" fill="#4ade80">kind: StatefulSet</text>
      <text x="400" y="466" fontSize="9" fill="#cbd5e1">spec:</text>
      <text x="400" y="480" fontSize="9" fill="#cbd5e1">  serviceName: db-svc</text>
      <text x="400" y="494" fontSize="9" fill="#cbd5e1">  replicas: 3</text>
      <text x="400" y="508" fontSize="9" fill="#4ade80">  volumeClaimTemplates:</text>
      <text x="400" y="522" fontSize="9" fill="#cbd5e1">  - metadata: &#123; name: data &#125;</text>
      <text x="400" y="536" fontSize="9" fill="#cbd5e1">    spec: &#123; storageClassName:fast-ssd, ... &#125;</text>
    </svg>
  );
}
