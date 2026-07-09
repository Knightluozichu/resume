"use client";

export function WpaFinalReviewDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto" role="img" aria-label="全书知识整合与端到端分析流程">
      <defs>
        <linearGradient id="wpa-fr-layer" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="wpa-fr-tool" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="wpa-fr-flow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="wpa-fr-sec" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <marker id="wpa-fr-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">全书知识整合</text>

      {/* OSI 层级与 Wireshark 分析 */}
      <text x="200" y="56" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">协议栈层级与 Wireshark 分析</text>

      <rect x="20" y="70" width="360" height="44" rx="6" fill="url(#wpa-fr-layer)" opacity="0.90" />
      <text x="40" y="92" fontSize="11" fontWeight="700" fill="#fff">应用层</text>
      <text x="120" y="92" fontSize="10" fill="#bfdbfe">HTTP / DNS / DHCP / TLS</text>
      <text x="300" y="92" fontSize="9" fill="#bfdbfe">ch6-8</text>

      <rect x="20" y="120" width="360" height="44" rx="6" fill="url(#wpa-fr-layer)" opacity="0.75" />
      <text x="40" y="142" fontSize="11" fontWeight="700" fill="#fff">传输层</text>
      <text x="120" y="142" fontSize="10" fill="#bfdbfe">TCP / UDP（握手/挥手/流控）</text>
      <text x="300" y="142" fontSize="9" fill="#bfdbfe">ch5</text>

      <rect x="20" y="170" width="360" height="44" rx="6" fill="url(#wpa-fr-layer)" opacity="0.60" />
      <text x="40" y="192" fontSize="11" fontWeight="700" fill="#fff">网络层</text>
      <text x="120" y="192" fontSize="10" fill="#bfdbfe">IP / ICMP / ARP（路由/分片）</text>
      <text x="300" y="192" fontSize="9" fill="#bfdbfe">ch4</text>

      <rect x="20" y="220" width="360" height="44" rx="6" fill="url(#wpa-fr-layer)" opacity="0.45" />
      <text x="40" y="242" fontSize="11" fontWeight="700" fill="#fff">链路层</text>
      <text x="120" y="242" fontSize="10" fill="#bfdbfe">Ethernet（MAC/帧结构）</text>
      <text x="300" y="242" fontSize="9" fill="#bfdbfe">ch4</text>

      {/* 右侧：工具技能树 */}
      <text x="600" y="56" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">工具技能树</text>

      <rect x="420" y="70" width="360" height="44" rx="6" fill="url(#wpa-fr-tool)" opacity="0.90" />
      <text x="440" y="92" fontSize="11" fontWeight="700" fill="#fff">抓包能力</text>
      <text x="520" y="92" fontSize="10" fill="#cffafe">选网卡 / 混合模式 / 多文件轮转</text>

      <rect x="420" y="120" width="360" height="44" rx="6" fill="url(#wpa-fr-tool)" opacity="0.75" />
      <text x="440" y="142" fontSize="11" fontWeight="700" fill="#fff">过滤能力</text>
      <text x="520" y="142" fontSize="10" fill="#cffafe">BPF 捕获 / 显示表达式 / 组合条件</text>

      <rect x="420" y="170" width="360" height="44" rx="6" fill="url(#wpa-fr-tool)" opacity="0.60" />
      <text x="440" y="192" fontSize="11" fontWeight="700" fill="#fff">分析能力</text>
      <text x="520" y="192" fontSize="10" fill="#cffafe">协议解码 / 流跟踪 / 统计图表</text>

      <rect x="420" y="220" width="360" height="44" rx="6" fill="url(#wpa-fr-tool)" opacity="0.45" />
      <text x="440" y="242" fontSize="11" fontWeight="700" fill="#fff">安全能力</text>
      <text x="520" y="242" fontSize="10" fill="#cffafe">异常检测 / IoC 提取 / 取证报告</text>

      {/* 端到端分析流程 */}
      <text x="400" y="296" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">端到端分析流程</text>

      <rect x="20" y="310" width="760" height="44" rx="8" fill="url(#wpa-fr-flow)" opacity="0.10" stroke="#059669" strokeWidth="1.5" />
      <text x="40" y="336" fontSize="11" fontWeight="600" fill="#065f46">1. 抓包</text>
      <text x="120" y="336" fontSize="10" fill="#475569">选网卡 + 捕获过滤（ch1-2）→ 只抓相关流量</text>

      <path d="M400 354 L400 358" stroke="#64748b" strokeWidth="2" markerEnd="url(#wpa-fr-arrow)" />

      <rect x="20" y="362" width="760" height="44" rx="8" fill="url(#wpa-fr-flow)" opacity="0.10" stroke="#059669" strokeWidth="1.5" />
      <text x="40" y="388" fontSize="11" fontWeight="600" fill="#065f46">2. 过滤</text>
      <text x="120" y="388" fontSize="10" fill="#475569">显示过滤（ch3）→ 聚焦目标协议/主机/端口</text>

      <path d="M400 406 L400 410" stroke="#64748b" strokeWidth="2" markerEnd="url(#wpa-fr-arrow)" />

      <rect x="20" y="414" width="760" height="44" rx="8" fill="url(#wpa-fr-flow)" opacity="0.10" stroke="#059669" strokeWidth="1.5" />
      <text x="40" y="440" fontSize="11" fontWeight="600" fill="#065f46">3. 解码</text>
      <text x="120" y="440" fontSize="10" fill="#475569">逐层展开（ch4-7）→ 以太网→IP→TCP→HTTP/DNS</text>

      <path d="M400 458 L400 462" stroke="#64748b" strokeWidth="2" markerEnd="url(#wpa-fr-arrow)" />

      <rect x="20" y="466" width="760" height="44" rx="8" fill="url(#wpa-fr-sec)" opacity="0.10" stroke="#ef4444" strokeWidth="1.5" />
      <text x="40" y="492" fontSize="11" fontWeight="600" fill="#991b1b">4. 检测</text>
      <text x="120" y="492" fontSize="10" fill="#475569">安全分析（ch8）→ 识别扫描/洪泛/入侵/恶意通信</text>

      {/* 知识网络 */}
      <rect x="20" y="520" width="760" height="68" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="544" textAnchor="middle" fontSize="12" fontWeight="700" fill="#334155">知识网络：工具基础 → 过滤技术 → 协议栈逐层分析 → 安全检测 → 整合报告</text>
      <text x="400" y="566" textAnchor="middle" fontSize="10" fill="#64748b">每一层协议分析都依赖过滤技术，安全检测贯穿所有协议层，最终整合为可执行的取证报告</text>
      <text x="400" y="582" textAnchor="middle" fontSize="10" fill="#64748b">核心思维：自底向上逐层解码 + 自顶向下需求驱动过滤 + 全局统计定位异常</text>
    </svg>
  );
}
