"use client";

export function TbcActivationRecordsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="虎书活动记录与栈帧结构">
      <defs>
        <linearGradient id="tbc-ar-frame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="tbc-ar-stack" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="tbc-ar-link" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="tbc-ar-ok" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <marker id="tbc-ar-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
        <marker id="tbc-ar-linkarrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#d97706" />
        </marker>
      </defs>

      <text x="400" y="40" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">活动记录与栈帧</text>

      {/* 顶部：调用栈 + 静态链 */}
      <text x="180" y="76" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">调用栈（高地址在上）</text>
      <text x="560" y="76" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">栈帧内部结构</text>

      <rect x="60" y="88" width="240" height="60" rx="8" fill="url(#tbc-ar-stack)" opacity="0.18" stroke="#2563eb" strokeWidth="1.5" />
      <text x="180" y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">main 的栈帧</text>
      <text x="180" y="132" textAnchor="middle" fontSize="11" fill="#475569">定义外层环境 = main</text>

      <rect x="60" y="156" width="240" height="60" rx="8" fill="url(#tbc-ar-stack)" opacity="0.12" stroke="#2563eb" strokeWidth="1.5" />
      <text x="180" y="180" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">f 的栈帧（main 调用）</text>
      <text x="180" y="200" textAnchor="middle" fontSize="11" fill="#475569">static link → main</text>

      <rect x="60" y="224" width="240" height="60" rx="8" fill="url(#tbc-ar-frame)" opacity="0.16" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="180" y="248" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">g 的栈帧（f 内嵌套定义）</text>
      <text x="180" y="268" textAnchor="middle" fontSize="11" fill="#475569">static link → f</text>

      {/* 静态链箭头：g → f → main */}
      <path d="M300 254 L336 254 L336 186 L300 186" stroke="#d97706" strokeWidth="2" fill="none" markerEnd="url(#tbc-ar-linkarrow)" />
      <path d="M300 186 L336 186 L336 118 L300 118" stroke="#d97706" strokeWidth="2" fill="none" markerEnd="url(#tbc-ar-linkarrow)" />
      <text x="312" y="232" fontSize="11" fontWeight="700" fill="#92400e">静态链</text>

      {/* 右侧：栈帧内部结构 */}
      <rect x="380" y="88" width="360" height="196" rx="8" fill="url(#tbc-ar-frame)" opacity="0.10" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="560" y="110" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">g 的栈帧（Frame 接口）</text>

      <rect x="400" y="122" width="320" height="24" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
      <text x="410" y="139" fontSize="11" fill="#475569">传入参数（超出寄存器的部分）</text>

      <rect x="400" y="150" width="320" height="24" rx="4" fill="url(#tbc-ar-link)" opacity="0.18" stroke="#f59e0b" strokeWidth="1" />
      <text x="410" y="167" fontSize="11" fontWeight="700" fill="#92400e">返回地址 + static link（escape）</text>

      <rect x="400" y="178" width="320" height="24" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
      <text x="410" y="195" fontSize="11" fill="#475569">保存的寄存器</text>

      <rect x="400" y="206" width="320" height="24" rx="4" fill="url(#tbc-ar-link)" opacity="0.14" stroke="#f59e0b" strokeWidth="1" />
      <text x="410" y="223" fontSize="11" fontWeight="700" fill="#92400e">局部变量（escape 变量在此）</text>

      <rect x="400" y="234" width="320" height="24" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
      <text x="410" y="251" fontSize="11" fill="#475569">临时变量（非 escape 可进寄存器）</text>

      <text x="560" y="276" textAnchor="middle" fontSize="11" fill="#6d28d9">Frame.newFrame / allocLocal(everyLocal)</text>

      {/* 底部：escape 与 static link 机制 */}
      <text x="200" y="324" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">escape 变量判定</text>
      <text x="600" y="324" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">静态链访问外层变量</text>

      <rect x="60" y="338" width="340" height="150" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="80" y="362" fontSize="12" fontWeight="700" fill="#1e40af">什么算 escape？</text>
      <text x="80" y="384" fontSize="11" fill="#475569">变量被嵌套函数引用 → escape</text>
      <text x="80" y="404" fontSize="11" fill="#475569">变量被取地址（&amp;x）→ escape</text>
      <text x="80" y="424" fontSize="11" fill="#475569">变量在循环/条件外被引用 → escape</text>
      <text x="80" y="448" fontSize="11" fill="#475569">escape → 在栈帧分配（可寻址）</text>
      <text x="80" y="468" fontSize="11" fill="#475569">非 escape → 可留寄存器（更快）</text>

      <rect x="420" y="338" width="340" height="150" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="440" y="362" fontSize="12" fontWeight="700" fill="#92400e">g 访问 f 中的 x：</text>
      <text x="440" y="384" fontSize="11" fill="#475569">1. 从 g 的 static link 找到 f 的栈帧</text>
      <text x="440" y="404" fontSize="11" fill="#475569">2. 按 x 在 f 栈帧的偏移读取</text>
      <text x="440" y="424" fontSize="11" fontWeight="700" fill="#5b21b6">嵌套层次 = 跨越的 static link 数</text>
      <text x="440" y="448" fontSize="11" fill="#475569">每次进入函数压入 static link</text>
      <text x="440" y="468" fontSize="11" fill="#475569">指向词法外层函数的栈帧</text>

      <rect x="60" y="506" width="700" height="40" rx="8" fill="url(#tbc-ar-ok)" opacity="0.10" stroke="#059669" strokeWidth="1.5" />
      <text x="410" y="530" textAnchor="middle" fontSize="12" fontWeight="700" fill="#047857">Frame 是平台无关抽象：前端只关心 escape 与 static link，具体布局交给后端实现</text>
    </svg>
  );
}
