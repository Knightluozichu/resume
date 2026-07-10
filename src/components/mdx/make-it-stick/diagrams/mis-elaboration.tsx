"use client";

export function MisElaborationDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="精细化与生成学习过程图">
      <defs>
        <linearGradient id="mis-el-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="mis-el-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="mis-el-3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <marker id="mis-el-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">精细化与生成：深层编码</text>

      {/* 三个阶段 */}
      <text x="160" y="66" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0369a1">输入</text>
      <text x="400" y="66" textAnchor="middle" fontSize="13" fontWeight="700" fill="#15803d">精细化加工</text>
      <text x="640" y="66" textAnchor="middle" fontSize="13" fontWeight="700" fill="#7e22ce">输出</text>

      {/* 输入阶段 */}
      <rect x="40" y="80" width="240" height="50" rx="8" fill="url(#mis-el-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="160" y="102" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">阅读/听讲</text>
      <text x="160" y="120" textAnchor="middle" fontSize="10" fill="#475569">获取新信息</text>

      <rect x="40" y="140" width="240" height="50" rx="8" fill="url(#mis-el-1)" opacity="0.1" stroke="#0ea5e9" strokeWidth="1.5" />
      <text x="160" y="162" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0369a1">初步理解</text>
      <text x="160" y="180" textAnchor="middle" fontSize="10" fill="#475569">建立表层编码</text>

      {/* 箭头到中间 */}
      <path d="M284 115 L316 115" stroke="#64748b" strokeWidth="2" markerEnd="url(#mis-el-arrow)" />
      <path d="M284 165 L316 165" stroke="#64748b" strokeWidth="2" markerEnd="url(#mis-el-arrow)" />

      {/* 精细化加工阶段 */}
      <rect x="320" y="80" width="200" height="50" rx="8" fill="url(#mis-el-2)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="420" y="102" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">用自己的话解释</text>
      <text x="420" y="120" textAnchor="middle" fontSize="10" fill="#475569">语义编码 → 深层联结</text>

      <rect x="320" y="140" width="200" height="50" rx="8" fill="url(#mis-el-2)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="420" y="162" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">与已知关联</text>
      <text x="420" y="180" textAnchor="middle" fontSize="10" fill="#475569">建立知识网络</text>

      <rect x="320" y="200" width="200" height="50" rx="8" fill="url(#mis-el-2)" opacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
      <text x="420" y="222" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">生成新例子</text>
      <text x="420" y="240" textAnchor="middle" fontSize="10" fill="#475569">从抽象到具体</text>

      {/* 箭头到输出 */}
      <path d="M524 105 L556 105" stroke="#64748b" strokeWidth="2" markerEnd="url(#mis-el-arrow)" />
      <path d="M524 165 L556 165" stroke="#64748b" strokeWidth="2" markerEnd="url(#mis-el-arrow)" />
      <path d="M524 225 L556 225" stroke="#64748b" strokeWidth="2" markerEnd="url(#mis-el-arrow)" />

      {/* 输出阶段 */}
      <rect x="560" y="80" width="200" height="50" rx="8" fill="url(#mis-el-3)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="660" y="102" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7e22ce">能讲给别人听</text>
      <text x="660" y="120" textAnchor="middle" fontSize="10" fill="#475569">费曼学习法</text>

      <rect x="560" y="140" width="200" height="50" rx="8" fill="url(#mis-el-3)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="660" y="162" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7e22ce">能解决新问题</text>
      <text x="660" y="180" textAnchor="middle" fontSize="10" fill="#475569">迁移应用</text>

      <rect x="560" y="200" width="200" height="50" rx="8" fill="url(#mis-el-3)" opacity="0.1" stroke="#9333ea" strokeWidth="1.5" />
      <text x="660" y="222" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7e22ce">能举一反三</text>
      <text x="660" y="240" textAnchor="middle" fontSize="10" fill="#475569">深度理解</text>

      {/* 下半部分：生成效应 */}
      <text x="400" y="284" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">生成效应：自己「造」出来的记得更牢</text>

      <rect x="40" y="300" width="340" height="100" rx="10" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="210" y="324" textAnchor="middle" fontSize="12" fontWeight="700" fill="#b91c1c">被动接收</text>
      <text x="210" y="346" textAnchor="middle" fontSize="10" fill="#475569">老师给出完整答案</text>
      <text x="210" y="362" textAnchor="middle" fontSize="10" fill="#475569">学生只需记忆和抄写</text>
      <text x="210" y="384" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">→ 浅层编码，易遗忘</text>

      <rect x="420" y="300" width="340" height="100" rx="10" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
      <text x="590" y="324" textAnchor="middle" fontSize="12" fontWeight="700" fill="#15803d">主动生成</text>
      <text x="590" y="346" textAnchor="middle" fontSize="10" fill="#475569">学生自己尝试解决</text>
      <text x="590" y="362" textAnchor="middle" fontSize="10" fill="#475569">即使出错，记忆也更牢固</text>
      <text x="590" y="384" textAnchor="middle" fontSize="11" fontWeight="600" fill="#15803d">→ 深层编码，难遗忘</text>

      {/* 精细化策略 */}
      <text x="400" y="424" textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">三种精细化策略</text>

      <rect x="30" y="440" width="220" height="80" rx="8" fill="url(#mis-el-2)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="140" y="462" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">解释法</text>
      <text x="140" y="482" textAnchor="middle" fontSize="10" fill="#475569">用自己的语言</text>
      <text x="140" y="498" textAnchor="middle" fontSize="10" fill="#475569">重述概念</text>
      <text x="140" y="514" textAnchor="middle" fontSize="10" fill="#475569">「这意味着……」</text>

      <rect x="290" y="440" width="220" height="80" rx="8" fill="url(#mis-el-2)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="400" y="462" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">关联法</text>
      <text x="400" y="482" textAnchor="middle" fontSize="10" fill="#475569">把新知识与</text>
      <text x="400" y="498" textAnchor="middle" fontSize="10" fill="#475569">已有经验连接</text>
      <text x="400" y="514" textAnchor="middle" fontSize="10" fill="#475569">「这让我想到……」</text>

      <rect x="550" y="440" width="220" height="80" rx="8" fill="url(#mis-el-2)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="660" y="462" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">生成法</text>
      <text x="660" y="482" textAnchor="middle" fontSize="10" fill="#475569">自己构造例子</text>
      <text x="660" y="498" textAnchor="middle" fontSize="10" fill="#475569">或解决问题</text>
      <text x="660" y="514" textAnchor="middle" fontSize="10" fill="#475569">「举个例子……」</text>

      {/* 底部总结 */}
      <rect x="40" y="536" width="720" height="32" rx="8" fill="url(#mis-el-3)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="400" y="556" textAnchor="middle" fontSize="11" fontWeight="600" fill="#7e22ce">核心：理解的深度 = 加工的深度，越费力建构，记忆越牢固</text>
    </svg>
  );
}
