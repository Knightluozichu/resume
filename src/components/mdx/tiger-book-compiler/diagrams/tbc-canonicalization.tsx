"use client";

export function TbcCanonicalizationDiagram() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" role="img" aria-label="虎书规范化与基本块trace调度">
      <defs>
        <linearGradient id="tbc-can-messy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <linearGradient id="tbc-can-norm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="tbc-can-step" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="tbc-can-block" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <marker id="tbc-can-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="40" textAnchor="middle" fontSize="18" fontWeight="700" fill="#0f172a">规范化与基本块（trace 调度）</text>

      {/* 顶部：含ESEQ的IR → 规范化 → 规范IR */}
      <text x="400" y="76" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">规范化目标</text>

      <rect x="40" y="88" width="220" height="74" rx="10" fill="url(#tbc-can-messy)" opacity="0.16" stroke="#ef4444" strokeWidth="1.5" />
      <text x="150" y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill="#b91c1c">原始 Tree IR</text>
      <text x="150" y="132" textAnchor="middle" fontSize="11" fill="#475569">含 ESEQ、嵌套 CALL</text>
      <text x="150" y="150" textAnchor="middle" fontSize="11" fill="#475569">树形，不便处理</text>

      <path d="M260 125 L316 125" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-can-arrow)" />

      <rect x="320" y="88" width="160" height="74" rx="10" fill="url(#tbc-can-step)" opacity="0.18" stroke="#7c3aed" strokeWidth="1.5" />
      <text x="400" y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b21b6">规范化</text>
      <text x="400" y="132" textAnchor="middle" fontSize="11" fill="#475569">线性重写</text>
      <text x="400" y="150" textAnchor="middle" fontSize="11" fill="#475569">三步变换</text>

      <path d="M480 125 L536 125" stroke="#64748b" strokeWidth="2" markerEnd="url(#tbc-can-arrow)" />

      <rect x="540" y="88" width="220" height="74" rx="10" fill="url(#tbc-can-norm)" opacity="0.16" stroke="#059669" strokeWidth="1.5" />
      <text x="650" y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill="#047857">规范化 IR</text>
      <text x="650" y="132" textAnchor="middle" fontSize="11" fill="#475569">无 ESEQ，CALL 顶层</text>
      <text x="650" y="150" textAnchor="middle" fontSize="11" fill="#475569">线性语句序列</text>

      {/* 中部：规范化三步 */}
      <text x="400" y="196" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">规范化三步变换</text>

      <rect x="40" y="210" width="230" height="120" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="155" y="234" textAnchor="middle" fontSize="12" fontWeight="700" fill="#b91c1c">1. 消除 ESEQ</text>
      <text x="60" y="258" fontSize="11" fill="#475569">ESEQ(stmt, e) = 先执行 stmt</text>
      <text x="60" y="278" fontSize="11" fill="#475569">再把 e 作为值</text>
      <text x="60" y="300" fontSize="11" fill="#475569">用 commute 判断能否交换</text>
      <text x="60" y="320" fontSize="11" fontWeight="700" fill="#b91c1c">把 stmt 提升到上层 SEQ</text>

      <rect x="285" y="210" width="230" height="120" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="234" textAnchor="middle" fontSize="12" fontWeight="700" fill="#b91c1c">2. 提升 CALL</text>
      <text x="305" y="258" fontSize="11" fill="#475569">CALL 嵌套在表达式内时</text>
      <text x="305" y="278" fontSize="11" fill="#475569">结果可能被覆盖</text>
      <text x="305" y="300" fontSize="11" fill="#475569">先 MOVE(TEMP t, CALL(...))</text>
      <text x="305" y="320" fontSize="11" fontWeight="700" fill="#b91c1c">用 TEMP 替换 CALL 位置</text>

      <rect x="530" y="210" width="230" height="120" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="645" y="234" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b21b6">3. 线性化 SEQ</text>
      <text x="550" y="258" fontSize="11" fill="#475569">SEQ(SEQ(a,b), c) 嵌套</text>
      <text x="550" y="278" fontSize="11" fill="#475569">左结合重写为</text>
      <text x="550" y="300" fontSize="11" fill="#475569">SEQ(a, SEQ(b, c))</text>
      <text x="550" y="320" fontSize="11" fontWeight="700" fill="#5b21b6">展平为线性语句链</text>

      {/* 底部：基本块 + trace */}
      <text x="200" y="368" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">基本块划分</text>
      <text x="600" y="368" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">trace 轨迹调度</text>

      <rect x="40" y="382" width="360" height="140" rx="8" fill="url(#tbc-can-block)" opacity="0.10" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="60" y="406" fontSize="12" fontWeight="700" fill="#92400e">单入口单出口的指令序列</text>
      <text x="60" y="428" fontSize="11" fill="#475569">首指令 = 入口（跳转目标 LABEL）</text>
      <text x="60" y="448" fontSize="11" fill="#475569">末指令 = 出口（JUMP / CJUMP / 返回）</text>
      <text x="60" y="468" fontSize="11" fill="#475569">中间无 LABEL，不被跳转进入</text>
      <text x="60" y="490" fontSize="11" fontWeight="700" fill="#92400e">规范 IR → 按 LABEL/CJUMP 切块</text>
      <text x="60" y="510" fontSize="11" fill="#475569">每块可独立做指令选择（树覆盖）</text>

      <rect x="420" y="382" width="360" height="140" rx="8" fill="url(#tbc-can-norm)" opacity="0.10" stroke="#059669" strokeWidth="1.5" />
      <text x="440" y="406" fontSize="12" fontWeight="700" fill="#047857">按控制流把基本块串成线性序列</text>
      <text x="440" y="428" fontSize="11" fill="#475569">沿跳转边走一条轨迹（trace）</text>
      <text x="440" y="448" fontSize="11" fill="#475569">CJUMP 的真分支紧跟当前块</text>
      <text x="440" y="468" fontSize="11" fill="#475569">减少无条件 JUMP（顺序落空即跳）</text>
      <text x="440" y="490" fontSize="11" fontWeight="700" fill="#047857">翻转条件可使假分支顺序执行</text>
      <text x="440" y="510" fontSize="11" fill="#475569">输出便于指令选择的线性 IR</text>
    </svg>
  );
}
