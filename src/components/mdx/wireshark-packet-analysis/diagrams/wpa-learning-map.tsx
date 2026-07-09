"use client";

export function WpaLearningMapDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="Wireshark数据包分析实战全书学习地图">
      <defs>
        <linearGradient id="wpa-lm-fund" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="wpa-lm-capture" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="wpa-lm-proto" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="wpa-lm-app" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="wpa-lm-sec" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <linearGradient id="wpa-lm-review" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="wpa-lm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">Wireshark 数据包分析 · 知识体系全景</text>

      {/* 左侧：五大知识域 */}
      <text x="140" y="60" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">五大知识域</text>

      <rect x="20" y="72" width="240" height="84" rx="10" fill="url(#wpa-lm-fund)" opacity="0.95" />
      <text x="140" y="98" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">域一：工具基础</text>
      <text x="140" y="118" textAnchor="middle" fontSize="11" fill="#bfdbfe">学习地图 → Wireshark基础</text>
      <text x="140" y="136" textAnchor="middle" fontSize="10" fill="#60a5fa">解决：工具怎么用、界面怎么看</text>
      <text x="140" y="150" textAnchor="middle" fontSize="10" fill="#60a5fa">核心：界面布局 / 抓包流程</text>

      <rect x="20" y="166" width="240" height="84" rx="10" fill="url(#wpa-lm-capture)" opacity="0.95" />
      <text x="140" y="192" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">域二：过滤技术</text>
      <text x="140" y="212" textAnchor="middle" fontSize="11" fill="#cffafe">捕获过滤器 → 显示过滤器</text>
      <text x="140" y="230" textAnchor="middle" fontSize="10" fill="#67e8f9">解决：怎么精准捕获和筛选</text>
      <text x="140" y="244" textAnchor="middle" fontSize="10" fill="#67e8f9">核心：BPF语法 / 显示表达式</text>

      <rect x="20" y="260" width="240" height="84" rx="10" fill="url(#wpa-lm-proto)" opacity="0.95" />
      <text x="140" y="286" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">域三：协议分析</text>
      <text x="140" y="306" textAnchor="middle" fontSize="11" fill="#e9d5ff">以太网IP → TCP/UDP → HTTP → DNS/DHCP</text>
      <text x="140" y="324" textAnchor="middle" fontSize="10" fill="#c4b5fd">解决：各层协议怎么拆解</text>
      <text x="140" y="338" textAnchor="middle" fontSize="10" fill="#c4b5fd">核心：帧结构 / 包头 / 握手 / 应用层</text>

      <rect x="20" y="354" width="240" height="84" rx="10" fill="url(#wpa-lm-sec)" opacity="0.95" />
      <text x="140" y="380" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">域四：安全检测</text>
      <text x="140" y="400" textAnchor="middle" fontSize="11" fill="#fecaca">网络安全与异常检测</text>
      <text x="140" y="418" textAnchor="middle" fontSize="10" fill="#fca5a5">解决：怎么发现异常和攻击</text>
      <text x="140" y="432" textAnchor="middle" fontSize="10" fill="#fca5a5">核心：扫描 / 洪泛 / 入侵识别</text>

      <rect x="20" y="448" width="240" height="84" rx="10" fill="url(#wpa-lm-review)" opacity="0.95" />
      <text x="140" y="474" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">域五：知识整合</text>
      <text x="140" y="494" textAnchor="middle" fontSize="11" fill="#bbf7d0">全书复习与知识整合</text>
      <text x="140" y="512" textAnchor="middle" fontSize="10" fill="#86efac">解决：全书知识怎么串联</text>
      <text x="140" y="526" textAnchor="middle" fontSize="10" fill="#86efac">核心：端到端分析 / 知识网络</text>

      {/* 右侧：数据包分析流程 */}
      <text x="540" y="60" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">数据包分析流程</text>

      <rect x="300" y="72" width="480" height="44" rx="8" fill="url(#wpa-lm-fund)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="320" y="99" fontSize="12" fontWeight="600" fill="#1e40af">1. 启动抓包</text>
      <text x="420" y="99" fontSize="11" fill="#475569">选择网卡，设置捕获过滤器，开始抓包</text>

      <path d="M540 116 L540 126" stroke="#64748b" strokeWidth="2" markerEnd="url(#wpa-lm-arrow)" />

      <rect x="300" y="128" width="480" height="44" rx="8" fill="url(#wpa-lm-capture)" opacity="0.12" stroke="#0891b2" strokeWidth="1.5" />
      <text x="320" y="155" fontSize="12" fontWeight="600" fill="#0e7490">2. 捕获过滤</text>
      <text x="420" y="155" fontSize="11" fill="#475569">BPF 语法过滤，减少抓包量，只留相关流量</text>

      <path d="M540 172 L540 182" stroke="#64748b" strokeWidth="2" markerEnd="url(#wpa-lm-arrow)" />

      <rect x="300" y="184" width="480" height="44" rx="8" fill="url(#wpa-lm-capture)" opacity="0.12" stroke="#0891b2" strokeWidth="1.5" />
      <text x="320" y="211" fontSize="12" fontWeight="600" fill="#0e7490">3. 显示过滤</text>
      <text x="420" y="211" fontSize="11" fill="#475569">显示表达式筛选，聚焦特定协议/主机/端口</text>

      <path d="M540 228 L540 238" stroke="#64748b" strokeWidth="2" markerEnd="url(#wpa-lm-arrow)" />

      <rect x="300" y="240" width="480" height="44" rx="8" fill="url(#wpa-lm-proto)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="320" y="267" fontSize="12" fontWeight="600" fill="#5b21b6">4. 协议解码</text>
      <text x="420" y="267" fontSize="11" fill="#475569">逐层展开包详情：以太网 → IP → TCP → 应用层</text>

      <path d="M540 284 L540 294" stroke="#64748b" strokeWidth="2" markerEnd="url(#wpa-lm-arrow)" />

      <rect x="300" y="296" width="480" height="44" rx="8" fill="url(#wpa-lm-proto)" opacity="0.12" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="320" y="323" fontSize="12" fontWeight="600" fill="#5b21b6">5. 流量分析</text>
      <text x="420" y="323" fontSize="11" fill="#475569">跟踪 TCP 流，分析 HTTP 交互，统计会话</text>

      <path d="M540 340 L540 350" stroke="#64748b" strokeWidth="2" markerEnd="url(#wpa-lm-arrow)" />

      <rect x="300" y="352" width="480" height="44" rx="8" fill="url(#wpa-lm-sec)" opacity="0.12" stroke="#ef4444" strokeWidth="1.5" />
      <text x="320" y="379" fontSize="12" fontWeight="600" fill="#991b1b">6. 异常检测</text>
      <text x="420" y="379" fontSize="11" fill="#475569">识别端口扫描、DDoS、入侵等异常行为</text>

      <path d="M540 396 L540 406" stroke="#64748b" strokeWidth="2" markerEnd="url(#wpa-lm-arrow)" />

      <rect x="300" y="408" width="480" height="44" rx="8" fill="url(#wpa-lm-review)" opacity="0.12" stroke="#059669" strokeWidth="1.5" />
      <text x="320" y="435" fontSize="12" fontWeight="600" fill="#065f46">7. 报告整合</text>
      <text x="420" y="435" fontSize="11" fill="#475569">导出数据，撰写分析报告，知识复盘</text>

      {/* 底部学习路径 */}
      <rect x="20" y="524" width="760" height="64" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="548" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">推荐学习路径</text>
      <text x="400" y="570" textAnchor="middle" fontSize="11" fill="#475569">工具基础 → 过滤技术 → 协议分析(链路/传输/应用) → 安全检测 → 复习整合</text>
    </svg>
  );
}
