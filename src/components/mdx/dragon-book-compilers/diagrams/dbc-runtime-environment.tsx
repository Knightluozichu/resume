"use client";

export function DbcRuntimeEnvironmentDiagram() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-auto" role="img" aria-label="运行时环境：存储组织与活动记录">
      <defs>
        <linearGradient id="dbc-rt-mem" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="dbc-rt-ar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="dbc-rt-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">运行时环境：存储组织与活动记录</text>

      {/* 内存布局 */}
      <text x="200" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">运行时内存布局</text>

      <rect x="80" y="72" width="240" height="50" rx="8" fill="url(#dbc-rt-mem)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="200" y="96" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">代码区（Code）</text>
      <text x="200" y="114" textAnchor="middle" fontSize="11" fill="#475569">目标代码 / 只读</text>

      <rect x="80" y="126" width="240" height="50" rx="8" fill="url(#dbc-rt-mem)" opacity="0.2" stroke="#2563eb" strokeWidth="1.5" />
      <text x="200" y="150" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">静态区（Static）</text>
      <text x="200" y="168" textAnchor="middle" fontSize="11" fill="#475569">全局变量 / 编译期确定</text>

      <rect x="80" y="180" width="240" height="70" rx="8" fill="url(#dbc-rt-mem)" opacity="0.3" stroke="#2563eb" strokeWidth="1.5" />
      <text x="200" y="204" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">堆区（Heap）</text>
      <text x="200" y="222" textAnchor="middle" fontSize="11" fill="#475569">动态分配 / 向上增长</text>
      <text x="200" y="240" textAnchor="middle" fontSize="11" fill="#475569">malloc / new / GC 管理</text>

      <path d="M200 250 L200 244" stroke="#64748b" strokeWidth="2" markerEnd="url(#dbc-rt-arrow)" />
      <text x="340" y="266" fontSize="10" fill="#64748b">↓ 自由空间 ↓</text>

      <rect x="80" y="270" width="240" height="70" rx="8" fill="url(#dbc-rt-mem)" opacity="0.4" stroke="#2563eb" strokeWidth="1.5" />
      <text x="200" y="294" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">栈区（Stack）</text>
      <text x="200" y="312" textAnchor="middle" fontSize="11" fill="#475569">活动记录 / 向下增长</text>
      <text x="200" y="330" textAnchor="middle" fontSize="11" fill="#475569">函数调用 push / 返回 pop</text>

      {/* 活动记录结构 */}
      <text x="590" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">活动记录（Activation Record）</text>

      <rect x="460" y="72" width="280" height="30" rx="4" fill="url(#dbc-rt-ar)" opacity="0.1" stroke="#059669" strokeWidth="1" />
      <text x="600" y="92" textAnchor="middle" fontSize="11" fill="#475569">返回值（return value）</text>

      <rect x="460" y="102" width="280" height="30" rx="4" fill="url(#dbc-rt-ar)" opacity="0.16" stroke="#059669" strokeWidth="1" />
      <text x="600" y="122" textAnchor="middle" fontSize="11" fill="#475569">实参（actual parameters）</text>

      <rect x="460" y="132" width="280" height="30" rx="4" fill="url(#dbc-rt-ar)" opacity="0.22" stroke="#059669" strokeWidth="1" />
      <text x="600" y="152" textAnchor="middle" fontSize="11" fill="#475569">控制链（access link / 控制链）</text>

      <rect x="460" y="162" width="280" height="30" rx="4" fill="url(#dbc-rt-ar)" opacity="0.28" stroke="#059669" strokeWidth="1" />
      <text x="600" y="182" textAnchor="middle" fontSize="11" fill="#475569">访问链（access link）</text>

      <rect x="460" y="192" width="280" height="30" rx="4" fill="url(#dbc-rt-ar)" opacity="0.34" stroke="#059669" strokeWidth="1" />
      <text x="600" y="212" textAnchor="middle" fontSize="11" fill="#475569">机器状态（寄存器 / PC）</text>

      <rect x="460" y="222" width="280" height="30" rx="4" fill="url(#dbc-rt-ar)" opacity="0.4" stroke="#059669" strokeWidth="1" />
      <text x="600" y="242" textAnchor="middle" fontSize="11" fill="#475569">局部变量（local data）</text>

      <rect x="460" y="252" width="280" height="30" rx="4" fill="url(#dbc-rt-ar)" opacity="0.46" stroke="#059669" strokeWidth="1" />
      <text x="600" y="272" textAnchor="middle" fontSize="11" fill="#475569">临时变量（temporaries）</text>

      <text x="600" y="306" textAnchor="middle" fontSize="11" fill="#64748b">每次函数调用 push 一帧</text>

      {/* 非局部访问策略 */}
      <text x="400" y="352" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">非局部变量的访问策略</text>

      <rect x="30" y="366" width="250" height="110" rx="10" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
      <text x="155" y="390" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">访问链（Access Link）</text>
      <text x="155" y="412" textAnchor="middle" fontSize="11" fill="#475569">嵌套过程的静态作用域</text>
      <text x="155" y="432" textAnchor="middle" fontSize="11" fill="#475569">指向外层过程的活动记录</text>
      <text x="155" y="452" textAnchor="middle" fontSize="11" fill="#475569">Pascal / 嵌套函数</text>

      <rect x="295" y="366" width="250" height="110" rx="10" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="420" y="390" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">Display 表</text>
      <text x="420" y="412" textAnchor="middle" fontSize="11" fill="#475569">数组存各层活动记录指针</text>
      <text x="420" y="432" textAnchor="middle" fontSize="11" fill="#475569">O(1) 访问任意外层变量</text>
      <text x="420" y="452" textAnchor="middle" fontSize="11" fill="#475569">空间换时间</text>

      <rect x="560" y="366" width="210" height="110" rx="10" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="665" y="390" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400e">全局区 / 寄存器</text>
      <text x="665" y="412" textAnchor="middle" fontSize="11" fill="#475569">全局变量放静态区</text>
      <text x="665" y="432" textAnchor="middle" fontSize="11" fill="#475569">高频变量分配到寄存器</text>
      <text x="665" y="452" textAnchor="middle" fontSize="11" fill="#475569">C / 非嵌套语言</text>
    </svg>
  );
}
