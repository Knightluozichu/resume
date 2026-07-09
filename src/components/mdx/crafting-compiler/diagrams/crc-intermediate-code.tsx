"use client";

export function CrcIntermediateCodeDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="中间代码生成：AST到三地址码">
      <defs>
        <linearGradient id="crc-ir-ast" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="crc-ir-gen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="crc-ir-tac" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="crc-ir-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">中间代码生成：AST → 三地址码</text>

      {/* AST 树 */}
      <text x="160" y="60" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">AST（源码 a = b + c * 2）</text>

      <rect x="120" y="72" width="80" height="34" rx="6" fill="url(#crc-ir-ast)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="160" y="94" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">Assign</text>

      <line x1="140" y1="106" x2="100" y2="126" stroke="#64748b" strokeWidth="1.5" />
      <line x1="180" y1="106" x2="220" y2="126" stroke="#64748b" strokeWidth="1.5" />

      <rect x="60" y="126" width="80" height="30" rx="6" fill="#fff" stroke="#2563eb" strokeWidth="1" />
      <text x="100" y="146" textAnchor="middle" fontSize="11" fill="#1e40af">a (id)</text>

      <rect x="180" y="126" width="80" height="34" rx="6" fill="url(#crc-ir-ast)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="220" y="148" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">BinOp(+)</text>

      <line x1="200" y1="160" x2="160" y2="182" stroke="#64748b" strokeWidth="1.5" />
      <line x1="240" y1="160" x2="280" y2="182" stroke="#64748b" strokeWidth="1.5" />

      <rect x="120" y="182" width="80" height="30" rx="6" fill="#fff" stroke="#2563eb" strokeWidth="1" />
      <text x="160" y="202" textAnchor="middle" fontSize="11" fill="#1e40af">b (id)</text>

      <rect x="240" y="182" width="80" height="34" rx="6" fill="url(#crc-ir-ast)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="280" y="204" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1e40af">BinOp(*)</text>

      <line x1="260" y1="216" x2="220" y2="238" stroke="#64748b" strokeWidth="1.5" />
      <line x1="300" y1="216" x2="340" y2="238" stroke="#64748b" strokeWidth="1.5" />

      <rect x="180" y="238" width="80" height="30" rx="6" fill="#fff" stroke="#2563eb" strokeWidth="1" />
      <text x="220" y="258" textAnchor="middle" fontSize="11" fill="#1e40af">c (id)</text>

      <rect x="300" y="238" width="80" height="30" rx="6" fill="#fff" stroke="#2563eb" strokeWidth="1" />
      <text x="340" y="258" textAnchor="middle" fontSize="11" fill="#1e40af">2 (num)</text>

      {/* 箭头 */}
      <path d="M390 160 L440 160" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#crc-ir-arrow)" />
      <text x="415" y="150" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7c3aed">翻译</text>

      {/* 三地址码 */}
      <text x="600" y="60" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">三地址码（TAC）</text>

      <rect x="450" y="72" width="300" height="120" rx="8" fill="url(#crc-ir-tac)" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
      <text x="470" y="96" fontSize="11" fill="#065f46" fontFamily="monospace">t1 = c * 2</text>
      <text x="470" y="116" fontSize="11" fill="#065f46" fontFamily="monospace">t2 = b + t1</text>
      <text x="470" y="136" fontSize="11" fill="#065f46" fontFamily="monospace">a = t2</text>

      <text x="470" y="165" fontSize="10" fill="#475569">每条指令最多 3 个操作数</text>
      <text x="470" y="182" fontSize="10" fill="#475569">临时变量 t1, t2 存中间结果</text>

      {/* 翻译模式 */}
      <text x="400" y="235" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">语法制导翻译（SDT）</text>

      <rect x="40" y="250" width="350" height="80" rx="8" fill="url(#crc-ir-gen)" opacity="0.10" stroke="#7c3aed" strokeWidth="1" />
      <text x="60" y="273" fontSize="12" fontWeight="600" fill="#5b21b6">综合属性（Synthesized）</text>
      <text x="60" y="292" fontSize="11" fill="#475569" fontFamily="monospace">E.addr = new_temp()</text>
      <text x="60" y="309" fontSize="11" fill="#475569" fontFamily="monospace">emit(E.addr = E1.addr + E2.addr)</text>
      <text x="60" y="324" fontSize="11" fill="#475569">子节点属性自底向上传递</text>

      <rect x="410" y="250" width="350" height="80" rx="8" fill="url(#crc-ir-gen)" opacity="0.10" stroke="#7c3aed" strokeWidth="1" />
      <text x="430" y="273" fontSize="12" fontWeight="600" fill="#5b21b6">继承属性（Inherited）</text>
      <text x="430" y="292" fontSize="11" fill="#475569" fontFamily="monospace">S.next = inherited_label</text>
      <text x="430" y="309" fontSize="11" fill="#475569" fontFamily="monospace">控制流标签从父节点传入</text>
      <text x="430" y="324" fontSize="11" fill="#475569">自顶向下传递上下文信息</text>

      {/* IR 形式对比 */}
      <text x="400" y="365" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">常见 IR 形式对比</text>

      <rect x="40" y="380" width="220" height="100" rx="8" fill="url(#crc-ir-tac)" opacity="0.10" stroke="#059669" strokeWidth="1" />
      <text x="60" y="403" fontSize="12" fontWeight="600" fill="#065f46">三地址码（TAC）</text>
      <text x="60" y="422" fontSize="10" fill="#475569" fontFamily="monospace">t1 = a + b</text>
      <text x="60" y="438" fontSize="10" fill="#475569" fontFamily="monospace">t2 = t1 * c</text>
      <text x="60" y="458" fontSize="10" fill="#475569">线性指令序列</text>
      <text x="60" y="472" fontSize="10" fill="#475569">简单易生成</text>

      <rect x="290" y="380" width="220" height="100" rx="8" fill="url(#crc-ir-tac)" opacity="0.10" stroke="#059669" strokeWidth="1" />
      <text x="310" y="403" fontSize="12" fontWeight="600" fill="#065f46">SSA 形式</text>
      <text x="310" y="422" fontSize="10" fill="#475569" fontFamily="monospace">t1_1 = a + b</text>
      <text x="310" y="438" fontSize="10" fill="#475569" fontFamily="monospace">t2_1 = t1_1 * c</text>
      <text x="310" y="458" fontSize="10" fill="#475569">每个变量只赋值一次</text>
      <text x="310" y="472" fontSize="10" fill="#475569">优化友好</text>

      <rect x="540" y="380" width="220" height="100" rx="8" fill="url(#crc-ir-tac)" opacity="0.10" stroke="#059669" strokeWidth="1" />
      <text x="560" y="403" fontSize="12" fontWeight="600" fill="#065f46">控制流图（CFG）</text>
      <text x="560" y="422" fontSize="10" fill="#475569">基本块 + 跳转边</text>
      <text x="560" y="438" fontSize="10" fill="#475569">显式表达控制流</text>
      <text x="560" y="458" fontSize="10" fill="#475569">数据流分析基础</text>
      <text x="560" y="472" fontSize="10" fill="#475569">循环 / 分支可视化</text>

      {/* 控制流翻译 */}
      <rect x="40" y="500" width="720" height="45" rx="8" fill="#fef3c7" opacity="0.4" stroke="#d97706" strokeWidth="1" />
      <text x="60" y="522" fontSize="12" fontWeight="600" fill="#92400e">控制流翻译</text>
      <text x="60" y="538" fontSize="11" fill="#475569">if → 条件跳转 + 标签；while → 条件检查 + 回边跳转；短路求值 → 翻译为分支跳转而非逻辑运算</text>
    </svg>
  );
}
