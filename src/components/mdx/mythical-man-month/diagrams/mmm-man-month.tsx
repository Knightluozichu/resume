"use client";

export function MmmManMonthDiagram() {
  return (
    <svg viewBox="0 0 800 580" className="w-full h-auto" role="img" aria-label="人月神话与团队规模关系图">
      <defs>
        <linearGradient id="mmm-mm-linear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="mmm-mm-reality" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="mmm-mm-comm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#7e22ce" />
        </linearGradient>
        <marker id="mmm-mm-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L8,3 L0,6 Z" fill="#64748b" />
        </marker>
      </defs>

      <text x="400" y="34" textAnchor="middle" fontSize="20" fontWeight="700" fill="#0f172a">人月神话：进度与人力并非线性</text>

      {/* 左侧：线性假设 vs 现实 */}
      <text x="200" y="68" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">人力与进度的关系</text>

      {/* 线性假设 */}
      <rect x="40" y="80" width="320" height="120" rx="8" fill="url(#mmm-mm-linear)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="200" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#15803d">线性假设（错误）</text>

      <rect x="60" y="112" width="60" height="24" rx="4" fill="url(#mmm-mm-linear)" opacity="0.3" />
      <text x="90" y="128" textAnchor="middle" fontSize="9" fill="#fff">1人 12月</text>

      <path d="M124 124 L140 124" stroke="#64748b" strokeWidth="2" markerEnd="url(#mmm-mm-arrow)" />

      <rect x="144" y="112" width="80" height="24" rx="4" fill="url(#mmm-mm-linear)" opacity="0.3" />
      <text x="184" y="128" textAnchor="middle" fontSize="9" fill="#fff">2人 6月?</text>

      <path d="M228 124 L244 124" stroke="#64748b" strokeWidth="2" markerEnd="url(#mmm-mm-arrow)" />

      <rect x="248" y="112" width="100" height="24" rx="4" fill="url(#mmm-mm-linear)" opacity="0.3" />
      <text x="298" y="128" textAnchor="middle" fontSize="9" fill="#fff">4人 3月?</text>

      <text x="200" y="164" textAnchor="middle" fontSize="10" fill="#475569">「人」和「月」不可互换</text>
      <text x="200" y="182" textAnchor="middle" fontSize="10" fill="#475569">人数增加 ≠ 进度缩短</text>

      {/* 现实 */}
      <rect x="40" y="210" width="320" height="120" rx="8" fill="url(#mmm-mm-reality)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="200" y="230" textAnchor="middle" fontSize="12" fontWeight="700" fill="#b91c1c">现实（Brooks 定律）</text>

      <rect x="60" y="242" width="60" height="24" rx="4" fill="url(#mmm-mm-reality)" opacity="0.3" />
      <text x="90" y="258" textAnchor="middle" fontSize="9" fill="#fff">1人 12月</text>

      <path d="M124 254 L140 254" stroke="#64748b" strokeWidth="2" markerEnd="url(#mmm-mm-arrow)" />

      <rect x="144" y="242" width="80" height="24" rx="4" fill="url(#mmm-mm-reality)" opacity="0.3" />
      <text x="184" y="258" textAnchor="middle" fontSize="9" fill="#fff">2人 &gt;6月</text>

      <path d="M228 254 L244 254" stroke="#64748b" strokeWidth="2" markerEnd="url(#mmm-mm-arrow)" />

      <rect x="248" y="242" width="100" height="24" rx="4" fill="url(#mmm-mm-reality)" opacity="0.3" />
      <text x="298" y="258" textAnchor="middle" fontSize="9" fill="#fff">4人 &gt;3月</text>

      <text x="200" y="294" textAnchor="middle" fontSize="10" fill="#475569">培训成本 + 通信开销</text>
      <text x="200" y="312" textAnchor="middle" fontSize="10" fill="#475569">增加人力反而延迟进度</text>

      {/* 右侧：通信开销公式 */}
      <text x="590" y="68" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">通信开销增长</text>

      <rect x="400" y="80" width="360" height="120" rx="8" fill="url(#mmm-mm-comm)" opacity="0.08" stroke="#9333ea" strokeWidth="1.5" />
      <text x="580" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7e22ce">n 人团队通信路径</text>

      <text x="580" y="130" textAnchor="middle" fontSize="22" fontWeight="700" fill="#7e22ce">C = n(n-1) / 2</text>

      <rect x="430" y="146" width="80" height="24" rx="4" fill="url(#mmm-mm-comm)" opacity="0.2" />
      <text x="470" y="162" textAnchor="middle" fontSize="9" fill="#fff">3人: 3条</text>

      <rect x="520" y="146" width="80" height="24" rx="4" fill="url(#mmm-mm-comm)" opacity="0.3" />
      <text x="560" y="162" textAnchor="middle" fontSize="9" fill="#fff">6人: 15条</text>

      <rect x="610" y="146" width="100" height="24" rx="4" fill="url(#mmm-mm-comm)" opacity="0.4" />
      <text x="660" y="162" textAnchor="middle" fontSize="9" fill="#fff">10人: 45条</text>

      <text x="580" y="188" textAnchor="middle" fontSize="10" fill="#475569">通信路径随人数平方增长</text>

      {/* 右下：Brooks 定律 */}
      <rect x="400" y="210" width="360" height="120" rx="8" fill="url(#mmm-mm-reality)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="580" y="232" textAnchor="middle" fontSize="13" fontWeight="700" fill="#b91c1c">Brooks 定律</text>

      <rect x="430" y="246" width="300" height="60" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
      <text x="580" y="270" textAnchor="middle" fontSize="11" fontWeight="600" fill="#991b1b">为延迟的项目增加人力</text>
      <text x="580" y="290" textAnchor="middle" fontSize="12" fontWeight="700" fill="#dc2626">只会使它更延迟</text>

      {/* 底部：可拆分与不可拆分任务 */}
      <text x="400" y="368" textAnchor="middle" fontSize="13" fontWeight="700" fill="#334155">任务可拆分性决定了加人的效果</text>

      <rect x="40" y="380" width="370" height="100" rx="8" fill="url(#mmm-mm-linear)" opacity="0.08" stroke="#16a34a" strokeWidth="1.5" />
      <text x="225" y="402" textAnchor="middle" fontSize="11" fontWeight="700" fill="#15803d">可拆分任务（收割小麦）</text>
      <text x="225" y="424" textAnchor="middle" fontSize="10" fill="#475569">任务间无依赖，可并行</text>
      <text x="225" y="442" textAnchor="middle" fontSize="10" fill="#475569">加人确实可缩短时间</text>
      <text x="225" y="464" textAnchor="middle" fontSize="9" fontWeight="600" fill="#15803d">人数与时间近似反比</text>

      <rect x="420" y="380" width="340" height="100" rx="8" fill="url(#mmm-mm-reality)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="590" y="402" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b91c1c">不可拆分任务（生一个孩子）</text>
      <text x="590" y="424" textAnchor="middle" fontSize="10" fill="#475569">任务有严格顺序依赖</text>
 <text x="590" y="442" textAnchor="middle" fontSize="10" fill="#475569">加人无法缩短时间</text>
      <text x="590" y="464" textAnchor="middle" fontSize="9" fontWeight="600" fill="#b91c1c">九个女人一个月也生不出一个孩子</text>

      {/* 底部总结 */}
      <rect x="40" y="500" width="720" height="32" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="400" y="520" textAnchor="middle" fontSize="11" fill="#475569">进度估算偏差来源：乐观假设、忽略系统测试、低估通信开销</text>

      <rect x="40" y="542" width="720" height="28" rx="8" fill="url(#mmm-mm-reality)" opacity="0.08" stroke="#dc2626" strokeWidth="1.5" />
      <text x="400" y="560" textAnchor="middle" fontSize="11" fontWeight="600" fill="#b91c1c">核心教训：人月是危险的度量单位，进度≠人力/时间</text>
    </svg>
  );
}
