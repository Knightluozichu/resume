"use client";

export function DbcCodeGenerationDiagram() {
  return (
    <svg viewBox="0 0 800 480" className="w-full h-auto" role="img" aria-label="目标代码生成：基本块与寄存器分配">
      <defs>
        <linearGradient id="dbc-cg-flow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="dbc-cg-reg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="dbc-cg-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">目标代码生成：IR → 基本块 → 寄存器分配 → 目标码</text>

      {/* 代码生成流程 */}
      <text x="400" y="58" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">代码生成流程</text>

      <rect x="30" y="72" width="130" height="56" rx="10" fill="url(#dbc-cg-flow)" opacity="0.95" />
      <text x="95" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">IR 指令</text>
      <text x="95" y="114" textAnchor="middle" fontSize="10" fill="#fef3c7">三地址码</text>

      <path d="M160 100 L185 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#dbc-cg-arrow)" />

      <rect x="190" y="72" width="130" height="56" rx="10" fill="url(#dbc-cg-flow)" opacity="0.85" />
      <text x="255" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">基本块划分</text>
      <text x="255" y="114" textAnchor="middle" fontSize="10" fill="#fef3c7">首指令 / 跳转切分</text>

      <path d="M320 100 L345 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#dbc-cg-arrow)" />

      <rect x="350" y="72" width="130" height="56" rx="10" fill="url(#dbc-cg-flow)" opacity="0.75" />
      <text x="415" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">流图构建</text>
      <text x="415" y="114" textAnchor="middle" fontSize="10" fill="#fef3c7">基本块 + 边</text>

      <path d="M480 100 L505 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#dbc-cg-arrow)" />

      <rect x="510" y="72" width="130" height="56" rx="10" fill="url(#dbc-cg-flow)" opacity="0.65" />
      <text x="575" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">寄存器分配</text>
      <text x="575" y="114" textAnchor="middle" fontSize="10" fill="#fef3c7">图着色</text>

      <path d="M640 100 L665 100" stroke="#64748b" strokeWidth="2" markerEnd="url(#dbc-cg-arrow)" />

      <rect x="670" y="72" width="100" height="56" rx="10" fill="url(#dbc-cg-flow)" opacity="0.55" />
      <text x="720" y="96" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">目标码</text>
      <text x="720" y="114" textAnchor="middle" fontSize="10" fill="#fef3c7">机器指令</text>

      {/* 基本块与流图 */}
      <text x="400" y="168" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">基本块与流图（Flow Graph）</text>

      <rect x="30" y="182" width="370" height="100" rx="10" fill="#fffbeb" stroke="#f59e0b" strokeWidth="2" />
      <text x="50" y="206" fontSize="13" fontWeight="700" fill="#92400e">基本块（Basic Block）</text>
      <text x="50" y="228" fontSize="11" fill="#475569">连续 IR 指令序列，只有一个入口和一个出口</text>
      <text x="50" y="248" fontSize="11" fill="#475569">首指令 = 跳转目标 / 紧跟跳转后的指令</text>
      <text x="50" y="268" fontSize="11" fill="#475569">末指令 = 跳转 / return / 下一条首指令前</text>

      <rect x="410" y="182" width="360" height="100" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
      <text x="430" y="206" fontSize="13" fontWeight="700" fill="#92400e">流图（Flow Graph）</text>
      <text x="430" y="228" fontSize="11" fill="#475569">节点 = 基本块，边 = 控制流转移</text>
      <text x="430" y="248" fontSize="11" fill="#475569">循环识别：回边 + 自然循环</text>
      <text x="430" y="268" fontSize="11" fill="#475569">前驱 / 后继 / 必经节点（Dominator）</text>

      {/* 寄存器分配 */}
      <text x="400" y="318" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">寄存器分配：图着色法</text>

      <rect x="30" y="332" width="250" height="130" rx="10" fill="url(#dbc-cg-reg)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="155" y="356" textAnchor="middle" fontSize="13" fontWeight="700" fill="#991b1b">① 活跃变量分析</text>
      <text x="155" y="378" textAnchor="middle" fontSize="11" fill="#475569">后向数据流分析</text>
      <text x="155" y="398" textAnchor="middle" fontSize="11" fill="#475569">OUT[b] = ∪ IN[s]</text>
      <text x="155" y="418" textAnchor="middle" fontSize="11" fill="#475569">IN[b] = (OUT-DEF) ∪ USE</text>
      <text x="155" y="442" textAnchor="middle" fontSize="11" fill="#64748b">找出同时活跃的变量</text>

      <rect x="295" y="332" width="250" height="130" rx="10" fill="url(#dbc-cg-reg)" opacity="0.16" stroke="#dc2626" strokeWidth="1.5" />
      <text x="420" y="356" textAnchor="middle" fontSize="13" fontWeight="700" fill="#991b1b">② 干扰图</text>
      <text x="420" y="378" textAnchor="middle" fontSize="11" fill="#475569">节点 = 变量，边 = 干扰</text>
      <text x="420" y="398" textAnchor="middle" fontSize="11" fill="#475569">同时活跃的变量连边</text>
      <text x="420" y="418" textAnchor="middle" fontSize="11" fill="#475569">不相邻 = 可共用寄存器</text>
      <text x="420" y="442" textAnchor="middle" fontSize="11" fill="#64748b">图的着色 = 寄存器分配</text>

      <rect x="560" y="332" width="210" height="130" rx="10" fill="url(#dbc-cg-reg)" opacity="0.24" stroke="#dc2626" strokeWidth="1.5" />
      <text x="665" y="356" textAnchor="middle" fontSize="13" fontWeight="700" fill="#991b1b">③ 着色与溢出</text>
      <text x="665" y="378" textAnchor="middle" fontSize="11" fill="#475569">k 着色 = k 个寄存器</text>
      <text x="665" y="398" textAnchor="middle" fontSize="11" fill="#475569">无法着色 → 溢出到内存</text>
      <text x="665" y="418" textAnchor="middle" fontSize="11" fill="#475569">插入 load / store</text>
      <text x="665" y="442" textAnchor="middle" fontSize="11" fill="#64748b">简化 / 合并 / 选择</text>
    </svg>
  );
}
