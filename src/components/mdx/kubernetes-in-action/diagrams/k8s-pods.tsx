"use client";

export function K8sPodsDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="Pod结构、容器共享与探针机制">
      <defs>
        <linearGradient id="k8s-pod-pod" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="k8s-pod-share" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="k8s-pod-probe" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="k8s-pod-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#475569" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Pod 结构与容器共享机制</text>

      {/* Pod 结构 */}
      <rect x="20" y="50" width="370" height="230" rx="12" fill="url(#k8s-pod-pod)" opacity="0.92" />
      <text x="205" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Pod (IP: 10.0.1.5)</text>
      <line x1="40" y1="85" x2="370" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <rect x="40" y="95" width="330" height="50" rx="6" fill="#fff" opacity="0.15" />
      <text x="205" y="115" textAnchor="middle" fontSize="11" fontWeight="600" fill="#93c5fd">pause 容器 (持有网络/IPC命名空间)</text>
      <text x="205" y="133" textAnchor="middle" fontSize="9" fill="#bfdbfe">基础设施容器 — Pod内其他容器加入其命名空间</text>
      <rect x="40" y="155" width="155" height="55" rx="6" fill="#fff" opacity="0.15" />
      <text x="117" y="175" textAnchor="middle" fontSize="10" fontWeight="600" fill="#93c5fd">nginx 容器</text>
      <text x="117" y="192" textAnchor="middle" fontSize="9" fill="#bfdbfe">监听 :80</text>
      <text x="117" y="205" textAnchor="middle" fontSize="9" fill="#bfdbfe">写日志 → emptyDir</text>
      <rect x="205" y="155" width="165" height="55" rx="6" fill="#fff" opacity="0.15" />
      <text x="287" y="175" textAnchor="middle" fontSize="10" fontWeight="600" fill="#93c5fd">log-sidecar 容器</text>
      <text x="287" y="192" textAnchor="middle" fontSize="9" fill="#bfdbfe">tail -f access.log</text>
      <text x="287" y="205" textAnchor="middle" fontSize="9" fill="#bfdbfe">localhost:80 访问nginx</text>
      <text x="205" y="265" textAnchor="middle" fontSize="10" fontWeight="600" fill="#60a5fa">共享: 网络命名空间(IP/端口) + emptyDir Volume</text>

      {/* 共享机制 */}
      <rect x="400" y="50" width="380" height="110" rx="10" fill="url(#k8s-pod-share)" opacity="0.92" />
      <text x="590" y="75" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">网络共享</text>
      <text x="590" y="95" textAnchor="middle" fontSize="10" fill="#cffafe">同一Pod所有容器 → 同一IP + 同一端口空间</text>
      <text x="590" y="113" textAnchor="middle" fontSize="10" fill="#a5f3fc">localhost 互访 (nginx:80 ← log容器)</text>
      <text x="590" y="131" textAnchor="middle" fontSize="10" fill="#67e8f9">⚠ 同Pod容器不能监听相同端口</text>
      <text x="590" y="150" textAnchor="middle" fontSize="10" fill="#67e8f9">pause容器持有命名空间 → 容器重启不丢IP</text>

      <rect x="400" y="170" width="380" height="110" rx="10" fill="url(#k8s-pod-share)" opacity="0.75" />
      <text x="590" y="195" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">存储共享</text>
      <text x="590" y="215" textAnchor="middle" fontSize="10" fill="#cffafe">Pod级volumes → 各容器volumeMounts挂载</text>
      <text x="590" y="233" textAnchor="middle" fontSize="10" fill="#a5f3fc">emptyDir: 随Pod销毁(临时共享)</text>
      <text x="590" y="251" textAnchor="middle" fontSize="10" fill="#a5f3fc">configMap: 注入配置文件</text>
      <text x="590" y="269" textAnchor="middle" fontSize="10" fill="#67e8f9">PVC: 持久化存储(独立于Pod)</text>

      {/* 探针 */}
      <rect x="20" y="295" width="370" height="100" rx="10" fill="url(#k8s-pod-probe)" opacity="0.9" />
      <text x="205" y="318" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">容器探针</text>
      <text x="205" y="338" textAnchor="middle" fontSize="10" fill="#fef3c7">livenessProbe: 存活检查 → 失败重启容器</text>
      <text x="205" y="356" textAnchor="middle" fontSize="10" fill="#fde68a">readinessProbe: 就绪检查 → 失败移出Endpoints</text>
      <text x="205" y="374" textAnchor="middle" fontSize="10" fill="#fde68a">startupProbe: 启动检查 → 成功前禁用其他探针</text>
      <text x="205" y="388" textAnchor="middle" fontSize="10" fill="#fcd34d">两种都要配: liveness防死锁 + readiness防未就绪</text>

      {/* 生命周期 */}
      <rect x="400" y="295" width="380" height="100" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="590" y="318" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">Pod 生命周期</text>
      <text x="590" y="340" textAnchor="middle" fontSize="10" fill="#475569">Pending → Running → Succeeded/Failed</text>
      <text x="590" y="358" textAnchor="middle" fontSize="10" fill="#475569">restartPolicy: Always(服务) / OnFailure(Job) / Never</text>
      <text x="590" y="376" textAnchor="middle" fontSize="10" fill="#475569">resources.requests=调度依据 limits=运行时上限</text>
      <text x="590" y="390" textAnchor="middle" fontSize="10" fontWeight="600" fill="#64748b">CPU超限→throttle 内存超限→OOMKilled</text>

      {/* YAML 示例 */}
      <rect x="20" y="410" width="760" height="135" rx="10" fill="#0f172a" opacity="0.88" />
      <text x="400" y="432" textAnchor="middle" fontSize="11" fontWeight="600" fill="#94a3b8"># Pod 定义示例（多容器 + 探针 + 资源限制）</text>
      <text x="35" y="452" fontSize="9" fill="#4ade80">spec:</text>
      <text x="35" y="466" fontSize="9" fill="#cbd5e1">  containers:</text>
      <text x="35" y="480" fontSize="9" fill="#cbd5e1">  - name: nginx</text>
      <text x="35" y="494" fontSize="9" fill="#cbd5e1">    image: nginx:1.25</text>
      <text x="35" y="508" fontSize="9" fill="#cbd5e1">    livenessProbe:</text>
      <text x="35" y="522" fontSize="9" fill="#cbd5e1">      httpGet: &#123; path: /health, port: 8080 &#125;</text>
      <text x="35" y="536" fontSize="9" fill="#cbd5e1">    resources: &#123; requests: &#123;cpu:100m&#125;, limits: &#123;cpu:200m&#125; &#125;</text>
      <text x="400" y="452" fontSize="9" fill="#4ade80">  - name: log-sidecar</text>
      <text x="400" y="466" fontSize="9" fill="#cbd5e1">    image: busybox:1.36</text>
      <text x="400" y="480" fontSize="9" fill="#cbd5e1">    command: ["sh","-c","tail -f /log/access.log"]</text>
      <text x="400" y="494" fontSize="9" fill="#cbd5e1">    volumeMounts:</text>
      <text x="400" y="508" fontSize="9" fill="#cbd5e1">    - &#123; name: log-vol, mountPath: /log &#125;</text>
      <text x="400" y="522" fontSize="9" fill="#4ade80">  volumes:</text>
      <text x="400" y="536" fontSize="9" fill="#cbd5e1">  - &#123; name: log-vol, emptyDir: &#123;&#125; &#125;</text>
    </svg>
  );
}
