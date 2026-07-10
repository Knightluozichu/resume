"use client";

export function MsgParentsTeachersDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="父母与教师培育成长型思维指南图">
      <defs>
        <linearGradient id="msg-pt-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="msg-pt-p" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <linearGradient id="msg-pt-r" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <marker id="msg-pt-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">父母与教师：培育成长型思维</text>

      {/* 赞美方式 */}
      <text x="400" y="62" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">赞美方式：最关键的工具</text>

      <rect x="30" y="74" width="340" height="64" rx="8" fill="url(#msg-pt-r)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="50" y="94" fontSize="12" fontWeight="700" fill="#b91c1c">赞美智力（固定型）</text>
      <text x="50" y="112" fontSize="10" fill="#475569">「你真聪明！」「你真有天赋！」</text>
      <text x="50" y="128" fontSize="10" fill="#475569">让孩子认为成功 = 天生聪明</text>

      <rect x="430" y="74" width="340" height="64" rx="8" fill="url(#msg-pt-g)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="450" y="94" fontSize="12" fontWeight="700" fill="#15803d">赞美努力（成长型）</text>
      <text x="450" y="112" fontSize="10" fill="#475569">「你的努力让进步很大！」「你的策略很棒！」</text>
      <text x="450" y="128" fontSize="10" fill="#475569">让孩子认为成功 = 努力 + 策略</text>

      {/* 失败时 */}
      <text x="400" y="164" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">面对孩子失败时</text>

      <rect x="30" y="176" width="340" height="64" rx="8" fill="url(#msg-pt-r)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="50" y="196" fontSize="12" fontWeight="700" fill="#b91c1c">固定型回应</text>
      <text x="50" y="214" fontSize="10" fill="#475569">「没关系，下次会更好」（安慰但不指明方向）</text>
      <text x="50" y="230" fontSize="10" fill="#475569">「不是每个人都擅长数学」（暗示能力天定）</text>

      <rect x="430" y="176" width="340" height="64" rx="8" fill="url(#msg-pt-g)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="450" y="196" fontSize="12" fontWeight="700" fill="#15803d">成长型回应</text>
      <text x="450" y="214" fontSize="10" fill="#475569">「你还没有掌握，我们来看看哪里可以改进」</text>
      <text x="450" y="230" fontSize="10" fill="#475569">「需要更多练习和不同的策略」</text>

      {/* 培育策略 */}
      <text x="400" y="266" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">四大培育策略</text>

      <rect x="40" y="278" width="340" height="56" rx="8" fill="url(#msg-pt-g)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="60" y="298" fontSize="11" fontWeight="700" fill="#15803d">策略一：关注过程</text>
      <text x="60" y="316" fontSize="10" fill="#475569">关注策略、努力、选择和进步</text>
      <text x="60" y="330" fontSize="10" fill="#475569">而非只看分数和结果</text>

      <rect x="420" y="278" width="340" height="56" rx="8" fill="url(#msg-pt-g)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="440" y="298" fontSize="11" fontWeight="700" fill="#15803d">策略二：建设性反馈</text>
      <text x="440" y="316" fontSize="10" fill="#475569">具体指出哪里可以改进</text>
      <text x="440" y="330" fontSize="10" fill="#475569">而非笼统评价「好」或「差」</text>

      <rect x="40" y="342" width="340" height="56" rx="8" fill="url(#msg-pt-g)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="60" y="362" fontSize="11" fontWeight="700" fill="#15803d">策略三：设立高标准</text>
      <text x="60" y="380" fontSize="10" fill="#475569">相信孩子能达到，并提供支持</text>
      <text x="60" y="394" fontSize="10" fill="#475569">而非降低标准来「保护」自尊</text>

      <rect x="420" y="342" width="340" height="56" rx="8" fill="url(#msg-pt-p)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="440" y="362" fontSize="11" fontWeight="700" fill="#7e22ce">策略四：培养「还没有」</text>
      <text x="440" y="380" fontSize="10" fill="#475569">遇到困难时说「你还没有学会」</text>
      <text x="440" y="394" fontSize="10" fill="#475569">而非「你做不到」</text>

      {/* 教师的角色 */}
      <text x="400" y="424" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">成长型教师的特征</text>

      <rect x="40" y="436" width="220" height="44" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="150" y="456" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">相信每个学生</text>
      <text x="150" y="472" textAnchor="middle" fontSize="9" fill="#475569">不给学生贴「笨」标签</text>

      <rect x="280" y="436" width="220" height="44" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="390" y="456" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">关注学习过程</text>
      <text x="390" y="472" textAnchor="middle" fontSize="9" fill="#475569">不只看分数，看进步</text>

      <rect x="520" y="436" width="240" height="44" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="640" y="456" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">给予挑战和支持</text>
      <text x="640" y="472" textAnchor="middle" fontSize="9" fill="#475569">高标准 + 充足脚手架</text>

      {/* 底部总结 */}
      <rect x="40" y="498" width="720" height="36" rx="8" fill="url(#msg-pt-g)" opacity="0.08" stroke="#16a34a" strokeWidth="2" />
      <text x="400" y="520" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">核心原则：不是夸孩子聪明，而是帮助他们学会热爱挑战、享受努力、从错误中学习</text>

      <rect x="40" y="542" width="720" height="28" rx="8" fill="url(#msg-pt-p)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="400" y="560" textAnchor="middle" fontSize="10" fontWeight="600" fill="#7e22ce">教育的目标不是「确认」孩子的能力，而是「发展」孩子的潜能</text>
    </svg>
  );
}
