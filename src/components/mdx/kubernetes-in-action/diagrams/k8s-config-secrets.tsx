"use client";

export function K8sConfigSecretsDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="ConfigMap与Secret配置注入">
      <defs>
        <linearGradient id="k8s-cfg-cm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="k8s-cfg-sec" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="k8s-cfg-inj" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">ConfigMap 与 Secret 配置注入</text>

      {/* ConfigMap */}
      <rect x="20" y="50" width="370" height="200" rx="12" fill="url(#k8s-cfg-cm)" opacity="0.92" />
      <text x="205" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">ConfigMap (非敏感配置)</text>
      <line x1="40" y1="85" x2="370" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="35" y="108" fontSize="10" fill="#bfdbfe">明文存储键值对 / 配置文件</text>
      <text x="35" y="126" fontSize="10" fill="#bfdbfe">data:</text>
      <text x="35" y="144" fontSize="9" fill="#93c5fd">  LOG_LEVEL: "debug"</text>
      <text x="35" y="162" fontSize="9" fill="#93c5fd">  MAX_CONN: "100"</text>
      <text x="35" y="180" fontSize="9" fill="#93c5fd">  nginx.conf: |</text>
      <text x="35" y="198" fontSize="9" fill="#93c5fd">    server &#123; listen 80; ... &#125;</text>
      <text x="35" y="225" textAnchor="start" fontSize="10" fontWeight="600" fill="#60a5fa">注入方式: env / envFrom / Volume</text>
      <text x="35" y="243" fontSize="9" fill="#93c5fd">同一镜像 + 不同ConfigMap = 多环境部署</text>

      {/* Secret */}
      <rect x="400" y="50" width="380" height="200" rx="12" fill="url(#k8s-cfg-sec)" opacity="0.92" />
      <text x="590" y="75" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">Secret (敏感数据)</text>
      <line x1="420" y1="85" x2="760" y2="85" stroke="#fff" strokeWidth="1" opacity="0.4" />
      <text x="415" y="108" fontSize="10" fill="#cffafe">Base64 编码 (非加密!)</text>
      <text x="415" y="126" fontSize="10" fill="#cffafe">type: Opaque / TLS / dockerconfigjson</text>
      <text x="415" y="148" fontSize="10" fill="#a5f3fc">data:</text>
      <text x="415" y="166" fontSize="9" fill="#a5f3fc">  username: YWRtaW4= (admin)</text>
      <text x="415" y="184" fontSize="9" fill="#a5f3fc">  password: cGFzczEyMw== (pass123)</text>
      <text x="415" y="210" fontSize="10" fontWeight="600" fill="#67e8f9">⚠ Base64可解码 → 需额外加密</text>
      <text x="415" y="228" fontSize="9" fill="#a5f3fc">① etcd静态加密 (EncryptionConfiguration)</text>
      <text x="415" y="246" fontSize="9" fill="#a5f3fc">② 外部密钥管理 (Vault / KMS / Sealed Secrets)</text>

      {/* 注入方式对比 */}
      <rect x="20" y="265" width="370" height="130" rx="10" fill="url(#k8s-cfg-inj)" opacity="0.9" />
      <text x="205" y="288" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">环境变量注入</text>
      <text x="205" y="308" textAnchor="middle" fontSize="10" fill="#fef3c7">env / envFrom → 容器环境变量</text>
      <text x="205" y="326" textAnchor="middle" fontSize="10" fill="#fde68a">优点: 简单, getenv直接读取</text>
      <text x="205" y="344" textAnchor="middle" fontSize="10" fill="#fde68a">缺点: 不支持热更新(需重启Pod)</text>
      <text x="205" y="362" textAnchor="middle" fontSize="10" fill="#fde68a">缺点: 只支持扁平键值对</text>
      <text x="205" y="380" textAnchor="middle" fontSize="10" fill="#fcd34d">适用: 简单配置 + 不需热更新</text>

      {/* Volume 挂载 */}
      <rect x="400" y="265" width="380" height="130" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="590" y="288" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">Volume 挂载</text>
      <text x="590" y="310" textAnchor="middle" fontSize="10" fill="#475569">configMap/secret → 挂载为文件</text>
      <text x="590" y="328" textAnchor="middle" fontSize="10" fill="#475569">优点: 支持热更新(约1分钟自动更新)</text>
      <text x="590" y="346" textAnchor="middle" fontSize="10" fill="#475569">优点: 支持配置文件(nginx.conf/yml)</text>
      <text x="590" y="364" textAnchor="middle" fontSize="10" fill="#475569">缺点: 应用需支持文件变化重载</text>
      <text x="590" y="384" textAnchor="middle" fontSize="10" fontWeight="600" fill="#64748b">适用: 配置文件 + 需要热更新</text>

      {/* YAML 示例 */}
      <rect x="20" y="410" width="760" height="135" rx="10" fill="#0f172a" opacity="0.88" />
      <text x="400" y="432" textAnchor="middle" fontSize="11" fontWeight="600" fill="#94a3b8"># ConfigMap 注入（环境变量 + Volume）</text>
      <text x="35" y="452" fontSize="9" fill="#4ade80">spec:</text>
      <text x="35" y="466" fontSize="9" fill="#cbd5e1">  containers:</text>
      <text x="35" y="480" fontSize="9" fill="#cbd5e1">  - name: app</text>
      <text x="35" y="494" fontSize="9" fill="#cbd5e1">    env:</text>
      <text x="35" y="508" fontSize="9" fill="#cbd5e1">    - name: LOG_LEVEL</text>
      <text x="35" y="522" fontSize="9" fill="#cbd5e1">      valueFrom: &#123; configMapKeyRef: &#123; name:app-cfg, key:LOG_LEVEL &#125; &#125;</text>
      <text x="35" y="536" fontSize="9" fill="#94a3b8"># 环境变量: 启动注入, 不支持热更新</text>
      <text x="400" y="452" fontSize="9" fill="#4ade80">    volumeMounts:</text>
      <text x="400" y="466" fontSize="9" fill="#cbd5e1">    - name: cfg-vol</text>
      <text x="400" y="480" fontSize="9" fill="#cbd5e1">      mountPath: /etc/nginx/nginx.conf</text>
      <text x="400" y="494" fontSize="9" fill="#cbd5e1">      subPath: nginx.conf</text>
      <text x="400" y="508" fontSize="9" fill="#4ade80">  volumes:</text>
      <text x="400" y="522" fontSize="9" fill="#cbd5e1">  - name: cfg-vol</text>
      <text x="400" y="536" fontSize="9" fill="#cbd5e1">    configMap: &#123; name: app-cfg &#125;</text>
    </svg>
  );
}
