"use client";

export function EexStrengthsDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="发挥长处与反馈分析法">
      <defs>
        <linearGradient id="eex-st-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="eex-st-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="eex-st-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="eex-st-4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <marker id="eex-st-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">发挥长处：用人所长</text>

      {/* 核心原则 */}
      <rect x="40" y="52" width="720" height="44" rx="8" fill="url(#eex-st-1)" opacity="0.08" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="400" y="72" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">核心原则：发挥所长——自己、上司、同事的长处——让短处变得无关紧要</text>
      <text x="400" y="88" textAnchor="middle" fontSize="9" fill="#64748b">不能建立在短处之上，组织存在的意义就是让个人的短处变得无关</text>

      {/* 三个发挥长处的对象 */}
      <text x="400" y="118" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">发挥三个对象的长处</text>

      <rect x="40" y="132" width="235" height="130" rx="8" fill="url(#eex-st-1)" opacity="0.9" />
      <text x="157" y="156" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">用同事与下属所长</text>
      <text x="157" y="178" textAnchor="middle" fontSize="9" fill="#e0f2fe">先看他能做什么</text>
      <text x="157" y="196" textAnchor="middle" fontSize="9" fill="#e0f2fe">而非职位要求什么</text>
      <text x="157" y="216" textAnchor="middle" fontSize="9" fill="#e0f2fe">因事择人 而非</text>
      <text x="157" y="234" textAnchor="middle" fontSize="9" fill="#e0f2fe">因人设事</text>
      <text x="157" y="252" textAnchor="middle" fontSize="9" fill="#e0f2fe">避免无人能胜任的职位</text>

      <rect x="283" y="132" width="235" height="130" rx="8" fill="url(#eex-st-2)" opacity="0.9" />
      <text x="400" y="156" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">用上司所长</text>
      <text x="400" y="178" textAnchor="middle" fontSize="9" fill="#ede9fe">上司是能被"管理"的</text>
      <text x="400" y="196" textAnchor="middle" fontSize="9" fill="#ede9fe">问：上司能做好什么？</text>
      <text x="400" y="216" textAnchor="middle" fontSize="9" fill="#ede9fe">思考怎样让他发挥所长</text>
      <text x="400" y="234" textAnchor="middle" fontSize="9" fill="#ede9fe">这是下属的责任</text>
      <text x="400" y="252" textAnchor="middle" fontSize="9" fill="#ede9fe">辅佐上司成功即自己成功</text>

      <rect x="526" y="132" width="234" height="130" rx="8" fill="url(#eex-st-3)" opacity="0.9" />
      <text x="643" y="156" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">用自己所长</text>
      <text x="643" y="178" textAnchor="middle" fontSize="9" fill="#fef3c7">了解自己的工作方式</text>
      <text x="643" y="196" textAnchor="middle" fontSize="9" fill="#fef3c7">读者型 还是 听者型</text>
      <text x="643" y="216" textAnchor="middle" fontSize="9" fill="#fef3c7">怎样学习 怎样合作</text>
      <text x="643" y="234" textAnchor="middle" fontSize="9" fill="#fef3c7">在压力下如何表现</text>
      <text x="643" y="252" textAnchor="middle" fontSize="9" fill="#fef3c7">以所长做出贡献</text>

      {/* 反馈分析法 */}
      <text x="400" y="288" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">发现所长：反馈分析法</text>

      <rect x="40" y="302" width="170" height="110" rx="8" fill="url(#eex-st-4)" opacity="0.9" />
      <text x="125" y="324" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">1 写下预期</text>
      <text x="125" y="346" textAnchor="middle" fontSize="9" fill="#d1fae5">做出关键决定或</text>
      <text x="125" y="364" textAnchor="middle" fontSize="9" fill="#d1fae5">行动前，写下</text>
      <text x="125" y="382" textAnchor="middle" fontSize="9" fill="#d1fae5">你预期会发生</text>
      <text x="125" y="400" textAnchor="middle" fontSize="9" fill="#d1fae5">什么结果</text>

      <path d="M210 357 L228 357" stroke="#64748b" strokeWidth="2" markerEnd="url(#eex-st-arrow)" />

      <rect x="232" y="302" width="170" height="110" rx="8" fill="url(#eex-st-4)" opacity="0.9" />
      <text x="317" y="324" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">2 等待 9-12 个月</text>
      <text x="317" y="346" textAnchor="middle" fontSize="9" fill="#d1fae5">让行动产生</text>
      <text x="317" y="364" textAnchor="middle" fontSize="9" fill="#d1fae5">实际结果</text>
      <text x="317" y="382" textAnchor="middle" fontSize="9" fill="#d1fae5">保持耐心</text>
      <text x="317" y="400" textAnchor="middle" fontSize="9" fill="#d1fae5">不中途干预</text>

      <path d="M402 357 L420 357" stroke="#64748b" strokeWidth="2" markerEnd="url(#eex-st-arrow)" />

      <rect x="424" y="302" width="170" height="110" rx="8" fill="url(#eex-st-4)" opacity="0.9" />
      <text x="509" y="324" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">3 对照实际</text>
      <text x="509" y="346" textAnchor="middle" fontSize="9" fill="#d1fae5">把实际结果</text>
      <text x="509" y="364" textAnchor="middle" fontSize="9" fill="#d1fae5">与预期对照</text>
      <text x="509" y="382" textAnchor="middle" fontSize="9" fill="#d1fae5">差距揭示</text>
      <text x="509" y="400" textAnchor="middle" fontSize="9" fill="#d1fae5">真正的所长</text>

      <path d="M594 357 L612 357" stroke="#64748b" strokeWidth="2" markerEnd="url(#eex-st-arrow)" />

      <rect x="616" y="302" width="144" height="110" rx="8" fill="url(#eex-st-3)" opacity="0.9" />
      <text x="688" y="324" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">4 三大发现</text>
      <text x="688" y="346" textAnchor="middle" fontSize="9" fill="#fef3c7">所长在哪里</text>
      <text x="688" y="364" textAnchor="middle" fontSize="9" fill="#fef3c7">该如何工作</text>
      <text x="688" y="382" textAnchor="middle" fontSize="9" fill="#fef3c7">不擅长什么</text>
      <text x="688" y="400" textAnchor="middle" fontSize="9" fill="#fef3c7">价值观何在</text>

      {/* 职位与人选原则 */}
      <text x="400" y="438" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">用人所长的几条戒律</text>

      <rect x="40" y="452" width="180" height="100" rx="8" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="130" y="474" textAnchor="middle" fontSize="10" fontWeight="700" fill="#dc2626">不设无人胜任的职位</text>
      <text x="130" y="496" textAnchor="middle" fontSize="9" fill="#475569">连续多人失败的职位</text>
      <text x="130" y="514" textAnchor="middle" fontSize="9" fill="#475569">本身就不该存在</text>
      <text x="130" y="536" textAnchor="middle" fontSize="9" fill="#dc2626">须重新设计</text>

      <rect x="230" y="452" width="180" height="100" rx="8" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
      <text x="320" y="474" textAnchor="middle" fontSize="10" fontWeight="700" fill="#dc2626">职位要求严 范围广</text>
      <text x="320" y="496" textAnchor="middle" fontSize="9" fill="#475569">使常人能从所长</text>
      <text x="320" y="514" textAnchor="middle" fontSize="9" fill="#475569">出发做出重大成果</text>
      <text x="320" y="536" textAnchor="middle" fontSize="9" fill="#dc2626">而非苛求全才</text>

      <rect x="420" y="452" width="180" height="100" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="510" y="474" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0369a1">先考虑人 后考虑岗</text>
      <text x="510" y="496" textAnchor="middle" fontSize="9" fill="#475569">关键用人决策先看</text>
      <text x="510" y="514" textAnchor="middle" fontSize="9" fill="#475569">候选人能做什么</text>
      <text x="510" y="536" textAnchor="middle" fontSize="9" fill="#0369a1">再看岗位是否匹配</text>

      <rect x="610" y="452" width="150" height="100" rx="8" fill="#eff6ff" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="685" y="474" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0369a1">容人所短</text>
      <text x="685" y="496" textAnchor="middle" fontSize="9" fill="#475569">没有短处的人</text>
      <text x="685" y="514" textAnchor="middle" fontSize="9" fill="#475569">往往也无长处</text>
      <text x="685" y="536" textAnchor="middle" fontSize="9" fill="#0369a1">山峰越高山谷越深</text>
    </svg>
  );
}
