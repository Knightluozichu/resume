"use client";

export function CrcParserGeneratorDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="语法分析生成器：文法到解析器">
      <defs>
        <linearGradient id="crc-par-grammar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="crc-par-ll" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="crc-par-lr" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="crc-par-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="28" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">语法分析生成器：文法 → 解析器 → AST</text>

      {/* 输入文法 */}
      <rect x="30" y="50" width="170" height="80" rx="10" fill="url(#crc-par-grammar)" opacity="0.95" />
      <text x="115" y="76" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">文法（BNF）</text>
      <text x="45" y="98" fontSize="10" fill="#bfdbfe" fontFamily="monospace">E → E + T | T</text>
      <text x="45" y="114" fontSize="10" fill="#bfdbfe" fontFamily="monospace">T → T * F | F</text>
      <text x="45" y="130" fontSize="10" fill="#bfdbfe" fontFamily="monospace">F → (E) | id</text>

      <path d="M200 90 L230 90" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#crc-par-arrow)" />

      {/* 两条路径 */}
      <rect x="230" y="50" width="160" height="80" rx="10" fill="url(#crc-par-ll)" opacity="0.95" />
      <text x="310" y="76" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">LL 分析</text>
      <text x="310" y="96" textAnchor="middle" fontSize="11" fill="#e9d5ff">自顶向下</text>
      <text x="310" y="112" textAnchor="middle" fontSize="11" fill="#e9d5ff">递归下降</text>
      <text x="310" y="128" textAnchor="middle" fontSize="11" fill="#e9d5ff">预测分析表</text>

      <rect x="410" y="50" width="160" height="80" rx="10" fill="url(#crc-par-lr)" opacity="0.95" />
      <text x="490" y="76" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">LR 分析</text>
      <text x="490" y="96" textAnchor="middle" fontSize="11" fill="#bbf7d0">自底向上</text>
      <text x="490" y="112" textAnchor="middle" fontSize="11" fill="#bbf7d0">移进-归约</text>
      <text x="490" y="128" textAnchor="middle" fontSize="11" fill="#bbf7d0">LALR(1)</text>

      <path d="M570 90 L600 90" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#crc-par-arrow)" />

      <rect x="600" y="50" width="170" height="80" rx="10" fill="#f59e0b" opacity="0.95" />
      <text x="685" y="76" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">AST</text>
      <text x="685" y="96" textAnchor="middle" fontSize="11" fill="#fef3c7">语法树节点</text>
      <text x="685" y="112" textAnchor="middle" fontSize="11" fill="#fef3c7">BinOp / Leaf</text>
      <text x="685" y="128" textAnchor="middle" fontSize="11" fill="#fef3c7">结构化输出</text>

      {/* LL vs LR 对比 */}
      <text x="200" y="170" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">LL 自顶向下</text>
      <text x="600" y="170" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">LR 自底向上</text>

      {/* LL 流程 */}
      <rect x="50" y="185" width="300" height="30" rx="6" fill="url(#crc-par-ll)" opacity="0.12" stroke="#7c3aed" strokeWidth="1" />
      <text x="200" y="205" textAnchor="middle" fontSize="11" fill="#5b21b6">从根节点开始，预测产生式向下推导</text>

      <rect x="50" y="220" width="300" height="30" rx="6" fill="url(#crc-par-ll)" opacity="0.12" stroke="#7c3aed" strokeWidth="1" />
      <text x="200" y="240" textAnchor="middle" fontSize="11" fill="#5b21b6">看前看符号选产生式 → 匹配终结符</text>

      <rect x="50" y="255" width="300" height="30" rx="6" fill="#fef3c7" opacity="0.4" stroke="#d97706" strokeWidth="1" />
      <text x="200" y="275" textAnchor="middle" fontSize="11" fill="#92400e">需消除左递归，表达能力有限</text>

      {/* LR 流程 */}
      <rect x="450" y="185" width="300" height="30" rx="6" fill="url(#crc-par-lr)" opacity="0.12" stroke="#059669" strokeWidth="1" />
      <text x="600" y="205" textAnchor="middle" fontSize="11" fill="#065f46">从叶节点开始，移进终结符到栈</text>

      <rect x="450" y="220" width="300" height="30" rx="6" fill="url(#crc-par-lr)" opacity="0.12" stroke="#059669" strokeWidth="1" />
      <text x="600" y="240" textAnchor="middle" fontSize="11" fill="#065f46">栈顶匹配产生式右部 → 归约</text>

      <rect x="450" y="255" width="300" height="30" rx="6" fill="#dcfce7" opacity="0.4" stroke="#059669" strokeWidth="1" />
      <text x="600" y="275" textAnchor="middle" fontSize="11" fill="#065f46">能处理左递归，表达能力强</text>

      {/* 移进归约 */}
      <text x="400" y="315" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">LR 移进-归约示例：id * id</text>

      <rect x="40" y="330" width="720" height="26" rx="0" fill="#0f172a" />
      <text x="60" y="348" fontSize="11" fontWeight="600" fill="#e2e8f0">步骤</text>
      <text x="140" y="348" fontSize="11" fontWeight="600" fill="#e2e8f0">动作</text>
      <text x="300" y="348" fontSize="11" fontWeight="600" fill="#e2e8f0">栈</text>
      <text x="600" y="348" fontSize="11" fontWeight="600" fill="#e2e8f0">剩余输入</text>

      <rect x="40" y="356" width="720" height="24" rx="0" fill="#f8fafc" />
      <text x="60" y="373" fontSize="10" fill="#475569">1</text>
      <text x="140" y="373" fontSize="10" fill="#059669" fontFamily="monospace">移进</text>
      <text x="300" y="373" fontSize="10" fill="#475569" fontFamily="monospace">id</text>
      <text x="600" y="373" fontSize="10" fill="#475569" fontFamily="monospace">* id</text>

      <rect x="40" y="380" width="720" height="24" rx="0" fill="#fff" />
      <text x="60" y="397" fontSize="10" fill="#475569">2</text>
      <text x="140" y="397" fontSize="10" fill="#f59e0b" fontFamily="monospace">归约 F→id</text>
      <text x="300" y="397" fontSize="10" fill="#475569" fontFamily="monospace">F</text>
      <text x="600" y="397" fontSize="10" fill="#475569" fontFamily="monospace">* id</text>

      <rect x="40" y="404" width="720" height="24" rx="0" fill="#f8fafc" />
      <text x="60" y="421" fontSize="10" fill="#475569">3</text>
      <text x="140" y="421" fontSize="10" fill="#f59e0b" fontFamily="monospace">归约 T→F</text>
      <text x="300" y="421" fontSize="10" fill="#475569" fontFamily="monospace">T</text>
      <text x="600" y="421" fontSize="10" fill="#475569" fontFamily="monospace">* id</text>

      <rect x="40" y="428" width="720" height="24" rx="0" fill="#fff" />
      <text x="60" y="445" fontSize="10" fill="#475569">4</text>
      <text x="140" y="445" fontSize="10" fill="#059669" fontFamily="monospace">移进 *</text>
      <text x="300" y="445" fontSize="10" fill="#475569" fontFamily="monospace">T *</text>
      <text x="600" y="445" fontSize="10" fill="#475569" fontFamily="monospace">id</text>

      <rect x="40" y="452" width="720" height="24" rx="0" fill="#f8fafc" />
      <text x="60" y="469" fontSize="10" fill="#475569">5</text>
      <text x="140" y="469" fontSize="10" fill="#059669" fontFamily="monospace">移进 id</text>
      <text x="300" y="469" fontSize="10" fill="#475569" fontFamily="monospace">T * id</text>
      <text x="600" y="469" fontSize="10" fill="#475569" fontFamily="monospace"></text>

      <rect x="40" y="476" width="720" height="24" rx="0" fill="#dcfce7" />
      <text x="60" y="493" fontSize="10" fontWeight="600" fill="#065f46">6</text>
      <text x="140" y="493" fontSize="10" fontWeight="600" fill="#f59e0b" fontFamily="monospace">归约 T→T*F</text>
      <text x="300" y="493" fontSize="10" fontWeight="600" fill="#065f46" fontFamily="monospace">T</text>
      <text x="600" y="493" fontSize="10" fill="#475569" fontFamily="monospace">接受</text>

      {/* 冲突说明 */}
      <rect x="40" y="515" width="340" height="35" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
      <text x="60" y="537" fontSize="11" fontWeight="600" fill="#991b1b">移进-归约冲突</text>
      <text x="180" y="537" fontSize="11" fill="#475569">需用优先级 / 结合性消解</text>

      <rect x="420" y="515" width="340" height="35" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
      <text x="440" y="537" fontSize="11" fontWeight="600" fill="#334155">Yacc / Bison</text>
      <text x="540" y="537" fontSize="11" fill="#475569">LALR(1) 生成器代表</text>
    </svg>
  );
}
